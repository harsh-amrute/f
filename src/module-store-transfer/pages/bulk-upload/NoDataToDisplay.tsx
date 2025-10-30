import { NoData } from "./style.css";

interface NoDataToDisplayProps {
  imgSrc?: string;
}

function NoDataToDisplay({ imgSrc }: NoDataToDisplayProps) {
  return (
    <div className={NoData}>
      <img src={imgSrc} alt="" />
    </div>
  );
}

export default NoDataToDisplay;
