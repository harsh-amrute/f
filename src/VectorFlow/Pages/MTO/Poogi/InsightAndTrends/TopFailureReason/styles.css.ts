// styles.css.ts
import { style, globalStyle } from '@vanilla-extract/css';

/* wrappers */
export const horizontalViewWrapper = style({ width: '100%' });

export const btrTableWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: 20,
  marginBottom: 20,
  height: '100%',
});

export const btrAllotmentSection = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxHeight: '100%',
});

/* AG Grid descendant tweaks (OK in vanilla-extract) */
export const agThemePlanningCustom = style({
  // selectors: {
  //   '& .ag-tool-panel-wrapper': { width: '200px', fontSize: '13px' },
  //   '& .ag-side-buttons': { fontSize: '13px' },
  //   '& .ag-status-bar': { fontSize: '13px' },
  //   '& .ag-row': { fontSize: '13px' },
  //   '& .ag-header-cell': { fontSize: '14px' },
  //   '& .ag-checkbox-input-wrapper': { fontSize: '12px' },
  //   '& .ag-column-select-checkbox:not(:last-child)': { marginRight: '4px !important' },
  // },
});

/* descendant rules scoped to the hook */
globalStyle(`${agThemePlanningCustom} .ag-tool-panel-wrapper`, {
  width: '200px',
  fontSize: '13px',
});
globalStyle(`${agThemePlanningCustom} .ag-side-buttons`, { fontSize: '13px' });
globalStyle(`${agThemePlanningCustom} .ag-status-bar`, { fontSize: '13px' });
globalStyle(`${agThemePlanningCustom} .ag-row`, { fontSize: '13px' });
globalStyle(`${agThemePlanningCustom} .ag-header-cell`, { fontSize: '14px' });
globalStyle(`${agThemePlanningCustom} .ag-checkbox-input-wrapper`, { fontSize: '12px' });
globalStyle(
  `${agThemePlanningCustom} .ag-column-select-checkbox:not(:last-child)`,
  { marginRight: '4px' } // avoid !important; bump specificity if needed
);

