// styles.css.ts
import { style } from '@vanilla-extract/css';

/* --- wrapper --- */
export const VFSelectedFiltersWrapper = style({
  overflow: 'auto',
  width: '100%',
  height: '51px',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 6px 12px #95959529',
  borderRadius: '30px',
  marginLeft: 'auto',
});

/* --- placeholder --- */
export const VFSelectedFiltersPlaceHolder = style({
  height: '39px',
  borderRadius: '20px',
  fontWeight: 400,
  display: 'flex',
  alignItems: 'center',
  fontSize: '16px',
  lineHeight: '21px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#313131',
  padding: '5px 15px',
  whiteSpace: 'nowrap',
});

/* --- chip --- */
export const VFSelectedFiltersChip = style({
  height: '39px',
  display: 'flex',
  alignItems: 'center',
  padding: '5px',
  paddingLeft: '10px',
  background: '#F2F2F2 0% 0% no-repeat padding-box',
  borderRadius: '20px',
  marginLeft: '10px',
});

/* --- label --- */
export const VFSelectedFiltersFilterLabel = style({
  fontSize: '16px',
  lineHeight: '21px',
  fontFamily: 'Roboto',
  fontWeight: 300,
  letterSpacing: '0px',
  color: '#313131',
});

/* --- filter content --- */
export const VFSelectedFiltersFilterContent = style({
  display: 'flex',
  flexDirection: 'row',
  padding: '0 10px',
  borderRight: 'solid 2px black',
});

/* --- filter value --- */
export const VFSelectedFiltersFilterValue = style({
  fontSize: '16px',
  lineHeight: '21px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  display: 'flex',
  whiteSpace: 'nowrap',
});

/* --- close icon --- */
export const VFSelectedFiltersFilterCloseIcon = style({
  marginLeft: '5px',
  height: '18px',
  width: '18px',
  borderRadius: '50%',
  border: 'solid 1px black',
  cursor: 'pointer',
});

/* --- horizontal scroller --- */
export const VFFilterScrollBar = style({
  overflowX: 'overlay' as any, // keep original behavior; may be non-standard
  display: 'flex',
  selectors: {
    '&::-webkit-scrollbar': {
      width: '0.2px',
      display: 'none',
    },
  },
});
