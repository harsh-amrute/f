import React, { useState } from 'react'
import VFButtonOutline from '../../../../../../components/VectorFLOW/commons/VFButtonOutline'
import { useUserData } from '../../../../../../context'
import DatePicker from '../../../../../../components/VectorFLOW/commons/MTO/DatePicker'
import { DayWiseCoverageHeaderContainer, DayWiseCoverageStatus, Divider, Text } from './style'

interface IDayWiseCoverageHeaderProps {
    startDate: string,
    endDate: string,
    setDateRange: (start: string, end: string) => void
}

const DayWiseCoverageHeader = ({
    startDate,
    endDate,
    setDateRange
}: IDayWiseCoverageHeaderProps) => {
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(endDate);
    return (
        <DayWiseCoverageHeaderContainer>
            <DayWiseCoverageStatus color={"#33800B"}>
                Full Kit Available
            </DayWiseCoverageStatus>
            <DayWiseCoverageStatus color={"#E53F3F"}>
                Partial/ No Kit Available
            </DayWiseCoverageStatus>
            <Divider />
            <Text>From</Text>
            <DatePicker type="month" date={start} setDate={setStart} data-testid="start" />
            <Text>To</Text>
            <DatePicker type="month" date={end} setDate={setEnd} data-testid="end" />
            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <img
                style={{ cursor: 'pointer' }}
                src={themeUi === "REGALBLAZE" ? "/assets/img/Group 627-regal.svg" : "/assets/img/Group 627.svg"}
                height={50}
                width={60}
                onClick={() => { setDateRange(start, end) }}
            />

            {/* </div> */}
        </DayWiseCoverageHeaderContainer>
    )
}

export default DayWiseCoverageHeader