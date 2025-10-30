import {
  HeaderText,
  RightSectionWrapper,
  headerFontSizeVar,
  headerFontWeightVar,
} from "./style.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import ProgressBox from "./ProgressBox";
import RightSectionFilePanel from "./RightSectionFilePanel";

interface UploadRightSectionProps {
  message: string;
}

function UploadRightSection({ message }: UploadRightSectionProps) {
  return (
    <div className={RightSectionWrapper}>
      <ProgressBox label={"Uploaded Succesfully"} />
      <div
        className={HeaderText}
        style={assignInlineVars({
          [headerFontSizeVar]: "1.9rem",
          [headerFontWeightVar]: "600",
        })}
      >
        {message}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        <RightSectionFilePanel
          text={"Error File"}
          img="/assets/img/excel.svg"
          iconStyles={{ width: "2rem", padding: "0px" }}
          imgStyles={{ width: "3.5rem" }}
          btnIcon="/assets/img/VectorFLOW/NMS/download.svg"
        />
        <RightSectionFilePanel
          text={"Assign Roles & Permission"}
          img="/assets/img/excel.svg"
          iconStyles={{ width: "1.7rem", padding: "0px" }}
          imgStyles={{ width: "3.5rem" }}
          btnIcon="/assets/img/Open new link icon.svg"
        />
      </div>
    </div>
  );
}

export default UploadRightSection;
