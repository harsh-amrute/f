import { style, createVar } from '@vanilla-extract/css';
import * as gridSystem from '../../../../../../styles/gridSystem.css';

/* runtime var to control SCChartContainer height */
export const chartHeightVar = createVar();

/* ===== containers ===== */
export const SCDynamicContainer = style({
  display: 'block',
  marginTop: 25,
  height: '150vh',

  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      { height: '70vh' },
    [`screen and (min-width: ${gridSystem.size.desktop})`]: {
      height: '110vh',
    },
  },
});

export const SCChartContainer = style({
  padding: 5,
  borderRadius: 12,
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  marginRight: 5,
  marginBottom: 10,
  marginLeft: 5,
  height: chartHeightVar, // set at usage; default to 'auto'
});

export const SCChartLayout = style({
  overflowY: 'scroll',
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
});

export const SCChartHeaderContainer = style({
  height: 60,
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
});

export const SCChartHeader = style({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '21px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#000',
  textAlign: 'center',
});

export const SCHorizontalDivider = style({
  width: '100%',
  border: 'none',
  borderTop: '1px solid #B2B2B2',
});
