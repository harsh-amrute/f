import { createVar, style, styleVariants } from '@vanilla-extract/css';

export const brandColorVar = createVar(); // runtime color (hover/focus border)

// Container: "CustomPageSize"
export const customPageSizeDiv = style({
  display: 'flex',
  flexDirection: 'row',
  fontVariant: 'normal',
  alignItems: 'center',
  fontSize: 11,
  fontFamily: 'Roboto',
  lineHeight: '19px',
  letterSpacing: 0,
  color: 'black',
  height: '70%',
  width: 140,
});

// Wrapper: "PageSizeInputDiv"
export const pageSizeInputDiv = style({
  borderRadius: 5,
  background: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: 'rgba(133, 132, 132, 0.247) 5px 0px 10px',
  height: '100%',
  width: 80,
  marginLeft: 5,
});

// Input: "PageSizeInput"
export const pageSizeInput = style({
  fontFamily: 'Roboto',
  fontSize: 11,
  lineHeight: '19px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: 'white',
  letterSpacing: 0,
  color: 'black',
  width: '70%',
  height: '100%',
  border: '1px solid white',
  padding: '2px 5px',
  outline: 'none',
  selectors: {
    '&:hover': { border: `1px solid ${brandColorVar}` },
    '&:focus': { border: `1px solid ${brandColorVar}` },
  },
});

// Optional: replace your global "no-arrows" utility with a scoped class
export const noArrows = style({
  // Chrome, Safari, Edge, Opera
  selectors: {
    '&::-webkit-outer-spin-button': { WebkitAppearance: 'none', margin: 0 },
    '&::-webkit-inner-spin-button': { WebkitAppearance: 'none', margin: 0 },
  },
  // Firefox
  MozAppearance: 'textfield' as any,
});

export const paginationWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 'inherit',
  marginTop: 0,
  position: 'relative',
});

export const paginationContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  height: 40,
  padding: '0 10px',
  fontSize: 13,
  fontFamily: 'Roboto',
  lineHeight: '19px',
  letterSpacing: 0,
  color: 'black',
  justifyContent: 'space-between',
  boxShadow: '0px 6px 12px #95959529',
  borderTop: 'none',
  backgroundColor: 'white',
  alignItems: 'center',
});

export const gridFilterWrapper = style({
  // non-standard but you had it; keep it
  zoom: '0.5' as any,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const statusBarWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
});

export const statusBarLabel = style({
  display: 'flex',
  flexDirection: 'row',
  fontVariant: 'normal',
  alignItems: 'center',
  fontSize: 13,
  fontFamily: 'Roboto',
  lineHeight: '19px',
  letterSpacing: 0,
  color: 'black',
  height: 40,
});

export const statusBarLabelLight = style({
  fontWeight: 400,
  marginLeft: 5,
});

export const statusBarLabelBold = style({
  fontWeight: 700,
  marginLeft: 5,
});

export const arrowIcon = style({
  marginLeft: 5,
  cursor: 'pointer',
  height: 10,
  width: 10,
});

export const arrowIconDisabled = style({
  opacity: 0.3,
  // optional: block clicks like a true disabled state
  pointerEvents: 'none',
  cursor: 'default',
});

export const rotate180 = style({
  transform: 'rotate(180deg)',
});

export const ml10 = style({
  marginLeft: 10,
});

// brand-colored text button
const brandColors = {
  REGALBLAZE: '#CB830E',
  DEFAULT: '#BC3D81',
} as const;

const textBtnBase = style({
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: 23,
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: 'white',
  border: 'none',
  padding: 0,
  selectors: {
    '&:disabled': {
      color: 'grey',
      cursor: 'context-menu',
    },
  },
  paddingTop: '1px',
  paddingBottom: '1px',
  paddingLeft: '6px',
  paddingRight: '6px',
});

export const textBtn = styleVariants({
  REGALBLAZE: [textBtnBase, { color: brandColors.REGALBLAZE }],
  DEFAULT: [textBtnBase, { color: brandColors.DEFAULT }],
});
