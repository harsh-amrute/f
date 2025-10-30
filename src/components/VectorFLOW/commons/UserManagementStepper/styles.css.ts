import { style, createVar } from "@vanilla-extract/css";
export const stepLabelColorVar = createVar();

export const stepperWrapper = style({
  height: "58px",
  width: "100%",
  display: "flex",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  border: "0.5px solid #00000029",
  borderRadius: "8px",
});

export const stepWrapper = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
});

export const stepSection = style({
  height: "100%",
});

export const stepIconWrapper = style({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  marginLeft: "20px",
  marginRight: "5px",
});

export const stepIcon = style({
  width: "18px",
  height: "18px",
});

export const stepLabel = style({
  fontFamily: "Roboto",
  fontSize: "18px",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  height: "100%",
  marginRight: "20px",
  color: stepLabelColorVar,
});

export const stepStrokeWrapper = style({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
});

export const stepStroke = style({
  height: "3px",
  width: "100%",
  backgroundColor: "#00000029",
});
