// styles.css.ts
import { style, createVar } from "@vanilla-extract/css";

/* ===== variables for dynamic text sizing ===== */
export const headerFontSizeVar = createVar();
export const headerFontWeightVar = createVar();
export const subFontSizeVar = createVar();
export const subFontWeightVar = createVar();

/* ===== Upload page layout ===== */
export const UploadSectionWrapper = style({
  width: "100%",
  display: "flex",
  height: "100%",
  overflow: "hidden",
});

export const NoData = style({
  width: "50%",
  height: "80%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const LeftSectionWrapper = style({
  width: "50%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "6rem",
  paddingLeft: "5rem",
  paddingBottom: "10rem",
  backgroundColor: "rgb(245, 245, 245)",
});

export const LeftCommonComWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "1.7rem",
});

export const LeftStep = style({
  display: "inline-block",
  backgroundColor: "#870d48",
  color: "white",
  padding: "8px 25px 8px 15px",
  fontWeight: "bold",
  borderRadius: "6px 0 0 6px",
  fontSize: "1.3rem",
  clipPath: "polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%, 0% 50%)",
});

export const LeftCommonComUploadWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "90%",
  backgroundColor: "#fff",
  border: "3px dashed rgba(249, 28, 28, 0.5)",
  borderRadius: "2px",
  padding: "1rem",
  height: "10rem",
});

export const HeaderSection = style({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "start",
  verticalAlign: "middle",
});

export const HeaderText = style({
  fontSize: `var(${headerFontSizeVar}, 1.9rem)`,
  fontWeight: `var(${headerFontWeightVar}, 600)`,
});

export const SubText = style({
  fontSize: `var(${subFontSizeVar}, 1.2rem)`,
  fontWeight: `var(${subFontWeightVar}, 300)`,
  color: "#666",
});

/* ===== Right section ===== */
export const RightSectionWrapper = style({
  width: "50%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "2rem",
});

export const ProgressBoxWrapper = style({
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

/* ===== Circular progress (SVG) ===== */
export const Svg = style({
  display: "block",
});

export const Circle = style({
  transition: "stroke-dashoffset 0.5s ease",
});

export const Text = style({
  fontSize: "1.4rem",
  fill: "#bd2c84",
  fontWeight: "bold",
  textAnchor: "middle",
  dominantBaseline: "middle",
});

export const LabelText = style({
  marginTop: "0.8rem",
  fontSize: "1.4rem",
  color: "#888",
});

/* ===== File panel ===== */
export const FilePanel = style({
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

export const FileName = style({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});
