import styled from "styled-components";
import * as gridSystem from "../../../../../../styles/gridSystem";

export const AccordianWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
width: 100%;
`;

export const AccordianHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
`;

export const AccordianHeading = styled.div`
    padding: 10px;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 17px;
    color: #313131;
    letter-spacing: 0;
    line-height: 20px;
`;

export const UpArrowIcon = styled.div`
    padding: 10px;
    transform: rotate(180deg);
`;
export const DownArrowIcon = styled.div`
    padding: 10px;
`;
 
export const OptionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;
 
export const Option = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    padding: 10px;
    font-size: 1rem;
`;
