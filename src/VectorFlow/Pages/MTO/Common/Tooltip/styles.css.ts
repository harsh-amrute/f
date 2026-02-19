// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';

export const arrowLeftVar = createVar();
export const zoomVar = createVar();

export const tooltipTarget = style({
  cursor: 'pointer',
});

export const tooltipContainer = style({
  color: 'white',
  background: '#313131',
  borderRadius: '4px',
  zIndex: 10000,
  position: 'fixed',
  maxWidth: '300px',
  fontSize: '16px',

  // use CSS var for the non-standard `zoom` prop
  zoom: zoomVar,

  selectors: {
    '&::after': {
      content: '',
      width: 0,
      height: 0,
      display: 'block',
      position: 'absolute',
      top: '99%',
      left: arrowLeftVar, // driven by runtime
      transform: 'translateX(-50%)',
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderTop: '10px solid #313131',
      borderBottom: '10px solid transparent',
    },
  },
});
