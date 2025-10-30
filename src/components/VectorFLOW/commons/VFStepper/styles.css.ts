import { style } from "@vanilla-extract/css";

/* helpers: original used green for completed, grey otherwise */
const COLOR_COMPLETED = "#5D804E";
const COLOR_NEUTRAL = "#9A9A9A";

export const stepperWrapper = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
});

export const stepWrapper = style({
  display: "flex",
  flexDirection: "row",
});

export const stepLabelWrapper = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "60px",
});

export const stepLabel = style({
  textAlign:"center",
  marginTop:"6px",
  fontStyle:"normal",
  fontVariant:"normal",
  fontWeight:400,
  fontFamily:"Roboto",
  letterSpacing: "0px",
  color: "#313131",
  whiteSpace:"nowrap"
});

export const stepDescription = style({
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 300,
  fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif",
  letterSpacing: "0px",
  color: "#1C1E2B",
  textAlign: "center",
});

export const stepProgressBase = style({
  marginTop: "12px", // overridden inline when prefix exists
  marginLeft: "10px",
  marginRight: "10px",
  height: "0px",
  // we mimic outline line using outline like original
  outlineWidth: "2px",
  outlineStyle: "solid", // can be changed with dashed modifier
});

export const stepProgressCompleted = style({
  outlineColor: COLOR_COMPLETED,
});

export const stepProgressPending = style({
  outlineColor: COLOR_NEUTRAL,
});

export const stepProgressRejected = style({
  outlineColor: COLOR_NEUTRAL, // same as pending in the original getProgressColor
});

export const stepProgressDashed = style({
  outlineStyle: "dashed",
});

export const stepPrefixWrapper = style({
  marginBottom: "10px",
});

export const stepperContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
