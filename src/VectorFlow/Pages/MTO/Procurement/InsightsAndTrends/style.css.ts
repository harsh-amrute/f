import { style, createVar } from '@vanilla-extract/css';

export const chartHeightVar = createVar();

export const SCChartContainer = style({
  padding: '5px',
  borderRadius: '12px',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  marginRight: '5px',
  marginBottom: '20px',
  marginLeft: '5px',
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
  justifyContent: 'center', // last one wins in styled-components too
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
