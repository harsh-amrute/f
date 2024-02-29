import styled from "styled-components";

export const RRRLayout = styled.div`
    margin-top:40px;
    margin-bottom:40px;
`

export const RRRTaskBar  = styled.div`
    position:fixed;
    width:97%;
    right:0;
    top:13vh;
    height:70px;
    background-color:white;
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;
    gap:20px;
    padding:16px;
    z-index:2;
    transition:0.3s ease 0s;
`


export const RRRColorCellRendererWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width: 97px;
    height: 34px;
    box-shadow: 0px 6px 12px #8D8D8D29;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const RRRTagsCellRendererWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width: 55px;
    height: 25px;
    background: #8E8E8E 0% 0% no-repeat padding-box;
    color: #FFFFFF;
    box-shadow: 0px 6px 12px #8D8D8D29;
    border-radius: 2px;
    font-style:normal;
    font-variant:normal;
    font-weight:medium;
    font-size:14px;
    line-height:19px;
    font-family:Roboto;
    letter-spacing: 0px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`


