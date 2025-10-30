// styles.css.ts
import { style, createVar } from "@vanilla-extract/css";

/** Runtime vars */
export const trackFillVar = createVar(); // e.g. '#FCA311' or 'black'
export const progressVar = createVar(); // e.g. '42%'
export const thumbBgVar = createVar(); // knob color
export const thumbActiveOutlineVar = createVar(); // knob outline on :active
export const labelLeftVar = createVar(); // '12px'
export const labelTopVar = createVar(); // '20px'

export const RangeSliderContainer = style({
  position: "relative",
  width: "300px",
  margin: "20px auto",
});

export const RangeSliderInput = style({
  WebkitAppearance: "none",
  appearance: "none",
  width: "100%",
  height: "11px",
  boxShadow: "0px 3px 12px #7C7C7C29",
  borderRadius: "30px",
  background: "transparent",
  outline: "none",
  cursor: "pointer",

  /* All pseudo styling stays anchored to this class via selectors */
  selectors: {
    /* WebKit thumb */
    "&::-webkit-slider-thumb": {
      WebkitAppearance: "none",
      appearance: "none",
      marginTop: "-5px",
      width: "19px",
      height: "19px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      background: `${thumbBgVar}`,
      border: "4px solid #ffffff",
      boxShadow:
        "rgba(0,0,0,0.07) 0px 1px 1px, rgba(0,0,0,0.07) 0px 2px 2px, rgba(0,0,0,0.07) 0px 4px 4px, rgba(0,0,0,0.07) 0px 8px 8px, rgba(0,0,0,0.07) 0px 16px 16px",
      cursor: "pointer",
      outline: "solid 2px transparent",
      transition: "0.3s ease-in-out",
    },
    "&::-webkit-slider-thumb:active": {
      outline: `solid 2px ${thumbActiveOutlineVar})`,
    },

    /* WebKit track */
    "&::-webkit-slider-runnable-track": {
      height: "9px",
      borderRadius: "30px",
      border: "none",
      background: `linear-gradient(
        to right,
        ${trackFillVar} 0%,
        ${trackFillVar} ${progressVar},
        #ffffff ${progressVar},
        #ffffff 100%
      )`,
    },

    /* Firefox thumb */
    "&::-moz-range-thumb": {
      width: "19px",
      height: "19px",
      borderRadius: "50%",
      background: `${thumbBgVar}`,
      border: "4px solid #ffffff",
      boxShadow:
        "rgba(0,0,0,0.07) 0px 1px 1px, rgba(0,0,0,0.07) 0px 2px 2px, rgba(0,0,0,0.07) 0px 4px 4px, rgba(0,0,0,0.07) 0px 8px 8px, rgba(0,0,0,0.07) 0px 16px 16px",
      cursor: "pointer",
      outline: "solid 2px transparent",
      transition: "0.3s ease-in-out",
    },
    "&:active::-moz-range-thumb": {
      outline: `solid 2px ${thumbActiveOutlineVar}`,
    },

    /* Firefox track */
    "&::-moz-range-track": {
      height: "9px",
      borderRadius: "30px",
      background: `linear-gradient(
        to right,
        ${trackFillVar} 0%,
        ${trackFillVar} ${progressVar},
        #ffffff ${progressVar},
        #ffffff 100%
      )`,
    },

    "&:hover": { opacity: 1 },
    "&:disabled": { opacity: 0.2, cursor: "not-allowed" },
  },
});

export const ValueLabel = style({
  position: "absolute",
  textAlign: "center",
  backgroundColor: "rgba(255,255,255,0.4)",
  backdropFilter: "blur(4px)",
  top: `${labelTopVar}`,
  left: `${labelLeftVar}`,
  borderRadius: "6px",
  fontSize: "10px",
  fontWeight: 500,
  padding: "0px 5px",
  zIndex: 10,
  boxShadow:
    "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
});

export const MilestonesContainer = style({
  width: "100%",
  marginTop: "10px",
  position: "relative",
});

export const MilestoneLabel = style({
  fontSize: "12px",
  position: "absolute",
  fontWeight: 500,
  letterSpacing: "0px",
  color: "#000000",
});

export const ToolTipTriangle = style({
  position: "absolute",
  width: 0,
  height: 0,
  top: "20px",
  borderStyle: "solid",
  borderWidth: "0 5.5px 9px 5.5px",
  borderColor: "transparent transparent black transparent",
  transform: "rotate(180deg)",
});

export const scrollBox = style({
  overflowY: "auto",
  selectors: {
    "&::-webkit-scrollbar": { width: 7, height: 5 },
    "&::-webkit-scrollbar-track": {
      borderRadius: 30,
      opacity: 1 as unknown as number,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#CBCBCB",
      borderRadius: 30,
    },
  },
});
