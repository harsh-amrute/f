import { style, createVar, globalStyle } from "@vanilla-extract/css";
import * as globalStyles from "../../../styles/global";
import * as gridSystem from "../../../styles/gridSystem.css";

// Runtime vars
export const tooltipMaxHeightVar = createVar(); // e.g. "300px"
export const activeTextVar = createVar();
export const activeBgVar = createVar();

/* Wrapper (no special selectors needed now) */
export const WrapToolTip = style({});

/* The floating panel (your custom content area) */
export const TooltipContainer = style({
  color: globalStyles.black,
  textAlign: "left",
  cursor: "pointer",
  maxHeight: tooltipMaxHeightVar,
  overflow: "hidden",
  position: "relative",          // simpler than absolute unless you need it
  marginLeft: "-16px",
  borderRadius: "5px",
  vars: {
    [tooltipMaxHeightVar]: "200px", // default
  },
  "@media": {
    [`(min-width: ${gridSystem.size.desktop})`]: {
      vars: { [tooltipMaxHeightVar]: "550px" },
    },
  },
});

export const TooltipTitle = style({
  fontSize: "1.8rem",
  borderBottom: "1px solid #929292",
  position: "sticky",
  top: 0,
  background: globalStyles.white,
  padding: "8px 10px",
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: "1.2rem", padding: "4px 10px" },
  },
});

export const TooltipContent = style({
  display: "flex",
  alignItems: "center",
  fontSize: "1.8rem",
  padding: "6px 10px",
  fontWeight: 300,
  margin: "5px 0",
  borderRadius: "5px",
  ":hover": { backgroundColor: "#f1f1f1" },
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: "1.2rem", margin: 0 },
  },
});

export const TooltipContentActive = style({
  fontWeight: 500,
  color: activeTextVar,
  backgroundColor: activeBgVar,
});

export const SCIcon = style({ margin: "0 0 2px 5px" });
export const IconRotated = style({ transform: "rotate(-90deg)" });
export const TooltipTrigger = style({});

/* ---- Minimal replacement for react-tooltip/dist/react-tooltip.css ---- */

globalStyle(".react-tooltip", {
  position: "fixed",                 // ← required for correct alignment
  zIndex: 900000,
  background: "rgb(255, 255, 255)",
  color: "#000",
  borderRadius: "3px",
  fontSize: "90%",
  padding: "8px 16px",
  boxSizing: "border-box",
  pointerEvents: "auto",
  visibility: "hidden",              // ← hidden by default
  opacity: 0,                        // ← 0 by default
  // transition: "opacity .3s ease-out, visibility .3s ease-out",
  width: "max-content",
  willChange: "opacity, visibility",
});

globalStyle(".react-tooltip.react-tooltip__show", {
  visibility: "visible",
  opacity: 1,
});

globalStyle(".react-tooltip [data-tooltip-content]", {
  padding: 0,
});

/* Optional placement hooks (not required for alignment) */
globalStyle(".react-tooltip.react-tooltip__place-right", { transform: "translateX(0)" });
globalStyle(".react-tooltip.react-tooltip__place-left",  { transform: "translateX(0)" });
globalStyle(".react-tooltip.react-tooltip__place-top",   { transform: "translateY(0)" });
globalStyle(".react-tooltip.react-tooltip__place-bottom",{ transform: "translateY(0)" });

/* If you still want a custom class from className prop */
globalStyle(".tooltip_list", {
  position: "fixed",
  /* same base styles as above but without forcing opacity:1 */
  visibility: "hidden",
  opacity: 0,
  // transition: "opacity .3s ease-out, visibility .3s ease-out",
});

globalStyle(".tooltip_list.react-tooltip__show", {
  visibility: "visible",
  opacity: 1,
});
