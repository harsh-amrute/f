// styles.css.ts
import { style, styleVariants, createVar } from "@vanilla-extract/css";

/* runtime vars */
export const fillPercentVar = createVar();
export const fillBgVar = createVar();

/* wrapper */
export const availabilityCellRendererWrapper = style({
  height: "100%",
  width: "100%",
  display: "flex",
  paddingRight: "40px",
  alignItems: "center",
  justifyContent: "right",
  gap: "10px",
});

/* bar base */
export const availabilityCellRenderer = style({
  position: "relative",
  height: "100%",
  maxHeight: "15px",
  width: "45px",
  maxWidth: "45px",
  background: "#DEDEDE 0% 0% no-repeat padding-box",

  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      maxWidth: "45px",
      width: fillPercentVar, // set at runtime
      background: fillBgVar, // set by variant
    },
  },
});

/* theme variants (sets the background var used above) */
export const barTheme = styleVariants({
  REGALBLAZE: {
    vars: {
      [fillBgVar]:
        "linear-gradient(90deg, #FCA311 0%, #CB830E 100%) 0% 0% no-repeat padding-box",
    },
  },
  DEFAULT: {
    vars: {
      [fillBgVar]:
        "linear-gradient(90deg, #EB73B3 0%, #820F4C 100%) 0% 0% no-repeat padding-box",
    },
  },
});
