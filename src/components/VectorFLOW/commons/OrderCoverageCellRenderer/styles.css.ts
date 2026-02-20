import { style, createVar } from '@vanilla-extract/css';


export const colorVar = createVar();

export const orderCoverageCellRendererWrapper = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const coverageColorBox = style({
    width: '16px',
    height: '16px',
    backgroundColor: colorVar,
    marginRight: '5px',
  });
  