import { style } from '@vanilla-extract/css';
import * as gridSystem from '../../../styles/gridSystem.css'

const laptopRange = `screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`;

export const selectOption = style({
  position: 'relative',
});

export const selectIcon = style({
  position: 'absolute',
  top: '50%',
  color: '#333',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  left: '8px',
});

// Base select style (common)
export const selectBase = style({
  paddingRight: '3px',
  borderRadius: '6px',
  height: '46px',
  width: '100%',
  fontSize: '12px',
  fontFamily: 'Roboto',
  lineHeight: '1.8rem',
  selectors: {
    '&:focus-visible': { outline: 'none' },
  },
  '@media': {
    [laptopRange]: { height: '36px' },
  },
});

// Variants (compose with selectBase as needed)
export const selectWithTargetIcon = style({
  // icons === true (icon string is 'target')
  paddingLeft: '28px',
  border: '1px solid #D8D8D8',
  backgroundColor: '',
  color: '',
});

export const selectPlainNoIcon = style({
  // icon === true (no icon provided)
  paddingLeft: '4px',
  border: '1px solid #929292',
  color: '#929292',
  backgroundColor: '#F9F9F9',
});

export const selectWithOtherIcon = style({
  // default when there IS an icon but not 'target'
  paddingLeft: '24px',
  border: '1px solid #D8D8D8',
});
