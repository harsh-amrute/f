// styles.css.ts
import { style } from '@vanilla-extract/css';
import * as gridSystem from '../../../../../../styles/gridSystem.css';

/* top taskbar */
export const SCTaskBarContainer = style({
  // marginTop: '5px',
  paddingLeft: '10px',
  display: 'flex',
  alignItems: 'center',
  // marginBottom: '20px',
  marginLeft: '20px',
  justifyContent: 'space-between',
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]: {
      // TS-friendly cast; zoom is non-standard
      zoom: 0.7 as unknown as string | number,
    },
    [`screen and (min-width: ${gridSystem.size.desktop})`]: {
      zoom: 1 as unknown as string | number,
    },
  },
});

export const SCGoBackContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  whiteSpace: 'nowrap', // replaces text-wrap: nowrap
  width: 'max-content',
});

export const SCGoBackText = style({
  fontWeight: 500,
  fontSize: '20px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#000000',
});

export const SCViewContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  overflow: 'hidden',
});

export const SCViewContainerWithBg = style({
  display: 'flex',
  flexDirection: 'column',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '-5px 4px 10px #8584843F',
  borderRadius: '5px',
  padding: '5px',
  justifyContent: 'center',
  alignItems: 'center',
  width: '82px',
  height: '58px',
  fontSize: '13px',
  minWidth: '95px',
  cursor: 'pointer',
});

export const SCViewBackground = style({
  display: 'flex',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '-5px 4px 10px #8584843F',
  borderRadius: '5px',
  padding: '10px',
  minWidth: '170px',
  fontSize: '13px',
  // height: '58px',
});

export const SCVerticalDivider = style({
  width: '0.5px',
  backgroundColor: '#C6C6C6', // #6C696A
  height: '40px',
  marginRight: '8px',
  marginLeft: '8px',
  alignItems: 'center',
});

export const SCViewImage = style({
  width: '38px',
  height: '20px',
  marginBottom: '7px',
  cursor: 'pointer',
});

export const SCCustomActionsContainer = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  justifyContent: 'flex-end',
  // width: '100%',
});

export const SCTaskFilterContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '30px',
  maxWidth: '40%',
  alignItems: 'center',
});

export const ReleaseText = style({
  // display: 'flex',
  height: '100%',
  width: '15000px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '10px',
  fontSize: '2.2em',
});

export const LastRunDateHeader = style({
  fontSize: '20px',
  fontWeight: 500,
});
