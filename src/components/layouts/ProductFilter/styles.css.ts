import { style } from '@vanilla-extract/css';
import * as globalStyles from '../../../styles/global'
import * as gridSystem from '../../../styles/gridSystem.css'

const laptopRange = `screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`;

export const productFilter = style({
  backgroundColor: globalStyles.white,
  flex: '1 0 32%',
  width: '100%',
  paddingRight: '20px',
  borderRight: '1px solid #d8d8d8',
  '@media': {
    [laptopRange]: { paddingRight: '12px' },
  },
});

export const productFilterText = style({
  fontSize: '2rem',
  lineHeight: '2.6rem',
  fontWeight: 500,
  paddingLeft: '18px',
  '@media': {
    [laptopRange]: { fontSize: '1.6rem', lineHeight: '100%' },
  },
});

export const productFilterHeader = style({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '14px',
  '@media': {
    [laptopRange]: { paddingBottom: '8px' },
  },
});

export const productFilterImg = style({
  width: '34px',
  '@media': {
    [laptopRange]: { width: '22px' },
  },
});

export const productBoxSelect = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'start',
});

export const productFilterFlex = style({
  flex: '0 0 33.33%',
  maxWidth: '33.33%',
  position: 'relative',
});

export const iconLocationBase = style({
  position: 'absolute',
  maxWidth: '16px',
  left: '9px',
  zIndex: 2,
  // top is set inline per-item since it's dynamic
});

export const iconDown = style({
  position: 'absolute',
  zIndex: 2,
  right: '13px',
  top: '19.4px',
});
