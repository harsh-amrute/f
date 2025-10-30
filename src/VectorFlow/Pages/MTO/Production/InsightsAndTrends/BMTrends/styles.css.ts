import { style } from '@vanilla-extract/css';

export const BMTrendWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  height: '100%',
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
  justifyContent: 'center', // last rule in styled version wins
  gap: '13px',
  alignItems: 'center',
  height: '55px',
});

export const SCChartMainContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const CapsuleWrapper = style({
  width: '100%',
  marginLeft: 'auto',
  // maxWidth: '120px',
});

export const BMTrendsChartWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '10px',
  marginBottom: '20px',
  height: '100%',
  // leave maxHeight/padding to inline style overrides if needed
});
