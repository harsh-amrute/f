import { style, createVar, globalStyle } from "@vanilla-extract/css";
import * as gridSystem from "../../../../../../styles/gridSystem.css";

/* dynamic vars */
export const vfHeightVar = createVar(); // height for VFTableWrapper
export const vfZoomVar = createVar(); // zoom scale for laptop..desktop range

/* index.tsx containers */
export const horizontalViewWrapper = style({
  width: "100%",
  height: "90%",
  // selectors: {
  //   "& .ag-theme-alpine": {
  //     height: "100%",
  //     marginTop: "0",
  //   },
  // },
});
// descendants of horizontalViewWrapper
globalStyle(`${horizontalViewWrapper} :global(.ag-theme-alpine)`, {
  height: "100%",
  marginTop: "0",
});

export const orderAtRiskChartWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginTop: "20px",
  marginBottom: "20px",
  height: "100%",
});

export const chartWrapper = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
});

/* Grid view container */
export const vfTableWrapper = style({
  vars: { [vfHeightVar]: "100%", [vfZoomVar]: "0.75" }, // sensible defaults
  height: vfHeightVar,
  maxHeight: "93%",
  position: "relative",
  zoom: "1",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  margin: "20px 0px",

  // selectors: {
  //   "& .ag-theme-alpine": { flex: 1 },

  //   // paging panel
  //   "&& .ag-paging-panel": {
  //     zIndex: 1,
  //     fontSize: "11px",
  //     fontFamily: "Roboto",
  //     position: "relative",
  //   },

  //   // status bar
  //   "&& .ag-status-bar": {
  //     zIndex: 2,
  //     display: "flex",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     border: "none",
  //     position: "absolute",
  //     bottom: 0,
  //     backgroundColor: "white",
  //     width: "100%",
  //   },
  // },

  "@media": {
    // laptop .. desktop => apply zoom var (0.75 by default; override via assignInlineVars)
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      { zoom: vfZoomVar },

    // >= desktop
    [`screen and (min-width: ${gridSystem.size.desktop})`]: { zoom: "1" },
  },
});
/* descendants of vfTableWrapper */
globalStyle(`${vfTableWrapper} :global(.ag-theme-alpine)`, { flex: 1 });

/* bump specificity by repeating the parent if needed instead of "&&" */
globalStyle(`${vfTableWrapper}${vfTableWrapper} :global(.ag-paging-panel)`, {
  zIndex: 1,
  fontSize: "11px",
  fontFamily: "Roboto",
  position: "relative",
});

globalStyle(`${vfTableWrapper}${vfTableWrapper} :global(.ag-status-bar)`, {
  zIndex: 2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "none",
  position: "absolute",
  bottom: 0,
  backgroundColor: "white",
  width: "100%",
});

