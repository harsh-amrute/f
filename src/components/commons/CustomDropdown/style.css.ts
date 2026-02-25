import { style, styleVariants , createVar } from "@vanilla-extract/css";


export const topVar = createVar();
export const leftVar = createVar();

export const dropdownWrapper = style({
  position: "absolute",
  top: topVar,
  left: leftVar,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  zIndex: 9999,
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  maxHeight: 300,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  overflow: "auto",
});

/* ===== styles.css migration ===== */

export const customDetails = style({
  width: 210,
  position: "relative",
  backgroundColor: "rgb(215, 214, 214)",
  overflowX: "hidden",
});

export const customSummaryBase = style({
  // removes default triangle
  selectors: { "&::-webkit-details-marker": { display: "none" } },
  listStyle: "none",
  cursor: "pointer",
  fontWeight: 600,
  padding: 4,
  outline: "none",
  width: "auto",
  userSelect: "none",
  display: "flex",
  justifyContent: "space-between",
  ":hover": { backgroundColor: "#ebebeb" },
});

export const customSummary = styleVariants({
  closed: [customSummaryBase],
  open: [customSummaryBase],
});

export const customDetailsState = styleVariants({
  closed: {},
  open: { backgroundColor: "#e3e0e0" },
});

export const customDropdown = style({
  marginTop: 8,
  paddingLeft: 4,
});

export const truncate = style({
  maxWidth: "35ch",
  overflowWrap: "break-word",
  wordWrap: "break-word",
});

export const arrow = style({
  display: "inline-flex",
  alignItems: "center",
});
