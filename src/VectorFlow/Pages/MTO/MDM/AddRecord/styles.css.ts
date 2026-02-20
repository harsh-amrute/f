import { style } from '@vanilla-extract/css';

export const submitDataTextContainer = style({
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 300,
    fontSize: '15px',
    lineHeight: '22px',
    fontFamily: 'Roboto',
    color: '#000000',
    opacity: 1,
    display: 'flex',           // fixed 'dispay' typo
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: '26px',         // (was 42 in comment)
    marginBottom: '32px',      // (was 44 in comment)
  });
  
  export const submitDataButtonWrapper = style({
    marginBottom: '59px',      // (was 87 in comment)
    marginLeft: '100px',       // (was 192 in comment)
    marginRight: '100px',      // (was 189 in comment)
    display: 'flex',
    flexDirection: 'row',
    gap: '28px',
  });
  