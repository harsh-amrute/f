import React, { useState } from 'react'
import { DateInput, DatePickerContainer } from './styles'

interface IDateProps {
    date: string,
    setDate: (date: string) => void,
    type: "month" | "date"
}
const DatePicker = ({ date, setDate, type }: IDateProps) => {
    return (
        <DatePickerContainer data-testid="calender">
            <DateInput
                value={date}
                type={type}
                onChange={(e) => {
                    setDate(e.target.value);
                }}
            />
        </DatePickerContainer>
    )
}

export default DatePicker