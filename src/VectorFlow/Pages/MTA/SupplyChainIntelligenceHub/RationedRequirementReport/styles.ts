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