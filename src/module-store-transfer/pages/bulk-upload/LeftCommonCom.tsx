import React from 'react'
import { HeaderSection, HeaderText, LeftCommonComUploadWrapper, LeftCommonComWrapper, LeftStep, SubText } from './style'
import ButtonFloat from "../../../../src/components/commons/ButtonFloat"

interface LeftCommonComProps {
    step: number;
    img: string;
    headerText: string;
    subText: string;
    btnText: string;
    btnImg: string;
    }

function LeftCommonCom({step,img,headerText,subText,btnText,btnImg}:LeftCommonComProps) {
    const handleUpload = ()=>{
        console.log('upload')
    }
  return (
    <LeftCommonComWrapper>
        <LeftStep>Step {step}</LeftStep>
        <LeftCommonComUploadWrapper>
            <img src="" alt="" />
            <HeaderSection>
                <HeaderText>{headerText}</HeaderText>
                <SubText>{subText}</SubText>
            </HeaderSection>
            <ButtonFloat onClick={handleUpload} text={btnText} icon={btnImg}></ButtonFloat>
        </LeftCommonComUploadWrapper>
    </LeftCommonComWrapper>
  )
}

export default LeftCommonCom