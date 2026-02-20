import { style, createVar } from "@vanilla-extract/css";

export const wrapperBorderVar = createVar();
export const btnBgVar = createVar();
export const btnColorVar = createVar();

export const VFCapsuleWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  width: "100%",
  height: "25px",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "-3px 3px 12px #8B8B8B41",
  border: `0.4px solid ${wrapperBorderVar}`,
  borderRadius: "21px",
  opacity: 1,
  overflow: "hidden",
});

export const VFCapsuleButton = style({
  width: "100%",
  height: "25px",
  fontWeight: 300,
  fontFamily: "Roboto",
  fontSize: "10px",
  display: "block",
  whiteSpace: "nowrap",
  background: btnBgVar,
  color: btnColorVar,
  // optional: better click affordance
  // border: 'none',
  // cursor: 'pointer',
});
