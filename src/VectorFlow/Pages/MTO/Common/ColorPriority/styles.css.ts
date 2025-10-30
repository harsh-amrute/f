// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';

export const gradientVar = createVar();

export const colorPriorityCellRenderer = style({
  position: 'relative',
  height: '70%',
  width: '90%',
  maxWidth: '150px',
  background: '#000000 0% 0% no-repeat padding-box',

  // default gradient (all white) in case none is provided
  vars: { [gradientVar]: 'linear-gradient(to right, #FFFFFF 0% 100%)' },

  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: '100%',
      background: gradientVar,
    },
  },
});

export const colorPriorityCellRendererWrapper = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
