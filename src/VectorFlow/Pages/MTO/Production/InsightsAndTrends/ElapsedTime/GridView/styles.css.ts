// styles.css.ts
import { style, globalStyle } from '@vanilla-extract/css';

// If you already have these breakpoints, import them from your gridSystem.
const size = {
  laptop: '1024px',
  desktop: '1280px',
};
const cssVars = (vars: Record<`--${string}`, string>) => vars;

export const scDynamicContainer = style({
  display: 'block',
  height: '150vh',
  padding: '20px',

  '@media': {
    [`screen and (min-width: ${size.laptop}) and (max-width: ${size.desktop})`]: {
      height: '70vh',
    },
    [`screen and (min-width: ${size.desktop})`]: {
      height: '70vh',
    },
  },
});
/* ── Descendants of scDynamicContainer (plain selectors; no :global) ── */
globalStyle(`${scDynamicContainer} .ag-header-cell-text`, {
  fontSize: '12px',
});

// Direct child theme container
globalStyle(`${scDynamicContainer} > .ag-theme-alpine`, {
  flex: 1,
  height: '100%',
  ...cssVars({
    '--ag-grid-size': '3px',
    '--ag-list-item-height': '20px',
    '--ag-font-size': '10px',
    '--ag-row-hover-color': 'rgb(188, 61, 129, 0.3)',
  }),
});

// Descendants of the child theme container
globalStyle(`${scDynamicContainer} > .ag-theme-alpine .ag-cell`, {
  height: '100% !important',
});
globalStyle(`${scDynamicContainer} > .ag-theme-alpine .ag-paging-panel`, {
  height: '24px !important',
});
globalStyle(`${scDynamicContainer} > .ag-theme-alpine .ag-side-buttons`, {
  fontSize: '10px',
});
globalStyle(`${scDynamicContainer} > .ag-theme-alpine .ag-header`, {
  borderRadius: 0,
});
globalStyle(`${scDynamicContainer} > .ag-theme-alpine .ag-pivot-off`, {
  height: '47px !important',
  minHeight: '47px !important',
});
globalStyle(`${scDynamicContainer} > .ag-theme-alpine .ag-header-cell`, {
  minHeight: '24px !important',
  height: '24px !important',
});
globalStyle(`${scDynamicContainer} > .ag-theme-alpine .ag-header-row`, {
  minHeight: '20px !important',
  height: '20px !important',
});
globalStyle(`${scDynamicContainer} > .ag-theme-alpine .ag-header-container`, {
  minHeight: '20px !important',
  height: '20px !important',
});
globalStyle(`${scDynamicContainer} > .ag-theme-alpine .ag-header-row-column-filter`, {
  top: '23px !important',
  height: '24px !important',
});
globalStyle(`${scDynamicContainer} > .ag-theme-alpine .ag-input-field-input`, {
  height: '14px !important',
  minHeight: '10px !important',
  fontSize: '12px',
});
globalStyle(`${scDynamicContainer} > .ag-theme-alpine .ag-column-drop`, {
  background: '#D2CECE',
});
globalStyle(`${scDynamicContainer} > .ag-theme-alpine .ag-status-bar`, {
  height: '24px !important',
  fontSize: '10px',
});

// Pagination container under this wrapper
globalStyle(`${scDynamicContainer} div[data-testid="vf_pagination"]`, {
  marginTop: '0px',
});
