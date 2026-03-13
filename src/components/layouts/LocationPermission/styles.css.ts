import { style, createVar } from "@vanilla-extract/css";
import * as gridSystem from "../../../styles/gridSystem.css";
import * as globalStyles from "../../../styles/global";

// runtime-controlled accent color for the checkbox
export const checkboxAccentVar = createVar();

export const SCSwapPermission = style({
  marginBottom: "15px",
  borderRadius: "6px",
  textAlign: "left",

  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { padding: "5px 0" },
  },
});

export const SCtitle = style({
  fontSize: "2rem",
  fontWeight: 500,
  lineHeight: "2.6rem",
  margin: "15px 50px 0 50px",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: "1.8rem", marginTop: "5px" },
  },
});

export const checkbox = style({
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  cursor: "pointer",
  outline: "none",
  position: "relative",
  border: "1px solid black",
  // set via assignInlineVars at runtime
  accentColor: checkboxAccentVar,
});

export const SCSwapContent = style({
  padding: "0 50px",
  display: "block",
  width: "100%",
  borderTop: "1px solid #929292",
  height: "250px",
  overflowY: "scroll",

  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { height: "185px" },
  },
});

export const SCSwapItem = style({
  display: "block",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px dashed #929292",

  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { padding: "5px 0" },
  },
});

export const SCFlexCenter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const SCItemTitle = style({
  fontSize: "2rem",
  fontWeight: 500,
  width: "30%",

  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: "1.6rem" },
  },
});

export const SCItemMulSelect = style({
  width: "70%",
});
