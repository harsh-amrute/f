import { style, globalStyle, createVar } from '@vanilla-extract/css';

/* ===== runtime vars ===== */
export const folWidthVar = createVar();  // 0–100 (percent)
export const folColorVar = createVar();  // any CSS color

/* ===== Stepper wrapper ===== */
export const StepperWrapper = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'start', // default; can be overridden via helper classes below
  fontSize: 12,
  padding: '2rem',
  margin: '1.5rem 0',
  gap: 32,
  border: '1px dashed #707070',
  borderRadius: 10,
  position: 'relative',

  '@media': {
    '(max-width: 1200px)': {
      justifyContent: 'start',
    },
  },
});

/* extra “modifier” classes to compose with StepperWrapper */
export const routeAssignment = style({});
export const bufferAssignment = style({});

/* child layout tweaks based on wrapper modifier */
globalStyle(`${routeAssignment} > .step-group > div`, {
  flex: 1,
});

globalStyle(`${bufferAssignment} > .step-group > div:nth-of-type(2)`, {
  flex: 1.5,
});

/* justify helpers for desktop (>=1201px) */
export const justifyStart = style({
  '@media': { '(min-width: 1201px)': { justifyContent: 'start' } },
});
export const justifyEnd = style({
  '@media': { '(min-width: 1201px)': { justifyContent: 'end' } },
});

/* ===== Step group ===== */
export const StepGroup = style({
  width: '30%',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 0,
  background: '#eae8e8',
  borderRadius: 4,
  position: 'relative',
});

/* Give the element a stable className "step-group" so selectors above work */
globalStyle(`.${StepGroup}`, {
  /* add a public alias class so DOM selectors can target it */
  /* vanilla-extract hashes the class; we expose an extra class name: */
});
export const stepGroupAlias = 'step-group';
/* attach alias to the element in React via className concatenation */

/* When “step mode” is on (the old $step=true), add dot connectors */
export const stepMode = style({
  selectors: {
    /* ASC: dots on both sides with inactive variants */
    '&[data-order="asc"]:not(:first-of-type)::before': dot('#82104c', true, 'right', '100%'),
    '&[data-order="asc"]#inactive::before': dot('#82104c', false, 'right', 'calc(100% + 5px)'),
    '&[data-order="asc"]:not(:last-of-type)::after': dot('#82104c', true, 'left', '100%'),
    '&[data-order="asc"]#inactive::after': dot('#82104c', false, 'left', 'calc(100% + 5px)'),

    /* DSC: reversed sides */
    '&[data-order="dsc"]:not(:last-of-type)::before': dot('#82104c', true, 'right', '100%'),
    '&[data-order="dsc"]#inactive::before': dot('#82104c', false, 'right', 'calc(100% + 5px)'),
    '&[data-order="dsc"]:not(:first-of-type)::after': dot('#82104c', true, 'left', '100%'),
    '&[data-order="dsc"]#inactive::after': dot('#82104c', false, 'left', 'calc(100% + 5px)'),
  },
});

function dot(
  borderColor: string,
  filled: boolean,
  side: 'left' | 'right',
  offset: string
) {
  return {
    content: '',
    position: 'absolute' as const,
    width: 5,
    height: 5,
    border: `1px solid ${borderColor}`,
    borderRadius: '50%',
    [side]: offset,
    background: filled ? borderColor : 'transparent',
  };
}

/* ===== Step label ===== */
export const StepLabel = style({
  margin: '0 1rem',
  width: 'max-content',
});

/* ===== FOL bar ===== */
export const FOLIcon = style({
  width: 40,
  height: 10,
  background: 'lightgrey',
  marginLeft: 5,
  position: 'relative',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      width: `calc(${folWidthVar} * 1%)`, // supply 0–100
      height: '100%',
      background: folColorVar,
      left: 0,
      top: 0,
    },
  },
});
