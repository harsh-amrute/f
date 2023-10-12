import styled from "styled-components";

const getProgressColor = (status:string)=>{
    if(status=='completed'){
        return '#5D804E'
    }
    return '#9A9A9A'
}



export const StepperWrapper = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
`

export const StepWrapper = styled.div<{isLast:boolean}>`
    display:flex;
    flex-direction:row;
    width: ${(props)=>props.isLast?'auto':'100%'};
`

export const StepLabelWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`


export const StepLabel = styled.div`
    text-align:center;
    margin-top:6px;
    font-size:16px:
    font-style:normal;
    font-variant:normal;
    font-weight:400;
    font-family:Roboto;
    letter-spacing: 0px;
    color: #313131;
`
export const StepDescription = styled.div`
    font-size:12px:
    font-style:normal;
    font-variant:normal;
    font-weight:300;
    font-family:Roboto;
    letter-spacing: 0px;
    color: #1C1E2B;
`

export const StepProgress = styled.div<{status:string}>`
    margin-top:12px;
    margin-left:10px;
    margin-right:10px;
    width: 100%;
    height: 0px;
    outline: 2px ${(props)=>props.status=='async'?'dashed':'solid'} ${(props)=>getProgressColor(props.status)};
`