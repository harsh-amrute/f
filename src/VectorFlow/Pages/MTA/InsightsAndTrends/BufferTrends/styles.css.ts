// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';

/* ========== runtime vars (set from TS via assignInlineVars) ========== */
export const chartHeightVar = createVar();         // e.g. '547px' or 'auto'
export const summaryColorVar = createVar();        // SummaryTableColumn color
export const availabilityColorVar = createVar();   // AvailabilityContent color

/* ========== chart layout ========== */
export const SCChartContainer = style({
  padding: '5px',
  borderRadius: '12px',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  marginRight: '5px',
  marginBottom: '10px',
  marginLeft: '20px',
  height: chartHeightVar, // set via assignInlineVars; default to 'auto' in TS if needed
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
  letterSpacing: 0,
  color: '#000000',
});

export const SCHorizontalDivider = style({
  width: '100%',
  border: 'none',
  borderTop: '1px solid #B2B2B2',
});

/* ========== summary + availability ========== */
export const SummaryTableColumn = style({
  color: summaryColorVar, // set at callsite
  fontWeight: 600,
});

export const AvailabilityContainer = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '58px',
  marginLeft: '-10px',
  boxShadow: 'rgb(155 155 155 / 16%) 6px 6px 12px',
  zIndex: 100,
  borderRadius: '0px 8px 8px 8px',
  width: '290px',
  minWidth: '220px',
  height: '160px',        // ← increased from 130px to fit formula + value
  // overflow: hidden     // ← remove this, it was clipping the bottom
});



export const AvailabilityHeader = style({
  position: 'relative',
  width: '100%',          // ← was 250px, now matches container
  flexShrink: 0, 
  height: '48px',
  padding: '10px',
  paddingTop: '15px',
  fontWeight: 600,
  fontSize: '13px',
  lineHeight: '13px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#000000',
  boxShadow: '0px 6px 12px #9B9B9B29',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  backgroundColor: 'white',
  borderRadius: '0px 8px 0px 0px',
  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      left: '1px',
      top: '4px',
      bottom: '4px',
      backgroundColor: '#898585',
      width: '0.5px',
    },
    '&:last-child::after': { display: 'none' },
  },
});



export const AvailabilityContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  flexShrink: 0,
  height: '52px',        
  fontSize: '22px',
  fontWeight: 300,
  color: availabilityColorVar,
  borderTop: '1px solid #f0f0f0',
  borderRadius: '0px 0px 8px 8px',
});


export const FormulaContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  backgroundColor: 'white',
  padding: '14px 10px',
  color: availabilityColorVar,
flex: 1,            // ← take remaining vertical space between header and value
});


export const FractionWrapper = style({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3px',
  width: '100%',
});

export const FractionNumerator = style({
  fontSize: '9px',
  fontWeight: 400,
  textAlign: 'center',
  whiteSpace: 'nowrap',    // ← allow wrap inside fixed-width container
  lineHeight: '13px',
  paddingBottom: '4px',
  width: '100%',
  
  vars: {
    // ← correct way to use a CSS var as a border color in vanilla-extract
    borderBottom: `1px solid ${availabilityColorVar}`,
  },
  borderBottom: `1px solid`,
  borderColor: availabilityColorVar,
});

export const FractionDenominator = style({
  fontSize: '9px',
  fontWeight: 400,
  textAlign: 'center',
  whiteSpace: 'nowrap',   // ← allow wrap
  lineHeight: '13px',
  paddingTop: '4px',
  width: '100%',
});
export const FractionMultiplier = style({
  fontSize: '11px',
  fontWeight: 500,
  flexShrink: 0,
  alignSelf: 'center',
  marginLeft: '4px',
});

/* ========== tiny utilities to replace inline styles ========== */
export const h200 = style({ height: '200px' });
export const rowFlex = style({ display: 'flex' });
export const centeredRow = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '8px',
});
export const zoom08 = style({ zoom: 0.8 as any });
export const zoom07 = style({ zoom: 0.7 as any });
export const summaryRowGutter = style({
  margin: '0px 10px 0px 25px',
  display: 'flex',
});
