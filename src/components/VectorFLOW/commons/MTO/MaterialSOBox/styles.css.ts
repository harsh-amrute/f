import { style, createVar } from "@vanilla-extract/css";

/* ===== Dynamic vars ===== */
export const viewOrderTextColorVar = createVar();
export const viewOrderBgColorVar = createVar();

export const colorOnLeftBgVar = createVar();
export const colorOnLeftHeightVar = createVar();

export const separatorColorVar = createVar();

/* ===== Blocks ===== */
export const PercentBorderContainer = style({
  height: "100%",
  width: "100%",
  fontSize: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Percentborder = style({
  border: "3px solid #F0F0F0",
  borderRadius: "50%",
  backgroundColor: "#CDCDCD",
  height: "38px",
  width: "38px",
  marginLeft: "auto",
  marginRight: "auto",
  position: "relative",
});

export const Percent = style({
  textAlign: "center",
});

/* Buttons row */
export const BtnGroup = style({
  height: "60px",
  width: "100%",
  display: "flex",
});

export const Btns = style({
  width: "100%",
  paddingTop: "5px",
  paddingRight: "5px",
  display: "flex",
  fontSize: "10px",
  justifyContent: "center",
  alignItems: "center",
});

/* Theme-aware button */
export const ViewOrder = style({
  vars: {
    [viewOrderTextColorVar]: "#BC3D81",
    [viewOrderBgColorVar]: "#fcf0f7",
  },
  fontSize: "8px",
  color: viewOrderTextColorVar,
  marginBottom: "22px",
  backgroundColor: viewOrderBgColorVar,
  width: "70%",
  padding: "7px",
  textAlign: "center",
  borderRadius: "8px",
});

/* Label box above */
export const TextOnBox = style({
  position: "absolute",
  bottom: "100%",
  left: 0,
  backgroundColor: "#E0E0E0",
  width: "90px",
  zoom: "0.8" as any,
  padding: "4px",
  borderRadius: "8px 8px 0 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

/* small helper */
export const ImgDiv = style({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  justifyContent: "center",
  padding: "1px",
  fontWeight: "bold",
});

/* Colored stripe(s) on the left */
export const ColorOnLeft = style({
  vars: {
    [colorOnLeftBgVar]: "#000",
    [colorOnLeftHeightVar]: "10px",
  },
  position: "absolute",
  right: "100%",
  borderRadius: "8px 0 0 8px",
  backgroundColor: colorOnLeftBgVar,
  width: "15px",
  height: colorOnLeftHeightVar,
  selectors: {
    "&:nth-of-type(1)": { top: "0px", zIndex: 0 },
    "&:nth-of-type(2)": { top: "11px", zIndex: 1 },
    "&:nth-of-type(3)": { top: "21px", zIndex: 2 },
  },
});

export const ColoronLeftWrapper = style({
  position: "absolute",
  right: "100%",
  borderRadius: "8px 0 0 8px",
  transition: "0.3s ease-in-out",
  selectors: {
    "&:hover": { border: "2px solid transparent" },
  },
});

/* Separators and icons */
export const Separator = style({
  vars: { [separatorColorVar]: "grey" },
  borderRight: `1px solid ${separatorColorVar}`,
  height: "85%",
  margin: "auto",
});

export const ButtonImg = style({
  justifyContent: "center",
  marginRight: "2px",
  transition: "0.3s ease-in-out",
  selectors: {
    "&:hover": { transform: "scale(1.3)" },
  },
});

export const BTRLayoutTabsWrapper = style({
  display: "flex",
  justifyContent: "center",
  marginBottom: "15px",
});

export const Btncount = style({
  justifyContent: "center",
  //   alignItem: "center",
  width: "100%",
});

// export const diviLine =  styled.div`
//     width:"400"
//     style:"border: 2px dashed #C0C0C0"
//     color:"#FFFFFF"
//     size:"6"
// `;

/* Text on colored stripe */
export const TextOnColor = style({
  fontSize: "10px",
  transform: "rotate(-90deg)",
  whiteSpace: "nowrap",
  color: "white",
});

// export const underLine = styled.div`
//     width:"400"
//     style:"border: 1px solid #000"
//     color:"#000"
// `;
// export const ProcurementLayout = styled.div`
//   height: "100%";
//   width: 1200px;
// `;
