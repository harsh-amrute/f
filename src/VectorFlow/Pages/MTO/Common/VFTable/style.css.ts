import { style, createVar, globalStyle } from '@vanilla-extract/css';

export const vHeight = createVar();

export const VFTableWrapper = style({
  height: vHeight,
  // max-height: 90%; // (kept commented like original)
  // margin: 20px 0;  // (kept commented like original)
  zoom: '1 !important',
  width: 'min(1200px, 100%)',     // replaces the broken width
  minWidth: 0,
  overflow: 'hidden',

  // selectors: {
  //   // cover both: wrapper IS the theme element, or contains it
  //   '& > .ag-theme-alpine': { margin: '0 !important' },
  //   '& > .ag-theme-noir-fusion': { margin: '0 !important' },
  //   '&.ag-theme-alpine': { margin: '0 !important' },
  //   '&.ag-theme-noir-fusion': { margin: '0 !important' },

  //   // resizer (descendant + direct child just in case)
  //   '& > .ag-header-cell-resize': {
  //     position: 'absolute',
  //     zIndex: 0,
  //     height: '100%',
  //     width: '8px',
  //     top: 0,
  //     cursor: 'ew-resize',
  //   },
  //   '& .ag-header-cell-resize': {
  //     position: 'absolute',
  //     zIndex: 0,
  //     height: '100%',
  //     width: '8px',
  //     top: 0,
  //     cursor: 'ew-resize',
  //   },
  // },
});

// descendants (scoped)
globalStyle(`${VFTableWrapper} > .ag-theme-alpine`, { margin: 0 });
globalStyle(`${VFTableWrapper} > .ag-theme-noir-fusion`, { margin: 0 });

globalStyle(`${VFTableWrapper} > .ag-header-cell-resize`, {
  position: 'absolute',
  zIndex: 0,
  height: '100%',
  width: '8px',
  top: 0,
  cursor: 'ew-resize',
});
globalStyle(`${VFTableWrapper} .ag-header-cell-resize`, {
  position: 'absolute',
  zIndex: 0,
  height: '100%',
  width: '8px',
  top: 0,
  cursor: 'ew-resize',
});


/** helper to set height at runtime (defaults to 'auto') */
// export const vfTableWrapperVars = (height?: string) =>
//   assignInlineVars({ [vHeight]: height ?? 'auto' });
