import { style } from "@vanilla-extract/css";
import * as gridSystem from "../../../../../../styles/gridSystem.css";

export const NoteWrapper = style({
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  width: "50%",
  borderRadius: "4px",
  backgroundColor: "#ebebeb",
  color: "#4a4a4a",
  padding: "10px",
  "@media": {
    [`only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL})`]:
      {
        marginTop: "40px",
        gap: "10px",
        width: "100%",
        padding: "5px",
      },
  },
});

export const LogoWrapper = style({
  padding: "10px",
});
