import { style } from "@vanilla-extract/css";

export const VFErrorFallBackWrapper = style({
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const VFErrorFallBackContainer = style({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const VFErrorFallBackHeader = style({
  fontFamily: "Roboto",
  fontSize: "25px",
  lineHeight: "27px",
  fontWeight: 400,
  textAlign: "center",
});

export const VFErrorFallBackTextContent = style({
  fontFamily: "Roboto",
  fontSize: "15px",
  lineHeight: "30px",
  fontWeight: 300,
  textAlign: "center",
  marginBottom: "20px",
});

export const VFErrorFallBackButtonGroup = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const VFErrorFallBackButton = style({
  height: "30px",
  width: "130px",
  color: "white",
  borderRadius: "4px",
  border: "none",
  background:
    "transparent linear-gradient(76deg, #820F4C 0%, #BC3D81 100%) 0% 0% no-repeat padding-box",
  boxShadow: "-5px 4px 10px #919191B3",
  cursor: "pointer",
});

export const VFErrorFallBackButtonGhost = style({
  height: "30px",
  width: "130px",
  color: "black",
  borderRadius: "4px",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
});
