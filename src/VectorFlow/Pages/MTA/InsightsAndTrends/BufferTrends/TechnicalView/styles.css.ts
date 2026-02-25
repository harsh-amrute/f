import { style } from "@vanilla-extract/css";

export const CapsuleWrapper = style({
  width: "100%",
  // maxWidth intentionally omitted (was commented out)
  marginLeft: "auto",
});

export const ChartWrapper = style({
  position: "relative",
  width: "100%",
  paddingTop: "10px",
  // display was commented out in the original; keeping that behavior:
  // display: 'flex',
  justifyContent: "center",
  alignItems: "center",
  height: "70%",
});
