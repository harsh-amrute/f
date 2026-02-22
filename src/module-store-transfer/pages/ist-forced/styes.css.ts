// styles.css.ts
import { style, createVar, globalStyle } from '@vanilla-extract/css';
import * as GridSystem from '../../../styles/gridSystem.css';

/* ------- helpers ------- */
const mqLap_to_LapL = `screen and (min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`;
const mqMaxDesktop = `screen and (max-width: ${GridSystem.size.desktop})`;

/* runtime theme accent (color5) for the two buttons */
export const vAccent = createVar();
export const bg = createVar();
// export const setAccent = (color: string) =>
//   assignInlineVars({ [vAccent]: color });

/* ------- sticky container ------- */
export const SCBoxFilterSticky = style({
  position: 'sticky',
  top: '91px',
  zIndex: 2,
  backgroundColor: '#f9f9f9',
  '@media': { [mqLap_to_LapL]: { top: '69px' } },
});

/* ------- filter box ------- */
export const SCBoxFilter = style({
  display: 'flex',
  columnGap: '20px',
  backgroundColor: bg,
  boxShadow: '0px 10px 20px #c4c8d066',
  borderRadius: '12px',
  padding: '20px',
  width: '100%',
  marginBottom: '20px',
});

/* ------- search input wrapper (icon + inputs) ------- */
export const SCSearchText = style({
  position: 'relative',
  width: '155px',
  // selectors: {
  //   '& input': {
  //     width: '100%',
  //     height: '46px',
  //     padding: '15px',
  //     boxSizing: 'border-box',
  //     paddingLeft: '30px',
  //     borderRadius: '6px',
  //     border: '1px solid #929292',
  //     color: '#929292',
  //     fontSize: '1.2rem',
  //     outline: 'none',
  //   },
  //   [`& input[type="date"]::-webkit-calendar-picker-indicator`]: {
  //     color: '#d8d8d8',
  //     opacity: 1,
  //     display: 'block',
  //     width: '16px',
  //     height: '16px',
  //     borderWidth: 'thin',
  //     position: 'absolute',
  //     left: '4px',
  //   },
  //   '& img': {
  //     position: 'absolute',
  //     left: 0,
  //     top: '5px',
  //     padding: '10px',
  //     color: '#f9f9f9',
  //     width: '35px',
  //     height: '35px',
  //   },
  //   [`@media ${mqLap_to_LapL} & input`]: {
  //     fontSize: '9.8px',
  //     height: '36px',
  //     padding: '10px 4px 10px 28px',
  //   },
  //   [`@media ${mqLap_to_LapL} & img`]: { top: 0 },
  // },
  '@media': { [mqLap_to_LapL]: { maxWidth: '120px' } },
});
// descendants -> globalStyle
globalStyle(`${SCSearchText} input`, {
  width: '100%',
  height: '46px',
  padding: '15px',
  boxSizing: 'border-box',
  paddingLeft: '30px',
  borderRadius: '6px',
  border: '1px solid #929292',
  color: '#929292',
  fontSize: '1.2rem',
  outline: 'none',
  '@media': {
    [mqLap_to_LapL]: { fontSize: '9.8px', height: '36px', padding: '10px 4px 10px 28px' },
  },
});

globalStyle(`${SCSearchText} input[type="date"]::-webkit-calendar-picker-indicator`, {
  color: '#d8d8d8',
  opacity: 1,
  display: 'block',
  width: '16px',
  height: '16px',
  borderWidth: 'thin',
  position: 'absolute',
  left: '4px',
});

globalStyle(`${SCSearchText} img`, {
  position: 'absolute',
  left: 0,
  top: '5px',
  padding: '10px',
  width: '35px',
  height: '35px',
  color: '#f9f9f9',
  '@media': { [mqLap_to_LapL]: { top: 0 } },
});

/* ------- buttons (Filter / Reset) ------- */
export const SCResetFilterBtn = style({
  color: vAccent,
  backgroundColor: '#fefefe',
  padding: '8px 0px',
  borderRadius: '8px',
  fontWeight: 500,
  width: '164px',
  border: '1px solid',
  borderColor: vAccent,
  '@media': { 'screen and (max-width: 1490px)': { width: '100px' } },
});

export const SCFilterBtn = style({
  color: '#fff',
  backgroundColor: vAccent,
  padding: '8px 0px',
  fontSize: '1.6rem',
  borderRadius: '8px',
  width: '164px',
  border: 'none',
  '@media': { 'screen and (max-width: 1490px)': { width: '100px' } },
});

/* wrapper around those two buttons */
export const SCButtonFilter = style({
  paddingTop: '47px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: '1 0 10%',
  gap: '15px',
  textAlign: 'center',
  '@media': { [mqLap_to_LapL]: { paddingTop: '32px' } },
});

/* ------- quick filters row ------- */
export const SCQuickFilters = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  paddingBottom: '20px',
});

export const SCQuickFiltersWrap = style({
  display: 'flex',
  minWidth: '75%',
  gap: '2rem',
  alignItems: 'flex-end',
  '@media': {
    [mqMaxDesktop]: { gap: 0 },
    [mqLap_to_LapL]: { gap: '0.5rem' },
  },
});

/* ------- small containers ------- */
export const SCBoxFilterButton = style({});
export const SCBoxFilterButtonFlex = style({ display: 'flex', alignItems: 'center' });

/* ------- export all ------- */
export const SCExportAllBox = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '40px',
});

export const SCExportAllBoxButton = style({
  backgroundColor: bg,
  border: '1px solid #11b221',
  borderRadius: '6px',
  padding: '8px 10px',
  display: 'flex',
  alignItems: 'center',
  '@media': { [mqLap_to_LapL]: { padding: '4px 10px' } },
});

export const SCExportAllBoxSpan = style({
  color: '#11b221',
  fontSize: '1.3rem',
  fontWeight: 500,
  padding: '0 10px',
  '@media': { [mqLap_to_LapL]: { fontSize: '11px' } },
});

/* ------- icon near inputs (if used separately) ------- */
export const SCIconLocation = style({
  position: 'relative',
  top: '35px',
  maxWidth: '16px',
  left: '8px',
  zIndex: 2,
});
