import { style } from "@vanilla-extract/css";

export const floatingTabWrapper = style({
  position: "relative",
  height: "52px",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "-3px 3px 12px #8B8B8B41",
  borderRadius: "30px",
  display: "inline-flex",
  alignItems: "center",
  paddingRight: "10px",
});

export const floatingTabButton = style({
  height: "36px",
  padding: "0 10px",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "19px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  backgroundColor: "transparent",
  borderRadius: "30px",
  border: "none",
  color: "#2E2E2E",
  marginLeft: "10px",
  transition: "color 0.3s ease",
  zIndex: 10,
  cursor: "pointer",
});

export const floatingTabButtonActive = style({
  color: "white",
});

export const floatingTabButtonActiveShadow = style({
  position: "absolute",
  height: "36px",
  backgroundColor: "rgb(188, 61, 129)",
  color: "white",
  borderRadius: "30px",
  boxShadow: "-3px 3px 12px #8B8B8B41",
  transition: "left 0.3s",
  zIndex: 9,
  // You'll likely set `left` and `width` inline (or via state) to match the active button
});
