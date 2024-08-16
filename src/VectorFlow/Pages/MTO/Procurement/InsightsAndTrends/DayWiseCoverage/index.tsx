import React, { useState } from 'react'
import DayWiseCoverageCalender from './DayWiseCoverageCalender';
import { DayWiseCoverageSumamry } from './calender_json';
import DayWiseCoverageHeader from './DayWiseCoverageHeader'
import DayWiseCoverageTable from './DayWiseCoverageTable';
import { Player } from '@lottiefiles/react-lottie-player';
import { AnimationWrapper, HelperText, TableContainer } from './style';
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';


const DayWiseCoverage = () => {
    const [startDate, setStartDate] = useState("2024-04");
    const [endDate, setEndDate] = useState("2024-06");
    const [selectedDate, setSelectedDate] = useState<string>("");
    const setDateRange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end)
    }

    const getColor = (id: string) => {
        if (id === selectedDate) {
            return "#B93B7E"
        }
        if(!DayWiseCoverageSumamry?.data[id]){
            return "lightgrey"
        }
        return DayWiseCoverageSumamry?.data[id]?.oc === DayWiseCoverageSumamry?.data[id]?.fk ? "#33800B" : "#F02424"
    }

    const getToolTipContent = (id: string) => {
        if(!DayWiseCoverageSumamry?.data[id]){
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
                            {DayWiseCoverageSumamry?.data[id]?.oc}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Full kit
                        </td>
                        <td>
                            {DayWiseCoverageSumamry?.data[id]?.fk}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Partial kit
                        </td>
                        <td>
                            {DayWiseCoverageSumamry?.data[id]?.pk}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            No kit
                        </td>
                        <td>
                            {DayWiseCoverageSumamry?.data[id]?.nk}
                        </td>
                    </tr>
                </tbody>

            </table>
        )
    }

    return (
        <div>
            <div style={{ zoom: 1.25 }}>
                <MTOActionToolBar isExcelExport isAddFilterButton />
            </div>
            <DayWiseCoverageHeader startDate={startDate} endDate={endDate} setDateRange={setDateRange} />
            <DayWiseCoverageCalender start={startDate} end={endDate} getToolTipContent={getToolTipContent} getColor={getColor} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TableContainer>
                {selectedDate ?
                    <DayWiseCoverageTable
                    // selectedDate={selectedDate}
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