import { style } from '@vanilla-extract/css';
import * as globalStyles from '../../../styles/global';
import * as GridSystem from '../../../styles/gridSystem.css';

// Safe theme color fallbacks
const regalC5 =
  (globalStyles as any).chooseThemeColor?.REGALBLAZE?.color5 ?? '#C7810E';
const defaultC5 =
  (globalStyles as any).chooseThemeColor?.PIPERPINK?.color5 ??
  (globalStyles as any).mainColor ??
  '#BC3D81';

export const boxFilterSticky = style({
  position: 'sticky',
  top: '106px',
  zIndex: 2,
  backgroundColor: '#f9f9f9',
  '@media': {
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { top: '113px' },
  },
});

export const boxFilter = style({
  display: 'flex',
  columnGap: '20px',
  backgroundColor: (globalStyles as any).white ?? '#fff',
  boxShadow: '0px 10px 20px #c4c8d066',
  borderRadius: '12px',
  padding: '20px',
  width: '100%',
  marginBottom: '20px',
});

export const buttonFilter = style({
  paddingTop: '51px',
  display: 'flex',
  justifyContent: 'center',
  flex: '1 0 25%',
  gap: '15px',
  textAlign: 'center',
  '@media': {
    [`(min-width: ${GridSystem.size.laptopL}) and (max-width: ${GridSystem.size.desktop})`]:
      { paddingTop: '52px' },
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { paddingTop: '33px', flex: '1 0 0%' },
  },
});

// Filter buttons
export const filterBtn = style({
  color: '#fff',
  padding: '8px 0',
  fontSize: '1.6rem',
  borderRadius: '8px',
  width: '164px',
  height: '40px',
  border: '1px solid transparent',
  flex: '0 0 50%',
  '@media': { 'only screen and (max-width: 1490px)': { width: '100px' } },
});
export const filterBtnRegal = style({
  backgroundColor: regalC5,
  borderColor: regalC5,
});
export const filterBtnDefault = style({
  backgroundColor: defaultC5,
  borderColor: defaultC5,
});

export const resetFilterBtn = style({
  backgroundColor: '#fefefe',
  padding: '8px 0',
  borderRadius: '8px',
  fontWeight: 500,
  width: '164px',
  height: '40px',
  flex: '0 0 50%',
  border: '1px solid transparent',
  '@media': { 'only screen and (max-width: 1490px)': { width: '100px' } },
});
export const resetFilterBtnRegal = style({
  color: regalC5,
  borderColor: regalC5,
});
export const resetFilterBtnDefault = style({
  color: defaultC5,
  borderColor: defaultC5,
});

// Tabs area
export const tabArea = style({
  display: 'flow-root',
  position: 'relative',
  marginLeft: '35px',
});

export const tabHeader = style({
  display: 'flex',
  alignItems: 'center',
  placeContent: 'space-between',
});
export const tabHeaderLeft = style({
  display: 'flex',
  position: 'relative',
  zIndex: 1,
});
export const tabHeaderRight = style({
  display: 'flex',
  alignItems: 'center',
});
export const viewModeIcon = style({
  width: '2.6rem',
  marginLeft: '1rem',
  cursor: 'pointer',
});

export const exportAllBoxButton = style({
  backgroundColor: (globalStyles as any).white ?? '#fff',
  border: '1px solid #11b221',
  borderRadius: '6px',
  padding: '8px 10px',
  display: 'flex',
  alignItems: 'center',
});
export const exportAllBoxSpan = style({
  color: '#11b221',
  fontSize: '1.3rem',
  fontWeight: 500,
  padding: '0 10px',
  '@media': {
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { fontSize: '0.9rem' },
  },
});
export const exportAllBoxImg = style({ width: '1.3vw' });

// Tab button (pill with 3D top)
export const tabButton = style({
  color: '#000',
  opacity: 1,
  height: '60px',
  width: '23rem',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.6rem',
  position: 'relative',
  marginLeft: '0',
  paddingLeft: '0',
  cursor: 'pointer',
  zIndex: 1,
  '@media': {
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { fontSize: '1.2rem', height: '3.5vw', width: '17rem' },
  },
  selectors: {
    '&::before': {
      border: '0.5px solid #cccccc',
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      borderBottom: 'none',
      borderTopLeftRadius: '6px',
      borderTopRightRadius: '6px',
      background: '#FCFCFC',
      boxShadow: '0px 5px 25px #9d9d9d29',
      transform: 'scale(1.2, 1.3) perspective(0.5em) rotateX(2.5deg)',
      transformOrigin: 'bottom left',
    },
  },
});
export const tabButtonOverlap = style({
  marginLeft: '-1.5em',
  paddingLeft: '1.5em',
});
export const tabButtonZ1 = style({ zIndex: 1 });
export const tabButtonZ2 = style({ zIndex: 2 });
export const tabButtonZ3 = style({ zIndex: 3 });

export const tabButtonActive = style({
  color: '#fff',
});
export const tabButtonActiveRegal = style({
  selectors: { '&::before': { background: regalC5 } },
});
export const tabButtonActiveDefault = style({
  selectors: { '&::before': { background: defaultC5 } },
});

export const tabBody = style({
  display: 'block',
  background: '#fff',
  border: '0.5px solid #cccccc',
  borderRadius: '0px 15px 15px 15px',
});

export const currentAvailability = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '2rem 0',
});
export const currentAvailabilityText = style({
  fontSize: '2rem',
  fontWeight: 500,
  border: '0.5px dashed rgba(18, 20, 24, 0.5)',
  padding: '10px',
  borderRadius: '3px',
  '@media': {
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { fontSize: '1.2rem' },
  },
});
