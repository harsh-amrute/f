import { style } from "@vanilla-extract/css";

export const actionContainer = style({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
});

export const actionButton = style({
  cursor: "pointer",
});
