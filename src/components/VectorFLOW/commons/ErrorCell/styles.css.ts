import { style, keyframes, createVar } from "@vanilla-extract/css";

export const themeTextColorVar = createVar(); // gold vs maroon
export const containerBgVar = createVar(); // REGALBLAZE vs default

/* fade-in for tooltip */
const fadeIn = keyframes({
  from: { opacity: 0.7, transform: "translateY(10px)" },
  to: { opacity: 1 },
});

/* Tooltip wrapper */
export const toolTipWrapper = style({
  position: "fixed",
  padding: "1px 5px",
  border: "1px solid #BC3D81",
  backgroundColor: "rgba(255,255,255,1)",
  color: "#820F4C",
  borderRadius: "4px",
  width: "170px",
  maxHeight: "280px",
  zIndex: 100000,
  animation: `${fadeIn} 0.3s ease`,
});

/* Container for icon + truncated text */
export const container = style({
  height: "25px",
  borderRadius: "5px",
  background: containerBgVar,
  border: "1px solid #BC3D81",
  color: "#820F4C",
  fontSize: "10px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 500,
  marginBottom: "auto",
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  overflow: "visible",
});

/* Truncated error text with theme color */
export const errorText = style({
  display: "inline-block",
  maxWidth: "200px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: themeTextColorVar,
});

/* Tooltip list */
export const errorToolTipUl = style({
  fontSize: "9px",
  width: "100%",
  padding: "0 0 10px 15px",
  margin: 0,
  color: themeTextColorVar,
});

/* Tooltip list item */
export const errorToolTipLi = style({
  marginTop: "5px",
  listStyleType: "circle",
});
