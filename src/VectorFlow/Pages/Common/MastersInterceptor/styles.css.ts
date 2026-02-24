import { style, createVar, globalStyle } from "@vanilla-extract/css";

export const hoverBgVar = createVar();
export const iconBgVar = createVar();
export const textColorVar = createVar();

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  fontFamily: "Roboto",
  background: "white",
  padding: "40px 60px",
  borderRadius: "16px",
  boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
});

export const optionCard = style({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "26px",
  border: "2px solid #f0f0f0",
  borderRadius: "8px",
  boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
  selectors: {
    "&:hover": {
      transform: "translateY(-2px)",
      background: hoverBgVar, // themed via assignInlineVars
    },
  },
});

export const icon = style({
  width: "45px",
  height: "45px",
  backgroundColor: iconBgVar, // themed via assignInlineVars
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  // selectors: {
  //   "& img": {
  //     position: "absolute",
  //     top: "20%",
  //     left: "30%",
  //     width: "40px",
  //     height: "40px",
  //   },
  // },
});
// scope descendant globally to only images inside this icon
globalStyle(`${icon} img`, {
  position: 'absolute',
  top: '20%',
  left: '30%',
  width: '40px',
  height: '40px',
});


export const text = style({
  fontSize: "14px",
  fontWeight: 500,
  color: textColorVar, // themed via assignInlineVars
});

