// styles.css.ts
import { style, createVar } from '@vanilla-extract/css';
import * as GridSystem from '../../../styles/gridSystem.css';

/* media helper */
const mqLap_to_LapL = `screen and (min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`;

/* runtime accent (used for REGALBLAZE submit btn) */
// export const vAccent = createVar();
export const whiteVar = createVar(); // card backgrounds (was whiteVar)
export const secondaryColorVar = createVar(); // borders (was secondaryColorVar)
export const grayVar = createVar(); // neutral btn bg (was grayVar)
export const biegeVar = createVar(); // inputs (was biegeVar)
export const vAccent = createVar(); // REGALBLAZE accent (was chooseThemeColor[...].color5)

// export const setAccent = (color: string) => assignInlineVars({ [vAccent]: color });

/* containers / headings */
export const SCProfileOverView = style({
  background: whiteVar,
  marginBottom: '20px',
  borderRadius: '6px',
});

export const SCSubTitleBox = style({
  borderBottom: `1px solid ${secondaryColorVar}`,
});

export const SCSubTitlePad = style({
  padding: '34px 50px 20px 50px',
});

export const SCSubTitleSpan = style({
  fontSize: '2rem',
  fontWeight: 500,
  lineHeight: '2.6rem',
  '@media': { [mqLap_to_LapL]: { fontSize: '1.6rem' } },
});

/* overview */
export const SCOverviewInfo = style({
  padding: '34px 50px 24px 50px',
});

export const SCOverviewItem = style({
  borderBottom: `1px dashed ${secondaryColorVar}`,
  padding: '16px 0 20px 0',
  display: 'flex',
  alignItems: 'center',
  selectors: {
    '&:last-child': {
      border: 'unset',
      padding: '16px 0 0 0',
    },
  },
});

export const SCOverviewItemTitle = style({
  fontSize: '2rem',
  color: secondaryColorVar,
  fontWeight: 500,
  flex: '0 0 30%',
  '@media': { [mqLap_to_LapL]: { fontSize: '1.6rem' } },
});

export const SCOverViewSignItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px dashed ${secondaryColorVar}`,
  padding: '16px 0 20px 0',
  selectors: {
    '&:last-child': {
      border: 'unset',
      padding: '16px 0 0 0',
    },
  },
});

/* buttons */
export const SCButtonSignIn = style({
  borderRadius: '4px',
  color: secondaryColorVar,
  background: grayVar,
  padding: '14px',
  fontSize: '2rem',
  width: '192px',
});

/* change password */
export const SCBoxChangePassword = style({
  display: 'flex',
  alignItems: 'center',
  paddingTop: '50px',
});

export const SCChangePasswordLabel = style({
  fontSize: '2rem',
  fontWeight: 500,
  display: 'block',
  paddingBottom: '14px',
});

export const SCChangePasswordInput = style({
  background: biegeVar,
  height: '36px',
  borderRadius: '6px',
  outline: 'none',
  border: 'none',
  fontSize: '1.8rem',
  padding: '0 16px',
  width: '100%',
});

export const SCChangePasswordBox = style({
  paddingRight: '50px',
  flex: '1 0 25%',
});

export const SCChangePasswordFlex = style({
  display: 'flex',
  alignItems: 'center',
  marginTop: '30px',
});

/* submit button
   - base: gradient (non-REGALBLAZE)
   - add SCChangePasswordSubmitRegal + setAccent(color) for REGALBLAZE
*/
export const SCChangePasswordSubmit = style({
  fontSize: '1.8rem',
  fontWeight: 300,
  color: whiteVar,
  padding: '14px 20px',
  borderRadius: '6px',
  background: 'linear-gradient(180deg, #bc3d81 0%, #820f4c 100%)',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
  selectors: {
    '&:hover': { opacity: 0.9 },
    '&:disabled': {
      background: 'rgb(197, 195, 195)',
      color: 'rgb(110, 107, 107)',
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
});

/* modifier for REGALBLAZE theme */
export const SCChangePasswordSubmitRegal = style({
  background: vAccent, // set via setAccent(...)
});

/* cancel button */
export const SCChangePasswordCancel = style({
  background: 'transparent',
  color: '#121418',
  fontSize: '1.6rem',
  marginLeft: '45px',
});
