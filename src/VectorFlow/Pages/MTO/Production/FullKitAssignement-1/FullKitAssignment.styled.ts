import styled from "styled-components";
import * as globalStyles from "../../../../../styles/global";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .ag-header-container {
    font-size: 18px;
  }
  & .ag-header-cell-text {
    text-align: center;
  }
  & > .ag-theme-alpine {
    margin: 20px 0;
    width: 100%;
  }
  & > button {
    width: max-content;
  }
  & > *:not(button) {
    transition: flex 0.2s ease-in-out !important;
    flex: 1;
  }
`;

export const Button = styled.button<{ themeUi: string; arrowName: string }>`
  padding: 1rem 2rem;
  line-height: 1;
  border-radius: 10px 10px 0 0;
  font-size: 10px;
  position: relative;
  background: ${(props) =>
    globalStyles.chooseThemeColor[props.themeUi]?.color4};
  color: ${(props) => globalStyles.chooseThemeColor[props.themeUi]?.colorText};
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: -3px;
    transform: translate(-50%, -50%);
    border: 2px solid white;
    width: 20px;
    height: 20px;
    background: black;
    font-family: Roboto;
    border-radius: 50%;
    background: url(assets/img/mto/fullKitAssignment/${(props) =>
      props.arrowName}.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;
