import { style, globalStyle } from "@vanilla-extract/css";

/* ── Card shell ─────────────────────────────────────────── */

export const VFMasterCardContainer = style({
  minWidth: "345px",
  height: "419px",
  display: "flex",
  flexDirection: "column",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 6px 12px #95959529",
  borderRadius: "6px",
  opacity: 1,
});

export const VFMasterCardHeader = style({
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  fontSize: "20px",
  fontFamily: "Roboto",
  fontWeight: 500,
  letterSpacing: "0px",
  color: "#313131",
  opacity: 1,
  height: "60px",
  width: "100%",
  padding: "20px 16px",
  borderBottom: "0.5px solid #ECECEC",
  justifyContent: "space-between",
});

/* ── List container + scrollbar ─────────────────────────── */

export const VFMasterCardListContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflowY: 'auto',          // was 'overlay'
});

globalStyle(`${VFMasterCardListContainer}::-webkit-scrollbar`, {
  width: 7,
});
globalStyle(`${VFMasterCardListContainer}::-webkit-scrollbar-track`, {
  borderRadius: 30,
  opacity: 1 as unknown as number,
});
globalStyle(`${VFMasterCardListContainer}::-webkit-scrollbar-thumb`, {
  width: 7,
  background: "#D1D1D1 0% 0% no-repeat padding-box",
  boxShadow: "0px 6px 9px #41414129",
  borderRadius: 30,
  opacity: 1 as unknown as number,
});

/* ── List item (theme + selection via data-attrs) ───────── */

export const VFMasterCardListItem = style({
  display: "flex",
  alignItems: "center",
  height: "33px",
  padding: "7px 16px",
  width: "100%",
  textAlign: "left",
  fontWeight: 400,
  fontSize: "16px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  color: "#313131",
  opacity: 1,
  borderBottom: "0.5px solid #ECECEC",

  // dynamic background based on data attributes
  selectors: {
    '&[data-selected="true"][data-theme="REGALBLAZE"]': {
      backgroundColor: "rgba(252, 163, 17, 0.3)", // REGALBLAZE selected
    },
    '&[data-selected="true"]:not([data-theme="REGALBLAZE"])': {
      backgroundColor: "#bc3d814d", // default theme selected
    },
  },
});

/* ── Checkbox (theme via data-attr + :checked) ──────────── */

export const VFMasterCardCheckBox = style({
  appearance: "none",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  outline: "none",
  border: "1px solid grey",

  selectors: {
    "&:checked": {
      border: "none",
    },
    "&:checked::after": {
      content: '"✓"',
      color: "white",
      marginLeft: "5px",
    },

    // theme-specific checked colors (use data-theme)
    '&:checked[data-theme="REGALBLAZE"]': {
      background: "#FCA311",
    },
    '&:checked:not([data-theme="REGALBLAZE"])': {
      background: "#BC3D80",
    },
  },
});
