import { style, createVar, globalStyle } from '@vanilla-extract/css';

/* =======================
   Theme vars for Calendar
   ======================= */
export const calPrimaryVar = createVar();   // "#C7810E" | "#82104C"
export const calHoverVar   = createVar();   // "#fee3b7" | "rgba(188, 61, 129, 0.2)"
export const calTodayVar   = createVar();   // "#E1B69F" | "#e2a9c8"

/* ==============
   EOLayout
   ============== */
export const eoLayout = style({
  marginTop: 25,
  marginLeft: -36,
});

/* ==============================
   EOColorCellRendererWrapper
   ============================== */
export const eoColorCellRendererWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 97,
  height: 34,
  boxShadow: '0px 6px 12px #8D8D8D29',
  borderRadius: 4,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

/* =============================
   EOTagsCellRendererWrapper
   ============================= */
export const eoTagsCellRendererWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 55,
  height: 25,
  background: '#8E8E8E 0% 0% no-repeat padding-box',
  color: '#FFFFFF',
  boxShadow: '0px 6px 12px #8D8D8D29',
  borderRadius: 2,
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '19px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

/* ==================
   DatePickerWrapper
   ================== */
export const datePickerWrapper = style({
  display: 'flex',
  cursor: 'pointer',
  flexDirection: 'row',
  width: 180,
  padding: 5,
  justifyContent: 'space-between',
});

/* =================
   TextInputWrapper
   ================= */
export const textInputWrapper = style({
  width: '80%',
  height: '100%',
  textAlign: 'center',
  opacity: 1,
  fontSize: 14,
  padding: 4,
  fontStyle: 'normal',
  fontWeight: 500,
  fontFamily: 'Roboto',
  border: 'none',
  pointerEvents: 'none',
  background: 'transparent',
});

/* ================
   DateInputWrapper
   ================ */
export const dateInputWrapper = style({
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
});

/* =============
   ButtonWrapper
   ============= */
export const buttonWrapper = style({
  background: 'none',
  // border: 'none',
  // padding: 0,
});

/* =============
   ImageWrapper
   ============= */
export const imageWrapper = style({
  cursor: 'pointer',
  height: 20,
  width: 20,
  display: 'block',
});

/* ==================
   StyledCalendar base
   ================== */
export const calendarBase = style({
  width: 250,
  // selectors: {
  //   /* mimic the !important by doubling the selector */
  //   '& .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText': {
  //     fontWeight: 400,
  //   },

  //   '& .react-calendar__navigation button:disabled': {
  //     backgroundColor: '#e6e6e6',
  //   },

  //   '& .react-calendar__navigation button': {
  //     minWidth: 40,
  //     background: 'none',
  //   },

  //   '& .react-calendar__navigation button:enabled:focus': {
  //     backgroundColor: calPrimaryVar,
  //     color: 'white',
  //   },

  //   '& .react-calendar__navigation button:disabled:hover': {
  //     backgroundColor: 'rgb(230, 230, 230)',
  //   },

  //   '& .react-calendar__month-view__weekdays__weekday': {
  //     textDecoration: 'none',
  //   },

  //   '& .react-calendar__tile--now': {
  //     background: calTodayVar,
  //   },

  //   '& .react-calendar__tile--active': {
  //     backgroundColor: calPrimaryVar,
  //     color: 'white',
  //   },

  //   '& .react-calendar__tile--hasActive': {
  //     backgroundColor: calPrimaryVar,
  //     color: 'white',
  //   },

  //   '& .react-calendar__tile:disabled': {
  //     backgroundColor: 'white',
  //     color: '#ababab',
  //   },

  //   '& .react-calendar__tile:disabled:hover': {
  //     backgroundColor: 'white',
  //   },

  //   '& .react-calendar__month-view__days__day--weekend': {
  //     color: '#121212',
  //   },

  //   '& .react-calendar__tile:hover': {
  //     backgroundColor: calHoverVar,
  //     color: 'black',
  //   },

  //   '& .react-calendar__navigation button:hover': {
  //     backgroundColor: calHoverVar,
  //   },
  // },
});


/* All descendants must be in globalStyle (scoped to calendarBase) */
globalStyle(
  `${calendarBase} .react-calendar__navigation__label__labelText`,
  { fontWeight: 400 }
);

globalStyle(
  `${calendarBase} .react-calendar__navigation button:disabled`,
  { backgroundColor: '#e6e6e6' }
);

globalStyle(
  `${calendarBase} .react-calendar__navigation button`,
  { minWidth: 40, background: 'none' }
);

globalStyle(
  `${calendarBase} .react-calendar__navigation button:enabled:focus`,
  { backgroundColor: calPrimaryVar, color: 'white' }
);

globalStyle(
  `${calendarBase} .react-calendar__navigation button:disabled:hover`,
  { backgroundColor: 'rgb(230, 230, 230)' }
);

globalStyle(
  `${calendarBase} .react-calendar__month-view__weekdays__weekday`,
  { textDecoration: 'none' }
);

globalStyle(
  `${calendarBase} .react-calendar__tile--now`,
  { background: calTodayVar }
);

globalStyle(
  `${calendarBase} .react-calendar__tile--active`,
  { backgroundColor: calPrimaryVar, color: 'white' }
);

globalStyle(
  `${calendarBase} .react-calendar__tile--hasActive`,
  { backgroundColor: calPrimaryVar, color: 'white' }
);

globalStyle(
  `${calendarBase} .react-calendar__tile:disabled`,
  { backgroundColor: 'white', color: '#ababab' }
);

globalStyle(
  `${calendarBase} .react-calendar__tile:disabled:hover`,
  { backgroundColor: 'white' }
);

globalStyle(
  `${calendarBase} .react-calendar__month-view__days__day--weekend`,
  { color: '#121212' }
);

globalStyle(
  `${calendarBase} .react-calendar__tile:hover`,
  { backgroundColor: calHoverVar, color: 'black' }
);

globalStyle(
  `${calendarBase} .react-calendar__navigation button:hover`,
  { backgroundColor: calHoverVar }
);

/* ======================
   SaveDueDateWrapper
   ====================== */
export const saveDueDateWrapper = style({
  height: 35,
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});
