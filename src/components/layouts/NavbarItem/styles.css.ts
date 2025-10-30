// styles.css.ts
import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import * as gridSystem from '../../../styles/gridSystem.css';

// ---------- helpers
const mqLaptopL = `(min-width: ${gridSystem.size.laptopL}) and (max-width: ${gridSystem.size.desktop})`;
const mqLaptop  = `(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`;

// Theme + runtime values via CSS variables you set inline in JSX
// --text, --textActive, --chooseItemBg, --particularBg, --particularFooterBg, --tooltip-left, --tooltip-bottom

// ---------- Layout shells
export const SCGridNav = recipe({
  base: {
    position: 'sticky',
    top: '95px',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    selectors: {},
  },
  variants: {
    isHide: { true: { zIndex: '3' }, false: { zIndex: '5' } },
    isAvailCompare: { // pathname === '/availability-comparison'
      true: {},
      false: { height: '85vh' },
    },
  },
  defaultVariants: { isHide: false, isAvailCompare: false },
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

// ---------- Icon toggle
export const SCIconMenu = recipe({
  base: {
    position: 'absolute',
    right: '-24px',
    width: '40px',
    zIndex: 20,
    borderRadius: '50%',
    cursor: 'pointer',
    marginTop: '20px',
    '@media': {
      [mqLaptop]: { width: '32px', marginTop: '0px', right: '-17px' },
    },
  },
  variants: {
    isRegalblaze: { true: { border: 'unset' }, false: { border: '5px solid #f9f9f9' } },
    rotated: { true: { transform: 'rotate(180deg)' }, false: { transform: 'rotate(0)' } },
  },
  defaultVariants: { isRegalblaze: false, rotated: false },
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
  // selectors: {
  //   '& .arrow': { position: 'absolute', top: '7px', right: '-70px' },
  //   '& .arrow::before, & .arrow::after': {
  //     position: 'relative',
  //     content: '',
  //     display: 'block',
  //     width: '9px',
  //     height: '1px',
  //     background: 'black',
  //     transition: '0.3s ease-in-out',
  //   },
  //   '& .arrow::before': { transform: 'rotate(45deg)' },
  //   '& .arrow::after': { left: '6px', top: '-1px', transform: 'rotate(-45deg)' },

  //   // when this element gets class "active"
  //   '&.active .arrow::before': { transform: 'rotate(-45deg)' },
  //   '&.active .arrow::after': { transform: 'rotate(45deg)' },
  // },
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

export const SCInterStoreArrowDown = recipe({
  base: {
    height: '8px',
    '@media': { [mqLaptop]: { height: '6px', left: '20rem', position: 'absolute' } },
  },
  variants: {
    rotated: { true: { transform: 'rotate(180deg)' }, false: { transform: 'rotate(0)' } },
  },
  defaultVariants: { rotated: false },
});

// ---------- Menu list / items
export const SCMenuLeft = style({
  padding: '5px 10px',
  borderRadius: '10px',
  width: '100%',
  '@media': { [mqLaptop]: { padding: '5px 5px' } },
});

export const SCMenuItem = recipe({
  base: { fontWeight: 600, cursor: 'pointer' },
  variants: {
    active: { true: { color: '#0a58ca' }, false: { color: '#495057' } },
  },
  defaultVariants: { active: false },
});

export const SCItemChild = recipe({
  base: {
    width: '90%',
    whiteSpace: 'nowrap',
    fontSize: '1.8rem',
    borderRadius: '10px',
    overflow: 'hidden',
    transition: 'height 0.3s ease-in-out',
    margin: '0px',
    padding: 'unset',
    display: 'flex',
    alignItems: 'center',
    '@media': {
      [mqLaptopL]: {},
      [mqLaptop]: { fontSize: '1.2rem', width: '100%' },
    },
  },
  variants: {
    active: {
      true: { color: '#000000', backgroundColor: 'var(--chooseItemBg)', fontWeight: 500 },
      false: { color: '#929292', backgroundColor: 'transparent', fontWeight: 300 },
    },
    status: {
      true: {
        height: '24px',
        margin: '12px 0 12px 15px',
        padding: '18px 0',
        '@media': {
          [mqLaptopL]: { margin: '5px 0 5px 15px' },
          [mqLaptop]: { margin: '2px 6px', padding: '13px 0' },
        },
      },
      false: { height: '0px', margin: '0', padding: 'unset' },
    },
  },
  defaultVariants: { active: false, status: false },
});

export const SCNavChild = style({
  paddingLeft: '10px',
  lineHeight: '24px',
  textTransform: 'capitalize',
  display: 'block',
  color: 'var(--text)', // set via inline depending on theme + active
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
  color: 'var(--footerText)', // set via inline per theme
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
  // Tooltip placement using CSS vars set inline
  // selectors: {
  //   '& #yield_particulars': {
  //     left: 'var(--tooltip-left)',
  //     boxShadow: '0px 3px 25px #77777729',
  //     backgroundColor: '#fff',
  //     color: '#222',
  //     opacity: 1,
  //     position: 'fixed',
  //     width: '33vw',
  //     bottom: 'var(--tooltip-bottom)',
  //     top: 'auto !important',
  //   },
  //   '& .react-tooltip-arrow': { left: '29px !important' },
  // },
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
