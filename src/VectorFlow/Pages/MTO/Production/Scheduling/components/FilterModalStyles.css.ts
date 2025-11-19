// FilterPanel.css.ts
import { style, createVar } from "@vanilla-extract/css";

/* ---------- Layout wrappers ---------- */

export const FilterWrapper = style({
  height: "78vh",
  width: "75vw",
  backgroundColor: "white",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const FilterHeaderWrapper = style({
  height: 35,
  width: "100%",
  borderBottom: "1px solid #ccc",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  position: "sticky",
  top: 0,
  display: "flex",
  justifyContent: "space-between",
  padding: "4px 8px",
  alignItems: "center",
  background: "white",
  fontSize: "1.2rem",
  fontWeight: 500,
});

export const FilterHeaderTitle = style({
  fontSize: "1.2rem",
  fontWeight: 500,
  display: "flex",
  gap: 8,
  alignItems: "center",
});

export const CloseButton = style({
  background: "none",
  border: "none",
  fontSize: "2.6rem",
  fontWeight: 200 as any, // original was '200px', using 200 numeric here
  cursor: "pointer",
});

export const FilterContent = style({
  height: "80%",
  width: "100%",
  overflow: "auto",
});

/* ---------- Tabs ---------- */

export const FilterTabLayout = style({
  display: "flex",
  gap: 26,
  padding: "16px 40px",
  width: "fit-content",
  height: "fit-content",
});

export const FilterTab = style({
  padding: "8px 0",
  borderRadius: 4,
  background: "white",
  cursor: "pointer",
  width: 220,
  border: "1px solid #ccc",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease-in-out",
  selectors: {
    "&:hover": {
      transform: "scale(1.01)",
    },
    "&.active": {
      background: "#9c0d64",
      color: "white",
    },
  },
});

export const FilterTabHeader = style({
  fontSize: "1.1rem",
  fontWeight: 500,
  padding: "4px 8px 4px 16px",
  textAlign: "left",
  borderBottom: "1px solid #ccc",
});

/* ---------- Search + list ---------- */

export const FilterSearchBar = style({
  width: "90%",
  margin: "12px auto",
  padding: "8px 12px",
  border: "1px solid #ccc",
  borderRadius: 18,
  fontSize: "1rem",
  background: "#f9f9f9",
  display: "block",
  selectors: {
    "&:focus": {
      outline: "none",
      borderColor: "#9c0d64",
      boxShadow: "0 0 5px rgba(156, 13, 100, 0.5)",
    },
  },
});

export const FilterList = style({
  maxHeight: 220,
  overflowY: "auto",
  marginTop: 8,
  padding: "0 8px",
});

/* ---------- Bottom section ---------- */

export const FilterBottomSection = style({
  width: "100%",
  display: "flex",
  padding: "12px 20px",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: "1px solid #ccc",
});

export const FilterBottomLeft = style({});

export const FilterBottomRight = style({
  display: "flex",
  gap: 12,
  alignItems: "center",
  justifyContent: "center",
});

/* ---------- Themed Checkbox (using vars) ---------- */

// this var will hold chooseThemeColor[theme].color4
export const CheckboxColorVar = createVar();
export const CheckboxBgImageVar = createVar(); // 👈 new

export const Checkbox = style({
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: 2,
  border: "2px solid rgb(148, 154, 171)",
  backgroundColor: "white",
  appearance: "none",
  cursor: "pointer",

  vars: {
    [CheckboxColorVar]: "rgb(148, 154, 171)", // default if not overridden
  },

  selectors: {
    "&:checked": {
      backgroundColor: CheckboxColorVar,
      borderColor: CheckboxColorVar,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundImage:CheckboxBgImageVar,
    },
  },
});

/* ---------- Date row ---------- */

export const DateRow = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginTop: 12,
});

export const DateWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: "0 8px",
  flex: 1,
});

export const DateLabel = style({
  fontSize: "0.9rem",
  fontWeight: 500,
});
