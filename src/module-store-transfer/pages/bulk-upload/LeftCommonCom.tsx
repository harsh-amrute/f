import React from "react";
import {
  HeaderSection,
  HeaderText,
  LeftCommonComUploadWrapper,
  LeftCommonComWrapper,
  LeftStep,
  SubText,
} from "./style";
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
  setNoData
}: LeftCommonComProps) {


  const handleUpload = () => {
    if(setNoData){
        setNoData(false);
    }
  };

  
  return (
    <LeftCommonComWrapper>
      <LeftStep>Step {step}</LeftStep>
      <LeftCommonComUploadWrapper>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={img} alt="" style={imgStyles} />
          <HeaderSection>
            <HeaderText>{headerText}</HeaderText>
            <SubText fontSize="1.4rem" >{subText}</SubText>
          </HeaderSection>
        </div>
        <ButtonFloat
          onClick={handleUpload}
          text={btnText}
          icon={btnImg}
          styles={btnStyles}
        ></ButtonFloat>
      </LeftCommonComUploadWrapper>
    </LeftCommonComWrapper>
  );
}

export default LeftCommonCom;
