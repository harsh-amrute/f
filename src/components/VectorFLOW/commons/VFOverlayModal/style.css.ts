import { style, createVar } from "@vanilla-extract/css";

/* ===========================
   Overlay modal (from index.tsx)
   =========================== */

export const overlayLeftVar = createVar();
export const overlayWidthVar = createVar();

export const Overlay = style({
  vars: {
    [overlayLeftVar]: "0px",
    [overlayWidthVar]: "100vw",
  },
  position: "fixed",
  top: 0,
  left: overlayLeftVar, // will be provided via assignInlineVars
  width: overlayWidthVar, // will be provided via assignInlineVars
  height: "100%",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  borderRadius: "12px",
});

export const ModalCard = style({
  background: "white",
  borderRadius: "12px",
  height: "fit-content",
  width: "fit-content",
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
});

export const Content = style({
  flex: 1,
  overflowY: "auto",
  borderRadius: "12px",
});

/* ===========================
     Migrate style.css classes
     =========================== */

export const contentFile = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  border: "0.5px dashed #707070",
  borderRadius: "4px",
  cursor: "pointer",
  "@media": {
    "screen and (min-width: 1024px) and (max-width: 1440px)": {
      height: "85px",
    },
  },
});

export const modalTitleForced = style({
  padding: "12px 18px",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "white",
  color: "black",
});

export const modalForcedBlock = style({
  width: "auto",
  maxWidth: "90%",
  minWidth: "500px",
  borderRadius: "12px",
});

/* ===========================
     Migrate sytle.ts (styled-components)
     =========================== */

export const headerBgColorVar = createVar();
export const headerTextColorVar = createVar();
export const wrapperPaddingLRVar = createVar();
export const wrapperBgColorVar = createVar();

export const VFHeaderWrapper = style({
  vars: {
    [headerBgColorVar]: "#FFFFFF",
  },
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "40px",
  borderRadius: "0px 0px 12px 12px",
  backgroundColor: headerBgColorVar, // set with assignInlineVars if needed
});

export const SCModalContent = style({
  overflowY: "hidden",
  zIndex: 10,
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

export const SCTextTitle = style({
  vars: {
    [headerTextColorVar]: "#000000",
  },
  display: "flex",
  paddingTop: "3px",
  justifyContent: "center",
  width: "100%",
  flexDirection: "row",
  marginLeft: "14px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "21px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  color: headerTextColorVar, // set with assignInlineVars if needed
});

export const SCCloseModal = style({
  display: "flex",
  alignItems: "center",
  fontWeight: 300,
  fontSize: "2.6rem",
  cursor: "pointer",
});

export const SCWrapperContent = style({
  vars: {
    [wrapperPaddingLRVar]: "74px",
    [wrapperBgColorVar]: "white",
  },
  padding: `0 ${wrapperPaddingLRVar}`,
  textAlign: "left",
  height: "auto",
  backgroundColor: wrapperBgColorVar,
  borderRadius: "0px 0px 12px 12px",
});

export const SCHeader = style({
  display: "flex",
  flexDirection: "row",
});
