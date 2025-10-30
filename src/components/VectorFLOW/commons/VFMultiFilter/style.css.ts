// styles.css.ts
import { style, styleVariants, createVar, globalStyle } from '@vanilla-extract/css';

/* ---------- Vars for small runtime tweaks ---------- */
export const accentColorVar = createVar(); // checkbox/radio accent
export const cardBgVar = createVar();      // if you ever want to theme whites

/* ---------- Content area ---------- */
export const FilterBody = style({
  margin: '0 47px',
  display: 'flex',
  justifyContent: 'center',
  overflowY: 'auto',
  gap: '10px',
});

export const FilterCardWrapper = style({
  width: '270px',
  margin: '47px 0',
  backgroundColor: cardBgVar,
  boxShadow: '0px 6px 12px #95959529',
  borderRadius: '6px',
  height: 'max-content',
});

export const FilterHeader = style({
  height: '60px',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '26px',
  fontFamily: 'Roboto',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '10px',
});

export const FilterComponent = style({
  backgroundColor: '#FFFFFF',
  color: '#313131',
  minHeight: '50px',
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '16px',
  lineHeight: '20px',
  fontFamily: 'Roboto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
});

/* ---------- Footer buttons ---------- */
export const ButtonFilterWrapper = style({
  borderTop: '1px dashed #A0A0A0',
  height: '109px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F4F4F4',
});

export const ButtonContainer = style({
  marginRight: '46px',
  gap: '40px',
  display: 'flex',
});

/* ---------- Small layout helpers ---------- */
export const DropdownGroupWrapper = style({
  margin: '3px 9px',
  display: 'flex',
  justifyContent: 'center',
  gap: '5px',
});

export const SelectDropdownComponent = style({
  width: '60px',
  flexGrow: 1,
  textAlign: 'center',
});

/* Checkbox/radio group with theme accent */
const multiSelectBase = style({
  marginBottom: '16px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '6px',
  accentColor: accentColorVar,
});
export const MultiSelectCheckBoxComponent = multiSelectBase;
export const MultiSelectTheme = styleVariants({
  REGALBLAZE: { vars: { [accentColorVar]: '#C7810E' } },
  DEFAULT: { vars: { [accentColorVar]: '#82104C' } },
});

/* ---------- Field headers / Horizon ---------- */
export const TextFieldHeader = style({
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '17px',
  lineHeight: '20px',
  fontFamily: 'Roboto',
  letterSpacing: '0px',
  color: '#313131',
  textAlign: 'left',
  width: '100%',
  padding: '0 1rem',
  boxSizing: 'border-box',
});

export const VFHorizonText = style({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '26px',
  fontFamily: 'Roboto',
  display: 'block',
  textAlign: 'center',
});

export const RangeSliderComponent = style({
  paddingTop: '15px',
  paddingBottom: '15px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

/* ---------- Skeleton ---------- */
export const SkeletonWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '1200px',
  maxWidth: '100%',
});

export const SkeletonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

export const SkeletonGroup = style({
  width: '270px',
  margin: '47px 10px',
});

export const SkeletonFooter = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '10px',
  padding: '30px 20px',
});

/* ---------- (was style.css) Accordian bits ---------- */
export const filterAccordian = style({
  width: '100%',
  padding: '0 1rem',
  boxSizing: 'border-box',
});

export const accordianHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
});

export const accordianTitle = style({
  fontFamily: 'Roboto',
  fontWeight: 300,
  fontSize: '16px',
  letterSpacing: '0px',
  color: '#313131',
});

export const accordianBody = style({
  paddingLeft: '12px',
  overflow: 'overlay',
  maxHeight: '144px',
  marginTop: '10px',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});

export const paddedImage = style({
  paddingRight: '10px',
});

export const chipColorVar = createVar();

export const checkboxInput = style({
  width: '15px',
  height: '20px',
  marginRight: '14px',
  borderRadius: '2px',
});

export const optionLabel = style({
  fontFamily: 'Roboto',
  fontWeight: 300,
  fontSize: '16px',
  color: '#313131',
});

export const coverageChip = style({
  height: '12px',
  width: '12px',
  backgroundColor: chipColorVar, // set via assignInlineVars
  borderRadius: '2px',
});

// Target the DummyInput (via `inputId="lf1-input"`)
globalStyle('#lf1-input', {
  background: '0px center',
  border: '0px',
  caretColor: 'transparent',
  fontSize: 'inherit',
  gridArea:'1 / 1 / 2 / 3',
  outline: '0px',
  padding: '0px',
  width: '1px',
  color: 'transparent',
  left: '-100px',
  opacity: '0',
  position: 'relative',
  transform: 'scale(0.01)'
});
