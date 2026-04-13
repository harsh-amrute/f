import { useState } from "react";

interface ChartDownloadButtonProps {
  themeUi: string;
  onDownload: () => void;
  height?: number;
  width?: number;
}

const ChartDownloadButton = ({
  themeUi,
  onDownload,
  height, 
  width,
}: ChartDownloadButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const imgSrc = isHovered
    ? themeUi === "REGALBLAZE"
      ? "/assets/img/downlod-icon-hover-yellow.svg"
      : "/assets/img/downlod-icon-hover.svg"
    : "/assets/img/downlod-icon.svg";

  return (
    <div style={{ marginLeft: 10, marginBottom: "-5px" }}>
      <img
        src={imgSrc}
        height={height || 15}
        width={width || 15}
        style={{ cursor: "pointer", marginRight: "10px" }}
        title="Download Graph"
        onClick={onDownload}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
};

export default ChartDownloadButton;
