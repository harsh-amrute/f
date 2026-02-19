// styles.css.ts
import { style, createVar, globalStyle } from "@vanilla-extract/css";

/* ======= Vars (for runtime overrides) ======= */
export const chartHeightVar = createVar();

/* ======= Chart wrapper (keeps your nested rules) ======= */
export const chartWrapper = style({
  position: "relative",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",

  // selectors: {
  //   "& .chart-wrapper > div": {
  //     height: "100% !important",
  //   },
  //   "& .chart-wrapper > div .ag-charts-wrapper": {
  //     maxHeight: "100% !important",
  //   },
  //   "& .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas": {
  //     height: "100%",
  //   },
  //   "& .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas > canvas": {
  //     height: "100% !important",
  //   },
  // },
});

/* Descendant rules scoped to the wrapper */
globalStyle(`${chartWrapper} .chart-wrapper > div`, {
  height: '100%', // avoid !important; bump specificity if needed
});
globalStyle(`${chartWrapper} .chart-wrapper > div .ag-charts-wrapper`, {
  maxHeight: '100%',
});
globalStyle(`${chartWrapper} .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas`, {
  height: '100%',
});
globalStyle(`${chartWrapper} .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas > canvas`, {
  height: '100%', // avoid !important
});



/* ======= Container with dynamic height ======= */
export const scChartContainer = style({
  padding: "5px",
  borderRadius: "12px",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  margin: "20px",
  height: chartHeightVar, // runtime-controlled (fallback set by class below)
});

/* Default var value so you get `auto` if you don’t override it */
export const scChartContainerDefaults = style({
  vars: {
    [chartHeightVar]: "auto",
  },
});

/* ======= Main container ======= */
export const scChartMainContainer = style({
  display: "flex",
  justifyContent: "spaceBetween",
});

/* ======= Horizontal divider ======= */
export const scHorizontalDivider = style({
  width: "100%",
  border: "none",
  borderTop: "1px solid #B2B2B2",
});

export const BTRAllomentSection = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  maxHeight: "100%",
  paddingBottom: "20px"
});

export const BTRTableWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginTop: 20,
  marginBottom: 20,
  height: "100%",
});

export const HorizontalViewWrapper = style({
  width: "100%",
});

export const SCChartHeaderContainer = style({
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "54px",
});
