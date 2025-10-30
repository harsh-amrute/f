// styles.css.ts
import { style, globalStyle } from '@vanilla-extract/css';

const laptop = '1024px';
const desktop = '1440px';

/**
 * Container that used to be a styled-component.
 * We scope all AG Grid descendant rules using selectors on this class.
 */
export const SCDynamicContainer = style({
  display: 'block',
  height: '150vh',
  padding: 20,

  '@media': {
    [`screen and (min-width: ${laptop}) and (max-width: ${desktop})`]: {
      height: '70vh',
    },
    [`screen and (min-width: ${desktop})`]: {
      height: '110vh',
    },
  },

  // selectors: {
  //   /* push pagination up */
  //   '& > div[data-testid="vf_pagination"]': {
  //     marginTop: 0,
  //   },

  //   /* header text */
  //   '& .ag-header-cell-text': {
  //     fontSize: 12,
  //   },

  //   /* ag-theme-alpine tuning when placed directly under container */
  //   '& > .ag-theme-alpine': {
  //     flex: 1,
  //     height: '100%',
  //   },
  //   '& > .ag-theme-alpine .ag-cell': {
  //     height: '100%',
  //   },
  //   '& > .ag-theme-alpine .ag-paging-panel': {
  //     height: 24,
  //   },
  //   '& > .ag-theme-alpine .ag-side-buttons': {
  //     fontSize: 10,
  //   },
  //   '& > .ag-theme-alpine .ag-header': {
  //     borderRadius: 0,
  //   },
  //   '& > .ag-theme-alpine .ag-pivot-off': {
  //     height: 47,
  //     minHeight: 47,
  //   },
  //   '& > .ag-theme-alpine .ag-header-cell': {
  //     minHeight: 24,
  //     height: 24,
  //   },
  //   '& > .ag-theme-alpine .ag-header-row': {
  //     minHeight: 20,
  //     height: 20,
  //   },
  //   '& > .ag-theme-alpine .ag-header-container': {
  //     minHeight: 20,
  //     height: 20,
  //   },
  //   '& > .ag-theme-alpine .ag-header-row-column-filter': {
  //     top: 23,
  //     height: 24,
  //   },
  //   '& > .ag-theme-alpine .ag-input-field-input': {
  //     height: 14,
  //     minHeight: 10,
  //     fontSize: 12,
  //   },
  //   '& > .ag-theme-alpine .ag-column-drop': {
  //     background: '#D2CECE',
  //   },
  //   '& > .ag-theme-alpine .ag-status-bar': {
  //     fontSize: 12,
  //   },

  //   /* ===== The following replicate your .ag-theme-planning-custom tweaks, but scoped ===== */

  //   /* font sizes inside planning-custom theme */
  //   '&.ag-theme-planning-custom .ag-tool-panel-wrapper': {
  //     width: 200,
  //     fontSize: 13,
  //   },
  //   '&.ag-theme-planning-custom .ag-side-buttons': {
  //     fontSize: 13,
  //   },
  //   '&.ag-theme-planning-custom .ag-status-bar': {
  //     fontSize: 13,
  //   },
  //   '&.ag-theme-planning-custom .ag-row': {
  //     fontSize: 13,
  //   },
  //   '&.ag-theme-planning-custom .ag-header-cell': {
  //     fontSize: 14,
  //   },
  //   '&.ag-theme-planning-custom .ag-checkbox-input-wrapper': {
  //     fontSize: 12,
  //   },
  //   '&.ag-theme-planning-custom .ag-column-select-checkbox:not(:last-child)': {
  //     marginRight: 4,
  //   },
  // },
});
/* --------- Descendants of the container (use globalStyle) --------- */

/* push pagination up */
globalStyle(`${SCDynamicContainer} > div[data-testid="vf_pagination"]`, {
  marginTop: '0',
});

/* header text */
globalStyle(`${SCDynamicContainer} .ag-header-cell-text`, {
  fontSize: '12px',
});

/* ag-theme-alpine tuning when placed directly under container */
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine`, {
  flex: 1,
  height: '100%',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-cell`, {
  height: '100%',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-paging-panel`, {
  height: '24px',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-side-buttons`, {
  fontSize: '10px',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-header`, {
  borderRadius: '0',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-pivot-off`, {
  height: '47px',
  minHeight: '47px',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-header-cell`, {
  minHeight: '24px',
  height: '24px',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-header-row`, {
  minHeight: '20px',
  height: '20px',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-header-container`, {
  minHeight: '20px',
  height: '20px',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-header-row-column-filter`, {
  top: '23px',
  height: '24px',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-input-field-input`, {
  height: '14px',
  minHeight: '10px',
  fontSize: '12px',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-column-drop`, {
  background: '#D2CECE',
});
globalStyle(`${SCDynamicContainer} > .ag-theme-alpine .ag-status-bar`, {
  fontSize: '12px',
});

/* ===== scoped .ag-theme-planning-custom tweaks ===== */
globalStyle(`${SCDynamicContainer}.ag-theme-planning-custom .ag-tool-panel-wrapper`, {
  width: '200px',
  fontSize: '13px',
});
globalStyle(`${SCDynamicContainer}.ag-theme-planning-custom .ag-side-buttons`, {
  fontSize: '13px',
});
globalStyle(`${SCDynamicContainer}.ag-theme-planning-custom .ag-status-bar`, {
  fontSize: '13px',
});
globalStyle(`${SCDynamicContainer}.ag-theme-planning-custom .ag-row`, {
  fontSize: '13px',
});
globalStyle(`${SCDynamicContainer}.ag-theme-planning-custom .ag-header-cell`, {
  fontSize: '14px',
});
globalStyle(`${SCDynamicContainer}.ag-theme-planning-custom .ag-checkbox-input-wrapper`, {
  fontSize: '12px',
});
globalStyle(`${SCDynamicContainer}.ag-theme-planning-custom .ag-column-select-checkbox:not(:last-child)`, {
  marginRight: '4px',
});
