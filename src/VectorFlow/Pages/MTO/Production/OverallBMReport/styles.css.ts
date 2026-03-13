import { style, createVar } from '@vanilla-extract/css';

/* ===== runtime vars for theme-dependent colors ===== */
const vAnalyticsBg = createVar();
const vAnalyticsText = createVar();
const vHeaderBorder = createVar();
export const vAccent = createVar();

/** Set input checkbox accent color at runtime */
// export const setInputAccent = (accent: string) =>
//   assignInlineVars({ [vAccent]: accent });

/* ===== wrappers ===== */
export const BPRDailyAnalyticsWrapper = style({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const BPRDailyAnalyticsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  background: vAnalyticsBg,
  color: vAnalyticsText,
  boxShadow: '0px 6px 12px #00000034',
  padding: '4px 8px',
  borderRadius: '4px',
});

export const BPRDailyAnalyticsHeader = style({
  color: 'inherit',
  marginBottom: '6px',
  borderBottom: `1px solid ${vHeaderBorder}`,
});

export const BPRDailyAnalyticsTableContainer = style({});

export const BPRDailyAnalyticsTableHeaderContainer = style({
  display: 'flex',
  flexDirection: 'row',
  color: 'inherit',
});

export const BPRDailyAnalyticsTableHeader = style({
  width: '100%',
  textAlign: 'left',
  marginBottom: '5px',
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
  borderRadius: '4px',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 12px #58585829',
  marginBottom: '5px',
  overflow: 'hidden',
  zoom: 0.7 as unknown as string | number,
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
  fontSize: '11px',
  lineHeight: '21px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#313131',

  selectors: {
    '&:before': {
      content: '',
      position: 'absolute',
      right: 0,
      height: '100%',
      width: '1px',
      // (original had no color; keep transparent divider unless you set one elsewhere)
      background: 'transparent',
    },
  },
});

export const BPRDailyAnalyticsTableNoChangeWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

export const BPRDailyAnalyticsTableChangeIcon = style({
  height: '10px',
  width: '10px',
});

export const BPRDailyAnalyticStatusBar = style({
  display: 'flex',
  alignItems: 'center',
});

export const BPRDailyAnalyticStatusBarSection = style({
  width: '100%',
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '21px',
  letterSpacing: '0px',
  color: 'inherit',
  textAlign: 'center',
});

export const BPRDailyAnalyticsTableCellHeader = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#313131',
});

export const BPRDailyAnalyticsTableCellText = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#313131',
});

export const BPRDailyAnalyticsTableCellIcon = style({
  height: '20px',
  width: '20px',
});

/* ===== checkbox ===== */
export const InputCheckBox = style({
  display: 'inline',
  width: '2em',
  height: '2rem',
  accentColor: vAccent,
});
