import { style, createVar } from '@vanilla-extract/css';

import * as globalStyles from '../../../../styles/global'

// ===== Runtime vars =====
export const detailsTitleBgVar = createVar();
export const textFontWeightVar = createVar();
export const textFontSizeVar = createVar();

// ===== Layout =====
export const SCSeasonalityContainer = style({
  paddingTop: '20px',
  paddingBottom: '20px',
  display: 'flex',
  width: '100%',
  height: '100%',
  '@media': {
    'screen and (min-width:1024px) and (max-width:1688px)': {
      width: '1000px',
      height: '100%',
    },
  },
});

export const SCChartContainer = style({
  marginRight: '33px',
  width: '90%',
  height: '90%',
  display: 'flex',
  flexDirection: 'column',
});

export const SCToggleWrapper = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "8px",
  marginTop: '14px',
  marginBottom: "4px",
});
export const SCSeasonalityStatusDetails = style({
  width: '20%',
  height: '100%',
  boxShadow: '-6px 6px 16px #0000000F',
  marginTop: '20px',      
  alignSelf: 'flex-start',
  '@media': {
    'screen and (min-width:1024px) and (max-width:1688px)': {
      zoom: '0.7',
    },
  },
});

export const SCSeasonalityDetailsTitle = style({
  backgroundColor: detailsTitleBgVar, // set at runtime
  color: 'white',
  fontFamily: 'Roboto',
  fontSize: '18px',
  fontWeight: 500,
  letterSpacing: '0px',
  height: '53px',
  borderRadius: '4px 4px 0 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const SCSeasonalityDetailsBody = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px',
  '@media': {
    'screen and (min-width:1024px) and (max-width:1688px)': {
      zoom: '0.8',
    },
  },
});

// Text with runtime weight/size + default vertical margin (12px)
export const SCText = style({
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  vars: {
    [textFontWeightVar]: '400',
    [textFontSizeVar]: '16px',
  },
  fontWeight: textFontWeightVar as unknown as number, // satisfies TS while using CSS var
  fontSize: textFontSizeVar,
  margin: '12px 0',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

// Optional modifier to remove default vertical margin
export const SCTextNoMargin = style({
  margin: '0',
});

export const SCHorizontalDivider = style({
  width: '100%',
  border: 'none',
  borderTop: '1px dashed #B2B2B2',
});

export const SCDataRow = style({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
});

export const SCDataNode = style({
  width: '151px',
});

export const SCVerticalDivider = style({
  width: '0.5px',
  backgroundColor: '#707070',
  height: '45px',
  marginRight: '16px',
  marginLeft: '16px',
});

export const SCDailyDataInfoBar = style({
  fontFamily: "Roboto",
  display: "flex",
  flexDirection: "row",    
  flexWrap: "nowrap",
  alignItems: "center",
  marginLeft: "50px",
  gap: "0px",
  padding: "8px 12px",
  fontSize: "9px",
  backgroundColor: "#FAFAFA",
  border: "1px solid #e0e0e0",
  borderRadius: "6px",
  color: "#333",
  overflow: "visible",
  whiteSpace: "nowrap",
});