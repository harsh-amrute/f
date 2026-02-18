import { style } from "@vanilla-extract/css";

export const CheckboxWrapper = style({
  height: "68px",
  width: "200px",
  marginLeft: "15px",
  display: "flex",
  backgroundColor: "white",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 2px 0 4px rgba(0, 0, 0, 0.1)",
});

export const CheckboxConatiner = style({
  width: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const DropDownContainer = style({
  display: "inline-block",
  fontSize: "14px",
  paddingTop: "10px",
  paddingLeft: "10px",
});

export const ActionableConatiner = style({
  height: "50px",
  display: "flex",
});

export const ShowAllWrapper = style({
  display: "flex",
  alignItems: "center",
  height: "50px",
});

export const ButtonWrapper = style({
  marginRight: 0,
  marginLeft: "auto",
  height: "60px",
  display: "flex",
  alignItems: "center",
});
