import { style, createVar } from '@vanilla-extract/css';

// ---- Dynamic Vars ----
export const gridFractionVar = createVar(); // controls grid-template-columns

// ---- Layout wrappers ----
export const VFTaskStatusWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  paddingBottom: '30px',
});

export const VFTaskStatusContentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px',
  paddingLeft: '20px',
});

export const VFTaskStatusStepperWrapper = style({
  marginTop: '20px',
  paddingLeft: '120px',
  height: '150px',
  width: '100%',
  display: 'grid',
  // default/fallback; override via assignInlineVars
  vars: { [gridFractionVar]: 'none' },
  gridTemplateColumns: gridFractionVar,
  placeItems: 'center',
  gap: '60px',
  backgroundColor: '#F0F0F0',
  borderRadius: '8px',
});

export const VFTastStatusDownloadWrapper = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const VFTaskStatusStepperLabel = style({
  fontSize: '18px',
  textAlign: 'center',
  width: '100px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textOverflow: 'ellipsis',
});

// No-data
export const VFTaskStatusNoData = style({
  width: '100%',
  height: '90px',
  padding: '10px',
  paddingLeft: '60px',
  display: 'flex',
  alignItems: 'center',
});

// ---- Stepper prefix bits ----
export const StepperPrefixWrapper = style({
  display: 'flex',
  marginLeft: '-30px',
});

export const StepperPrefixIcon = style({
  height: '20px',
  width: '20px',
});

export const StepperPrefixLabel = style({
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: '18px',
  letterSpacing: '0px',
  color: '#1C1A1A',
  marginLeft: '10px',
});

export const StepperPrefixSubLabel = style({
  fontFamily: 'Roboto',
  fontWeight: 400,
  fontSize: '18px',
  letterSpacing: '0px',
  color: '#897E7E',
  marginLeft: '10px',
});

// Small helper for the "Download" text that had inline styles
export const DownloadText = style({
  marginLeft: '10px',
  fontWeight: 500,
});
