import { style, globalStyle , createVar } from '@vanilla-extract/css';


// ---------- Shared dynamic vars ----------
export const colorVar = createVar();
export const heightVar = createVar();
export const borderColorVar = createVar();
export const chipBgVar = createVar();

// ---------- Main layout ----------
export const main = style({
  marginTop: '12px',
});

export const mainContainer = style({
  display: 'flex',
  gap: '75px',
  marginLeft: '15px',
  padding: '0.75rem',
});

export const box = style({
  width: '210px',
  minHeight: '12vh',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 6px 12px #74747429',
  borderRadius: '6px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '30px',
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
  height: '50px',
  width: '50px',
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
});

export const percent = style({
  textAlign: 'center',
});

export const btnGroup = style({
  height: '80px',
  width: '100%',
  display: 'flex',
});

export const btns = style({
  width: '100%',
  paddingTop: '5px',
  paddingRight: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const textXAxis = style({
  fontSize: '12px',
  textAlign: 'center',
  transform: 'rotate(-90deg)',
  width: 'max-content',
  // textWrap: 'nowrap',
});

export const textYAxis = style({
  fontSize: '12px',
  textAlign: 'center',
  paddingBottom: '4px',
});

export const viewOrder = style({
  fontSize: '10px',
  color: '#BC3D81',
  marginBottom: '30px',
  backgroundColor: '#fcf0f7',
  width: '70%',
  padding: '10px',
  textAlign: 'center',
  borderRadius: '8px',
});

export const textOnBox = style({
  position: 'absolute',
  bottom: '100%',
  left: 0,
  backgroundColor: '#E0E0E0',
  width: '80px',
  borderRadius: '8px 8px 0 0',
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const imgDiv = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1px',
  fontWeight: 'bold',
});

// Uses CSS vars for dynamic color/height
export const colorOnLeft = style({
  position: 'absolute',
  right: '100%',
  borderRadius: '8px 0 0 8px',
  backgroundColor: colorVar,
  width: '20px',
  height: heightVar,
  selectors: {
    '&:nth-of-type(1)': { top: '0px', zIndex: '0' as any },
    '&:nth-of-type(2)': { top: '15px', zIndex: '1' as any },
    '&:nth-of-type(3)': { top: '25px', zIndex: '2' as any },
  },
});

export const separator = style({
  borderRight: `1px solid ${borderColorVar}`,
  height: '85%',
  margin: 'auto',
});

export const btrLayoutTabsWrapper = style({
  display: 'flex',
  zoom: '0.75' as any,
  justifyContent: 'center',
  marginBottom: '15px',
});

export const buttonImg = style({
  display: 'inline-block',
  marginRight: '3px',
});

export const btnCount = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const textOnColor = style({
  fontSize: '10px',
  transform: 'rotate(-90deg)',
  whiteSpace: 'nowrap',
  color: 'white',
});

// simple horizontal divider, dynamic border color
export const divider = style({
  width: '98%',
  border: `1px dashed ${borderColorVar}`,
  color: '#FFFFFF',
  marginBottom: '20px',
});

// ---------- Procurement layout ----------
export const procurementLayout = style({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  margin: '20px 0px 0px 25px',
});

// scoped global tweaks under the container:
globalStyle(`${procurementLayout} div[data-testid="vf_pagination"]`, {
  width: '100%',
});
globalStyle(`${procurementLayout} > .ag-theme-alpine`, {
  flex: 1,
});

// ---------- BPR Daily Analytics ----------
export const bprWrapper = style({
  padding: '0px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const bprContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '95%',
  background: '#383737 0% 0% no-repeat padding-box',
  boxShadow: '0px 6px 12px #00000034',
  padding: '4px 8px',
  borderRadius: '4px',
});

export const bprHeader = style({
  color: 'white',
  marginBottom: '6px',
});

export const bprTableContainer = style({});

export const bprTableHeaderContainer = style({
  display: 'flex',
  flexDirection: 'row',
  color: 'white',
  width: '100%',
  borderTop: '1px solid white',
  borderBottom: '1px dashed white',
});

export const bprTableHeader = style({
  width: '100%',
  textAlign: 'left',
  marginBottom: '5px',
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
  borderRadius: '4px',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 12px #58585829',
  marginBottom: '5px',
  overflow: 'hidden',
  zoom: '0.7' as any,
});

export const bprRowCompact = style({
  height: '30px',
  boxShadow: 'none',
  backgroundColor: 'transparent',
  borderBottom: '1px solid white',
  borderRadius: 0,
});

export const bprRowTotal = style({
  height: '30px',
  boxShadow: 'none',
  backgroundColor: 'black',
  borderRadius: 0,
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
  fontSize: '11px',
  lineHeight: '21px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#313131',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      right: 0,
      height: '100%',
      width: '1px',
    },
  },
});

export const bprCellHeader = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#313131',
});

export const bprCellHeaderWhite = style([
  bprCellHeader,
  { color: 'white' },
]);

export const bprCellText = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#313131',
});

// the small 20x20 color chip in first column (uses chipBgVar)
export const bprColorChip = style({
  height: '20px',
  width: '20px',
  background: chipBgVar,
});

// ---------- Children color cell (AG Grid renderer) ----------
export const childrenColorCellDefault = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  marginTop: '14px',
  backgroundColor: '#BC3D81',
});

export const childrenColorCellRegalblaze = style([
  childrenColorCellDefault,
  { backgroundColor: '#CB830E' },
]);

// ---------- SCDynamicContainer + AG Grid globals ----------
export const scDynamicContainer = style({});
globalStyle(`${scDynamicContainer} .ag-header-cell-text`, {
  fontSize: '10px !important',
  fontWeight: 'bold',
});
globalStyle(`${scDynamicContainer} > .ag-theme-alpine`, {
  // TS doesn't know about custom properties like --ag-borders,
  // so we suppress the type check for this line.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error - custom CSS variable not in GlobalStyleRule type
  '--ag-borders': 'none',
});
globalStyle(`${scDynamicContainer} .ag-theme-alpine .ag-cell`, {
  border: 'none',
  height: '100%',
  borderTop: '0.1px solid #cecece',
});
