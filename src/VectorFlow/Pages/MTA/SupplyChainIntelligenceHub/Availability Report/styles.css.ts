// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';

/* ========= Runtime vars ========= */
export const progressVar = createVar();     // e.g. "65%"
export const chipBgVar = createVar();       // e.g. "#355FD3"
export const chipColorVar = createVar();    // e.g. "#fff"
export const sectionBgVar = createVar();    // tooltip section bg
export const sectionColorVar = createVar(); // tooltip section color

/* ========= Runtime vars ========= */
export const tooltipBorderColorVar = createVar();  // e.g. "#9e9e9e" or theme color
export const badgeBgVar = createVar();             // e.g. "#9e9e9e"
export const badgeColorVar = createVar();          // e.g. "#fff"

/* ========= Tooltip ========= */
export const tooltipPortal = style({
  position: 'absolute',
  transform: 'translate(-50%, -100%)',
  background: '#4E4E4E',
  border: `1.5px solid ${tooltipBorderColorVar}`,
  borderRadius: 10,
  padding: '12px 20px',
  zIndex: 999999,
  minWidth: 200,
  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
  whiteSpace: 'nowrap',
  pointerEvents: 'auto',
});

export const tooltipArrow = style({
  position: 'absolute',
  bottom: -7,
  left: '50%',
  transform: 'translateX(-50%) rotate(45deg)',
  width: 12,
  height: 12,
  background: '#4E4E4E',
  borderRight: `1.5px solid ${tooltipBorderColorVar}`,
  borderBottom: `1.5px solid ${tooltipBorderColorVar}`,
});

export const tooltipText = style({
  fontSize: 12,
  color: '#ffffff',
  fontWeight: 500,
});

/* ========= Formula tooltip content ========= */
export const formulaWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});

export const formulaColumn = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const formulaNumerator = style({
  fontSize: 8.5,
  color: tooltipBorderColorVar,
  fontWeight: 500,
  paddingBottom: 5,
  borderBottom: `2px solid ${tooltipBorderColorVar}`,
  display: 'block',
  textAlign: 'center',
  letterSpacing: 0.2,
});

export const formulaDenominator = style({
  fontSize: 8.5,
  color: tooltipBorderColorVar,
  fontWeight: 500,
  paddingTop: 5,
  display: 'block',
  textAlign: 'center',
  letterSpacing: 0.2,
});

export const formulaMultiplier = style({
  fontSize: 11.5,
  fontWeight: 550,
  color: tooltipBorderColorVar,
  flexShrink: 0,
});

/* ========= Info button ========= */
export const infoButton = style({
  background: 'transparent',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  lineHeight: 1,
  flexShrink: 0,
  border: 'none',
});

export const infoButtonWrapper = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
});

/* ========= Category badge ========= */
export const categoryBadge = style({
  display: 'inline-block',
  padding: '2px 14px',
  borderRadius: 4,
  backgroundColor: badgeBgVar,
  color: badgeColorVar,
  fontWeight: 500,
  minWidth: 60,
  textAlign: 'center',
});

export const categoryBadgeWhite = style({
  display: 'inline-block',
  padding: '2px 14px',
  borderRadius: 4,
  backgroundColor: '#ffffff',
  color: '#000000',
  border: '1px solid #ccc',
  fontWeight: 500,
  minWidth: 60,
  textAlign: 'center',
});

export const categoryWithIcon = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
});

export const boldText = style({
  fontWeight: 'bold',
});

/* ========= Layout wrappers ========= */
export const ARLayoutWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '85%',
  marginLeft: '5px',
});

export const ARLayoutTabsWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '5px',
  zIndex: 200,
});

export const ToggleViewBtnWrapper = style({
  position: 'absolute',
  right: '35px',
  zoom: 0.6 as any, // zoom is non-standard; keep as-is
  zIndex: 0,
  marginTop: '-10px',
});

export const HorizontalViewWrapper = style({
  display: 'flex',
  width: '100%',
});

export const ARTableWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '10px',
  marginBottom: '20px',
  height: '100%',
});

export const ARAllomentSection = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxHeight: '100%',
});

export const ARTableHeader = style({
  fontSize: '13px',
  fontWeight: 500,
  margin: '15px 25px 0px',
  height: '35px',
});

/* ========= Availability bar ========= */
export const ARAvailabiltyCellRendererWrapper = style({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ARAvailabiltyCellRenderer = style({
  position: 'relative',
  height: '100%',
  maxHeight: '15px',
  width: '45px',
  maxWidth: '45px',
  background: '#DEDEDE 0% 0% no-repeat padding-box',

  '::before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    maxWidth: '45px',
    width: progressVar, // <— runtime %
    background:
      'transparent linear-gradient(270deg, #EB73B3 0%, #820F4C 100%) 0% 0% no-repeat padding-box',
  },

  selectors: {
    '&[data-theme="REGALBLAZE"]::before': {
      background:
        'transparent linear-gradient(270deg, #FCA311 0%, #CB830E 100%) 0% 0% no-repeat padding-box',
    },
  },
});

/* ========= Category chips ========= */
export const CategoryCellRendererWrapper = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const CategoryCellRendererChip = style({
  width: '18px',
  minWidth: '18px',
  height: '18px',
  display: 'flex',
  fontSize: '8px',
  fontFamily: 'Roboto',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '5px',
  backgroundColor: chipBgVar,
  color: chipColorVar,
  borderRadius: '4px',
  boxShadow: '0px 4px 5px #00000043',
});

/* ========= Tooltips ========= */
export const AvailabilityToolTipWrapper = style({
  height: '27px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black',
  color: 'white',
  padding: '15px',
  borderRadius: '4px',
  fontSize: '9px',
});

export const CategoryToolTipWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '150px',
  borderRadius: '4px',
  overflow: 'hidden',
});

export const CategoryToolTipSection = style({
  width: '100%',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: sectionBgVar,
  color: sectionColorVar,
});

export const CategoryToolTipSectionHeader = style({
  fontWeight: 500,
  width: '100%',
  fontSize: '10px',
  textAlign: 'center',
  fontFamily: 'Roboto',
});

export const CategoryToolTipSectionDescription = style({
  fontWeight: 300,
  fontSize: '9px',
  textAlign: 'center',
  fontFamily: 'Roboto',
  marginTop: '5px',
});

/* ========= Lock button ========= */
export const LockBtnWrapper = style({
  position: 'relative',
  zIndex: 300,
});

export const LocktBtnContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  width: '75px',
});

export const LockBtn = style({
  height: '20px',
  width: '20px',
  cursor: 'pointer',
});

export const LockLabel = style({
  fontSize: '12px',
});

/* ========= Vertical view helpers ========= */
export const VerticalViewLeftTableWrapper = style({
  display: 'flex',
  height: '95%',
  width: '100%',
  paddingRight: '10px',
});

/* ========= Small utility classes (to replace common inline) ========= */
export const noMargin = style({ margin: '0' });
export const zoom06 = style({ zoom: 0.6 as any });
export const zoom07 = style({ zoom: 0.7 as any });
export const paginationWrap = style({ zoom: 0.7 as any, margin: '0px -15px 20px -15px' });
export const paginationWrapTight = style({ zoom: 0.7 as any, margin: '0px -15px' });
export const mt20pb20 = style({ marginTop: '20px', paddingBottom: '20px' });
