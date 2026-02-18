import { style, createVar, globalStyle } from '@vanilla-extract/css';
import * as gridSystem from "../../../styles/gridSystem.css";

// Theme-driven vars
export const bgParticularVar = createVar();      // SCNavCount background
export const headerTextColorVar = createVar();   // header text color
export const itemTextColorVar = createVar();     // list item text color
export const footerBgVar = createVar();          // footer background
export const footerTextColorVar = createVar();   // footer text color

// Container padding (pathname dependent)
export const SCCount = style({
  padding: '0 10px',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { paddingBottom: '20px' },
  },
});

export const SCCountAvailExtra = style({
  padding: '10px 10px 30px',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { paddingBottom: '20px' },
  },
});

// Main card
export const SCNavCount = style({
  backgroundColor: bgParticularVar,
  borderRadius: '12px 12px 0 0',
  padding: '15px 25px 0 35px',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { padding: '8px 12px 0 16px' },
  },
});


// Section header
export const SCNavCountHeader = style({
  paddingBottom: '8px',
  paddingTop: '8px',
  borderBottom: '1px dashed #929292',
  color: headerTextColorVar,
  fontSize: '1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: '1.2rem' },
  },
});

export const SCNavCountList = style({
  padding: 0,
  margin: 0,
});

export const SCNavCountItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '1.5rem',
  lineHeight: '21px',
  color: itemTextColorVar,
  padding: '8px 0',
  listStyle: 'none',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]: {
      fontSize: '1.2rem',
      padding: '4px 0',
    },
  },
});
// Footer
export const SCNavCountFooter = style({
  padding: '15px 25px 12px 35px',
  borderRadius: '0 0 12px 12px',
  color: footerTextColorVar,
  backgroundColor: footerBgVar,
  fontSize: '1.5rem',
  lineHeight: '21px',
  fontWeight: 500,
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: 'rgba(114, 114, 114, 0.16) 0px 3px 15px',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]: {
      padding: '5px 12px 0 16px',
      fontSize: '1.2rem',
    },
  },
  // selectors: {
  //   '& #yield_particulars': {
  //     boxShadow: '0px 3px 25px #77777729',
  //     backgroundColor: '#fff',
  //     color: '#222',
  //     opacity: 1,
  //     position: 'fixed',
  //     width: '33vw',
  //     top: 'auto',
  //     '@media': {
  //       [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
  //         { width: '38vw' },
  //     },
  //   },
  //   '& .react-tooltip-arrow': {
  //     left: '29px',
  //   },
  // },
});
// ⬇️ Descendants go in globalStyle
globalStyle(`${SCNavCountFooter} #yield_particulars`, {
  boxShadow: '0px 3px 25px #77777729',
  backgroundColor: '#fff',
  color: '#222',
  opacity: 1,
  position: 'fixed',
  width: '33vw',
  top: 'auto',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]: {
      width: '38vw',
    },
  },
});

globalStyle(`${SCNavCountFooter} .react-tooltip-arrow`, {
  left: '29px',
});

// Total value cells (composable)
export const SCTotalValueBase = style({
  display: 'flex',
  whiteSpace: 'nowrap',
  alignItems: 'center',
});

export const SCTotalWidthIST = style({
  width: '25vw',
});

export const SCTotalWidthAvail = style({
  width: '100%',
});

export const SCTotalCenter = style({
  width: '100%',
  justifyContent: 'center',
});

export const SCTotalEnd = style({
  width: '100%',
  justifyContent: 'flex-end',
});

// Toggle icons
export const BtnLeftBase = style({
  marginRight: '10px',
});

export const BtnLeftRotatedClickable = style([
  BtnLeftBase,
  { transform: 'rotate(180deg)', cursor: 'pointer' },
]);

export const BtnRightBase = style({});

export const BtnRightRotated = style({ transform: 'rotate(180deg)' });
export const BtnRightClickable = style({ cursor: 'pointer' });
