import { style, keyframes } from "@vanilla-extract/css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const container = style({
  height: "100%",
  display: "flex",
  alignItems: "center",
});

export const icon = style({
  height: "60px",
  cursor: "pointer",
  display: "flex",
});

export const textWrapper = style({
  position: "absolute",
  color: "white",
  maxWidth: "700px",
  zIndex: 200,
  animation: `${fadeIn} 0.4s ease-in-out`,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  padding: "2px",
  borderRadius: "4px",
});

export const tag = style({
  fontSize: "16px",
  fontFamily: "Roboto",
  fontWeight: 900,
  lineHeight: "24px",
  listStyle: "circle",
  color: "white",
  background: "rgb(254, 162, 54)",
  width: "150px",
  textAlign: "center",
  borderRadius: "8px",
  padding: "5px 20px",
});
