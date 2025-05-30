import { ButtonFloat } from "../../../components";
import { FileName, FilePanel, HeaderText } from "./style";

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
  text
}: RightSectionFilePanelProps) {
  return (
    <FilePanel>
      <FileName>
        <img src={img} alt="file" style={imgStyles} />
        <HeaderText fontSize="1.6rem" fontWeight="500">
          {text}
        </HeaderText>
      </FileName>
      <ButtonFloat
        icon={btnIcon}
        text=""
        onClick={() => {
          console.log("click");
        }}
        styles={{
          width: "6rem",
          padding: "0.5rem 1rem",
          display: "grid",
          placeItems: "center",
        }}

        iconStyles={iconStyles}
      />
    </FilePanel>
  );
}

export default RightSectionFilePanel;
