import styled from 'styled-components'
import * as globalStyles from "../../../../styles/global";

export const SCButtonOutline = styled.button<{themeUi: string, isDisabled:boolean | undefined, customWidth:number | undefined}>`
  color: ${props => props.isDisabled ? '#9A9A9A' : globalStyles.chooseThemeColor[props.themeUi]?.color5};
  background-color: #fefefe;
  // padding: 15px 7px;
  border-radius: 6px;
  font-size:16px;
  font-family:'Roboto';
  letter-spacing:0px;
  font-weight:300;
  width:${(props)=>props.customWidth ? props.customWidth : 130}px;
  height:50px;
  box-shadow: 0px 6px 25px #00000029;
  border: 1px solid ${props => props.isDisabled ? '#9A9A9A' : globalStyles.chooseThemeColor[props.themeUi]?.color5};
  pointer-events:${(props)=>props.isDisabled ? 'none' : 'all'};
`;