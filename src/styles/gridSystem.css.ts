// gridsystem.css.ts
import { style, createVar } from "@vanilla-extract/css";
// import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "./global";

export const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "1688px",
};

// ---- media helpers (use size directly) ----
const mqLaptopToDesktop = `screen and (min-width: ${size.laptop}) and (max-width: ${size.desktop})`;
const mqDesktopUp = `screen and (min-width: ${size.desktop})`;

// ---- runtime vars for colors/width/padding ----
export const vColor1 = createVar();
export const vColor2 = createVar();
export const vLeftWidth = createVar();
export const vRightWidth = createVar();
export const vPadLeft = createVar();
export const vZoomBase = createVar();
export const vZoomLaptop = createVar();
export const vZoomDesktop = createVar();

// optional helpers to set vars inline
// export const setThemeVars = (opts: { color1?: string; color2?: string }) =>
//   assignInlineVars({
//     ...(opts.color1 ? { [vColor1]: opts.color1 } : {}),
//     ...(opts.color2 ? { [vColor2]: opts.color2 } : {}),
//   });

// export const setLeftWidth = (width: string) =>
//   assignInlineVars({ [vLeftWidth]: width });
// export const setRightWidth = (width: string) =>
//   assignInlineVars({ [vRightWidth]: width });
// export const setPadLeft = (px: number | string) =>
//   assignInlineVars({ [vPadLeft]: typeof px === "number" ? `${px}px` : px });

// ---- classes (ported) ----
export const SCGrid = style({});

export const SCRow = style({
  marginLeft: "calc(var(--pd) * -1)",
  marginRight: "calc(var(--pd) * -1)",
  display: "flex",
  flexWrap: "wrap",
  minHeight: "90vh",
});

export const SCFull = style({
  maxWidth: "1260px",
  paddingLeft: globalStyles.pd,
  paddingRight: globalStyles.pd,
  display: "flex",
  flexWrap: "wrap",
});

export const SCCol = style({
  paddingLeft: globalStyles.pd,
  paddingRight: globalStyles.pd,
});

export const SCCol1 = style({
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: "3%",
  backgroundColor: vColor1,
  zIndex: 4,
  vars: { [vColor1]: "transparent" },
});

export const SCCol2 = style({
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: vLeftWidth,
  maxWidth: vLeftWidth,
  transition: "all 0.3s ease",
  backgroundColor: vColor2,
  vars: { [vLeftWidth]: "0%", [vColor2]: "transparent" },
});

export const SCCol4 = style({
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: "33.33%",
  maxWidth: "33.33%",
});

export const SCCol5 = style({
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: "66.66%",
  maxWidth: "66.66%",
});

export const SCCol6 = style({
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: "50%",
  maxWidth: "50%",
});

export const SCCol8 = style({
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: vRightWidth,
  maxWidth: vRightWidth,
  paddingLeft: vPadLeft,
  transition: "all 0.3s ease",

  // default zoom (disableZoomScaling === false)
  zoom: 0.75 as unknown as string | number,

  "@media": {
    [mqLaptopToDesktop]: {
      paddingLeft: vPadLeft,
      zoom: 1 as unknown as string | number,
    },
    [mqDesktopUp]: {
      paddingLeft: vPadLeft,
      zoom: 1 as unknown as string | number,
    },
  },

  // vars: {
  //   [vRightWidth]: "100%",
  //   [vPadLeft]: "50px",
  //   [vZoomBase]: "0.75",
  //   [vZoomLaptop]: "0.75",
  //   [vZoomDesktop]: "1",
  // },
});

// modifier: force zoom=1 everywhere (disableZoomScaling === true)
export const noZoomScale = style({
  zoom: 1 as unknown as string | number,
  "@media": {
    [mqLaptopToDesktop]: { zoom: 1 as unknown as string | number },
    [mqDesktopUp]: { zoom: 1 as unknown as string | number },
  },
});

export const SCFullScreen = style({
  height: "10vh",
  position: "sticky",
  top: 0,
  zIndex: 9990,
});



const grid = {
  size: {
    laptop: '1024px',
    desktop: '1280px',
  },
};

const customTransition = 'all 200ms ease'; // or import from your theme

export const baseCol8 = style({
  transition: customTransition,
});

// padding variants
export const paddingLeft0 = style({
  paddingLeft: 0,
  '@media': {
    [`screen and (min-width: ${grid.size.laptop}) and (max-width: ${grid.size.desktop})`]:
      { paddingLeft: 0 },
  },
});

export const paddingLeft50 = style({
  paddingLeft: 50,
  '@media': {
    [`screen and (min-width: ${grid.size.laptop}) and (max-width: ${grid.size.desktop})`]:
      { paddingLeft: 50 },
  },
});

// zoom variants
export const zoom075 = style({
  // scale to 0.75 on < desktop, reset to 1 on >= desktop (matches original)
  zoom: 0.75 as unknown as number,
  '@media': {
    [`screen and (min-width: ${grid.size.laptop}) and (max-width: ${grid.size.desktop})`]:
      { zoom: 0.75 as unknown as number },
    [`screen and (min-width: ${grid.size.desktop})`]: { zoom: 1 as unknown as number },
  },
});

export const zoom1 = style({
  zoom: 1 as unknown as number,
  '@media': {
    // not strictly necessary, but keeps parity with the styled-component
    [`screen and (min-width: ${grid.size.laptop}) and (max-width: ${grid.size.desktop})`]:
      { zoom: 1 as unknown as number },
    [`screen and (min-width: ${grid.size.desktop})`]: { zoom: 1 as unknown as number },
  },
});

