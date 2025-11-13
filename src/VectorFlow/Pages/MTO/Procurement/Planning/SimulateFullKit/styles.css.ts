// styles.css.ts
import { style, styleVariants, createVar, globalStyle } from '@vanilla-extract/css';

/* ---------------------------
   Procurement layout wrapper
---------------------------- */
export const procurementLayout = style({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  // selectors: {
  //   '& div[data-testid="vf_pagination"]': {
  //     margin: '-20px -15px !important',
  //     marginBottom: '0px !important',
  //   },
  //   '& > .ag-theme-alpine': {
  //     flex: '1 !important',
  //   },
  // },
});

// Descendants of procurementLayout (plain selectors; no :global)
globalStyle(`${procurementLayout} div[data-testid="vf_pagination"]`, {
  margin: '-20px -15px !important',
  marginBottom: '0px !important',
});

globalStyle(`${procurementLayout} > .ag-theme-alpine`, {
  flex: '1 !important',
});


/* ------------ Misc boxes ------------- */
export const main = style({ marginTop: 12 });
export const mainContainer = style({
  display: 'flex',
  gap: 75,
  marginLeft: 15,
  padding: '0.75rem',
});
export const box = style({
  width: 210,
  minHeight: '12vh',
  background: '#FFFFFF',
  boxShadow: '0px 6px 12px #74747429',
  borderRadius: 6,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 30,
});
export const percentBorderContainer = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
export const percentBorder = style({
  border: '3px solid #F0F0F0',
  borderRadius: '50%',
  backgroundColor: '#CDCDCD',
  height: 50,
  width: 50,
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
});
export const percent = style({ textAlign: 'center' });
export const btnGroup = style({
  height: 80,
  width: '100%',
  display: 'flex',
});
export const btn = style({
  width: '100%',
  paddingTop: 5,
  paddingRight: 5,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
export const textXAxis = style({
  fontSize: 12,
  textAlign: 'center',
  transform: 'rotate(-90deg)',
  width: 'max-content',
  whiteSpace: 'nowrap',
});
export const textYAxis = style({
  fontSize: 12,
  textAlign: 'center',
  paddingBottom: 4,
});
export const viewOrder = style({
  fontSize: 10,
  color: '#BC3D81',
  marginBottom: 30,
  backgroundColor: '#fcf0f7',
  width: '70%',
  padding: 10,
  textAlign: 'center',
  borderRadius: 8,
});
export const textOnBox = style({
  position: 'absolute',
  bottom: '100%',
  left: 0,
  backgroundColor: '#E0E0E0',
  width: 80,
  borderRadius: '8px 8px 0 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
export const imgDiv = style({
  display: 'flex',
  gap: 10,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 1,
  fontWeight: 'bold',
});

/* Dynamic left color bar */
export const leftColorVar = createVar();
export const leftHeightVar = createVar();
export const colorOnLeft = style({
  position: 'absolute',
  right: '100%',
  borderRadius: '8px 0 0 8px',
  width: 20,
  backgroundColor: leftColorVar,
  height: leftHeightVar,
  selectors: {
    '&:nth-of-type(1)': { top: 0, zIndex: 0 },
    '&:nth-of-type(2)': { top: 15, zIndex: 1 },
    '&:nth-of-type(3)': { top: 25, zIndex: 2 },
  },
});

export const separator = style({
  borderRight: '1px solid currentColor',
  height: '85%',
  margin: 'auto',
});
export const btrLayoutTabsWrapper = style({
  display: 'flex',
  zoom: '0.75',
  justifyContent: 'center',
  marginBottom: 15,
});
export const buttonImg = style({ marginRight: 3 });
export const btnCount = style({ width: '100%' });
export const textOnColor = style({
  fontSize: 10,
  transform: 'rotate(-90deg)',
  whiteSpace: 'nowrap',
  color: 'white',
});

/* ------------------------------
   BPR Daily Analytics (table)
------------------------------- */
export const bprWrapper = style({
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const bprContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '95%',
  background: '#383737',
  boxShadow: '0px 6px 12px #00000034',
  padding: '4px 8px',
  borderRadius: 4,
});

export const bprHeader = style({
  color: 'white',
  marginBottom: 6,
});

export const bprTableContainer = style({});

export const bprHeaderContainer = style({
  display: 'flex',
  flexDirection: 'row',
  color: 'white',
  width: '100%',
});

export const bprHeaderCell = style({
  width: '100%',
  padding: 2,
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  textAlign: 'left',
  marginBottom: 5,
});

export const bprRowContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const bprRow = style({
  display: 'flex',
  flexDirection: 'row',
  width: '95%',
  borderRadius: 4,
  background: '#FFFFFF',
  boxShadow: '0px 3px 12px #58585829',
  marginBottom: 5,
  overflow: 'hidden',
  zoom: 0.7 as any, // zoom is non-standard; cast to satisfy TS
});

export const bprCell = style({
  textAlign: 'center',
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  fontWeight: 500,
  fontSize: 11,
  lineHeight: '21px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#313131',
  selectors: {
    '&:before': {
      content: '',
      position: 'absolute',
      right: 0,
      height: '100%',
      width: 1,
    },
  },
});

export const bprNoChangeWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

export const bprChangeIcon = style({
  height: 10,
  width: 10,
});

export const bprStatusBar = style({
  display: 'flex',
  alignItems: 'center',
});

export const bprStatusBarSection = style({
  width: '100%',
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '21px',
  letterSpacing: 0,
  color: '#FFFFFF',
  textAlign: 'center',
});

export const bprCellHeader = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 500,
  fontSize: 16,
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#313131',
});

export const bprCellText = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 400,
  fontSize: 16,
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#313131',
});

/* Children color cell renderer (variants instead of prop fn) */
export const childrenColorCellRenderer = styleVariants({
  Red: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
    borderRadius: '50%',
    marginTop: 14,
    backgroundColor: 'Red',
  },
  Yellow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
    borderRadius: '50%',
    marginTop: 14,
    backgroundColor: 'Yellow',
  },
  Black: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
    borderRadius: '50%',
    marginTop: 14,
    backgroundColor: 'Black',
  },
  Green: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
    borderRadius: '50%',
    marginTop: 14,
    backgroundColor: 'Green',
  },
});
