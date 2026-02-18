import { style, createVar } from "@vanilla-extract/css";

export const orderCellRendererWrapper = style({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

// dynamic color via CSS var
export const stateColorVar = createVar();

export const orderColorCellRenderer = style({
  width: "8px",
  height: "100%",
  position: "absolute",
  left: 0,
  backgroundColor: stateColorVar,
});
