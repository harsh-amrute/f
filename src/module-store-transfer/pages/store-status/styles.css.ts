import { style, createVar } from '@vanilla-extract/css';
import * as globalStyles from '../../../styles/global'
import * as gridSystem from '../../../styles/gridSystem.css'

/* Themeable accent color (was globalStyles.chooseThemeColor[themeUi]?.color5) */
export const accentVar = createVar();

/* Quick filter title text */
export const quickFiltersText = style({
  fontSize: '2rem',
  fontWeight: 500,
  '@media': {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: '1.6rem' },
  },
});

/* Right-side quick filter button area */
export const quickFilterBox = style({
  display: 'flex',
  alignItems: 'center',
  padding: '25px 0 0 20px',
});

/* Sticky bar with location filter + quick filter buttons */
export const quickFilterFlex = style({
  display: 'flex',
  position: 'sticky',
  top: '91px',
  zIndex: 2,
  backgroundColor: (globalStyles as any).gray ?? '#f5f5f5', // fallback in case gray not exported
  '@media': {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { top: '73px' },
  },
});

/* Left side (location filter card) */
export const boxHalfPart = style({
  flex: '1 0 70%',
  boxShadow: '0px 10px 20px #c4c8d066',
  borderRadius: '12px',
});

/* Inner card for the location filter */
export const boxFilter = style({
  display: 'flex',
  columnGap: '20px',
  background: '#fff',
  borderRadius: '12px',
  padding: '20px',
  height: '100%',
  '@media': {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { padding: '15px' },
  },
});

/* Column with the two action buttons (Filter / Reset) */
export const buttonFilter = style({
  paddingTop: '30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: '1 0 10%',
  gap: '15px',
  textAlign: 'center',
});

/* Filter button (filled) */
export const filterBtn = style({
  color: '#fff',
  backgroundColor: accentVar,
  padding: '8px 0px',
  fontSize: '1.6rem',
  borderRadius: '8px',
  width: '164px',
  border: 'none',
  '@media': {
    'only screen and (max-width: 1490px)': { width: '100px' },
  },
});

/* Reset button (outline) */
export const resetFilterBtn = style({
  color: accentVar,
  backgroundColor: '#fefefe',
  padding: '8px 0px',
  borderRadius: '8px',
  fontWeight: 500,
  width: '164px',
  border: `1px solid ${accentVar}`,
  '@media': {
    'only screen and (max-width: 1490px)': { width: '100px' },
  },
});

/* Spacer strip below the sticky bar */
export const quickFiltersDistance = style({
  height: '30px',
  position: 'sticky',
  top: '242px',
  backgroundColor: '#f9f9f9',
  zIndex: 1,
  '@media': {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { top: '214px' },
  },
});

/* Utility */
export const textNoWrap = style({
  whiteSpace: 'nowrap',
});
