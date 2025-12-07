import { useEffect, useRef, useState } from "react";
import moment from "moment";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReactDOM from "react-dom";
import { useUserData } from "../../../../../context/index";
import {
  calendarBase,
  imageWrapper,
  textInputWrapper,
} from "../ElephantOrders/styles.css";
import {
  DatePickerWrapper,
  TextInputWrapper,
  ButtonWrapperForSubmitRemark,
  ImageWrapper,
} from "./styles.css";

interface AGGridProps {
  value: string;
  data: any;
  setValue?: (value: any) => void;
  onDateChange?: (date: string, rowData: any) => void;
  onClearDate?: (rowData: any) => void;
  [key: string]: any;
}

type Value = CalendarProps["value"];

const ETACellRenderer = (props: AGGridProps) => {
  const {
    value,
    onDateChange: externalOnDateChange,
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
      setCalendarPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 20,
      });
    }
    setShowCalendar((prev) => !prev);
  };

  const handleCalendarChange = (value: Value) => {
    if (value instanceof Date) {
      const formatted = moment(value).format("YYYY-MM-DD");

      if (typeof props.setValue === "function") {
        props.setValue(formatted);
      }

      if (typeof externalOnDateChange === "function") {
        externalOnDateChange(formatted, props.data);
      }

      setShowCalendar(false);
    }
  };

  return (
    <div className={DatePickerWrapper}>
      <input
        type="text"
        className={textInputWrapper}
        ref={inputRef}
        value={value ? moment(value).format("YYYY-MM-DD") : ""}
        readOnly
        placeholder="YYYY-MM-DD"
        onClick={toggleCalendar}
        style={style}
        disabled={disabled}
      />

      <button
        className={ButtonWrapperForSubmitRemark}
        type="button"
        onClick={toggleCalendar}
      >
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

      {showCalendar &&
        ReactDOM.createPortal(
          <div
            ref={calendarRef}
            style={{
              position: "absolute",
              top: calendarPosition.top,
              left: calendarPosition.left,
              zIndex: 9999,
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <Calendar
              data-theme={themeUi}
              className={calendarBase}
              onChange={handleCalendarChange}
              value={value ? new Date(value) : new Date()}
              minDate={undefined}
            />
          </div>,
          document.body
        )}
    </div>
  );
};

export default ETACellRenderer;
