import styled from 'styled-components'

export const SCToolTipWrapper = styled.div<{themeUi:string}>`
    position:fixed;
    padding:1px 5px;
    border: 1px solid ${(props)=>props.themeUi=="REGALBLAZE"?"#FCA311":"#BC3D81"};
    background-color:rgba(255,255,255,1);
    color:${(props)=>props.themeUi=="REGALBLAZE"?"rgb(164 104 6)":"#820F4C"};
    border-radius:4px;
    width:170px;
    z-index:100000;
`

export const SCContainer = styled.div<{themeUi:string}>`
    height:25px;
    border-radius: 5px;
    background: #bc3d811a 0% 0% no-repeat padding-box;
    border: 1px solid ${(props)=>props.themeUi=="REGALBLAZE"?"#FCA311":"#BC3D81"};
    color: ${(props)=>props.themeUi=="REGALBLAZE"?"rgb(164 104 6)":"#820F4C"};
    font-size:10px;
    /* line-height:18px; */
    font-family:'Roboto'
    font-style:normal;
    font-weight:500;
    /* margin-top:2px; */
    margin-bottom:auto;
    display:flex;
    align-items:center;
    white-space:nowrap;
    overflow:visible;
`

export const ErrorText = styled.span`
  display: inline-block; /* Ensures proper rendering for inline elements */
  max-width: 200px; /* Adjust this to set the width constraint */
  white-space: nowrap; /* Prevents text from wrapping to the next line */
  overflow: hidden; /* Hides the overflowed content */
  text-overflow: ellipsis; /* Adds the ellipsis ('...') to indicate overflow */
`;


export const SCErrorToolTipUl = styled.ul`
    font-size:9px;
    width:100%;
    padding-inline:0px;
    margin-block-start:0;
    margin-block-end:0;
    margin-inline:0;
    padding:0px 0px 10px 15px;
`

export const SCErrorToolTipLi = styled.li`
    margin-top:5px;
    list-style-type:circle;
    &::before{
        color:#B80000;
    }
`

