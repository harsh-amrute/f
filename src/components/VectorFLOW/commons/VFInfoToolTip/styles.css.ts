import { style, keyframes } from "@vanilla-extract/css";

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const Wrapper = style({
  position: "relative",
  // zIndex: 200, // keep commented like original
});

export const Icon = style({
  width: "15px",
  height: "15px", // fixed original typo "15x"
  cursor: "pointer",
});

export const TextWrapper = style({
  position: "fixed", // inline style in component can override to 'absolute'
  color: "white",
  background: "#2E2E2E 0% 0% no-repeat padding-box",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingRight: "10px",
  borderRadius: "6px",
  maxWidth: "700px",
  zIndex: 200,
  animation: `${fadeIn} 0.3s ease-in-out`,
});

export const Text = style({
  fontSize: "16px",
  fontFamily: "Roboto",
  fontWeight: 400,
  lineHeight: "30px",
  listStyle: "circle",
});
