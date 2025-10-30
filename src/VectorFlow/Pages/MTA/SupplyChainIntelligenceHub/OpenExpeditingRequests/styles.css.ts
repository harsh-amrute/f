import { style, styleVariants } from "@vanilla-extract/css";

export const ETACellRendererWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
});

export const ETACellValue = style({
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 6px 12px #77777729",
  border: "0.4px solid #707070",
  borderRadius: "2px",
  height: "100%",
  width: "100%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const submitRemarkBase = style({
  height: "90%",
  width: "100%",
  border: "1px solid black",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const SubmitRemarkInput = styleVariants({
  even: [submitRemarkBase, { backgroundColor: "#EFEFEF" }],
  odd: [submitRemarkBase, { backgroundColor: "white" }],
});

export const ButtonWrapper = style({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  paddingRight: "20px",
  zoom: "0.7", // preserved from styled-components
});
