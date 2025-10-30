import React from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  HeaderSection,
  HeaderText,
  LeftCommonComUploadWrapper,
  LeftCommonComWrapper,
  LeftStep,
  SubText,
  headerFontSizeVar,
  headerFontWeightVar,
  subFontSizeVar,
  subFontWeightVar,
} from "./style.css";
import ButtonFloat from "../../../../src/components/commons/ButtonFloat";

interface LeftCommonComProps {
  step: number;
  img: string;
  headerText: string;
  subText: string;
  btnText: string;
  btnImg: string;
  btnStyles?: React.CSSProperties;
  imgStyles?: React.CSSProperties;
  setNoData?: React.Dispatch<React.SetStateAction<boolean>>;
}

function LeftCommonCom({
  step,
  img,
  headerText,
  subText,
  btnText,
  btnImg,
  btnStyles,
  imgStyles,
  setNoData,
}: LeftCommonComProps) {
  const handleUpload = () => {
    if (setNoData) {
      setNoData(false);
    }
  };

  return (
    <div className={LeftCommonComWrapper}>
      <div className={LeftStep}>Step {step}</div>

      <div className={LeftCommonComUploadWrapper}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={img} alt="" style={imgStyles} />
          <div className={HeaderSection}>
            <div
              className={HeaderText}
              style={assignInlineVars({
                [headerFontSizeVar]: "1.9rem",
                [headerFontWeightVar]: "600",
              })}
            >
              {headerText}
            </div>
            <div
              className={SubText}
              style={assignInlineVars({
                [subFontSizeVar]: "1.4rem",
                [subFontWeightVar]: "300",
              })}
            >
              {subText}
            </div>
          </div>
        </div>

        <ButtonFloat
          onClick={handleUpload}
          text={btnText}
          icon={btnImg}
          styles={btnStyles}
        />
      </div>
    </div>
  );
}

export default LeftCommonCom;
