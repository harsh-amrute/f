// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';

/* ===== runtime vars (set with assignInlineVars) ===== */
export const tipTriangleVar = createVar();        // tooltip arrow color
export const analyticsBgVar = createVar();        // analytics table bg
export const analyticsTextVar = createVar();      // analytics table text color



export const barWidthVar = createVar();           // e.g. '65%'
export const barBgVar = createVar();              // '#F04D4D'
export const tipBgVar = createVar();              // tooltip bg
export const tipTextVar = createVar();            // tooltip text color
export const tipTopVar = createVar();             // e.g. '120px'
export const tipLeftVar = createVar();            // e.g. '240px'



/* ===== cells & renderers ===== */
export const CurrentLocationCellRendererWrapper = style({
  border: '0.5px solid #C6C6C6',
  borderRadius: '2px',
  height: '90%',
  marginTop: '2px',
  width: '90%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const ColorGroupCellRendererWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
});

export const ColorGroupColorCell = style({
  position: 'relative',
  height: '31px',
});

export const ColorGroupColorCellToolTip = style({
  fontWeight: 500,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
  width: '150px',
  position: 'fixed',
  zIndex: 2000,
  borderRadius: '8px',
  boxShadow:
    'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',

  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: '-5px',
      borderWidth: '5px',
      borderStyle: 'solid',
      borderColor: `transparent transparent ${tipTriangleVar} transparent`,
      transform: 'rotate(180deg)',
    },
  },
});

/* ===== master detail ===== */
export const MasterDetailWrapper = style({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  padding: '10px 0px',
  paddingBottom: '40px',
});

export const MasterDetailHeaderWrapper = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0px 20px',
});

export const MasterDetailHeader = style({
  fontSize: '20px',
  lineHeight: '21px',
  fontWeight: 500,
});

/* ===== contact modal ===== */
export const ContactModalContentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

export const ContactModalContentHeader = style({
  fontFamily: 'Roboto',
  fontSize: '16px',
  fontWeight: 300,
  opacity: 0.7,
  marginBottom: '3px',
});

export const ContactModalContentValue = style({
  fontFamily: 'Roboto',
  fontSize: '20px',
  fontWeight: 500,
  marginBottom: '10px',
});

/* ===== remarks modal table ===== */
export const RemarkModalContentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 -74px',
});

export const RemarkModalTable = style({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '5px',
  marginBottom: '10px',
});

export const RemarkModalTableHeaderContainer = style({
  display: 'grid',
  gridTemplateColumns: '60px 300px 90px 90px',
  borderBottom: 'solid 1px #707070',
  padding: '0 14px',
});

export const RemarkModalTableHeader = style({
  fontFamily: 'Roboto',
  fontSize: '12px',
  fontWeight: 500,
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
});

export const RemarkModalTableRowContainer = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '10px',
  padding: '0 10px',
  maxHeight: '300px',
});

export const RemarkModalTableRow = style({
  display: 'grid',
  gridTemplateColumns: '60px 300px 90px 90px',
  width: '100%',
  marginBottom: '10px',
  paddingTop: '5px',
});

export const RemarkModalTableCell = style({
  fontFamily: 'Roboto',
  fontSize: '10px',
  fontWeight: 500,
  position: 'relative',
});

export const RemarkModalUserIcon = style({
  width: '42px',
  height: '42px',
  background: '#CCCCCC 0% 0% no-repeat padding-box',
  borderRadius: '50%',
  fontFamily: 'Roboto',
  fontSize: '16px',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'default',
});

export const RemarkModalRemarkCelLRenderer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const RemarkText = style({
  fontFamily: 'Roboto',
  fontSize: '10px',
  fontWeight: 500,
});

export const RemarkDate = style({
  fontFamily: 'Roboto',
  fontSize: '10px',
  fontWeight: 500,
  opacity: 0.7,
});

export const ButtonWrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '20px 20px 20px 0px',
  borderTop: 'solid 1px #707070',
  zoom: 0.8 as any,
});

export const ETACellRendererCellValue = style({
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 6px 12px #77777729',
  border: '0.4000000059604645px solid #707070',
  borderRadius: '2px',
  height: '40px',
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

/* ===== user tooltip (standalone; replaces styled(BPRViewTableToolTip)) ===== */
export const UserToolTip = style({
  position: 'absolute',
  maxWidth: 'none',
  left: '60px',
  top: '7px',
  paddingLeft: '10px',
  paddingRight: '10px',
  borderRadius: '6px',
  backgroundColor: '#4E4E4E',
  color: 'white',

  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      left: '-6.5px',
      transform: 'translate(-50%, -50%)',
      borderWidth: '6px',
      borderStyle: 'solid',
      borderColor: 'transparent #4E4E4E transparent transparent',
    },
  },
});

export const UserToolTipContent = style({
  fontFamily: 'Roboto',
  fontSize: '13px',
  lineHeight: '20px',
});

/* ===== particular analytics panel ===== */
export const BPRParticularAnalyticsWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 10px',
});

export const BPRParticularAnalyticsTableWrapper = style({
  background: analyticsBgVar,
  color: analyticsTextVar,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '4px',
});

export const BPRParticularAnalyticsTableHeaderWrapper = style({
  display: 'flex',
  margin: '7px 10px',
  borderBottom: '1.5px dashed white',
});

export const BPRParticularAnalyticsTableHeader = style({
  width: '100%',
  fontFamily: 'Roboto',
  fontWeight: 500,
  textAlign: 'center',
  paddingBottom: '5px',
});

export const BPRParticularAnalyticsTableRowWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '5px 10px',
});

export const BPRParticularAnalyticsTableRow = style({
  width: '100%',
  display: 'flex',
});

export const BPRParticularAnalyticsTableCell = style({
  width: '100%',
  fontFamily: 'Roboto',
  fontWeight: 500,
  textAlign: 'center',
  paddingBottom: '5px',
});
