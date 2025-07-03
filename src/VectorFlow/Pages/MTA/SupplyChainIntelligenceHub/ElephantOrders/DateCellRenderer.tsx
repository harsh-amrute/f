import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ReactDOM from 'react-dom';
import { useUserData } from "../../../../../context/index";
import {
  DatePickerWrapper,
  TextInputWrapper,
  ButtonWrapper,
  ImageWrapper,
  StyledCalendar
} from './styles';

interface AGGridProps {
  value: string;
  data: any;
  setValue?: (value: any) => void;
  onDateChange?: (date: string) => void;
  // cellRendererParams will be merged into props by AG Grid
  [key: string]: any;
}

type Value = CalendarProps['value'];

const DateCellRenderer = (props: AGGridProps) => {
  const { value, onDateChange: externalOnDateChange, disabled = false, style, imgStyle } = props;

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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  const toggleCalendar = () => {
    if (disabled) return;
    const rect = inputRef.current?.getBoundingClientRect();
    if (rect) {
      setCalendarPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 20
      });
    }
    setShowCalendar(prev => !prev);
  };

  const handleCalendarChange = (value: Value) => {
    if (value instanceof Date) {
      const formatted = moment(value).format('YYYY-MM-DD');

      // 1. Update grid cell value if setValue is available
      if (typeof props.setValue === 'function') {
        props.setValue(formatted);
      }

      // 2. Call external handler if provided via cellRendererParams
      if (typeof externalOnDateChange === 'function') {
        externalOnDateChange(formatted);
      }

      setShowCalendar(false);
    }
  };

  return (
    <DatePickerWrapper>
      <TextInputWrapper
        ref={inputRef}
        type="text"
        value={value ? moment(value).format('YYYY-MM-DD') : ''}
        placeholder="DD-MM-YYYY"
        readOnly
        onClick={toggleCalendar}
        disabled={disabled}
        style={style}
      />

      <ButtonWrapper type="button" onClick={toggleCalendar}>
        <ImageWrapper
          style={imgStyle}
          src={
            themeUi === 'REGALBLAZE'
              ? '/assets/img/mto/OrderRescheduling/edit-calendar-yellow.svg'
              : '/assets/img/mto/OrderRescheduling/edit-calendar.svg'
          }
          alt="calendar-icon"
        />
      </ButtonWrapper>

      {showCalendar &&
        ReactDOM.createPortal(
          <div
            ref={calendarRef}
            style={{
              position: 'absolute',
              top: calendarPosition.top,
              left: calendarPosition.left,
              zIndex: 9999,
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            <StyledCalendar
              themeUi={themeUi}
              onChange={handleCalendarChange}
              value={value ? new Date(value) : new Date()}
            />
          </div>,
          document.body
        )}
    </DatePickerWrapper>
  );
};

export default DateCellRenderer;
