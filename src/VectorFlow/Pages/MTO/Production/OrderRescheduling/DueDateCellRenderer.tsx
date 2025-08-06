import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useUserData } from "../../../../../context/index";
import VFDatePicker from '../../Common/VFDatePicker';
import _ from 'lodash';

type Value = CalendarProps['value'];

const DueDateCellRenderer = (params: any) => {
  const [currDate, setCurrDate] = useState(() => {
    if (!_.isEmpty(params.data)) {
      return params.data.dd;
    }
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const format2 = "YYYY-MM-DD";
  const [minDate] = useState(new Date());

  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null); 
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  useEffect(() => {
    if (!params.node.selected && !_.isEmpty(params.data)) {
        params.data.dd = params.data.oldDate;
        setCurrDate(params.data.oldDate);
        setShowCalendar(false);
      }
  }, [params.node.selected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
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
    if (params.node.selected && !_.isEmpty(params.data)) {
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
    if (value && !(value instanceof Array) && !_.isEmpty(params.data)) {
      const formattedDate = moment(value).format(format2);
      setCurrDate(formattedDate);
      params.data.dd = formattedDate;
      setShowCalendar(false);
    }
  };

  if (_.isEmpty(params.data)) {
    return <></>
  }

  return (
    <VFDatePicker
      dateInputStyle={{
        background: 'transparent',
        paddingLeft: '-10px',
        color: params.data.oldDate === currDate ? 'black' : '#BC3D81',
      }}
      themeUi={themeUi}
      onDateChange={handleDateChange}
      date={!params.node.selected ? params.data.oldDate : currDate}
      minDate={minDate}
      showCalendarIcon={params.node.selected}
    />
  );
};

export default React.memo(DueDateCellRenderer);
