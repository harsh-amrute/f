// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';
import * as gridSystem from '../../../../../styles/gridSystem.css';

/* Runtime var for SCChartContainer height */
export const chartHeightVar = createVar();

/* Container */
export const SCDynamicContainer = style({
  display: 'block',
  margin: '0 20px',
  height: '90%',
  marginTop: '5px',

  '@media': {
    /* laptop..desktop */
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      { height: '75vh' },
    /* ≥ desktop */
    [`(min-width: ${gridSystem.size.desktop})`]: { height: '100vh' },
  },
});

/* Horizontal alignment wrapper */
export const SCHorizontalAllignmentWrapper = style({
  width: '100%',
  height: '200vh',
});

/* Chart card */
export const SCChartContainer = style({
  padding: '5px',
  borderRadius: '12px',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  marginRight: '5px',
  marginBottom: '10px',
  marginLeft: '5px',

  /* default to auto; override via assignInlineVars */
  height: chartHeightVar,
  vars: { [chartHeightVar]: 'auto' },
});

/* Chart layout (scrollable column) */
export const SCChartLayout = style({
  overflowY: 'scroll',
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
});

/* Header row */
export const SCChartHeaderContainer = style({
  height: '40px',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
});

/* Header text */
export const SCChartHeader = style({
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '19px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#000000',
  textAlign: 'center',
});

/* Horizontal divider */
export const SCHorizontalDivider = style({
  width: '100%',
  border: 'none',
  borderTop: '1px solid #B2B2B2',
});
