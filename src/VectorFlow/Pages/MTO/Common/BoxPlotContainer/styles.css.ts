import { style, createVar } from '@vanilla-extract/css';
import { ColorsMTO } from '../Colors';

/* ========= runtime vars & helpers ========= */
export const vChartHeight = createVar();
export const vAvailPct = createVar();

// export const scChartVars = (height?: string) =>
//   assignInlineVars({ [vChartHeight]: height ?? 'auto' });

// export const setAvailPct = (value: number | string) =>
//   assignInlineVars({ [vAvailPct]: typeof value === 'number' ? `${value}%` : value });

/* ========= top section ========= */
export const CapsuleWrapper = style({
  width: '100%',
  // maxWidth: '120px',
  marginLeft: 'auto',
});

export const ChartWrapper = style({
  position: 'relative',
  width: '100%',
  // paddingTop: '-100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // height: '90%',
});

export const SCChartContainer = style({
  padding: '5px',
  borderRadius: '12px',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  // boxShadow: '-5px 5px 25px #86868633',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  margin: '20px',
  // height: '547px',
  height: vChartHeight,
});

export const SCChartLayout = style({
  overflowY: 'scroll',
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  // marginTop: '30px',
});

export const SCChartHeaderContainer = style({
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '54px',
});

export const SCChartSliderContainer = style({
  display: 'flex',
  justifyContent: 'center', // kept last value (space-between was overwritten)
  gap: '13px',
  alignItems: 'center',
  height: '55px',
});

export const SCChartMainContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const HorizonHeader = style({
  textAlign: 'center',
  fontWeight: 500,
  fontSize: '10px',
});

export const SCChartHeader = style({
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '21px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#000000',
});

export const SCHorizontalDivider = style({
  width: '100%',
  border: 'none',
  borderTop: '1px solid #B2B2B2',
});

/* ========= BTR layout bits ========= */
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
  zoom: 0.6 as unknown as string | number,
  zIndex: 0,
  marginTop: '-10px',
});

export const BTRTableWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // (original had both 400px and 100%; last wins)
  width: '100%',
  marginTop: '20px',
  marginBottom: '20px',
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
