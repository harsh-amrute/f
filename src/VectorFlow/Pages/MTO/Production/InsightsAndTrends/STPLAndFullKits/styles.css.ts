import { style, createVar, globalStyle } from "@vanilla-extract/css";

/* ------------ Shared runtime var (only if you need dynamic height) -------- */
export const chartHeightVar = createVar();

/* --------------------------------- Wrapper -------------------------------- */
export const Wrapper = style({
  height: "85%",
  marginLeft: "2rem",
  marginTop: "2rem",
});
// ✅ descendants of Wrapper (plain selectors, no :global)
globalStyle(`${Wrapper} > .ag-theme-alpine`, { height: "90%" });
globalStyle(`${Wrapper} div[data-testid="vf_pagination"]`, { padding: "0" });


/* ----------------------------- BTR split layout ---------------------------- */
export const BTRTableWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginTop: "20px",
  marginBottom: "20px",
  height: "100%",
});

export const BTRAllomentSection = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  maxHeight: "100%",
});

export const HorizontalViewWrapper = style({
  width: "100%",
});

/* --------------------------- Chart container (opt) ------------------------- */
export const SCChartContainer = style({
  padding: "5px",
  borderRadius: "12px",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  margin: "20px",
  vars: { [chartHeightVar]: "auto" },
  height: chartHeightVar,
});

export const SCHorizontalDivider = style({
  width: "100%",
  border: "none",
  borderTop: "1px solid #B2B2B2",
});

/* ------------------------------- Child table ------------------------------- */
export const VFChilWrapper = style({
  width: "100%",
  height: "100%",
});
// ✅ Global AG Grid theme overrides under VFChilWrapper
globalStyle(`${VFChilWrapper} .ag-theme-alpine`, {
  "--ag-header-background-color": "rgb(255, 255, 255)",
  "--ag-header-foreground-color": "rgb(0, 0, 0)",
}as React.CSSProperties);

globalStyle(`${VFChilWrapper} .ag-theme-noir-fusion`, {
  "--ag-header-background-color": "rgb(255, 255, 255)",
  "--ag-header-foreground-color": "rgb(0, 0, 0)",
}as React.CSSProperties);
