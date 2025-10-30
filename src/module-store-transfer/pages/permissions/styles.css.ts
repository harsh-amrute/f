import { style } from "@vanilla-extract/css";
import * as globalStyles from "../../../styles/global";
import * as GridSystem from "../../../styles/gridSystem.css";

/* Cards */
export const profileOverView = style({
  background: (globalStyles as any).white ?? "#fff",
  marginBottom: "20px",
  borderRadius: "6px",
});
export const profileOverViewCol = style({
  background: (globalStyles as any).white ?? "#fff",
  marginBottom: "20px",
  borderRadius: "6px",
  width: "47%",
});

/* Section titles */
export const subTitleBox = style({
  borderBottom: `1px solid ${
    (globalStyles as any).secondaryColor ?? "#9e9e9e"
  }`,
});
export const subTitlePad = style({
  padding: "34px 50px 20px 50px",
});
export const subTitleSpan = style({
  fontSize: "2rem",
  fontWeight: 500,
  lineHeight: "2.6rem",
  "@media": {
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { fontSize: "1.6rem" },
  },
});
export const subTitleSpanItem = style({
  display: "flex",
  width: "100%",
});

/* Overview sections */
export const overviewInfo = style({
  padding: "15px 50px 24px 50px",
  display: "flex",
  width: "100%",
  gap: "5rem",
  "@media": {
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { gap: "2rem" },
  },
});
export const overviewInfoPermis = style({
  padding: "0px 50px 24px 50px",
  display: "block",
  width: "100%",
});

/* Permission items (chips list at top) */
export const overviewItem = style({
  display: "flex",
  alignItems: "center",
  minWidth: "50%",
  padding: "15px",
  background: "#f8f8f8",
});
export const overviewItemBorderedFirstTwo = style({
  selectors: {
    "&:nth-child(1), &:nth-child(2)": {
      borderBottom: `1px dashed ${
        (globalStyles as any).secondaryColor ?? "#9e9e9e"
      }`,
    },
  },
});

export const overviewItemTitle = style({
  fontSize: "1.6rem",
  color: "#000",
  fontWeight: 500,
  flex: "0 0 100%",
  "@media": {
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { fontSize: "1.4rem" },
  },
});

/* Key/Value lines list */
export const overViewSignItem = style({
  display: "block",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `1px dashed ${
    (globalStyles as any).secondaryColor ?? "#9e9e9e"
  }`,
  padding: "16px 0 20px 0",
  selectors: {
    "&:last-child": {
      border: "unset",
      padding: "16px 0 0 0",
    },
  },
});

export const overviewItemPerTitle = style({
  fontSize: "2rem",
  minWidth: "10rem",
  color: "#000",
  fontWeight: 300,
  alignItems: "center",
  "@media": {
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { fontSize: "1.6rem", minWidth: "8rem" },
  },
});

export const overviewItemContent = style({
  fontSize: "2rem",
  color: "#000",
  fontWeight: 500,
  alignItems: "center",
  margin: "0 10px",
  "@media": {
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { fontSize: "1.6rem" },
  },
});

/* Checked icon next to permission chips */
export const iconChecked = style({
  marginRight: "15px",
});

/* Left column wrapper containing chips */
export const overviewWrap = style({
  width: "40%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  "@media": {
    [`(min-width: ${GridSystem.size.laptop}) and (max-width: ${GridSystem.size.laptopL})`]:
      { width: "50%" },
  },
});

export const overviewWrapTitle = style({
  fontSize: "1.6rem",
  marginBottom: "10px",
  fontWeight: 500,
  padding: "1rem 0",
  borderBottom: "1px solid black",
});

export const overviewWrapItem = style({
  display: "flex",
  flexWrap: "wrap",
});
export const overviewWrapItemBg = style({
  background: "#F8F8F8",
});

export const overviewFlex = style({
  display: "flex",
  justifyContent: "space-between",
});
