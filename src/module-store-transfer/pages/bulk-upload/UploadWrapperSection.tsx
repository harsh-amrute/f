import { useState } from "react";
import { UploadSectionWrapper } from "./style.css";
import UploadRightSection from "./UploadRightSection";
import UploadLeftSection from "./UploadLeftSection";
import NoDataToDisplay from "./NoDataToDisplay";

function UploadWrapperSection() {
  const [noData, setNoData] = useState(true);
  return (
    <div className={UploadSectionWrapper}>
      <UploadLeftSection setNoData={setNoData} />
      {noData ? (
        <NoDataToDisplay imgSrc="/assets/img/no data to display.svg" />
      ) : (
        <UploadRightSection message="No Error Found" />
      )}
    </div>
  );
}

export default UploadWrapperSection;
