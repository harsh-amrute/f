import styled from "styled-components";
// import * as globalStyles from "../../../../../../styles/global";
import * as gridSystem from "../../../../../styles/gridSystem";


export const SCDynamicContainer = styled.div`
    display:block;
    height:150vh;
    // padding-top:20px;
    margin:0px 20px 0px 20px;
    @media (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem
        .size.desktop}) {
        height:87vh
    }
  
    @media (min-width: ${gridSystem.size.desktop}) {
      height:100vh
    }
`
export const SCHorizontalAllignmentWrapper = styled.div`
    width:100%;
    // padding:20px;
    height:200vh;
`

export const SCChartContainer = styled.div<{height?:number}>`
    // padding:0px 5px 5px 5px;
    // border-radius:12px;
    // background: #FFFFFF 0% 0% no-repeat padding-box;
    // box-shadow: -5px 5px 25px #86868633;
    // box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    margin-right:5px;
    margin-top:10px;
    margin-bottom:12px;
    margin-left:5px;
    // height:547px;
    height:${props => props.height ? props.height +'px' : 'auto'}
`

export const SCChartLayout = styled.div`
    overflow-y:scroll;
    display:flex;
    height:100%;
    flex-direction:column;
    // margin-top:30px;
`;

export const SCChartHeaderContainer = styled.div`
    height:40px;
    background-color:white;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
`
export const SCChartHeader = styled.p`
    font-weight:500;
    font-size:13px;
    line-height:19px;
    font-family:Roboto;
    letter-spacing: 0px;
    color: #000000;
    text-align:center;
`

export const SCHorizontalDivider = styled.hr`
    width:100%;
    border: none;
    border-top:1px solid #B2B2B2;
`

