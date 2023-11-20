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


export const UploadModalWrapper=styled.div`
display:flex;
justify-content:center;
padding:26px 0 40px 0; 

`

export const UploadModalSection=styled.div`
display: flex;
 flex-direction:column;
 flex:1;
 margin-right:32px;
 
`

export const UploadBorderContainer=styled.div`
border: 1.5px dashed #707070;
 width: 300px; 
 height: 212px;
 justify-content:center;
 align-items:center;
 display:flex;
`
export const UploadModalContent = styled.div`
display:flex;
align-items:center;
flex-direction:column;
background: #FFFFFF 0% 0% no-repeat padding-box;
height: 148px;
width:270px;
box-shadow: 5px 5px 30px #6E6B6B29;
border-radius: 6px;
`

export const TextContent=styled.div`
display:flex;
align-items:center;
justify-content:center;
flex:4;
flex-direction:column;
font-style: normal;
font-variant: normal;
font-weight: 600;
font-size: 12px;
line-height: 14px; 
font-family:Roboto;
`

export const InputWrapper = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
   
`

export const UploadModalInput=styled.input`

width:100%;
border:none;
outline:none;
color: #939393;
opacity: 1;
font-style: normal;
font-variant: normal;
font-weight: 300;
font-size: 12px;
line-height: 14px; 
font-family:Roboto;
height:50%
&:focus{
    border:none;
    outline:none;
}
&:active{
    border:none;
    outline:none;
}
border-bottom-left-radius: 6px;
border-bottom-right-radius: 6px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: -2px -2px 15px #A2A0A017;
`

export const UploadModalText=styled.div`
font-style: normal;
font-variant: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
font-family: Roboto
`

export const UploadFileText=styled(UploadModalText)`
width:100%;
padding-left:16px;
padding-bottom:5px;
text-align:left;
font-weight:600;
font-size:7px;
line-height:8px;
`