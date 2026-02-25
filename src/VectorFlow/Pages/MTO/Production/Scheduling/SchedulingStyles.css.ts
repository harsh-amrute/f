// FinalResultSection.css.ts
import {
  style,
  keyframes,
  createVar,
  globalStyle,
} from "@vanilla-extract/css";

// ---------- Vars for Skeleton ----------
export const skeletonWidthVar = createVar();
export const skeletonHeightVar = createVar();

// ---------- Keyframes ----------
export const shimmer = keyframes({
  "0%": {
    backgroundPosition: "-200px 0",
  },
  "100%": {
    backgroundPosition: "calc(200px + 100%) 0",
  },
});

// ---------- Layout Wrappers ----------
export const finalResultSectionWrapper = style({
  height: "fit-content",
  position: "relative",
});

export const gridWrapper = style({
  position: "relative",
  overflow: "hidden",
  display: "flex",
  paddingLeft: 20,
  paddingTop: 15,
  flexDirection: "column",
  gap: 16,
  height: "78vh",
});

// Scoped AG Grid styles (using globalStyle)
globalStyle(`${gridWrapper} > .ag-theme-alpine`, {
  flex: 1,
});

globalStyle(
  `${gridWrapper} .ag-theme-alpine .ag-header-row:nth-child(2)`,
  {
    backgroundColor: "black",
    color: "white",
  }
);

globalStyle(
  `${gridWrapper} .ag-theme-alpine .ag-header-row:nth-child(1):hover`,
  {
    backgroundColor: "black",
    color: "white",
  }
);

globalStyle(
  `${gridWrapper} .ag-theme-alpine .ag-header-row:nth-child(3)`,
  {
    backgroundColor: "#f7f7f7",
    color: "black",
  }
);

globalStyle(
  `${gridWrapper} .ag-theme-alpine .ag-header-row-column-filter`,
  {
    backgroundColor: "#f7f7f7",
    color: "black",
  }
);

export const sectionWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "16px 0 16px 16px",
});

export const chartWrapper = style({
  flex: 1,
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: 16,
  overflow: "hidden",
  background: "white",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
});

export const resourceViewWrapper = style({
  display: "flex",
  flexDirection: "column",
});

export const statusBarWrapper = style({
  position: "sticky",
  bottom: 0,
  width: "calc(100% + 24px)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  padding: "12px 24px 12px 12px",
  background: "white",
  boxShadow: "0px -2px 6px rgba(0, 0, 0, 0.4)",
  borderTop: "1px solid #E0E0E0",
});

export const leftSection = style({
  display: "flex",
  alignItems: "center",
  gap: 24,
  marginLeft: 20,
});

export const mainSection = style({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "space-between",
});

// ---------- Skeleton Block ----------
export const skeletonBlock = style({
  background: "#eee",
  backgroundImage:
    "linear-gradient(90deg, #eee 0px, #f5f5f5 40px, #eee 80px)",
  backgroundSize: "200px 100%",
  animation: `${shimmer} 1.5s infinite linear`,
  borderRadius: 4,
  margin: "6px 0",

  // default values
  vars: {
    [skeletonWidthVar]: "100%",
    [skeletonHeightVar]: "20px",
  },

  width: skeletonWidthVar,
  height: skeletonHeightVar,
});
