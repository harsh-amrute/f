import styled from "styled-components";

export const VFTaskStatusWrapper = styled.div`
    display:flex;
    flex-direction:column;
    background-color:white;
    height:225px;
`
export const VFTaskStatusContentWrapper = styled.div`
    display:flex;
    flex-direction:column;
    padding:8px;
    padding-left:20px;
`

export const VFTaskStatusStepperWrapper = styled.div<{gridFraction:string}>`
    margin-top:20px;
    height:60px;
    width:100%;
    display:grid;
    grid-template-columns:${(props)=>props.gridFraction};
    place-items:center;
    grid-gap:60px;

`

export const VFTastStatusDownloadWrapper = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
`

export const VFTaskStatusStepperLabel = styled.p`
    font-size:18px;
    text-align:center;
    width:100px;
    height:40px;
    display:flex;
    justify-content:center;
    align-items: center;
    text-overflow:ellipsis;
    border:1px solid #EBEBEB;
`


export const VFTaskStatusNoData = styled.div`
    width:100%;
    height:90px;
    padding:10px;
    padding-left:60px;
    display:flex;
    align-items:center;
`