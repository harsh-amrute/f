import { style, createVar } from '@vanilla-extract/css';
import * as gridSystem from '../../../styles/gridSystem.css';

// Runtime vars (set from index.tsx)
export const filterBtnBgVar = createVar();
export const resetBtnColorVar = createVar();
export const resetBtnBorderVar = createVar();
export const quickActionBtnBgVar = createVar();

export const SCBoxFilter = style({
  display: 'flex',
  columnGap: '20px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 10px 20px #c4c8d066',
  borderRadius: '12px',
  padding: '20px',
  width: '100%',
  marginBottom: '20px',
  '@media': {
    'only screen and (max-width: 1490px)': { padding: '10px' },
  },
});

export const SCFilterBtn = style({
  color: '#fff',
  backgroundColor: filterBtnBgVar,
  padding: '8px 0px',
  fontSize: '1.6rem',
  borderRadius: '8px',
  width: '164px',
  border: 'none',
  '@media': {
    'only screen and (max-width: 1490px)': { width: '100px' },
  },
});

export const SCBoxFilterSticky = style({
  position: 'sticky',
  top: '91px',
  zIndex: 2,
  backgroundColor: '#f9f9f9',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { top: '69px' },
  },
});

export const SCResetFilterBtn = style({
  color: resetBtnColorVar,
  backgroundColor: '#FEFEFE',
  padding: '8px 0px',
  borderRadius: '8px',
  fontWeight: 500,
  width: '164px',
  border: `1px solid ${resetBtnBorderVar}`,
  '@media': {
    'only screen and (max-width: 1490px)': { width: '100px' },
  },
});

export const SCButtonFilter = style({
  paddingTop: '48px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: '1 0 10%',
  gap: '15px',
  textAlign: 'center',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { paddingTop: '30px' },
  },
});

export const SCQuickFilters = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '20px',
  backgroundColor: '#f9f9f9',
});

export const SCQuickFiltersWrap = style({
  display: 'flex',
  minWidth: '85%',
  gap: '2rem',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { gap: '1.5rem' },
  },
});

export const SCQuickAction = style({
  backgroundColor: '#FFFFFF',
  display: 'flex',
  padding: '8px 20px',
  alignItems: 'center',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { padding: '8px 10px' },
  },
});

export const SCQuickActionLabel = style({
  fontSize: '1rem',
  color: '#6c757d', // globalStyles.secondaryColor equivalent (adjust if needed)
});

export const SCQuickActionSelectInput = style({
  fontWeight: 500,
  fontFamily: 'Roboto',
  fontSize: '1.4rem',
  outline: 'none',
  border: 'none',
  paddingRight: '50px',
});

export const SCQuickActionSelect = style({
  display: 'grid',
  paddingLeft: '30px',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      { paddingLeft: '6px' },
  },
});

export const SCQuickActionButton = style({
  backgroundColor: quickActionBtnBgVar,
  height: '52px',
  width: '76px',
  borderRadius: '6px',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      { width: '47px', height: '36px' },
  },
});

export const SCQuickFilterBox = style({
  display: 'flex',
  alignItems: 'center',
});

export const SCQuickFiltersText = style({
  fontSize: '2rem',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      { fontSize: '1.2rem' },
  },
});
