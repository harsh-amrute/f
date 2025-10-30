import { style } from '@vanilla-extract/css';

export const ModalBody = style({
  minHeight: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 100px',
});

export const FilterContainer = style({
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '422px',
  borderRadius: '8px',
  fontSize: '1.5rem',
  boxShadow: '0px 6px 12px #95959529',
});

export const FilterHeading = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 500,
  fontSize: '20px',
  color: '#313131',
  letterSpacing: 0,
  lineHeight: '24px',
});

export const HorizontalLine = style({
  height: '2px',
  width: '100%',
  backgroundColor: '#F4F4F4',
});

export const FilterAccordianWrapper = style({
  width: '100%',
});

export const OptionsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '20px',
});

export const Option = style({
  width: '100%',
  display: 'flex',
  gap: '10px',
  padding: '5px 10px',
  fontFamily: 'Roboto',
  fontWeight: 300,
  fontSize: '16px',
  letterSpacing: '0px',
  color: '#313131',
});

export const AccordianContainer = style({
  padding: '20px',
  borderTop: '3px solid rgb(244, 244, 244)',
});

export const ButtonFilterWrapper = style({
  borderTop: '1px dashed #A0A0A0',
  opacity: 1, // fixed invalid "1px"
  height: '109px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F4F4F4',
  borderRadius: '0 0 12px 12px',
});

export const ButtonContainer = style({
  marginRight: '46px',
  gap: '40px',
  display: 'flex',
});
