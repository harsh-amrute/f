import { style, createVar } from '@vanilla-extract/css';
import * as gridSystem from '../../../../../styles/gridSystem.css';

/* ===== runtime vars for dynamic styling ===== */
export const availabilityPercentVar = createVar();   // e.g. "60%" (string)
export const availabilityGradientVar = createVar();  // e.g. "linear-gradient(...)"

/* ===== wrappers & layout ===== */

export const EnquiryWrapper = style({
  '@media': {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        marginLeft: '-40px',
        marginTop: '-40px',
        padding: '20px',
      },
  },
});

export const EditFilterBtn = style({
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  boxShadow: 'rgba(139, 139, 139, 0.255) -3px 3px 12px',
  backgroundImage: 'linear-gradient(to right, #8d2e61, #bb3f81, #db6ba7)',
  cursor: 'pointer',
});

export const CardBtn = style({
  padding: '12px',
  cursor: 'pointer',
  boxShadow: 'rgba(139, 139, 139, 0.255) -3px 3px 12px',
});

export const RmUICont = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '20px',
  width: '50%',
  minWidth: '300px',
  borderRadius: '4px',
  boxShadow: 'rgba(139, 139, 139, 0.255) -3px 3px 12px',
  '@media': {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '20px',
        minWidth: '300px',
        borderRadius: '4px',
        boxShadow: 'rgba(139, 139, 139, 0.255) -3px 3px 12px',
        backgroundColor: '#f2f2f2',
      },
  },
});

export const HeaderWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 20px',
  background: 'white',
  gap: '1rem',
  '@media': {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px 20px',
        alignItems: 'center',
        backgroundColor: 'white',
      },
  },
});

export const RmHeading = style({
  color: '#000000',
  fontFamily: 'Roboto',
  fontSize: '12px',
});

export const VerticalLine = style({
  width: '1px',
  backgroundColor: '#d4d4d4',
});

export const ValueWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 40px',
  backgroundColor: '#f2f2f2',
  borderRadius: '0 0 4px 4px',
  fontSize: '12px',
  '@media': {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'spaceBetween',
        padding: '10px 40px',
        borderRadius: '0 0 4px 4px',
      },
  },
});

export const HighlightedValue = style({
  color: '#bb3f81',
  fontWeight: 500,
});

export const EstimatedWrapper = style({
  position: 'relative',
  margin: '1rem 0',
  overflowY: 'scroll',
});

export const BlurCover = style({
  position: 'absolute',
  top: 0,
  // left intentionally omitted in original; width handles centering
  background: '#80808080',
  width: '98%',
  height: '100%',
  borderRadius: '20px',
});

export const CardCover = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const DashedCard = style({
  padding: '50px 40px',
  border: '1px dashed #bb3f81',
  borderRadius: '10px',
  background: 'white',
  opacity: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const MessageText = style({
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 300,
  fontSize: '16px',
  color: '#000000',
  letterSpacing: '0',
  lineHeight: '30px',
});

export const TabSwitchContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '50px',
  '@media': {
    [`(min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
        width: '100%',
      },
  },
});

export const TabSwitchHeading = style({
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: '14px',
  color: '#000000',
  letterSpacing: '0',
  lineHeight: '24px',
});

export const TabsWrapper = style({
  width: '18%',
});

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
  zoom: '0.6' as unknown as string,
  zIndex: 0,
  marginTop: '-10px',
});

export const BTRTableWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '20px',
  marginBottom: '20px',
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

/* progress bar with dynamic fill */
export const BTRAvailabiltyCellRenderer = style({
  position: 'relative',
  height: '100%',
  maxHeight: '15px',
  width: '45px',
  background: '#DEDEDE 0% 0% no-repeat padding-box',
  '::before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: availabilityPercentVar,         // e.g. "60%"
    background: availabilityGradientVar,   // linear-gradient(...)
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
