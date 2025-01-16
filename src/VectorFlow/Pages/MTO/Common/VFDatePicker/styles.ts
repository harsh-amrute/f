import styled from "styled-components";

export const DatePickerWrapper = styled.div`
    display: flex;
    cursor: pointer;
    flex-direction: row;
    width: 180px;
    border: 0.5px solid #ACACAC;
    padding: 5px 3px;
`;

export const TextInputWrapper = styled.input`
    width: 80%;
    height: 100%;
    text-align: center;
    font: 24px;
    letter-spacing: 0px;
    opacity: 1;
    font-size: 18px;
    padding: 4px;
    font-weight: bold;
    font-family: Roboto;
    border: none;
    pointer-events: none;
`;

export const DateInputWrapper = styled.input`
    opacity: 0;
    position: absolute;
    pointer-events: none;
`;

export const ButtonWrapper = styled.button`
    background: none;
`;

export const ImageWrapper = styled.img`
    cursor: pointer;
    height: 25px;
    width: 25px;
`;