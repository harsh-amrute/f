// WrapperStyles.css.ts
import { style, globalStyle, keyframes } from "@vanilla-extract/css";

/* ---------------- Wrapper ---------------- */

export const wrapper = style({
  position: "relative",
  margin: "0 100px",
  paddingBottom: "55px",
});

/* ---------------- GridContainer ---------------- */

export const gridContainer = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
  padding: "40px",
  paddingLeft: "40px",
  marginTop: "20px",
  background: "rgba(246, 206, 233, 0.28)",
  borderRadius: 6,
});

/* ---------------- SideTab ---------------- */

export const sideTab = style({
  position: "absolute",
  top: "50%",
  left: 0,
  transform: "translate(-50%, -50%) rotate(180deg)",
  background: "linear-gradient(180deg, #b03775, #993366)",
  color: "white",
  writingMode: "vertical-rl",
  textOrientation: "mixed",
  fontSize: 12,
  fontWeight: "bold",
  padding: "12px 8px",
  height: 130,
  borderRadius: 5,
  cursor: "default",
  boxShadow: "0px 2px 6px rgba(0,0,0,0.25)",
});

// ::after arrow
globalStyle(`${sideTab}::after`, {
  content: "",
  position: "absolute",
  left: "-8px",
  top: "50%",
  transform: "translateY(-50%) rotate(180deg)",
  width: 0,
  height: 0,
  borderTop: "8px solid transparent",
  borderBottom: "8px solid transparent",
  borderLeft: "8px solid #993366",
});

/* ---------------- CheckUpdatesWrapper ---------------- */

export const checkUpdatesWrapper = style({
  display: "flex",
  justifyContent: "flex-end",
  padding: "0 40px",
  alignItems: "center",
  gap: "22px",
  marginTop: "15px",
});

/* ---------------- LastUpdateStatus ---------------- */

export const lastUpdateStatus = style({
  fontSize: "1rem",
  color: "rgb(96, 93, 93)",
  padding: 4,
});

/* ---------------- Skeleton Tile + shimmer ---------------- */

// Keyframe animation
const shimmer = keyframes({
  "0%": { backgroundPosition: "-200% 0" },
  "100%": { backgroundPosition: "200% 0" },
});

export const fileUploadSkeletonTile = style({
  height: "120px",
  borderRadius: 6,
  background: "linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%)",
  backgroundSize: "200% 100%",
  animation: `${shimmer} 1.2s infinite`,
});
