import { style, createVar } from '@vanilla-extract/css';

/* ===== runtime vars ===== */
export const cellBgVar = createVar();        // ViewGridCell background
export const cellBorderVar = createVar();    // ViewGridCell main border color
export const themeAccentVar = createVar();   // ContributionWrapper text color
export const hiddenWidthVar = createVar();   // ContributionHiddenSection width (0 | auto)

/* ===== page/frame ===== */
export const ViewWrapper = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 20,
  paddingTop: 20,
  paddingBottom: 20,
});

export const ViewContainer = style({
  width: '100%',
  height: '100%',
  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  borderRadius: 6,
  backgroundColor: 'white',
  padding: '0px 20px 0px 10px',
  display: 'grid',
  gap: '0px 5px',
  gridTemplateColumns: '1fr 5fr',
  gridTemplateRows: 'auto 1fr auto',
});

export const ViewSidebar = style({
  gridRow: '2 / 3',
  gridColumn: '2 / 1', // kept as-is from original
  width: '100%',
  display: 'grid',
  alignItems: 'center',
  justifyItems: 'center',
  gridTemplateRows: 'repeat(4, 1fr)',
});

export const ViewTopbar = style({
  gridRow: '1 / 2',
  gridColumn: '2 / 3',
  height: 90,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ViewBottombar = style({
  gridRow: '4 / 4',
  gridColumn: '2 / 3',
  height: 90,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
});

export const ViewGridWrapper = style({
  gridRow: '2 / 3',
  gridColumn: '2 / 3',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(4, 1fr)',
  backgroundColor: '#707070',
  border: '0.5px solid #707070',
  borderRight: 'none',
});

/* ===== grid cell ===== */
export const ViewGridCell = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: cellBgVar,
  border: `solid 1px ${cellBorderVar}`,
  borderRight: 'solid 1px #929491ff',
  borderLeft: 'none',
});

/* ===== table labels ===== */
export const ViewTableLabelCellWrapper = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ViewTableLabelCell = style({
  width: 150,
  height: 55,
  boxShadow: 'inset -5px 5px 20px #00000029',
  borderRadius: 6,
  display: 'grid',
  placeItems: 'center',
  fontFamily: 'Roboto',
  fontSize: 16,
  fontWeight: 600,
});

/* ===== floating icon block ===== */
export const FloatingIconWrapper = style({
  position: 'relative',
  padding: '3px 10px',
  border: '1.5px solid #696969', // often overridden inline for status color
  borderRadius: 4,
  backgroundColor: 'white',
});

export const FloatingIconPostfix = style({
  position: 'absolute',
  width: 20,
  right: -13,
  top: 25,
});

/* ===== cell icon ===== */
export const CellIconWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 75,
});

export const CellIconLabel = style({
  fontFamily: 'Roboto',
  fontSize: 10,
  fontWeight: 400,
  lineHeight: '15px',
});

export const CellIcon = style({
  height: 40,
  width: 40,
});

/* ===== tooltip ===== */
export const ToolTipWrapper = style({
  position: 'fixed',
  backgroundColor: 'rgba(0,0,0,0.9)',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  borderRadius: 8,
  fontWeight: 500,
  fontSize: 10,
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#FFFFFF',
  padding: 5,
  zIndex: 10000,
  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      bottom: '0%',
      left: '50%',
      transform: 'translate(-50%, 100%)',
      borderWidth: 6,
      borderStyle: 'solid',
      borderColor: 'black transparent transparent transparent',
    },
  },
});

/* ===== contribution pill ===== */
export const ContributionWrapper = style({
  position: 'absolute',
  display: 'flex',
  top: 10,
  left: 10,
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  cursor: 'default',
  color: themeAccentVar,
  overflow: 'hidden',
  height: 15,
});

export const ContributionSection = style({
  fontWeight: 500,
  fontSize: 10,
  fontFamily: 'Roboto',
  color: 'inherit',
  padding: '0px 3px',
});

export const ContributionHiddenSection = style({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  width: hiddenWidthVar, // '0' | 'auto'
  fontWeight: 500,
  fontSize: 10,
  fontFamily: 'Roboto',
  color: 'inherit',
  transition: '0.3s ease-in-out',
  paddingRight: 3,
});

export const ContributionIcon = style({
  margin: '0px 3px',
  height: 10,
  width: 10,
});

export const InventoryToolTipContent = style({
  padding: '0px 5px',
});

/* ===== detail tooltip content ===== */
export const DetailToolTipWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 2,
  color: 'white',
  width: 200,
});

export const DetailToolTipHeader = style({
  borderBottom: 'dashed 1px white',
});

export const DetailToolTipGrid = style({
  display: 'flex',
  flexDirection: 'column',
});

export const DetailToolTipGridRow = style({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr',
  padding: '3px 5px',
});

export const HighlightedRow = style([
  DetailToolTipGridRow,
  { backgroundColor: '#404040ff' },
]);

export const DetailToolTipGridHeader = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  fontWeight: 500,
  fontSize: 10,
  color: 'white',
});

export const DetailToolTipGridCell = style({
  width: '100%',
  fontSize: 10,
  display: 'flex',
  justifyContent: 'center',
});
