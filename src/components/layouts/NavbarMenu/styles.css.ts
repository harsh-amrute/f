import { style, createVar, globalStyle } from "@vanilla-extract/css";
import * as gridSystem from "../../../styles/gridSystem.css";

// Runtime vars
export const themeColor2Var = createVar();
export const themeColor5Var = createVar();
export const iconWidthVar = createVar();
export const iconWidthSmallVar = createVar();

export const scGridNav = style({
  position: "sticky",
  height: "85vh",
  top: "95px",
  maxHeight: "100%",
  zIndex: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
export const scNavbar = style({});

export const scNavMenu = style({
  padding: "15px 0",
  position: "relative",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { padding: "7px 0" },
  },
});

export const scNavIcon = style({
  // defaults, can be overridden via assignInlineVars
  vars: {
    [iconWidthVar]: "24px",
    [iconWidthSmallVar]: "19px",
  },
  width: iconWidthVar,
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { width: iconWidthSmallVar },
  },
});

export const scNavBox = style({
  margin: "0 auto",
  width: "100%",
  textAlign: "center",
  marginTop: "70px",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { marginTop: "35px" },
  },
});

export const scNavLogout = style({
  paddingTop: "10px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTop: "1px solid #d8d8d8",
  margin: "0 6px",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { padding: "10px 0 20px 0" },
  },
  // selectors: {
  //   '& .logout-tooltip': {
  //     fontWeight: 500,
  //     fontFamily: 'Roboto',
  //     fontSize: '1.2rem',
  //   },
  // },
});
// ✅ descendant rule goes in globalStyle (not `selectors`)
globalStyle(`${scNavLogout} .logout-tooltip`, {
  fontWeight: 500,
  fontFamily: "Roboto",
  fontSize: "1.2rem",
});

export const scIconLogout = style({
  width: "24px",
  height: "24px",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { width: "19px", height: "19px" },
  },
});

export const scMenu = style({});

export const scMenuItem = style({
  color: "#495057",
  fontWeight: 600,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      transform: "scale(1.02)",
      transition: "all 0.2s ease-in-out",
    },
  },
});

export const scMenuItemActive = style({
  // defaults, will be overridden with theme vars at runtime
  vars: {
    [themeColor2Var]: "#ffffff",
    [themeColor5Var]: "#000000",
  },
  color: "#0a58ca",
  backgroundColor: themeColor2Var,
  borderLeft: `5px solid ${themeColor5Var}`,
});
