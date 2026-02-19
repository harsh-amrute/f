import { style, styleVariants, createVar, globalStyle } from "@vanilla-extract/css";

export const bgImageVar = createVar(); // pass `url(...)` from the component

const cardBase = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.01)",
  backgroundImage: bgImageVar, // set via assignInlineVars({ [bgImageVar]: 'url(...)' })
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  border: "1px solid rgba(178, 167, 167, 0.1)",
  borderRadius: "16px",
  padding: "45px 36px",
  width: "100%",
});

export const IconCardContainer = style([
  cardBase,
  {
    aspectRatio: "1.824",
    cursor: "pointer",
    selectors: { "&:hover": { transform: "scale(1.02)" } },
  },
]);

export const ButtonCardContainer = style([
  cardBase,
  {
    aspectRatio: "2.75",
    // Either split into two keys...
    // selectors: {
    //   "& > *:nth-child(2)": { opacity: 0, visibility: "hidden" },
    //   "& > *:nth-child(3)": { opacity: 0, visibility: "hidden" },
    //   // ...or use :is() if you prefer one key:
    //   // "& > *:is(:nth-child(2), :nth-child(3))": { opacity: 0, visibility: "hidden" },
    // },
  },
]);

globalStyle(`${ButtonCardContainer} > *:nth-child(2)`, {
  opacity: 0,
  visibility: 'hidden',
});
globalStyle(`${ButtonCardContainer} > *:nth-child(3)`, {
  opacity: 0,
  visibility: 'hidden',
});


/* -------- Text (theme-aware hover color) -------- */
const cardTextBase = style({
  cursor: "pointer",
  marginRight: "65px",
  height: "68px",
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  fontStyle: "normal",
  fontVariant: "normal",
  fontSize: "20px",
  lineHeight: "40px",
  fontFamily: "Roboto",
  fontWeight: 500,
  letterSpacing: "0.34px",
  color: "#6C696A",
  transition: "0.3s ease-in-out",
  "@media": {
    "screen and (max-width: 1280px)": {
      fontSize: "18px",
      lineHeight: "30px",
    },
  },
});

export const CardText = cardTextBase;

export const CardTextTheme = styleVariants({
  REGALBLAZE: {
    // Use &:hover on the variant itself (the variant class is applied to the same element)
    selectors: { "&:hover": { color: "#FCA311", transform: "scale(1.1)" } },
  },
  DEFAULT: {
    selectors: { "&:hover": { color: "#BC3D81", transform: "scale(1.1)" } },
  },
});

/* -------- Button (theme-aware hover gradient) -------- */
const cardButtonBase = style({
  width: "100%",
  height: "50px",
  borderRadius: "6px",
  fontSize: "20px",
  lineHeight: "28px",
  fontFamily: "Roboto",
  fontWeight: 500,
  letterSpacing: "0.34px",
  color: "#6C696A",
  boxShadow: "inset 0px 0px 2px #00000029, 0px 3px 6px #00000029",
  border: "1px solid #9A9A9A",
  opacity: 1,
  backgroundColor: "transparent",
  transition: "0.3s ease-in-out",
  "@media": {
    "screen and (max-width: 1280px)": {
      fontSize: "16px",
      lineHeight: "30px",
      letterSpacing: 0,
    },
  },
  selectors: { "&:hover": { color: "#FFFFFF", border: "none" } },
});

export const CardButton = cardButtonBase;

export const CardButtonTheme = styleVariants({
  REGALBLAZE: {
    selectors: {
      "&:hover": {
        background:
          "transparent linear-gradient(261deg, #FCA311 0%, #CB830E 100%) 0% 0% no-repeat padding-box",
      },
    },
  },
  DEFAULT: {
    selectors: {
      "&:hover": {
        background:
          "transparent linear-gradient(180deg, #BC3D81 0%, #820F4C 100%) 0% 0% no-repeat padding-box",
      },
    },
  },
});

/* -------- Icon wrapper -------- */
export const CardIconWrapper = style({
  width: "44px",
  height: "44px",
});
