import { style, createVar, globalStyle } from "@vanilla-extract/css";

/* Optional runtime var for dynamic heights */
export const chartHeightVar = createVar();

/* -------- split layout / graphs -------- */
export const BTRTableWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginTop: "20px",
  marginBottom: "20px",
  height: "100%",
});

export const BTRAllomentSection = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  maxHeight: "100%",
});

export const HorizontalViewWrapper = style({
  width: "100%",
  height: "100%",
  // selectors: {
  //   "& .ag-theme-alpine": { height: "100%" },
  //   '& div[data-testid="vf_pagination"]': {
  //     padding: "0",
  //     marginTop: "-20px",
  //   },
  // },
});
/* descendants of HorizontalViewWrapper */
globalStyle(`${HorizontalViewWrapper} .ag-theme-alpine`, {
  height: "100%",
});
globalStyle(`${HorizontalViewWrapper} div[data-testid="vf_pagination"]`, {
  padding: "0",
  marginTop: "-20px",
});

/* -------- chart bits (kept for parity) -------- */
export const SCChartContainer = style({
  padding: "5px",
  borderRadius: "12px",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  margin: "20px",
  vars: { [chartHeightVar]: "auto" },
  height: chartHeightVar,
});

export const SCHorizontalDivider = style({
  width: "100%",
  border: "none",
  borderTop: "1px solid #B2B2B2",
});

/* -------- capsule + select wrappers -------- */
export const CapsuleWrapper = style({
  width: "100%",
  marginLeft: "auto",
});

export const SelectWrapper = style({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  paddingLeft: "30px",
});

export const SelectLabel = style({
  fontFamily: "Roboto",
  fontSize: "15px",
  fontWeight: 500,
  letterSpacing: "0",
});
