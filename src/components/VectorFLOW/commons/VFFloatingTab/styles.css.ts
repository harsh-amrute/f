import { style, createVar } from "@vanilla-extract/css";

/* runtime vars */
export const tabTextColorVar = createVar();
export const shadowLeftVar = createVar();
export const shadowWidthVar = createVar();
export const shadowBgVar = createVar();

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
  fontFamily: "Roboto",
  letterSpacing: "0px",
  backgroundColor: "transparent",
  borderRadius: "30px",
  marginLeft: "10px",
  transition: "color 0.3s ease",
  zIndex: 10,
  color: tabTextColorVar, // dynamic via assignInlineVars
  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
      transition: "all 0.3s ease-in-out",
    },
  },
});

export const VFFloatingTabButtonActiveShadow = style({
  position: "absolute",
  height: "36px",
  borderRadius: "30px",
  boxShadow: "-3px 3px 12px #8B8B8B41",
  transition: "left 0.3s",
  zIndex: 9,
  pointerEvents: "none", // don't block button clicks
  background: shadowBgVar, // dynamic
  left: shadowLeftVar, // dynamic
  width: shadowWidthVar, // dynamic
});
