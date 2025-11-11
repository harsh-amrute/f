import { style, globalStyle } from "@vanilla-extract/css";

export const resourceViewWrapper = style({
  display: "flex",
  flexDirection: "column",
});

export const gridWrapper = style({
  position: "relative",
  overflow: "hidden",
  display: "flex",
  paddingLeft: "20px",
  paddingTop: "15px",
  flexDirection: "column",
  gap: "16px",
  height: "78vh",
//   selectors: {
//     "& > .ag-theme-alpine": {
//       flex: 1,
//     },
//   },
});

// scope the descendant globally but only when inside gridWrapper
globalStyle(`${gridWrapper} > .ag-theme-alpine`, {
    flex: 1,
  });
  