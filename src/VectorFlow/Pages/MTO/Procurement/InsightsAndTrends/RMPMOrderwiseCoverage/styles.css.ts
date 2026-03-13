import { style, createVar, globalStyle  } from '@vanilla-extract/css';

/* dynamic height var (string, e.g. "547px" or "60vh") */
export const chartHeightVar = createVar();

export const SCChartContainer = style({
  padding: '5px',
  borderRadius: '12px',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  margin: '20px',
  display: 'flex',
  flexDirection: 'column',
  vars: { [chartHeightVar]: 'auto' }, // default
  height: chartHeightVar,
});

export const SCChartLayout = style({
  overflowY: 'scroll',
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
});

export const SCChartHeaderContainer = style({
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '54px',
});

export const SCChartSliderContainer = style({
  display: 'flex',
  // note: you had space-between then center; last wins (center)
  justifyContent: 'center',
  gap: '13px',
  alignItems: 'center',
  height: '55px',
});

export const SCChartMainContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const HorizonHeader = style({
  textAlign: 'center',
  fontWeight: 500,
  fontSize: '10px',
});

export const SCChartHeader = style({
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '21px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#000000',
});

export const SCHorizontalDivider = style({
  width: '100%',
  border: 'none',
  borderTop: '1px solid #B2B2B2',
});

export const TableWrapper = style({
  height: '100%',
  zoom: 1 as unknown as string, // keep numeric zoom; TS expects string
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '2rem',
  marginTop: '1rem',
  paddingBottom: '20px',
  // selectors: {
  //   '& > .ag-theme-alpine': {
  //     flex: 1,
  //     marginBottom: '0 !important',
  //   },
  //   '& div[data-testid="vf_pagination"]': {
  //     marginTop: '0 !important',
  //   },
  // },
});
/* Descendant/global rules must be defined with globalStyle */
globalStyle(`${TableWrapper} > .ag-theme-alpine`, {
  flex: 1,
  marginBottom: '0 !important',
});

globalStyle(`${TableWrapper} div[data-testid="vf_pagination"]`, {
  marginTop: '0 !important',
});
