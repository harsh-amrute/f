import { style, createVar } from '@vanilla-extract/css';
import * as globalStyles from "../../../styles/global";
import * as gridSystem from "../../../styles/gridSystem.css";
// import { Link } from "react-router-dom";


// runtime vars
export const wrapperWidthVar = createVar();
export const imgMarginLeftVar = createVar();
export const clientNameMarginLeftVar = createVar();


/* Containers */
export const SCHeaderBox = style({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '30px',
  alignItems: 'center',
  backgroundColor: '#f9f9f9',
});

export const SCHeaderBoxIst = style({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: globalStyles.white,
  marginBottom: '40px',
  padding: '18px',
  borderRadius: '0 0 0 12px',
});

export const SCHeaderText = style({
  fontSize: '2.6rem',
  fontWeight: 500,
  color: globalStyles.black,
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: '1.8rem' },
  },
});

export const SCHeaderContent = style({
  display: 'flex',
  alignItems: 'center',
});

export const SCHeaderWelcome = style({
  fontSize: '2rem',
  color: globalStyles.black,
});

export const SCHeaderName = style({
  fontWeight: 500,
  fontSize: '2rem',
});

export const SCHeaderSubTextIst = style({
  color: '#b4b4b4',
  fontSize: '2rem',
});

/* Export all */
export const SCExportAllBox = style({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const SCExportAllBoxButton = style({
  backgroundColor: globalStyles.white,
  border: '1px solid #11b221',
  borderRadius: '6px',
  padding: '8px 10px',
  display: 'flex',
  alignItems: 'center',
  width: '184px',
  height: '47px',
  justifyContent: 'center',
});

export const SCExportAllBoxSpan = style({
  color: '#11b221',
  fontSize: '1.2rem',
  fontWeight: 600,
  padding: '0 10px',
});

/* Buttons */
const headerBtnBase = {
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '2rem',
  fontWeight: 500,
  padding: '10px 40px',
  color: globalStyles.white as string,
  marginLeft: '30px',
  height: '47px',
  width: '117px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

export const SCHeaderButtonIstGradient = style({
  ...headerBtnBase,
  background: 'linear-gradient(180deg, #bc3d81 0%, #820f4c 100%)',
});

export const SCHeaderButtonIstRegal = style({
  ...headerBtnBase,
  background: globalStyles.chooseThemeColor.REGALBLAZE?.color5,
});

export const SCHeaderButtonIstSaving = style({
  ...headerBtnBase,
  backgroundColor: '#b4b4b4',
});

export const SCHeaderButtonIstDelete = style({
  ...headerBtnBase,
  background: 'transparent',
  border: '1px solid #b4b4b4',
  color: '#b4b4b4',
});

/* Logo / brand area */
export const SCWrapperImg = style({
  position: 'fixed',
  right: 0,
  top: '135px',
  width: wrapperWidthVar,
  height: '55px',
  marginTop: '-22px',
  boxShadow: '0px 6px 9px #00000029',
  borderRadius: '6px 0 0 6px',
  background: '#ffffff 0% 0% no-repeat padding-box',
  cursor: 'pointer',
  transition: globalStyles.customTransition,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
});

export const ClientNameText = style({
  flex: '1',
  whiteSpace: 'nowrap',
  marginLeft: clientNameMarginLeftVar,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  zIndex: 1000,
  fontSize: '1.3rem',
  fontWeight: 500,
  fontFamily: 'Roboto',
});

export const SCImg = style({
  height: '40px',
  zIndex: 1000,
  marginLeft: imgMarginLeftVar,
});
