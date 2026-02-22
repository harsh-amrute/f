import { style } from '@vanilla-extract/css';

const laptopRange = 'screen and (min-width: 1024px) and (max-width: 1440px)';

export const paginate = style({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const pageItem = style({
  display: 'flex',
  fontSize: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  listStyle: 'none',
  padding: '10px',
  margin: '0 5px',
  borderRadius: '21px',
  width: '42px',
  height: '42px',
  color: 'black',
  cursor: 'pointer',
  '@media': {
    [laptopRange]: { marginBottom: '25px' },
  },
});

export const prevNextItem = style({
  width: '50px',
});

export const selected = style({
  backgroundColor: 'black',
  color: 'white',
});

export const disabledBtn = style({
  color: '#555976',
  opacity: 0.3,
  cursor: 'default',
  pointerEvents: 'none',
});