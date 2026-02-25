// styles.css.ts
import { style, createVar } from "@vanilla-extract/css";

export const bgVar = createVar();
export const textVar = createVar();
export const maxWVar = createVar();

export const bprColorCellRendererWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "90%",
  boxShadow: "0px 6px 12px #8D8D8D29",
  borderRadius: "4px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  // defaults in case you don't set the vars
  vars: {
    [bgVar]: "transparent",
    [textVar]: "inherit",
    [maxWVar]: "none",
  },

  backgroundColor: bgVar,
  color: textVar,
  maxWidth: maxWVar,
});
