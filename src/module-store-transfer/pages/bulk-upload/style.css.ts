// upload.css.ts
import {
  style,
  styleVariants,
  keyframes as veKeyframes,
  createVar,
} from "@vanilla-extract/css";

/* ===== Vars for per-instance customization (assignInlineVars) ===== */
export const headerTextFontSizeVar = createVar();
export const headerTextFontWeightVar = createVar();
export const subTextFontSizeVar = createVar();
export const subTextFontWeightVar = createVar();
export const circleStrokeWidthVar = createVar();
export const activeColor = createVar();
export const activeBgColor = createVar();
export const activeFontWeight = createVar();
export const activeHoverBgColor = createVar();
/* ===== Shared / simple blocks ===== */
export const uploadSectionWrapper = style({
  width: "100%",
  display: "flex",
  height: "100%",
  overflow: "hidden",
});

export const noData = style({
  width: "50%",
  height: "80%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const leftSectionWrapper = style({
  width: "50%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "6rem",
  marginTop: "5rem",
  paddingLeft: "5rem",
  paddingBottom: "10rem",
});

export const leftCommonComWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "1.2rem",
});

export const leftStep = style({
  display: "inline-block",
  backgroundColor: "#870d48",
  color: "#fff",
  padding: "8px 25px 8px 15px",
  fontWeight: "bold",
  borderRadius: "6px 0 0 6px",
  fontSize: "1.2rem",
  clipPath: "polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%, 0% 50%)",
});

export const leftCommonComUploadWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "90%",
  backgroundColor: "#fff",
  border: "1.8px dashed rgba(249, 28, 28, 0.5)",
  borderRadius: "8px",
  padding: "2rem 3rem",
  height: "8rem",
});

export const headerSection = style({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "flex-start",
  verticalAlign: "middle",
});

/* ===== Elements with per-instance vars ===== */
export const headerTextStyle = style({
  fontSize: headerTextFontSizeVar,
  fontWeight: headerTextFontWeightVar as any,
  display: "flex",
  alignItems: "center",
  gap: "8px",
});
export const headerTextDefaults = style({
  vars: {
    [headerTextFontSizeVar]: "1.35rem",
    [headerTextFontWeightVar]: "600",
  },
});

export const subTextStyle = style({
  fontSize: subTextFontSizeVar,
  fontWeight: subTextFontWeightVar as any,
  color: "rgb(102, 102, 102)",
});
export const subTextDefaults = style({
  vars: {
    [subTextFontSizeVar]: "1.15rem",
    [subTextFontWeightVar]: "300",
  },
});

/* ===== Right section ===== */
export const rightSectionWrapper = style({
  width: "50%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "2rem",
});

export const progressBoxWrapper = style({
  width: "20rem",
  height: "20rem",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.4rem",
});

export const svg = style({
  display: "block",
});

export const circleStyle = style({
  transition: "stroke-dashoffset 0.5s ease",
  strokeWidth: circleStrokeWidthVar,
});
export const circleDefaults = style({
  vars: { [circleStrokeWidthVar]: "2" },
});

export const text = style({
  fontSize: "1.4rem",
  fill: "#bd2c84",
  fontWeight: "bold",
  textAnchor: "middle",
  dominantBaseline: "middle",
});

export const labelText = style({
  marginTop: "0.8rem",
  fontSize: "1.4rem",
  color: "#888",
});

/* ===== File panel ===== */
export const filePanel = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem",
  borderRadius: "0.5rem",
  backgroundColor: "rgb(239, 239, 239)",
  width: "50rem",
  selectors: {
    "&:hover": {
      backgroundColor: "rgb(215, 211, 211)",
      cursor: "pointer",
    },
  },
});

export const fileName = style({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const actionButton = style({
  width: "100px",
  height: "27px",
  paddingLeft: "10px",
  border: "1px solid rgba(206, 206, 206, 0.5)",
  cursor: "pointer",
  alignContent: "center",
  selectors: {
    "&:hover": { backgroundColor: "#cecece" },
  },
});

/* ===== Sections / grids ===== */
export const sectionContainer = style({
  border: "1px dotted #ccc",
  borderRadius: "6px",
  padding: "12px 16px",
  marginBottom: "16px",
  zoom: "0.85",
});

export const titleContainer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const sectionTitle = style({
  margin: "0 0 12px 0",
  fontSize: "14px",
  fontWeight: 600,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
});

export const selectContainer = style({
  display: "flex",
  flexDirection: "column",
});

export const label = style({
  fontSize: "12px",
  color: "#333",
  marginBottom: "6px",
});

export const selectAllWrapper = style({
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
  fontSize: "12px",
  gap: "6px",
});

/* ===== Toggle (use class toggle for active) ===== */
export const toggleContainer = style({
  display: "flex",
  backgroundColor: "#fff",
  border: "1.5px solid #d08ba5",
  borderRadius: "999px",
  overflow: "hidden",
  width: "fit-content",
  padding: "2px",
  gap: "12px",
  fontSize: "8px",
});

export const toggleButton = style({
  padding: "3px 14px",
  border: "none",
  backgroundColor: activeBgColor,
  color: activeColor,
  fontWeight: activeFontWeight,
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "10px",
  transition: "background 0.3s ease, color 0.3s ease",
  selectors: {
    "&:hover": { backgroundColor: activeHoverBgColor },
  },
});

export const toggleButtonActive = style({
  backgroundColor: "#f1d2e0",
  color: "#c72e64",
  fontWeight: "bold",
  selectors: {
    "&:hover": { backgroundColor: "#f1d2e0" },
  },
});

/* ===== Modal / sections ===== */
export const modalContainer = style({
  width: "45vw",
  height: "fit-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 0",
  maxHeight: "90vh",
  flexDirection: "column",
});

export const modalContent = style({
  width: "95%",
  height: "80%",
  backgroundColor: "#fff",
  padding: "20px",
  overflowY: "auto",
});

export const section = style({
  marginBottom: "20px",
  borderTop: "1px solid #e0e0e0",
  padding: "12px",
  borderRadius: "8px",
  overflowY: "auto",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
});

export const sectionHeader = style({
  fontWeight: 500,
  fontSize: "14px",
  marginBottom: "8px",
  display: "flex",
  paddingBottom: "4px",
  borderBottom: "1px solid #e0e0e0",
  justifyContent: "space-between",
  cursor: "pointer",
});

export const rolesGrid = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  padding: "5px 20px",
});

export const checkboxLabel = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "12px",
});

export const buttonSection = style({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px",
  gap: "20px",
  width: "100%",
});

/* ===== Scroller ===== */
export const container = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "4px",
  overflow: "hidden",
  width: "100%",
  gap: "5px",
  height: "100%",
});

const scrollAnimation = veKeyframes({
  "0%": { transform: "translateX(0%)" },
  "100%": { transform: "translateX(-100%)" },
});

export const scrollWrapper = style({
  overflow: "hidden",
  width: "100%",
});

export const scrollContainer = style({
  display: "flex",
  gap: "8px",
  width: "100%",
  willChange: "transform",
});

export const scrollContainerScrolling = style({
  animationName: scrollAnimation,
  animationDuration: "30s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  selectors: {
    "&:hover": { animationPlayState: "paused" as any },
  },
});

/* ===== Role chips, etc. ===== */
export const roleTab = style({
  padding: "2px 6px",
  backgroundColor: "rgb(44, 43, 43)",
  color: "#fff",
  borderRadius: "12px",
  whiteSpace: "nowrap",
  fontSize: "8px",
});

export const buttonGroup = style({
  gap: "6px",
  background: "transparent",
});

export const roleTile = style({
  backgroundColor: "rgb(44, 43, 43)",
  color: "#fff",
  padding: "4px 6px",
  borderRadius: "8px",
  fontSize: "10px",
  textAlign: "center",
  whiteSpace: "nowrap",
});

export const containerDrop = style({
  width: "240px",
  fontSize: "11px",
  border: "1px solid #ccc",
  padding: "8px",
  background: "#fff",
});

export const checkboxRow = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "4px 0",
  fontWeight: 420 as any,
  selectors: {
    "&:hover": {
      fontSize: "12px",
      fontWeight: 400 as any,
    },
  },
});

export const categoryHeader = style({
  fontWeight: "bold",
  padding: "6px",
  marginTop: "6px",
  display: "flex",
  justifyContent: "space-between",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      background: "#f0f0f0",
      fontSize: "12.5px",
    },
  },
});

export const subItem = style({
  paddingLeft: "10px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  margin: "4px 0",
  selectors: {
    "&:hover": { background: "#f0f0f0" },
  },
});

export const bottomButtons = style({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "16px",
});

export const optionsSection = style({
  maxHeight: "200px",
  overflowY: "auto",
  marginTop: "8px",
  borderTop: "1px solid #eee",
  paddingTop: "8px",
});

export const ImageSpan = style({
  width: "10%",
  height: "100%",
});
