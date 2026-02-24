import { style, createVar } from '@vanilla-extract/css';

/* CSS variables for runtime values */
export const progressVar = createVar();     // e.g. "45%"
export const trackColorVar = createVar();   // e.g. "#FCA311"
export const thumbColorVar = createVar();   // e.g. "#CB830E"

export const rangeSliderContainer = style({
  position: 'relative',
  width: '300px',
  margin: '20px auto',
});

export const rangeSliderInput = style({
  WebkitAppearance: 'none',
  width: '100%',
  height: '11px',
  boxShadow: '0px 3px 12px #7C7C7C29',
  borderRadius: '30px',
  background: 'transparent',
  outline: 'none',
  cursor: 'pointer',

  selectors: {
    /* WebKit (Chrome/Edge/Safari) */
    '&::-webkit-slider-thumb': {
      WebkitAppearance: 'none',
      appearance: 'none',
      marginTop: '-5px',
      width: '19px',
      height: '19px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      background: thumbColorVar,
      border: '4px solid white',
      boxShadow:
        'rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px',
      cursor: 'pointer',
    },
    '&::-webkit-slider-runnable-track': {
      height: '9px',
      cursor: 'pointer',
      background: `linear-gradient(
        to right,
        ${trackColorVar} 0%,
        ${trackColorVar} ${progressVar},
        #ffffff ${progressVar},
        #ffffff 100%
      )`,
      borderRadius: '30px',
      border: 'none',
    },

    /* Firefox */
    '&::-moz-range-thumb': {
      width: '19px',
      height: '19px',
      borderRadius: '50%',
      background: thumbColorVar,
      border: '4px solid white',
      boxShadow:
        'rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px',
      cursor: 'pointer',
    },
    '&::-moz-range-track': {
      height: '9px',
      background: `linear-gradient(
        to right,
        ${trackColorVar} 0%,
        ${trackColorVar} ${progressVar},
        #ffffff ${progressVar},
        #ffffff 100%
      )`,
      borderRadius: '30px',
      border: 'none',
    },
  },
});

export const valueLabel = style({
  position: 'absolute',
  textAlign: 'center',
  backgroundColor: 'white',
  fontSize: '10px',
  fontWeight: 500,
  padding: '0px 5px',
  zIndex: 10,
  borderRadius: '50%', // matches inline from original
});

export const toolTipTriangle = style({
  position: 'absolute',
  width: '0px',
  height: '0px',
  top: '20px',
  borderStyle: 'solid',
  borderWidth: '0 5.5px 9px 5.5px',
  borderColor: 'transparent transparent black transparent',
  transform: 'rotate(180deg)',
});

/* (Optional) kept for parity if you re-enable milestones later */
export const milestonesContainer = style({
  width: '100%',
  marginTop: '10px',
  position: 'relative',
});

export const milestoneLabel = style({
  fontSize: '12px',
  position: 'absolute',
  fontWeight: 500,
  letterSpacing: '0px',
  color: '#000000',
});
