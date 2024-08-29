import styled from "styled-components";
import * as globalStyles from "../../../../../styles/global";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // & .ag-header-container {
  //   font-size: 18px;
  // }
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
  & > *:not(button, .toolbar-container) {
    transition: flex 0.2s ease-in-out !important;
    flex: 1;
  }
  & .toolbar-container {
    width: 100%;
    margin-bottom: 0;
    margin-top: 20px;
    padding-left: 0;
    margin-left: 0;
  }

  & > div[data-testid="vf_pagination"]{
    flex: unset;
    width:100%;
    margin-top: -20px;
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
    background: url(/assets/img/mto/fullKitAssignment/${(props) =>
    props.arrowName}.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

export const StepperWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 12px;
  padding: 2rem 1rem;
  margin: 1.5rem 0;
  gap: 5rem;
  border: 1px dashed #707070;
  border-radius: 10px;
  // position: relative;
`;
export const StepGroup = styled.div`
  // flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  background: #eae8e8;
  border-radius: 4px;
  position: relative;

  &:not(:first-of-type):before {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    border: 1px solid #82104c;
    right: 100%;
    background: #82104c;
    border-radius: 50%;
  }
  &#inactive:before {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    border: 1px solid #82104c;
    right: calc(100% + 5px);
    background: transparent;
    border-radius: 50%;
  }
  &:not(:last-of-type):after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    border: 1px solid #82104c;
    left: 100%;
    border-radius: 50%;
  }
  &#inactive:after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    border: 1px solid #82104c;
    left: calc(100% + 5px);
    border-radius: 50%;
  }
`;

StepGroup.defaultProps = {
  className: "step-group",
};

export const StepLabel = styled.div`
  margin: 0 1rem;
  width: max-content;
`;

export const ContentWrapper = styled.div`
  margin: 2rem;
  width: 70vw;
`;
export const Text = styled.div`
  font-size: 14px;
  font-weight: 300;
`;
