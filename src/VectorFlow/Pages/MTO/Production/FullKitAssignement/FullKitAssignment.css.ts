import { style, createVar, globalStyle } from '@vanilla-extract/css';

/* ==== runtime vars (assign via assignInlineVars) ==== */
export const buttonBgVar = createVar();            // Button background (theme color4)
export const buttonTextVar = createVar();          // Button text color (theme colorText)
export const buttonArrowUrlVar = createVar();      // url('/assets/.../name.svg')

export const leftStripeColorVar = createVar();     // ColorOnLeft bg
export const leftStripeHeightVar = createVar();    // ColorOnLeft height

export const separatorColorVar = createVar();      // Separator color

export const circleBgVar = createVar();            // ChildrenColorCellRenderer bg

/* ==== Wrapper & layout ==== */

export const Wrapper = style({
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // selectors: {
  //   '& .ag-header-cell-text': { textAlign: 'center' },
  //   '& > .ag-theme-alpine': { margin: '20px 0', width: '100%' },
  //   '& > button': { width: 'max-content' },
  //   '& > *:not(button, .toolbar-container)': {
  //     transition: 'flex 0.2s ease-in-out !important',
  //     flex: 1,
  //   },
  //   '& .toolbar-container': {
  //     width: '100%',
  //     marginBottom: 0,
  //     marginTop: '20px',
  //     paddingLeft: 0,
  //     marginLeft: 0,
  //   },
  //   '& > div[data-testid="vf_pagination"]': {
  //     flex: 'unset',
  //     width: '100%',
  //     marginTop: '-20px',
  //   },

  //   /* chart wrapper deep rules */
  //   '& .chart-wrapper > div': {
  //     height: '100% !important',
  //   },
  //   '& .chart-wrapper > div .ag-charts-wrapper': {
  //     maxHeight: '100% !important',
  //   },
  //   '& .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas': {
  //     height: '100%',
  //   },
  //   '& .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas > canvas': {
  //     height: '100% !important',
  //   },
  // },
});
globalStyle(`${Wrapper} .ag-header-cell-text`, { textAlign: 'center' });
globalStyle(`${Wrapper} > .ag-theme-alpine`, { margin: '20px 0', width: '100%' });
globalStyle(`${Wrapper} > button`, { width: 'max-content' });
globalStyle(`${Wrapper} > *:not(button, .toolbar-container)`, {
  transition: 'flex 0.2s ease-in-out !important',
  flex: 1,
});
globalStyle(`${Wrapper} .toolbar-container`, {
  width: '100%',
  marginBottom: 0,
  marginTop: '20px',
  paddingLeft: 0,
  marginLeft: 0,
});
globalStyle(`${Wrapper} > div[data-testid="vf_pagination"]`, {
  flex: 'unset',
  width: '100%',
  marginTop: '-20px',
});

/* chart wrapper deep rules */
globalStyle(`${Wrapper} .chart-wrapper`, { position: 'relative', width: '100%', maxHeight: '40vh' });
globalStyle(`${Wrapper} .chart-wrapper > div`, { height: '100% !important' });
globalStyle(`${Wrapper} .chart-wrapper > div .ag-charts-wrapper`, {
  maxHeight: '100% !important',
});
globalStyle(
  `${Wrapper} .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas`,
  { height: '100%' }
);
globalStyle(
  `${Wrapper} .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas > canvas`,
  { height: '100% !important' }
);
globalStyle(`${Wrapper} .chart-scroll`, { width: '100%', height: '95% !important' });
/* ==== Button (themed) ==== */

export const Button = style({
  padding: '1rem 2rem',
  lineHeight: 1,
  borderRadius: '10px 10px 0 0',
  fontSize: '10px',
  position: 'relative',
  background: buttonBgVar,
  color: buttonTextVar,
  border: 'none',
  cursor: 'pointer',
  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      left: '50%',
      top: '-3px',
      transform: 'translate(-50%, -50%)',
      border: '2px solid white',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundImage: buttonArrowUrlVar, // set to "url(/assets/.../name.svg)"
    },
  },
});

/* ==== Stepper ==== */

export const StepperWrapper = style({
  display: 'flex',
  justifyContent: 'space-evenly',
  fontSize: '12px',
  padding: '2rem 1rem',
  margin: '1.5rem 0',
  gap: '5rem',
  border: '1px dashed #707070',
  borderRadius: '10px',
});

export const StepGroup = style({
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 0,
  background: '#eae8e8',
  borderRadius: '4px',
  position: 'relative',
  selectors: {
    '&:not(:first-of-type)::before': {
      content: '',
      position: 'absolute',
      width: '5px',
      height: '5px',
      border: '1px solid #82104c',
      right: '100%',
      background: '#82104c',
      borderRadius: '50%',
    },
    '&#inactive::before': {
      content: '',
      position: 'absolute',
      width: '5px',
      height: '5px',
      border: '1px solid #82104c',
      right: 'calc(100% + 5px)',
      background: 'transparent',
      borderRadius: '50%',
    },
    '&:not(:last-of-type)::after': {
      content: '',
      position: 'absolute',
      width: '5px',
      height: '5px',
      border: '1px solid #82104c',
      left: '100%',
      borderRadius: '50%',
    },
    '&#inactive::after': {
      content: '',
      position: 'absolute',
      width: '5px',
      height: '5px',
      border: '1px solid #82104c',
      left: 'calc(100% + 5px)',
      borderRadius: '50%',
    },
  },
});

export const StepLabel = style({
  margin: '0 1rem',
  width: 'max-content',
});

export const ContentWrapper = style({
  margin: '2rem',
  width: '70vw',
  height: '65vh',
  overflow: 'auto',
});

export const Text = style({
  fontSize: '14px',
  fontWeight: 300,
});

/* ==== Cards/boxes section (as-is port) ==== */

export const BTRAvailabiltyCellRendererWrapper = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Main = style({ marginTop: '12px' });

export const MainContainer = style({
  display: 'flex',
  gap: '75px',
  marginLeft: '15px',
  padding: '0.75rem',
});

export const Box = style({
  width: '210px',
  minHeight: '12vh',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 6px 12px #74747429',
  opacity: 1,
  borderRadius: '6px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '30px',
});

export const PercentBorderContainer = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Percentborder = style({
  border: '3px solid #F0F0F0',
  borderRadius: '50%',
  backgroundColor: '#CDCDCD',
  height: '50px',
  width: '50px',
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
});

export const Percent = style({ textAlign: 'center' });

export const BtnGroup = style({
  height: '80px',
  width: '100%',
  display: 'flex',
});

export const Btns = style({
  width: '100%',
  paddingTop: '5px',
  paddingRight: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const TextXAxis = style({
  fontSize: '12px',
  textAlign: 'center',
  transform: 'rotate(-90deg)',
  width: 'max-content',
  whiteSpace: 'nowrap',
});

export const TextYAxis = style({
  fontSize: '12px',
  textAlign: 'center',
  paddingBottom: '4px',
});

export const ViewOrder = style({
  fontSize: '10px',
  color: '#BC3D81',
  marginBottom: '30px',
  backgroundColor: '#fcf0f7',
  width: '70%',
  padding: '10px',
  textAlign: 'center',
  borderRadius: '8px',
});

export const TextOnBox = style({
  position: 'absolute',
  bottom: '100%',
  left: 0,
  backgroundColor: '#E0E0E0',
  width: '80px',
  borderRadius: '8px 8px 0 0',
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ImgDiv = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1px',
  fontWeight: 'bold',
});

export const ColorOnLeft = style({
  position: 'absolute',
  right: '100%',
  borderRadius: '8px 0 0 8px',
  backgroundColor: leftStripeColorVar,
  width: '20px',
  height: leftStripeHeightVar,
  selectors: {
    '&:nth-of-type(1)': { top: '0px', zIndex: 0 },
    '&:nth-of-type(2)': { top: '15px', zIndex: 1 },
    '&:nth-of-type(3)': { top: '25px', zIndex: 2 },
  },
});

export const Separator = style({
  borderRight: `1px solid ${separatorColorVar}`,
  height: '85%',
  margin: 'auto',
});

export const BTRLayoutTabsWrapper = style({
  display: 'flex',
  zoom: '0.75' as unknown as string,
  justifyContent: 'center',
  marginBottom: '15px',
});

export const ButtonImg = style({
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '3px',
  display: 'inline-flex',
});

export const Btncount = style({
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  display: 'flex',
});

export const diviLine = style({
  border: '2px dashed #C0C0C0',
  width: '400px',
  color: '#FFFFFF',
  height: 0,
});

export const TextOnColor = style({
  fontSize: '10px',
  transform: 'rotate(-90deg)',
  whiteSpace: 'nowrap',
  color: 'white',
});

export const underLine = style({
  border: '1px solid #000',
  width: '400px',
  color: '#000',
  height: 0,
});

/* ==== Procurement layout bits reused here ==== */

export const ProcurementLayout = style({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  // selectors: {
  //   '& div[data-testid="vf_pagination"]': {
  //     margin: '-20px -15px !important',
  //     marginBottom: '0px !important',
  //   },
  //   '& > .ag-theme-alpine': {
  //     flex: '1 !important',
  //   },
  // },
});
globalStyle(`${ProcurementLayout} div[data-testid="vf_pagination"]`, {
  margin: '-20px -15px !important',
  marginBottom: '0px !important',
});
globalStyle(`${ProcurementLayout} > .ag-theme-alpine`, {
  flex: '1 !important',
});

/* ==== Analytical screen (unchanged semantics) ==== */

export const BPRDailyAnalyticsWrapper = style({
  padding: '0px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const BPRDailyAnalyticsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '95%',
  background: '#383737 0% 0% no-repeat padding-box',
  boxShadow: '0px 6px 12px #00000034',
  padding: '4px 8px',
  borderRadius: '4px',
});

export const BPRDailyAnalyticsHeader = style({
  color: 'white',
  marginBottom: '6px',
});

export const BPRDailyAnalyticsTableContainer = style({});

export const BPRDailyAnalyticsTableHeaderContainer = style({
  display: 'flex',
  flexDirection: 'row',
  color: 'white',
  fontSize: '8px',
  width: '100%',
});

export const BPRDailyAnalyticsTableHeader = style({
  width: '100%',
  textAlign: 'center',
  fontSize: '10px',
  marginBottom: '5px',
});

export const BPRDailyAnalyticsTableRowContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const BPRDailyAnalyticsTableRow = style({
  display: 'flex',
  flexDirection: 'row',
  width: '95%',
  borderRadius: '4px',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 12px #58585829',
  marginBottom: '5px',
  overflow: 'hidden',
  zoom: 0.7 as unknown as string,
});

export const BPRDailyAnalyticsTableCell = style({
  textAlign: 'center',
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  fontWeight: 500,
  fontSize: '11px',
  lineHeight: '21px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#313131',
  selectors: {
    '&:before': {
      content: '',
      position: 'absolute',
      right: 0,
      height: '100%',
      width: '1px',
    },
  },
});

export const BPRDailyAnalyticsTableNoChangeWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

export const BPRDailyAnalyticsTableChangeIcon = style({
  height: '10px',
  width: '10px',
});

export const BPRDailyAnalyticStatusBar = style({
  display: 'flex',
  alignItems: 'center',
});

export const BPRDailyAnalyticStatusBarSection = style({
  width: '100%',
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '21px',
  letterSpacing: '0px',
  color: '#FFFFFF',
  textAlign: 'center',
});


export const BPRDailyAnalyticsTableCellHeader = style({
  fontStyle:'normal',
   fontVariant:'normal',
    fontWeight:500,
     fontSize:'16px', fontFamily:'Roboto',
      letterSpacing: '0px', color: '#313131'
})  

export const BPRDailyAnalyticsTableCellText = style({
  fontStyle:'normal', fontVariant:'normal', fontWeight:400, fontSize:'16px', fontFamily:'Roboto', letterSpacing: '0px', color: '#313131'
})  

export const ProcPlanningChildrenColor = style({
display: 'flex', alignItems: 'center', justifyContent: 'center'
}) 

const determineColor = (value: any) => { if (value === "Red") return 'Red'; if (value === "Yellow") return 'Yellow'; if (value === "Black") return 'Black'; if (value === "Green") return 'Green'; };

export const ChildrenColorCell = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  marginTop: '14px',
  backgroundColor: circleBgVar,
});

/* ==== Grid overrides wrapper (flattened selectors) ==== */

export const SCDynamicContainer = style({
  // selectors: {
  //   '& .ag-header-cell-text': {
  //     fontSize: '10px !important',
  //     fontWeight: 'bold',
  //   },
  //   '& > .ag-theme-alpine .ag-cell': {
  //     border: 'none',
  //     height: '100% !important',
  //     borderTop: '0.1px solid #cecece !important',
  //   },
  // },
});
/* AG Grid descendants of SCDynamicContainer */
globalStyle(`${SCDynamicContainer} .ag-header-cell-text`, {
  fontSize: '10px !important',
  fontWeight: 'bold',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-cell`, {
  border: 'none',
  height: '100% !important',
  borderTop: '0.1px solid #cecece !important',
});
