import { style } from '@vanilla-extract/css';
import * as globalStyles from '../../../styles/global';
import * as GridSystem from '../../../styles/gridSystem.css';

export const scProfileOverView = style({
  background: (globalStyles as any).white ?? '#fff',
  marginBottom: '20px',
  borderRadius: '6px',
});

export const subTitleBox = style({
  borderBottom: `1px solid ${(globalStyles as any).secondaryColor ?? '#9e9e9e'}`,
});

export const subTitlePad = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '17px 50px',
});

export const subTitleSpan = style({
  fontSize: '2rem',
  fontWeight: 500,
  lineHeight: '2.6rem',
  '@media': {
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { fontSize: '1.6rem' },
  },
});

export const subTitlePadItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  columnGap: '2rem',
});

export const itemBtn = style({
  width: '164px',
  height: '50px',
  '@media': {
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { width: '150px', height: '40px' },
  },
});
