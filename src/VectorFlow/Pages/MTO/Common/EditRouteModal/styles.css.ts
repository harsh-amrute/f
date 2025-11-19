// RouteContent.css.ts
import { style, globalStyle, createVar } from "@vanilla-extract/css";

/* ---------------- RouteContentWrapper + chart globals ---------------- */

export const routeContentWrapper = style({
  margin: "2rem",
  width: "70vw",
  height: "60vh",
  overflow: "auto",
});

// .chart-wrapper inside RouteContentWrapper
globalStyle(`${routeContentWrapper} .chart-wrapper`, {
  width: "100%",
  maxHeight: "35vh",
  height: "35vh",
  padding: "0px 20px 0px 10px",
});

// .chart-wrapper > div
globalStyle(`${routeContentWrapper} .chart-wrapper > div`, {
  height: "100%",
});

// .chart-wrapper > div .ag-charts-wrapper
globalStyle(
  `${routeContentWrapper} .chart-wrapper > div .ag-charts-wrapper`,
  {
    maxHeight: "100%",
  }
);

// .ag-charts-canvas
globalStyle(
  `${routeContentWrapper} .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas`,
  {
    height: "100%",
  }
);

// .ag-charts-canvas > canvas
globalStyle(
  `${routeContentWrapper} .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas > canvas`,
  {
    height: "100%",
  }
);

// .chart-scroll
globalStyle(`${routeContentWrapper} .chart-wrapper .chart-scroll`, {
  height: "95%",
  width: "100%",
});

/* ---------------- Simple text wrappers ---------------- */

export const text = style({
  fontSize: 14,
  fontWeight: 300,
});

export const folGapCalculateContentWrapper = style({
  display: "flex",
  margin: "5px 0px",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const dueDateContentWrapper = style({
  display: "flex",
  flexDirection: "row",
  gap: "5rem",
  padding: "0px 15px",
  background: "#F8F8F8",
  border: "1px solid #EBEBEB",
  borderRadius: 2,
  boxShadow: "-5px 4px 5px #EBEBEB",
});

/* ---------------- DueDateOptionLabel with vars ---------------- */

// vars for isCRDDDisabled behavior
export const dueDatePointerEventsVar = createVar();
export const dueDateOpacityVar = createVar();

export const dueDateOptionLabel = style({
  alignItems: "center",
  display: "flex",
  gap: "5px",
  cursor: "pointer",

  pointerEvents: dueDatePointerEventsVar,
  opacity: dueDateOpacityVar,

  vars: {
    [dueDatePointerEventsVar]: "auto",
    [dueDateOpacityVar]: "1",
  },
});

/* ---------------- Label text + date text ---------------- */

export const dueDateOptionLabelText = style({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  font: "normal normal 500 12px/16px Roboto",
  color: "#585858",
});

export const dueDateOptionDateText = style({
  alignItems: "center",
  font: "normal normal 500 12px/16px Roboto",
  color: "#000000",
});

/* ---------------- FolGap wrappers ---------------- */

export const folGapContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  margin: "2rem",
  width: "50vw",
  height: "50vh",
  overflow: "auto",
  alignItems: "center",
});

export const folGapDetailHeader = style({
  textAlign: "center",
  font: "normal normal 300 20px/40px Roboto",
  color: "#000000",
});

export const folGapDetailHeaderInfo = style({
  textAlign: "center",
  font: "normal normal 500 16px/40px Roboto",
  color: "#BC3D81",
});

export const folGapDetailDiv = style({
  display: "flex",
  flexDirection: "column",
  background: "#ffffff 0% 0% no-repeat padding-box",
  border: "1px solid #EBEBEB",
  borderRadius: 8,
  opacity: 1,
  height: "50vh",
  width: "40vw",
  alignItems: "center", // fixed typo from align-item
  padding: "20px 30px",
});

export const folGapDetailHeaderInfoMain = style({
  textAlign: "center",
  font: "normal normal 500 16px/40px Roboto",
  letterSpacing: 0,
  color: "#000000",
});
