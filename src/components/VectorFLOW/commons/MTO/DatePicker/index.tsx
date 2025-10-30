import React from "react";
import { dateInput, datePickerContainer } from "./styles.css";

interface IDateProps {
  date: string;
  setDate: (date: string) => void;
  type: "month" | "date";
  min?: string;
  max?: string;
}
const DatePicker = ({ date, setDate, type, min, max }: IDateProps) => {
  return (
    <div className={datePickerContainer} data-testid="calender">
      <input
        className={dateInput}
        value={date}
        type={type}
        min={min}
        max={max}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
};

export default DatePicker;
