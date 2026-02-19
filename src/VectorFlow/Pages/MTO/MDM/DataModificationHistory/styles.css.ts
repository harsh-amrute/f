// styles.css.ts
import { style } from '@vanilla-extract/css';

export const filterWrapper = style({
  height: '122px',
  backgroundColor: 'white',
  display: 'flex',
});

export const selectSearchWrapper = style({
  width: '70%',
  display: 'flex',
  flexDirection: 'row',
});

export const buttonWrapper = style({
  width: '30%',
  gap: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: '10px',
});

export const verticalDivider = style({
  width: '1px',
  backgroundColor: '#D0D0D0',
  height: '95px',
  marginTop: '13px',
  marginRight: '20px',
  marginLeft: '20px',
});

export const selectWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
});

export const textWrapper = style({
  display: 'flex',
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  marginLeft: '23px',
  gap: '10px',
  alignItems: 'center',
  marginTop: '20px',
});

export const dropDownWrapper = style({
  marginLeft: '23px',
  paddingTop: '10px',
  height: '50px',
});

export const dualDropDownWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: '10px',
  gap: '20px',
});

export const arrowWrapper = style({
  justifyContent: 'center',
  width: '15%',
  paddingTop: '43px',
  display: 'flex',
  alignItems: 'center',
});
