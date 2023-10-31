import styled from 'styled-components'

export const SCContainer = styled.div`
    margin-left:50px;
`

export const SCFilterContainer = styled.div`
    margin:10px;
    display:flex;
    flex-direction:row;
`

export const SCFilterControls = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    gap:10px;
    width:100%;
    border: 0.5px solid rgba(112,112,112,0.46);
    padding-top:19px;
    padding-bottom: 14px;
    padding-left:9px;
    padding-right:9px;
    border-radius: 6px;
`

export const SCFilterAddControls = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
    padding-top:19px;
    padding-bottom: 14px;
    padding-left:9px;
    padding-right:9px;

`

export const SCFilterAddButtonWrapper = styled.div`
    height:56px;
    width:56px;
    display:flex;
    justify-content:center;
    align-items:center;
`

export const SCFilterAddButton = styled.img`
    width: 30px;
    height: 30px;
    padding:5px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius:50%;
    cursor:pointer;
`

export const SCLegend = styled.legend`
    position:absolute;
    left:16px;
    top:-10px;
    background-color:white;
    font-family:Roboto;
    font-size:14px;
    line-height:20px;
    font-weight:300;
    padding:0 5px;
    color:#313131;
`

export const SCFilterSeperator = styled.div`
    width: 0px;
    outline: 1px solid #D0D0D0;
`

export const SCFilterButtonGroup = styled.div`
    display:flex;
    flex-direction:row;
    gap:12px;
    height:56px;
    padding-top:19px;
    padding-bottom: 14px;
    padding-left:9px;
    padding-right:9px;

`

export const TaskBarContainer = styled.div`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    display:flex;
    position:fixed;
    bottom:0;
    padding-top:23px;
    padding-bottom:22px;
    padding-right:38x;
    padding-left:38px;
    gap:30px;
    width:100%;

`