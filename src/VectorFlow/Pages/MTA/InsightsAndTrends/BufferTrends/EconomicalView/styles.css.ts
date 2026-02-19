// styles.css.ts
import { style } from '@vanilla-extract/css';

export const capsuleWrapper = style({
  width: '100%',
  marginLeft: 'auto',
  // If you want the old commented rules, uncomment as needed:
  // maxWidth: '120px',
});

export const chartWrapper = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // paddingTop: '-100px',
  // height: '90%',
});
