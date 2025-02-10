import styled from 'styled-components'
import * as globalStyles from "../../../../styles/global";

export const SCButton = styled.button<{ themeUi: string, isDisabled:boolean | undefined, customWidth:number | undefined}>`
  background:
    ${(props) =>
      props.themeUi === "REGALBLAZE"
        ? globalStyles.chooseThemeColor[props.themeUi]?.color5
        : "transparent linear-gradient(74deg, #820F4C 0%, #BC3D81 100%) 0% 0% no-repeat padding-box"};
  width:${(props)=>props.customWidth ? props.customWidth : 130}px;
  height:50px;
  border-radius: 6px;
  font-size:16px;
  font-family:'Roboto';
  letter-spacing:0px;
  font-weight:300;
  color: ${globalStyles.white};
  // padding: 15px 7px;
  border: none;
  box-shadow: -5px 4px 10px #919191B3;
  opacity:${(props)=>props.isDisabled ? 0.2 : 1};
  pointer-events:${(props)=>props.isDisabled ? 'none' : 'all'};
`;
