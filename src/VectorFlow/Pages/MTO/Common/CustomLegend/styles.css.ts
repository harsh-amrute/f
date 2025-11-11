// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';

// dynamic vars
export const opacityVar = createVar();
export const backgroundVar = createVar();

// wrappers
export const customLegendWrapper = style({
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  background: 'white',
  paddingTop: '5px',
  height: '20px',
  maxHeight: '20px',
});

export const legendOptionsWrapper = style({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  opacity: opacityVar,
});

export const legendOptions = style({
  display: 'inline-block',
  width: '14px',
  height: '14px',
  marginRight: '6px',
  borderRadius: '3px',
  background: backgroundVar,
});

export const legendOptionsName = style({
  fontSize: '12px',
});
