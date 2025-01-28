import styled from 'styled-components'
import * as globalStyles from "../../../../styles/global";

function getColor(props:any) {
  if(props.isDisabled){
    return '#9A9A9A'
  }
  if(props.color){
    return props.color
  }
  

  if(props.themeUi === "REGALBLAZE")
  {
    return globalStyles.chooseThemeColor[props.themeUi]?.color5;
    
  }

  return "transparent linear-gradient(74deg, #820F4C 0%, #BC3D81 100%) 0% 0% no-repeat padding-box";
  
}

function getBorderAndTextColor(props:any) {
  if(props.isDisabled){
    return '#9A9A9A'
  }
  if(props.color){
    return props.color
  }
  return globalStyles.chooseThemeColor[props.themeUi]?.color5;
}


export const SaveBtnWrapper = styled.div`
    height:40px;
    width:100%;
    display:flex;
    justify-content:flex-end;
    // background-color:#23232f;
    align-items:center;
`


export const SaveBtn =  styled.button<{themeUi: string, isDisabled:boolean | undefined, hoverState:boolean, customWidth:number | undefined, color:string | undefined}>`
    display:flex;
    height:40px;
    width:169px;
    align-items:center;
    justify-content:center;
    color: ${props => getBorderAndTextColor(props)};
    background-color:#fff;
    border: 1px solid ${props => getBorderAndTextColor(props)};
    border-radius:4px;
    font-size:14px;
    font-family: 'Roboto', sans-serif;
    font-weight:400;
    curser:pointer;
    pointer-events:${(props)=>props.isDisabled ? 'none' : 'all'};
`