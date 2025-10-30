import { style, createVar, globalStyle } from "@vanilla-extract/css";

/* ===== Runtime vars for prop/theming ===== */
export const themeColor5Var = createVar(); // for BasketingLabelText (from global theme.color5)
export const leftStripeColorVar = createVar(); // ColorOnLeft background
export const leftStripeHeightVar = createVar(); // ColorOnLeft height
export const separatorColorVar = createVar(); // Separator border color
export const circleBgVar = createVar(); // ChildrenColorCellRenderer background

/* ===== Wrapper / Layout ===== */

export const Wrapper = style({
  height: "100%",
  display: "flex",
  marginLeft: "2rem",
  flexDirection: "column",
  // selectors: {
  //   '& > .ag-theme-alpine': {
  //     flex: 1,
  //     height: '100%',
  //   },
  //   '& > .toolbar-container, & > .ag-theme-alpine': {
  //     margin: '10px',
  //   },
  //   '& > .toolbar-container': {
  //     margin: 0,
  //     marginTop: '20px',
  //   },
  //   '& > div[data-testid="vf_pagination"]': {
  //     padding: 0,
  //     margin: '-10px 10px 20px',
  //   },
  // },
});

// children/descendants of Wrapper
globalStyle(`${Wrapper} > :global(.ag-theme-alpine)`, {
  flex: 1,
  height: "100%",
});

globalStyle(
  `${Wrapper} > :global(.toolbar-container), ${Wrapper} > :global(.ag-theme-alpine)`,
  {
    margin: "10px",
  }
);

globalStyle(`${Wrapper} > :global(.toolbar-container)`, {
  margin: 0,
  marginTop: "20px",
});

globalStyle(`${Wrapper} > div[data-testid="vf_pagination"]`, {
  padding: 0,
  margin: "-10px 10px 20px",
});

export const Footer = style({
  display: "flex",
  gap: "1rem",
  marginBottom: "20px",
});

export const BasketingSection = style({
  height: "max-content",
  position: "relative",
  margin: "0 8px",
  fontSize: "12px",
});

export const BasketingContainer = style({
  width: "40%",
  minHeight: "100px",
  background: "white",
  padding: "2rem",
  float: "right",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  justifyContent: "center",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px 2px",
  borderRadius: "4px",
});

export const BasketingLabel = style({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const BasketingLabelText = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fill: themeColor5Var,
  color: themeColor5Var,
});

export const Arrow = style({
  border: "6px solid grey",
  borderRightColor: "transparent",
  borderTopColor: "transparent",
  borderBottomColor: "transparent",
  width: 0,
  height: 0,
  marginLeft: "10px",
});

export const DateRange = style({
  display: "flex",
  background: "white",
  alignItems: "center",
  boxShadow: "0px 3px 12px #AFAFAF29",
  padding: "0.5rem",
  borderRadius: "4px",
  position: "relative",
  fontSize: "10px",
});

export const DateRangeLabel = style({
  position: "absolute",
  color: "white",
  background: "black",
  bottom: "100%",
  left: 0,
  padding: "1px 4px",
  fontSize: "8px",
  borderRadius: "4px 4px 0 0",
});

export const WarningContainer = style({
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px 2px",
});

export const WarningHeader = style({
  background: "linear-gradient(271deg, #B71C1C, #F04D4D)",
  color: "white",
  padding: "1rem",
  borderRadius: "4px 4px 0 0",
  fontSize: "1rem",
  display: "flex",
});

export const WarningBody = style({
  background: "white",
  padding: "1rem",
});

export const WarningText = style({
  background: "#FFF2F9",
  border: "1px dashed #B71C1C",
  padding: "1rem",
  borderRadius: "4px",
  display: "block",
  fontSize: "12px",
});

export const Main = style({
  marginTop: "12px",
});

export const MainContainer = style({
  display: "flex",
  gap: "75px",
  marginLeft: "15px",
  padding: "0.75rem",
});

export const Box = style({
  width: "210px",
  minHeight: "12vh",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 6px 12px #74747429",
  borderRadius: "6px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "30px",
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
  height: "50px",
  width: "50px",
  marginLeft: "auto",
  marginRight: "auto",
  position: "relative",
});

export const Percent = style({
  textAlign: "center",
});

export const BtnGroup = style({
  height: "80px",
  width: "100%",
  display: "flex",
});

export const Btns = style({
  width: "100%",
  paddingTop: "5px",
  paddingRight: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const TextXAxis = style({
  fontSize: "12px",
  textAlign: "center",
  transform: "rotate(-90deg)",
  width: "max-content",
  whiteSpace: "nowrap",
});

export const TextYAxis = style({
  fontSize: "12px",
  textAlign: "center",
  paddingBottom: "4px",
});

export const ViewOrder = style({
  fontSize: "10px",
  color: "#BC3D81",
  marginBottom: "30px",
  backgroundColor: "#fcf0f7",
  width: "70%",
  padding: "10px",
  textAlign: "center",
  borderRadius: "8px",
});

export const TextOnBox = style({
  position: "absolute",
  bottom: "100%",
  left: 0,
  backgroundColor: "#E0E0E0",
  width: "80px",
  borderRadius: "8px 8px 0 0",
  color: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ImgDiv = style({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  justifyContent: "center",
  padding: "1px",
  fontWeight: "bold",
});

export const ColorOnLeft = style({
  position: "absolute",
  right: "100%",
  borderRadius: "8px 0 0 8px",
  backgroundColor: leftStripeColorVar,
  width: "20px",
  height: leftStripeHeightVar,
  selectors: {
    "&:nth-of-type(1)": { top: "0px", zIndex: 0 },
    "&:nth-of-type(2)": { top: "15px", zIndex: 1 },
    "&:nth-of-type(3)": { top: "25px", zIndex: 2 },
  },
});

export const Separator = style({
  borderRight: `1px solid ${separatorColorVar}`,
  height: "85%",
  margin: "auto",
});

export const BTRLayoutTabsWrapper = style({
  display: "flex",
  zoom: "0.75" as unknown as string, // keep numeric zoom
  justifyContent: "center",
  marginBottom: "15px",
});

export const ButtonImg = style({
  justifyContent: "center",
  alignItems: "center",
  marginRight: "3px",
  display: "inline-flex",
});

export const Btncount = style({
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  display: "flex",
});

export const diviLine = style({
  border: "2px dashed #C0C0C0",
  width: "400px",
  color: "#FFFFFF",
  height: 0,
});

export const TextOnColor = style({
  fontSize: "10px",
  transform: "rotate(-90deg)",
  whiteSpace: "nowrap",
  color: "white",
});

export const underLine = style({
  border: "1px solid #000",
  width: "400px",
  color: "#000",
  height: 0,
});

export const ProcurementLayout = style({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  // selectors: {
  //   '& div[data-testid="vf_pagination"]': {
  //     margin: '-20px -15px !important',
  //     marginBottom: '0px !important',
  //   },
  //   '& > .ag-theme-alpine': {
  //     flex: '1 !important',
  //   },
  // },
});
// descendants of ProcurementLayout
globalStyle(`${ProcurementLayout} div[data-testid="vf_pagination"]`, {
  margin: "-20px -15px !important",
  marginBottom: "0px !important",
});

globalStyle(`${ProcurementLayout} > :global(.ag-theme-alpine)`, {
  flex: "1 !important",
});

/* ===== Analytical screen ===== */

export const BPRDailyAnalyticsWrapper = style({
  padding: "0px",
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
  borderRadius: "4px",
});

export const BPRDailyAnalyticsHeader = style({
  color: "white",
  marginBottom: "6px",
});

export const BPRDailyAnalyticsTableContainer = style({});

export const BPRDailyAnalyticsTableHeaderContainer = style({
  display: "flex",
  flexDirection: "row",
  color: "white",
  fontSize: "8px",
  width: "100%",
});

export const BPRDailyAnalyticsTableHeader = style({
  width: "100%",
  textAlign: "center",
  marginBottom: "5px",
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
  borderRadius: "4px",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 3px 12px #58585829",
  marginBottom: "5px",
  overflow: "hidden",
  zoom: 0.7 as unknown as string,
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
  fontSize: "11px",
  lineHeight: "21px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  color: "#313131",
  selectors: {
    "&:before": {
      content: "",
      position: "absolute",
      right: 0,
      height: "100%",
      width: "1px",
    },
  },
});

export const BPRDailyAnalyticsTableNoChangeWrapper = style({
  display: "flex",
  flexDirection: "column",
});

export const BPRDailyAnalyticsTableChangeIcon = style({
  height: "10px",
  width: "10px",
});

export const BPRDailyAnalyticStatusBar = style({
  display: "flex",
  alignItems: "center",
});

export const BPRDailyAnalyticStatusBarSection = style({
  width: "100%",
  fontFamily: "Roboto",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "21px",
  letterSpacing: "0px",
  color: "#FFFFFF",
  textAlign: "center",
});

export const BPRDailyAnalyticsTableCellHeader = style({
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 500,
  fontSize: "16px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  color: "#313131",
});

export const BPRDailyAnalyticsTableCellText = style({
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 400,
  fontSize: "16px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  color: "#313131",
});

export const ProcPlanningChildrenColor = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ChildrenColorCellRenderer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "15px",
  height: "15px",
  borderRadius: "50%",
  marginTop: "14px",
  backgroundColor: circleBgVar,
});

/* ===== Grid overrides wrapper ===== */

export const SCDynamicContainer = style({
  // selectors: {
  //   '& .ag-header-cell-text': {
  //     fontSize: '10px !important',
  //     fontWeight: 'bold',
  //   },
  //   // styles for cells inside the direct child .ag-theme-alpine
  //   '& > .ag-theme-alpine .ag-cell': {
  //     border: 'none',
  //     height: '100% !important',
  //     borderTop: '0.1px solid #cecece !important',
  //   },
  // },
});
// descendants of SCDynamicContainer
globalStyle(`${SCDynamicContainer} :global(.ag-header-cell-text)`, {
  fontSize: "10px !important",
  fontWeight: "bold",
});

globalStyle(
  `${SCDynamicContainer} > :global(.ag-theme-alpine) :global(.ag-cell)`,
  {
    border: "none",
    height: "100% !important",
    borderTop: "0.1px solid #cecece !important",
  }
);
