import { style, createVar, styleVariants } from "@vanilla-extract/css";

/* --- tiny utilities you use inline --- */
export const pl4 = style({ paddingLeft: "4px" });
export const maxW40 = style({ maxWidth: "40px" });
export const fullW = style({ width: "100%" });

/* Total row styling at the bottom */
export const rrrTotalRow = style({
  color: "white",
  backgroundColor: "black",
  borderRadius: "0 0 4px 4px",
  margin: "0 -8px -4px -8px",
  width: "auto",
  padding: "0 8px",
});

/* Color chips (so you don’t need inline backgroundColor) */
export const rrrColorBg = styleVariants({
  black: { backgroundColor: "black" },
  red: { backgroundColor: "#F02424" },
  yellow: { backgroundColor: "#E3B92D" },
  green: { backgroundColor: "#418D18" },
});

/* ===== runtime vars for theme-dependent colors ===== */
export const analyticsBgVar = createVar();
export const analyticsTextVar = createVar();
export const separatorColorVar = createVar();

/** Set analytics panel colors at runtime */
// export const rrrAnalyticsVars = (args: { bg: string; text: string }) =>
//   assignInlineVars({
//     [analyticsBgVar]: args.bg,
//     [analyticsTextVar]: args.text,
//   });

// /** Set separator color at runtime */
// export const rrrSeparatorVars = (color: string) =>
//   assignInlineVars({ [separatorColorVar]: color });

/* ===== layouts ===== */
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
  transition: "all 0.3s ease 0s",
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
  background: "#8E8E8E 0% 0% no-repeat padding-box",
  color: "#FFFFFF",
  boxShadow: "0px 6px 12px #8D8D8D29",
  borderRadius: "2px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "500",
  fontSize: "14px",
  lineHeight: "19px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

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
  background: `${analyticsBgVar} 0% 0% no-repeat padding-box`,
  color: analyticsTextVar,
  boxShadow: "0px 6px 12px #00000034",
  padding: "4px 8px",
  borderRadius: "4px",
});

export const RRRAnalyticsHeader = style({
  width: "100%",
  padding: "6px 0",
  fontSize: "12px",
});

export const RRRAnalyticsTableContainer = style({
  display: "flex",
  flexDirection: "column",
});

export const RRRAnalyticsTableHeaderWrapper = style({
  width: "100%",
  borderTop: "2px dotted gray",
  borderBottom: "2px dotted gray",
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
  backgroundColor: separatorColorVar,
});

export const RRRAnalyticsTableRowContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const RRRAnalyticsTableRow = style({
  width: "100%",
  display: "flex",
  borderBottom: "1px solid white",
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
