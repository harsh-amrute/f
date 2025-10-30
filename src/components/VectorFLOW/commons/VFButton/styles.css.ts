import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import * as globalStyles from "../../../../styles/global";

export const scButton = recipe({
  base: {
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
  },
  variants: {
    theme: {
      regalblaze: {
        // transparent linear-gradient(261deg, #FCA311 0%, #CB830E 100%) 0% 0% no-repeat padding-box
        background:
          "transparent linear-gradient(261deg, #FCA311 0%, #CB830E 100%) 0% 0% no-repeat padding-box",
      },
      magenta: {
        // transparent linear-gradient(74deg, #820F4C 0%, #BC3D81 100%) 0% 0% no-repeat padding-box
        background:
          "transparent linear-gradient(74deg, #820F4C 0%, #BC3D81 100%) 0% 0% no-repeat padding-box",
      },
    },
    disabled: {
      true: { opacity: 0.2 as any, pointerEvents: "none" },
      false: { opacity: 1, pointerEvents: "all" },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const tooltipText = style({
  // styled-components had !important; usually not needed, but you can keep it:
  padding: "8px 8px", // or '8px 8px !important'
});
