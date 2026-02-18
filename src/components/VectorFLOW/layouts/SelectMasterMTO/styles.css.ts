// styles.css.ts
import { style } from '@vanilla-extract/css';

export const Container = style({
  display: 'flex',
  flexDirection: 'column',
});

export const SCButtonContainer = style({
  display: 'flex',
  gap: '25px',
  marginTop: '72px',
});

export const SCCardContainer = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '30px',
  marginTop: '46px',
  overflowX: 'auto', // was 'overlay'
  paddingBottom: '2px',
  scrollbarGutter: 'stable',
  selectors: {
    '&::-webkit-scrollbar': { width: '7px', height: '8px' },
    '&::-webkit-scrollbar-track': { borderRadius: '30px', opacity: '1' },
    '&::-webkit-scrollbar-thumb': {
      width: '7px',
      background: '#D1D1D1 0% 0% no-repeat padding-box',
      boxShadow: '0px 6px 9px #41414129',
      borderRadius: '30px',
      opacity: '1',
    },
  },
});

export const SCLoaderContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '85%',
});

export const PanelGridWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const PanelGrid = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '111px',
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
