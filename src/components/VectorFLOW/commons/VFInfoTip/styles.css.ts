import { style, styleVariants } from "@vanilla-extract/css";

export const InfoWrapper = style({
  height: "auto",
  width: "100%",
  border: "1px dashed #BC3D81",
  borderRadius: "6px",
});

const iconTextBase = style({
  margin: "13px 10px 12px 20px",
  display: "flex",
  alignItems: "center",
});
export const IconTextContainer = styleVariants({
  tight: [iconTextBase, { gap: "8px" }],
  loose: [iconTextBase, { gap: "22px" }],
});

export const InfoIcon = style({
  width: "20px",
  height: "auto",
});

export const Infotext = style({
  marginLeft: "10px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  fontFamily: "Roboto",
});
