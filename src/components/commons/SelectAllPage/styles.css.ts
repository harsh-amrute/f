import { style, createVar } from '@vanilla-extract/css';

export const textAllColorVar = createVar(); // dynamic link color

export const SwapperText = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.6rem',
  marginBottom: '10px',
});

export const TextInPage = style({});

export const TextAllPage = style({
  padding: '10px',
  color: textAllColorVar,            // set via assignInlineVars from the component
  cursor: 'pointer',
  fontWeight: 500,
  borderRadius: '5px',
  transition: 'all .2s ease',
  selectors: {
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
});
