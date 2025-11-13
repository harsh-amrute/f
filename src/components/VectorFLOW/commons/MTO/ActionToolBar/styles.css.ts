// styles.css.ts
import { style, createVar, globalStyle } from "@vanilla-extract/css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { ColorsMTO } from "../../../../../VectorFlow/Pages/MTO/Common/Colors";
import * as gridSystem from "../../../../../styles/gridSystem.css";

/* =========================
   Media helpers
========================= */
// const mqLaptopToDesktop = `@media (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`;
const mqLaptopToDesktop = `(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`;
const mqDesktopAndAbove = `(min-width: ${gridSystem.size.desktop})`;
export const checkboxBgVar = createVar();
export const sliderHeightVar = createVar();
export const accentColorVar = createVar();

/* =========================
   Toolbar / containers
========================= */
export const SCTaskBarContainer = style({
  padding: "0 25px",
  display: "flex",
  alignItems: "center",
  marginLeft: "20px",
  marginTop: "20px",
  width: "100%",
  justifyContent: "space-between",
  "@media": {
    [mqLaptopToDesktop]: {
      zoom: "0.7" as any,
    },
    [mqDesktopAndAbove]: {
      zoom: "1" as any,
    },
  },
});


export const SCGoBackContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
  whiteSpace: "nowrap",
  width: "max-content",
});

export const SCGoBackText = style({
  fontWeight: 500,
  fontSize: "20px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  color: ColorsMTO.Black as unknown as string,
});

export const SCViewContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  overflow: "hidden",
  gap: "2px",
});

export const SCHorizontalDivison = style({
  height: "40px",
  width: "2px",
  background: ColorsMTO.LightGrey.code,
  margin: "0 20px",
});

/* ====== WithBg (customizable via CSS vars) ====== */
const vBgRadius = createVar();
const vBgPadding = createVar();
const vBgMinW = createVar();
const vBgMinH = createVar();

export const SCViewContainerWithBg = style({
  display: "flex",
  flexDirection: "column",
  background: `${ColorsMTO.White} 0% 0% no-repeat padding-box`,
  boxShadow: "-5px 4px 10px #8584843f",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  height: "fit-content",
  cursor: "pointer",
  vars: {
    [vBgRadius]: "5px",
    [vBgPadding]: "5px",
    [vBgMinW]: "82px",
    [vBgMinH]: "58px",
  },
  borderRadius: vBgRadius,
  padding: vBgPadding,
  minWidth: vBgMinW,
  minHeight: vBgMinH,
});

/* helper to set overrides inline (optional) */
// export const setWithBgOverrides = (opts?: {
//   borderRadius?: string;
//   padding?: string;
//   minWidth?: string;
//   minHeight?: string;
// }) =>
//   assignInlineVars({
//     [vBgRadius]: opts?.borderRadius ?? "5px",
//     [vBgPadding]: opts?.padding ?? "5px",
//     [vBgMinW]: opts?.minWidth ?? "82px",
//     [vBgMinH]: opts?.minHeight ?? "58px",
//   });

export const SCViewContainerWithBgToggle = style({
  display: "flex",
  background: `${ColorsMTO.White} 0% 0% no-repeat padding-box`,
  boxShadow: "-5px 4px 10px #8584843f",
  borderRadius: "5px",
  padding: "5px",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  height: "fit-content",
  minWidth: "164px",
  minHeight: "58px",
  cursor: "pointer",
});

export const SCVerticalDivider = style({
  width: "0.5px",
  backgroundColor: ColorsMTO.White as unknown as string,
  height: "40px",
  marginRight: "8px",
  marginLeft: "8px",
  alignItems: "center",
});

export const SCVerticalDividerGray = style({
  width: "0.5px",
  backgroundColor: "#c7c7c7",
  height: "40px",
  marginRight: "8px",
  marginLeft: "8px",
  alignItems: "center",
});

export const SCCustomActionsContainer = style({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  justifyContent: "flex-end",
});

export const SCTaskFilterContainer = style({
  display: "flex",
  justifyContent: "space-between",
  gap: "30px",
  maxWidth: "40%",
  alignItems: "center",
});

/* =========================
   Buttons
========================= */
export const SCButton = style({
  background: ColorsMTO.White.code,
  borderRadius: "6px",
  fontSize: "16px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  fontWeight: 300,
  color: ColorsMTO.Pink.code,
  padding: "15px 7px",
  pointerEvents: "all",
  width: "130px",
  height: "46px",
  boxShadow: `-5px 4px 10px ${ColorsMTO.LightGrey.code}`,
  border: `1px solid ${ColorsMTO.Pink.code}`,
  opacity: 1,
});

/* =========================
   Selected filters (chips)
========================= */
export const VFSelectedFiltersWrapper = style({
  overflow: "auto",
  height: "51px",
  padding: "5px",
  display: "flex",
  alignItems: "center",
  background: `${ColorsMTO.White} 0% 0% no-repeat padding-box`,
  boxShadow: "0px 6px 12px #95959529",
  borderRadius: "30px",
  marginRight: "20px",
  marginLeft: "20px",
});

export const VFSelectedFiltersPlaceHolder = style({
  height: "39px",
  borderRadius: "20px",
  fontWeight: 400,
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
  lineHeight: "21px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  color: "#313131",
  padding: "5px 15px",
  whiteSpace: "nowrap",
});

export const VFSelectedFiltersChip = style({
  height: "39px",
  display: "flex",
  alignItems: "center",
  padding: "5px",
  paddingLeft: "10px",
  background: "#f2f2f2 0% 0% no-repeat padding-box",
  borderRadius: "20px",
  marginLeft: "10px",
});

export const VFSelectedFiltersFilterLabel = style({
  fontSize: "16px",
  lineHeight: "21px",
  fontFamily: "Roboto",
  fontWeight: 500,
  letterSpacing: "0px",
  color: "#313131",
  display: "flex",
  width: "max-content",
});

export const VFSelectedFilterLabel = style({
  fontSize: "16px",
  lineHeight: "21px",
  fontFamily: "Roboto",
  fontWeight: 200,
  letterSpacing: "0px",
  color: "#313131",
  display: "flex",
  width: "max-content",
});

export const VFSelectedFiltersFilterContent = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export const VFSelectedFiltersFilterValue = style({
  fontSize: "16px",
  lineHeight: "21px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  display: "flex",
  whiteSpace: "nowrap",
});

export const SCFilterVerticalDivider = style({
  width: "0.5px",
  backgroundColor: "black",
  height: "20px",
  alignItems: "center",
  margin: "0 8px",
});

export const VFSelectedFiltersFilterCloseIcon = style({
  marginLeft: "5px",
  height: "18px",
  width: "18px",
  borderRadius: "50%",
  border: "solid 1px black",
  cursor: "pointer",
});

export const VFFilterScrollBar = style({
  overflowX: "auto",
  display: "flex",
  // selectors: {
  //   "::-webkit-scrollbar": {
  //     width: "0.2px",
  //   },
  // },
});
// ✅ Global pseudo-element styles tied to your class
globalStyle(`${VFFilterScrollBar}::-webkit-scrollbar`, {
  width: "0.2px",
  display: "none",
});

/* =========================
   Date block
========================= */
export const DateWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  fontFamily: "Roboto, sans-serif",
  fontWeight: 500,
  fontSize: "18px",
  color: "#000000",
  letterSpacing: "0",
  lineHeight: "21px",
});
export const DateIcon = style({});
export const DateTitle = style({ width: "100px" });
export const DateValue = style({
  padding: "15px 40px",
  background: "rgb(242, 242, 242)",
  borderRadius: "4px",
  minWidth: "180px",
});


// ---- CheckBoxDiv
export const checkBoxDiv = style({
  width: "max-content",
  // styled-components used `text-wrap: nowrap`; the cross-browser equivalent is:
  whiteSpace: "nowrap",
  backgroundColor: checkboxBgVar,
});

// ---- InputCheckBoxTitle
export const inputCheckBoxTitle = style({
  fontSize: 16,
  color: "#000000",
  fontFamily: "Roboto",
  fontWeight: "bold",
  display: "inline",
  paddingLeft: 2,
});

// ---- SCChartSliderContainer
export const scChartSliderContainer = style({
  display: "flex",
  // original had both space-between and center; the latter wins
  justifyContent: "center",
  gap: 13,
  alignItems: "center",
  height: sliderHeightVar,
});

// ---- RadioGroup
export const radioGroup = style({
  display: "flex",
  minWidth: 200,
});

// ---- SelectGroup
export const selectGroup = style({
  display: "flex",
  gap: 20,
});

// ---- ChartHeaderRadioGroup (theme-driven accent-color)
export const chartHeaderRadioGroup = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // runtime-controlled
  accentColor: accentColorVar,
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 300,
  fontSize: 14,
  lineHeight: "19px",
  fontFamily: "Roboto",
});

