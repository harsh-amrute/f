/* styles.css.ts */
import { style, styleVariants, keyframes, createVar, globalStyle } from '@vanilla-extract/css';

/* -------- shared -------- */
const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});
export const borderColorVar = createVar();
export const circleBgVar = createVar();
export const circleTransformVar = createVar();
export const textColorVar = createVar();
export const textTransformVar = createVar();
export const daySelectedBgVar = createVar();
export const accentColorVar = createVar();
export const cursorDisableVar = createVar();
export const opacityDisableVar = createVar();

/* runtime vars */
export const quickFilterColorVar = createVar();

/* -------- containers / layout -------- */
export const SCContainer = style({
  marginLeft: 50,
  paddingBottom: 70,
  height: '90%',
});

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
  background: '#FFFFFF',
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '50%',
  cursor: 'pointer',
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

export const TaskBarContainer = style({
  background: '#FFFFFF',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  position: 'fixed',
  right: 0,
  width: '97%',
  bottom: 0,
  height: 95,
  paddingTop: 23,
  paddingBottom: 22,
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

/* -------- Modal/upload block -------- */
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
  background: '#FFFFFF',
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
  background: '#FFFFFF',
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

/* -------- Quick filter -------- */
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
  color: '#000000',
});

/* base button */
export const SeasonalityQuickFilter = style({
  marginLeft: 20,
  position: 'relative',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 90,
  height: 40,
  transition: '0.3s ease-in-out',
  borderRadius: 6,
  overflow: 'hidden',
  cursor: 'pointer',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 8, // default (inactive)
      backgroundColor: `var(${quickFilterColorVar})`,
      transition: '0.3s ease-in-out',
    },
  },
});

/* active/inactive modifiers */
export const quickFilterState = styleVariants({
  active: {
    color: 'white',
    border: '1px solid transparent',
    selectors: {
      '&::before': { width: '100%' }, // ✅ use &::before
    },
  },
  inactive: {
    color: '#929292',
    border: '1px solid #929292',
    selectors: {
      '&::before': { width: 8 }, // ✅ use &::before
    },
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

/* -------- submit modals -------- */
export const SubmitDataTextContainer = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 300,
  fontSize: 14,
  lineHeight: '12px',
  fontFamily: 'Roboto',
  color: '#000000',
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
  borderTop: '1px dashed gray',
  flexDirection: 'row',
  gap: 28,
  transform: 'scale(0.8)',
});

/* -------- conflict tooltip -------- */
export const ConflictErrorToolTipWrapper = style({
  position: 'fixed',
  minWidth: 140,
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  padding: 5,
  zIndex: 10000,
  borderRadius: 4,
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  animation: `${fadeIn} 0.2s ease-in`,
  transform: 'translateX(-50%)',
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

/* -------- MTO / PooGI blocks -------- */
export const MTOPoogiTableContainer = style({
  display: 'flex',
  width: '100%',
  // selectors: {
  //   '& > .ag-theme-alpine': { width: '100% !important' },
  // },
});
// Style the AG Grid element inside your container
globalStyle(`${MTOPoogiTableContainer} > .ag-theme-alpine`, {
  width: '100% !important',
});

export const PoogiSection = style({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
});

export const PoogiAddButtonWrapper = style({
  display: 'flex',
  gap: '40%',
});

/* -------- Toggle (active/inactive classes) -------- */
export const toggleContainerBase = style({
  display: 'flex',
  alignItems: 'center',
  width: '120px',
  padding: '5px',
  borderRadius: '50px',
  cursor: `${cursorDisableVar}`,
  opacity: `${opacityDisableVar}`,
  border: `3px solid ${borderColorVar}`,
  transition: 'background-color 0.3s ease',
});

export const toggleContainerActive = style({
  borderColor: '#800040',
});

export const toggleContainerInactive = style({
  borderColor: '#a0a0a0',
});

export const toggleCircleBase = style({
  width: 28,
  height: 28,
  borderRadius: '50%',
  backgroundColor: circleBgVar,
  transform: circleTransformVar,
  transition: 'transform 0.3s ease, background-color 0.3s ease',
});

export const toggleCircleActive = style({
  backgroundColor: '#800040',
  transform: 'translateX(70px)',
});

export const toggleCircleInactive = style({
  backgroundColor: '#a0a0a0',
  transform: 'translateX(5px)',
});

export const toggleTextBase = style({
    marginLeft: '8px',
    fontSize: '14px',
    fontWeight: 600,
    transform: textTransformVar,
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    color: textColorVar,
  });

export const toggleTextActive = style({
  color: '#800040',
  transform: 'translateX(-25px)',
});

export const toggleTextInactive = style({
  color: '#808080',
  transform: 'translateX(0)',
});



//DatePickForm.tsx
export const formContainer = style({
  width: "400px",
  position: "relative",
  padding: "20px",
  backgroundColor: "#f4f4f4",
  borderRadius: "8px",
  fontFamily: "Arial, sans-serif",
});

export const radioGroup = style({
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
});

export const radioLabel = style({
  display: "flex",
  alignItems: "center",
  marginRight: "20px",
  fontSize: "14px",
  /* `accent-color` in JS = accentColor */
  accentColor: accentColorVar,
});

export const radioInput = style({
  marginRight: "8px",
});

export const labelEl = style({
  display: "block",
  marginBottom: "8px",
  fontSize: "14px",
  color: "#666",
});

export const inputEl = style({
  width: "100%",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  marginBottom: "20px",
});

export const selectEl = style({
  width: "100%",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  marginBottom: "20px",
});

export const inputWrapper = style({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  justifyContent: "space-between",
});

export const daysContainer = style({
  display: "flex",
  marginBottom: "20px",
});

export const dayBtn = style({
  flex: "1",
  padding: "10px 10px",
  fontSize: "14px",
  border: "none",
  borderRadius: "4px",
  background: "white",
  color: "#333",
  cursor: "pointer",
  marginRight: "4px",
  selectors: { "&:last-child": { marginRight: 0 } },
});

export const dayBtnSelected = style({
  background: daySelectedBgVar,
  color: "#fff",
});

export const footerText = style({
  fontSize: "12px",
  color: "#7e0044",
  textAlign: "left",
  marginTop: "-10px",
});

