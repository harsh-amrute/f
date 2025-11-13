import { ButtonFloat } from "../../../components";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  fileName,
  filePanel,
  headerText,
  headerTextFontSizeVar,
  headerTextFontWeightVar,
} from "./style.css";

interface RightSectionFilePanelProps {
  img?: string;
  imgStyles?: React.CSSProperties;
  btnIcon: string;
  iconStyles: React.CSSProperties;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

function RightSectionFilePanel({
  img,
  imgStyles,
  btnIcon,
  iconStyles,
  text,
  onClick
}: RightSectionFilePanelProps) {
  return (
    <div className={filePanel} onClick={onClick}>
      <div className={fileName}>
        <img src={img} alt="file" style={imgStyles} />
        <div
          className={headerText}
          style={assignInlineVars({
            [headerTextFontSizeVar]: "1.6rem",
            [headerTextFontWeightVar]: "500",
          })}
        >
          {text}
        </div>
      </div>

      <ButtonFloat
        icon={btnIcon}
        text=""
        onClick={onClick}
        styles={{
          width: "5rem",
          padding: "0.4rem 0.8rem",
          display: "grid",
          placeItems: "center",
        }}
        iconStyles={iconStyles}
      />
    </div>
  );
}

export default RightSectionFilePanel;
