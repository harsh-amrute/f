import { style, globalStyle } from '@vanilla-extract/css';
import * as globalStyles from '../../../styles/global'
import * as GridSystem from '../../../styles/gridSystem.css'

const laptopRange = `screen and (min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`;

/* Container */
export const tableBox = style({
  backgroundColor: globalStyles.white,
  borderRadius: '12px',
  boxShadow: '0px 10px 20px #c4c8d066',
  maxHeight: '550px',
  overflowY: 'auto',
  '@media': { [laptopRange]: { maxHeight: '380px' } },
});

/* (Optional) header/info blocks — included for parity */
export const tableInformation = style({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '20px',
});

export const tableStyle = style({
  paddingLeft: '16px',
  paddingRight: '32px',
});

export const tableStyleText = style({
  fontSize: '1rem',
  color: globalStyles.black,
});

export const tableStyleTextSpan = style({
  fontSize: '1.2rem',
  color: globalStyles.black,
  fontWeight: 500,
  maxWidth: '130px',
  display: 'block',
});

export const tableList = style({
  display: 'flex',
  margin: 0,
  padding: 0,
});

export const tableItem = style({
  display: 'block',
  listStyle: 'none',
  padding: '0 30px',
  borderLeft: '1px solid #f5f6fa',
});

export const tableItemName = style({
  fontSize: '1.4rem',
  color: globalStyles.black,
  fontWeight: 300,
});

export const tableItemValue = style({
  fontSize: '1.6rem',
  color: globalStyles.black,
  fontWeight: 500,
});

/* Table-like bits (used inside VFTable cells as wrappers) */
export const tableTab = style({
  borderCollapse: 'collapse',
  borderRadius: '6px',
});

export const tableTbody = style({
  selectors: {
    '&:nth-child(even)': { backgroundColor: globalStyles.backgroundRowTable },
  },
});

export const tableTr = style({
  textAlign: 'left',
  position: 'sticky',
  top: '-1px',
  zIndex: 1,
  background: 'white',
});

export const tableTh = style({
  padding: '14px 10px',
  fontSize: '2rem',
  fontWeight: 500,
  color: globalStyles.black,
  borderCollapse: 'collapse',
  selectors: {
    '&:first-child': { paddingLeft: '50px' },
    '&:last-child': { paddingRight: '50px' },
  },
  '@media': { [laptopRange]: { fontSize: '1.6rem' } },
});

export const tableTitle = style({
  borderRight: '1px solid #d8d8d8',
  paddingRight: '10px',
});

export const tableCheckbox = style({
  paddingRight: '10px',
});

export const tableTd = style({
  padding: '6px 10px 0',
  fontSize: '1.4rem',
  fontWeight: 500,
  color: globalStyles.black,
  selectors: {
    '&:first-child': { paddingLeft: '50px' },
    '&:nth-child(4)': { whiteSpace: 'nowrap' },
  },
});

export const tableTdCenter = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '6px 12px',
  fontSize: '1.4rem',
  fontWeight: 500,
  color: globalStyles.black,
  paddingRight: '50px',
});

export const buttonCheckBox = style({
  display: 'flex',
  justifyContent: 'flex-start',
  paddingTop: '28px',
});

export const tableTrValue = style({
  borderTop: '1px solid #d8d8d8',
  selectors: {
    '&:nth-child(even)': { backgroundColor: globalStyles.backgroundRowTable },
  },
});

/* Icons */
export const iconWrapper = style({
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  // selectors: {
  //   '& .user-manage-tooltip': { zIndex: 1 },
  // },
});
// ⬇️ descendant rule goes here instead of `selectors: { '& .user-manage-tooltip': ... }`
globalStyle(`${iconWrapper} .user-manage-tooltip`, {
  zIndex: 1,
});

export const icon = style({
  // (kept for parity; no direct rules needed)
});


// export const SCIcon = styke styled.img`
//   .circle {
//     fill: red;
//   }
// `
