import { style, createVar, globalStyle } from "@vanilla-extract/css";
import * as gridSystem from "../../../../styles/gridSystem.css";

// runtime var for SCChartContainer height
export const chartHeightVar = createVar();

export const SCDynamicContainer = style({
  marginTop: "25px",
  display: "block",
  height: "150vh",
  "@media": {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      { height: "70vh" },
    [`screen and (min-width: ${gridSystem.size.desktop})`]: { height: "110vh" },
  },
});

export const SCChartContainer = style({
  padding: "5px",
  borderRadius: "12px",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  marginRight: "5px",
  marginBottom: "10px",
  marginLeft: "5px",
  // default + runtime override
  height: chartHeightVar,
});

export const SCChartLayout = style({
  overflowY: "scroll",
  display: "flex",
  height: "100%",
  flexDirection: "column",
});

export const SCHorizontalAllignmentWrapper = style({
  width: "100%",
  padding: "0px 20px 15px",
  height: "100%",
});

export const SCChartHeaderContainer = style({
  backgroundColor: "white",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});

export const SCChartHeader = style({
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "21px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  color: "#000000",
  textAlign: "center",
});

export const SCHorizontalDivider = style({
  width: "100%",
  border: "none",
  borderTop: "1px solid #B2B2B2",
});

// globalStyle('.ag-charts-tooltip', {
//   background: 'rgba(34, 34, 34, 0.9)',
//   color: '#fff',
//   padding: '8px 10px',
//   borderRadius: 4,
//   fontSize: '12px',
//   lineHeight: 1.4,
//   pointerEvents: 'none',
//   boxShadow: '0 2px 8px rgba(0,0,0,.25)',
// });
