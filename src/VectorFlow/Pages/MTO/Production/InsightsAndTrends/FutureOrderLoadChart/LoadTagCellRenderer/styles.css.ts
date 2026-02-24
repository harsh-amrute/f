// Tag.css.ts
import { style, createVar } from "@vanilla-extract/css";

/* ---------- Outer Tag Wrapper with ::before notch ---------- */

export const tagWrapperOuter = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "0 16px 0 20px",
  height: 28,
  fontSize: 14,
  fontWeight: 500,
  color: "#222",
  borderRadius: 4,
  position: "relative",
  background: "transparent",
  margin: "8px 0",
  border: "1px solid red",

  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      left: 0,
      width: 0,
      height: 0,
      borderTop: "14px solid transparent",
      borderBottom: "14px solid transparent",
      borderRight: "18px solid #c1c1c1",
      borderRadius: "4px 0 0 4px",
    },
  },
});

/* ---------- Inner Tag Wrapper (second TagWrapper) ---------- */

export const tagWrapperInner = style({
  display: "flex",
  alignItems: "center",
  height: 22,
});

/* ---------- TagArrow with dynamic arrowcolor / bordercolor ---------- */

export const tagArrowRightColorVar = createVar();
export const tagArrowBorderWidthVar = createVar();
export const tagArrowBorderColorVar = createVar();

export const tagArrow = style({
  width: 0,
  height: 0,

  borderTop: "11px solid transparent",
  borderBottom: "11px solid transparent",
  borderRight: `15px solid ${tagArrowRightColorVar}`,

  borderTopWidth: tagArrowBorderWidthVar,
  borderTopStyle: "solid",
  borderTopColor: tagArrowBorderColorVar,

  borderBottomWidth: tagArrowBorderWidthVar,
  borderBottomStyle: "solid",
  borderBottomColor: tagArrowBorderColorVar,

  vars: {
    [tagArrowRightColorVar]: "transparent",
    [tagArrowBorderWidthVar]: "0px",
    [tagArrowBorderColorVar]: "transparent",
  },
});

/* ---------- TagLabel with dynamic bg/text/border ---------- */

export const tagLabelBgVar = createVar();
export const tagLabelTextColorVar = createVar();
export const tagLabelBorderVar = createVar();

export const tagLabel = style({
  padding: "5px 12px",
  borderLeft: "none",
  lineHeight: 1,
  height: 22,
  minWidth: 90,
  display: "inline-block",
  width: 140,
  fontWeight: 500,
  borderRadius: "0 4px 4px 0",

  background: tagLabelBgVar,
  color: tagLabelTextColorVar,
  border: tagLabelBorderVar,

  vars: {
    [tagLabelBgVar]: "transparent",
    [tagLabelTextColorVar]: "#000000",
    [tagLabelBorderVar]: "none",
  },
});
