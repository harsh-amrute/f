// styles.css.ts
import { style, globalStyle } from "@vanilla-extract/css";

/* ---------- layout containers ---------- */
export const contentWrapper = style({
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 6px #00000029',
  border: '1px solid #E0E0E0',
  borderRadius: '8px',
  opacity: '1',
  marginLeft: '25px',
  marginBottom: '40px',
});

export const textContainer = style({
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: '40px',
  fontFamily: 'Roboto',
});

export const textFilterWrapper = style({
  padding: '19px 25px 29px 25px',
  display: 'flex',
  justifyContent: 'space-between',
});

/* ---------- card shell ---------- */
export const masterGroupCard = style({
  width: '440px',
  height: '586px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 6px #00000029',
  borderRadius: '7px',
  opacity: '1',
  marginLeft: '30px',
  // zoom is not typed; cast to any to satisfy TS
  zoom: 0.8 as any,
  overflow: 'hidden',
  paddingBottom: '15px',
});

export const masterGroupCardHeader = style({
  height: '60px',
  width: '100%',
  background: 'black',
  borderRadius: '8px 8px 0px 0px',
  opacity: '1',
});

export const masterGroupCardHeaderText = style({
  textAlign: 'center',
  paddingTop: '10px',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '40px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: 'white',
  opacity: '1',
  height: '70px',
});

export const buttonWrapper = style({
  marginTop: '12px',
  marginLeft: '54px',
  marginBottom: '12px',
  display: 'flex',
});

/* ---------- inner card rows ---------- */
export const masterGroupCardContent = style({
  width: '100%',
  height: '80px',
  marginTop: '16px',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  border: '1px solid #EBEBEB',
  borderRadius: '7px',
  display: 'flex',
  flexDirection: 'row',
  textAlign: 'left',
  color: '#6C696A',
  cursor: 'pointer',
});

export const masterGroupCardImage = style({
  width: '65px',
  height: '65px',
  background: '#F4F4F4 0% 0% no-repeat padding-box',
  marginTop: '7px',
  marginLeft: '8px',
  opacity: '1',
  borderRadius: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '7px',
});

export const masterGroupCardText = style({
  textAlign: 'left',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '40px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#6C696A',
  opacity: '1',
  paddingLeft: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

/* ---------- outer container + scrollbars ---------- */
export const masterGroupCardContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflowY: 'scroll',
  paddingBottom: '15px',
  marginLeft: '30px',
  marginRight: '30px',
  borderRadius: '8px',
});

export const customScrollbar = style({
  overflow: 'auto',
  width: '100%',
  paddingLeft: '10px',
  paddingRight: '10px',
});

/* WebKit scrollbar styling for both scrollable areas */
globalStyle(`${masterGroupCardContainer}::-webkit-scrollbar, ${customScrollbar}::-webkit-scrollbar`, {
  width: '7px',
  height: '8px',
});
globalStyle(`${masterGroupCardContainer}::-webkit-scrollbar-track, ${customScrollbar}::-webkit-scrollbar-track`, {
  borderRadius: '30px',
  opacity: '1',
});
globalStyle(`${masterGroupCardContainer}::-webkit-scrollbar-thumb, ${customScrollbar}::-webkit-scrollbar-thumb`, {
  width: '7px',
  background: '#CBCBCB 0% 0% no-repeat padding-box',
  boxShadow: '0px 6px 9px #41414129',
  borderRadius: '30px',
  opacity: '1',
});
