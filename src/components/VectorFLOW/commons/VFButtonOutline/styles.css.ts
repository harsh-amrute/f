// styles.css.ts
import { style, createVar } from "@vanilla-extract/css";
import * as globalStyles from "../../../../styles/global";

/** runtime-set variables */
export const strokeColorVar = createVar(); // border + text color
export const widthPxVar = createVar(); // width in px

const base = style({
  color: strokeColorVar,
  background: "#fefefe",
  borderRadius: "6px",
  fontSize: "16px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  fontWeight: 300,
  width: widthPxVar,
  height: "50px",
  boxShadow: "-5px 5px 10px #71717129",
  border: `1px solid ${strokeColorVar}`,

  selectors: {
    "&:hover": {
      transform: "scale(1.01)",
      transition: "all 0.2s ease-in-out",
    },
    "&:active": {
      transform: "scale(1.04) translateY(0.1px)",
    },
  },
});

/** default values so it looks fine even if you forget to pass inline vars */
export const scButtonOutline = style([
  base,
  {
    vars: {
      [strokeColorVar]: strokeColorVar,
      [widthPxVar]: widthPxVar,
    },
  },
]);

/** optional helper class for disabled state (blocks pointer events) */
export const disabled = style({
  pointerEvents: "none",
});
