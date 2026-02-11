// tooltip.css.ts
import { style, createVar, globalStyle } from "@vanilla-extract/css";
import * as globalStyles from "../../../styles/global";
import * as gridSystem from "../../../styles/gridSystem.css";

// ---- CSS Vars ----
export const tooltipMaxHeightVar = createVar();

export const tooltipTextColorVar = createVar();
export const tooltipBgColorVar = createVar();
export const tooltipFontWeightVar = createVar();

export const scIconTransformVar = createVar();

// ---- WrapToolTip ----
export const wrapToolTip = style({});

// ✅ this replaces `& .tooltip_list` and `& .tooltip_list.react-tooltip__show`
globalStyle(`${wrapToolTip} .tooltip_list`, {
  pointerEvents: "auto",
  background: globalStyles.white,
  top: "0",
  opacity: 1,
  zIndex: 900000,
});

globalStyle(`${wrapToolTip} .tooltip_list.react-tooltip__show`, {
  visibility: "visible",
});

// ---- TooltipContainer ----
export const tooltipContainer = style({
  color: globalStyles.black,
  textAlign: "left",
  cursor: "pointer",
  // maxHeight: tooltipMaxHeightVar,
  overflow: "hidden",
  position: "absolute",
  marginLeft: "-16px",
  borderRadius: "5px",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.desktop})`]: {
      maxHeight: "550px",
    },
  },
});

// ---- TooltipTitle ----
export const tooltipTitle = style({
  fontSize: "1.8rem",
  borderBottom: "1px solid #929292",
  position: "sticky",
  padding: "8px 10px",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      {
        fontSize: "1.2rem",
        padding: "4px 10px",
      },
  },
});

// ---- TooltipContent ----
export const tooltipContent = style({
  display: "flex",
  alignItems: "center",
  fontSize: "1.8rem",
  padding: "6px 10px",
  fontWeight: tooltipFontWeightVar,
  margin: "5px 0",
  borderRadius: "5px",
  color: tooltipTextColorVar,
  backgroundColor: tooltipBgColorVar,
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      {
        fontSize: "1.2rem",
        margin: 0,
      },
  },
  ":hover": {
    backgroundColor: "#f1f1f1",
  },
});

// ---- SCIcon ----
export const scIcon = style({
  margin: "0 0 2px 5px",
  transform: scIconTransformVar,
});

// ---- TooltipTrigger ----
export const tooltipTrigger = style({});
