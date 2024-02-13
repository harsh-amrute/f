import styled from "styled-components";

export const DateContainer=styled.div`
height:160px;
width:100%;
display:flex;
justify-content:center;
align-items: center;
flex-direction:column;
`

export const DateWrapper=styled.div`
text-align:center;
font-style:normal;
font-variant:normal;
font-weight:400;
font-size:18px;
line-height:24px;
font-family:Roboto;
`

export const CategoryWrapper=styled.div`
font-style:normal;
font-variant:normal;
font-weight:300;
font-size:18px;
line-height:24px;
font-family:Roboto;
`
export const CardContainer=styled.div`
height:310px;
width:100%;
display:flex;
align-items:center;
justify-content:space-evenly;
margin-bottom:26px;
`
export const CardWrapper=styled.div`
width:425px;
height:310px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: -5px 4px 20px #91919133;
border-radius: 12px;
opacity: 1;
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
padding-top:44px;
`
export const IconWrapper=styled.div`
height:54px;
`

export const TextWrapper=styled.div`
font-style:normal;
font-variant:normal;
font-weight:400;
font-size:22px;
line-height:29px;
font-family:Roboto;
margin-top:21px;
`
export const CountWrapper=styled.div`
margin-top:15px;
width:259px;
height:32px;
background: rgb(185, 59, 126,0.07);
border:1px solid black;
box-shadow: 0px 6px 12px #6F646429;
border: none;
border-radius: 30px;
display:flex;
align-items:center;
margin-bottom:48px;
`

export const CountText=styled.div`
height:32px;
width:100%;
font-style:normal;
font-variant:normal;
font-weight:400;
font-size:16px;
line-height:21px;
font-family:Roboto;
text-align:center;
color: #B93B7E;
display:flex;
justify-content:center;
align-items: center;
flex-direction:column;
`
export const Separator=styled.div<{color:any}>`
border-right:1px solid ${(props)=> props.color};
height:calc(100% - 15px);

`
export const ButtonWrapper=styled.div`
background: #BC3D81;
border-radius: 0px 0px 12px 12px;
height:69px;
width:425px;
display:flex;
align-items:center;
`

export const ButtonComponent=styled.div`
width:100%;
height:69px;
display:flex;
justify-content:center;
align-items: center;
font-style:normal;
font-variant:normal;
font-weight:400;
font-size:18px;
line-height:24px;
font-family:Roboto;
color:white;
`