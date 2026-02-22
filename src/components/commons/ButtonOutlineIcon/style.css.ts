import { style, createVar } from "@vanilla-extract/css";

export const bgVar = createVar();
export const accent = createVar();
export const disabled = createVar();

export const buttonOutlineIcon = style({
  width: "100%",
  height: "100%",
  color: accent,
  fontSize: "16px",
  borderRadius: "6px",
  fontWeight: 500,
  opacity: 1,
  border: `1px solid ${accent}`,
  backgroundColor: bgVar,
  cursor: "pointer",
  display: 'flex', 
  alignItems: 'center',
  padding: '10px 16px',
  selectors: {
    '&[data-disabled="true"]': {
      cursor: "not-allowed",
      opacity: 0.7,
    },
    '&:hover': {
      scale: '1.02' 
    },
  },
});

export const imgStyle = style({
  paddingRight: "10px",
});
