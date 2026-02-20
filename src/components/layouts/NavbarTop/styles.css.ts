import { style, createVar } from "@vanilla-extract/css";
import * as globalStyles from "../../../styles/global";
import * as gridSystem from "../../../styles/gridSystem.css";
import { Link } from "react-router-dom";

// runtime-set vars
export const wrapBgVar = createVar();
export const breadcrumbColorVar = createVar();
export const userNameColorVar = createVar();

export const SCWrap = style({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  height: "100%",
  background: wrapBgVar, // set at runtime
});

export const SCLeft = style({
  display: "flex",
  alignItems: "center",
});

export const SCRight = style({
  display: "flex",
  alignItems: "center",
  height: "100%",
});

export const SCWrapLogo = style({});

export const SCLogo = style({
  height: "62px",
  margin: "0 10px",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { height: "40px" },
  },
});

export const SCWrapBreadcrumb = style({});

export const SCBreadCrumb = style({
  color: breadcrumbColorVar, // set at runtime
  fontSize: globalStyles.mainFontSize,
  margin: "0 10px",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: globalStyles.responsiveFontSize },
  },
});

export const SCWrapImg = style({});

export const SCImg = style({
  height: "50px",
  width: "50px",
  margin: "0 10px",
  cursor: "pointer",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { height: "30px", width: "30px", margin: "0 5px" },
  },
});

// use this class on <Link>
export const SCImgLink = style({
  height: "50px",
  display: "inline-block",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { height: "30px" },
  },
});

export const SCTxt = style({
  width: "100px",
  fontSize: globalStyles.mainFontSize,
  color: userNameColorVar, // set at runtime
  fontWeight: 200,
  marginLeft: "10px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: globalStyles.responsiveFontSize, width: "80px" },
  },
});

export const SCVerticalPartitions = style({
  minWidth: "2px",
  background: "#d8d8d8",
  height: "50px",
  margin: "0 5px",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { height: "30px", minWidth: "1px" },
  },
});
