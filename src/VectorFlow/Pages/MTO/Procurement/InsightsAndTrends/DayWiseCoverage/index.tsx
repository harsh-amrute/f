import React, { useEffect, useState } from 'react'
import DatePicker from '../../../../../../components/VectorFLOW/commons/MTO/DatePicker'
import DayWiseCoverageCalender from '../DayWiseCoverageCalender';
import { DayWiseCoverageSumamry } from './data';
import DayWiseCoverageHeader from './DayWiseCoverageHeader'
import { Calender } from './style';


const DayWiseCoverage = () => {
    const [startDate, setStartDate] = useState("2024-02");
    const [endDate, setEndDate] = useState("2024-06");
    const setDateRange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end)
    }

    const getToolTipContent = (id: string) => {
        return (
            <table style={{ padding: "4px", display: "table", width: '200px' }}>
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
                            {DayWiseCoverageSumamry.data[id]?.oc}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Full kit
                        </td>
                        <td>
                            {DayWiseCoverageSumamry.data[id]?.fk}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Partial kit
                        </td>
                        <td>
                            {DayWiseCoverageSumamry.data[id]?.pk}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            No kit
                        </td>
                        <td>
                            {DayWiseCoverageSumamry.data[id]?.nk}
                        </td>
                    </tr>
                </tbody>

            </table>
        )
    }
    return (
        <>
            <DayWiseCoverageHeader startDate={startDate} endDate={endDate} setDateRange={setDateRange} />
            <DayWiseCoverageCalender start={startDate} end={endDate} getToolTipContent={getToolTipContent} />
        </>

    )
}

export default DayWiseCoverage