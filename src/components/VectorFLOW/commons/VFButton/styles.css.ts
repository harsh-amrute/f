import { style, createVar } from "@vanilla-extract/css";
import * as globalStyles from "../../../../styles/global";

// Variant vars (replacing recipe)
export const buttonBackgroundVar = createVar();
export const buttonOpacityVar = createVar();
export const buttonPointerEventsVar = createVar();

export const scButton = style({
  width: "130px",
  height: "50px",
  borderRadius: "6px",
  fontSize: "16px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  fontWeight: 300,
  color: "#FFFFFF",
  border: "none",
  boxShadow: "-5px 4px 10px #919191B3",

  // defaults (theme: regalblaze, disabled: false)
  vars: {
    [buttonBackgroundVar]:
      "transparent linear-gradient(261deg, #FCA311 0%, #CB830E 100%) 0% 0% no-repeat padding-box",
    [buttonOpacityVar]: "1",
    [buttonPointerEventsVar]: "all",
  },

  background: buttonBackgroundVar,
  opacity: buttonOpacityVar as any,
  pointerEvents: buttonPointerEventsVar,
});

export const tooltipText = style({
  padding: "8px 8px",
});
