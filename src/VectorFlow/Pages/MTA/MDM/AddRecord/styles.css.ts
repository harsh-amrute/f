import { style } from "@vanilla-extract/css";

export const SubmitDataTextContainer = style({
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 300,
  fontSize: "15px",
  lineHeight: "22px",
  fontFamily: "Roboto",
  color: "#000000",
  opacity: 1,
  display: "flex", // fixed 'dispay' typo
  textAlign: "center",
  justifyContent: "center",
  marginTop: "26px", // was 42 (commented)
  marginBottom: "32px", // was 44 (commented)
});

export const SubmitDataButtonWrapper = style({
  marginBottom: '59px',     // was 87 (commented)
  marginLeft: '100px',      // was 192 (commented)
  marginRight: '100px',     // was 189 (commented)
  display: 'flex',
  flexDirection: 'row',
  gap: '28px',
});
