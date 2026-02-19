import { style } from "@vanilla-extract/css";
import * as globalStyles from '../../../styles/global'
import * as gridSystem from '../../../styles/gridSystem.css'

// Base button style
export const buttonNormal = style({
  border: "none",
  color: globalStyles.white,
  backgroundColor: globalStyles.mainColor,
  padding: "8px 24px",
  fontSize: "1.6rem",
  borderRadius: "8px",
  fontWeight: 500,
  whiteSpace: "break-spaces",
  maxWidth: "140px",

  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop})`]: {
      fontSize: "1rem",
      padding: "4px 6px",
    },
  },
});


// Extra style for hiding
export const hidden = style({
  display: "none",
});
