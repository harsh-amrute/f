import { style, createVar } from '@vanilla-extract/css';

/* ===== runtime theme vars ===== */
export const rrrBgVar   = createVar();   // analytics container background
export const rrrTextVar = createVar();   // analytics container text color
export const rrrSepVar  = createVar();   // tiny separator bar color

/* ===== layout ===== */
export const RRRLayout = style({
  marginTop: 10,
  marginLeft: 20,
  // marginBottom: 40,
});

export const RRRTaskBar = style({
  position: 'fixed',
  width: '97%',
  right: 0,
  top: '13vh',
  height: 70,
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 20,
  padding: 16,
  zIndex: 2,
  transition: '0.3s ease 0s',
});

/* ===== cell renderers ===== */
export const RRRColorCellRendererWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 97,
  height: 34,
  boxShadow: '0px 6px 12px #8D8D8D29',
  borderRadius: 4,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const RRRTagsCellRendererWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 55,
  height: 25,
  background: '#8E8E8E 0% 0% no-repeat padding-box',
  color: '#FFFFFF',
  boxShadow: '0px 6px 12px #8D8D8D29',
  borderRadius: 2,
  fontStyle: 'normal',
  fontWeight: 500, // 'medium'
  fontSize: 14,
  lineHeight: '19px',
  fontFamily: 'Roboto',
  letterSpacing: 0,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

/* ===== analytics card ===== */
export const RRRAnalyticsWrapper = style({
  width: '100%',
  color: 'white',
  padding: 10,
  fontFamily: 'Roboto',
});

export const RRRAnalyticsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  background: rrrBgVar,
  color: rrrTextVar,
  boxShadow: '0px 6px 12px #00000034',
  padding: '4px 8px',
  borderRadius: 4,
});

export const RRRAnalyticsHeader = style({
  width: '100%',
  padding: '6px 0px',
  fontSize: 12,
});

export const RRRAnalyticsTableContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const RRRAnalyticsTableHeaderWrapper = style({
  width: '100%',
  borderTop: 'dotted 2px gray',
  borderBottom: 'dotted 2px gray',
  display: 'flex',
});

export const RRRAnalyticsTableHeader = style({
  width: '100%',
  height: 40,
  display: 'flex',
  fontSize: 8,
  flexDirection: 'column',
  justifyContent: 'center',
  overflow: 'hidden',
  textAlign: 'center',
});

export const RRRAnalyticsTableSubHeader = style({
  width: '100%',
  height: 20,
  display: 'flex',
  fontSize: 8,
  justifyContent: 'center',
  alignItems: 'center',
});

export const RRRAnalyticsTableSubHeaderSection = style({
  width: '100%',
  height: '100%',
  fontSize: 7,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const RRRAnalyticsSeperator = style({
  height: 10,
  width: 2,
  backgroundColor: rrrSepVar,
});

export const RRRAnalyticsTableRowContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const RRRAnalyticsTableRow = style({
  width: '100%',
  display: 'flex',
  borderBottom: 'solid 1px white',
  selectors: {
    '&:last-child': { borderBottom: 'none' },
  },
});

export const RRRAnalyticsTableCell = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 30,
});

export const RRRAnalyticsTableColorCell = style({
  display: 'flex',
  width: 15,
  height: 15,
  alignItems: 'center',
  borderRadius: 2,
});

export const RRRAnalyticsTableCustomCell = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const RRRAnalyticsTableColorCellLabel = style({
  marginLeft: 5,
});


export const maxW40 = style({ maxWidth: 40 });
export const w100 = style({ width: '100%' });

export const noBorder = style({ border: 'none' });

export const totalRow = style({
  color: 'white',
  backgroundColor: 'black',
  borderRadius: '0px 0px 4px 4px',
  margin: '0 -8px -4px -8px',
  width: 'auto',
  padding: '0 8px',
});
