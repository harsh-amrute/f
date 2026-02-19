import { style } from "@vanilla-extract/css";

export const Wrapper = style({
    position: "relative",
    margin: "20px 100px",
  });
  
  export const GridContainer = style({
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    padding: "40px",
    paddingLeft: "40px",
    marginTop: "20px",
    background: "rgba(246, 206, 233, 0.28)",
    borderRadius: "6px",
  });
  
  export const SideTab = style({
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translate(-50%, -50%) rotate(180deg)",
    background: "linear-gradient(180deg, #b03775, #993366)",
    color: "white",
    writingMode: "vertical-rl",
    textOrientation: "mixed",
    fontSize: "12px",
    fontWeight: "bold",
    padding: "12px 8px",
    height: "130px",
    borderRadius: "5px",
    cursor: "default",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
    selectors: {
      "&::after": {
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
      },
    },
  });
  
  export const CheckUpdatesWrapper = style({
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 40px",
    alignItems: "center",
    gap: "22px",
    marginTop: "15px",
  });
  
  export const LastUpdateStatus = style({
    fontSize: "1rem",
    color: "rgb(96, 93, 93)",
    padding: "4px",
  });
  

  export const finalResultSectionWrapper = style({
    height: "fit-content",
    position: "relative",
  });
  