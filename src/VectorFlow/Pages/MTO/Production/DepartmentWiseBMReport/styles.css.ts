import { style, createVar, globalStyle } from '@vanilla-extract/css';
import * as gridSystem from '../../../../../styles/gridSystem.css';

/* ---------- helpers ---------- */
const cssVars = (vars: Record<`--${string}`, string>) => vars;

/* ---------- runtime vars ---------- */
export const tabTextColorVar = createVar();
export const tabZIndexVar = createVar();
export const tabMarginLeftVar = createVar();
export const tabPaddingLeftVar = createVar();
export const tabBgVar = createVar();

export const analyticsBgVar = createVar();
export const analyticsTextColorVar = createVar();
export const analyticsHeaderBorderColorVar = createVar();

export const iconBgVar = createVar();
export const iconBgHoverVar = createVar();

/* ---------- BMDepWrapper ---------- */
export const BMDepWrapper = style({
  // marginLeft: '3rem',
  '@media': {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        marginLeft: -40,
        marginTop: -40,
        padding: 20,
      },
  },
});

/* ---------- BMDepHeaderWraper / SubHeader ---------- */
export const BMDepHeaderWraper = style({
  zoom: '1',
});

export const BMDepSubHeaderWraper = style({
  justifyContent: 'space-between',
});

/* ---------- NoData ---------- */
export const NoDataAvailableContainer = style({
  border: '2px dashed #ccc',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  marginTop: 20,
  overflow: 'hidden',
});

export const NoDataToShowDiv = style({
  textAlign: 'center',
  color: '#666',
});

export const NoDataText = style({
  color: '#000000',
  fontFamily: 'Roboto',
  fontSize: 16,
  fontWeight: 500,
});

export const SelectText = style({
  color: 'grey',
  fontFamily: 'Roboto',
  fontSize: 14,
});

/* ---------- Table wrappers ---------- */
export const BPRViewTableWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  marginTop: 20,
});

export const BPRViewTablePrefixWrapper = style({
  width: '100%',
  display: 'flex',
  zoom: '0.8',
});

/* ---------- Header Tab (dynamic) ---------- */
export const BPRViewTableHeaderTab = style({
  color: tabTextColorVar,
  opacity: 1,
  minHeight: 60,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.6rem',
  position: 'relative',
  zIndex: tabZIndexVar as unknown as number,
  marginLeft: tabMarginLeftVar,
  paddingLeft: tabPaddingLeftVar,
  padding: '0px 20px',
  cursor: 'pointer',

  selectors: {
    '&::before': {
      border: '0.5px solid #cccccc',
      content: '',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      borderBottom: 'none',
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      background: tabBgVar,
      boxShadow: '0px 5px 25px #9d9d9d29',
      transform: 'scale(1.2, 1.3) perspective(0.5em) rotateX(2.5deg)',
      transformOrigin: 'bottom left',
    },
  },
});

/* ---------- Expansion ---------- */
export const ExpansionWrapper = style({
  border: '1px solid #E3ACC9',
  borderRadius: 4,
  width: '100%',
});

export const ExpansionHeader = style({
  margin: '0px 10px',
  display: 'flex',
  alignItems: 'center',
});

export const ExpansionHeaderGroup = style({});

export const IconWrapper = style({
  height: 20,
  width: 20,
});

export const ExpansionHeaderNormalText = style({
  fontFamily: 'Roboto',
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '40px',
});

export const ExpansionHeaderColoredText = style({
  fontFamily: 'Roboto',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '40px',
  color: '#BC3D81',
});

export const ExpansionContent = style({});

/* ---------- Icons ---------- */
export const HigHAgeingIconWrapper = style({
  height: 20,
  width: 20,
  marginRight: 10,
});

export const FlatIcon1 = style({
  display: 'flex',
  alignItems: 'center',
  height: 20,
  width: 20,
  marginRight: 10,
  background: iconBgVar,
  selectors: {
    '&:hover': {
      background: iconBgHoverVar,
      transform: 'scale(1.2)',
    },
  },
});

export const FlatIcon = style({
  height: 20,
  width: 20,
  marginRight: 10,
});

/* ---------- ETA Cell ---------- */
export const ETACellRendererWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});

/* ---------- VF Wrappers + AG Grid tweaks ---------- */
export const VFWrapper = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const VFChilWrapper = style({
  width: '100%',
  height: '100%',
});
/* ---------- Global descendants and AG Grid tweaks ---------- */
globalStyle(`${VFWrapper} .ag-theme-alpine`, {
  flex: 1,
  marginTop: '0px !important',
});

globalStyle(`${VFWrapper} .ag-theme-alpine .ag-header-row:nth-child(2)`, {
  backgroundColor: 'black',
  color: 'white',
});

globalStyle(`${VFWrapper} .ag-theme-alpine .ag-header-row:nth-child(1):hover`, {
  backgroundColor: 'black',
  color: 'white',
});

globalStyle(
  `${VFWrapper} .ag-theme-alpine .ag-header-row:nth-child(3), ` +
  `${VFWrapper} .ag-theme-alpine .ag-header-row-column-filter`,
  {
    backgroundColor: '#f7f7f7 !important',
    color: 'black !important',
  }
);

globalStyle(`${VFWrapper} > div[data-testid="vf_pagination"]`, {
  padding: '0 !important',
});

globalStyle(`${VFWrapper} .ag-header-cell-resize`, {
  position: 'absolute',
  zIndex: '0 !important',
  height: '100%',
  width: 8,
  top: 0,
  cursor: 'ew-resize',
});

/* Theme vars on child wrapper */
globalStyle(`${VFChilWrapper} .ag-theme-alpine`, {
  vars: cssVars({
    '--ag-header-background-color': 'rgb(255, 255, 255)',
    '--ag-header-foreground-color': 'rgb(0, 0, 0)',
  }),
});

globalStyle(`${VFChilWrapper} .ag-theme-noir-fusion`, {
  vars: cssVars({
    '--ag-header-background-color': 'rgb(255, 255, 255)',
    '--ag-header-foreground-color': 'rgb(0, 0, 0)',
  }),
});

/* ---------- Analytics (theme dynamic) ---------- */
export const BPRDailyAnalyticsWrapper = style({
  padding: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const BPRDailyAnalyticsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  background: analyticsBgVar,
  boxShadow: '0px 6px 12px #00000034',
  padding: '4px 8px',
  borderRadius: 4,
  color:analyticsTextColorVar,

});

export const BPRDailyAnalyticsHeader = style({
  color: 'inherit',
  marginBottom: 6,
  borderBottom: `1px solid ${analyticsHeaderBorderColorVar}`,

});

export const BPRDailyAnalyticsTableContainer = style({});

export const BPRDailyAnalyticsTableHeaderContainer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  color: 'inherit',
});

export const BPRDailyAnalyticsTableHeader = style({
  width: '100%',
  textAlign: 'left',
  marginBottom: 5,
});

export const BPRDailyAnalyticsTableRowContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const BPRDailyAnalyticsTableRow = style({
  display: 'flex',
  flexDirection: 'row',
  width: '95%',
  borderRadius: 4,
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 12px #58585829',
  marginBottom: 5,
  overflow: 'hidden',
  zoom: '0.7',
});

export const BPRDailyAnalyticsTableCell = style({
  textAlign: 'center',
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  fontWeight: 500,
  fontSize: 11,
  lineHeight: '21px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#313131',

  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      right: 0,
      height: '100%',
      width: 1,
    },
  },
});

export const BPRDailyAnalyticsTableNoChangeWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

export const BPRDailyAnalyticsTableChangeIcon = style({
  height: 10,
  width: 10,
});

export const BPRDailyAnalyticStatusBar = style({
  display: 'flex',
  alignItems: 'center',
});

export const BPRDailyAnalyticStatusBarSection = style({
  width: '100%',
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '21px',
  letterSpacing: 0,
  color: 'inherit',
  textAlign: 'center',
});

export const BPRDailyAnalyticsTableCellHeader = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 500,
  fontSize: 16,
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#313131',
});

export const BPRDailyAnalyticsTableCellText = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 400,
  fontSize: 16,
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#313131',
});

export const BPRDailyAnalyticsTableCellIcon = style({
  height: 20,
  width: 20,
});

export const RemarkModalTable = style({
  display: 'flex',
  flexDirection: 'column',
});

export const RemarkModalTableHeaderContainer = style({
  display: 'grid',
  gridTemplateColumns: '10% 90%',
  borderBottom: 'solid 1px #707070',
  padding: '0 20px',
});

export const RemarkModalTableRowContainer = style({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '300px',
  margin: '10px 0',
});

export const RemarkModalTableRow = style({
  display: 'grid',
  gridTemplateColumns: '10% 90%',
  width: '100%',
  marginBottom: '10px',
  padding: '5px 20px 0',
});
