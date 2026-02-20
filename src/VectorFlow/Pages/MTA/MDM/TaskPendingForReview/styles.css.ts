// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';

/* ===== runtime vars (set via assignInlineVars) ===== */
export const radioAccentVar = createVar();     // RadioButtonGroup accent-color
export const headerBtnBgVar = createVar();     // TaskPendingActionHeaderButton bg

/* ===== page scaffolding ===== */
export const TaskPendingWrapper = style({
  width: '100%',
  height: '95%',
  marginBottom: '100px',
  paddingLeft: '50px',
  paddingTop: '20px',
});

export const ActionRendererWrapper = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
});

export const ActionButtonWrapper = style({
  height: '20px',
  width: '20px',
  cursor: 'pointer',
});

export const ActionHeaderWrapper = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-around',
});

export const ActionHeaderContent = style({
  fontSize: '16px',
  display: 'flex',
  padding: '5px',
  marginBottom: '5px',
});

export const LinkWrapper = style({
  width: '100%',
  height: '100%',
});

/* ===== radios & footer ===== */
export const RadioContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
});

export const RadioButtonGroup = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '21px',
  fontFamily: 'Roboto',
  marginBottom: '20px',
  accentColor: radioAccentVar,
  display: 'flex',
  gap: '8px',
  marginTop: '20px',
  alignItems: 'center',
});

export const SubmitButtonWrapper = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginLeft: '-73px',
  marginRight: '-73px',
  borderTop: 'dashed 1px gray',
  padding: '10px 20px 10px 10px',
});

/* ===== misc copy blocks ===== */
export const DeleteFileModalText = style({
  textAlign: 'left',
  marginTop: '40px',
  marginBottom: '40px',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#000000',
  marginRight: '221px',
  marginLeft: '162px',
});

export const ButtonWrapper = style({
  marginBottom: '100px',
  display: 'flex',
  flexDirection: 'row',
  gap: '35px',
});

export const ApproveModalText = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  fontFamily: 'Roboto',
  marginRight: '186px',
  marginLeft: '161px',
  marginBottom: '30px',
  marginTop: '37px',
  textAlign: 'center',
});

export const ApproveButtonWrapper = style({
  alignItems: 'center',
  marginBottom: '85px',
  marginRight: '221px',
  marginLeft: '221px',
});

/* ===== header action button ===== */
export const TaskPendingActionHeaderButton = style({
  backgroundColor: headerBtnBgVar,
  height: '30px',
  width: '80px',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  fontWeight: 300,
  color: '#FFFFFF',
  padding: '15px 7px',
  border: 'none',
  boxShadow: '-5px 4px 10px #919191B3',
  zoom: 0.9 as any,
  selectors: {
    '&:disabled': { cursor: 'not-allowed' },
  },
});

/* ===== visual separator ===== */
export const ButtonSeperator = style({
  width: '1.5px',
  height: '30px',
  backgroundColor: '#898989',
  margin: '0 10px',
});

/* ===== small helpers for labels if you want them ===== */
export const radioLabel = style({
  fontSize: '15px',
  fontWeight: 300,
});
export const mt10 = style({ marginTop: '10px' });
