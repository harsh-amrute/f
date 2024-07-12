import styled from "styled-components";
import * as gridSystem from "../../../../../styles/gridSystem";

export const EnquiryWrapper = styled.div`
  @media only screen and (min-width: ${gridSystem.size
      .mobileS}) and (max-width: ${gridSystem.size.mobileL}) {
    margin-left: -40px;
    margin-top: -40px;
    padding: 20px;
  }
`;

export const FilterWrapper = styled.div`
  padding: 0px 20px 15px;
`;

export const EditFilterBtn = styled.button`
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: rgba(139, 139, 139, 0.255) -3px 3px 12px;
  background-image: linear-gradient(to right, #8d2e61, #bb3f81, #db6ba7);
`;

export const CardBtn = styled.div`
  padding: 12px;
  cursor: pointer;
  box-shadow: rgba(139, 139, 139, 0.255) -3px 3px 12px;
`;

export const RmUICont = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 50%;
  min-width: 300px;
  border-radius: 4px;
  box-shadow: rgba(139, 139, 139, 0.255) -3px 3px 12px;

  @media only screen and (min-width: ${gridSystem.size
      .mobileS}) and (max-width: ${gridSystem.size.mobileL}) {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    min-width: 300px;
    border-radius: 4px;
    box-shadow: rgba(139, 139, 139, 0.255) -3px 3px 12px;
    background-color: #f2f2f2;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background: white;
  gap: 1rem;
  @media only screen and (min-width: ${gridSystem.size
      .mobileS}) and (max-width: ${gridSystem.size.mobileL}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 20px;
    align-items: center;
    background-color: white;
  }
`;

export const RmHeading = styled.div`
  color: #000000;
  font-family: "Roboto";
  font-size: 12px;
`;

export const VerticalLine = styled.div`
  width: 1px;
  background-color: #d4d4d4;
`;

export const ValueWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 40px;
  background-color: #f2f2f2;
  border-radius: 0px 0px 4px 4px;
  font-size: 12px;
  @media only screen and (min-width: ${gridSystem.size
      .mobileS}) and (max-width: ${gridSystem.size.mobileL}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 40px;
    border-radius: 0px 0px 4px 4px;
  }
`;

export const HighlightedValue = styled.div`
  color: #bb3f81;
  font-weight: 500;
`;

export const EstimatedWrapper = styled.div`
  position: relative;
  margin: 1rem 0;
`;
export const BlurCover = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  background: #80808080;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

export const CardCover = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DashedCard = styled.div`
  padding: 50px 40px;

  border: 1px dashed #bb3f81;
  border-radius: 10px;
  background: white;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MessageText = styled.span`
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  line-height: 30px;
`;

export const TabSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  margin-top: 20px;

  @media (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem
      .size.mobileL}) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
  }
`;

export const TabSwitchHeading = styled.div`
  font-family: "Roboto";
  font-weight: 500;
  font-size: 20px;
  color: #000000;
  letter-spacing: 0;
  line-height: 24px;
`;

export const TabsWrapper = styled.div`
  width: 18%;
`;
