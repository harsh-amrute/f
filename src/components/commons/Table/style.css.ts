import { style, styleVariants } from "@vanilla-extract/css";
import * as globalStyles from "../../../styles/global";
import * as gridSystem from "../../../styles/gridSystem.css";

// ---- If you have shared tokens, swap these for real imports ----
const COLOR_WHITE = "#FFFFFF";
const COLOR_BLACK = "#000000";

// Replace these with your real grid breakpoints
const LAPTOP = "1024px";
const LAPTOP_L = "1440px";

/* ============ Table card ============ */
export const SCTableBox = style({
  backgroundColor: COLOR_WHITE,
  borderRadius: "12px",
  padding: "20px",
});

export const SCTableInformation = style({
  display: "flex",
  alignItems: "center",
  paddingBottom: "20px",
});

export const SCTableStyle = style({
  paddingLeft: "16px",
  paddingRight: "32px",
});

export const SCTableStyleText = style({
  fontSize: "1rem",
  color: COLOR_BLACK,
});

export const SCTableStyleTextSpan = style({
  fontSize: "1.2rem",
  color: COLOR_BLACK,
  fontWeight: 500,
  maxWidth: "130px",
  display: "block",
});

export const SCTableImages = style({
  width: "100px",
  "@media": {
    [`screen and (min-width: ${LAPTOP}) and (max-width: ${LAPTOP_L})`]: {
      width: "70px",
    },
  },
});

/* ============ Info list ============ */
export const SCTableList = style({
  display: "flex",
  margin: 0,
  padding: 0,
});

export const SCTableItem = style({
  display: "block",
  listStyle: "none",
  padding: "0 30px",
  borderLeft: "1px solid #f5f6fa",
  marginBottom: "14px",
});

export const SCTableItemName = style({
  fontSize: "1.4rem",
  color: COLOR_BLACK,
  fontWeight: 300,
  "@media": {
    [`screen and (min-width: ${LAPTOP}) and (max-width: ${LAPTOP_L})`]: {
      fontSize: "1.1rem",
    },
  },
});

export const SCTableItemValue = style({
  fontSize: "1.6rem",
  color: COLOR_BLACK,
  fontWeight: 500,
  "@media": {
    [`screen and (min-width: ${LAPTOP}) and (max-width: ${LAPTOP_L})`]: {
      fontSize: "1.2rem",
    },
  },
});

/* ============ Table ============ */
export const SCTableTab = style({
  border: "1px solid #d8d8d8",
  borderCollapse: "collapse",
  borderRadius: "6px",
});

export const SCTableTr = style({
  textAlign: "left",
  selectors: {
    "&:nth-child(even)": { backgroundColor: "#f4f4f4" },
  },
});

export const SCTableTh = style({
  padding: "6px 12px",
  fontSize: "1.4rem",
  fontWeight: 300,
  color: COLOR_BLACK,
  borderLeft: "1px solid #d8d8d8",
  borderCollapse: "collapse",
  "@media": {
    [`screen and (min-width: ${LAPTOP}) and (max-width: ${LAPTOP_L})`]: {
      fontSize: "1.2rem",
      padding: "0 4px",
    },
  },
});

export const SCTableCheckbox = style({
  display: "flex",
  alignItems: "center",
  marginBottom: "4px",
  "@media": {
    [`screen and (min-width: ${LAPTOP}) and (max-width: ${LAPTOP_L})`]: {
      height: "30px",
    },
    "screen and (max-width: 1629px)": {
      height: "30px",
    },
  },
});

export const SCTableTd = style({
  padding: "6px 12px",
  borderLeft: "1px solid #d8d8d8",
  fontSize: "1.4rem",
  fontWeight: 500,
  color: COLOR_BLACK,
  "@media": {
    [`screen and (min-width: ${LAPTOP}) and (max-width: ${LAPTOP_L})`]: {
      fontSize: "1.2rem",
      padding: "0 4px",
    },
  },
});

export const SCTableTdItem = style({
  padding: "6px 12px",
  borderLeft: "1px solid #d8d8d8",
  fontSize: "1.4rem",
  fontWeight: 500,
  color: COLOR_BLACK,
  display: "flex",
  alignItems: "center",
  "@media": {
    [`screen and (min-width: ${LAPTOP}) and (max-width: ${LAPTOP_L})`]: {
      fontSize: "1.2rem",
      padding: "0 4px",
      width: "140px",
    },
  },
});

/* ============ Footer buttons ============ */
export const SCButtonChecBox = style({
  display: "flex",
  justifyContent: "flex-start",
  paddingTop: "28px",
});

/* ============ PvPA ============ */
export const SCWrapPvPA = style({
  display: "flex",
});

export const SCValuePvPA = styleVariants({
  R: { minWidth: "15px", color: "red" },
  G: { minWidth: "15px", color: "green" },
  W: { minWidth: "15px", color: "#848484" },
  default: { minWidth: "15px" },
});

export type PvKey = keyof typeof SCValuePvPA; // 'R' | 'G' | 'W' | 'default'

export const SCLargerSign = style({
  height: "20px",
  margin: "0 6px 0 2px",
  "@media": {
    [`screen and (min-width: ${LAPTOP}) and (max-width: ${LAPTOP_L})`]: {
      margin: "0 6px 0 0",
    },
  },
});

/* ============ Rupee ============ */
export const SCRupeeContainer = style({
  display: "inline-block",
});

export const SCRupeeSign = style({
  marginLeft: "4px",
  marginRight: "3px",
});
