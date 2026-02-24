import { noData } from "./style.css";

interface NoDataToDisplayProps {
  imgSrc?: string;
}

function NoDataToDisplay({ imgSrc }: NoDataToDisplayProps) {
  return (
    <div className={noData}>
      <img src={imgSrc} alt="" />
    </div>
  );
}

export default NoDataToDisplay;
