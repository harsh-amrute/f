import { useState } from "react";
import { UploadSectionWrapper } from "./style";
import UploadRightSection from "./UploadRightSection";
import UploadLeftSection from "./UploadLeftSection";
import NoDataToDisplay from "./NoDataToDisplay";

function UploadWrapperSection() {
  const [noData, setNoData] = useState(true);
  return (
    <UploadSectionWrapper>
      <UploadLeftSection setNoData={setNoData} />
      {noData ? (
        <NoDataToDisplay imgSrc={"/assets/img/no data to display.svg"} />
      ) : (
        <UploadRightSection message="No Error Found" />
      )}
    </UploadSectionWrapper>
  );
}

export default UploadWrapperSection;
