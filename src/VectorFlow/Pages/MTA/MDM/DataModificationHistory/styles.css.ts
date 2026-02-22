// styles.css.ts
import { style } from '@vanilla-extract/css';

export const FilterWrapper = style({
  height: '122px',
  backgroundColor: 'white',
  display: 'flex',
});

export const SelectSearchWrapper = style({
  width: '80%',
  display: 'flex',
  flexDirection: 'row',
});

export const ButtonWrapper = style({
  width: '20%',
  gap: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: '10px',
});

export const VerticalDivider = style({
  width: '1px',
  backgroundColor: '#D0D0D0',
  height: '95px',
  marginTop: '13px',
  marginRight: '20px',
  marginLeft: '20px',
});

export const SelectWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
});

export const TextWrapper = style({
  display: 'flex',
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '24px',
  marginLeft: '23px',
  gap: '10px',
  alignItems: 'center',
  marginTop: '20px',
});

export const DropDownWrapper = style({
  marginLeft: '23px',
  paddingTop: '10px',
  height: '50px',
});

export const DualDropDownWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: '10px',
  gap: '20px',
});

export const ArroWrapper = style({
  justifyContent: 'center',
  width: '15%',
  paddingTop: '43px',
  display: 'flex',
  alignItems: 'center',
});







