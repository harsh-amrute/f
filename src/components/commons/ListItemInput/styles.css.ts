import { style } from '@vanilla-extract/css';

export const menu = style({
  position: 'fixed',
  boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)',
  fontSize: '14px',
  backgroundColor: '#ffffff',
  zIndex: 2,
});

export const menuList = style({
  maxHeight: '300px',
  overflowY: 'auto',
  position: 'relative',
  WebkitOverflowScrolling: 'touch',
  paddingBottom: '4px',
  paddingTop: '4px',
  boxSizing: 'border-box',
});

export const menuItem = style({
  cursor: 'pointer',
  display: 'block',
  fontSize: 'inherit',
  width: '100%',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  backgroundColor: 'transparent',
  color: 'inherit',
  padding: '8px 12px',
  boxSizing: 'border-box',
  selectors: {
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
  },
});
