// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';

export const trendHeaderBgVar = createVar();   // AvailabilityTrendHeader bg
export const radioAccentVar = createVar();     // ChartHeaderRadioGroup accent-color
export const summaryStickBgVar = createVar();  // optional: calendar stick color

export const ResearchInsightsLayout = style({
  marginTop: '5px',
  marginLeft: '20px',
  height: '85%',
  display: 'grid',
  gridTemplateColumns: '3fr 1fr',
  paddingBottom: '50px',
});

export const ResearchInsightsTableWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

export const ResearchInsightsTableTaskBar = style({
  width: '100%',
  padding: '10px 15px',
});

export const AvailabilityTrendWrapper = style({
  height: '100%',
  width: '100%',
  minWidth: '300px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  position: 'relative',
});

export const AvailabilityTrendHeader = style({
  backgroundColor: trendHeaderBgVar,
  padding: '5px',
  color: 'white',
  width: '100%',
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: 500,
  fontFamily: 'Roboto',
  borderRadius: '12px 12px 0 0',
  position: 'sticky',
  top: 0,
});

export const AvailabilityTrendSection = style({
  marginBottom: '10px',
  padding: '5px 10px 15px 10px',
  width: '100%',
});

export const HistoricalAvailabiltyHeader = style({
  fontWeight: 500,
  fontSize: '10px',
  marginBottom: '5px',
});

export const HistoricalAvailabiltyContent = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  padding: '4px',
  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  borderRadius: '4px',
});

export const HistoricalAvailabiltyContentSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '1px solid black',
});

export const HistoricalAvailabiltyContentSectionHeader = style({
  display: 'inline',
  fontWeight: 400,
  fontSize: '7px',
  lineHeight: '10px',
  color: '#383737',
});

export const HistoricalAvailabiltyContentSectionData = style({
  display: 'inline',
  fontWeight: 700,
  fontSize: '11px',
  color: 'black',
});

export const HorizonHeader = style({
  textAlign: 'center',
  fontWeight: 500,
  fontSize: '14px',
  marginBottom: '-10px',
});

export const ChartHeader = style({
  width: '100%',
  display: 'flex',
  gap: '12px',
  justifyContent: 'space-between',
});

export const ChartHeaderText = style({
  fontSize: '10px',
  fontWeight: 400,
  display: 'flex',
  alignItems: 'center',
});

export const ChartHeaderRadioGroup = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  accentColor: radioAccentVar,
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 300,
  fontSize: '14px',
  lineHeight: '19px',
  fontFamily: 'Roboto',
});

export const CapsuleWrapper = style({
  zoom: 0.7 as any, // keep non-standard "zoom" behavior
  width: '180px',
});

export const CalenderWrapper = style({
  width: '100%',
  backgroundColor: '#F4F4F4',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  zoom: 0.9 as any,
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  marginTop: '15px',
});

export const CalenderHeader = style({
  width: '100%',
  textAlign: 'center',
  fontWeight: 500,
  fontSize: '13px',
  borderBottom: 'solid 1px #D0CCCC',
  padding: '5px',
});

export const CustomCalenderCaptionWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const CustomCalenderCaptionArrow = style({
  width: '14px',
  height: '14px',
  cursor: 'pointer',
});

export const CustomCalenderCaptionHeader = style({
  fontSize: '13px',
  fontWeight: 500,
});

export const CustomCalenderDayWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
  height: '100%',
  width: '100%',
  cursor: 'pointer',
});

export const ChartWrapper = style({
  position: 'relative',
  width: '100%',
  paddingTop: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const CalenderSummaryWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
});

export const CalenderSummaryCell = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

export const CalenderSummaryCellText = style({
  fontWeight: 400,
  fontSize: '9px',
  textAlign: 'center',
});

export const CalenderSummaryCellContentWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const CalenderSummaryCellContent = style({
  fontWeight: 500,
  fontSize: '12px',
});

export const CalenderSummaryCellContentStick = style({
  height: '15px',
  width: '2px',
  marginLeft: '5px',
  backgroundColor: summaryStickBgVar,
});

export const ExpandChartIcon = style({
  position: 'absolute',
  right: 0,
  top: '5px',
  height: '20px',
  width: '20px',
  zIndex: 20,
  cursor: 'pointer',
});

export const ExpandedChartFilterWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '10px',
  marginTop: '20px',
  borderBottom: '2px dashed gray',
});

export const ExpandedChartSelectWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '20px',
});

export const ExpandedChartSelectLabel = style({
  marginRight: '15px',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '26px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#000000',
});

export const ExpandedChartCapsuleWrapper = style({
  marginLeft: 'auto',
  zoom: 0.8 as any,
});

export const RadioGroup = style({
  display: 'flex',
});

export const DefaultViewRendererWrapper = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '140px',
});

export const DefaultViewRendererHeader = style({
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '30px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#000000',
  textAlign: 'center',
});

export const DefaultViewRendererText = style({
  fontWeight: 300,
  fontSize: '20px',
  lineHeight: '25px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  color: '#000000',
  textAlign: 'center',
  padding: '0 60px',
  marginTop: '10px',
  marginBottom: '10px',
});
export const zoom09PadL20 = style({ zoom: 0.9 as any, paddingLeft: '20px' });
export const mr15 = style({ marginRight: '15px' });
export const borderBottomDashed2 = style({ borderBottom: 'dashed 2px #B2B2B2' });
export const borderBottomDashed3 = style({ borderBottom: 'dashed 3px #B2B2B2' });
export const flexRow = style({ display: 'flex', flexDirection: 'row' });
export const alignCenter = style({ alignItems: 'center' });
export const mb5 = style({ marginBottom: '5px' });
export const mtNeg5 = style({ marginTop: '-5px' });
export const ml30 = style({ marginLeft: '30px' });
export const pb0 = style({ paddingBottom: 0 });
export const gap2 = style({ gap: '2px' });
export const ml10 = style({ marginLeft: '10px' });
export const hidden = style({ display: 'none' });
