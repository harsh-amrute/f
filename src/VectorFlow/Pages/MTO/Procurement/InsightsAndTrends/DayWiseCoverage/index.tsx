import React, { useEffect, useMemo, useState } from 'react'
import DayWiseCoverageCalender from './DayWiseCoverageCalender';
import { DayWiseCoverageSumamry } from './calender_json';
import DayWiseCoverageHeader from './DayWiseCoverageHeader'
import DayWiseCoverageTable from './DayWiseCoverageTable';
import { Player } from '@lottiefiles/react-lottie-player';
import { AnimationWrapper, HelperText, TableContainer } from './style';
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import { add, endOfMonth, format, startOfMonth } from 'date-fns';
import { useGetDayWiseCoverageData } from '../../../../../../VectorFlow/Services/MTO/Procurement/DayWiseCoverage';


const DayWiseCoverage = () => {
    // const currentMonth = format(new Date(), "yyyy-MM");
    const minDate = useMemo(()=>startOfMonth(add(new Date(), {months: -2 })), [])
    const maxDate = useMemo(()=> endOfMonth(new Date()),[]);

    const [startDate, setStartDate] = useState(format(minDate, "yyyy-MM"));
    const [endDate, setEndDate] = useState(format(maxDate,"yyyy-MM"));
    const [selectedDate, setSelectedDate] = useState<string>("");
    const setDateRange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end)
    }

    const [calenderData, setCalenderData] = useState<any>();

    const {mutateAsync: getData} = useGetDayWiseCoverageData();

    const getCalenderData = async () => {
        const data = await getData({startDate:format(startOfMonth(startDate), "yyyy-MM-dd"), endDate:format(endOfMonth(endDate), "yyyy-MM-dd")});
        setCalenderData(data?.data?.data);
    }

    useEffect(()=>{
        getCalenderData()
    }, [startDate, endDate]);

    console.log(calenderData)
    
    const getColor = (id: string) => {
        // console.log(id)
        // console.log(calenderData?.[id]);
        if (id === selectedDate) {
            return "#B93B7E"
        }
        if(!calenderData?.[id]){
            return "lightgrey"
        }
        return calenderData?.[id]?.oc === calenderData?.[id]?.fk ? "#33800B" : "#F02424"
    }

    const getToolTipContent = (id: string) => {
        if(!calenderData?.[id]){
            return <></>
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

    return (
        <div style={{display:"flex", flexDirection:"column", height:"100%"}}>
            <div style={{ zoom: 1.25 }}>
                <MTOActionToolBar isExcelExport isAddFilterButton />
            </div>
            <DayWiseCoverageHeader max={maxDate} min={minDate} startDate={startDate} endDate={endDate} setDateRange={setDateRange} />
            <DayWiseCoverageCalender start={startDate} end={endDate} getToolTipContent={getToolTipContent} getColor={getColor} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TableContainer>
                {selectedDate ?
                    <DayWiseCoverageTable
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