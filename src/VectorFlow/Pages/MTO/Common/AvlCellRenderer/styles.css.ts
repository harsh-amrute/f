// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';

export const fillWidthVar = createVar();
export const gradientVar = createVar();

export const availabiltyCellRendererWrapper = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  paddingRight: '40px',
  alignItems: 'center',
  // NOTE: 'right' isn't a valid justifyContent value; using flex-end.
  justifyContent: 'flex-end',
  gap: '10px',
});

export const availabiltyCellRenderer = style({
  position: 'relative',
  height: '100%',
  maxHeight: '15px',
  width: '45px',
  maxWidth: '45px',
  background: '#DEDEDE 0% 0% no-repeat padding-box',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      maxWidth: '45px',
      width: fillWidthVar,
      background: gradientVar,
    },
  },
});
