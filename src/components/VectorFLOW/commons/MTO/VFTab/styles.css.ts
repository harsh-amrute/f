import { style, globalStyle } from '@vanilla-extract/css';
import * as globalStyles from '../../../../../styles/global'
import * as GridSystem from '../../../../../styles/gridSystem.css'



/* ── Shells ─────────────────────────────────────────────── */

export const sctabArea = style({
  display: 'flow-root',
  position: 'relative',
  height: '100%',
});

export const sctabHeader = style({
  display: 'flex',
  alignItems: 'center',
  placeContent: 'space-between',
  overflow: 'overlay',
});

export const zoom08 = style({ zoom: 0.8 });

/* scrollbar (header) */
globalStyle(`${sctabHeader}::-webkit-scrollbar`, {
  width: 7,
  height: 5,
});
globalStyle(`${sctabHeader}::-webkit-scrollbar-track`, {
  borderRadius: 30,
  opacity: 1 as unknown as number,
});
globalStyle(`${sctabHeader}::-webkit-scrollbar-thumb`, {
  width: 7,
  background: '#CBCBCB 0% 0% no-repeat padding-box',
  boxShadow: '0px 6px 9px #41414129',
  borderRadius: 30,
  opacity: 1 as unknown as number,
});

export const sctabHeaderLeft = style({
  display: 'flex',
  position: 'relative',
  zIndex: 1,
});

export const sctabBody = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  background: '#ffffff 0% 0% no-repeat padding-box',
  border: '0.5px solid #cccccc',
  borderRadius: '0px 15px 15px 15px',
  paddingBottom: 10,
});

export const sctabContent = style({
  marginLeft: 60,
  marginRight: 30,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

/* ── Title (status-driven by composing classes) ─────────── */

export const sctabTitleBase = style({
  marginRight: 50,
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: 16,
  whiteSpace: 'nowrap',
});

export const sctabTitleDim = style({ color: '#6C696A' });      // default
export const sctabTitleLight = style({ color: '#FFFFFF' });    // active/completed

/* ── Button (compose status/theme/margin) ───────────────── */

export const sctabButtonBase = style({
  opacity: 1,
  minHeight: 60,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.6rem',
  position: 'relative',
  marginLeft: 0,
  paddingLeft: 0,
  cursor: 'default',

  selectors: {
    '&::before': {
      border: '0.5px solid #cccccc',
      content: '',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      borderBottom: 'none',
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      boxShadow: '0px 5px 25px #9d9d9d29',
      transform: 'scale(1.2, 1.3) perspective(0.5em) rotateX(2.5deg)',
      transformOrigin: 'bottom left',
      background: 'white',
    },
  },

  '@media': {
    'screen and (min-width: 1024px) and (max-width: 1440px)': {
      fontSize: '1.2rem',
      height: '3.5vw',
    },
  },
});

/* status */
export const sctabButtonActiveText = style({ color: '#FFFFFF' });
export const sctabButtonCompleted = style({
  selectors: { '&::before': { background: '#898989' } },
});
// default uses the base (white ::before)

/* theme (apply only when active, compose with sctabButtonActiveText) */
export const sctabButtonActiveRegalblaze = style({
  selectors: {
    '&::before': {
      background:
        'transparent linear-gradient(261deg, #FCA311 0%, #CB830E 100%) 0% 0% no-repeat padding-box',
    },
  },
});
export const sctabButtonActiveDefaultTheme = style({
  selectors: {
    '&::before': {
      background:
        'linear-gradient(74deg, rgb(130, 15, 76) 0%, rgb(188, 61, 129) 100%) 0% 0% no-repeat padding-box',
    },
  },
});

/* margin-left variant */
export const sctabButtonWithMarLeft = style({
  marginLeft: '-1.5em',
  paddingLeft: '1.5em',
  '@media': {
    'screen and (min-width: 1024px) and (max-width: 1440px)': {
      marginLeft: '-2.5em',
    },
  },
});
