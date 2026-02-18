import { style } from "@vanilla-extract/css";

export const VFFilterWrapper = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "10px 24px",
  width: "100%",
  height: "56px",
  background: "#E8E8E8 0% 0% no-repeat padding-box",
  borderRadius: "6px",
});

export const VFFilterSeperator = style({
  width: "0px",
  height: "40px",
  outline: "1px solid #9F9F9F",
  margin: "0 35px",
});

export const VFFilterInputField = style({
  width: "100%",
  height: "37px",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  border: "none",
  outline: "none",
  color: "#313131",
  fontSize: "13px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 400,
  fontFamily: "Roboto",
  letterSpacing: "0px",
  lineHeight: "15px",
  padding: "0 16px",
  borderRadius: "6px",
});

export const VFFilterDustbinIcon = style({
  width: "30px",
  height: "30px",
  cursor: "pointer",
});
