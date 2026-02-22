import { style, createVar } from "@vanilla-extract/css";

export const stateColorVar = createVar();

export const SeasonalityGrapCellRendererWrapper = style({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const SeasonalityColorCellRendererWrapper = style({
  width: "8px",
  height: "100%",
  position: "absolute",
  left: 0,
  backgroundColor: stateColorVar,
});
