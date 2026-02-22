import { style } from "@vanilla-extract/css";
import * as globalStyles from "../../../styles/global";

export const tabs = style({
  padding: "0 50px",
});

export const tab = style({
  fontSize: "1.4rem",
  fontWeight: 500,
  marginRight: "40px",
  color: `${globalStyles.secondaryColor}`, // fallback; real base color comes from globalStyles in JSX if needed
  cursor: "pointer",

  selectors: {
    '&:hover': {
      color: `${globalStyles.mainColor}`,
      opacity: '0.7',
      fontWeight: '600'
    },
  },

});

export const tabActive = style({
  // uses the element's current color so we only set color inline in JSX
  borderBottom: "1px solid currentColor",
});
