// styles.css.ts
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
});

export const panelGridWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const panelGrid = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '80px',
  marginBottom: '5rem',
});

export const quickFilterHeader = style({
  width: '205px',
  textAlign: 'left',
  fontVariant: 'normal',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '30px',
  fontFamily: 'Verdana',
  letterSpacing: '0px',
  color: '#000000',
});

// optional helper if you want a padded container class instead of inline style
export const padded = style({
  padding: '20px',
});
