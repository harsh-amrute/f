// styles.css.ts
import { style, globalStyle, createVar } from '@vanilla-extract/css';
import * as gridSystem from '../../../styles/gridSystem.css';

// ---------- helpers
const mqLaptopL = `(min-width: ${gridSystem.size.laptopL}) and (max-width: ${gridSystem.size.desktop})`;
const mqLaptop = `(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`;

// ---------- Variant variables (replacing recipes)
// SCGridNav
export const gridNavZIndexVar = createVar();
export const gridNavHeightVar = createVar();

// SCIconMenu
export const iconMenuBorderVar = createVar();
export const iconMenuTransformVar = createVar();

// SCInterStoreArrowDown
export const interStoreArrowTransformVar = createVar();

// SCMenuItem
export const menuItemColorVar = createVar();

// SCItemChild
export const itemChildColorVar = createVar();
export const itemChildBgVar = createVar();
export const itemChildFontWeightVar = createVar();
export const itemChildHeightVar = createVar();
export const itemChildMarginVar = createVar();
export const itemChildPaddingVar = createVar();

// ---------- Layout shells
export const SCGridNav = style({
  position: 'sticky',
  top: '95px',
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  // defaults (isHide: false, isAvailCompare: false)
  vars: {
    [gridNavZIndexVar]: '5',
    [gridNavHeightVar]: '85vh',
  },

  zIndex: gridNavZIndexVar,
  height: gridNavHeightVar,
});

export const SCNavbar = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
});

export const SCNavBox = style({
  margin: '0 auto',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  overflow: 'hidden overlay',
  selectors: {
    '&::-webkit-scrollbar': { width: '7px' },
    '&::-webkit-scrollbar-track': {
      borderRadius: '30px',
      opacity: '1',
      backgroundColor: '#313132',
    },
    '&::-webkit-scrollbar-thumb': {
      width: '7px',
      background: 'gray 0% 0% no-repeat padding-box',
      boxShadow: '0px 6px 9px #41414129',
      borderRadius: '30px',
      opacity: '1',
    },
  },
});

export const SCBoxTop = style({ display: 'flex' });

export const SCText = style({
  fontSize: '2rem',
  fontWeight: 300,
  color: 'var(--text)',
  padding: '20px 0 0 20px',
  '@media': {
    [mqLaptop]: { padding: '0 0 0 15px', fontSize: '1.6rem' },
  },
});

// ---------- Icon toggle (no recipe)
export const SCIconMenu = style({
  position: 'absolute',
  right: '-24px',
  width: '40px',
  zIndex: 300,
  borderRadius: '50%',
  cursor: 'pointer',
  marginTop: '20px',

  vars: {
    // default: isRegalblaze = false, rotated = false
    [iconMenuBorderVar]: '5px solid #f9f9f9',
    [iconMenuTransformVar]: 'rotate(0deg)',
  },

  border: iconMenuBorderVar,
  transform: iconMenuTransformVar,

  '@media': {
    [mqLaptop]: { width: '32px', marginTop: '0px', right: '-17px' },
  },
});

// ---------- Menu row (header)
export const SCNavMenu = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6rem',
  paddingTop: '20px',
  fontSize: '1.5rem',
  fontWeight: 300,
  color: '#333',
  paddingLeft: '10px',
  position: 'relative',
  '@media': {
    [mqLaptopL]: { paddingTop: '5px' },
    [mqLaptop]: { fontSize: '1.6rem', gap: '3rem', marginBottom: '23px', paddingTop: '20px' },
  },
});

globalStyle(`${SCNavMenu} .arrow`, { position: 'absolute', top: '7px', right: '-70px' });
globalStyle(`${SCNavMenu} .arrow::before, ${SCNavMenu} .arrow::after`, {
  position: 'relative',
  content: '',
  display: 'block',
  width: '9px',
  height: '1px',
  background: 'black',
  transition: '0.3s ease-in-out',
});
globalStyle(`${SCNavMenu}.active .arrow::before`, { transform: 'rotate(-45deg)' });
globalStyle(`${SCNavMenu}.active .arrow::after`, { transform: 'rotate(45deg)' });

export const SCInterStore = style({
  color: 'var(--text)',
  fontSize: '1.4rem',
  '@media': {
    [mqLaptop]: { position: 'absolute', width: '200px' },
  },
});

// ---------- InterStore Arrow (no recipe)
export const SCInterStoreArrowDown = style({
  height: '8px',
  transform: interStoreArrowTransformVar,
  '@media': { [mqLaptop]: { height: '6px', left: '20rem', position: 'absolute' } },
});

// ---------- Menu list / items
export const SCMenuLeft = style({
  padding: '5px 10px',
  borderRadius: '10px',
  width: '100%',
  '@media': { [mqLaptop]: { padding: '5px 5px' } },
});

// SCMenuItem (no recipe)
export const SCMenuItem = style({
  fontWeight: 600,
  cursor: 'pointer',
  color: menuItemColorVar,
});

// SCItemChild (no recipe)
export const SCItemChild = style({
  width: '90%',
  whiteSpace: 'nowrap',
  fontSize: '1.8rem',
  borderRadius: '10px',
  overflow: 'hidden',
  transition: 'height 0.3s ease-in-out',
  display: 'flex',
  alignItems: 'center',

  vars: {
    // defaults: active = false, status = false
    [itemChildColorVar]: '#929292',
    [itemChildBgVar]: 'transparent',
    [itemChildFontWeightVar]: '300',
    [itemChildHeightVar]: '0px',
    [itemChildMarginVar]: '0',
    [itemChildPaddingVar]: 'unset',
  },

  color: itemChildColorVar,
  backgroundColor: itemChildBgVar,
  fontWeight: itemChildFontWeightVar as any,
  height: itemChildHeightVar,
  margin: itemChildMarginVar,
  padding: itemChildPaddingVar,

  '@media': {
    [mqLaptop]: { fontSize: '1.2rem', width: '100%' },
  },
});

export const SCNavChild = style({
  paddingLeft: '10px',
  lineHeight: '24px',
  textTransform: 'capitalize',
  display: 'block',
  color: 'var(--text)',
  '@media': { [mqLaptopL]: { paddingLeft: '8px', fontSize: '1.4rem' } },
});

export const SCInputIcon = style({
  maskSize: 'cover',
  display: 'inline-block',
  height: '8px',
  marginLeft: '10px',
  transform: 'rotate(-90deg)',
  '@media': { [mqLaptop]: { height: '5px', marginLeft: '5px' } },
});

// ---------- Table tooltip (file2)
export const SCTableTooltip = style({
  width: '100%',
  height: '33vh',
  borderCollapse: 'collapse',
  overflow: 'hidden',
  '@media': { [mqLaptop]: { height: '35vh' } },
});

export const SCTableTooltipTitle = style({
  textAlign: 'center',
  height: '5vh',
  selectors: { '&:first-child': { textAlign: 'start' } },
});

export const tdCell = style({
  textAlign: 'center',
  borderLeft: '1px dashed #000',
});
export const tdW15 = style({ width: '15%' });
export const tdW25 = style({ width: '25%' });
export const tdLight = style({ fontWeight: 300 });

export const rowFooter = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px dashed #000',
  padding: '.5rem 0 .8rem 0',
});
export const w25Center = style({ width: '25%', textAlign: 'center' });

// ---------- Particulars count card (file2)
export const SCCount = style({
  padding: '0 10px',
  '@media': { [mqLaptop]: { paddingBottom: '20px' } },
});

export const SCNavCount = style({
  backgroundColor: 'var(--particularBg)',
  borderRadius: '12px 12px 0 0',
  padding: '15px 25px 0 35px',
  '@media': {
    [mqLaptopL]: { padding: '15px 15px 0 15px' },
    [mqLaptop]: { padding: '8px 12px 0 16px' },
  },
});

export const SCNavCountHeader = style({
  paddingBottom: '8px',
  borderBottom: '1px dashed #929292',
  color: 'var(--text)',
  fontSize: '1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  '@media': { [mqLaptop]: { fontSize: '1.2rem' } },
});

export const SCNavCountList = style({ padding: 0, margin: 0 });

export const SCNavCountItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '1.5rem',
  lineHeight: '21px',
  color: 'var(--text)',
  padding: '8px 0',
  listStyle: 'none',
  selectors: { '&:last-child': { borderTop: '1px dashed #929292' } },
  '@media': { [mqLaptop]: { fontSize: '1.2rem', padding: '4px 0' } },
});

export const SCNavCountFooter = style({
  padding: '15px 25px 12px 35px',
  borderRadius: '0 0 12px 12px',
  color: 'var(--footerText)',
  backgroundColor: 'var(--particularFooterBg)',
  fontSize: '1.5rem',
  lineHeight: '21px',
  fontWeight: 500,
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: 'rgba(114,114,114,0.16) 0px 3px 15px',
  '@media': {
    [mqLaptopL]: { padding: '5px 15px' },
    [mqLaptop]: { padding: '5px 12px 0 16px', fontSize: '1.2rem' },
  },
});

globalStyle(`${SCNavCountFooter} #yield_particulars`, {
  left: 'var(--tooltip-left)',
  boxShadow: '0px 3px 25px #77777729',
  backgroundColor: '#fff',
  color: '#222',
  opacity: 1,
  position: 'fixed',
  width: '33vw',
  bottom: 'var(--tooltip-bottom)',
  top: 'auto !important',
});

globalStyle(`${SCNavCountFooter} .react-tooltip-arrow`, {
  left: '29px !important',
});

export const SCBenefits = style({
  marginTop: '5px',
  '@media': { [mqLaptop]: { marginTop: '0px' } },
});

export const SCIconTooltip = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const tooltipIcon = style({
  padding: '0 5px 3px 0',
  cursor: 'pointer',
  position: 'relative',
});
