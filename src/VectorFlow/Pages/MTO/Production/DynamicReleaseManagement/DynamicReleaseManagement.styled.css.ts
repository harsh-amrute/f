import { style, createVar, globalStyle } from "@vanilla-extract/css";

/* runtime vars */
export const btnBgVar = createVar();
export const btnTextVar = createVar();
export const arrowUrlVar = createVar();
export const dynColorVar = createVar();
export const dynHeightVar = createVar();

export const Wrapper = style({
  width: "100%",
  height: "100%",
  padding: "0 16px",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",

  // selectors: {
  //   "& .sc-gazJty": {
  //     padding: "0 !important",
  //     marginTop: "-22px !important",
  //     fontSize: "10px !important",
  //   },

  //   // ❗ merged into ONE key (was duplicated before)
  //   "& > .ag-theme-alpine": {
  //     margin: "0 !important", // final wins
  //     width: "100%",
  //     flex: 1,
  //   },

  //   "& > button": { width: "max-content" },
  //   "& > *:not(button, .toolbar-container)": {
  //     transition: "flex 0.2s ease-in-out !important",
  //   },
  //   "& .toolbar-container": {
  //     width: "100%",
  //     marginBottom: 0,
  //     marginTop: 20,
  //   },
  //   "& .ag-header-cell-text": { fontSize: 12 },
  //   '& div[data-testid="vf_pagination"]': { margin: "0 !important" },

  //   "& .chart-wrapper > div": { height: "100% !important" },
  //   "& .chart-wrapper > div .ag-charts-wrapper": {
  //     maxHeight: "100% !important",
  //   },
  //   "& .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas": {
  //     height: "100%",
  //   },
  //   "& .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas > canvas": {
  //     height: "100% !important",
  //   },
  // },
});
// descendants of Wrapper
globalStyle(`${Wrapper} .sc-gazJty`, {
  padding: '0 !important',
  marginTop: '-22px !important',
  fontSize: '10px !important',
});

globalStyle(`${Wrapper} > .ag-theme-alpine`, {
  margin: '0 !important',
  width: '100%',
  flex: 1,
});

globalStyle(`${Wrapper} > button`, { width: 'max-content' });

globalStyle(`${Wrapper} > *:not(button, .toolbar-container)`, {
  transition: 'flex 0.2s ease-in-out !important',
});

globalStyle(`${Wrapper} .toolbar-container`, {
  width: '100%',
  marginBottom: 0,
  marginTop: 20,
});

globalStyle(`${Wrapper} .ag-header-cell-text`, { fontSize: 12 });

globalStyle(`${Wrapper} div[data-testid="vf_pagination"]`, { margin: '0 !important' });

// charts
globalStyle(`${Wrapper} .chart-wrapper > div`, { height: '100% !important' });
globalStyle(`${Wrapper} .chart-wrapper > div .ag-charts-wrapper`, {
  maxHeight: '100% !important',
});
globalStyle(`${Wrapper} .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas`, {
  height: '100%',
});
globalStyle(
  `${Wrapper} .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas > canvas`,
  { height: '100% !important' }
);

export const Button = style({
  padding: "1rem 2rem",
  lineHeight: "1",
  borderRadius: "10px 10px 0 0",
  fontSize: 10,
  position: "relative",
  background: btnBgVar,
  color: btnTextVar,
  selectors: {
    "&::after": {
      content: "",
      position: "absolute",
      left: "50%",
      top: "-3px",
      transform: "translate(-50%, -50%)",
      border: "2px solid white",
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: arrowUrlVar,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
    },
  },
});

export const StepperWrapper = style({
  display: "flex",
  justifyContent: "space-evenly",
  fontSize: 12,
  padding: "2rem 1rem",
  margin: "1.5rem 0",
  gap: "5rem",
  border: "1px dashed #707070",
  borderRadius: 10,
});

export const StepGroup = style({
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 0,
  background: "#eae8e8",
  borderRadius: 4,
  position: "relative",
  selectors: {
    "&:not(:first-of-type)::before": {
      content: "",
      position: "absolute",
      width: 5,
      height: 5,
      border: "1px solid #82104c",
      right: "100%",
      background: "#82104c",
      borderRadius: "50%",
    },
    '&[data-inactive="true"]::before': {
      content: "",
      position: "absolute",
      width: 5,
      height: 5,
      border: "1px solid #82104c",
      right: "calc(100% + 5px)",
      background: "transparent",
      borderRadius: "50%",
    },
    "&:not(:last-of-type)::after": {
      content: "",
      position: "absolute",
      width: 5,
      height: 5,
      border: "1px solid #82104c",
      left: "100%",
      borderRadius: "50%",
    },
    '&[data-inactive="true"]::after': {
      content: "",
      position: "absolute",
      width: 5,
      height: 5,
      border: "1px solid #82104c",
      left: "calc(100% + 5px)",
      borderRadius: "50%",
    },
  },
});

export const StepLabel = style({ margin: "0 1rem", width: "max-content" });
export const ContentWrapper = style({ margin: "2rem 0 0 0" });
export const RouteContentWrapper = style({
  margin: "2rem",
  width: "70vw",
  height: "65vh",
  overflow: "auto",
});
export const Text = style({ fontSize: 14, fontWeight: 300 });

export const SCButton = style({
  font: "normal normal 300 16px/24px Roboto",
  padding: "10px 20px",
  borderRadius: 6,
  boxShadow: "0px 6px 25px #00000029",
  color: "#fff",
  background: btnBgVar,
});

// helper so TS accepts CSS custom props like --ag-grid-size
const cssVars = (vars: Record<`--${string}`, string>) => vars;

export const SCDynamicContainer = style({
  display: "flex",
  height: "100%",

  // ✅ selectors only here (top level)
  // selectors: {
  //   "& .ag-header-cell-text": { fontSize: 12 },

  //   "& > .ag-theme-alpine": {
  //     margin: "0 !important",
  //     flex: 1,
  //     height: "100%",

  //     // custom props (ok to spread here)
  //     ...cssVars({
  //       "--ag-grid-size": "3px",
  //       "--ag-list-item-height": "20px",
  //       "--ag-font-size": "10px",
  //       "--ag-row-hover-color": "rgba(188, 61, 129, 0.3)",
  //     }),
  //   },

  //   // ❌ was nested selectors under "& > .ag-theme-alpine"
  //   // ✅ flatten them like this:
  //   "& > .ag-theme-alpine .ag-cell": { height: "100% !important" },
  //   "& > .ag-theme-alpine .ag-paging-panel": { height: "24px !important" },
  //   "& > .ag-theme-alpine .ag-side-buttons": { fontSize: 10 },
  //   "& > .ag-theme-alpine .ag-header": { borderRadius: 0 },
  //   "& > .ag-theme-alpine .ag-pivot-off": {
  //     height: "47px !important",
  //     minHeight: "47px !important",
  //   },
  //   "& > .ag-theme-alpine .ag-header-cell": {
  //     minHeight: "24px !important",
  //     height: "24px !important",
  //   },
  //   "& > .ag-theme-alpine .ag-header-row": {
  //     minHeight: "20px !important",
  //     height: "20px !important",
  //   },
  //   "& > .ag-theme-alpine .ag-header-container": {
  //     minHeight: "20px !important",
  //     height: "20px !important",
  //   },
  //   "& > .ag-theme-alpine .ag-header-row-column-filter": {
  //     top: "23px !important",
  //     height: "24px !important",
  //   },
  //   "& > .ag-theme-alpine .ag-input-field-input": {
  //     height: "14px !important",
  //     minHeight: "10px !important",
  //     fontSize: 12,
  //   },
  //   "& > .ag-theme-alpine .ag-column-drop": { background: "#D2CECE" },
  //   "& > .ag-theme-alpine .ag-status-bar": {
  //     height: "24px !important",
  //     fontSize: 10,
  //   },
  // },
});
// SCDynamicContainer descendants
globalStyle(`${SCDynamicContainer} .ag-header-cell-text`, { fontSize: 12 });

globalStyle(`${SCDynamicContainer} > .ag-theme-alpine`, {
  margin: '0 !important',
  flex: 1,
  height: '100%',
  // custom props are fine here
  ['--ag-grid-size' as any]: '3px',
  ['--ag-list-item-height' as any]: '20px',
  ['--ag-font-size' as any]: '10px',
  ['--ag-row-hover-color' as any]: 'rgba(188, 61, 129, 0.3)',
});

globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-cell`, { height: '100% !important' });
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-paging-panel`, { height: '24px !important' });
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-side-buttons`, { fontSize: 10 });
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-header`, { borderRadius: 0 });
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-pivot-off`, {
  height: '47px !important',
  minHeight: '47px !important',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-header-cell`, {
  minHeight: '24px !important',
  height: '24px !important',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-header-row`, {
  minHeight: '20px !important',
  height: '20px !important',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-header-container`, {
  minHeight: '20px !important',
  height: '20px !important',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-header-row-column-filter`, {
  top: '23px !important',
  height: '24px !important',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-input-field-input`, {
  height: '14px !important',
  minHeight: '10px !important',
  fontSize: 12,
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-column-drop`, { background: '#D2CECE' });
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-status-bar`, {
  height: '24px !important',
  fontSize: 10,
});

export const Main = style({ marginTop: 12 });
export const MainContainer = style({
  display: "flex",
  gap: "75px",
  marginLeft: 15,
  padding: "0.75rem",
});

export const Box = style({
  width: 210,
  minHeight: "12vh",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 6px 12px #74747429",
  opacity: 1,
  borderRadius: 6,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 30,
});

export const PercentBorderContainer = style({
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Percentborder = style({
  border: "3px solid #F0F0F0",
  borderRadius: "50%",
  backgroundColor: "#CDCDCD",
  height: 50,
  width: 50,
  marginLeft: "auto",
  marginRight: "auto",
  position: "relative",
});

export const Percent = style({ textAlign: "center" });

export const BtnGroup = style({
  height: 80,
  width: "100%",
  display: "flex",
});

export const Btns = style({
  width: "100%",
  paddingTop: 5,
  paddingRight: 5,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const TextXAxis = style({
  fontSize: 12,
  textAlign: "center",
  transform: "rotate(-90deg)",
  width: "max-content",
  whiteSpace: "nowrap",
});

export const TextYAxis = style({
  fontSize: 12,
  textAlign: "center",
  paddingBottom: 4,
});

export const ViewOrder = style({
  fontSize: 10,
  color: "#BC3D81",
  marginBottom: 30,
  backgroundColor: "#fcf0f7",
  width: "70%",
  padding: 10,
  textAlign: "center",
  borderRadius: 8,
});

export const TextOnBox = style({
  position: "absolute",
  bottom: "100%",
  left: 0,
  backgroundColor: "#E0E0E0",
  width: 80,
  borderRadius: "8px 8px 0 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ImgDiv = style({
  display: "flex",
  gap: 10,
  alignItems: "center",
  justifyContent: "center",
  padding: 1,
  fontWeight: "bold",
});

export const ColorOnLeft = style({
  position: "absolute",
  right: "100%",
  borderRadius: "8px 0 0 8px",
  backgroundColor: dynColorVar,
  width: 20,
  height: dynHeightVar,
  selectors: {
    "&:nth-of-type(1)": { top: 0, zIndex: 0 },
    "&:nth-of-type(2)": { top: 15, zIndex: 1 },
    "&:nth-of-type(3)": { top: 25, zIndex: 2 },
  },
});

export const Separator = style({
  borderRight: `1px solid ${dynColorVar}`,
  height: "85%",
  margin: "auto",
});

export const BTRLayoutTabsWrapper = style({
  display: "flex",
  zoom: "0.75",
  justifyContent: "center",
  marginBottom: 15,
});

export const ButtonImg = style({
  justifyContent: "center",
  alignItems: "center",
  marginRight: 3,
  display: "inline-flex",
});
export const Btncount = style({
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  display: "flex",
});

export const diviLine = style({
  width: 400,
  border: "2px dashed #C0C0C0",
  color: "#FFFFFF",
});

export const TextOnColor = style({
  fontSize: 10,
  transform: "rotate(-90deg)",
  whiteSpace: "nowrap",
  color: "white",
});

export const underLine = style({
  width: 400,
  border: "1px solid #000",
  color: "#000",
});

export const ProcurementLayout = style({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  // selectors: {
  //   '& div[data-testid="vf_pagination"]': {
  //     margin: "-20px -15px !important",
  //     marginBottom: "0px !important",
  //   },
  //   "& > .ag-theme-alpine": { flex: "1 !important" },
  // },
});
// ProcurementLayout descendants
globalStyle(`${ProcurementLayout} div[data-testid="vf_pagination"]`, {
  margin: '-20px -15px !important',
  marginBottom: '0px !important',
});
globalStyle(`${ProcurementLayout} > .ag-theme-alpine`, { flex: '1 !important' });


/*** Analytical screen */
export const BPRDailyAnalyticsWrapper = style({
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const BPRDailyAnalyticsContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "95%",
  background: "#383737 0% 0% no-repeat padding-box",
  boxShadow: "0px 6px 12px #00000034",
  padding: "4px 8px",
  borderRadius: 4,
});

export const BPRDailyAnalyticsHeader = style({
  color: "white",
  marginBottom: 6,
});

export const BPRDailyAnalyticsTableContainer = style({});

export const BPRDailyAnalyticsTableHeaderContainer = style({
  display: "flex",
  flexDirection: "row",
  color: "white",
  fontSize: 8,
  width: "100%",
});

export const BPRDailyAnalyticsTableHeader = style({
  width: "100%",
  textAlign: "center",
  fontSize: 10,
  marginBottom: 5,
});

export const BPRDailyAnalyticsTableRowContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const BPRDailyAnalyticsTableRow = style({
  display: "flex",
  flexDirection: "row",
  width: "95%",
  borderRadius: 4,
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 3px 12px #58585829",
  marginBottom: 5,
  overflow: "hidden",
  zoom: "0.7",
});

export const BPRDailyAnalyticsTableCell = style({
  textAlign: "center",
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  fontWeight: 500,
  fontSize: 11,
  lineHeight: "21px",
  fontFamily: "Roboto",
  letterSpacing: 0,
  color: "#313131",
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      right: 0,
      height: "100%",
      width: 1,
    },
  },
});

export const BPRDailyAnalyticsTableNoChangeWrapper = style({
  display: "flex",
  flexDirection: "column",
});

export const BPRDailyAnalyticsTableChangeIcon = style({
  height: 10,
  width: 10,
});

export const BPRDailyAnalyticStatusBar = style({
  display: "flex",
  alignItems: "center",
});

export const BPRDailyAnalyticStatusBarSection = style({
  width: "100%",
  fontFamily: "Roboto",
  fontWeight: 500,
  fontSize: 12,
  lineHeight: "21px",
  letterSpacing: 0,
  color: "#FFFFFF",
  textAlign: "center",
});

export const BPRDailyAnalyticsTableCellHeader = style({
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 500,
  fontSize: 16,
  fontFamily: "Roboto",
  letterSpacing: 0,
  color: "#313131",
});

export const BPRDailyAnalyticsTableCellText = style({
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 400,
  fontSize: 16,
  fontFamily: "Roboto",
  letterSpacing: 0,
  color: "#313131",
});

export const ProcPlanningChildrenColor = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

/* single class; set color via inline CSS var */
export const ChildrenColorCellRenderer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 15,
  height: 15,
  borderRadius: "50%",
  marginTop: 14,
  backgroundColor: dynColorVar,
});
