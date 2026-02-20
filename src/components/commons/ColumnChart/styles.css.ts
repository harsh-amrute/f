import { style, createVar } from "@vanilla-extract/css";
import * as globalStyles from "../../../styles/global";
import * as gridSystem from "../../../styles/gridSystem.css";

const widthCol = "3vw";
const fontSize = "1.2rem";
const fontSizeResponsive = "0.9rem";

/* inherits to children; set from the component via assignInlineVars */
export const colorTextVar = createVar();

export const WrapperChart = style({
  vars: { [colorTextVar]: globalStyles.Black }, // default; overridden at runtime
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  margin: "10px 0 15px 70px",
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { margin: "10px 0 15px 55px" },
  },
});

export const ChartLeft = style({
  transform: "rotate(-90deg)",
  fontSize,
  color: colorTextVar,
  position: "relative",
  left: "-47px",
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: fontSizeResponsive },
  },
});

export const ChartRight = style({
  display: "flex",
  position: "relative",
  width: "12vw",
  height: "25vh",
  borderLeft: "2px solid #d9d9d9",
  borderBottom: "2px solid #d9d9d9",
});

export const WrapperColumnRed = style({
  display: "flex",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#c9252b",
  borderLeft: "5px solid #dd3f3d",
  bottom: 0,
  left: "2vw",
  height: "10vh",
  width: widthCol,
  fontSize,
  color: globalStyles.white,
  selectors: {
    "&::before": {
      content: "0",
      position: "absolute",
      bottom: "-6px",
      left: "-3.5vw",
      color: colorTextVar,
    },
  },
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: fontSizeResponsive },
  },
});

export const WrapperColumnGreen = style({
  display: "flex",
  position: "absolute",
  backgroundColor: "#096912",
  borderLeft: "5px solid #1e972a",
  justifyContent: "center",
  alignItems: "center",
  bottom: "10vh",
  left: "5vw",
  height: "8vh",
  width: widthCol,
  fontSize: "1.2rem",
  color: globalStyles.white,
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      backgroundColor: "#d9d9d9",
      width: "0.5vw",
      height: "0.2vh",
      bottom: 0,
      left: "-5.9vw",
    },
    "&::after": {
      content: "90%",
      position: "absolute",
      bottom: "-10px",
      left: "-7.5vw",
      color: colorTextVar,
    },
  },
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      {
        fontSize: "0.9rem",
        selectors: {
          "&::after": { left: "-7.7vw", bottom: "-7px" },
        },
      },
  },
});

export const WrapperColumnWhite = style({
  display: "flex",
  position: "absolute",
  background:
    "transparent linear-gradient(2deg, #f4f4f4 0%, #c1c1c1 100%) 0% 0% no-repeat padding-box",
  justifyContent: "center",
  alignItems: "center",
  bottom: "18vh",
  left: "8vw",
  height: "3vw",
  width: widthCol,
  fontSize: "1.2rem",
  color: globalStyles.black,
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      backgroundColor: "#d9d9d9",
      width: "0.5vw",
      height: "0.2vh",
      bottom: 0,
      left: "-8.6vw",
    },
    "&::after": {
      content: "110%",
      position: "absolute",
      bottom: "-10px",
      left: "-10.5vw",
      color: colorTextVar,
    },
  },
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      {
        fontSize: "0.9rem",
        selectors: {
          "&::after": { left: "-10.7vw", bottom: "-7px" },
        },
      },
  },
});

export const TextColumn = style({
  transform: "rotate(-90deg)",
  fontWeight: 500,
});
