import { style, createVar, globalStyle } from "@vanilla-extract/css";

export const calFocusBgVar = createVar();
export const calActiveBgVar = createVar();
export const calNowBgVar = createVar();
export const calHoverBgVar = createVar();

export const DatePickerWrapper = style({
  display: "flex",
  cursor: "pointer",
  flexDirection: "row",
  width: "180px",
  padding: "5px",
  justifyContent: "sapce-between",
});
export const TextInputWrapper = style({
  width: "80%",
  height: "100%",
  textAlign: "center",
  letterSpacing: "0px",
  opacity: 1,
  fontSize: "12px",
  padding: "4px",
  fontFamily: "Roboto",
  border: "none",
  pointerEvents: "none",
  background: "transparent",
});
export const ButtonWrapper = style({
  background: "none",
});
export const ImageWrapper = style({
  cursor: "pointer",
  height: "15px",
  width: "15px",
});

/* Host to carry inline CSS vars (wrapper around <Calendar />) */
export const calendarVarsHost = style({});

/* Root class applied to the Calendar itself */
export const calendarRoot = style({
  width: 250,
  // selectors: {
  //   '& .react-calendar__navigation__label__labelText': { fontWeight: 400 },
  //   '& .react-calendar__navigation button': { minWidth: 40, background: 'none' },
  //   '& .react-calendar__navigation button:disabled': { backgroundColor: '#e6e6e6' },
  //   '& .react-calendar__navigation button:enabled:focus': {
  //     backgroundColor: `var(${calFocusBgVar})`,
  //     color: 'white',
  //   },
  //   '& .react-calendar__navigation button:disabled:hover': { backgroundColor: 'rgb(230,230,230)' },
  //   '& .react-calendar__month-view__weekdays__weekday': { textDecoration: 'none' },
  //   '& .react-calendar__tile--now': { background: `var(${calNowBgVar})` },
  //   '& .react-calendar__tile--active': { backgroundColor: `var(${calActiveBgVar})`, color: 'white' },
  //   '& .react-calendar__tile--hasActive': { backgroundColor: `var(${calActiveBgVar})`, color: 'white' },
  //   '& .react-calendar__tile:disabled': { backgroundColor: 'white', color: '#ababab' },
  //   '& .react-calendar__tile:disabled:hover': { backgroundColor: 'white' },
  //   '& .react-calendar__month-view__days__day--weekend': { color: '#121212' },
  //   '& .react-calendar__tile:hover': { backgroundColor: `var(${calHoverBgVar})`, color: 'black' },
  //   '& .react-calendar__navigation button:hover': { backgroundColor: `var(${calHoverBgVar})` },
  //   '& .react-calendar__month-view__days__day--neighboringMonth, & .react-calendar__month-view__days__day--neighboringMonth.react-calendar__tile--weekend':
  //     { color: '#757575' },
  // },
});
/* -------- Descendant rules (scoped) -------- */
globalStyle(`${calendarRoot} .react-calendar__navigation__label__labelText`, {
  fontWeight: 400,
});

globalStyle(`${calendarRoot} .react-calendar__navigation button`, {
  minWidth: "40px",
  background: "none",
});

globalStyle(`${calendarRoot} .react-calendar__navigation button:disabled`, {
  backgroundColor: "#e6e6e6",
});

globalStyle(
  `${calendarRoot} .react-calendar__navigation button:enabled:focus`,
  {
    backgroundColor: `var(${calFocusBgVar})`,
    color: "white",
  }
);

globalStyle(
  `${calendarRoot} .react-calendar__navigation button:disabled:hover`,
  {
    backgroundColor: "rgb(230, 230, 230)",
  }
);

globalStyle(`${calendarRoot} .react-calendar__month-view__weekdays__weekday`, {
  textDecoration: "none",
});

globalStyle(`${calendarRoot} .react-calendar__tile--now`, {
  background: `var(${calNowBgVar})`,
});

globalStyle(`${calendarRoot} .react-calendar__tile--active`, {
  backgroundColor: `var(${calActiveBgVar})`,
  color: "white",
});

globalStyle(`${calendarRoot} .react-calendar__tile--hasActive`, {
  backgroundColor: `var(${calActiveBgVar})`,
  color: "white",
});

globalStyle(`${calendarRoot} .react-calendar__tile:disabled`, {
  backgroundColor: "white",
  color: "#ababab",
});

globalStyle(`${calendarRoot} .react-calendar__tile:disabled:hover`, {
  backgroundColor: "white",
});

globalStyle(`${calendarRoot} .react-calendar__month-view__days__day--weekend`, {
  color: "#121212",
});

globalStyle(`${calendarRoot} .react-calendar__tile:hover`, {
  backgroundColor: `var(${calHoverBgVar})`,
  color: "black",
});

globalStyle(`${calendarRoot} .react-calendar__navigation button:hover`, {
  backgroundColor: `var(${calHoverBgVar})`,
});

globalStyle(
  `${calendarRoot} .react-calendar__month-view__days__day--neighboringMonth, ` +
    `${calendarRoot} .react-calendar__month-view__days__day--neighboringMonth.react-calendar__tile--weekend`,
  { color: "#757575" }
);
