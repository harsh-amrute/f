// styles.css.ts
import { style } from '@vanilla-extract/css';

export const Container = style({
  display: 'flex',
  flexDirection: 'column',
});

export const PanelGridWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const PanelGrid = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '80px',
  marginBottom: '5rem',
});

export const QuickFilterHeader = style({
  width: '205px',
  textAlign: 'left',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '30px',
  fontFamily: 'Verdana',
  letterSpacing: '0px',
  color: '#000000',
});
