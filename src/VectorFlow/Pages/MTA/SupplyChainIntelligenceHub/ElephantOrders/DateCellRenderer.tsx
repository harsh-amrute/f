import { useEffect, useRef, useState } from "react";
import moment from "moment";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReactDOM from "react-dom";
import { useUserData } from "../../../../../context/index";
import {
  datePickerWrapper,
  textInputWrapper,
  buttonWrapper,
  imageWrapper,
  calendarBase,
  calendarPopup,
  calPrimaryVar,
  calHoverVar,
  calTodayVar,           
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface AGGridProps {
  value: string;
  data: any;
  setValue?: (value: any) => void;
  onDateChange?: (date: string, rowData: any) => void;
  onClearDate?: (rowData: any) => void;
  [key: string]: any;
}


type Value = CalendarProps["value"];

const DateCellRenderer = (props: AGGridProps) => {
  const THEME = {
    REGALBLAZE: {
      accent: "#F7B500",
      calPrimary: "#C7810E",
      calHover: "#fee3b7",
      calToday: "#E1B69F",
      calendarIcon:
        "/assets/img/mto/OrderRescheduling/edit-calendar-yellow.svg",
      clearIcon: "/assets/img/Clear_Due_Date_Yellow.svg",
    },
    DEFAULT: {
      accent: "#BC3D80",
      calPrimary: "#82104C",
      calHover: "#82104C",
      calToday: "#e2a9c8",
      calendarIcon: "/assets/img/mto/OrderRescheduling/edit-calendar.svg",
      clearIcon: "/assets/img/Clear_Due_Date.svg",
    },
  } as const;
  const {
    value,
    onDateChange: externalOnDateChange,
    onClearDate,
    disabled = false,
    style,
    imgStyle,
  } = props;

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        showCalendar &&
        calendarRef.current &&
        !calendarRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  const toggleCalendar = () => {
    if (disabled) return;
    const rect = inputRef.current?.getBoundingClientRect();
    if (rect) {
      const CALENDAR_WIDTH = 250;
      const viewportWidth = window.innerWidth;
      const wouldOverflowRight = rect.left + CALENDAR_WIDTH > viewportWidth;

      setCalendarPosition({
        top: rect.bottom + 4,
        left: wouldOverflowRight
          ? rect.right - CALENDAR_WIDTH   
          : rect.left,                    
      });
    }
    setShowCalendar((prev) => !prev);
  };

  const handleClearDate = () => {
    props.setValue?.("");
    externalOnDateChange?.("", props.data); // optional fall-back
    onClearDate?.(props.data); // Call to parent clear handler
  };

  const handleCalendarChange = (value: Value) => {
    if (value instanceof Date) {
      const formatted = moment(value).format("YYYY-MM-DD");

      if (typeof props.setValue === "function") {
        props.setValue(formatted); // update AG Grid cell
      }

      if (typeof externalOnDateChange === "function") {
        externalOnDateChange(formatted, props.data); // send row data back
      }

      setShowCalendar(false);
    }
  };
  const tokens = themeUi === "REGALBLAZE" ? THEME.REGALBLAZE : THEME.DEFAULT;
  const calVars = assignInlineVars({
    [calPrimaryVar]: tokens.calPrimary,
    [calHoverVar]: tokens.calHover,
    [calTodayVar]: tokens.calToday,
  });
  return (
    <div className={datePickerWrapper}>
      <input
        ref={inputRef}
        className={textInputWrapper}
        type="text"
        value={value ? moment(value).format("YYYY-MM-DD") : ""}
        placeholder="YYYY-MM-DD"
        readOnly
        onClick={toggleCalendar}
        disabled={disabled}
        style={style}
      />

      <button type="button" className={buttonWrapper} onClick={toggleCalendar}>
        <img
          className={imageWrapper}
          style={imgStyle}
          src={
            themeUi === "REGALBLAZE"
              ? "/assets/img/mto/OrderRescheduling/edit-calendar-yellow.svg"
              : "/assets/img/mto/OrderRescheduling/edit-calendar.svg"
          }
          alt="calendar-icon"
        />
      </button>

      <button type="button" className={buttonWrapper} onClick={handleClearDate}>
        <img
          className={imageWrapper}
          style={imgStyle}
          src={
            themeUi === "REGALBLAZE"
              ? "/assets/img/Clear_Due_Date_Yellow.svg"
              : "/assets/img/Clear_Due_Date.svg"
          }
          alt="clear-icon"
        />
      </button>

      {showCalendar &&
        ReactDOM.createPortal(
          <div
            ref={calendarRef}
            className={calendarPopup}                   
            style={{
              top: calendarPosition.top,
              left: calendarPosition.left,
              ...calVars
            }}
          >
            <Calendar
              className={`${calendarBase} ${
                themeUi === "REGALBLAZE" ? "regalblaze" : "magenta"
              }`}
              onChange={handleCalendarChange}
              value={value ? new Date(value) : new Date()}
              minDate={undefined}
              tileDisabled={({ date }) => {
                if (!props.data?.EPD) return false;
                const epdDate = new Date(props.data.EPD);
                const epdOnly = new Date(
                  epdDate.getFullYear(),
                  epdDate.getMonth(),
                  epdDate.getDate()
                );
                const current = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate()
                );
                return current < epdOnly;
              }}
            />
          </div>,
          document.body
        )}
    </div>
  );
};

export default DateCellRenderer;
