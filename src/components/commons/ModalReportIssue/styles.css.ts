import { style, createVar } from "@vanilla-extract/css";
import * as gridSystem from "../../../styles/gridSystem.css";
import * as globalStyles from "../../../styles/global";

/* Runtime var for themed submit button background */
export const buttonBgVar = createVar();

/* Modal layout */
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
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

export const SCCloseModal = style({
  fontWeight: 300,
  fontSize: "2.6rem",
  cursor: "pointer",
});

export const SCWrapperContent = style({
  padding: "0 74px",
  textAlign: "left",
  borderBottom: "0.5px dashed #707070",
});

export const SCItem = style({});

export const SCText = style({
  display: "block",
  fontSize: "2rem",
  fontWeight: 500,
  margin: "10px 0",
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: "1.6rem" },
  },
});

export const SCTextThin = style({
  display: "block",
  fontSize: "2rem",
  fontWeight: 300,
  margin: "10px",
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: "1.6rem" },
  },
});

export const SCTextarea = style({
  margin: 0,
  width: "100%",
  outline: "none",
  border: "none",
  height: "127px",
  borderRadius: "6px",
  background: "#FFFFFF",
  opacity: 1,
  padding: "10px 15px",
  borderWidth: "0.3px",
  borderStyle: "solid",
  borderColor: "#707070",
  resize: "none",
  fontFamily: "Roboto",
  fontWeight: 300,
  fontSize: "20px",
  lineHeight: "26px",
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { height: "85px", fontSize: "1.6rem" },
  },
});

export const SCWrapperText = style({
  display: "flex",
  fontSize: "2rem",
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { fontSize: "1.6rem" },
  },
});

export const SCWrapperImg = style({
  marginBottom: "20px",
});

export const SCImg = style({});

export const SCPlaceholderImg = style({
  color: "#7C7C7C",
  fontSize: "1.6rem",
  marginLeft: "10px",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  maxWidth: "50%",
  overflow: "hidden",
});

/* Replaces the old .content-file from style.css */
export const ContentFile = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  border: "0.5px dashed #707070",
  borderRadius: "4px",
  cursor: "pointer",
  "@media": {
    "(min-width: 1024px) and (max-width: 1440px)": {
      height: "85px",
    },
  },
});

export const SCModalBottom = style({
  padding: "0 50px",
  textAlign: "right",
  margin: "30px 0",
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { margin: "13px 0" },
  },
});

export const SCButtonGoBack = style({
  width: "222px",
  height: "46px",
  boxShadow: "0px 6px 25px #00000029",
  borderRadius: "6px",
  border: "1px solid #707070",
  fontSize: "2rem",
  color: "#313131",
  letterSpacing: 0,
  background: globalStyles.white,
  cursor: "pointer",
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { width: "170px", height: "35px", fontSize: "1.6rem" },
  },
});

export const SCButtonSubmit = style({
  // default fallback; will be overridden via buttonBgVar at runtime
  vars: { [buttonBgVar]: globalStyles.NOIRFUSION.colorButton },
  width: "222px",
  height: "46px",
  background: buttonBgVar,
  boxShadow: "0px 6px 25px #00000029",
  borderRadius: "6px",
  fontSize: "2rem",
  color: "#FFFFFF",
  marginLeft: "20px",
  fontFamily: "Roboto",
  fontWeight: 300,
  lineHeight: "26px",
  border: "none",
  cursor: "pointer",
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { width: "170px", height: "35px", fontSize: "1.6rem" },
  },
});

export const SCWrapperContentImg = style({
  display: "flex",
  marginTop: "10px",
  overflowX: "auto",
  whiteSpace: "nowrap",
});

export const SCWrapperItemImg = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "114px",
  height: "39px",
  background: globalStyles.white,
  border: "0.5px solid #707070",
  borderRadius: "4px",
  fontSize: "1.6rem",
  marginRight: "10px",
  color: "#7C7C7C",
});

export const SCItemText = style({
  marginLeft: "10px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const SCItemImg = style({
  margin: "0 10px",
  cursor: "pointer",
});
