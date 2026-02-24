import { style, keyframes, createVar } from "@vanilla-extract/css";

/* ========== Theme runtime vars ========== */
export const focusOutlineVar = createVar(); // maps to chooseThemeColor[themeUi].color4

const slideUp = keyframes({
  "0%": { transform: "translateY(-10px)", opacity: 0.3 },
  "30%": { transform: "translateY(10px)" },
  "60%": { transform: "translateY(-10px)" },
  "90%": { transform: "translateY(-5px)" },
  "100%": { transform: "translateY(0px)", opacity: 1 },
});

/* ----- container/content ----- */
export const content = style({
  width: "100%",
  height: "100%",
  padding: "10px 5px 5px 5px",
  boxShadow:
    "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
  animation: `${slideUp} 0.3s`,
  overflow: "auto",
  backgroundColor: "white",
});

/* ----- simple blocks (kept for parity with existing code) ----- */
export const urlsForm = style({
  flex: 1,
  width: "100%",
  height: "100%",
  padding: "0px 10px 10px 10px",
  display: "flex",
  flexDirection: "column",
});

export const inputWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginTop: "14px",
});

export const label = style({
  fontSize: "12px",
});

export const tableWrapper = style({
  zoom: "0.9" as unknown as number, // keep the same visual scaling
  padding: "5px",
});

/* ----- header ----- */
export const drawerHeader = style({
  width: "100%",
  height: "40px",
  borderRadius: "1px",
  padding: "0px 5px",
  display: "flex",
  alignItems: "center",
  color: "black",
});

export const buttonsWrapper = style({
  width: "100%",
  display: "flex",
  gap: "10px",
});

export const drawerHeaderText = style({
  fontSize: "25px",
});

/* ----- checkboxes (supporting styles used by Add/View) ----- */
export const checkBoxesWrapper = style({
  display: "flex",
  flexDirection: "column",
  marginTop: "14px",
});

export const checkBoxesHeaderContainer = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
});

export const checkBoxesHeader = style({
  fontSize: "16px",
  whiteSpace: "nowrap",
  marginRight: "20px",
});

export const checkBoxesContainer = style({});

export const checkBoxWrapper = style({
  display: "flex",
  alignItems: "center",
});

/* ----- search input ----- */
export const searchWrapper = style({
  display: "flex",
  width: "200px",
  maxWidth: "100%",
  alignItems: "center",
  background: "#F7F7F7 0% 0% no-repeat padding-box",
  boxShadow:
    "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
  padding: "2px 5px",
  borderRadius: "16px",
  outline: "solid 2px transparent",
  transition: "0.3s ease-in-out",
  selectors: {
    "&:focus-within": {
      boxShadow: "#BC3D81 0px 0px 0px 1px, #BC3D81 0px 0px 0px 1px inset",
      width: "100%",
    },
  },
});

export const urlSearch = style({
  outline: "none",
  border: "none",
  height: "25px",
  width: "100%",
  backgroundColor: "transparent",
  cursor: "auto",
});

export const checkBoxLabel = style({
  display: "flex",
});

export const row = style({
  display: "flex",
});

export const ml10 = style({
  marginLeft: "10px",
});

export const formActions = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  flex: 10,
});

export const buttonsRight = style({
  justifyContent: "flex-end",
  alignItems: "flex-end",
  flex: 10,
});

export const confirmTitle = style({
  fontSize: "18px",
  fontWeight: "400",
  textAlign: "center",
  flex: 1,
});
