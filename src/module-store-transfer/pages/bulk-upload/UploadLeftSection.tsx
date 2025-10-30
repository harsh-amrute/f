import React from "react";
import { LeftSectionWrapper } from "./style.css";
import LeftCommonCom from "./LeftCommonCom";

interface LeftCommonComProps {
  setNoData: React.Dispatch<React.SetStateAction<boolean>>;
}

function UploadLeftSection({ setNoData }: LeftCommonComProps) {
  return (
    <div className={LeftSectionWrapper}>
      <LeftCommonCom
        step={1}
        img="/assets/img/download.svg"
        headerText="Download Template"
        subText="You can download attached sample templates"
        btnText="Download"
        btnImg="/assets/img/VectorFLOW/NMS/download.svg"
        btnStyles={{
          width: "14rem",
          height: "4rem",
          fontSize: "1.3rem",
          boxShadow: "0px 6px 10px rgba(33, 33, 33, 0.5)",
        }}
        imgStyles={{ width: "6.5rem" }}
      />
      <LeftCommonCom
        step={2}
        img="/assets/img/upload.svg"
        headerText="Upload File"
        subText="You can upload your user excel here"
        btnText="Upload"
        btnImg="/assets/img/VectorFLOW/NMS/upload.svg"
        btnStyles={{
          width: "14rem",
          height: "4rem",
          fontSize: "1.4rem",
          boxShadow: "0px 6px 10px rgba(33, 33, 33, 0.5)",
        }}
        imgStyles={{ width: "6.5rem" }}
        setNoData={setNoData}
      />
    </div>
  );
}

export default UploadLeftSection;
