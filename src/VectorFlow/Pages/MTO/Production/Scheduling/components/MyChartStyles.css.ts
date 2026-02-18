// SchedulingChart.css.ts
import { style, createVar } from "@vanilla-extract/css";

/* ---------- Vars ---------- */

// ChartWrapper height
export const chartHeightVar = createVar();

// Column / content cell width
export const cellWidthVar = createVar();

// Task bar positioning / color
export const taskBarLeftVar = createVar();
export const taskBarWidthVar = createVar();
export const taskBarBgVar = createVar();

// Zoom button vars
export const zoomBtnBgVar = createVar();
export const zoomBtnColorVar = createVar();
export const zoomBtnBorderVar = createVar();
export const zoomBtnHoverBgVar = createVar();
export const zoomBtnHoverColorVar = createVar();

// Color palette var
export const colorPaletteBgVar = createVar();

/* ---------- Layout / sections ---------- */

export const chartWrapper = style({
  width: "100%",
  height: chartHeightVar,
  borderRadius: 8,
  overflow: "hidden",
  display: "flex",
  position: "relative",
  vars: {
    [chartHeightVar]: "400px", // default
  },
});

export const columnSection = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 20,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
  borderRight: "1px solid #ccc",
  background: "white",
  zIndex: 0,
});

export const columnHeaderWrapper = style({
  position: "sticky",
  top: 0,
  zIndex: 0,
  background: "black",
  borderBottom: "1px solid #ccc",
});

export const columnBodyWrapper = style({
  flex: 1,
  overflowY: "hidden",
  overflowX: "hidden",
  selectors: {
    "&::-webkit-scrollbar": {
      width: 8,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "transparent",
    },
  },
});

export const calendarSection = style({
  border: "1px solid #ccc",
  borderRadius: "0 8px 0 0",
  background: "white",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export const calendarHeaderWrapper = style({
  position: "sticky",
  top: 0,
  zIndex: 0,
  background: "black",
  overflowX: "auto",
  overflowY: "hidden",
  borderBottom: "1px solid #ccc",
  selectors: {
    "&::-webkit-scrollbar": {
      height: 0,
    },
  },
});

export const calendarBodyWrapper = style({
  flex: 1,
  overflow: "auto",
});

/* ---------- Tables / rows / cells ---------- */

export const columnTable = style({
  borderCollapse: "collapse",
  width: "100%",
});

export const calendarTable = style({
  borderCollapse: "collapse",
  width: "max-content",
  minWidth: "100%",
});

export const columnHeaderRow = style({
  height: 50,
  background: "black",
});

export const columnHeaderRowTop = style({
  height: 50,
  background: "black",
});

export const contentRow = style({
  height: 30,
  position: "relative",
  borderBottom: "1px solid #ccc",
  selectors: {
    "&:nth-child(odd)": {
      background: "#f5f5f5",
    },
    "&:nth-child(even)": {
      background: "#ffffff",
    },
  },
});

export const headerCell = style({
  position: "relative",
  padding: 8,
  height: 56,
  borderRight: "1px solid #ccc",
  color: "white",
  textAlign: "center",
  background: "black",
  width: cellWidthVar,
  minWidth: cellWidthVar,
});

export const resizeHandle = style({
  position: "absolute",
  right: 0,
  top: 0,
  width: 5,
  height: "100%",
  cursor: "col-resize",
  userSelect: "none",
});

export const contentCell = style({
  borderRight: "1px solid #ccc",
  textAlign: "center",
  fontSize: "0.9rem",
  fontWeight: 300,
  padding: 4,
  // width: cellWidthVar,
  // minWidth: cellWidthVar,
});

export const calendarHeaderRow = style({
  height: 25,
  background: "black",
  color: "white",
  textAlign: "center",
});

export const calendarHeaderRowTop = style({
  height: 25,
  background: "black",
  color: "white",
  textAlign: "center",
});

export const calendarCell = style({
  border: "1px solid #ccc",
  textAlign: "center",
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "white",
  background: "black",
  minWidth: 100,
  width: 100,
  height: 25,
  lineHeight: "25px",
  whiteSpace: "nowrap",
});

export const calendarCellTop = style({
  border: "1px solid #ccc",
  textAlign: "center",
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "white",
  background: "black",
  minWidth: 100,
  width: 100,
  height: 25,
  lineHeight: "25px",
  whiteSpace: "nowrap",
});

export const taskContainer = style({
  position: "relative",
  height: 30,
  padding: 0,
  borderLeft: "1px solid #ccc",
  minWidth: 100,
  width: 100,
});

/* ---------- TaskBar ---------- */

export const taskBar = style({
  position: "absolute",
  background: taskBarBgVar,
  height: 20,
  borderRadius: 2,
  top: 4,
  border: "0.5px solid #333",
  textAlign: "center",
  color: "white",
  left: taskBarLeftVar,
  width: taskBarWidthVar,
  cursor: "pointer",
  wordWrap: "break-word",
  fontSize: "0.8rem",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  padding: "0 2px",
  lineHeight: "20px",
  vars: {
    [taskBarLeftVar]: "0px",
    [taskBarWidthVar]: "50px",
    [taskBarBgVar]: "green",
  },
  selectors: {
    "&:hover": {
      opacity: 0.8,
      transform: "scaleY(1.18)",
      zIndex: 10,
    },
  },
});

/* ---------- Legend / zoom / misc ---------- */

export const legendWrapper = style({
  display: "flex",
  alignItems: "center",
  height: 30,
  width: "100%",
  justifyContent: "center",
  padding: "5px 0",
  background: "white",
  borderTop: "1px solid #ccc",
});

export const sectionWrapper = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
});

export const zoomSection = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: 5,
  background: "white",
});

export const zoomButtonWrapper = style({
  display: "flex",
  alignItems: "center",
  border: "1px solid #ccc",
  borderRadius: 4,
  overflow: "hidden",
  gap: 4,
  padding: 2,
});

export const zoomButton = style({
  background: zoomBtnBgVar,
  color: zoomBtnColorVar,
  border: zoomBtnBorderVar,
  borderRadius: 4,
  padding: "3px 6px",
  cursor: "pointer",
  fontSize: "0.9rem",
  outline: "none",
  boxShadow: "none",
  vars: {
    [zoomBtnBgVar]: "white",
    [zoomBtnColorVar]: "#333",
    [zoomBtnBorderVar]: "1px solid #333",
    [zoomBtnHoverBgVar]: "#555",
    [zoomBtnHoverColorVar]: "white",
  },
  selectors: {
    "&:hover": {
      background: zoomBtnHoverBgVar,
      color: zoomBtnHoverColorVar,
    },
    "&:focus": {
      outline: "none",
      boxShadow: "0 0 0 2px #333",
    },
  },
});

export const colorPalette = style({
  width: 15,
  height: 15,
  background: colorPaletteBgVar,
  borderRadius: 3,
  marginRight: 6,
  border: "0.4px solid #333",
});

export const label = style({
  fontSize: "0.9rem",
  color: "#333",
  marginRight: 16,
});

export const tooltipWrapper = style({
  padding: 8,
  background: "rgba(60, 59, 59, 0.88)",
  border: "0.7px solid #ccc",
  borderRadius: 4,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  fontSize: "0.9rem",
  color: "rgba(197, 195, 195, 0.88)",
  width: "fit-content",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export const tooltipRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
});
