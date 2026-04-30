import React from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  headerSection,
  leftCommonComUploadWrapper,
  leftCommonComWrapper,
  leftStep,
  subTextStyle,
  headerTextFontSizeVar,
  headerTextFontWeightVar,
  subTextFontSizeVar,
  subTextFontWeightVar,
  headerTextStyle,
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
  handleClick: (e:any)=>void;
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
  handleClick
}: LeftCommonComProps) {

  
  return (
    <div className={leftCommonComWrapper}>
      <div className={leftStep}>Step {step}</div>

      <div className={leftCommonComUploadWrapper}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={img} alt="" style={imgStyles} />
          <div className={headerSection}>
            <div
              className={headerTextStyle}
              style={assignInlineVars({
                [headerTextFontSizeVar]: "1.35rem",
                [headerTextFontWeightVar]: "600",
              })}
            >
              {headerText}
            </div>
            <div
              className={subTextStyle}
              style={assignInlineVars({
                [subTextFontSizeVar]: "1.15rem",
                [subTextFontWeightVar]: "bold",
              })}
            >
              {subText}
            </div>
          </div>
        </div>

        <ButtonFloat
          onClick={(e:any)=>{handleClick(e)}}
          text={btnText}
          icon={btnImg}
          styles={btnStyles}
        />
      </div>
    </div>
  );
}

export default LeftCommonCom;
