import { style } from "@vanilla-extract/css";
export const BTRTableWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginTop: 20,
  marginBottom: 20,
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

/* Optional: if you use these elsewhere on the page, here are their classes too */
export const SCChartContainer = style({
  padding: 5,
  borderRadius: 12,
  background: "#FFFFFF",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  margin: 20,
  // height can be set inline if dynamic: style={{ height: ... }}
});

export const SCHorizontalDivider = style({
  width: "100%",
  border: "none",
  borderTop: "1px solid #B2B2B2",
});

export const BPRColorCellRendererWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "90%",
  boxShadow: "0px 6px 12px #8D8D8D29",
  borderRadius: 4,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
