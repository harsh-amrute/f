import { style, createVar } from "@vanilla-extract/css";
import * as gridSystem from "../../../../styles/gridSystem.css";

// runtime vars
export const countColorVar = createVar();
export const buttonBgVar = createVar();
export const separatorColorVar = createVar();

export const DateContainer = style({
  height: "70px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      { zoom: "0.75" as any },
    [`screen and (min-width: ${gridSystem.size.desktop})`]: {
      zoom: "1" as any,
    },
  },
});

export const DateWrapper = style({
  textAlign: "center",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "24px",
  fontFamily: "Roboto",
});

export const CategoryWrapper = style({
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 300,
  fontSize: "18px",
  lineHeight: "24px",
  fontFamily: "Roboto",
});

export const CardLayout = style({
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      { zoom: "0.75" as any },
  },
});

export const CardContainer = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "80px",
  marginBottom: "70px",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.desktop})`]: {
      zoom: "1" as any,
    },
  },
});

export const CardWrapper = style({
  width: "425px",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "-5px 4px 20px #91919133",
  borderRadius: "12px",
  opacity: 1,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "44px",
});

export const IconWrapper = style({
  height: "54px",
});

export const TextWrapper = style({
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 400,
  fontSize: "22px",
  lineHeight: "29px",
  fontFamily: "Roboto",
  marginTop: "21px",
});

export const CountWrapper = style({
  marginTop: "15px",
  width: "259px",
  height: "32px",
  background: "rgb(185, 59, 126, 0.07)",
  boxShadow: "0px 6px 12px #6F646429",
  border: "none",
  borderRadius: "30px",
  display: "flex",
  alignItems: "center",
  marginBottom: "48px",
  color: countColorVar, // runtime
});

export const CountText = style({
  height: "32px",
  width: "100%",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "21px",
  fontFamily: "Roboto",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const Separator = style({
  borderRight: `1px solid ${separatorColorVar}`, // runtime
  height: "calc(100% - 15px)",
});

export const ButtonWrapper = style({
  background: buttonBgVar, // runtime
  borderRadius: "0 0 12px 12px",
  height: "69px",
  width: "425px",
  display: "flex",
  alignItems: "center",
});

export const ButtonComponent = style({
  width: "100%",
  height: "69px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "24px",
  fontFamily: "Roboto",
  color: "white",
});

export const PlanningTaskBar = style({
  height: "50px",
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: "0px",
  zoom: "0.8" as any,
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      width: "0.2px",
      display: "none",
    },
  },
});

export const ButtonFilterWrapper = style({
  border: "none",
});
