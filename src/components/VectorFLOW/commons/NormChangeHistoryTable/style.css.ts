import { style, globalStyle } from "@vanilla-extract/css";

export const buttonWrapper = style({
  borderTop: "1px dashed #5757574B",
  height: "70px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingRight: "20px",
});

export const agContainer = style({
  display: "flex",
  justifyContent: "center",
  padding: "29px 15px 20px 15px",
});
export const agGridWrapper = style({});

// Apply AG Grid inner wrapper styles ONLY inside this box
export const agGridBox = style({});
globalStyle(`${agGridBox} .ag-root-wrapper`, {
  borderColor: "transparent",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 6px 12px #95959529",
  borderRadius: "8px",
});
