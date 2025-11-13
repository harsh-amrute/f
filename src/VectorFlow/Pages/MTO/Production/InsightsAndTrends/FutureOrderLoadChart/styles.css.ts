import { createVar, globalStyle, style } from "@vanilla-extract/css";

// ——— CSS Variables (for dynamic runtime overrides)
export const filterMinWidthVar = createVar();

// ——— Top-level container for Tabs and Toolbar
export const tabsToolbarRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  position: "relative",
});

// ——— Left Section - Tabs
export const tabsSection = style({
  flex: "0 0 auto",
  paddingLeft: 20,
});

// ——— Toolbar (Right)
export const toolbarAbsolute = style({
  position: "absolute",
  right: 0,
  display: "flex",
  alignItems: "center",
});

// ——— Filter Column Group (Select / Date pickers)
// Uses a CSS variable for dynamic min-width
export const filterColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minWidth: filterMinWidthVar,
});

// ——— Label for filter fields
export const filterLabel = style({
  fontFamily: "Roboto",
  fontWeight: 300,
  fontSize: 10,
  color: "#434343",
});

// ——— Date Pickers Row
export const datePickersRow = style({
  display: "flex",
  gap: 8,
  alignItems: "flex-start",
});

// ——— Date Column
export const dateColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: 5,
  minWidth: 150,
});

// ——— Date Field Container
export const dateFieldContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #cccccc",
  background: "#fff",
  height: 25,
  width: 140,
  padding: "0 10px",
});

// ——— Filter Wrapper
export const filterWrapper = style({
  marginLeft: 15,
  width: 780,
  paddingLeft: 10,
  display: "flex",
  alignItems: "center",
  gap: 15,
  minHeight: 76,
});

// ——— MyFutureOrderTabsFix (scoped global style)
export const myFutureOrderTabsFix = style({});
globalStyle(`${myFutureOrderTabsFix} .cqHMwT`, {
  minWidth: 0,
  paddingRight: 10,
  width: "auto",
});
