// styles.css.ts
import { style, createVar, globalStyle } from "@vanilla-extract/css";

/* ========= runtime vars (set via assignInlineVars) ========= */
export const filterAlertBgVar = createVar(); // BPRViewTableHeaderFilterAlert bg
export const tabBgVar = createVar(); // BPRViewTableHeaderTab ::before background
export const tabTextColorVar = createVar(); // BPRViewTableHeaderTab text color
export const tabZIndexVar = createVar(); // BPRViewTableHeaderTab z-index
export const tabMarLeftVar = createVar(); // BPRViewTableHeaderTab margin-left
export const tabPadLeftVar = createVar(); // BPRViewTableHeaderTab padding-left
export const themeBg = createVar();
/* ========= layout / basic ========= */
export const BPRLayout = style({
  marginTop: "0px",
});

export const SaveBtnWrapper = style({
  height: "40px",
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

export const SaveBtn = style({
  display: "flex",
  height: "40px",
  width: "169px",
  alignItems: "center",
  justifyContent: "center",
  color: "#B93B7E",
  backgroundColor: "#fff",
  border: "1px solid #B93B7E",
  borderRadius: "4px",
  fontSize: "14px",
  fontFamily: "Roboto, sans-serif",
  fontWeight: 400,
  cursor: "pointer",
});

export const LastRunDate = style({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "1px",
  paddingBottom: "1px",
});

export const LastRunDateHeader = style({
  fontSize: "14px",
  fontWeight: 500,
});

export const BPRTaskBar = style({
  position: "fixed",
  width: "97%",
  right: 0,
  top: "13vh",
  height: "70px",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "20px",
  padding: "16px",
  zIndex: 2,
  transition: "0.3s ease 0s",
});

export const BPRViewTableWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
  height: "100%",
});

export const BPRViewTablePrefixWrapper = style({
  display: "flex",
  zoom: 0.8 as any,
});

export const BPRViewTablePrefix = style({
  minWidth: "270px",
});

export const BPRViewTablePrefixText = style({
  fontSize: "16px",
  fontWeight: 400,
  fontFamily: "Roboto",
  color: "#FFFFFF",
});

export const BPRViewTablePrefixIcon = style({
  marginLeft: "10px",
});

/* ========= table grid & header ========= */
export const BPRViewTableGrid = style({
  display: "flex",
  flexDirection: "column",
  border: "1px solid #CCCCCC",
  width: "100%",
  minHeight: "200px",
  maxHeight: "100%",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 6px 12px #9B9B9B29",
  borderRadius: "8px",
  overflowY: "scroll",

  selectors: {
    "&::-webkit-scrollbar": {
      width: "4px",
      height: "4px",
    },
    "&::-webkit-scrollbar-track": {
      opacity: "1",
    },
    "&::-webkit-scrollbar-thumb": {
      width: "7px",
      background: "#313131 0% 0% no-repeat padding-box",
      boxShadow: "0px 6px 9px #41414129",
      opacity: "1",
    },
  },
});

export const BPRViewTableHeaderContainer = style({
  display: "flex",
  flexDirection: "row",
  position: "sticky",
  top: 0,
  backgroundColor: "white",
  zIndex: 1,
});

export const BPRViewTableHeader = style({
  position: "relative",
  width: "100%",
  overflow: "hidden",
  minWidth: "120px",
  height: "45px",
  padding: "10px",
  paddingTop: "15px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "13px",
  fontFamily: "Roboto",
  letterSpacing: 0,
  color: "#000000",
  boxShadow: "0px 6px 12px #9B9B9B29",
  textAlign: "center",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",

  selectors: {
    "&::after": {
      content: "",
      position: "absolute",
      right: "1px",
      top: "4px",
      bottom: "4px",
      backgroundColor: "#898585",
      width: "0.5px",
    },
    "&:last-child::after": {
      display: "none",
    },
  },
});

export const BPRViewTableHeaderFilterIcon = style({
  position: "absolute",
  right: "10px",
  top: "13px",
  height: "17px",
  width: "17px",
  cursor: "pointer",
});

export const BPRViewTableHeaderFilterAlert = style({
  position: "absolute",
  right: "10px",
  top: "14px",
  backgroundColor: filterAlertBgVar,
  height: "6px",
  width: "6px",
  borderRadius: "50%",
});

/* ========= column filter popover ========= */
export const BPRViewTableColumnFilterWrapper = style({
  position: "fixed",
  zIndex: 100,
});

export const BPRViewTableColumnFilterContainer = style({
  display: "flex",
  flexDirection: "column",
  padding: "5px",
  width: "100px",
  boxShadow:
    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
  backgroundColor: "white",
});

export const BPRViewTableColumnFilterInput = style({
  height: "15px",
  fontSize: "10px",
  selectors: { "&:focus": { outline: "none" } },
});

export const BPRViewTableColumnFilterSelect = style({
  height: "15px",
  fontSize: "10px",
  marginBottom: "5px",
  accentColor: "red",
  selectors: { "&:focus": { outline: "none" } },
});

export const BPRViewTableColumnFilterSelectOption = style({
  // stylistic placeholder; most option styling is UA-controlled
});

/* ========= rows & cells ========= */
export const BPRViewTableRowContainer = style({
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const BPRViewTableRow = style({
  width: "100%",
  height: "50px",
  display: "flex",
  selectors: {
    "&:nth-child(even)": {
      backgroundColor: "#8D8D8D29",
    },
  },
});

export const BPRViewTableRowCell = style({
  width: "100%",
  overflow: "hidden",
  minWidth: "120px",
  height: "50px",
  padding: "6px",
  textAlign: "center",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "24px",
  fontFamily: "Roboto",
  letterSpacing: 0,
  color: "#000000",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const ReadMoreToolTip = style({
  position: "absolute",
  top: 0,
});

/* ========= cell renderers ========= */
export const BPRColorCellRendererWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "90%",
  boxShadow: "0px 6px 12px #8D8D8D29",
  borderRadius: "4px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const BPRTagsCellRendererWrapper = style({
  display: "block",
  padding: "4px 5px",
  maxWidth: "90px",
  height: "25px",
  background: themeBg,
  color: "#FFFFFF",
  boxShadow: "0px 6px 12px #8D8D8D29",
  borderRadius: "2px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "19px",
  fontFamily: "Roboto",
  letterSpacing: 0,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
});

export const BPRRemarksCellRendererWrapper = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const BPRSubmitRemarkInput = style({
  height: "20px",
  width: "100%",
  backgroundColor: "white",
  border: "solid 1px black",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
});

export const BPRRemarkToolTipTextArea = style({
  minWidth: "240px",
  maxWidth: "240px",
  minHeight: "100px",
  maxHeight: "100px",
});

export const BPRRemarkToolTipButtonGroup = style({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  marginTop: "5px",
});

export const BPRRemarkToolTipButton = style({
  height: "25px",
  borderRadius: "4px",
  padding: "2px 7px",
  backgroundColor: "white",
  fontSize: "11px",
  boxShadow:
    "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
});

export const BPRRemarksToolTipWrapper = style({
  position: "fixed",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 6px 12px #77777729",
  border: "0.4000000059604645px solid #707070",
  borderRadius: "2px",
  padding: "10px",
  zIndex: 100000,
  transition: "0.2s ease-in-out",
});

export const BPRRemarksToolTipContent = style({
  height: "100%",
  width: "100%",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 6px 12px #77777729",
  border: "0.4000000059604645px solid #707070",
  borderRadius: "2px",
  padding: "10px",
});

export const BPRRemarksToolTipContentHeaderContainer = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "5px",
});

export const BPRRemarkHistoryCloseIcon = style({
  height: "10px",
  width: "10px",
  cursor: "pointer",
});

export const BPRRemarksToolTipContentHeader = style({
  fontWeight: 500,
  fontSize: "11px",
  lineHeight: "19px",
  fontFamily: "Roboto",
  letterSpacing: 0,
  color: "#464646",
});

export const BPRRemarksToolTipContentColumnContainer = style({
  borderTop: "solid gray 1px",
  borderBottom: "solid gray 1px",
  display: "flex",
});

export const BPRRemarksToolTipContentColumn = style({
  marginRight: "10px",
  textAlign: "left",
  fontWeight: 300,
  fontSize: "10px",
  lineHeight: "19px",
  fontFamily: "Roboto",
  letterSpacing: 0,
  color: "#464646",
});

export const BPRRemarksToolTipContentRowContainer = style({
  display: "flex",
  flexDirection: "column",
  height: "270px",
});

export const BPRRemarksToolTipContentRow = style({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  borderBottom: "dotted gray 3px",
  selectors: {
    "&:last-child": { borderBottom: "none" },
  },
});

export const BPRRemarksToolTipContentRowCell = style({
  width: "100%",
  whiteSpace: "normal",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  textAlign: "left",
  fontWeight: 400,
  fontSize: "10px",
  fontFamily: "Roboto",
  color: "#464646",
  display: "flex",
  flexDirection: "column",
});

export const BPRColorCellRendererIcon = style({
  height: "15px",
  width: "15px",
  cursor: "pointer",
});

export const BPRRemarksToolTipContentRowNameCellSection = style({
  marginBottom: "5px",
  color: "gray",
});

export const BPRRemarksToolTipContentRowDataCellSection = style({
  marginBottom: "5px",
});

/* ========= generic tooltip ========= */
export const BPRViewTableToolTip = style({
  position: "fixed",
  color: "#FFFFFF",
  background: "#4E4E4E 0% 0% no-repeat padding-box",
  boxShadow: "0px 6px 12px #38383829",
  borderRadius: "4px",
  fontWeight: 500,
  fontSize: "10px",
  fontFamily: "Roboto",
  letterSpacing: 0,
  maxWidth: "200px",
  padding: "5px",
  zIndex: 10000,

  selectors: {
    "&::after": {
      content: "",
      position: "absolute",
      bottom: "0%",
      left: "50%",
      transform: "translate(-50%, 100%)",
      borderWidth: "6px",
      borderStyle: "solid",
      borderColor: "#4E4E4E transparent transparent transparent",
    },
  },
});

/* ========= misc icons & headers ========= */
export const BPRGraphCellRendererWrapper = style({
  height: "15px",
  width: "15px",
  cursor: "pointer",
});

export const TableHeader = style({
  textAlign: "left",
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "26px",
  fontFamily: "Roboto",
  letterSpacing: 0,
  color: "#000000",
  marginLeft: "40px",
  padding: "10px",
});

/* ========= request cell ========= */
export const BPRViewTableRequestCellRendererWrapper = style({
  width: "100%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "30px",
  minWidth: "120px",
});

export const BPRViewTableRequestCellRendererImg = style({
  height: "20px",
  width: "20px",
});

export const BPRViewTableRequestCellRendererText = style({
  height: "20px",
  width: "20px",
  fontSize: "12px",
  fontWeight: 500,
  fontFamily: "Roboto",
  marginLeft: "5px",
});

/* ========= request modal ========= */
export const RequestExpeditingModalContent = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const RequestExpeditingModalInput = style({
  maxHeight: "150px",
  width: "600px",
  minHeight: "150px",
  maxWidth: "600px",
  minWidth: "600px",
  fontWeight: 300,
  fontSize: "18px",
  fontFamily: "Roboto",
  letterSpacing: 0,
  color: "#7E7E7E",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  border: "none",
  outline: "none",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
  borderRadius: "6px",
  margin: "10px",
});

export const RequestExpeditingModalButtonGroup = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "10px",
  marginTop: "10px",
  padding: "10px",
  borderTop: "2px dashed #A0A0A0",
});

/* ========= no data state ========= */
export const BPRViewTableNoDataContainer = style({
  position: "absolute",
  left: 0,
  right: 0,
  top: "45px",
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const BPRViewTableNoDataHeader = style({
  fontWeight: 500,
  fontSize: "16px",
  fontFamily: "Roboto",
});

export const BPRViewTableNoDataText = style({
  fontWeight: 300,
  fontSize: "16px",
  fontFamily: "Roboto",
});

/* ========= ageing cell ========= */
export const AgeingCell = style({
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export const AgeingText = style({
  fontWeight: 500,
  fontSize: "14px",
  fontFamily: "Roboto",
});

export const AgeingIcon = style({
  marginLeft: "10px",
  height: "15px",
  width: "15px",
  marginTop: "4px",
});

/* ========= ageing tooltip ========= */
export const AgeingToolTipWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "200px",
  padding: "0px 5px",
});

export const AgeingToolTipSection = style({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
});

export const AgeingToolTipText = style({
  fontWeight: 500,
  fontSize: "12px",
  fontFamily: "Roboto",
  color: "#FFFFFF",
});

/* ========= whereabouts cell ========= */
export const WhereAboutsCell = style({
  display: "flex",
  flexDirection: "column",
  padding: "0px 10px",
});

export const WhereAboutsCellSection = style({
  display: "flex",
});

export const WhereAboutsCellSectionHeader = style({
  fontWeight: 300,
  fontSize: "12px",
  fontFamily: "Roboto",
  lineHeight: "15px",
});

export const WhereAboutsCellSectionValue = style({
  fontWeight: 500,
  fontSize: "12px",
  fontFamily: "Roboto",
  margin: "0px 5px",
  lineHeight: "15px",
});

export const WhereAboutsMoreInfo = style({
  fontWeight: 400,
  fontSize: "14px",
  fontFamily: "Roboto",
  letterSpacing: 0,
  marginLeft: "5px",
  textDecoration: "underline",
  cursor: "default",
  lineHeight: "15px",
});

/* ========= header tabs (themed, overlapped) ========= */
export const BPRViewTableHeaderTab = style({

  vars: {
    [tabTextColorVar]: 'inherit',
    [tabBgVar]: 'transparent',
    [tabZIndexVar]: '1',
    [tabMarLeftVar]: '0',
    [tabPadLeftVar]: '0',
  },

  color: tabTextColorVar,
  opacity: 1,
  minHeight: '60px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.6rem',
  position: 'relative',
  zIndex: tabZIndexVar,          // <-- use the var directly
  marginLeft: tabMarLeftVar,     // <-- var (string)
  paddingLeft: tabPadLeftVar,    // <-- var (string)
  cursor: 'pointer',

  selectors: {
    '&::before': {
      border: '0.5px solid #cccccc',
      content: '""',             // <-- string containing quotes
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      borderBottom: 'none',
      borderTopLeftRadius: '6px',
      borderTopRightRadius: '6px',
      background: tabBgVar,
      boxShadow: '0px 5px 25px #9d9d9d29',
      transform: 'scale(1.2, 1.3) perspective(0.5em) rotateX(2.5deg)',
      transformOrigin: 'bottom left',
    },
  },
});

/* ========= availability cell renderer ========= */
export const BPRViewTableAvailabilityCellRenderer = style({
  backgroundColor: "#F8F8F8",
  border: "solid 1px #AFAFAF",
  height: "40px",
  width: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "50px",
  borderRadius: "4px",
});

/* ========= wrapper for ag-grid tweaks ========= */
export const Wrapper = style({
  width: "100%",
  height: "90%",
});

// Descendants of Wrapper
globalStyle(`${Wrapper} .ag-header-cell-text`, {
  fontSize: "13px",
});

globalStyle(`${Wrapper} > .ag-theme-alpine`, {
  margin: 0, // avoid !important; increase specificity if needed
});

globalStyle(`${Wrapper} div[data-testid="vf_pagination"]`, {
  margin: 0,
  padding: 0,
});
