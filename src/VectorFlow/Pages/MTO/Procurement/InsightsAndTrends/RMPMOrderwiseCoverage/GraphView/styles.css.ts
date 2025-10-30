import { style, globalStyle  } from '@vanilla-extract/css';

export const capsuleWrapper = style({
  width: '100%',
  marginLeft: 'auto',
  // maxWidth: '120px',
});

export const chartWrapper = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',

  // descendants inside your chart container
  // selectors: {
  //   '& .chart-wrapper > div': {
  //     height: '100% !important',
  //   },
  //   '& .chart-wrapper > div .ag-charts-wrapper': {
  //     maxHeight: '100% !important',
  //   },
  //   '& .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas': {
  //     height: '100%',
  //   },
  //   '& .chart-wrapper > div .ag-charts-wrapper .ag-charts-canvas > canvas': {
  //     height: '100% !important',
  //   },
  // },
});

/* Descendant rules must use globalStyle, and global classes use :global(...) */
globalStyle(`${chartWrapper} :global(.chart-wrapper) > div`, {
  height: '100% !important',
});

globalStyle(
  `${chartWrapper} :global(.chart-wrapper) > div :global(.ag-charts-wrapper)`,
  { maxHeight: '100% !important' }
);

globalStyle(
  `${chartWrapper} :global(.chart-wrapper) > div :global(.ag-charts-wrapper) :global(.ag-charts-canvas)`,
  { height: '100%' }
);

globalStyle(
  `${chartWrapper} :global(.chart-wrapper) > div :global(.ag-charts-wrapper) :global(.ag-charts-canvas) > canvas`,
  { height: '100% !important' }
);


export const graphViewWrapper = style({
  width: '100%',
  height: '100%',
  paddingLeft: '20px',
  paddingTop: '20px',
  paddingBottom: '20px',
});
