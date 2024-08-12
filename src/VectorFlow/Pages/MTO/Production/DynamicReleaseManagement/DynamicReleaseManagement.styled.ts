import styled from "styled-components";
import * as globalStyles from "../../../../../styles/global";
import * as gridSystem from '../../../../../styles/gridSystem'
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  align-items: center;
  display: flex;
  flex-direction: column;
  & .sc-gazJty{
    padding: 0 !important;
    margin-top: -22px !important;
    font-size: 10px !important;
  }
  & .ag-header-container {
    font-size: 16px;
  }
  & .ag-header-cell-text {
    text-align: center;
  }
  & > .ag-theme-alpine {
    margin: 0 20px 0;
    width: 100%;
    flex: 1;
  }
  & > button {
    width: max-content;
  }
  & > *:not(button, .toolbar-container) {
    transition: flex 0.2s ease-in-out !important;
  }
  & .toolbar-container {
    width: 100%;
    margin-bottom: 0;
    margin-top: 20px;
  }

  & .ag-header-cell-text {
    font-size: 12px;
  }
  & > .ag-theme-alpine{
      margin: 0 !important;
    --ag-grid-size: 3px !important;
    --ag-list-item-height: 20px !important;
    --ag-font-size: 10px !important;
      flex: 1;
      height: 100%;
      --ag-row-hover-color: rgb(188, 61, 129,0.3) !important;

      & .ag-cell {
        height: 100% !important;
      }

      & .ag-paging-panel {
        height: 24px !important;
      }

      & .ag-side-buttons {
        font-size: 10px;
      }

      & .ag-header {
        border-radius: 0;
      }

      & .ag-pivot-off{
        height: 47px !important;
        min-height: 47px !important;

      }
     
      & .ag-header-cell {
        min-height: 24px !important;
        height: 24px !important;
      }
      & .ag-header-row {
        min-height: 20px !important;
        height: 20px !important;
      }
      & .ag-header-container {
        min-height: 20px !important;
        height: 20px !important;
      }
      
      
       & .ag-header-row-column-filter{
        top: 23px !important;
        height: 24px !important;
       }

      
       & .ag-input-field-input {
        height: 14px !important;
        min-height: 10px !important;
        font-size: 12px;
       }
      & .ag-column-drop{
        background: #D2CECE;
      }

      & .ag-status-bar{
        height: 24px !important;
        font-size: 10px;
      }
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
  margin: 2rem 0 0 0;
`;
export const RouteContentWrapper = styled.div`
  margin: 2rem;
  width: 900px;
  height: 65vh;
  overflow: auto;
`;
export const Text = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

export const SCButton = styled.button<{ themeUi: string }>`
  font: normal normal 300 16px/24px Roboto;
  padding: 10px 20px;
  border-radius: 6px;
  box-shadow: 0px 6px 25px #00000029;
  color: ${globalStyles.white};
  background: ${props => globalStyles?.chooseThemeColor[props.themeUi].colorButton};
`;

export const SCDynamicContainer = styled.div<{ isHide?: boolean }>`
    display:block;
    height: 100%;
    display: flex;


  & .ag-header-cell-text {
    font-size: 12px;
  }
  & > .ag-theme-alpine{
      margin: 0 !important;
    --ag-grid-size: 3px !important;
    --ag-list-item-height: 20px !important;
    --ag-font-size: 10px !important;
      flex: 1;
      height: 100%;
      --ag-row-hover-color: rgb(188, 61, 129,0.3) !important;

      & .ag-cell {
        height: 100% !important;
      }

      & .ag-paging-panel {
        height: 24px !important;
      }

      & .ag-side-buttons {
        font-size: 10px;
      }

      & .ag-header {
        border-radius: 0;
      }

      & .ag-pivot-off{
        height: 47px !important;
        min-height: 47px !important;

      }
     
      & .ag-header-cell {
        min-height: 24px !important;
        height: 24px !important;
      }
      & .ag-header-row {
        min-height: 20px !important;
        height: 20px !important;
      }
      & .ag-header-container {
        min-height: 20px !important;
        height: 20px !important;
      }
      
      
       & .ag-header-row-column-filter{
        top: 23px !important;
        height: 24px !important;
       }

      
       & .ag-input-field-input {
        height: 14px !important;
        min-height: 10px !important;
        font-size: 12px;
       }
      & .ag-column-drop{
        background: #D2CECE;
      }

      & .ag-status-bar{
        height: 24px !important;
        font-size: 10px;
      }
  }

  
   

    
`
