// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

/* ------- runtime vars ------- */
export const vTitleBg = createVar();
export const vTextSize = createVar();
export const vTextWeight = createVar();

/** Set title background at runtime */
// export const setSeasonalityTitleBg = (bg: string) =>
//   assignInlineVars({ [vTitleBg]: bg });

// /** Set SCText font (px + weight) at runtime */
// export const setTextVars = (fontSizePx: number, fontWeight: number) =>
//   assignInlineVars({
//     [vTextSize]: `${fontSizePx}px`,
//     [vTextWeight]: String(fontWeight),
//   });

/* ------- layout ------- */
export const SCSeasonalityContainer = style({
  paddingTop: '20px',
  paddingBottom: '20px',
  display: 'flex',
  width: '1810px',
  height: '100%',
  '@media': {
    'screen and (min-width:1024px) and (max-width:1688px)': {
      width: '1100px',
      height: '100%',
    },
  },
});

export const SCChartContainer = style({
  marginRight: '33px',
  width: '80%',
});

export const SCSeasonalityStatusDetails = style({
  flex: 1,
  height: '100%',
  boxShadow: '-6px 6px 16px #0000000F',
  '@media': {
    'screen and (min-width:1024px) and (max-width:1688px)': {
      // keep your original zoom behavior
      zoom: 0.8 as unknown as string | number,
    },
  },
});

export const SCSeasonalityDetailsTitle = style({
  backgroundColor: vTitleBg,
  color: 'white',
  fontFamily: 'Roboto',
  fontSize: '18px',
  fontWeight: 500,
  letterSpacing: '0',
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
      zoom: 0.8 as unknown as string | number,
    },
  },
});

export const SCToggleWrapper = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "8px",
  // marginTop: '14px',
  marginBottom: "4px",
});

export const SCText = style({
  fontFamily: 'Roboto',
  letterSpacing: '0',
  margin: '12px 0',
  fontSize: vTextSize,
  fontWeight: vTextWeight as unknown as number,
});

export const SCCheckBoxRow = style({
  display: 'flex',
});

export const SCCheckBoxContainer = style({
  display: 'inherit',
  alignItems: 'center',
  marginRight: '20px',
});

export const SCHorizontalDivider = style({
  width: '100%',
  border: 'none',
  borderTop: '1px dashed #B2B2B2',
  height: 0,
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
