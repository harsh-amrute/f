// agCharts.css.ts
import { globalStyle, createVar } from "@vanilla-extract/css";

/* --- optional custom props you want to reuse in code --- */
export const tooltipArrowSizeVar = createVar();
export const tooltipRowSpacingVar = createVar();
export const tooltipColSpacingVar = createVar();

/* Canvas */
globalStyle(".ag-charts-canvas-overlay", {
  inset: 0,
  pointerEvents: "none",
  position: "absolute",
  userSelect: "none",
});

globalStyle(".ag-charts-canvas-center", {
  width: "100%",
  height: "100%",
  position: "absolute",
  touchAction: "auto",
  pointerEvents: "auto",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
});

/* Tooltip wrapper (legacy + v11) */
globalStyle(".ag-chart-tooltip, .ag-charts-tooltip", {
  position: "fixed",
  zIndex: 10000,
  width: "max-content",
  maxWidth: "100%",
  margin: 0,
  padding: 0,
  color: "#222",
  background: "transparent",
  border: "none",
  borderRadius: "4px",
  boxShadow: "none",
  fontFamily:
    "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  fontSize: "12px",
  lineHeight: "1.4",
  pointerEvents: "none",

  // margin: "0",
  // padding: "0",
  // overflow: "visible",
  // maxWidth: "100%",
  // zIndex: 99999,
  // width: "max-content",
  // top: "0px",
  // position: "fixed", // <— uncommented
  // fontFamily: "var(--ag-charts-chrome-font-family)",
  // fontSize: "var(--ag-charts-chrome-font-size)",
  // fontWeight: "var(--ag-charts-chrome-font-weight)",
  // color: "var(--ag-charts-tooltip-text-color)",
  // background: "var(--ag-charts-tooltip-background-color)",
  // border: "var(--ag-charts-tooltip-border)",
  // borderRadius: "var(--ag-charts-tooltip-border-radius)",
  // boxShadow: "var(--ag-charts-popup-shadow)",
  // vars: {
  //   [tooltipArrowSizeVar]: "8px",
  //   [tooltipRowSpacingVar]: "8px",
  //   [tooltipColSpacingVar]: "16px",
  // },
});

/* Title */
globalStyle(".ag-chart-tooltip-title, .ag-charts-tooltip-title", {
  padding: "6px 12px",
  color: "white",
  fontWeight: 600,
  fontSize: "13px",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  backgroundColor: "#355FD3",
  minWidth: "120px",
  boxSizing: "border-box",
});

/* Content */
globalStyle(".ag-chart-tooltip-content, .ag-charts-tooltip-content", {
  padding: "8px 12px",
  background: "white",
  color: "#333",
  fontSize: "13px",
  lineHeight: "1.6",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  border: "1px solid rgba(0,0,0,0.15)",
  minWidth: "120px",
  boxSizing: "border-box",
});

globalStyle(".ag-chart-tooltip *, .ag-charts-tooltip *", {
  boxSizing: "border-box",
});
globalStyle(
  ".ag-chart-tooltip--hidden, .ag-charts-tooltip--hidden, .ag-chart-tooltip-hidden",
  { visibility: "hidden", opacity: 0 }
);

/* Tooltip visible by default (no “hidden” class) */
globalStyle(".ag-charts-tooltip:not(.ag-charts-tooltip--hidden)", {
  opacity: 1,
  visibility: "visible",
});

/* Arrow (legacy class name) */
globalStyle(".ag-chart-tooltip.ag-chart-tooltip-arrow::before", {
  content: '""',
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  border: "5px solid #d9d9d9",
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  borderBottomColor: "transparent",
  width: 0,
  height: 0,
  margin: "0 auto",
});
globalStyle(".ag-chart-tooltip.ag-chart-tooltip-arrow::after", {
  content: '""',
  position: "absolute",
  top: "calc(100% - 1px)",
  left: "50%",
  transform: "translateX(-50%)",
  border: "5px solid white",
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  borderBottomColor: "transparent",
  width: 0,
  height: 0,
  margin: "0 auto",
});

/* Behaviour helpers (legacy + v11) */
globalStyle(
  ".ag-chart-tooltip-wrap-hyphenate, .ag-charts-tooltip--wrap-hyphenate",
  {
    overflowWrap: "break-word",
    wordBreak: "break-word",
    hyphens: "auto",
  }
);
globalStyle(
  ".ag-chart-tooltip-no-interaction, .ag-charts-tooltip--no-interaction",
  {
    pointerEvents: "none",
    userSelect: "none",
  }
);

globalStyle(".ag-charts-canvas-proxy, .ag-charts-canvas-overlay", {
  inset: 0,
  pointerEvents: "none",
  position: "absolute",
  userSelect: "none",
});

globalStyle(".ag-charts-toolbar--hidden", {
  opacity: 0,
  visibility: "hidden",
  display: "none",
  pointerEvents: "none",
  transform: "translateY(-4px)",
  transition:
    "opacity 0.2s ease, transform 0.2s ease, visibility 0s linear 0.2s",
});

globalStyle(".ag-charts-aria-announcer", {
  position: "absolute",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  border: 0,
  whiteSpace: "nowrap",
});

globalStyle(".-hidden", {
  visibility: "hidden",
});

globalStyle(
  ".ag-charts-tooltip--arrow::after, .ag-chart-tooltip--arrow::after",
  {
    content: "",
    position: "absolute",
    bottom: "-5px",
    left: "calc(50% - 5px)",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: "rgba(33, 33, 33, 0.9) transparent transparent transparent",
  }
);

globalStyle(".ag-charts-canvas-overlay>*", {
  position: "absolute",
  pointerEvents: "auto",
});

globalStyle(".ag-charts-proxy-container, .ag-chart-proxy-container", {
  position: "absolute",
  pointerEvents: "auto",
});

globalStyle(".ag-charts-overlay, .ag-chart-overlay", {
  color: "#181d1f",
  pointerEvents: "none",
});

globalStyle(".ag-charts-canvas-container, .ag-charts-canvas", {
  position: "relative",
});

globalStyle(".ag-charts-wrapper .ag-charts-canvas > canvas", {
  height: "100% !important",
});

globalStyle(".ag-charts-tab-guard", {
  width: "0%",
  height: "0%",
  position: "absolute",
  pointerEvents: "none",
});
