import styled from "styled-components";
import * as gridSystem from "../../../../../../styles/gridSystem";

export const SCTaskBarContainer = styled.div`
    //  margin-top:5px;
    padding-left:10px;
    display:flex;
    align-items:center;
    margin-bottom:20px;
    justify-content:space-between;

    @media (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem
        .size.desktop}) {
        zoom:0.7;
    }
  
    @media (min-width: ${gridSystem.size.desktop}) {
      zoom:1;
    }
`
export const SCGoBackContainer = styled.div`
    display:flex;
    align-items:center;
    gap:10px;
    cursor:pointer;

`

export const SCGoBackText = styled.div`
    font-weight:500;
    font-size:20px;
    font-family:Roboto;
    letter-spacing: 0px;
    color: #000000;
`

export const SCViewContainer = styled.div`
    display:flex;
    flex-direction:column;
    
    align-items:center;
    cursor:pointer;
    overflow:hidden;
`

export const SCViewContainerWithBg = styled.div`
    display:flex;
    flex-direction:column;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: -5px 4px 10px #8584843F;
    border-radius:5px;
    padding:5px;
    justify-content:center;
    align-items:center;
    width:82px;
    height:58px;

`
export const SCViewBackground = styled.div`
    display:flex;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: -5px 4px 10px #8584843F;
    border-radius:5px;
    padding:10px;
    // height:58px;
    
`
export const SCVerticalDivider = styled.div`
    width:0.5px;
    background-color:#C6C6C6; //#6C696A
    height:30px;
    margin-right:16px;
    margin-left:16px;
    align-items:center;
`
export const SCViewImage = styled.img`
    width:38px;
    height:20px;
    margin-bottom:7px;
`

export const SCCustomActionsContainer = styled.div`
    display:flex;
    gap:22px;
    align-items:center;

`
