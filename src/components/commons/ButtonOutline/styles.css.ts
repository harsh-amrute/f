import { style, styleVariants } from "@vanilla-extract/css";
import * as gridSystem from "../../../styles/gridSystem.css";

// ==== Button with icons (SCButtonOutline) ====
const buttonOutlineBase = style({
  border: "1px solid #929292",
  borderRadius: "6px",
  fontSize: "1.2rem",
  lineHeight: "1.6rem",
  height: "46px",
  padding: "0 6px",
  marginRight: "10px",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "center",
  maxHeight: "46px",

  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      {
        height: "36px",
        margin: "0 4px",
      },
  },
});

export const buttonOutline = styleVariants({
  withIcon: [
    buttonOutlineBase,
    {
      backgroundColor: "#F9F9F9",
      color: "#929292",
      border: "1px solid #929292",
      width: "90px",
      "@media": {
        [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
          {
            width: "70px",
            fontSize: "11px",
          },
      },
    },
  ],
  noIcon: [
    buttonOutlineBase,
    {
      backgroundColor: "#fff",
      color: "#000000",
      border: "unset",
      width: "unset",
    },
  ],
});

// ==== Button without icons but with status (SCButtonOutlineNoIcon) ====
const buttonOutlineNoIconBase = style({
  border: "1px solid #929292",
  borderRadius: "6px",
  fontSize: "1.2rem",
  lineHeight: "1.6rem",
  height: "46px",
  width: "90px",
  padding: "0px 6px",
  margin: "0 10px",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "center",
  maxHeight: "46px",

  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      {
        height: "36px",
        margin: "0 4px",
      },
    "only screen and (max-width: 1490px)": {
      padding: "0px 4px",
      width: "70px",
    },
  },
});

export const buttonOutlineNoIcon = styleVariants({
  active: [
    buttonOutlineNoIconBase,
    {
      backgroundColor: "#000000",
      color: "#fff",
      border: "unset",
    },
  ],
  inactive: [
    buttonOutlineNoIconBase,
    {
      backgroundColor: "#F9F9F9",
      color: "#929292",
      border: "1px solid #929292",
    },
  ],
});

// ==== Img Outline ====
export const imgOutline = style({
  paddingRight: "10px",
});
