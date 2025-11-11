import { style, createVar, globalStyle } from "@vanilla-extract/css";

export const containerBorderColorVar = createVar();
export const progressWidthVar = createVar();
export const buttonLabelColorVar = createVar();
export const buttonLabelWeightVar = createVar();
export const dropdownTopVar = createVar();
export const dropdownLeftVar = createVar();

export const Container = style({
  vars: { [containerBorderColorVar]: "#d17ca0" },
  borderWidth: "1.5px",
  borderStyle: "dashed",
  borderColor: containerBorderColorVar,
  padding: "14px 16px",
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "8px",
  background: "#fff",
  maxWidth: "500px",
});

export const LeftSection = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: 600,
  fontSize: "1.1rem",
  cursor: "pointer",
});

export const ButtonsWrapper = style({
  display: "flex",
  gap: "10px",
});

export const ButtonContentWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  fontSize: "1.1rem",
  color: "#ffffff",
});

export const statusBarWrapper = style({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  background: "white",
  boxShadow: "0px -2px 6px rgba(0, 0, 0, 0.4)", // fixed 'shadow' -> 'boxShadow'
  borderTop: "1px solid #E0E0E0",
});

export const leftSection = style({
  display: "flex",
  alignItems: "center",
  gap: "24px",
  marginLeft: "60px",
});

/* Modal layout */
export const ModalWrapper = style({
  height: "fit-content",
  width: "50vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden",
  padding: "10px 10px",
});

export const ModalHeader = style({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
});

export const CloseButton = style({
  background: "transparent",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
});

export const ImageWrapper = style({
  height: "40vh",
  margin: "20px 0",
});

export const FooterWrapper = style({
  display: "flex",
  height: "40px",
  width: "100%",
  padding: "12px",
  justifyContent: "space-between",
  alignItems: "center",
});

/* Progress section */
export const ProgressWrapper = style({
  width: "80%",
  margin: "8px auto",
  paddingTop: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const ProgressContainer = style({
  width: "100%",
  height: "14px",
  borderRadius: "50px",
  border: "1.5px solid rgba(124, 123, 123, 0.56)",
  overflow: "hidden",
});

export const ProgressFill = style({
  height: "100%",
  width: progressWidthVar, // set at runtime
  backgroundColor: "#b52670",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50px",
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  transition: "width 0.3s ease-in-out",
});

export const ProgressMessage = style({
  margin: "0 auto",
  fontSize: "1.1rem",
  fontWeight: 500,
  color: "rgb(56, 54, 54)",
});

export const DateTimeWrapper = style({
  display: "flex",
  width: "fit-content",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  fontSize: "1.1rem",
});

/* ---------- toolbar ---------- */
export const ToolbarWrapper = style({
  width: "calc(100% + 24px)",
  position: "sticky",
  top: "61px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "6px 20px",
  background: "#ffffff",
  zIndex: 2,
  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
});

export const ToolbarLeftSection = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  fontSize: "1.2rem",
});

export const ToolbarRightSection = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "11px",
  fontSize: "1.2rem",
});

export const GoBackButton = style({
  display: "flex",
  background: "transparent",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "6px 12px",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
      transition: "all 0.3s ease-in-out",
    },
  },
});

/* ---------- toggle group ---------- */
export const ToggleButtonWrapper = style({
  display: "flex",
  position: "relative",
  width: "fit-content",
  padding: "4px",
  border: "0.5px solid #e0e0e0",
  borderRadius: "8px",
  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
  background: "#ffffff",
});

export const ToggleButton = style({
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
      transition: "all 0.3s ease-in-out",
    },
  },
});

export const ButtonLabel = style({
  vars: {
    [buttonLabelColorVar]: "#3e3e3e",
    [buttonLabelWeightVar]: "400",
  },
  fontSize: "0.8rem",
  color: buttonLabelColorVar,
  fontWeight: buttonLabelWeightVar as any,
  userSelect: "none",
});

export const ToggleDivider = style({
  width: "1px",
  height: "35px",
  background: "#e0e0e0",
  margin: "0 6px",
});

/* ---------- dropdown ---------- */
export const DropdownWrapper = style({
  vars: {
    [dropdownTopVar]: "0px",
    [dropdownLeftVar]: "0px",
  },
  position: "absolute",
  top: dropdownTopVar,
  left: dropdownLeftVar,
  backgroundColor: "transparent",
  zIndex: 9999,
  maxHeight: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
});

export const DropDownArrow = style({
  width: 0,
  height: 0,
  marginRight: "20px",
  borderLeft: "8px solid transparent",
  borderRight: "8px solid transparent",
  borderBottom: "8px solid rgba(229, 228, 228, 0.55)",
  filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1))",
});

export const SectionWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "16px 0 16px 16px",
});

export const ChartWrapper = style({
  flex: 1,
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
  overflow: "hidden",
  background: "white",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
});

export const Loader = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
  fontSize: "1.2rem",
});

export const SectionWrapperViewSummary = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "16px 0 16px 16px",
  position: "relative",
  marginTop: "24px",
});

export const GridWrapper = style({
  position: "relative", // important for absolute Tab
  border: "1px solid #ccc",
  borderRadius: "0 8px 8px 8px",
  padding: "16px 16px 25px 16px",
  overflow: "hidden",
  background: "white",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  height: "400px",
  // selectors: {
  //   "& > .ag-theme-alpine": {
  //     flex: 1,
  //   },
  // },
});
// ✅ scope AG Grid child globally under your wrapper
globalStyle(`${GridWrapper} > .ag-theme-alpine`, {
  flex: 1,
});

export const WorkStationDropDown = style({
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  width: "fit-content",
  fontSize: "1rem",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  selectors: {
    "&:focus": {
      outline: "none",
      borderColor: "#9c0d64",
      boxShadow: "0 0 5px rgba(156, 13, 100, 0.5)",
    },
  },
});

export const Tab = style({
  position: "absolute",
  top: "-25px",
  left: "16px",
  height: "40px",
  padding: "10px 80px 10px 20px",
  display: "flex",
  alignItems: "center",
  color: "white",
  fontWeight: 500,
  fontSize: "1.2rem",
  background: "linear-gradient(135deg, #9c0d64, #c71585)",
  borderTopLeftRadius: "8px",
  clipPath: "polygon(0 0, 75% 0, 100% 100%, 0% 100%)",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.25)",
});



export const filterWrapper = style({
    height: "70vh",
    width: "70vw",
    backgroundColor: "white",
    position: "relative",
  });
  
  export const filterHeaderWrapper = style({
    height: "35px",
    width: "100%",
    borderBottom: "1px solid #ccc",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
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
  
  export const filterHeaderTitle = style({
    fontSize: "1.2rem",
    fontWeight: 500,
    display: "flex",
    gap: "8px",
    alignItems: "center",
  });
  
  export const closeButton = style({
    background: "none",
    border: "none",
    fontSize: "2.6rem",
    fontWeight: 200 as any,
    cursor: "pointer",
    lineHeight: 1,
  });
  
  export const filterContent = style({
    height: "80%",
    width: "100%",
    overflow: "auto",
  });
  
  export const filterTabLayout = style({
    display: "flex",
    gap: "16px",
    padding: "16px 40px",
    width: "fit-content",
    height: "fit-content",
  });
  
  export const filterTab = style({
    padding: "8px 0",
    borderRadius: "4px",
    background: "white",
    cursor: "pointer",
    width: "220px",
    border: "1px solid #ccc",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    selectors: {
      "&:hover": { transform: "scale(1.01)" },
    },
  });
  
  export const filterTabActive = style({
    background: "#9c0d64",
    color: "white",
  });
  
  export const filterTabHeader = style({
    fontSize: "1.1rem",
    fontWeight: 500,
    padding: "4px 8px 4px 16px",
    textAlign: "left",
    borderBottom: "1px solid #ccc",
  });
  
  export const filterSearchBar = style({
    width: "90%",
    margin: "12px auto",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "18px",
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
  
  export const filterList = style({
    maxHeight: "190px",
    overflowY: "auto",
    marginTop: "8px",
    padding: "0 8px",
  });
  
