import { style, globalStyle } from '@vanilla-extract/css';
import { ColorsMTO } from '../../Common/Colors';

export const MaterialRequiremetLayout = style({
  // original styled had invalid quoted values; leaving sizing to inline styles you pass
  // add sizes if you really need them:
  // height: '1200px',
  // width: '1200px',
});

export const MaterialRequirementTest = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: ColorsMTO.Black.code,
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 300,
  fontSize: '16px',
  lineHeight: '24px',
  opacity: 1,
  flexDirection: 'row',
});

export const MaterialRequirementDate = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '15px',
  lineHeight: '24px',
  paddingLeft: '8px',
});

export const MaterialRequirementHeading = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 0 10px',
});

export const TableWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  // selectors: {
  //   '& > .ag-theme-alpine': {
  //     margin: 0,
  //     height: '100%',
  //   },
  //   '& > div[data-testid="vf_pagination"]': {
  //     marginTop: '0 !important',
  //   },
  // },
});
// ✅ Global descendant rules (no :global() needed)
globalStyle(`${TableWrapper} > .ag-theme-alpine`, {
  margin: 0,
  height: '100%',
});

globalStyle(`${TableWrapper} > div[data-testid="vf_pagination"]`, {
  marginTop: '0 !important',
});
