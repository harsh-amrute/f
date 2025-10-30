import { style, createVar, globalStyle } from '@vanilla-extract/css';
// import type { CSSProperties } from 'react';
import * as gridSystem from '../../../../styles/gridSystem.css';

// runtime height var
// breakpoints (adjust to your tokens if you have them)
const size = {
  laptop: '1024px',
  desktop: '1440px',
};

// dynamic vars
export const vHeight = createVar();
export const vZoomBase = createVar();
export const vZoomLaptop = createVar();
export const vZoomDesktop = createVar();

export const VFTableWrapper = style({
  height: vHeight, // set via inline vars
  width: 'min(1200px, 100%)',     // replaces the broken width
  maxWidth: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  // if inside a flex parent:
  minWidth: 0,

  // reset margins whether the theme is on this element or its direct child
  // selectors: {
  //   '&.ag-theme-alpine, &.ag-theme-noir-fusion': { margin: 0 },
  //   '& > .ag-theme-alpine, & > .ag-theme-noir-fusion': { margin: 0 },
  // },

  // default behavior (disableZoomScaling = false)
  // TS doesn't love "zoom"—cast is fine.
  zoom: 0.75 as unknown as string | number,

  '@media': {
    // keep 0.75 between laptop and desktop
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      { zoom: 0.75 as unknown as string | number },

    // desktop and up: 1
    [`screen and (min-width: ${gridSystem.size.desktop})`]: {
      zoom: 1 as unknown as string | number,
    },
  },

    // defaults (zoom scaling ON)
    vars: {
      [vHeight]: '600px',   // default height; gets overridden inline
      [vZoomBase]: '0.75',
      [vZoomLaptop]: '0.75',
      [vZoomDesktop]: '1',
    },  
});



// modifier when disableZoomScaling = true
export const vfNoZoomScale = style({
  zoom: 1 as unknown as string | number,
  '@media': {
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.desktop})`]:
      { zoom: 1 as unknown as string | number },
    [`screen and (min-width: ${gridSystem.size.desktop})`]: {
      zoom: 1 as unknown as string | number,
    },
  },
});

// If the theme class is on the same element:
globalStyle(`${VFTableWrapper}.ag-theme-alpine`, { margin: 0 });
globalStyle(`${VFTableWrapper}.ag-theme-noir-fusion`, { margin: 0 });

// If the theme class is on the direct child:
globalStyle(`${VFTableWrapper} > .ag-theme-alpine`, { margin: 0 });
globalStyle(`${VFTableWrapper} > .ag-theme-noir-fusion`, { margin: 0 });


// helper to set height at runtime
// export const vfTableWrapperVars = (height?: string): CSSProperties => ({
//   [vHeight]: height ?? 'auto',
// });
