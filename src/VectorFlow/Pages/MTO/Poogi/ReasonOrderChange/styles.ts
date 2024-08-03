import styled from "styled-components";
import { ColorsMTO } from "../../Common/Colors";

export const SaveBtnWrapper = styled.div`
    height:50px;
    width:100%;
    display:flex;
    justify-content:flex-end;
    // background-color:#23232f;
    align-items:center;
    padding:25px
`

export const SaveBtn=styled.div`
    display:flex;
    height:40px;
    width:169px;
    align-items:center;
    justify-content:center;
    color:${ColorsMTO.Pink.code};
    background-color:#fff;
    border:1px solid #B93B7E;
    border-radius:4px;
    font-size:18px;
    font-family: 'Roboto', sans-serif;
    font-weight:400;
`

export const BPRDailyAnalyticsWrapper=styled.div`
    padding:0px;
    display:flex;
    flex-direction:column;
    align-items:center;
`

export const BPRDailyAnalyticsContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:95%;
    background: #383737 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #00000034;
    padding:4px 8px;
    border-radius:4px;
`

export const BPRDailyAnalyticsHeader = styled.div`
    color:white; 
    margin-bottom:6px;
    //border-bottom:1px white solid;
`

export const BPRDailyAnalyticsTableContainer = styled.div`

`

export const BPRDailyAnalyticsTableHeaderContainer = styled.div`
    display:flex;
    flex-direction:row;
    color:white;
    width:100%
`

export const BPRDailyAnalyticsTableHeader = styled.div`
    width:100%;
    text-align: left;
    margin-bottom:5px;  
`
export const BPRDailyAnalyticsTableRowContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
`