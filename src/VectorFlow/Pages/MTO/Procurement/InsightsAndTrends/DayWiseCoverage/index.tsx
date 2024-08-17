import React, { useEffect, useMemo, useState } from 'react'
import DayWiseCoverageCalender from './DayWiseCoverageCalender';
import DayWiseCoverageHeader from './DayWiseCoverageHeader'
import DayWiseCoverageTable from './DayWiseCoverageTable';
import { Player } from '@lottiefiles/react-lottie-player';
import { AnimationWrapper, HelperText, TableContainer } from './style';
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import { add, eachMonthOfInterval, endOfMonth, format, getMonth, startOfMonth } from 'date-fns';
import { useGetDayWiseCoverageData } from '../../../../../../VectorFlow/Services/MTO/Procurement/DayWiseCoverage';
import OverlayLoader from '../../../Common/Loader';
import { useDispatch } from 'react-redux';
import { DAYWISE_COVERAGE_ANALYTICS } from '../../../../../../redux/actions/MTO';



enum Colors{
    Selected = "#B93B7E",
    NoData = "lightgrey",
    Green = "#33800B",
    Red= "#F02424"
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const DayWiseCoverage = () => {
    // const currentMonth = format(new Date(), "yyyy-MM");
    const minDate = useMemo(()=>startOfMonth(add(new Date(), {months: -2 })), [])
    const maxDate = useMemo(()=> endOfMonth(new Date()),[]);

    const [startDate, setStartDate] = useState(format(minDate, "yyyy-MM"));
    const [endDate, setEndDate] = useState(format(maxDate,"yyyy-MM"));
    const [selectedDate, setSelectedDate] = useState<string>("");
    
    const [calenderData, setCalenderData] = useState<any>();

    const [loading, setLoading] = useState(false);
    
    const {mutateAsync: getData, isLoading: isCalenderLoading} = useGetDayWiseCoverageData();
    
    const getCalenderData = async () => {
        const data = await getData({startDate:format(startOfMonth(startDate), "yyyy-MM-dd"), endDate:format(endOfMonth(endDate), "yyyy-MM-dd")});
        setCalenderData(data?.data?.data);
    }

    const dispatch = useDispatch()
    
    useEffect(()=>{
        getCalenderData()
    }, [startDate, endDate]);
    
    const setDateRange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end)
    }
   
    const getColor = (id: string) => {
        if(!calenderData?.[id]){
            return Colors.NoData
        }
        if (id === selectedDate ) {
            return Colors.Selected
        }
        return calenderData?.[id]?.oc === calenderData?.[id]?.fk ? Colors.Green: Colors.Red
    }

    const hasContent = (id: string) => {
        return calenderData?.[id] != null
    }

    const getToolTipContent = (id: string) => {
        if(!calenderData?.[id]){
            return null
        }
        return (
            <table style={{ padding: "8px", display: "table", width: '250px' }}>
                <thead>
                    <tr>
                        <td colSpan={2} style={{ borderBottom: "1px dashed white", paddingRight: "4rem" }}>Details</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            No of Orders
                        </td>
                        <td>
                            {calenderData?.[id]?.oc}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Full kit
                        </td>
                        <td>
                            {calenderData?.[id]?.fk}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Partial kit
                        </td>
                        <td>
                            {calenderData?.[id]?.pk}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            No kit
                        </td>
                        <td>
                            {calenderData?.[id]?.nk}
                        </td>
                    </tr>
                </tbody>

            </table>
        )
    }

    useEffect(()=>{
        getAnalytics()
    }, [calenderData])

    useEffect(()=>{
        setLoading(isCalenderLoading)
    }, [isCalenderLoading])

    const formatNumber = (number: number) => number % 1 !== 0 ? Math.round(number * 100) / 100 : number;

    const getAnalytics = () => {
        if(calenderData){
            const analytics:any = {}
            const monthRange = eachMonthOfInterval({ start: startDate, end: endDate });
            monthRange.forEach((date: any)=>{
                analytics[getMonth(date)] = {
                    green: 0,
                    red: 0
                }
            })
            Object.entries(calenderData).forEach((entry: any)=>{
                const [releasedDate, data] = entry;
                // console.log(releasedDate,getColor(releasedDate) === Colors.Red)
                // const month = format(releasedDate, "MMM");
                const month = getMonth(releasedDate);
                const isGreen = getColor(releasedDate) === Colors.Green;
                let countOfGreen = analytics[month].green;
                let countOfRed = analytics[month].red;
                if(isGreen){
                    countOfGreen += 1
                }else{
                    countOfRed += 1
                }
                analytics[month] = {
                    green: countOfGreen,
                    red: countOfRed
                }
                
            })
            
            console.log(analytics);
            const data = Object.entries(analytics).map((entry: any)=>{
                const greens = entry[1].green;
                const reds = entry[1].red
                return [months[entry[0]], greens, reds, formatNumber((greens/(greens + reds)* 100) || 0)]
            })
            console.log("data", data);
            dispatch(DAYWISE_COVERAGE_ANALYTICS(data))
        }
    }   

    return (
        <div style={{display:"flex", flexDirection:"column", height:"100%"}}>
            <div style={{ zoom: 1.25 }}>
                <MTOActionToolBar isExcelExport isAddFilterButton />
            </div>
            <DayWiseCoverageHeader max={maxDate} min={minDate} startDate={startDate} endDate={endDate} setDateRange={setDateRange} />
            {loading && <OverlayLoader/>}
            <DayWiseCoverageCalender start={startDate} end={endDate} getToolTipContent={getToolTipContent} getColor={getColor} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TableContainer>
                {calenderData?.[selectedDate] ?
                    <DayWiseCoverageTable
                        setLoading={setLoading}
                        startDate={format(startOfMonth(startDate), "yyyy-MM-dd")}
                        endDate={format(endOfMonth(endDate), "yyyy-MM-dd")}
                        selectedDate={selectedDate}
                    />
                    : <AnimationWrapper>
                        <Player src={'/assets/img/VectorFLOW/BPR/swipe pointer.json'} loop autoplay style={{ height: 100, width: 100 }} />
                        <HelperText>Please select the <strong>Dates</strong> from above to  view <strong>Order lists</strong></HelperText>
                    </AnimationWrapper>
                }
            </TableContainer>

        </div>

    )
}

export default DayWiseCoverage