import styled from "styled-components";

export const Card = styled.div<{imgSrc:string}>`
    display:flex;
    justify-content:center;
    gap:65px;
    align-items:center;
    background: rgba(0, 0, 0, 0.01) url(${props => props.imgSrc}) center center no-repeat padding-box;
    background-size: cover;
    border: 1px solid rgb(178, 167, 167,0.1);
    border-radius: 16px;
    padding:45px 36px;
`

export const IconCardContainer = styled(Card)`
    height:211px;
    
`

export const ButtonCardContainer = styled(Card)`
    
    height:140px;

`

export const CardText = styled.p`
    cursor:pointer;
    width: 191px;
    height: 68px;
    text-align: left;
    display:flex;
    align-items:center;
    font: normal normal 500 24px/40px Roboto;
    letter-spacing: 0.34px;
    color: #6C696A;
    &:hover{
        color:#BC3D81;
        transform:scale(1.1);
    }
    transition:0.3s ease-in-out;
`


export const CardButton = styled.button`
    width: 310px;
    height: 50px;
    border-radius:6px;
    font: normal normal 500 24px/28px Roboto;
    letter-spacing: 0.34px;
    color: #6C696A;
    box-shadow: inset 0px 0px 2px #00000029, 0px 3px 6px #00000029;
    border: 1px solid #9A9A9A;
    opacity: 1;
    background-color:transparent;
    &:hover{
        color:#FFFFFF;
        background: transparent linear-gradient(180deg, #BC3D81 0%, #820F4C 100%) 0% 0% no-repeat padding-box;
    }
    transition: 0.3s ease-in-out;
`

export const CardIconWrapper = styled.div`
    cursor:pointer;
    width: 44px;
    height: 44px;
`