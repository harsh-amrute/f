import React from "react";
import { LeftSectionWrapper } from "./style";
import LeftCommonCom from "./LeftCommonCom";

function UploadLeftSection() {
  return (
    <LeftSectionWrapper>
      <LeftCommonCom
        step={1}
        img="image"
        headerText="Download Template"
        subText="You can download attached sample templates"
        btnText="Download"
        btnImg="/assets/img/VectorFLOW/NMS/download.svg"
      />
      <LeftCommonCom
        step={2}
        img="image"
        headerText="Upload File"
        subText="You can upload your user excel here"
        btnText="Upload"
        btnImg="/assets/img/VectorFLOW/NMS/upload.svg"
      />
    </LeftSectionWrapper>
  );
}

export default UploadLeftSection;
