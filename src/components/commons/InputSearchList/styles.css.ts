import { style } from '@vanilla-extract/css';
import * as gridSystem from '../../../styles/gridSystem.css'

const laptopRange = `screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`;

export const searchText = style({
  position: 'relative',
  width: '155px',
  '@media': {
    [laptopRange]: {
      maxWidth: '120px',
    },
  },
});

export const input = style({
  width: '100%',
  padding: '15px',
  boxSizing: 'border-box',
  paddingLeft: '30px',
  borderRadius: '6px',
  border: '1px solid #929292',
  color: '#929292',
  fontSize: '1.2rem',
  outline: 'none',
  selectors: {
    '&[type="date"]::-webkit-calendar-picker-indicator': {
      color: '#d8d8d8',
      opacity: 1,
      display: 'block',
      width: '16px',
      height: '16px',
      borderWidth: 'thin',
      position: 'absolute',
      left: '4px',
    },
  },
  '@media': {
    [laptopRange]: {
      fontSize: '9.8px',
      height: '36px',
      padding: '10px 4px 10px 28px',
    },
  },
});

export const iconLocation = style({
  position: 'absolute',
  maxWidth: '16px',
  margin: '0 0 16px 8px',
  zIndex: 2,
  '@media': {
    [laptopRange]: {
      margin: '0 0 9px 8px',
    },
  },
});
