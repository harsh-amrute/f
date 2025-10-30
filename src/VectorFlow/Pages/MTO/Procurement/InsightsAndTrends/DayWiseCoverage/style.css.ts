import { style, createVar, globalStyle } from "@vanilla-extract/css";

/* dynamic vars */
export const statusDotColorVar = createVar();
export const dayBgColorVar = createVar();

/* header + status */
export const DayWiseCoverageHeaderContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  zoom: "0.75",
});

export const DayWiseCoverageStatus = style({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  fontSize: "16px",
  selectors: {
    "&::before": {
      content: "",
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      backgroundColor: statusDotColorVar,
      display: "block",
    },
  },
});

export const Divider = style({
  width: "0.5px",
  backgroundColor: "grey",
});

export const Text = style({
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
});

/* calendar */
export const CalenderContainer = style({
  width: "100%",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "rgba(0, 0, 0, 0.1) 5px 2px 14px 3px",
  margin: "16px 0",
});

export const CalenderTitle = style({
  background: "black",
  color: "white",
  margin: 0,
  padding: "5px 16px",
  fontSize: "12px",
});

export const CalenderContent = style({
  display: "flex",
});

export const CalenderMonths = style({
  borderRight: "1px solid lightgrey",
  display: "flex",
  flexDirection: "column",
  paddingBottom: "2rem", // for scrollbar width
});

export const CalenderMonth = style({
  padding: "8px 18px",
  margin: "0.5rem",
  border: "none",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  flex: 1,
});

export const Calender = style({
  fontSize: "10px",
  width: "100%",
  overflow: "auto",
  display: "block",
  borderCollapse: "collapse",
});

export const Day = style({
  padding: "8px",
  border: "none",
  margin: "1rem 0.65rem",
  width: "22px",
  height: "22px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: dayBgColorVar,
  color: "white",
  borderRadius: "50%",
  cursor: "pointer",
});

export const Month = style({
  borderBottom: "1.5px dashed lightgrey",
  display: "flex",
});

/* table + helpers */
export const TableContainer = style({
  background: "white",
  borderRadius: "8px",
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: "1rem 0",
  marginBottom: "2rem",
  boxShadow: "rgba(0, 0, 0, 0.1) 5px 2px 14px 3px",
  // selectors: {
  //   "& > :global(.ag-theme-alpine)": {
  //     width: "100%",
  //     margin: "unset",
  //     height: "100% !important",
  //     minHeight: "400px",
  //   },
  // },
});
// Style the AG Grid *child* via globalStyle (allowed for non-& targets)
globalStyle(`${TableContainer} > .ag-theme-alpine`, {
  width: "100%",
  margin: "unset",
  height: "100% !important",
  minHeight: "400px",
});



export const AnimationWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "2rem",
});

export const HelperText = style({
  fontSize: "22px",
  width: "65%",
  textAlign: "center",
});

/* analytics table */
export const AnalyticsTable = style({
  background: "rgb(56, 55, 55)",
  color: "white",
  margin: "1rem",
  fontSize: "12px",
  borderCollapse: "collapse",
  padding: "1rem",
  display: "block",
  borderRadius: "4px",
});

export const AnalyticsRow = style({
  selectors: {
    "thead &:nth-of-type(2)": {
      border: "1px dashed #B4B4B4",
      borderLeft: "none",
      borderRight: "none",
    },
  },
});

export const AnalyticsCol = style({
  padding: "0.5rem",
  textAlign: "center",
});

/* icon (empty class for consistency) */
export const Icon = style({});

export const headerRow = style({});

export const headerCell = style({
  padding: "10px 12px",
  textAlign: "center",
  fontFamily: "Roboto",
  fontWeight: 600,
  fontSize: "14px",
  color: "#000",
});

export const bodyRow = style({
  borderTop: "1px solid #e5e5e5",
});

export const cell = style({
  padding: "10px 12px",
  fontFamily: "Roboto",
  fontSize: "14px",
  color: "#000",
});

export const cellRight = style({
  padding: "10px 12px",
  fontFamily: "Roboto",
  fontSize: "14px",
  textAlign: "right",
});

export const totalRow = style({
  background: "#000",
});

export const totalCell = style({
  color: "#fff",
  fontWeight: 600,
});
