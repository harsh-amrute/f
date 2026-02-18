// styles.css.ts
import { style, createVar } from "@vanilla-extract/css";

/* ---------- runtime vars for theme-dependent colors ---------- */
const vAnalyticsBg = createVar();
const vAnalyticsText = createVar();
const vSeparator = createVar();

/** Set analytics card bg/text colors at runtime */
// export const setRRRAnalyticsTheme = (opts: { bg: string; text: string }) =>
//   assignInlineVars({ [vAnalyticsBg]: opts.bg, [vAnalyticsText]: opts.text });

// /** Set separator color at runtime */
// export const setRRRSeparator = (color: string) =>
//   assignInlineVars({ [vSeparator]: color });

/* ---------- layout ---------- */
export const RRRLayout = style({
  marginTop: "25px",
  marginLeft: "15px",
  // marginBottom: '40px',
});

export const RRRTaskBar = style({
  position: "fixed",
  width: "97%",
  right: 0,
  top: "13vh",
  height: "70px",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "20px",
  padding: "16px",
  zIndex: 2,
  transition: "0.3s ease 0s",
});

export const RRRColorCellRendererWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "97px",
  height: "34px",
  boxShadow: "0px 6px 12px #8D8D8D29",
  borderRadius: "4px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const RRRTagsCellRendererWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "55px",
  height: "25px",
  background: "#8E8E8E",
  color: "#FFFFFF",
  boxShadow: "0px 6px 12px #8D8D8D29",
  borderRadius: "2px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "19px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

/* ---------- analytics card ---------- */
export const RRRAnalyticsWrapper = style({
  width: "100%",
  color: "white",
  padding: "10px",
  fontFamily: "Roboto",
});

export const RRRAnalyticsContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  background: vAnalyticsBg,
  color: vAnalyticsText,
  boxShadow: "0px 6px 12px #00000034",
  padding: "4px 8px",
  borderRadius: "4px",
});

export const RRRAnalyticsHeader = style({
  width: "100%",
  padding: "6px 0px",
  fontSize: "12px",
});

export const RRRAnalyticsTableContainer = style({
  display: "flex",
  flexDirection: "column",
});

export const RRRAnalyticsTableHeaderWrapper = style({
  width: "100%",
  borderTop: "dotted 2px gray",
  borderBottom: "dotted 2px gray",
  display: "flex",
});

export const RRRAnalyticsTableHeader = style({
  width: "100%",
  height: "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  overflow: "hidden",
  textAlign: "center",
});

export const RRRAnalyticsTableSubHeader = style({
  width: "100%",
  height: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const RRRAnalyticsTableSubHeaderSection = style({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const RRRAnalyticsSeperator = style({
  height: "10px",
  width: "2px",
  backgroundColor: vSeparator,
});

export const RRRAnalyticsTableRowContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const RRRAnalyticsTableRow = style({
  width: "100%",
  display: "flex",
  borderBottom: "solid 1px white",
  selectors: {
    "&:last-child": { borderBottom: "none" },
  },
});

export const RRRAnalyticsTableCell = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "30px",
});

export const RRRAnalyticsTableColorCell = style({
  display: "flex",
  width: "15px",
  height: "15px",
  alignItems: "center",
  borderRadius: "2px",
});

export const RRRAnalyticsTableCustomCell = style({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

export const RRRAnalyticsTableColorCellLabel = style({
  marginLeft: "5px",
});
