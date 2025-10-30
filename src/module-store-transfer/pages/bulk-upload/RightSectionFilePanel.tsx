import { ButtonFloat } from "../../../components";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  FileName,
  FilePanel,
  HeaderText,
  headerFontSizeVar,
  headerFontWeightVar,
} from "./style.css";

interface RightSectionFilePanelProps {
  img?: string;
  imgStyles?: React.CSSProperties;
  btnIcon: string;
  iconStyles: React.CSSProperties;
  text: string;
}

function RightSectionFilePanel({
  img,
  imgStyles,
  btnIcon,
  iconStyles,
  text,
}: RightSectionFilePanelProps) {
  return (
    <div className={FilePanel}>
      <div className={FileName}>
        <img src={img} alt="file" style={imgStyles} />
        <div
          className={HeaderText}
          style={assignInlineVars({
            [headerFontSizeVar]: "1.6rem",
            [headerFontWeightVar]: "500",
          })}
        >
          {text}
        </div>
      </div>

      <ButtonFloat
        icon={btnIcon}
        text=""
        onClick={() => console.log("click")}
        styles={{
          width: "6rem",
          padding: "0.5rem 1rem",
          display: "grid",
          placeItems: "center",
        }}
        iconStyles={iconStyles}
      />
    </div>
  );
}

export default RightSectionFilePanel;
