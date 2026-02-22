import { style, createVar } from '@vanilla-extract/css';

/** Runtime variable for the accent color */
export const accentVar = createVar();

export const MTORadio = style({
  accentColor: accentVar,
  padding: 0,
  margin: 0,
  width: '15px',
  height: '20px',
  cursor: 'pointer',
});

/** Helper to inject the accent color at runtime */
// export const mtoRadioVars = (accentColor: string) =>
//   assignInlineVars({ [accentVar]: accentColor });
