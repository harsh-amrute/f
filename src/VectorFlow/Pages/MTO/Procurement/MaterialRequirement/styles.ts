import styled from "styled-components";
import { ColorsMTO } from "../../Common/Colors";

export const MaterialRequiremetLayout = styled.div`
    height: '1200px',
    width: '1200px'
`

export const MaterialRequirementTest = styled.div`
    display:flex;
    justify-content:center;
    align-item:center;
    font-size:20px;
    color:${ColorsMTO.Black};
    font-family:Roboto-Light;
    font:normal normal 300 20px/24px Roboto;
    opacity:100%;
    flex-direction:row;
`

export const MaterialRequirementDate = styled.div`
    font-weight:bold,
    font-familt:Roboto-Medium;
    justify-content:center;
    align-item:center;
    font-size:20px;
    font:normal normal medium 20px/24px Roboto;
    padding-left:8px;
`

export const MaterialRequirementHeading = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    padding: 20px 0 5px;
`