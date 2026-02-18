import { style } from '@vanilla-extract/css';

/**
 * Utilities
 */
const dashed = '1.3px dashed #a8a5a5';

/**
 * Rectangle
 * - Dynamic label with ::before via data-label
 * - Theme color via [data-theme] selector (no recipes)
 */
export const rectangle = style({
  display: 'flex',
  width: '98%',
  height: '30vh',
  backgroundColor: '#f0f0f0',
  justifyContent: 'flex-start', // "left" isn't a valid value; this matches the intent
  gap: '4rem',
  alignItems: 'center',
  margin: '0 auto',
  marginLeft: '3rem',
  borderRadius: '12px',
  boxShadow: '0px 6px 12px #9a9a9a40',
  position: 'relative',
  fontWeight: 600,
  fontSize: '1.2rem',

  // Label (content from attr)
  '::before': {
    content: 'attr(data-label)',
    display: 'flex',
    justifyContent: 'center',
    height: '36px',
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
    position: 'absolute',
    padding: '0.5rem 1rem 0.5rem',
    width: '104px',
    right: 'calc(100% - 44px)',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    transform: 'rotate(-90deg)',
    zIndex: -1,
    background: 'rgb(188, 61, 129)', // default
  },

  // Pointer notch
  '::after': {
    content: '',
    display: 'block',
    position: 'absolute',
    width: 0,
    height: 0,
    left: '-6px',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '10px solid rgb(188, 61, 129)', // default
    transform: 'rotate(90deg)',
    zIndex: 3,
  },

  selectors: {
    '&[data-theme="REGALBLAZE"]::before': {
      background: '#CB830E',
    },
    '&[data-theme="REGALBLAZE"]::after': {
      borderBottomColor: '#CB830E',
    },
  },
});

/**
 * CardContainer
 */
export const cardContainer = style({
  overflow: 'auto',
  display: 'flex',
  width: '100%',
  gap: '3rem',
  height: '100%',
  padding: '2rem',
});

/**
 * LandingContainer
 */
export const landingContainer = style({
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  fontFamily: 'Roboto',
  marginLeft: '2rem',
});

/**
 * LandingPageDivider
 */
export const landingPageDivider = style({
  width: '98%',
  border: dashed,
  opacity: 1,
  gap: '5rem',
  margin: '1rem 0 1rem 3rem',
});

/**
 * AppBox
 */
export const appBox = style({
  height: '100%',
  minWidth: '275px',
  borderRadius: '12px',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 6px 12px #9A9A9A26',
  opacity: 1,
  float: 'left',
  width: '25%',
  position: 'relative',
  zIndex: 1,
});

/**
 * ImageHolder
 * - Theme color via [data-theme] selector (no recipes)
 */
export const imageHolder = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  zIndex: 2,
  height: '40%',
  marginLeft: '10%',
  paddingTop: '1rem',

  '::before': {
    content: '',
    height: '90%',
    width: '27%',
    background: '#FFEFF7 0% 0% no-repeat padding-box', // default
    borderRadius: '50%',
    position: 'absolute',
    top: '20%',
    opacity: 1,
    zIndex: 2,
  },

  selectors: {
    '&[data-theme="REGALBLAZE"]::before': {
      background: '#FFEED3 0% 0% no-repeat padding-box',
    },
  },
});

/**
 * Image
 */
export const image = style({
  position: 'relative',
  height: '80%',
  zIndex: 3,
  marginLeft: '12%',
  marginTop: '5%',
});

/**
 * AppBoxDivider
 */
export const appBoxDivider = style({
  width: '100%',
  border: dashed,
  opacity: 1,
  gap: '5rem',
});

/**
 * ClickBox
 */
export const clickBox = style({
  display: 'flex',
  justifyContent: 'flex-end', // "right" isn't a valid value; this matches the intent
  marginRight: '1rem',
  alignItems: 'center',
  cursor: 'pointer',
  flex: 1,
});

/**
 * AppBoxDiv
 */
export const appBoxDiv = style({
  height: '100%',
  paddingTop: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
});

export const cardTitle = style({
  zIndex: 4,
  margin: '1.5rem 0 0.5rem 2.5rem',
});

export const clickText = style({
  selectors: {
    // When any ancestor has data-theme="REGALBLAZE"
    '[data-theme="REGALBLAZE"] &': { color: 'rgb(199, 129, 14)' },
    // Any other theme (or explicitly different value)
    '[data-theme]:not([data-theme="REGALBLAZE"]) &': { color: '#820F4C' },
  },
});

export const clickArrowImg = style({
  position: 'relative',
  width: '7%',
  marginLeft: '1rem',
});

