import { style, createVar, globalStyle } from "@vanilla-extract/css";

import * as globalStyles from "../../../../../styles/global";

// ===== Theme-driven vars =====
export const color5Var = createVar(); // primary/accent (buttons, radios)
export const color4Var = createVar(); // link color
export const accentVar = createVar(); // for `accent-color` (radios)

// ===== Page wrappers =====
export const TaskPendingWrapper = style({
  width: "100%",
  height: "95%",
  marginBottom: "100px",
  paddingLeft: "50px",
  paddingTop: "20px",
});
// remove ag-grid focus outline under this wrapper
globalStyle(`${TaskPendingWrapper} .ag-cell:focus`, {
  outline: "none",
});

// ===== Action renderer =====
export const ActionRendererWrapper = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
});

export const ActionButtonWrapper = style({
  cursor: "pointer",
});

// ===== Header row =====
export const ActionHeaderWrapper = style({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-around",
});

export const ActionHeaderContent = style({
  fontSize: "16px",
  display: "flex",
  padding: "5px",
  marginTop: "5px",
  marginBottom: "5px",
});

// ===== Links =====
export const LinkWrapper = style({
  width: "100%",
  height: "100%",
  color: color4Var, // overridden at runtime
});

// ===== Radios =====
export const RadioContainer = style({
  justifyContent: "space-between",
  alignItems: "center",
});

export const RadioButtonGroup = style({
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "21px",
  fontFamily: "Roboto",
  marginBottom: "20px",
  display: "flex",
  gap: "8px",
  marginTop: "20px",
  alignItems: "center",
  // dynamic accent color for inputs inside
});
globalStyle(`${RadioButtonGroup} input[type="radio"]`, {
  accentColor: "initial",
});
globalStyle(`${RadioButtonGroup} input[type="radio"]`, {
  // use CSS var for accent
  accentColor: `var(${accentVar})`,
});

// ===== Footer / submit =====
export const SubmitButtonWrapper = style({
  display: "flex",
  justifyContent: "flex-end",
  marginLeft: "-73px",
  marginRight: "-73px",
  borderTop: "dashed 1px gray",
  padding: "10px 20px 0 10px",
});

// ===== Modal text / buttons =====
export const DeleteFileModalText = style({
  textAlign: "left",
  marginTop: "40px",
  marginBottom: "40px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  color: "#000",
  marginRight: "221px",
  marginLeft: "162px",
});

export const ButtonWrapper = style({
  marginBottom: "100px",
  display: "flex",
  flexDirection: "row",
  gap: "35px",
});

// shared 13px icon used in modal buttons
export const smallIcon = style({
  height: "13px",
  width: "13px",
  opacity: "1",
  paddingRight: "17px",
});

// ===== Approve modal bits (if used elsewhere) =====
export const ApproveModalText = style({
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  fontFamily: "Roboto",
  marginRight: "186px",
  marginLeft: "161px",
  marginBottom: "30px",
  marginTop: "37px",
  textAlign: "center",
});

export const ApproveButtonWrapper = style({
  alignItems: "center",
  marginBottom: "85px",
  marginRight: "221px",
  marginLeft: "221px",
});

// ===== Buttons in header =====
export const TaskPendingActionHeaderButton = style({
  backgroundColor: color5Var, // override via assignInlineVars
  height: "10px",
  width: "78px",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "11px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  fontWeight: 300,
  color: "#FFFFFF",
  padding: "15px 7px",
  border: "none",
  zoom: "0.9" as any, // non-standard but preserved
});

export const ButtonSeperator = style({
  width: "1.5px",
  height: "30px",
  backgroundColor: "#898989",
  margin: "0 10px",
});
