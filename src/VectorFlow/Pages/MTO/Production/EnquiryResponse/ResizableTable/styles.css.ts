import { style, createVar, globalStyle } from "@vanilla-extract/css";
import * as gridSystem from "../../../../../../styles/gridSystem.css";

/* Optional runtime vars */
export const vfHeightVar = createVar(); // overall wrapper height
export const vfZoomMdVar = createVar(); // zoom value for laptop..desktop band

/* If you also use these elsewhere in the file, here are VE equivalents */
export const TableResizebarWrapper = style({
  position: "relative",
  width: "100%",
});

export const TableContainer = style({
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

export const ResizeBar = style({
  position: "absolute",
  width: "100%",
  height: "10px",
  borderRadius: "4px",
  backgroundColor: "#8080804d",
  cursor: "ns-resize",
  bottom: "0",
  left: "0",
});

export const TableWrapper = style({
  width: "100%",
  textAlign: "center",
  // selectors: {
  //   "& .ag-theme-alpine": { margin: "20px 0" },
  // },
});
// descendant rules → globalStyle
globalStyle(`${TableWrapper} .ag-theme-alpine`, { margin: "20px 0" });


export const CellWithBar = style({
  fontWeight: 400,
  fontSize: "18px",
  color: "#686060",
  letterSpacing: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: "20px",
  "@media": {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        paddingRight: "10px",
      },
  },
});

export const BarContainer = style({
  width: "100px",
  "@media": {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      { width: "30px" },
  },
});

export const CellBar = style({
  backgroundImage: "linear-gradient(to right, #8d2e61, #bb3f81, #db6ba7)",
  height: "20px",
  borderRadius: "2px",
});

export const CellBarValue = style({
  marginRight: "20px",
  "@media": {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      { marginRight: "0" },
  },
});

/* ====== VFTable wrapper (key bit you use) ====== */
export const VFTableWrapper = style({
  /* sensible defaults that you can override via vars */
  zoom: '1',
  position: "relative",
  width: "100%",
  display: "flex",
  margin: "20px 0px",
  height: vfHeightVar,

  /* zoom scaling between laptop and desktop widths (prop-driven via var) */
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      {
        // zoom: vfZoomMdVar,
      },
    [`(min-width: ${gridSystem.size.desktop})`]: {
      zoom: "1",
    },
  },
});

/* All AG Grid descendants of VFTableWrapper → globalStyle */
globalStyle(`${VFTableWrapper} .ag-theme-alpine`, { flex: 1 });

globalStyle(`${VFTableWrapper} .ag-paging-panel`, {
  zIndex: 1,
  fontSize: "11px",
  fontFamily: "Roboto",
  position: "relative",
});

globalStyle(`${VFTableWrapper} .ag-status-bar`, {
  zIndex: '2 !important',
  display: "flex !important",
  justifyContent: 'space-between !important',
  alignItems: 'center !important',
  border: 'none !important',
  width: 'calc(100% - 230px) !important',
  position: 'absolute',
  bottom: '0px !important',
});

