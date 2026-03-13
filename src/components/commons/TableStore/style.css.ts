import { style } from "@vanilla-extract/css";
import * as globalStyles from "../../../styles/global";
import * as gridSystem from "../../../styles/gridSystem.css";

const laptopRange = `screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`;

export const tableBox = style({
  backgroundColor: globalStyles.white,
  borderRadius: "12px",
  boxShadow: "0px 1px 0px #c4c8d066",
});

export const SCTableInformation = style({
  display: "flex",
  alignItems: "center",
  paddingBottom: "20px",
});

export const SCTableStyle = style({
  paddingLeft: "16px",
  paddingRight: "32px",
});

export const SCTableStyleText = style({
  fontSize: "1rem",
  color: globalStyles.white,
});

export const SCTableStyleTextSpan = style({
  fontSize: "1.2rem",
  color: globalStyles.black,
  fontWeight: 500,
  maxWidth: "130px",
  display: "block",
});

export const SCTableList = style({
  display: "flex",
  margin: 0,
  padding: 0,
});

export const SCTableItem = style({
  display: "block",
  listStyle: "none",
  padding: "0 30px",
  borderLeft: "1px solid #f5f6fa",
});

export const SCTableItemName = style({
  fontSize: "1.4rem",
  color: globalStyles.black,
  fontWeight: 300,
});

export const SCTableItemValue = style({
  fontSize: "1.6rem",
  color: globalStyles.black,
  fontWeight: 500,
});

export const tableTab = style({
  borderCollapse: 'collapse',
  borderRadius: '6px',
  width: '100%',
});


export const tableTrHeader = style({
  textAlign: 'left',
  position: 'sticky',
  top: '270px',
  backgroundColor: '#f4f4f4',
  zIndex: 1,
  '@media': { [laptopRange]: { top: '241px' } },
});

export const tableTh = style({
  padding: '14px 10px',
  fontSize: '2rem',
  fontWeight: 500,
  color: globalStyles.black,
  borderCollapse: 'collapse',
  selectors: {
    '&:first-child': { paddingLeft: '30px' },
    '&:last-child': { paddingRight: '30px' },
  },
  '@media': { [laptopRange]: { fontSize: '1.6rem' } },
});

export const tableTitle = style({
  borderRight: '1px solid #d8d8d8',
  paddingRight: '10px',
});

export const SCTableCheckbox = style({
  paddingRight: "10px"
})

export const tableTd = style({
  padding: '6px 10px',
  fontSize: '1.4rem',
  fontWeight: 500,
  color: globalStyles.black,
  selectors: {
    '&:first-child': { paddingLeft: '30px' },
  },
});

export const tableTdCenter = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '6px 30px 10px 12px',
  fontSize: '1.4rem',
  fontWeight: 500,
  color: globalStyles.black,
});

export const SCButtonChecBox = style({
  display: "flex",
  justifyContent: "flex-start",
  paddingTop: "28px"
}) 


export const tableTrValue = style({
  borderTop: '1px solid #d8d8d8',
  selectors: {
    '&:nth-child(odd)': { backgroundColor: globalStyles.backgroundRowTable },
  },
});

