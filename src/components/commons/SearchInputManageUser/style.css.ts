// style.css.ts
import { style } from '@vanilla-extract/css';

export const searchWrapper = style({
  position: 'relative',
});

export const searchInput = style({
  width: '100%',
  height: '40px',
  borderRadius: '40px',
  opacity: 1,
  padding: '0 40px 0 14px', // space for the icon
  backgroundColor: '#F2F2F2',
  outline: 'none',
  border: 'none',
  fontSize: '16px',
});

export const searchIcon = style({
  position: 'absolute',
  top: '50%',
  right: '14px',
  transform: 'translateY(-50%)',
  width: '20px',
  height: '20px',
  pointerEvents: 'none',
  selectors: {
    '& svg': {
      width: '100%',
      height: '100%',
      fill: '#313131',
    },
  },
});
