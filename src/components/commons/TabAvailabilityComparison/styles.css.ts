// styles.css.ts
import { style, globalStyle } from "@vanilla-extract/css";
import * as gridSystem from "../../../styles/gridSystem.css";

const laptopRange = `screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`;

/* ---- Content wrappers ---- */
export const contentArea = style({
  display: "block",
  // selectors: {
  //   "& .loading": { margin: "26vh auto" },
  // },
});
globalStyle(`${contentArea} .loading`, {
  margin: "26vh auto",
});

export const leftIcon = style({
  position: "absolute",
  left: "-54px",
  top: "45px",
  zIndex: 1,
  "@media": {
    [laptopRange]: {
      left: "-39px",
      top: "33px",
      height: "8vw",
    },
  },
});

export const contentItemBase = style({
  display: "flex",
  borderRadius: "6px",
  margin: "6px 12px",
  position: "relative",
  // selectors: {
  //   '& .left-icon': {
  //     position: 'absolute',
  //     left: '-54px',
  //     top: '45px',
  //     zIndex: 1,
  //   },
  //   [`@media ${laptopRange}`]: { '& .left-icon': { left: '-39px', top: '33px', height: '8vw' },
  //   },
  // },
});

export const contentItemRed = style({
  border: "4px solid #6C4E0A",
});
export const contentItemWhite = style({
  border: "4px solid #6C4E0A",
});
export const contentItemGreen = style({
  border: "2px solid #CCCCCC",
});

/* ---- Item panel loading overlay ---- */
export const itemPanelLoading = style({
  display: "inline",
  // selectors: {
  //   "& .overlay": {
  //     background: "#ddd",
  //     position: "absolute",
  //     zIndex: 1,
  //     opacity: 0.7,
  //     height: "100%",
  //     width: "100%",
  //   },
  //   "& .loading": {
  //     margin: 0,
  //     position: "absolute",
  //     zIndex: 1,
  //     height: "100%",
  //     width: "100%",
  //   },
  // },
});

globalStyle(`${itemPanelLoading} .overlay`, {
  background: "#ddd",
  position: "absolute",
  zIndex: 1,
  opacity: 0.7,
  height: "100%",
  width: "100%",
});

globalStyle(`${itemPanelLoading} .loading`, {
  margin: 0,
  position: "absolute",
  zIndex: 1,
  height: "100%",
  width: "100%",
});

export const numberLast = style({
  position: "absolute",
  color: "#820f4c",
  fontSize: "1.5rem",
  fontWeight: "bold",
  border: "0.3px solid #820f4c",
  background: "#ffffff 0% 0% no-repeat padding-box",
  borderRadius: "3px",
  padding: "0 10px",
  bottom: "-4px",
  left: "-4px",
  zIndex: 2,
  "@media": {
    [laptopRange]: {
      padding: "0 6px",
      fontSize: "1.1rem",
    },
  },
});

/* ---- Item panel ---- */
export const itemPanel = style({
  cursor: "pointer",
  display: "block",
  background: "#ffffff 0% 0% no-repeat padding-box",
  boxShadow: "0px 14px 20px #b4b4b429",
  border: "0.5px solid #cccccc",
  margin: "1.2rem 1.2rem 4.2rem 1.2rem",
  flex: "1 0",
  position: "relative",
  // selectors: {
  //   "&:hover": { border: "1px solid #820f4c" },
  //   "& .number-last": {
  //     position: "absolute",
  //     color: "#820f4c",
  //     fontSize: "1.5rem",
  //     fontWeight: "bold",
  //     border: "0.3px solid #820f4c",
  //     background: "#ffffff 0% 0% no-repeat padding-box",
  //     borderRadius: "3px",
  //     padding: "0 10px",
  //     bottom: "-4px",
  //     left: "-4px",
  //     zIndex: 2,
  //   },
  // },
  "@media": { [laptopRange]: { margin: "0.5rem 0.5rem 3rem 0.5rem" } },
});
// move descendant rule to globalStyle
globalStyle(`${itemPanel} .number-last`, {
  position: "absolute",
  color: "#820f4c",
  fontSize: "1.5rem",
  fontWeight: "bold",
  border: "0.3px solid #820f4c",
  background: "#ffffff 0% 0% no-repeat padding-box",
  borderRadius: "3px",
  padding: "0 10px",
  bottom: "-4px",
  left: "-4px",
  zIndex: 2,
});

/* ---- Header ---- */
export const itemPanelHeader = style({
  display: "block",
  position: "relative",
  // selectors: {
  //   "& img": {
  //     background: "#ffffff 0% 0% no-repeat padding-box",
  //     border: "0.4px solid #cccccc",
  //     borderRadius: "3px",
  //     padding: "5px 8px",
  //     position: "absolute",
  //     top: "50%",
  //     left: "50%",
  //     transform: "translate(-50%, -50%)",
  //   },
  // },
});
// descendant -> globalStyle
globalStyle(`${itemPanelHeader} img`, {
  background: "#ffffff 0% 0% no-repeat padding-box",
  border: "0.4px solid #cccccc",
  borderRadius: "3px",
  padding: "5px 8px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const itemPanelHeaderImg = style({
  background: "#ffffff 0% 0% no-repeat padding-box",
  border: "0.4px solid #cccccc",
  borderRadius: "3px",
  padding: "5px 8px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "@media": {
    [laptopRange]: { height: "2.5rem" },
  },
});

export const itemPanelHeaderContentBase = style({
  display: "flex",

  // selectors: {
  //   "& span": {
  //     flex: "1 0",
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     height: "67px",
  //     fontSize: "2rem",
  //     fontWeight: "bold",
  //   },
  // },
  // "@media": {
  //   [laptopRange]: {
  //     selectors: {
  //       "& span": { height: "4vw", fontSize: "1.5rem" },
  //     },
  //   },
  // },
});
// descendants (with media) -> globalStyle
globalStyle(`${itemPanelHeaderContentBase} span`, {
  flex: "1 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "67px",
  fontSize: "2rem",
  fontWeight: "bold",
  "@media": {
    [laptopRange]: { height: "4vw", fontSize: "1.5rem" },
  },
});

/* index-dependent styles for span:nth-child(1) */
export const headerIndex0 = style({
  // selectors: {
  //   "& span:nth-child(1)": {
  //     background: "rgba(255, 231, 231, .35) 0% 0% no-repeat padding-box",
  //     color: "#EA0F0F",
  //   },
  // },
});
globalStyle(`${headerIndex0} span:nth-child(1)`, {
  background: "rgba(255, 231, 231, .35) 0% 0% no-repeat padding-box",
  color: "#EA0F0F",
});

export const headerIndex1 = style({
  // selectors: {
  //   "& span:nth-child(1)": {
  //     background: "rgba(230, 255, 232, .35) 0% 0% no-repeat padding-box",
  //     color: "#096912",
  //   },
  // },
});
globalStyle(`${headerIndex1} span:nth-child(1)`, {
  background: "rgba(230, 255, 232, .35) 0% 0% no-repeat padding-box",
  color: "#096912",
});

export const headerIndexOther = style({
  // selectors: {
  //   "& span:nth-child(1)": {
  //     background: "#FFFFFF 0% 0% no-repeat padding-box",
  //     color: "#292C2E",
  //   },
  // },
});
globalStyle(`${headerIndexOther} span:nth-child(1)`, {
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  color: "#292C2E",
});

/* color-dependent styles for span:nth-child(2) */
export const headerColorRed = style({
  // selectors: {
  //   "& span:nth-child(2)": {
  //     borderLeft: "0.5px solid #cccccc",
  //     background: "rgba(255, 231, 231, .35) 0% 0% no-repeat padding-box",
  //     color: "#EA0F0F",
  //   },
  // },
});
globalStyle(`${headerColorRed} span:nth-child(2)`, {
  borderLeft: "0.5px solid #cccccc",
  background: "rgba(255, 231, 231, .35) 0% 0% no-repeat padding-box",
  color: "#EA0F0F",
});

export const headerColorGreen = style({
  // selectors: {
  //   "& span:nth-child(2)": {
  //     borderLeft: "0.5px solid #cccccc",
  //     background: "rgba(230, 255, 232, .35) 0% 0% no-repeat padding-box",
  //     color: "#096912",
  //   },
  // },
});
globalStyle(`${headerColorGreen} span:nth-child(2)`, {
  borderLeft: "0.5px solid #cccccc",
  background: "rgba(230, 255, 232, .35) 0% 0% no-repeat padding-box",
  color: "#096912",
});

export const headerColorDefault = style({
  // selectors: {
  //   "& span:nth-child(2)": {
  //     borderLeft: "0.5px solid #cccccc",
  //     background: "#FFFFFF 0% 0% no-repeat padding-box",
  //     color: "#292C2E",
  //   },
  // },
});
globalStyle(`${headerColorDefault} span:nth-child(2)`, {
  borderLeft: "0.5px solid #cccccc",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  color: "#292C2E",
});

/* ---- Body ---- */
export const itemPanelBody = style({
  display: "flex",
  position: "relative",
  marginBottom: "1.5rem",
});

/* Left body */
export const itemPanelBodyLeft = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "1 0",
  flexFlow: "column",

  // selectors: {
  //   "& .rep-in, & .ist-in": {
  //     position: "relative",
  //     margin: "1.5rem 0",
  //     display: "inherit",
  //   },
  //   "& .rep-in span, & .ist-in span": {
  //     background: "#ffffff 0% 0% no-repeat padding-box",
  //     border: "0.4px solid #cccccc",
  //     fontSize: "1.4rem",
  //     fontWeight: 500,
  //     padding: "3px 10px 0px 10px",
  //   },
  //   "& .rep-in span sub, & .ist-in span sub": { fontSize: "1rem" },

  //   "& .rep-in::after": {
  //     content: '"REP IN"',
  //     position: "absolute",
  //     color: "#820f4c",
  //     fontSize: "1rem",
  //     fontWeight: "bold",
  //     background: "#ffedf7 0% 0% no-repeat padding-box",
  //     border: "0.3px solid #820f4c",
  //     borderRadius: "0px 0px 2px 2px",
  //     padding: "0 5px",
  //     bottom: "-17px",
  //     right: 0,
  //   },
  //   "& .ist-in::after": {
  //     content: '"IST IN"',
  //     position: "absolute",
  //     color: "#820f4c",
  //     fontSize: "1rem",
  //     fontWeight: "bold",
  //     background: "#ffedf7 0% 0% no-repeat padding-box",
  //     border: "0.3px solid #820f4c",
  //     borderRadius: "0px 0px 2px 2px",
  //     padding: "0 5px",
  //     bottom: "-17px",
  //     right: 0,
  //   },
  // },

  // "@media": {
  //   [laptopRange]: {
  //     selectors: {
  //       "& .rep-in, & .ist-in": { margin: "1rem 0" },
  //       "& .rep-in span, & .ist-in span": {
  //         fontSize: "1rem",
  //         padding: "2px 7px 0 6px",
  //       },
  //       "& .rep-in span sub, & .ist-in span sub": { fontSize: "0.6rem" },
  //       "& .rep-in::after, & .ist-in::after": {
  //         fontSize: "0.6rem",
  //         bottom: "-11px",
  //       },
  //     },
  //   },
  // },
});
globalStyle(`${itemPanelBodyLeft} .rep-in, ${itemPanelBodyLeft} .ist-in`, {
  position: "relative",
  margin: "1.5rem 0",
  display: "inherit",
  "@media": { [laptopRange]: { margin: "1rem 0" } },
});

globalStyle(
  `${itemPanelBodyLeft} .rep-in span, ${itemPanelBodyLeft} .ist-in span`,
  {
    background: "#ffffff 0% 0% no-repeat padding-box",
    border: "0.4px solid #cccccc",
    fontSize: "1.4rem",
    fontWeight: 500,
    padding: "3px 10px 0px 10px",
    "@media": {
      [laptopRange]: { fontSize: "1rem", padding: "2px 7px 0 6px" },
    },
  }
);

globalStyle(
  `${itemPanelBodyLeft} .rep-in span sub, ${itemPanelBodyLeft} .ist-in span sub`,
  {
    fontSize: "1rem",
    "@media": { [laptopRange]: { fontSize: "0.6rem" } },
  }
);

globalStyle(`${itemPanelBodyLeft} .rep-in::after`, {
  content: '"REP IN"',
  position: "absolute",
  color: "#820f4c",
  fontSize: "1rem",
  fontWeight: "bold",
  background: "#ffedf7 0% 0% no-repeat padding-box",
  border: "0.3px solid #820f4c",
  borderRadius: "0px 0px 2px 2px",
  padding: "0 5px",
  bottom: "-17px",
  right: 0,
  "@media": { [laptopRange]: { fontSize: "0.6rem", bottom: "-11px" } },
});

globalStyle(`${itemPanelBodyLeft} .ist-in::after`, {
  content: '"IST IN"',
  position: "absolute",
  color: "#820f4c",
  fontSize: "1rem",
  fontWeight: "bold",
  background: "#ffedf7 0% 0% no-repeat padding-box",
  border: "0.3px solid #820f4c",
  borderRadius: "0px 0px 2px 2px",
  padding: "0 5px",
  bottom: "-17px",
  right: 0,
  "@media": { [laptopRange]: { fontSize: "0.6rem", bottom: "-11px" } },
});

/* Center body: base + activeTab variants (store vs non-store) */
export const itemPanelBodyCenterBase = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "0 0",

  // selectors: {
  //   "& .store": {
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     background: "#ffffff 0% 0% no-repeat padding-box",
  //     boxShadow: "inset 3px 3px 6px #76767648",
  //     border: "0.5px solid #cccccc",
  //     borderRadius: "6px",
  //     height: "58px",
  //     width: "65px",
  //   },
  //   "& .gray-arrow": {
  //     width: "2rem",
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  // },

  // "@media": {
  //   [laptopRange]: {
  //     selectors: {
  //       "& .store": { height: "45px", width: "49px" },
  //     },
  //   },
  // },
});
// centerActiveStore
export const centerActiveStore = style({
  // selectors: {
  //   "& .store img": { marginTop: "0px", marginLeft: "0px" },
  // },

  // "@media": {
  //   [laptopRange]: {
  //     selectors: {
  //       "& .store img": { width: "2vw" },
  //     },
  //   },
  // },
});

export const centerInactiveStore = style({
  // selectors: {
  //   "& .store img": { marginTop: "7px", marginLeft: "7px" },
  // },

  // "@media": {
  //   [laptopRange]: {
  //     selectors: {
  //       "& .store img": { width: "2.5vw" },
  //     },
  //   },
  // },
});

/* Right body */
export const itemPanelBodyRight = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "1 0",
  flexFlow: "column",

  // selectors: {
  //   "& .ist-out": {
  //     position: "relative",
  //     margin: "1.5rem 0",
  //     display: "inherit",
  //   },
  //   "& .ist-out span": {
  //     background: "#ffffff 0% 0% no-repeat padding-box",
  //     border: "0.4px solid #cccccc",
  //     fontSize: "1.4rem",
  //     fontWeight: 500,
  //     padding: "3px 10px 0px 10px",
  //   },
  //   "& .ist-out span sub": { fontSize: "1rem" },
  //   "& .ist-out::after": {
  //     content: '"IST OUT"',
  //     position: "absolute",
  //     color: "#820f4c",
  //     fontSize: "1rem",
  //     fontWeight: "bold",
  //     background: "#ffedf7 0% 0% no-repeat padding-box",
  //     border: "0.3px solid #820f4c",
  //     borderRadius: "0px 0px 2px 2px",
  //     padding: "0 5px",
  //     bottom: "-17px",
  //     right: 0,
  //   },
  // },

  // "@media": {
  //   [laptopRange]: {
  //     selectors: {
  //       "& .ist-out": { margin: "1rem 0" },
  //       "& .ist-out span": { fontSize: "1rem", padding: "2px 7px 0 6px" },
  //       "& .ist-out span sub": { fontSize: "0.6rem" },
  //       "& .ist-out::after": { fontSize: "0.6rem", bottom: "-11px" },
  //     },
  //   },
  // },
});

/* ---- Footer ---- */
// ❌ You had an @media block containing "&": { ... } and selector entries.
// ✅ Put self properties directly in the @media block, and nested selectors under a selectors inside the block.

export const itemPanelFooter = style({
  position: "absolute",
  right: "-1px",
  bottom: "-31px",
  borderRadius: "0 0 6px 6px",
  background: "#ffffff 0% 0% no-repeat padding-box",
  border: "0.5px solid #bbbfc6",
  display: "flex",

  // selectors: {
  //   "& span:nth-child(1):after": {
  //     content: '""',
  //     borderLeft: "0.5px solid #bbbfc6",
  //     position: "absolute",
  //     right: 0,
  //     height: "70%",
  //   },
  //   "& span": {
  //     fontSize: "1.4rem",
  //     fontWeight: 500,
  //     padding: "4px 10px 1px 10px",
  //     position: "relative",
  //   },
  //   "& span sub": { fontSize: "1rem" },
  //   "& img": { margin: "0 0 0 5px" },
  // },

  // "@media": {
  //   [laptopRange]: {
  //     bottom: "-21.4px",
  //     selectors: {
  //       "& span": { fontSize: "1rem", padding: "2px 5px 1px 8px" },
  //       "& span sub": { fontSize: "0.6rem" },
  //       "& img": { width: "0.8vw" },
  //     },
  //   },
  // },
});
// descendants -> globalStyle
globalStyle(`${itemPanelFooter} span:nth-child(1):after`, {
  content: '""',
  borderLeft: "0.5px solid #bbbfc6",
  position: "absolute",
  right: 0,
  height: "70%",
});

globalStyle(`${itemPanelFooter} span`, {
  fontSize: "1.4rem",
  fontWeight: 500,
  padding: "4px 10px 1px 10px",
  position: "relative",
  "@media": { [laptopRange]: { fontSize: "1rem", padding: "2px 5px 1px 8px" } },
});

globalStyle(`${itemPanelFooter} span sub`, {
  fontSize: "1rem",
  "@media": { [laptopRange]: { fontSize: "0.6rem" } },
});

globalStyle(`${itemPanelFooter} img`, {
  margin: "0 0 0 5px",
  "@media": { [laptopRange]: { width: "0.8vw" } },
});

/* ---- Projected availability ---- */
export const projectedAvailability = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: "matrix(0, -1, 1, 0, 0, 0)",
  position: "absolute",
  left: "-162px",
  top: "100px",

  // selectors: {
  //   "& span": {
  //     fontSize: "2rem",
  //     fontWeight: 500,
  //     border: "0.5px dashed rgba(18, 20, 24, 0.5)",
  //     padding: "5px 15px",
  //     borderRadius: "3px",
  //     textAlign: "center",
  //   },
  //   "& span p:nth-child(2)": { fontSize: "1.3rem" },
  // },

  "@media": {
    [laptopRange]: {
      left: "-135px",
      top: "75px",
      // selectors: {
      //   "& span": { fontSize: "1.6rem" },
      //   "& span p:nth-child(2)": { fontSize: "0.9rem" },
      // },
    },
  },
});
globalStyle(`${projectedAvailability} span`, {
  fontSize: "2rem",
  fontWeight: 500,
  border: "0.5px dashed rgba(18, 20, 24, 0.5)",
  padding: "5px 15px",
  borderRadius: "3px",
  textAlign: "center",
  "@media": { [laptopRange]: { fontSize: "1.6rem" } },
});

globalStyle(`${projectedAvailability} span p:nth-child(2)`, {
  fontSize: "1.3rem",
  "@media": { [laptopRange]: { fontSize: "0.9rem" } },
});
