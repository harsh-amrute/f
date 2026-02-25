import { style, createVar, globalStyle } from "@vanilla-extract/css";
// import type { CSSProperties } from 'react';
import * as gridSystem from "../../../../styles/gridSystem.css";

// runtime height var
// breakpoints (adjust to your tokens if you have them)
const size = {
  laptop: "1024px",
  desktop: "1440px",
};

// dynamic vars
export const vHeight = createVar();
export const vZoom = createVar();

export const VFTableWrapper = style({
  height: vHeight,
  // max-height:90%;
  /* margin:20px; */
  zoom: vZoom,
  // width: "1200px",

  // @media (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem
  //   .size.desktop}) {
  //       ${props => props.disableZoomScaling ? 1 : 0.75};
  //   }

  "@media": {
    // keep 0.75 between laptop and desktop
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      {},

    // desktop and up: 1
    [`screen and (min-width: ${gridSystem.size.desktop})`]: {
      zoom: 1 as unknown as string | number,
    },
  },

  //   // defaults (zoom scaling ON)
  //   vars: {
  //     [vHeight]: '600px',   // default height; gets overridden inline
  //     [vZoomBase]: '0.75',
  //     [vZoomLaptop]: '0.75',
  //     [vZoomDesktop]: '1',
  //   },
});

// If the theme class is on the same element:
// globalStyle(`${VFTableWrapper}.ag-theme-alpine`, { margin: '0 !important' });
// globalStyle(`${VFTableWrapper}.ag-theme-noir-fusion`, { margin: '0 !important' });

// If the theme class is on the direct child:
globalStyle(`${VFTableWrapper} > .ag-theme-alpine`, { margin: "0 !important" });
globalStyle(`${VFTableWrapper} > .ag-theme-noir-fusion`, {
  margin: "0 !important",
});
