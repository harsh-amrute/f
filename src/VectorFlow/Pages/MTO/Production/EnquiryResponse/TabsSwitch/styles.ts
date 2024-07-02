import styled from "styled-components";
import * as gridSystem from "../../../../../../styles/gridSystem";

export const SCGridNav = styled.div`
  position: sticky;
  height: 85vh;
  top: 95px;
  max-height: 100%;
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;

export const TabSwitchContainer = styled.div`
display: flex;
align-items: center;
gap: 50px;
margin-top: 40px;

@media (min-width:  ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL}) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
}
`;

export const TabSwitchHeading = styled.div`
font-family: 'Roboto';
font-weight: 500;
font-size: 20px;
color: #000000; 
letter-spacing: 0;
line-height: 24px;
`;

export const TabsWrapper = styled.div`
display: flex;
border: 1px solid #BB3F81;
border-radius: 15px;
box-shadow: rgba(139, 139, 139, 0.255) -3px 3px 12px;
`;

export const Tab = styled.div`
display: flex;
justify-content: center;
text-align: center;
min-width: 150px;
padding: 5px;
cursor: pointer;

@media (min-width:  ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL}) {
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 10px;
    line-height: 20px;
    min-width: 50px;
    padding: 5px;
    cursor: pointer;
}
`;

export const ActiveTab = styled.div`
color: white;
background: #BB3F81;
display: flex;
justify-content: center;
text-align: center;
min-width: 150px;
padding: 5px;

@media (min-width:  ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL}) {
    color: white;
    background: #BB3F81;
    display: flex;
    justify-content: center;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    min-width: 50px;
    padding: 5px;
}
`;
