// styles.css.ts
import {
  style,
  keyframes,
  createVar,
  styleVariants,
} from "@vanilla-extract/css";

/* ========== Theme runtime vars ========== */
export const focusOutlineVar = createVar(); // maps to chooseThemeColor[themeUi].color4
export const primaryBgVar = createVar(); // maps to chooseThemeColor[themeUi].color5
export const primaryWidthVar = createVar();
export const primaryHeightVar = createVar();
export const primaryRadiusVar = createVar();

/* ========== Skeleton animation ========== */
const skeletonFade = keyframes({
  "50%": { opacity: "0.5" },
});

/* ========== Inputs ========== */
export const input = style({
  border: "none",
  outline: "solid 2px transparent",
  borderRadius: "6px",
  background: "#F7F7F7 0% 0% no-repeat padding-box",
  opacity: 1,
  padding: "0 15px",
  height: "39px",
  fontSize: "12px",
  transition: "0.2s ease-in-out",

  selectors: {
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    },
    "&:active, &:focus": {
      outlineColor: focusOutlineVar,
    },
  },
});

export const textArea = style({
  border: "none",
  outline: "solid 2px transparent",
  borderRadius: "6px",
  background: "#F7F7F7 0% 0% no-repeat padding-box",
  opacity: 1,
  width: "100%",
  maxWidth: "100%",
  minWidth: "100%",
  padding: "5px 15px",
  fontFamily: "inherit",
  fontSize: "12px",
  minHeight: "100px",
  transition: "0.3s ease-in",

  selectors: {
    "&:active, &:focus": {
      outlineColor: focusOutlineVar,
    },
  },
});

/* ========== Skeleton block ========== */
export const skeleton = style({
  backgroundColor: "#e2e2e2",
  animation: `${skeletonFade} 3s ease-in-out infinite`,
  borderRadius: "4px",
});

/* ========== Buttons ========== */
const buttonBase = style({
  height: "30px",
  padding: "4px 10px",
  opacity: 0.8,
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.2)",
  transition: "0.2s ease-in-out",
  outline: "solid 1px transparent",

  selectors: {
    "&:hover": { opacity: 1 },
    "&:disabled": {
      opacity: "0.5 !important",
      cursor: "not-allowed",
    },
    "&:active, &:focus": {
      opacity: 0.9,
    },
  },
});

export const button = buttonBase;

export const primaryButton = style([
  buttonBase,
  {
    backgroundColor: primaryBgVar,
    color: "white",
    selectors: {
      "&:hover:not(:disabled)": { boxShadow: "0 0 0 3px rgba(0,0,0,.05)" },
      "&:focus-visible": { outline: "solid 1px #dee2e6" },
      "&:disabled": { opacity: 0.6, cursor: "not-allowed" },
    },
  },
]);

export const secondaryButton = style([
  buttonBase,
  {
    boxShadow: "none",
  },
]);
