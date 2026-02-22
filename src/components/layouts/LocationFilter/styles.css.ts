import { style } from "@vanilla-extract/css";
import * as gridSystem from "../../../styles/gridSystem.css";

const laptopRange = `screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`;

export const locationFilter = style({
  width: "90%",
  paddingRight: "20px",
  borderRight: "1px solid #d8d8d8",
  "@media": {
    "screen and (max-width: 1280px)": {
      width: "100%",
    },
  },
});

export const productFilterImg = style({
  width: "34px",
  "@media": {
    [laptopRange]: { width: "22px" },
  },
});

export const producFilterHeader = style({
  display: "flex",
  alignItems: "center",
  paddingBottom: "14px",
  "@media": {
    [laptopRange]: { paddingBottom: "8px" },
  },
});

export const productBoxSelect = style({
  display: "flex",
  flexWrap: "wrap",
});

export const productBoxSelectItem = style({
  position: "relative",
  // flex-basis / max-width are set inline from the "width" prop
});

// export const SCProductBoxSelectItem = styled.div<{ width: number }>`
//   flex: 1 0 ${(props) => props.width}%;
//   max-width: ${(props) => props.width}%;
//   position: relative;
// `

export const productFilterText = style({
  fontSize: "2rem",
  lineHeight: "2.6rem",
  fontWeight: 500,
  paddingLeft: "18px",
  "@media": {
    [laptopRange]: {
      fontSize: "1.6rem",
      lineHeight: "100%",
    },
  },
});

/* Icon: base + top-offset variants */
export const iconLocationBase = style({
  position: "absolute",
  maxWidth: "16px",
  left: "9px",
  zIndex: 2,
});

export const iconLocationTop16 = style({ top: "16px" });
export const iconLocationTop19 = style({ top: "19px" });

export const iconDown = style({
  position: "absolute",
  zIndex: 2,
  right: "13px",
  top: "19.4px",
});
