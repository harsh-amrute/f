import styled from "styled-components";

export const SCChartContainer = styled.div<{height?:number}>`
    padding:5px;
    border-radius:12px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: -5px 5px 25px #86868633;
    margin-right:5px;
    // margin-top:60px;
    margin-bottom:20px;
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
    background-color:white;
    display:flex;
    justify-content:center;
    align-items:center;
`
export const SCChartHeader = styled.p`
    font-weight:500;
    font-size:16px;
    line-height:21px;
    font-family:Roboto;
    letter-spacing: 0px;
    color: #000000;
`

export const SCHorizontalDivider = styled.hr`
    width:100%;
    border: none;
    border-top:1px solid #B2B2B2;
`

