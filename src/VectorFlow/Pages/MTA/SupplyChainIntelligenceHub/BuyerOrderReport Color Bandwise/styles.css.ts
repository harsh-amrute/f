// styles.css.ts
import { style } from '@vanilla-extract/css';

export const BORLayout = style({
  // marginTop: '25px',
  marginLeft: '15px',
});

export const BORTaskBar = style({
  position: 'fixed',
  width: '97%',
  right: 0,
  top: '13vh',
  height: '70px',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '20px',
  padding: '16px',
  zIndex: 2,
  transition: '0.3s ease 0s',
});

export const BORColorCellRendererWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '97px',
  height: '34px',
  boxShadow: '0px 6px 12px #8D8D8D29',
  borderRadius: '4px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});
