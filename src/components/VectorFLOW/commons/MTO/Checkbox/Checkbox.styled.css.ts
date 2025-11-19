import { style, createVar } from '@vanilla-extract/css';

/** runtime var for the themed accent color (color4) */
export const accentVar = createVar();
export const checkedBgVar = createVar();

export const MTOCheckBox = style({
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '2px',
  border: '2px solid rgb(148, 154, 171)',
  backgroundColor: 'white',
  appearance: 'none',
  cursor: 'pointer',

  selectors: {
    '&:checked': {
      backgroundColor: accentVar,
      borderColor: accentVar,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundImage: checkedBgVar,
    },
  },
});
