// styles.css.ts
import { style, createVar, globalStyle } from '@vanilla-extract/css';

/* breakpoints (approx. your GridSystem) */
const laptop = '1024px';
const laptopL = '1440px';

/* runtime var for the upload button bg */
export const manualBtnBgVar = createVar();
/* runtime bg var so you can theme from JSX */
export const scManualUploadBtnBgVar = createVar();

/* ----- layout wrappers ----- */
export const SCManualBoxCenter = style({
  '@media': {
    [`screen and (min-width: ${laptopL})`]: {
      marginTop: 10,
      marginLeft: 50,
    },
  },
});

export const SCManualBox = style({
  width: '100%',
  backgroundColor: '#ffffff',
  border: '1px solid #d6d6d6',
  borderRadius: 6,
  padding: '82px 0 68px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media': {
    [`screen and (min-width: ${laptop}) and (max-width: ${laptopL})`]: {
      padding: '50px 0',
    },
    'screen and (max-height: 650px)': {
      padding: '20px 0',
    },
  },
});

export const SCManualText = style({
  fontSize: '3.6rem',
  textAlign: 'center',
  color: '#000000',
  fontWeight: 500,
  '@media': {
    [`screen and (min-width: ${laptop}) and (max-width: ${laptopL})`]: {
      fontSize: '3rem',
      fontWeight: 500,
    },
  },
});

/* ----- drop area block ----- */
export const SCManualDrag = style({
  boxShadow: '5px 5px 30px #6e6b6b29',
  borderRadius: 6,
  marginTop: 15,
  marginBottom: 30,
  width: '100%',
  maxWidth: 778,
  '@media': {
    [`screen and (min-width: ${laptop}) and (max-width: ${laptopL})`]: {
      marginTop: 20,
      marginBottom: 20,
    },
  },
});

export const SCManualExcel = style({
  display: 'flex',
  justifyContent: 'center',
});

export const SCManualDragText = style({
  margin: '15px 80px',
  fontSize: '2.5rem',
  textAlign: 'center',
  color: '#000000',
  fontWeight: 500,
});

export const SCDragDrop = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 0',
});

/* ----- download row ----- */
export const SCManualDowload = style({
  paddingTop: 20,
  display: 'flex',
  justifyContent: 'center',
  '@media': {
    'screen and (max-height: 580px)': { paddingTop: 10 },
  },
});

export const SCManualDowloadText = style({
  fontSize: '1.8rem',
  paddingBottom: 30,
  paddingRight: 10,
  '@media': {
    'screen and (max-height: 580px)': { paddingBottom: 10 },
  },
});

/* ----- upload row ----- */
export const SCManualUpload = style({
  display: 'flex',
  alignItems: 'center',
});

export const SCManualUploadButton = style({
  boxShadow: '2px 2px 15px #a2a0a029',
  borderRadius: '0 0 0 6px',
  width: 162,
  height: 50,
  color: '#ffffff',
  backgroundColor: '#000000',
  border: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export const SCManualUploadText = style({
  color: '#c8c5c5',
  fontSize: '1.8rem',
  paddingLeft: 30,
});

export const SCManualUploadInput = style({});

/* big “Upload” CTA */
export const SCManualUploadBtn = style({
  background: manualBtnBgVar,
  borderRadius: "6px",
  fontSize:"2.2rem",
  color: "rgb(255, 255, 255)",
  padding: "10px 40px",
  border: "none",
  selectors: {
    '&:disabled': {
      background: 'gray',
      cursor: 'not-allowed',
      opacity: 0.8,
    },
  },
});

export const SCManualImgUpload = style({
  paddingRight: 12,
});

// export const fileuploader_input = style({
//     display: "block",
//     opacity: 0,
//     position: "absolute",
//     pointerEvents: "none"
// })

// export const fileuploader_input = style({
// });

// globalStyle(`drop_area input`, {
//     display: "block",
//     opacity: 0,
//     position: "absolute",
//     pointerEvents: "none"
// })


export const drop_area = style({
  // position: "relative",
  // border: "2px dashed #4a90e2",
  // borderRadius: "8px",
  // padding: "2rem",
  // textAlign: "center",
  // backgroundColor: "#fafafa",
  // cursor: "pointer",
  // transition: "background-color 0.3s ease",

  // ":hover": {
  //   backgroundColor: "#f0f8ff",
  // },

  // 🔥 Target the internal <input type="file">
  // selectors: {
  //   [`& input[type="file"]`]: {
  //     opacity: 0,
  //     position: "absolute",
  //     width: "100%",
  //     height: "100%",
  //     top: 0,
  //     left: 0,
  //     cursor: "pointer",
  //   },
  // },
});

/** Make the *internal* <input type="file"> invisible but clickable */
globalStyle(`${drop_area} input[type="file"]`, {
  opacity: 0,
  position: "absolute",
  // width: "100%",
  // height: "100%",
  // top: 0,
  // left: 0,
  cursor: "pointer",
});

