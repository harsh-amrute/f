import styled from "styled-components";
import * as gridSystem from "../../../../../styles/gridSystem";
import * as globalStyles from "../../../../../styles/global";

//export const BMDepWrapper = styled.div`
// @media only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL}) 
//   {
//     margin-left: -40px;
//     margin-top: -40px;
//     padding: 20px;
//     background-color:red;
//   }
export const BMDepWrapper = styled.div`
@media only screen and (min-width: ${gridSystem.size.mobileS}) and (max-width: ${gridSystem.size.mobileL}) {
   margin-left: -40px;
   margin-top: -40px;
   padding: 20px;
}
`

export const BMDepHeaderWraper = styled.div`
//  zoom:1.3;
 
`
export const BMDepSubHeaderWraper = styled.div`
    justify-content:space-between
`

export const NoDataAvailableContainer = styled.div`
      border: 2px dashed #ccc;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      margin-top:20px;
`

export const NoDataToShowDiv = styled.div`
      text-align: center;
      color: #666;
`

export const NoDataText = styled.p`
   color:#000000;
   font-family:Roboto;
   font-size:20px;
   font-weight:500;
`

export const SelectText = styled.p`
  color:#000000;
  font-family:Roboto-light;
  font-size:20px;
  font-weight:200;
`

export const BPRViewTableWrapper = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    margin-top:10px;
    height:100%;
    margin-top:20px
`

export const BPRViewTablePrefixWrapper = styled.div`
    width:100%;
    display:flex;
    zoom:0.8;
`

export const BPRViewTableHeaderTab = styled.div<{
  status: string
  zIndex: number
  marLeft: true | false
  themeUi: string
  bgColor?: string
}>`
color: ${(props) => (props.status === 'active' ? '#FFFFFF' : '')};
opacity: 1;
min-height: 60px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
font-size: 1.6rem;
position: relative;
z-index: ${(props) => props.zIndex};
margin-left: ${(props) => (props.marLeft ? '-1.5em' : '0')};
padding-left: ${(props) => (props.marLeft ? '1.5em' : '0')};
padding:0px 20px;

cursor: pointer;

// pointer-events:${(props) => props.status === 'completed' ? 'none' : 'all'};

::before {
  border: 0.5px solid #cccccc;
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  border-bottom: none;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  ${(props) => props.bgColor ? `background-color:${props.bgColor};` : `background: ${props.status === "active" ? props.themeUi === "REGALBLAZE"
    ? globalStyles.chooseThemeColor[props.themeUi]?.color5
    : "transparent linear-gradient(74deg, #820F4C 0%, #BC3D81 100%) 0% 0% no-repeat padding-box" : 'white'};`}
  box-shadow: 0px 5px 25px #9d9d9d29;
  transform: scale(1.2, 1.3) perspective(0.5em) rotateX(2.5deg);
  transform-origin: bottom left;
}
`


export const ExpansionWrapper = styled.div`
    border:solid 1px #E3ACC9;
    border-radius:4px;
    width:100%;
  `

export const ExpansionHeader = styled.div`
    margin:0px 10px;
    display:flex;
    align-items:center;
  `

export const ExpansionHeaderGroup = styled.div`
  
  `

export const IconWrapper = styled.img`
    height:20px;
    width:20px;
  `

export const ExpansionHeaderNormalText = styled.span`
  font-family:Roboto;
  font-size:12px;
  font-weight:400;
  line-height:40px;
`

export const ExpansionHeaderColoredText = styled.span`
  font-family:Roboto;
  font-size:12px;
  font-weight:500;
  line-height:40px;
  color:#BC3D81;
`

export const ExpansionContent = styled.div`
  
  `

export const HigHAgeingIconWrapper = styled.img`
    height:20px;
    width:20px;
    margin-right:10px;
    
  `

export const FlatIcon1 = styled.div`
    display:flex;
    align-items:'center';
    height:20px;
    width:20px;
    margin-right:10px;
    background: url('/assets/img/mto/DeptWiseBmReport/exclamatory.svg');

    &:hover{
        background: url('/assets/img/mto/DeptWiseBmReport/exclamatoryWhite.svg');
        transform:scale(1.2);
    }
`
export const FlatIcon = styled.img`
  height:20px;
  width:20px;
  margin-right:10px;
`

export const ETACellRendererWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
    width:100%;
`

export const VFWrapper = styled.div`
  height: 100%;
  display: flex;
  & .ag-theme-alpine {
    flex: 1;
  }
  & .ag-theme-alpine .ag-header-row:nth-child(2){
    background-color: black;
    color: white;
  }
  & .ag-theme-alpine .ag-header-row:nth-child(1):hover{
    background-color: black;
    color: white;
  }
  & .ag-theme-noir-fusion {
    --ag-header-background-color: rgb(255, 255, 255);
  }
`