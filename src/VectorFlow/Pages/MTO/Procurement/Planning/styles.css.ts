import { style, globalStyle } from "@vanilla-extract/css";

/** ========== Containers ========== */

export const ProcurementLayout = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  // selectors: {
  //   '& .ag-theme-alpine': {
  //     flex: 1,
  //     marginLeft: '2rem',
  //   },
  //   '& div[data-testid="vf_pagination"]': {
  //     marginLeft: '2rem !important',
  //     padding: '0 !important',
  //     marginTop: '-20px',
  //   },
  // },
});
// descendants of ProcurementLayout
globalStyle(`${ProcurementLayout} .ag-theme-alpine`, {
  flex: 1,
  marginLeft: "2rem",
});

globalStyle(`${ProcurementLayout} div[data-testid="vf_pagination"]`, {
  marginLeft: "2rem !important",
  padding: "0 !important",
  marginTop: "-20px",
});

export const ChildTableWrapper = style({
  padding: "2rem",
  // selectors: {
  //   '& .ag-header-cell-text': {
  //     fontSize: '12px !important',
  //   },
  // },
});
// descendant: AG Grid header text
globalStyle(`${ChildTableWrapper} .ag-header-cell-text`, {
  fontSize: "12px !important",
});

export const TableWrapper = style({

  height: "100%",
  flex: "1 1 0%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // selectors: {
  //   '& > .ag-theme-alpine': {
  //     height: '100%',
  //     width: '100%',
  //     marginLeft: '3rem',
  //     marginTop: '1rem',
  //     marginBottom: '0',
  //   },
  //   '& > div[data-testid="vf_pagination"]': {
  //     width: '100%',
  //     margin: '0 0 0 30px',
  //     // padding: '0px 15px !important', // left commented to match original
  //   },
  // },
});
// children of TableWrapper
globalStyle(`${TableWrapper} > .ag-theme-alpine`, {
  height: "100%",
  width: "100%",
  marginLeft: "3rem",
  marginTop: "1rem",
  marginBottom: "0",
});

globalStyle(`${TableWrapper} > div[data-testid="vf_pagination"]`, {
  width: "100%",
  margin: "0 0 0 30px",
  // padding: '0px 15px !important',
});
