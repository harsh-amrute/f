import { style, createVar } from "@vanilla-extract/css";
import * as globalStyles from "../../../styles/global";

// runtime-controlled background
export const buttonBgVar = createVar();

export const buttonFloat = style({
  vars: {
    // default fallback (your non-REGALBLAZE gradient)
    [buttonBgVar]:
      "transparent linear-gradient(180deg, #bc3d81 0%, #820f4c 100%) 0% 0% no-repeat padding-box",
  },
  border: "none",
  width: "100%",
  height: "100%",
  color: globalStyles.white,
  background: buttonBgVar,
  fontSize: "16px",
  borderRadius: "6px",
  fontWeight: 500,
  opacity: 1,
  alignItems: "center",
  justifyContent: "center",

  selectors: {
    '&:hover': {
      scale: '1.02'
    },
  },
});

export const Img = style({
  paddingRight: "10px",
});
