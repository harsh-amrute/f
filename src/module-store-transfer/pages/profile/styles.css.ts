import { style } from '@vanilla-extract/css';
import * as globalStyles from '../../../styles/global';

/* Top card */
export const profileOverView = style({
  background: (globalStyles as any).white ?? '#fff',
  marginBottom: '20px',
  borderRadius: '12px',
  boxShadow: '0px 10px 20px #c4c8d066',
  border: '1px solid #cecece',
});

/* Header pad: avatar + name */
export const profilePad = style({
  display: 'flex',
  alignItems: 'center',
  padding: '18px 50px'
});

export const profileImg = style({
  borderRadius: '50%',
  border: `3px solid ${(globalStyles as any).white ?? '#fff'}`,
  boxShadow: '0px 10px 20px #c4c8d066',
  width: '70px',
  height: '70px',
  padding: '4px',
  maxWidth: '95px',
});

export const profileName = style({
  fontSize: '1.8rem',
  fontWeight: 500,
  paddingLeft: '30px',
});

/* Tabs + actions row */
export const tabsWrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  background: 'white',
  padding: '8px',
  borderTop: '1px solid #cecece',
  borderLeft: '1px solid #cecece',
  borderRight: '1px solid #cecece',
  borderRadius: '12px 12px 0px 0px',
});

/* (If you re-enable the buttons, this wraps them) */
export const tabsAction = style({
  display: 'flex',
  gap: '15px',
  margin: '0 10px 10px 0',
});

/* Optional extras kept from original file (in case other screens import them) */
export const profileTab = style({ padding: '0 50px' });

export const overviewTab = style({
  fontSize: '1.8rem',
  fontWeight: 500,
  marginRight: '40px',
  color: (globalStyles as any).mainColor ?? '#000',
  borderBottom: `1px solid ${(globalStyles as any).mainColor ?? '#000'}`,
  cursor: 'pointer',
});

export const subTitleBox = style({
  borderBottom: `1px solid ${(globalStyles as any).secondaryColor ?? '#999'}`,
});

export const subTitlePad = style({ padding: '34px 50px 20px 50px' });

export const subTitleSpan = style({
  fontSize: '2rem',
  fontWeight: 500,
  lineHeight: '2.6rem',
});

export const overviewInfo = style({ padding: '34px 50px 24px 50px' });

export const overviewItem = style({
  borderBottom: `1px dashed ${(globalStyles as any).secondaryColor ?? '#999'}`,
  padding: '16px 0 20px',
  display: 'flex',
  alignItems: 'center',
  selectors: {
    '&:last-child': {
      border: 'unset',
      padding: '16px 0 0',
    },
  },
});

export const overviewItemTitle = style({
  fontSize: '2rem',
  color: (globalStyles as any).secondaryColor ?? '#999',
  fontWeight: 500,
  flex: '0 0 30%',
});

export const overViewSignItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px dashed ${(globalStyles as any).secondaryColor ?? '#999'}`,
  padding: '16px 0 20px',
  selectors: {
    '&:last-child': {
      border: 'unset',
      padding: '16px 0 0',
    },
  },
});

export const buttonSignIn = style({
  borderRadius: '4px',
  color: (globalStyles as any).secondaryColor ?? '#999',
  background: (globalStyles as any).gray ?? '#f5f5f5',
  padding: '14px',
  fontSize: '2rem',
  width: '192px',
});

export const boxChangePassword = style({
  display: 'flex',
  alignItems: 'center',
  paddingTop: '50px',
});

export const changePasswordLabel = style({
  fontSize: '2rem',
  fontWeight: 500,
  display: 'block',
  paddingBottom: '14px',
});

export const changePasswordInput = style({
  background: (globalStyles as any).beige ?? '#f6f2ea',
  height: '36px',
  borderRadius: '6px',
  outline: 'none',
  border: 'none',
  fontSize: '1.8rem',
  padding: '0 16px',
  width: '100%',
});

export const changePasswordBox = style({
  paddingRight: '50px',
  flex: '1 0 25%',
});

export const changePasswordFlex = style({
  display: 'flex',
  alignItems: 'center',
  marginTop: '30px',
});

export const changePasswordSubmit = style({
  fontSize: '1.8rem',
  fontWeight: 300,
  color: (globalStyles as any).white ?? '#fff',
  padding: '14px 20px',
  borderRadius: '6px',
  background: 'linear-gradient(180deg, #bc3d81 0%, #820f4c 100%)',
});

export const changePasswordCancel = style({
  background: 'transparent',
  color: '#121418',
  fontSize: '1.6rem',
  marginLeft: '45px',
});

export const tabs = style({ padding: '0 50px' });
