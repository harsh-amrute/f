// agCharts.css.ts
import { globalStyle } from "@vanilla-extract/css";

globalStyle(".ag-charts-canvas-overlay", {
  inset: 0,
  pointerEvents: "none",
  position: "absolute",
  userSelect: "none",
});

globalStyle(".ag-charts-canvas-center", {
  position: "absolute",
  touchAction: "auto",
  pointerEvents: "auto",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
});

/** Tooltip wrapper (singular + fallback plural) */
globalStyle(".ag-chart-tooltip, .ag-charts-tooltip", {
  margin: '0',
  padding: '0',
  overflow: 'visible',
  maxWidth: '100%',
  zIndex: 99999,
  width: "max-content",
  top: "0px",
  // position: "fixed",
  fontFamily: 'var(--ag-charts-chrome-font-family)',
  fontSize: 'var(--ag-charts-chrome-font-size)',
  fontWeight: 'var(--ag-charts-chrome-font-weight)',
  color: 'var(--ag-charts-tooltip-text-color)',
  background: 'var(--ag-charts-tooltip-background-color)',
  border: 'var(--ag-charts-tooltip-border)',
  borderRadius: 'var(--ag-charts-tooltip-border-radius)',
  boxShadow: 'var(--ag-charts-popup-shadow)',

  vars: {
    '--tooltip-arrow-size': '8px',
    '--tooltip-row-spacing': '8px',
    '--tooltip-column-spacing': '16px',
  },
});

/* Title strip */
globalStyle(".ag-chart-tooltip-title, .ag-charts-tooltip-title", {
  padding: "6px 12px",
  color: "white",
  fontWeight: "600",
  fontSize: "13px",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  backgroundColor: "#355FD3", // AG sets inline sometimes; this is fallback
    /* 👇 Force consistent width */
    minWidth: "120px",
    boxSizing: "border-box",
  
});

/* Content panel */
globalStyle(".ag-chart-tooltip-content, .ag-charts-tooltip-content", {
  padding: "8px 12px",
  background: "white",
  color: "#333",
  fontSize: "13px",
  lineHeight: "1.6",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  border: "1px solid rgba(0,0,0,0.15)",
    /* 👇 Force consistent width */
    minWidth: "120px",
    boxSizing: "border-box",
  
});
/** Optional: guard against resets */
globalStyle(".ag-chart-tooltip *, .ag-charts-tooltip *", {
  boxSizing: "border-box",
});

globalStyle(".ag-chart-tooltip-hidden", { visibility: "hidden" });
globalStyle(".ag-chart-tooltip-title", {
  padding: "6px 12px",
  color: "white",
  fontWeight: 600,
  fontSize: "13px",
});
// globalStyle(".ag-chart-tooltip-content", {
//   padding: "8px 12px",
//   background: "white",
//   borderRadius: "0 0 4px 4px",
//   color: "#333",
//   fontSize: "13px",
// });


/* Optional: arrow like before (for current class that adds `ag-chart-tooltip-arrow`) */
globalStyle(".ag-chart-tooltip.ag-chart-tooltip-arrow::before", {
  content: "",
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
  content: "",
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
/* Optional: wrapping behaviour classes (current & previous) */
globalStyle(".ag-chart-tooltip-wrap-hyphenate, .ag-charts-tooltip--wrap-hyphenate", {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  hyphens: "auto",
});
globalStyle(".ag-chart-tooltip-no-interaction, .ag-charts-tooltip--no-interaction", {
  pointerEvents: "none",
  userSelect: "none",
});
