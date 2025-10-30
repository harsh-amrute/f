import { style, createVar } from '@vanilla-extract/css';

/* Runtime vars (set from your component via assignInlineVars) */
export const tabTextColorVar = createVar();
export const tabZIndexVar = createVar();
export const tabMarginLeftVar = createVar();
export const tabPaddingLeftVar = createVar();
export const tabBgVar = createVar();

export const accentVar = createVar(); // for InputCheckBox accent-color

export const BPRViewTableHeaderTab = style({
  color: tabTextColorVar,
  opacity: 1,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.6rem',
  position: 'relative',
  zIndex: tabZIndexVar as unknown as number, // TS-friendly
  marginLeft: tabMarginLeftVar,
  paddingLeft: tabPaddingLeftVar,
  padding: '0px 20px',
  cursor: 'pointer',
  height: 40,

  selectors: {
    '&::before': {
      border: '1px solid #cccccc',
      content: '',
      position: 'absolute',
      top: 0,
      right: 0,
      height: 40,
      bottom: 0,
      left: 0,
      zIndex: -1,
      borderBottom: 'none',
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      background: tabBgVar,
      boxShadow: '0px 5px 25px #9d9d9d29',
      transform: 'scale(1.2, 1.3) perspective(1em) rotateX(2.5deg)',
      transformOrigin: 'bottom left',
    },
  },
});

export const SCTabHeader = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  overflow: 'hidden',
  marginLeft: 2,

  selectors: {
    '&::-webkit-scrollbar': { width: 7, height: 5 },
    '&::-webkit-scrollbar-track': {
      borderRadius: 30,
      opacity: 1,
    },
    '&::-webkit-scrollbar-thumb': {
      width: 7,
      background: '#CBCBCB 0% 0% no-repeat padding-box',
      boxShadow: '0px 6px 9px #41414129',
      borderRadius: 30,
      opacity: 1,
    },
  },
});

export const InputCheckBox = style({
  display: 'inline',
  width: '2em',
  height: '2rem',
  accentColor: accentVar,
});
