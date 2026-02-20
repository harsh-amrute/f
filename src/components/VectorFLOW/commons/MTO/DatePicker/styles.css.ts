import { style } from '@vanilla-extract/css';

export const datePickerContainer = style({
  width: '200px',
  height: '43px',
});

export const dateInput = style({
  width: '100%',
  height: '100%',
  textAlign: 'left',
  letterSpacing: '0px',
  color: '#000',
  fontSize: '18px',
  padding: '4px',
  fontWeight: 'bold',
  fontFamily: 'Roboto',
  border: '0.5px solid #acacac',
  borderRadius: '5px',
  selectors: {
    '&::-webkit-calendar-picker-indicator': {},
  },
});
