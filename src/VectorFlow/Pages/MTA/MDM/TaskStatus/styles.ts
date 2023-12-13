import styled from "styled-components";

export const VFTaskStatusWrapper = styled.div`
    display:flex;
    flex-direction:column;
`
export const VFTaskStatusContentWrapper = styled.div`
    display:flex;
    flex-direction:column;
    padding:8px;
    padding-left:20px;
`

export const VFTaskStatusStepperWrapper = styled.div<{gridFraction:string}>`
    height:60px;
    width:100%;
    display:grid;
    grid-template-columns:${(props)=>props.gridFraction};
    align-items:center;
    justify-content:center;
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
    font-size:16px;
    text-align:center;
`