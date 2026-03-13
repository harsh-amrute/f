import { style, createVar } from "@vanilla-extract/css";
import * as globalStyles from "../../../styles/global";
import * as gridSystem from "../../../styles/gridSystem.css";

/* Runtime-controlled color for border + thumb bg */
export const sliderColorVar = createVar();

export const Wrapper = style({
  height: "50%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  top: "10px",
});

export const Input = style({
  // track
  WebkitAppearance: "none",
  appearance: "none",
  height: "40px",
  width: "90px",
  backgroundColor: globalStyles.white,
  borderRadius: "25px",
  padding: "0 2px",
  margin: 0,
  cursor: "pointer",
  border: `1px solid ${sliderColorVar}`,

  ":focus": { outline: "none" },

  // webkit thumb
  selectors: {
    "&::-webkit-slider-thumb": {
      WebkitAppearance: "none",
      appearance: "none",
      width: "32px",
      height: "32px",
      backgroundColor: sliderColorVar,
      borderRadius: "50%",
      cursor: "pointer",
    },
    // firefox thumb
    "&::-moz-range-thumb": {
      width: "32px",
      height: "32px",
      backgroundColor: sliderColorVar,
      borderRadius: "50%",
      cursor: "pointer",
      border: "none",
    },
  },

  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      {
        width: "70px",
        height: "30px",
        selectors: {
          "&::-webkit-slider-thumb": { width: "25px", height: "25px" },
          "&::-moz-range-thumb": { width: "25px", height: "25px" },
        },
      },
  },
});

export const Text = style({
  fontSize: "1.4rem",
  color: globalStyles.black,
  fontWeight: 300,
});
