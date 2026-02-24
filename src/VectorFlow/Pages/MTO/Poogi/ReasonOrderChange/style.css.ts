import { style, createVar, globalStyle } from '@vanilla-extract/css';

/* Accent var for SaveBtn (theme-driven) */
export const saveBtnAccentVar = createVar();

/* -------- Wrapper (AG Grid area) -------- */
export const Wrapper = style({
  width: '100%',
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 0 20px 20px',
  // selectors: {
  //   '& .ag-header-cell-text': { fontSize: '13px' },
  //   '& > .ag-theme-alpine': {
  //     flex: 1,
  //     margin: '0 !important',
  //   },
  //   '& div[data-testid="vf_pagination"]': {
  //     margin: '0 !important',
  //     padding: 0,
  //   },
  // },
});
/* Descendants scoped to Wrapper */
globalStyle(`${Wrapper} .ag-header-cell-text`, { fontSize: '13px' });
globalStyle(`${Wrapper} > .ag-theme-alpine`, { flex: 1, margin: 0 });
globalStyle(`${Wrapper} div[data-testid="vf_pagination"]`, { margin: 0, padding: 0 });



/* -------- Save button area (optional) -------- */
export const SaveBtnWrapper = style({
  height: '50px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '25px',
  marginTop: '30px',
});

export const SaveBtn = style({
  display: 'flex',
  height: '40px',
  width: '169px',
  alignItems: 'center',
  justifyContent: 'center',
  color: saveBtnAccentVar,
  backgroundColor: '#fff',
  border: `1px solid ${saveBtnAccentVar}`,
  borderRadius: '4px',
  fontSize: '14px',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 400,
  cursor: 'pointer',
});

/* -------- BPR Daily Analytics -------- */
export const BPRDailyAnalyticsWrapper = style({
  padding: '0px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const BPRDailyAnalyticsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '95%',
  background: '#383737 0% 0% no-repeat padding-box',
  boxShadow: '0px 6px 12px #00000034',
  padding: '4px 8px',
  borderRadius: '4px',
});

export const BPRDailyAnalyticsHeader = style({
  color: 'white',
  marginBottom: '6px',
});

export const BPRDailyAnalyticsTableContainer = style({});

export const BPRDailyAnalyticsTableHeaderContainer = style({
  display: 'flex',
  flexDirection: 'row',
  color: 'white',
  width: '100%',
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
  fontSize: '11px',
  lineHeight: '21px',
  fontFamily: 'Roboto, sans-serif',
  letterSpacing: '0px',
  color: '#313131',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      right: 0,
      height: '100%',
      width: '1px',
    },
  },
});

export const BPRDailyAnalyticsTableCellHeader = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Roboto, sans-serif',
  letterSpacing: '0px',
  color: '#313131',
});
