// styles.css.ts
import { createVar, style, globalStyle  } from "@vanilla-extract/css";

/* ---------- Calendar caption (arrows + month header) ---------- */
export const customCalenderCaptionWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const customCalenderCaptionArrow = style({
  width: 14,
  height: 14,
  cursor: "pointer",
});

export const customCalenderCaptionHeader = style({
  fontSize: 13,
  fontWeight: 500,
});

/* ---------- Chart / right rail / layout ---------- */
export const capsuleWrapper = style({
  width: "20%",
  marginLeft: "auto",
});

export const horizontalWrapper = style({
  display: "flex",
  marginTop: 10,
  paddingBottom: 10,
});

export const graphWrapper = style({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  position: "relative",
  flexGrow: 1,
});

export const verticalWrapper = style({
  width: "25%",
  background: "white",
  boxShadow: "rgba(133, 132, 132, 0.247) -5px 4px 10px",
  borderRadius: 5,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  zoom: 0.8 as any, // TS is fine with `any` for non-standard zoom
});

export const horizontalLineDashed = style({
  border: "1px dashed gray",
  width: "100%",
});

export const sectionFlex = style({
  padding: 10,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const markerWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: 5,
});

export const calenderHeading = style({
  textAlign: "center",
  borderBottom: "1px solid #D0CCCC",
  padding: 5,
});

export const calenderWrapper = style({
  background: "#ACABAB33",
  borderRadius: 8,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const calenderLabel = style({
  display: "flex",
  justifyContent: "space-around",
  padding: "0 10px 10px",
});

export const verticalTitle = style({
  textAlign: "left",
  letterSpacing: 0,
  color: "#000",
  opacity: 1,
  fontSize: 21,
  fontFamily: "ROBOTO",
  fontWeight: 500,
});

/* Colored marker with runtime color */
export const markerColorVar = createVar();
export const coloredMarker = style({
  height: 15,
  width: 15,
  background: markerColorVar,
});

/* Slider / controls area */
export const scChartSliderContainer = style({
  display: "flex",
  justifyContent: "center",
  gap: 13,
  alignItems: "center",
  height: 55,
});

export const radioGroup = style({
  display: "flex",
  minWidth: 200,
  // selectors: {
  //   "& > div": { flex: 1 },
  // },
});
globalStyle(`${radioGroup} > div`, { flex: 1 });

export const selectGroup = style({
  display: "flex",
  gap: 20,
  // selectors: {
  //   "& > div": { flex: 1 },
  // },
});
globalStyle(`${selectGroup} > div`, { flex: 1 });

/* Radio group with theme accent (runtime) */
export const radioAccentVar = createVar();
export const chartHeaderRadioGroup = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  accentColor: radioAccentVar, // runtime var
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 300,
  fontSize: 14,
  lineHeight: "19px",
  fontFamily: "Roboto",
});

export const scVerticalDividerGray = style({
  width: 0.5,
  backgroundColor: "#c7c7c7",
  height: 40,
  marginRight: 8,
  marginLeft: 8,
  alignItems: "center",
});

export const CustomCalenderDayWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "4px",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  height: "100%",
  width: "100%",
  cursor: "pointer",
});

export const analyticsTable = style({
    width: '100%',
    borderCollapse: 'collapse',
    margin: '0 auto',
    tableLayout: 'fixed',
  });
  
  export const headerRow = style({});
  
  export const headerCell = style({
    padding: '10px 12px',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 600,
    fontSize: '14px',
    color: '#000',
  });
  
  export const bodyRow = style({
    borderTop: '1px solid #e5e5e5',
  });
  
  export const cell = style({
    padding: '10px 12px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    color: '#000',
  });
  
  export const cellRight = style({
    padding: '10px 12px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    textAlign: 'right',
  });
  
  export const totalRow = style({
    background: '#000',
  });
  
  export const totalCell = style({
    color: '#fff',
    fontWeight: 600,
  });
  