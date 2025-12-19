import { style, globalStyle, createVar } from "@vanilla-extract/css";
import { opacityDisableVar } from "../../MDM/ViewModify/styles.css";

export const accentColorThemeVar = createVar();
export const textBtnVar = createVar();

export const FilterBody = style({
  display: "flex",
  justifyContent: "center",
  gap: "20px", //25px
  height: "max-content",
  maxHeight: "95vh",
  padding: "0 47px",
  // overflow: 'auto',
  // selectors: { '& input': { padding: '9px' } },
});
globalStyle(`${FilterBody} input`, { padding: "9px" });

export const FilterCardWrapper = style({
  width: "400px",
  margin: "47px 0px 47px 0px",
  backgroundColor: "white",
  // boxShadow: `0px 6px 12px ${colors.shadow}`,
  // borderRadius: '6px',
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px",

  selectors: {
    "&:hover": {
      transform: "scale(1.01)",
      transition: "all 0.2s ease-in-out",
    },
  },
});

export const FilterWrapper = style({
  height: "max-content",
  maxHeight: "600px",
  overflow: "visible",
});

export const NoFilterWrapper = style({
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "18px",
});

export const OptionsWrapper = style({
  display: "flex",
  justifyContent: "flex-start",
  paddingLeft: "20px",
  gap: "40px",
});

export const FilterHeader = style({
  height: "60px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "26px",
  fontFamily: "Roboto",
  display: "flex",
  alignItems: "center",
  paddingLeft: "10px",
});

export const FilterComponent = style({
  backgroundColor: "white",
  color: "#313131",
  minHeight: "50px",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "20px",
  fontFamily: "Roboto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
});

export const SearchComponent = style({
  background: "#F2F2F2 0% 0% no-repeat padding-box",
  borderRadius: "20px",
  height: "30px",
  width: "90%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  // selectors: { '& input:focus': { outline: 'none' } },
});
globalStyle(`${SearchComponent} input:focus`, { outline: "none" });

export const ButtonContainer = style({
  padding: "0 46px",
  gap: "40px",
  display: "flex",
});

export const ButtonFilterWrapper = style({
  borderTop: "1px dashed #A0A0A0",
  opacity: "1px",
  height: "109px",
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F4F4F4",
  borderRadius: "0px 0px 12px 12px",
});

export const DropdownGroupWrapper = style({
  margin: "3px 9px",
  display: "flex",
  justifyContent: "center",
  gap: "5px",
});

export const SelectDropdownComponent = style({
  width: "60px",
  flexGrow: 1,
  textAlign: "center",
});

export const TextFieldHeader = style({
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 300,
  fontSize: "17px",
  lineHeight: "20px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  color: "#313131",
  textAlign: "left",
  width: "100%",
  padding: "0 1rem",
  boxSizing: "border-box",
});

export const VFHorizonText = style({
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "26px",
  fontFamily: "Roboto",
  display: "block",
  textAlign: "center",
  alignItems: "center",
});

export const RangeSliderComponent = style({
  paddingTop: "15px",
  paddingBottom: "15px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

/** Themed pieces — compose manually (no clsx) */

/* MultiSelectCheckBoxComponent */
export const MultiSelectCheckBoxBase = style({
  marginBottom: "16px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "6px",
  accentColor: accentColorThemeVar,
});
export const MultiSelectThemeREGALBLAZE = style({
  // selectors: { '& input[type="checkbox"]': { accentColor: colors.regalblaze } },
});
export const MultiSelectThemeDEFAULT = style({
  // selectors: { '& input[type="checkbox"]': { accentColor: colors.defaultAccent } },
});
// descendants
// globalStyle(`${MultiSelectThemeREGALBLAZE} input[type="checkbox"]`, {
//   accentColor: colors.regalblaze,
// });
// globalStyle(`${MultiSelectThemeDEFAULT} input[type="checkbox"]`, {
//   accentColor: colors.defaultAccent,
// });

/* TextBtn */
export const TextBtnBase = style({
  fontFamily: "Roboto",
  fontWeight: 300,
  fontSize: "20px",
  lineHeight: "24px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  color: textBtnVar,
  selectors: {
    "&:hover": {
      transform: "scale(1.01)",
      transition: "all 0.2s ease-in-out",
    },
  },
});
// export const TextBtnREGALBLAZE = style({ color: colors.regalblaze });
// export const TextBtnDEFAULT = style({ color: colors.defaultAccent });

export const ConfirmationText = style({
  fontFamily: "Roboto",
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "24px",
  color: "rgb(0, 0, 0)",
  display: "flex",
  alignItems: "center",
  height: "150px",
  justifyContent: "center",
});

export const fullWidth = style({ width: "100%" });
export const pointer = style({ cursor: "pointer" });
export const defaultCursor = style({ cursor: "default" });
