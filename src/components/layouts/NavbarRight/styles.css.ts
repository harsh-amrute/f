import { style, createVar } from "@vanilla-extract/css";
import * as globalStyles from "../../../styles/global";

// ===== Data (unchanged API) =====
export const listColorTheme = [
  {
    title: "Noir Fusion",
    textColor: "NOIRFUSION",
    colorTheme: [
      globalStyles.NOIRFUSION.color1,
      globalStyles.NOIRFUSION.color2,
      globalStyles.NOIRFUSION.color3,
      globalStyles.NOIRFUSION.color4,
      globalStyles.NOIRFUSION.color5,
    ],
    status: false,
  },
  {
    title: "Pure Elegance",
    textColor: "PUREELEGANCE",
    colorTheme: [
      globalStyles.PUREELEGANCE.color1,
      globalStyles.PUREELEGANCE.color2,
      globalStyles.PUREELEGANCE.color3,
      globalStyles.PUREELEGANCE.color4,
      globalStyles.PUREELEGANCE.color5,
    ],
    status: false,
  },
  {
    title: "Charcoal Chic",
    textColor: "CHARCOALCHIC",
    colorTheme: [
      globalStyles.CHARCOALCHIC.color1,
      globalStyles.CHARCOALCHIC.color2,
      globalStyles.CHARCOALCHIC.color3,
      globalStyles.CHARCOALCHIC.color4,
      globalStyles.CHARCOALCHIC.color5,
    ],
    status: false,
  },
  {
    title: "Regal Blaze",
    textColor: "REGALBLAZE",
    colorTheme: [
      globalStyles.REGALBLAZE.color1,
      globalStyles.REGALBLAZE.color2,
      globalStyles.REGALBLAZE.color3,
      globalStyles.REGALBLAZE.color4,
      globalStyles.REGALBLAZE.color5,
    ],
    status: false,
  },
];
// ===== Runtime vars =====
export const radioAccentVar = createVar();
export const colorSwatchVar = createVar();
export const buttonBgVar = createVar();

// ===== Styles =====
export const SCWrap = style({
  position: "fixed",
  width: "477px",
  height: "100vh",
  justifyContent: "space-between",
  zIndex: 9992,
  backgroundColor: globalStyles.white,
  transition: globalStyles.customTransition,
  right: "-500px", // default closed; use SCWrapOpen to open
});

export const SCWrapOpen = style({
  right: "0px",
});

export const SCWrapTop = style({
  display: "flex",
  justifyContent: "space-between",
  height: "69px",
  padding: "20px",
  backgroundColor: globalStyles.black,
  color: globalStyles.white,
  fontSize: globalStyles.mainFontSize,
});

export const SCWrapContent = style({
  padding: "20px",
});

export const SCTopText = style({});

export const SCClose = style({
  cursor: "pointer",
});

export const SCIconClose = style({});

export const SCWrapItem = style({
  display: "flex",
  fontSize: "18px",
  marginBottom: "10px",
  alignItems: "center",
  padding: "15px 10px",
  transition: "0.2s ease-in-out",
  borderRadius: "4px",
  backgroundColor: "transparent",
  outline: "solid 2px rgb(209,213,219)",
  cursor: "pointer",
});

export const SCWrapItemActive = style({
  backgroundColor: "#cde3fa",
  outline: "solid 2px rgb(153, 204, 255)",
});

export const SCWrapItemLeft = style({
  display: "flex",
  width: "170px",
});

export const SCInputRadio = style({
  marginBottom: "5px",
  marginRight: "10px",
  cursor: "pointer",
  accentColor: radioAccentVar, // set at runtime
});

export const SCItemText = style({
  width: "115px",
});

export const SCListColor = style({
  display: "flex",
});

export const SCColor = style({
  backgroundColor: colorSwatchVar, // set at runtime
  width: "40px",
  height: "30px",
});

export const SCButton = style({
  font: "normal normal 300 16px/24px Roboto",
  padding: "10px 20px",
  borderRadius: "6px",
  boxShadow: "0px 6px 25px #00000029",
  color: globalStyles.white,
  background: buttonBgVar, // set at runtime
});
