import _ from 'lodash'
import React from 'react'
import { CalenderContainer, CalenderContent, CalenderMonth, CalenderMonths, CalenderTitle, Day, Month, Calender } from './style'
import { eachMonthOfInterval, format, getDaysInMonth } from 'date-fns'
import Tooltip from '../../../../../../components/VectorFLOW/commons/MTO/Tooltip'

interface IDayWiseCoverageCalenderProps {
    start: string,
    end: string,
    getToolTipContent: (id: string) => JSX.Element,
    getColor: (id: string) => string
}

const DayWiseCoverageCalender = ({
    start,
    end,
    getToolTipContent,
    getColor
}: IDayWiseCoverageCalenderProps) => {

    const getMonths = (start: string, end: string) => {
        const monthRange = eachMonthOfInterval({ start: new Date(start), end: new Date(end) });
        return (
            <CalenderContainer>
                <CalenderTitle>Calender</CalenderTitle>
                <CalenderContent>
                    <CalenderMonths>
                        {monthRange.map((month: any, index: number) => {
                            return (
                                <CalenderMonth>
                                    {format(month, "MMM")}
                                </CalenderMonth>
                            )
                        })}

                    </CalenderMonths>

                    <Calender>
                        <tbody>
                            {monthRange.map((month: any, index: number) => {
                                return (
                                    <Month key={index}>
                                        {_.range(0, getDaysInMonth(month)).map((day: number, index) => {
                                            const formattedDate = format(`${month.getFullYear()}/${month.getMonth() + 1}/${day + 1}`, "yyyy/MM/dd")
                                            return (
                                                <Day key={index} color={getColor(formattedDate)}>
                                                    <Tooltip content={getToolTipContent(formattedDate)}>
                                                        {day + 1}
                                                    </Tooltip>
                                                </Day>
                                            )
                                        })}

                                    </Month>
                                )
                            })}
                        </tbody>
                    </Calender>
                </CalenderContent>

            </CalenderContainer>
        )
    }

    return (
        <div>
            {getMonths(start, end)}
        </div>
    )
}

export default DayWiseCoverageCalender