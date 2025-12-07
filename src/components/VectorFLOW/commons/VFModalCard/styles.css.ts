// styles.css.ts
import { style, globalStyle, createVar } from '@vanilla-extract/css';

/* ====== Runtime variables (for dynamic props) ====== */
export const headerBgVar = createVar();
export const headerTextVar = createVar();
export const contentLRVar = createVar();
export const contentBgVar = createVar();

export const heightVar = createVar();
export const headerBorderRadius = createVar();
export const headerPadding = createVar();
/* ====== Replacing style.ts (styled-components) ====== */

export const VFHeaderWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: heightVar,
  borderRadius: headerBorderRadius,
  // dynamic color via CSS var; default to white if not provided at runtime
  backgroundColor: headerBgVar,
  padding: headerPadding
});

export const absolutePosition = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
})

export const SCModalContent = style({
  overflowY: 'hidden',
  zIndex: 10,
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

export const SCTextTitle = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  flexDirection: 'row',
  marginLeft: '14px',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 500,
  // fontSize: '18px',
  lineHeight: '21px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: headerTextVar,
});

export const SCCloseModal = style({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 300,
  fontSize: '2.6rem',
  cursor: 'pointer',
});

export const SCWrapperContent = style({
  paddingTop: 0,
  paddingBottom: 0,
  vars: {
    [contentLRVar]: '74px',
    [contentBgVar]: 'white',
  },
  // left/right padding via CSS var, default 74px
  paddingLeft: contentLRVar,
  paddingRight: contentLRVar,
  textAlign: 'left',
  height: 'auto',
  backgroundColor: contentBgVar,
  borderRadius: '0 0 12px 12px',
});

export const SCHeader = style({
  display: 'flex',
  flexDirection: 'row',
});

/* ====== Replacing styles.css (local CSS file) ====== */

export const contentFile = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100px',
  border: '0.5px dashed #707070',
  borderRadius: '4px',
  cursor: 'pointer',
  '@media': {
    'screen and (min-width: 1024px) and (max-width: 1440px)': {
      height: '85px',
    },
  },
});

export const modalTitleForced = style({
  padding: '12px 18px',
  justifyContent: 'center',
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '12px 12px 0 0',
  display: 'flex',
  fontSize: '2.2rem',
  fontWeight: 500,
  margin: 0,
  textAlign: 'left'

});

export const modalForcedBlock = style({
  width: 'auto',
  maxWidth: '90%',
  minWidth: '500px',
  borderRadius: '12px',
  backgroundColor: 'white'
});

/* If you had other global classes (e.g., transition utilities),
   keep their existing CSS or migrate similarly with style()/globalStyle(). */
