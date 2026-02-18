import { style, createVar } from "@vanilla-extract/css";
import * as gridSystem from "../../../styles/gridSystem.css";

export const partitionHeightVar = createVar();

export const SCVerticalPartitions = style({
  minWidth: "2px",
  background: "#d8d8d8",
  height: partitionHeightVar,
  margin: "0 5px",
  "@media": {
    // override to a fixed height on this breakpoint range (matches original)
    [`screen and (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      { height: "42px" },
  },
});
