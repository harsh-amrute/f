// Table.css.ts
import { style, createVar, globalStyle } from "@vanilla-extract/css";

// Dynamic height var (so you can override 85vh with assignInlineVars if needed)
export const tableHeightVar = createVar();

export const TableWrapper = style({
  display: "flex",
  marginLeft: 20,
  flexDirection: "column",
  gap: 10,
  height: tableHeightVar,

  // default height = 85vh
  vars: {
    [tableHeightVar]: "85vh",
  },
});

// ✅ Proper way to target `.ag-theme-alpine` under this wrapper in vanilla-extract
globalStyle(`${TableWrapper} > .ag-theme-alpine`, {
  flex: 1,
  height: "100%",
});

globalStyle(`${TableWrapper} > .ag-paging-panel`, {
  zIndex: 1,
  fontSize: "11px !important",
  fontFamily: "Roboto !important",
  position: "relative",
});

globalStyle(`${TableWrapper} > .ag-status-bar`, {
  zIndex: '2 !important', 
  display: 'flex  !important', 
  justifyContent: 'space-between !important',
  alignItems: 'center !important',
  border:'none !important',
  width: 'calc(100% - 230px) !important',
  position: 'absolute',
  bottom: '-0px !important'
});
