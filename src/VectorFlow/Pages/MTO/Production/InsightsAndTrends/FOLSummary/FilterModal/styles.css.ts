import { style } from "@vanilla-extract/css";
/* Overlay + modal shell */
export const BackgroundCover = style({
  position: "fixed",
  zIndex: 99999,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "#0000004a",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const ModalWrapper = style({
  overflow: "auto",
  height: "95vh",
  width: "690px",
});

export const ModalHeader = style({
  borderRadius: "8px 8px 0 0",
  height: "50px",
  backgroundColor: "black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Heading = style({
  color: "white",
  fontSize: "1.5rem",
  letterSpacing: "0.15rem",
});

export const ModalBody = style({
  minHeight: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 100px",
});

export const ModalFooter = style({
  borderTop: "1px dashed #868585",
  display: "flex",
  justifyContent: "end",
  gap: "20px",
  padding: "50px",
});

export const CloseIcon = style({
  color: "white",
  padding: "20px",
  position: "absolute",
  right: "10px",
  cursor: "pointer",
});

/* Footer buttons */
export const CloseBtn = style({
  border: "1px solid #868585",
  color: "#868585",
  display: "flex",
  fontSize: "1rem",
  padding: "10px 50px",
  borderRadius: "4px",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

export const ApplyBtn = style({
  color: "white",
  border: "none",
  fontSize: "1rem",
  padding: "10px 50px",
  borderRadius: "4px",
  cursor: "pointer",
  backgroundImage: "linear-gradient(to right, #8D2E61, #BB3F81, #DB6BA7)",
});

/* Filter body */
export const FilterContainer = style({
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "422px",
  borderRadius: "8px",
  fontSize: "1.5rem",
  boxShadow: "0px 6px 12px #95959529",
});

export const FilterHeading = style({
  display: "flex",
  justifyContent: "center",
  padding: "20px",
  fontFamily: `'Roboto', sans-serif`,
  fontWeight: 500,
  fontSize: "20px",
  color: "#313131",
  letterSpacing: "0",
  lineHeight: "24px",
});

export const SearchBar = style({
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  borderRadius: "40px",
  background: "#F2F2F2",
  width: "403px",
  height: "55px",
  margin: "10px auto",
  opacity: 1,
});

export const FilterAccordianWrapper = style({
  width: "100%",
});

export const PlantInput = style({
  background: "#F2F2F2",
  border: "none",
  outline: "none",
  height: "50px",
  width: "100%",
  fontSize: "2rem",
});

export const HorizontalLine = style({
  height: "2px",
  width: "100%",
  backgroundColor: "#F4F4F4",
});

export const ButtonFilterWrapper = style({
  borderTop: "1px dashed #A0A0A0",
  height: "109px",
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F4F4F4",
});

export const ButtonContainer = style({
  marginRight: "46px",
  gap: "40px",
  display: "flex",
});

export const OptionsWrapper = style({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
});

export const Option = style({
  width: "100%",
  display: "flex",
  gap: "10px",
  padding: "10px",
  fontFamily: "Roboto",
  fontWeight: 300,
  fontSize: "16px",
  letterSpacing: "0",
  color: "#313131",
});

export const AccordianContainer = style({
  padding: "20px",
  borderTop: "3px solid rgb(244, 244, 244)",
});
