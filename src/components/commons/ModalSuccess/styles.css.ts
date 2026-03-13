import { style, createVar } from '@vanilla-extract/css';
import * as gridSystem from "../../../styles/gridSystem.css";
import * as globalStyles from "../../../styles/global";

/** Runtime vars */
export const btnGradientVar = createVar();   // for primary button background
export const btnBackColorVar = createVar();  // for secondary text color

export const SCModalContent = style({
  overflowY: 'hidden',
  zIndex: 10,
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

export const SCModalBox = style({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100%',
});

export const SCWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '454px',
});

export const SCImg = style({
  marginBottom: '25px',
});

export const SCTextAbove = style({
  fontSize: '2rem',
  '@media': {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: '1.6rem' },
  },
});

export const SCTextBelow = style({
  fontSize: '2rem',
  '@media': {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: '1.6rem' },
  },
});

export const SCBtnClose = style({
  // defaults; override background via btnGradientVar at runtime
  vars: { [btnGradientVar]: globalStyles.NOIRFUSION.colorButton },
  color: '#ffffff',
  width: '222px',
  height: '46px',
  background: btnGradientVar,
  boxShadow: '0px 6px 25px #00000029',
  borderRadius: '6px',
  margin: '20px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Roboto',
  fontWeight: 300,
  fontSize: '20px',
  lineHeight: '26px',
  '@media': {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      {
        fontSize: '1.6rem',
        width: '185px',
        height: '35px',
      },
  },
});

export const SCBtnBack = style({
  // defaults; override via btnBackColorVar
  vars: { [btnBackColorVar]: globalStyles.NOIRFUSION.color4 },
  color: btnBackColorVar,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Roboto',
  fontWeight: 300,
  fontSize: '18px',
  lineHeight: '24px',
  '@media': {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: '1.6rem' },
  },
});
