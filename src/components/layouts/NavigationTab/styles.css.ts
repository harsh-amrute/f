import { style } from "@vanilla-extract/css";
import * as globalStyles from "../../../styles/global";

export const tabs = style({
  padding: "0 50px",
});

export const tab = style({
  fontSize: "1.8rem",
  fontWeight: 500,
  marginRight: "40px",
  color: "#6B7280", // fallback; real base color comes from globalStyles in JSX if needed
  cursor: "pointer",
});

export const tabActive = style({
  // uses the element's current color so we only set color inline in JSX
  borderBottom: "1px solid currentColor",
});
