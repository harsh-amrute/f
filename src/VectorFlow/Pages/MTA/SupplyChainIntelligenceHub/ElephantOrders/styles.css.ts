import { style, globalStyle } from "@vanilla-extract/css";

// import Calendar, { CalendarProps } from 'react-calendar';

/* ---------- Layouts / wrappers ---------- */
export const eoLayout = style({
  marginTop: "25px",
  marginLeft: "-36px",
});

export const eoColorCellRendererWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "97px",
  height: "34px",
  boxShadow: "0px 6px 12px #8D8D8D29",
  borderRadius: "4px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const eoTagsCellRendererWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "55px",
  height: "25px",
  background: "#8E8E8E 0% 0% no-repeat padding-box",
  color: "#FFFFFF",
  boxShadow: "0px 6px 12px #8D8D8D29",
  borderRadius: "2px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "19px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const datePickerWrapper = style({
  display: "flex",
  cursor: "pointer",
  flexDirection: "row",
  width: "180px",
  padding: "5px",
  justifyContent: "space-between", // fixed typo
});

export const textInputWrapper = style({
  width: "80%",
  height: "100%",
  textAlign: "center",
  letterSpacing: "0px",
  opacity: 1,
  fontSize: "14px",
  padding: "4px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 500, // "medium"
  fontFamily: "Roboto",
  border: "none",
  pointerEvents: "none",
  background: "transparent",
});

export const dateInputWrapper = style({
  opacity: 0,
  position: "absolute",
  pointerEvents: "none",
});

export const buttonWrapper = style({
  background: "none",
});

export const imageWrapper = style({
  cursor: "pointer",
  height: "20px",
  width: "20px",
});

export const saveDueDateWrapper = style({
  height: "35px",
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

/* ---------- Calendar (react-calendar) ---------- */
/* Base calendar styling applied to the <Calendar className={...}/> root */
export const calendarBase = style({
  width: "250px",
  // selectors: {
  //   "& .react-calendar__navigation__label__labelText": {
  //     fontWeight: "400 !important",
  //   },
  //   "& .react-calendar__navigation button:disabled": {
  //     backgroundColor: "#e6e6e6",
  //   },
  //   "& .react-calendar__navigation button": {
  //     minWidth: "40px",
  //     background: "none",
  //   },
  //   "& .react-calendar__navigation button:disabled:hover": {
  //     backgroundColor: "rgb(230, 230, 230)",
  //   },
  //   "& .react-calendar__month-view__weekdays__weekday": {
  //     textDecoration: "none",
  //   },
  //   "& .react-calendar__tile:disabled": {
  //     backgroundColor: "white",
  //     color: "#ababab",
  //   },
  //   "& .react-calendar__tile:disabled:hover": {
  //     backgroundColor: "white",
  //   },
  //   "& .react-calendar__month-view__days__day--weekend": {
  //     color: "#121212",
  //   },
  // },
});
// base descendant rules
globalStyle(`${calendarBase} .react-calendar__navigation__label__labelText`, {
  fontWeight: '400', // avoid !important; bump specificity if needed
});
globalStyle(`${calendarBase} .react-calendar__navigation button:disabled`, {
  backgroundColor: '#e6e6e6',
});
globalStyle(`${calendarBase} .react-calendar__navigation button`, {
  minWidth: '40px',
  background: 'none',
});
globalStyle(`${calendarBase} .react-calendar__navigation button:disabled:hover`, {
  backgroundColor: 'rgb(230, 230, 230)',
});
globalStyle(`${calendarBase} .react-calendar__month-view__weekdays__weekday`, {
  textDecoration: 'none',
});
globalStyle(`${calendarBase} .react-calendar__tile:disabled`, {
  backgroundColor: 'white',
  color: '#ababab',
});
globalStyle(`${calendarBase} .react-calendar__tile:disabled:hover`, {
  backgroundColor: 'white',
});
globalStyle(`${calendarBase} .react-calendar__month-view__days__day--weekend`, {
  color: '#121212',
});


/* Theme overrides */
export const calendarRegal = style({
  // selectors: {
  //   "& .react-calendar__navigation button:enabled:focus": {
  //     backgroundColor: "#C7810E",
  //     color: "white",
  //   },
  //   "& .react-calendar__tile--now": {
  //     background: "#E1B69F",
  //   },
  //   "& .react-calendar__tile--active": {
  //     backgroundColor: "#C7810E",
  //     color: "white",
  //   },
  //   "& .react-calendar__tile--hasActive": {
  //     backgroundColor: "#C7810E",
  //     color: "white",
  //   },
  //   "& .react-calendar__tile:hover": {
  //     backgroundColor: "#fee3b7",
  //     color: "black",
  //   },
  //   "& .react-calendar__navigation button:hover": {
  //     backgroundColor: "#fee3b7",
  //   },
  // },
});

export const calendarMagenta = style({
  // selectors: {
  //   "& .react-calendar__navigation button:enabled:focus": {
  //     backgroundColor: "#82104C",
  //     color: "white",
  //   },
  //   "& .react-calendar__tile--now": {
  //     background: "#e2a9c8",
  //   },
  //   "& .react-calendar__tile--active": {
  //     backgroundColor: "#82104C",
  //     color: "white",
  //   },
  //   "& .react-calendar__tile--hasActive": {
  //     backgroundColor: "#82104C",
  //     color: "white",
  //   },
  //   "& .react-calendar__tile:hover": {
  //     backgroundColor: "rgba(188, 61, 129, 0.2)",
  //     color: "black",
  //   },
  //   "& .react-calendar__navigation button:hover": {
  //     backgroundColor: "rgba(188, 61, 129, 0.2)",
  //   },
  // },
});
// theme overrides (scoped to wrapper + theme class)
globalStyle(`${calendarBase}.${calendarRegal} .react-calendar__navigation button:enabled:focus`, {
  backgroundColor: '#C7810E',
  color: 'white',
});
globalStyle(`${calendarBase}.${calendarRegal} .react-calendar__tile--now`, {
  background: '#E1B69F',
});
globalStyle(`${calendarBase}.${calendarRegal} .react-calendar__tile--active`, {
  backgroundColor: '#C7810E',
  color: 'white',
});
globalStyle(`${calendarBase}.${calendarRegal} .react-calendar__tile--hasActive`, {
  backgroundColor: '#C7810E',
  color: 'white',
});
globalStyle(`${calendarBase}.${calendarRegal} .react-calendar__tile:hover`, {
  backgroundColor: '#fee3b7',
  color: 'black',
});
globalStyle(`${calendarBase}.${calendarRegal} .react-calendar__navigation button:hover`, {
  backgroundColor: '#fee3b7',
});

globalStyle(`${calendarBase}.${calendarMagenta} .react-calendar__navigation button:enabled:focus`, {
  backgroundColor: '#82104C',
  color: 'white',
});
globalStyle(`${calendarBase}.${calendarMagenta} .react-calendar__tile--now`, {
  background: '#e2a9c8',
});
globalStyle(`${calendarBase}.${calendarMagenta} .react-calendar__tile--active`, {
  backgroundColor: '#82104C',
  color: 'white',
});
globalStyle(`${calendarBase}.${calendarMagenta} .react-calendar__tile--hasActive`, {
  backgroundColor: '#82104C',
  color: 'white',
});
globalStyle(`${calendarBase}.${calendarMagenta} .react-calendar__tile:hover`, {
  backgroundColor: 'rgba(188, 61, 129, 0.2)',
  color: 'black',
});
globalStyle(`${calendarBase}.${calendarMagenta} .react-calendar__navigation button:hover`, {
  backgroundColor: 'rgba(188, 61, 129, 0.2)',
});

/* Popup container for positioned calendar (top/left set inline) */
export const calendarPopup = style({
  position: "absolute",
  zIndex: 9999,
  backgroundColor: "white",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
});
