import { style, globalStyle } from "@vanilla-extract/css";
import Calendar from "react-calendar";

export const applyZoomOut = style({
  zoom: "0.7",
});

export const orderReschedulingWrapper = style({
  width: "100%",
  position: "relative",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});
globalStyle(`${orderReschedulingWrapper} .toolbar-container`, {
  margin: 0,
  paddingTop: "20px",
});

export const vfTableWrapper = style({
  height: "100%",
  paddingLeft: "20px",
  display: "flex",
  flexDirection: "column",
});
globalStyle(`${vfTableWrapper} div[data-testid="vf_pagination"]`, {
  marginTop: "0 !important",
});

globalStyle(`${vfTableWrapper} .ag-theme-noir-fusion`, {
  margin: "0 !important",
});

export const paginationWrapper = style({});

export const etaCellRendererWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  padding: "1rem",
});

export const etaCellValue = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 6px 12px #77777729",
  border: "0.4px solid #707070",
  borderRadius: "2px",
  height: "30px",
  width: "100%",
  padding: "4px",
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
  fontSize: "12px",
  padding: "4px",
  fontWeight: 400,
  fontFamily: "Roboto",
  border: "none",
  pointerEvents: "none",
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
  height: "15px",
  width: "15px",
});

// Optional: input style used in ReasonCellRenderer
export const reasonInput = style({
    border: '1px solid black',
    fontSize: '12px',
    height: '28px',
    width: '100%',
  });
  