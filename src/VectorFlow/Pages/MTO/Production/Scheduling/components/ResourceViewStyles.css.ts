import {
  style,
  keyframes,
  createVar,
  globalStyle,
} from "@vanilla-extract/css";

/* ---------- Section + Grid ---------- */

export const sectionWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "16px 0 16px 16px",
  position: "relative",
  marginTop: 24,
});

export const gridWrapper = style({
  position: "relative",
  border: "1px solid #ccc",
  borderRadius: "0 8px 8px 8px",
  padding: "16px 16px 25px 16px",
  overflow: "hidden",
  background: "white",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
  gap: 16,
  height: 400,
});

// .ag-theme-alpine child
globalStyle(`${gridWrapper} > .ag-theme-alpine`, {
  flex: 1,
});

/* ---------- WorkStation dropdown ---------- */

export const workStationDropDown = style({
  padding: 8,
  border: "1px solid #ccc",
  borderRadius: 4,
  width: "fit-content",
  fontSize: "1rem",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  backgroundColor: "white",
  cursor: "pointer",
  selectors: {
    "&:focus": {
      outline: "none",
      borderColor: "#9c0d64",
      boxShadow: "0 0 5px rgba(156, 13, 100, 0.5)",
    },
  },
});

// option styles must be global, targeting the generated class
globalStyle(`${workStationDropDown} option`, {
  backgroundColor: "white",
  color: "#333",
});

globalStyle(`${workStationDropDown} option:checked`, {
  backgroundColor: "#b52670",
  color: "white",
});

globalStyle(`${workStationDropDown} option:hover`, {
  backgroundColor: "#ffb6c1",
  color: "#333",
});

/* ---------- Tab label ---------- */

export const tab = style({
  position: "absolute",
  top: -25,
  left: 16,
  height: 40,
  padding: "10px 80px 10px 20px",
  display: "flex",
  alignItems: "center",
  color: "white",
  fontWeight: 500,
  fontSize: "1.2rem",
  background: "linear-gradient(135deg, #9c0d64, #c71585)",
  borderTopLeftRadius: 8,
  clipPath: "polygon(0 0, 75% 0, 100% 100%, 0% 100%)",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.25)",
});

/* ---------- Filter + toggle ---------- */

export const filterSection = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const toggleWrapper = style({
  display: "flex",
  background: "#fff",
  borderRadius: 50,
  padding: 4,
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  width: "fit-content",
  gap: 6,
});

/* --- ToggleButton dynamic vars --- */

export const toggleBgVar = createVar();
export const toggleColorVar = createVar();
export const toggleHoverBgVar = createVar();

export const toggleButton = style({
  flex: 1,
  padding: "8px 16px",
  borderRadius: 50,
  border: "none",
  cursor: "pointer",
  background: toggleBgVar,
  color: toggleColorVar,
  fontSize: "0.85rem",
  fontWeight: 500,
  minWidth: "fit-content",
  transition: "all 0.3s ease",

  vars: {
    [toggleBgVar]: "transparent",
    [toggleColorVar]: "#555",
    [toggleHoverBgVar]: "#f0f0f0",
  },

  selectors: {
    "&:hover": {
      background: toggleHoverBgVar,
    },
  },
});

/* ---------- Resource wrapper + chart ---------- */

export const resourceSectionWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "16px 0 16px 16px",
  position: "relative",
});

export const chartWrapper = style({
  position: "relative",
  flex: 1,
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: 16,
  overflow: "hidden",
  background: "white",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
});

/* ---------- Skeleton / shimmer ---------- */

export const skeletonWidthVar = createVar();
export const skeletonHeightVar = createVar();

export const shimmer = keyframes({
  "0%": {
    backgroundPosition: "-200px 0",
  },
  "100%": {
    backgroundPosition: "calc(200px + 100%) 0",
  },
});

export const skeletonBlock = style({
  background: "#eee",
  backgroundImage: "linear-gradient(90deg, #eee 0px, #f5f5f5 40px, #eee 80px)",
  backgroundSize: "200px 100%",
  animation: `${shimmer} 1.5s infinite linear`,
  borderRadius: 4,
  margin: "6px 0",

  width: skeletonWidthVar,
  height: skeletonHeightVar,

  vars: {
    [skeletonWidthVar]: "100%",
    [skeletonHeightVar]: "20px",
  },
});
