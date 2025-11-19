// Modal.css.ts
import { style, keyframes, createVar } from "@vanilla-extract/css";


// -------- Modal layout --------
export const modalWrapper = style({
  height: "fit-content",
  width: "50vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden",
  padding: "10px 10px",
});

export const modalHeader = style({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
});

export const closeButton = style({
  background: "transparent",
  border: "none",
  fontSize: 18,
  cursor: "pointer",
});

export const imageWrapper = style({
  height: "40vh",
  margin: "20px 0",
});

export const footerWrapper = style({
  display: "flex",
  height: 40,
  width: "100%",
  padding: 12,
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
});

export const progressWrapper = style({
  width: "80%",
  margin: "8px auto",
  paddingTop: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const progressContainer = style({
  width: "40vw",
  margin: "0 auto",
  height: 14,
  borderRadius: 50,
  border: "1.5px solid rgba(124, 123, 123, 0.56)",
  overflow: "hidden",
});

// -------- Progress fill (dynamic width) --------

// CSS variable for width (e.g. "60%")
export const progressWidthVar = createVar();

const gradientFlow = keyframes({
  "0%": {
    backgroundPosition: "0% 50%",
  },
  "100%": {
    backgroundPosition: "200% 50%",
  },
});

export const progressFill = style({
  height: "100%",
  width: progressWidthVar, // hooked to var

  background:
    "linear-gradient(90deg, #b52670, #ff69b4, #b52670)",
  backgroundSize: "200% 200%",
  animation: `${gradientFlow} 3s linear infinite`,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 50,
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  transition: "width 0.3s ease-in-out",

  // default value
  vars: {
    [progressWidthVar]: "0%",
  },
});

export const progressMessage = style({
  margin: "0 auto",
  fontSize: "1.1rem",
  fontWeight: 500,
  color: "rgb(56, 54, 54)",
});

export const dateTimeWrapper = style({
  display: "flex",
  width: "fit-content",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  fontSize: "1.1rem",
});
