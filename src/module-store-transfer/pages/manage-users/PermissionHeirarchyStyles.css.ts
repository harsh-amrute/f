// Toggle.css.ts
import { style, createVar, globalStyle } from "@vanilla-extract/css";

/* ---------- Vars for dynamic ToggleButton state ---------- */
export const toggleBgVar = createVar();
export const toggleColorVar = createVar();
export const toggleWeightVar = createVar();

/* ---------- Toggle Container ---------- */
export const ToggleContainer = style({
  display: "flex",
  backgroundColor: "#fff",
  borderRadius: 999,
  overflow: "hidden",
  width: "fit-content",
  padding: 3,
  gap: 8,
  fontSize: 8,
});

/* ---------- Toggle Button ---------- */
export const ToggleButton = style({
  padding: "4px 14px",
  border: "none",
  borderRadius: 999,
  cursor: "pointer",
  fontSize: 10,
  transition: "background 0.3s ease, color 0.3s ease",
  backgroundColor: toggleBgVar,
  color: toggleColorVar,
  fontWeight: toggleWeightVar,

  selectors: {
    "&:hover": {
      backgroundColor: toggleBgVar, // same hover behavior as styled-components
    },
  },
});

/* ---------- Chart Wrapper ---------- */
export const ChartWrapper = style({});

/* Hide ReactFlow attribution */
globalStyle(`${ChartWrapper} .react-flow__attribution`, {
  display: "none",
});
