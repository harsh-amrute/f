import { style } from "@vanilla-extract/css";

export const VDRLayout = style({
  marginTop: "25px",
  marginLeft: "15px",
});

export const SDRColorCellRendererWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "97px",
  height: "34px",
  boxShadow: "0px 6px 12px #8D8D8D29",
  borderRadius: "4px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const SDRTagsCellRendererWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "55px",
  height: "25px",
  background: "#8E8E8E 0% 0% no-repeat padding-box",
  color: "#FFFFFF",
  boxShadow: "0px 6px 12px #8D8D8D29",
  borderRadius: "2px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 500, // "medium"
  fontSize: "14px",
  lineHeight: "19px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
