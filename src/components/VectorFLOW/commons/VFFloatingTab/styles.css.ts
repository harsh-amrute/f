import { style } from "@vanilla-extract/css";

export const VFFloatingTabWrapper = style({
  position: "relative",
  height: "52px",
  background: "#FFFFFF",
  boxShadow: "-3px 3px 12px #8B8B8B41",
  borderRadius: "30px",
  display: "inline-flex",
  alignItems: "center",
  paddingRight: "10px",
  minWidth: "270px",
});

export const VFFloatingTabButton = style({
  height: "36px",
  padding: "0 10px",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "19px",
  fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif",
  letterSpacing: "0px",
  backgroundColor: "transparent",
  borderRadius: "30px",
  marginLeft: "10px",
  transition: "color 0.3s ease",
  zIndex: 10,
  border: "none",
  cursor: "pointer",
});

export const VFFloatingTabButtonActive = style({
  color: "white",
});

export const VFFloatingTabButtonInactive = style({
  color: "#2E2E2E",
});

export const VFFloatingTabButtonActiveShadow = style({
  position: "absolute",
  height: "36px",
  borderRadius: "30px",
  boxShadow: "-3px 3px 12px #8B8B8B41",
  transition: "left 0.3s ease",
  zIndex: 9,
  // background is set inline based on theme
});
