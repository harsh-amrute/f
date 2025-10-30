import { style, createVar } from "@vanilla-extract/css";

/* ------- dynamic vars ------- */
export const headerWidthVar = createVar();
export const cellWidthVar = createVar();

export const taskLeftVar = createVar();
export const taskWidthVar = createVar();
export const taskBgVar = createVar();

export const paletteColorVar = createVar();

/* ------- layout ------- */
export const sectionWrapper = style({});

export const chartWrapper = style({
  width: "100%",
  height: "100%",
  borderRadius: "8px",
  overflow: "hidden",
  display: "flex",
});

export const columnSection = style({
  display: "flex",
  flexDirection: "column",
  borderCollapse: "collapse",
  minWidth: "20px",
});

export const calendarSection = style({
  border: "1px solid #ccc",
  borderRadius: "0 8px 0 0",
  background: "black",
  flex: "1 1 0",
  overflowX: "auto",
});

/* ------- table bits ------- */
export const columnHeaderRow = style({
  height: "50px",
  background: "black",
  border: "1px solid #ccc",
});

export const contentRow = style({
  height: "30px",
  position: "relative",
  border: "1px solid #ccc",
  selectors: {
    "&:nth-child(odd)": { background: "#f5f5f5" },
    "&:nth-child(even)": { background: "#ffffff" },
  },
});

export const headerCell = style({
  position: "relative",
  padding: "8px",
  height: "100%",
  borderRight: "1px solid #ccc",
  color: "white",
  textAlign: "center",
  width: headerWidthVar,
  minWidth: "30px",
});

export const resizeHandle = style({
  position: "absolute",
  right: 0,
  top: 0,
  width: "5px",
  height: "100%",
  cursor: "col-resize",
  userSelect: "none",
});

export const contentCell = style({
  borderLeft: "1px solid #ccc",
  textAlign: "center",
  fontSize: "0.9rem",
  fontWeight: 300,
  width: cellWidthVar,
  minWidth: "30px",
});

export const calendarTable = style({
  borderCollapse: "collapse",
  width: "100%",
  height: "100%",
});

export const calendarHeaderRow = style({
  height: "20px",
  background: "black",
  border: "1px solid #ccc",
  color: "white",
  textAlign: "center",
  flex: "0 0 auto",
});

export const calendarCell = style({
  border: "1px solid #ccc",
  textAlign: "center",
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "white",
  background: "black",
  minWidth: "60px",
  height: "20px",
  lineHeight: "22px",
  whiteSpace: "nowrap",
});

/* ------- task bar ------- */
export const taskBar = style({
  position: "absolute",
  background: taskBgVar,
  height: "20px",
  borderRadius: "2px",
  top: "4px",
  border: "0.5px solid #333",
  textAlign: "center",
  color: "white",
  left: taskLeftVar,
  width: taskWidthVar,
  cursor: "pointer",
  transition: "transform 80ms ease, opacity 80ms ease",
  selectors: {
    "&:hover": {
      opacity: 0.8,
      transform: "scale(1.01)",
    },
  },
});

/* ------- legend & zoom ------- */
export const legendWrapper = style({
  display: "flex",
  alignItems: "center",
  height: "20px",
  width: "100%",
  justifyContent: "center",
});

export const zoomSection = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

export const zoomButtonWrapper = style({
  display: "flex",
  alignItems: "center",
  border: "1px solid #ccc",
  borderRadius: "0 0 4px 4px",
  overflow: "hidden",
  gap: "4px",
  padding: "2px",
});

export const zoomButtonBase = style({
  background: "white",
  color: "#333",
  border: "1px solid #333",
  borderRadius: "4px",
  padding: "3px 6px",
  cursor: "pointer",
  fontSize: "0.9rem",
  selectors: {
    "&:hover": { background: "#555", color: "white" },
    "&:focus": { outline: "none", boxShadow: "0 0 0 2px #333" },
    "&:disabled": { cursor: "not-allowed", opacity: 0.6 },
  },
});

export const zoomButtonActive = style({
  background: "#cecece",
  color: "#333",
  border: "none",
  selectors: {
    "&:hover": { background: "#cecece", color: "#8A8686" },
  },
});

export const colorPallete = style({
  width: "15px",
  height: "15px",
  background: paletteColorVar,
  borderRadius: "3px",
  marginRight: "6px",
  border: "0.4px solid #333",
});

export const label = style({
  fontSize: "0.9rem",
  color: "#333",
  marginRight: "16px",
});
