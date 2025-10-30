import { style, globalStyle } from '@vanilla-extract/css';
import * as gridSystem from "../../../../../../../styles/gridSystem.css";

export const TableResizebarWrapper = style({
  position: 'relative',
  width: '100%',
});

export const TableContainer = style({
  width: '100%',
  overflow: 'hidden',
  '@media': {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      },
  },
});

export const ResizeBar = style({
  position: 'absolute',
  width: '100%',
  height: '10px',
  borderRadius: '4px',
  backgroundColor: '#8080804d',
  cursor: 'ns-resize',
  bottom: '0px',
  left: '0px',
});

export const TableWrapper = style({
  width: '100%',
  textAlign: 'center',
  // selectors: {
  //   '& .ag-theme-alpine': {
  //     margin: '20px 0',
  //   },
  // },
});
// descendants of TableWrapper
globalStyle(`${TableWrapper} :global(.ag-theme-alpine)`, {
  margin: '20px 0',
});
export const CellWithBar = style({
  fontWeight: 400,
  fontSize: '18px',
  color: '#686060',
  letterSpacing: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: '20px',
  '@media': {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        fontWeight: 400,
        fontSize: '18px',
        color: '#686060',
        letterSpacing: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '10px',
      },
  },
});

export const BarContainer = style({
  width: '100px',
  '@media': {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        width: '30px',
      },
  },
});

export const CellBar = style({
  backgroundImage: 'linear-gradient(to right, #8d2e61, #bb3f81, #db6ba7)',
  height: '20px',
  borderRadius: '2px',
});

export const CellBarValue = style({
  marginRight: '20px',
  '@media': {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        marginRight: '0px',
      },
  },
});

export const VFTableWrapper = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  zoom: '1',
  width: '100%',
  paddingRight: '25px',
  margin: '0 20px',
  // selectors: {
  //   '& .ag-theme-alpine': {
  //     flex: '1 !important',
  //   },
  //   '& .ag-paging-panel': {
  //     zIndex: 1,
  //     fontSize: '11px !important',
  //     fontFamily: `'Roboto' !important`,
  //     position: 'relative',
  //   },
  //   '& .ag-status-bar': {
  //     zIndex: 2,
  //     display: 'flex !important',
  //     justifyContent: 'space-between !important',
  //     alignItems: 'center !important',
  //     border: 'none !important',
  //     width: 'calc(100% - 230px) !important',
  //     position: 'absolute',
  //     bottom: '0 !important',
  //   },
  // },
});
// descendants of VFTableWrapper
globalStyle(`${VFTableWrapper} :global(.ag-theme-alpine)`, {
  flex: '1 !important',
});

globalStyle(`${VFTableWrapper} :global(.ag-paging-panel)`, {
  zIndex: 1,
  fontSize: '11px !important',
  fontFamily: 'Roboto !important',
  position: 'relative',
});

globalStyle(`${VFTableWrapper} :global(.ag-status-bar)`, {
  zIndex: 2,
  display: 'flex !important',
  justifyContent: 'space-between !important',
  alignItems: 'center !important',
  border: 'none !important',
  width: 'calc(100% - 230px) !important',
  position: 'absolute',
  bottom: '0 !important',
});
