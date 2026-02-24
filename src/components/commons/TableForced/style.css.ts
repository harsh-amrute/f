import { style, createVar } from '@vanilla-extract/css';
import * as globalStyles from '../../../styles/global'
import * as gridSystem from '../../../styles/gridSystem.css'

const laptopRange = `screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`;

/* CSS variable for theme accent (used by button) */
export const buttonAccentVar = createVar();

/* --- Containers / info --- */
export const SCTableBox = style({
  backgroundColor: globalStyles.white,
  borderRadius: '12px',
  padding: '20px',
});

export const SCTableInformation = style({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '20px',
  justifyContent: 'space-between',
});

export const SCTableStyle = style({
  paddingLeft: '16px',
  paddingRight: '32px',
});

export const SCTableStyleText = style({
  fontSize: '1rem',
  color: globalStyles.black,
});

export const SCTableStyleTextSpan = style({
  fontSize: '1.2rem',
  color: globalStyles.black,
  fontWeight: 500,
  maxWidth: '130px',
  display: 'block',
});

/* --- Info list --- */
export const SCTableList = style({
  display: 'flex',
  margin: 0,
  padding: 0,
});

export const SCTableItem = style({
  display: 'block',
  listStyle: 'none',
  padding: '0 30px',
  borderLeft: '1px solid #f5f6fa',
  selectors: {
    '&:nth-child(1)': {
      paddingLeft: 0,
      border: 'unset',
    },
  },
});

export const SCTableItemName = style({
  fontSize: '1.4rem',
  color: globalStyles.black,
  fontWeight: 300,
  '@media': {
    [laptopRange]: { fontSize: '1.2rem' },
  },
});

export const SCTableItemValue = style({
  fontSize: '1.6rem',
  color: globalStyles.black,
  fontWeight: 500,
  '@media': {
    [laptopRange]: { fontSize: '1.4rem' },
  },
});

/* --- Table --- */
export const SCTableTab = style({
  border: '1px solid #d8d8d8',
  borderCollapse: 'collapse',
  borderRadius: '6px',
  width: '100%',
});

export const SCTableTr = style({
  textAlign: 'left',
  selectors: {
    '&:nth-child(even)': {
      backgroundColor: '#f4f4f4',
    },
  },
});

export const SCTableTh = style({
  padding: '6px 12px',
  fontSize: '1.4rem',
  fontWeight: 300,
  color: globalStyles.black,
  border: '1px solid #d8d8d8',
  borderCollapse: 'collapse',
  '@media': {
    [laptopRange]: {
      padding: '6px',
      fontSize: '1.2rem',
    },
  },
});

export const SCTableThItem = style({
  padding: '6px 12px',
  fontSize: '1.4rem',
  width: '80px',
  fontWeight: 300,
  color: globalStyles.black,
  border: '1px solid #d8d8d8',
  borderCollapse: 'collapse',
  '@media': {
    [laptopRange]: {
      padding: '6px',
      fontSize: '1.2rem',
    },
  },
});

export const SCTableCheckbox = style({
  position: 'relative',
  top: '-3px',
});

export const SCTableTd = style({
  padding: '6px 12px',
  borderLeft: '1px solid #d8d8d8',
  fontSize: '1.4rem',
  fontWeight: 500,
  color: globalStyles.black,
  '@media': {
    [laptopRange]: {
      padding: '6px',
      fontSize: '1.2rem',
    },
  },
});

export const SCTableTdDay = style({
  padding: '6px 12px',
  borderLeft: '1px solid #d8d8d8',
  fontSize: '1.4rem',
  fontWeight: 500,
  color: globalStyles.black,
  width: '98px',
  '@media': {
    [laptopRange]: {
      padding: '6px',
      width: '90px',
      fontSize: '1.2rem',
    },
  },
});

/* --- Footer area (button) --- */
export const SCButtonChecBox = style({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: '28px',
});

/* Themed button via CSS var */
export const SCButtonContact = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  borderRadius: '6px',
  border: `1px solid ${buttonAccentVar}`,
  backgroundColor: globalStyles.white,
  padding: '10px 20px',
  color: buttonAccentVar,
  textTransform: 'uppercase',
  fontWeight: 500,
  fontFamily: 'Roboto',
});

export const SCImgContact = style({
  marginRight: '6px',
});

export const SCTextStyle = style({
  position: 'relative',
  top: '1px',
});
