// VFTable.css.ts
import { style, globalStyle, createVar } from "@vanilla-extract/css";
import * as gridSystem from "../../../../../../../styles/gridSystem.css";

// ---------- TableResizebarWrapper ----------
export const tableResizebarWrapper = style({
  position: "relative",
  width: "100%",
});

// ---------- TableContainer ----------
export const tableContainer = style({
  width: "100%",
  overflow: "hidden",

  "@media": {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        position: "relative",
        width: "100%",
        overflow: "hidden",
      },
  },
});

// ---------- ResizeBar ----------
export const resizeBar = style({
  position: "absolute",
  width: "100%",
  height: 10,
  borderRadius: 4,
  backgroundColor: "#8080804d",
  cursor: "ns-resize",
  bottom: 0,
  left: 0,
});

// ---------- TableWrapper ----------
export const tableWrapper = style({
  width: "100%",
  textAlign: "center",
});

// & .ag-theme-alpine margin
globalStyle(`${tableWrapper} .ag-theme-alpine`, {
  margin: "20px 0",
});

// ---------- CellWithBar ----------
export const cellWithBar = style({
  fontWeight: 400,
  fontSize: 18,
  color: "#686060",
  letterSpacing: "21px", // last defined wins
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: 20,

  "@media": {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        paddingRight: 10,
      },
  },
});

// ---------- BarContainer ----------
export const barContainer = style({
  width: 100,

  "@media": {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        width: 30,
      },
  },
});

// ---------- CellBar ----------
export const cellBar = style({
  backgroundImage: "linear-gradient(to right, #8d2e61, #bb3f81, #db6ba7)",
  height: 20,
  borderRadius: 2,
});

// ---------- CellBarValue ----------
export const cellBarValue = style({
  marginRight: 20,

  "@media": {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        marginRight: 0,
      },
  },
});

// ---------- VFTableWrapper (dynamic height + zoom scaling) ----------

// height var
export const vfTableHeightVar = createVar();

// zoom scale var (for laptop–desktop range)
export const vfZoomScaleVar = createVar();

export const vfTableWrapper = style({
  // dynamic height
  height: vfTableHeightVar,
  position: "relative",
  zoom: 1,
  width: "100%",
  display: "flex",
  margin: "20px 0px",

  // defaults
  vars: {
    [vfTableHeightVar]: "auto",
    [vfZoomScaleVar]: "1", // default scaled value
  },

  "@media": {
    // laptop → desktop: use zoom var
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      {
        zoom: vfZoomScaleVar,
      },
    // desktop and above: force zoom 1
    [`(min-width: ${gridSystem.size.desktop})`]: {
      zoom: 1,
    },
  },
});

// .ag-theme-alpine flex
globalStyle(`${vfTableWrapper} .ag-theme-alpine`, {
  flex: 1,
});

// .ag-paging-panel
globalStyle(`${vfTableWrapper} .ag-paging-panel`, {
  zIndex: 1,
  fontSize: "11px",
  fontFamily: "Roboto",
  position: "relative",
});

// .ag-status-bar
globalStyle(`${vfTableWrapper} .ag-status-bar`, {
  zIndex: 2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "none",
  width: "calc(100% - 230px)",
  position: "absolute",
  bottom: 0,
});
