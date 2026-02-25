// styles.css.ts
import { style, keyframes } from '@vanilla-extract/css';

/* animation */
const fadeIn = keyframes({
  from: { opacity: 0.7, transform: 'translateY(10px)' },
  to: { opacity: 1 },
});

/* container */
export const SCContainer = style({
  height: '25px',
  borderRadius: '5px',
  background: '#ff5f151a',
  border: '1px solid #FF5F15',
  color: '#FF5F15',
  fontSize: '10px',
  lineHeight: '18px',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 500,
  marginTop: '4px',
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  marginBottom: 'auto',
  overflow: 'visible',
});

/* tooltip */
export const SCToolTipWrapper = style({
  position: 'fixed',
  padding: '1px 5px',
  border: '1px solid #FF5F15',
  backgroundColor: 'rgba(255,255,255,1)',
  color: '#FF5F15',
  borderRadius: '4px',
  width: '170px',
  zIndex: 100000,
  animationName: fadeIn,
  animationDuration: '0.3s',
  animationTimingFunction: 'ease',
});

/* list */
export const SCErrorToolTipUl = style({
  fontSize: '9px',
  width: '100%',
  paddingInline: '0px',
  marginBlockStart: '0',
  marginBlockEnd: '0',
  marginInline: '0',
  padding: '0 0 10px 15px',
});

export const SCErrorToolTipLi = style({
  marginTop: '5px',
  listStyleType: 'circle',
  selectors: {
    '&::marker': { color: '#B80000' }, // color the bullet
  },
});
