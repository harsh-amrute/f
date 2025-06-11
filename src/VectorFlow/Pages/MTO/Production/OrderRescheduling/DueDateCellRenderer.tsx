import { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useUserData } from "../../../../../context/index";
import {
  DatePickerWrapper,
  ImageWrapper,
  StyledCalendar,
  ButtonWrapper,
  TextInputWrapper
} from "./styles";
import ReactDOM from "react-dom";
import VFDatePicker from '../../Common/VFDatePicker';

type Value = CalendarProps['value'];

const DueDateCellRenderer = (params: any) => {
  const [currDate, setCurrDate] = useState(params.data.dd);
  const [showCalendar, setShowCalendar] = useState(false);
  const format2 = "YYYY-MM-DD";
  const [minDate] = useState(new Date());

  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null); 
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  useEffect(() => {
    if (!params.node.selected) {
      params.data.dd = params.data.oldDate;
      setCurrDate(params.data.oldDate);
      setShowCalendar(false);
    }
  }, [params.node.selected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      console.log(calendarRef?.current?.contains(target))
      if (
        //if user is inside calendar
        showCalendar &&
        calendarRef.current &&
        !calendarRef.current.contains(target) &&
        //if user is in input field
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
    if (params.node.selected) {
      const rect = inputRef.current?.getBoundingClientRect();
      if (rect) {
        setCalendarPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX
        });
      }
      setShowCalendar((prev) => !prev);
    }
  };

  const handleDateChange = (value: Value) => {
    if (value && !(value instanceof Array)) {
      const formattedDate = moment(value).format(format2);
      setCurrDate(formattedDate);
      params.data.dd = formattedDate;
      setShowCalendar(false);
    }
  };

  return (
    <DatePickerWrapper>
      <TextInputWrapper
        ref={inputRef}
        type="text"
        value={!params.node.selected ? params.data.oldDate : currDate}
        placeholder="DD-MM-YYYY"
        readOnly
        onClick={toggleCalendar}
        style={{
          background:'transparent',
          paddingLeft:'-10px',
          color: params.data.oldDate===currDate? 'black' : '#BC3D81',
        }}
      />

      {params.node.selected && (
      <>
        <ButtonWrapper type="button" onClick={toggleCalendar}>
          <ImageWrapper
          src={
            themeUi === "REGALBLAZE"
              ? "/assets/img/mto/OrderRescheduling/edit-calendar-yellow.svg"
              : "/assets/img/mto/OrderRescheduling/edit-calendar.svg"
          }
          alt="calendar-icon"
          />
        </ButtonWrapper>

      {params.node.selected && showCalendar &&
        ReactDOM.createPortal(
          <div
            ref={calendarRef}
            style={{
              position: "absolute",
              top: calendarPosition.top,
              left: calendarPosition.left,
              zIndex: 9999,
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
            }}
          >
        <StyledCalendar
          themeUi={themeUi}
          onChange={handleDateChange}
          value={new Date(currDate)}
          minDate={minDate}
      />
    </div>,
    document.body
  )}

        </>
      )}
      </DatePickerWrapper>
    // <VFDatePicker
    // //  style={{fontSize:'12px', fontWeight:'normal'}}
    // //  imgStyle={{height:'20px', width:'20px'}}
    //   themeUi={themeUi}
    //   onDateChange={handleDateChange}
    //   date={new Date(currDate)}
    //   minDate={minDate}
    
    // ></VFDatePicker>
  );
};

export default DueDateCellRenderer;
