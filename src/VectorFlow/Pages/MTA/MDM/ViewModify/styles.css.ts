// styles.css.ts
import { style, keyframes, createVar } from '@vanilla-extract/css';

/* ---------- dynamic vars ---------- */
export const quickFilterStateColorVar = createVar();

/* ---------- misc ---------- */
const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(10px)' },
  to: { opacity: 1, transform: 'translateY(0px)' },
});

/* ---------- container ---------- */
export const SCContainer = style({
  marginLeft: 50,
  paddingBottom: 100, // for taskbar
  height: 'calc(100% - 15px)', // 15px for header
});

/* ---------- filter row ---------- */
export const SCFilterContainer = style({
  margin: 10,
  display: 'flex',
  flexDirection: 'row',
});

export const SCFilterControls = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  width: '100%',
  border: '0.5px solid rgba(112,112,112,0.46)',
  paddingTop: 19,
  paddingBottom: 14,
  paddingLeft: 9,
  paddingRight: 9,
  borderRadius: 6,
});

export const SCLegend = style({
  position: 'absolute',
  left: 16,
  top: -10,
  backgroundColor: 'white',
  fontFamily: 'Roboto',
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 300,
  padding: '0 5px',
  color: '#313131',
});

export const SCFilterAddControls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  paddingTop: 19,
  paddingBottom: 14,
  paddingLeft: 9,
  paddingRight: 9,
});

export const SCFilterAddButtonWrapper = style({
  height: 56,
  width: 56,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const SCFilterAddButton = style({
  width: 30,
  height: 30,
  padding: 5,
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '50%',
  cursor: 'pointer',
});

export const SCFilterSeperator = style({
  width: 0,
  outline: '1px solid #D0D0D0',
});

export const SCFilterButtonGroup = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
  height: 56,
  paddingTop: 19,
  paddingBottom: 14,
  paddingLeft: 9,
  paddingRight: 9,
});

/* ---------- taskbar ---------- */
export const TaskBarContainer = style({
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  position: 'fixed',
  right: 0,
  width: '97%',
  bottom: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 38,
  paddingRight: 30,
  gap: 30,
  transition: '0.3s ease 0s',
});

export const VFTaskBarButtonGroup = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 20,
});

/* ---------- upload modal ---------- */
export const UploadModalWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '26px 0 40px 0',
});

export const UploadModalSection = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  marginRight: 32,
});

export const UploadModalRadioWrapper = style({
  width: '100%',
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const UploadBorderContainer = style({
  border: '1.5px dashed #707070',
  width: 393,
  height: 212,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
});

export const UploadModalContent = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  height: 152,
  width: 349,
  boxShadow: '5px 5px 30px #6E6B6B29',
  borderRadius: 6,
});

export const TextContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 4,
  flexDirection: 'column',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '14px',
  fontFamily: 'Roboto',
});

export const InputWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
});

export const UploadModalInput = style({
  width: '100%',
  border: 'none',
  outline: 'none',
  color: '#939393',
  opacity: 1,
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 300,
  fontSize: 12,
  lineHeight: '14px',
  fontFamily: 'Roboto',
  paddingLeft: 15,
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '-2px -2px 15px #A2A0A017',
});

export const UploadModalText = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '19px',
  fontFamily: 'Roboto',
});

export const UploadFileText = style([
  UploadModalText,
  {
    width: '100%',
    paddingLeft: 16,
    paddingBottom: 5,
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 7,
    lineHeight: '8px',
  },
]);

/* ---------- seasonality quick filters ---------- */
export const SeasonalityQuickFilterWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginBottom: 10,
});

export const SeasonalityQuickFilterHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 700,
  fontSize: 20,
  lineHeight: '24px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#000',
});

export const SeasonalityQuickFilter = style({
  marginLeft: 20,
  paddingLeft: 10,
  position: 'relative',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 70,
  height: 30,
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
  transition: '0.3s ease-in-out',
  borderRadius: 4,
  color: '#929292',
  overflow: 'hidden',
  cursor: 'pointer',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      left: 0,
      top: 0,
      height: 30,
      width: 8,
      backgroundColor: `var(${quickFilterStateColorVar})`,
      transition: '0.3s ease-out',
    },
    '&[data-active="true"]': { color: 'white' },
    '&[data-active="true"]::before': { width: '100%' },
  },
});

export const SeasonalityQuickFilterText = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 300,
  fontSize: 12,
  lineHeight: '14px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: 'inherit',
  zIndex: 100,
  transition: '0.1s ease-out',
});

/* ---------- submit modal ---------- */
export const SubmitDataTextContainer = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 300,
  fontSize: 14,
  lineHeight: '12px',
  fontFamily: 'Roboto',
  color: '#000',
  opacity: 1,
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  marginTop: 26,
});

export const SubmitDataButtonWrapper = style({
  marginLeft: -140,
  marginRight: -140,
  padding: '15px 20px 0 10px',
  display: 'flex',
  justifyContent: 'flex-end',
  borderTop: 'dashed 1px gray',
  flexDirection: 'row',
  gap: 28,
  transform: 'scale(0.8)',
});

/* ---------- error tooltip ---------- */
export const ConflictErrorToolTipWrapper = style({
  position: 'absolute',
  minWidth: 140,
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  padding: 5,
  zIndex: 10000,
  borderRadius: 4,
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  animation: `${fadeIn} 0.2s ease-in`,
  maxHeight: 250,
});

export const ConflictErrorToolTipSection = style({
  width: '100%',
  marginBottom: 5,
  borderBottom: '1px solid gray',
  fontSize: 10,
});

export const ConflictErrorText = style({
  textAlign: 'left',
});

export const ToolTipTriangle = style({
  position: 'absolute',
  left: '45%',
  height: 0,
  borderStyle: 'solid',
  borderWidth: '0 7.5px 13px 7.5px',
  borderColor: 'transparent transparent white transparent',
});
