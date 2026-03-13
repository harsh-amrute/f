// InlineBanner.css.ts
import { style } from "@vanilla-extract/css";

export const Container = style({
  border: "1.5px dashed #d17ca0",
  padding: "14px 16px",
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 8,
  background: "#fff",
  maxWidth: 500,
});

export const LeftSection = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontWeight: 600,
  fontSize: "1.1rem",
  cursor: "pointer",
});

export const ButtonsWrapper = style({
  display: "flex",
  gap: 10,
});

export const ButtonContentWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  fontSize: "1.1rem",
  color: "#ffffff",
});
