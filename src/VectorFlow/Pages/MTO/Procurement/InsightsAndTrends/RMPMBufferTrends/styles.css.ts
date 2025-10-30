import { style, createVar } from '@vanilla-extract/css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ColorsMTO } from '../../../Common/Colors';

/* runtime var for the availability % (width of ::before) */
const vAvailPct = createVar();
/** helper to set availability percent (0–100) */
// export const setAvailPct = (value: number | string) =>
//   assignInlineVars({ [vAvailPct]: typeof value === 'number' ? `${value}%` : value });

export const BTRLayoutWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '90%',
});

export const BTRLayoutTabsWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '25px',
  zIndex: 200,
});

export const ToggleViewBtnWrapper = style({
  position: 'absolute',
  right: '35px',
  zoom: 0.6 as unknown as string | number, // non-standard; keep behavior
  zIndex: 0,
  marginTop: '-10px',
});

export const BTRTableWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

export const BTRAllomentSection = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxHeight: '100%',
});

export const BTRTableHeader = style({
  fontSize: '13px',
  fontWeight: 500,
  margin: '0 25px',
});

export const BTRAvailabiltyCellRendererWrapper = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const BTRAvailabiltyCellRenderer = style({
  position: 'relative',
  height: '100%',
  maxHeight: '15px',
  width: '45px',
  background: '#DEDEDE 0% 0% no-repeat padding-box',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: vAvailPct,
      background:
        'transparent linear-gradient(270deg, #EB73B3 0%, #820F4C 100%) 0% 0% no-repeat padding-box',
    },
  },
});

export const CategoryCellRendererWrapper = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const CategoryCellRendererChip = style({
  width: '18px',
  minWidth: '18px',
  height: '18px',
  display: 'flex',
  fontSize: '8px',
  fontFamily: 'Roboto',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '5px',
  backgroundColor: '#355FD3',
  borderRadius: '4px',
  boxShadow: '0px 4px 5px #00000043',
});

export const AvailabilityToolTipWrapper = style({
  height: '27px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black',
  color: 'white',
  padding: '15px',
  borderRadius: '4px',
  fontSize: '9px',
});

export const CategoryToolTipWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '150px',
  borderRadius: '4px',
  overflow: 'hidden',
});

export const CategoryToolTipSection = style({
  width: '100%',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
});

export const CategoryToolTipSectionHeader = style({
  fontWeight: 500,
  width: '100%',
  fontSize: '10px',
  textAlign: 'center',
  fontFamily: 'Roboto',
});

export const CategoryToolTipSectionDescription = style({
  fontWeight: 300,
  fontSize: '9px',
  textAlign: 'center',
  fontFamily: 'Roboto',
  marginTop: '5px',
});

export const LockBtnWrapper = style({
  position: 'relative',
  zIndex: 300,
});

export const LockBtn = style({
  position: 'absolute',
  height: '25px',
  width: '25px',
  cursor: 'pointer',
});

export const HorizontalViewWrapper = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  marginTop: '10px',
  paddingBottom: '20px',
  paddingTop: '10px',
});

export const Separator = style({
  height: '100%',
  width: '15px',
  margin: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
});

export const ViewSlider = style({
  height: '80%',
  width: '100%',
  background: ColorsMTO.LightGrey.code,
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
});
