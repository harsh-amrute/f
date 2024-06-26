import React, { useEffect, useState } from 'react'
import DayWiseCoverageCalender from './DayWiseCoverageCalender';
import { DayWiseCoverageSumamry } from './calender_json';
import DayWiseCoverageHeader from './DayWiseCoverageHeader'
import DayWiseCoverageTable from './DayWiseCoverageTable';


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
        return DayWiseCoverageSumamry.data[id].oc === DayWiseCoverageSumamry.data[id].fk ? "#33800B" : "#F02424"
    }

    const getToolTipContent = (id: string) => {
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
        <div>
            <DayWiseCoverageHeader startDate={startDate} endDate={endDate} setDateRange={setDateRange} />
            <DayWiseCoverageCalender start={startDate} end={endDate} getToolTipContent={getToolTipContent} getColor={getColor} setSelectedDate={setSelectedDate} />
            {selectedDate && <DayWiseCoverageTable selectedDate={selectedDate} />}

        </div>

    )
}

export default DayWiseCoverage