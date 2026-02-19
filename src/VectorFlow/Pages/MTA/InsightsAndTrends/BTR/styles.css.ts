// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';

/* ========= Runtime vars ========= */
export const progressVar = createVar();     // e.g. "65%"
export const chipBgVar = createVar();       // e.g. "#355FD3"
export const chipColorVar = createVar();    // e.g. "#fff"
export const sectionBgVar = createVar();    // tooltip section bg
export const sectionColorVar = createVar(); // tooltip section color

/* ========= Layout wrappers ========= */
export const BTRLayoutWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '85%',
  marginLeft: '5px',
});

export const BTRLayoutTabsWrapper = style({
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

export const BTRTableWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '10px',
  marginBottom: '20px',
  height: '100%',
});

export const BTRAllomentSection = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxHeight: '100%',
});

export const BTRTableHeader = style({
  fontSize: '13px',
  fontWeight: 500,
  margin: '15px 25px 0px',
  height: '35px',
});

/* ========= Availability bar ========= */
export const BTRAvailabiltyCellRendererWrapper = style({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const BTRAvailabiltyCellRenderer = style({
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
