import { ColorsMTO } from "../../../../../VectorFlow/Pages/MTO/Common/Colors"
import styled from "styled-components";
import * as gridSystem from "../../../../../styles/gridSystem";

export const SCTaskBarContainer = styled.div`
    //margin-top:5px;
    margin-bottom:10px;
    padding-left:10px;
    display:flex;
    align-items:center;
    //margin-bottom:20px;
    margin-left:20px;
    justify-content:space-between; //changed

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
    text-wrap:nowrap;
    width:max-content;
`

export const SCGoBackText = styled.div`
    font-weight:500;
    font-size:20px;
    font-family:Roboto;
    letter-spacing: 0px;
    color: ${ColorsMTO.Black};
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
    background: ${ColorsMTO.White} 0% 0% no-repeat padding-box;
    box-shadow: -5px 4px 10px #8584843F;
    border-radius:5px;
    padding:5px;
    justify-content:center;
    align-items:center;
    width:82px;
    height:58px; 
    cursor:pointer;
`
export const SCViewBackground = styled.div`
    display:flex;
    background: ${ColorsMTO.White} 0% 0% no-repeat padding-box;
    box-shadow: -5px 4px 10px #8584843F;
    border-radius:5px;
    padding:10px;
    // height:58px;    
`
export const SCVerticalDivider = styled.div`
    width:0.5px;
    background-color: ${ColorsMTO.White};
    height:40px;
    margin-right:8px;
    margin-left:8px;
    align-items:center;
`
export const SCViewImage = styled.img`
    width:38px;
    height:20px;
    margin-bottom:7px;
    cursor:pointer;
`

export const SCCustomActionsContainer = styled.div`
    display:flex;
    gap:10px;
    align-items:center;
    justify-content: flex-end;
`
export const SCTaskFilterContainer = styled.div`
    display:flex;
    justify-content:space-between;
    gap:30px;
    max-width:40%;
    align-items:center;
`

export const SCButton = styled.button`
  background:${ColorsMTO.White.code};
  border-radius: 6px;
  font-size:16px;
  font-family:'Roboto';
  letter-spacing:0px;
  font-weight:300;
  color: ${ColorsMTO.Pink.code};
  padding: 15px 7px;
  pointer-events:'all';
  width: 130px;
  height: 46px;
  box-shadow: -5px 4px 10px  ${ColorsMTO.LightGrey.code};
  border: 1px solid  ${ColorsMTO.Pink.code};
  opacity: 1;
`;

/**for Search filter */
export const VFSelectedFiltersWrapper = styled.div`
   overflow:auto;
   width:100%
    height: 51px;
    padding:5px;
    display:flex;
    align-items:center;
    background: ${ColorsMTO.White} 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #95959529;
    border-radius: 30px;
    margin-left: auto;
`


export const VFSelectedFiltersPlaceHolder = styled.p`
    height: 39px;
    border-radius: 20px;
    font-weight:400;
    display:flex;
    align-items:center;
    font-size:16px;
    line-height:21px;
    font-family:Roboto;
    letter-spacing: 0px;
    color: #313131;
    padding:5px 15px;
    text-wrap:nowrap;
`

export const VFSelectedFiltersChip = styled.span`
    height: 39px;
    display:flex;
    align-items:center;
    padding:5px;
    padding-left:10px;
    background: #F2F2F2 0% 0% no-repeat padding-box;
    border-radius: 20px;
    margin-left:10px;
`

export const VFSelectedFiltersFilterLabel = styled.div`
font-size:16px;
line-height:21px;
font-family:Roboto;
font-weight:300;
letter-spacing: 0px;
color: #313131;
`

export const VFSelectedFiltersFilterContent = styled.div`
    display:flex;
    flex-direction:row;
    padding:0 10px;
    border-right:solid 2px black;
`

export const VFSelectedFiltersFilterValue = styled.p`
font-size:16px;
line-height:21px;
font-family:Roboto;
letter-spacing: 0px;
display:flex;
text-wrap:nowrap;

`

export const VFSelectedFiltersFilterCloseIcon = styled.img`
    margin-left:5px;
    height:18px;
    width:18px;
    border-radius:50%;
    border:solid 1px black;
    cursor:pointer;
`
export const VFFilterScrollBar = styled.div`
overflow-x:overlay;
display:flex;
::-webkit-scrollbar {
    width: 0.2px;
    display:none;
  }
`

/**release date */
export const VFReleaseDateWrap = styled.div`
    display: flex;
    justifyContent: space-between;
    alignItems:center;
    marginRight: 3px;
    fontSize: 18px;
    fontWeight: bold;
    width: 70%;
`
export const VFReleaseDateCompWrap = styled.div`
    top: 133px;
    left: 638px;
    width: 204px;
    height: 43px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 0.5px solid #ACACAC;
    borderRadius: 4px;
    opacity: 1;
`

export const VFInputDate = styled.input`
    top: 141px;
    left: 651px;
    width: 100%;
    height: 100%;
    textAlign: left;
    font: 24px;
    letterSpacing: 0px;
    color: #000;
    opacity: 1;
    fontSize: 18px;
    padding: 4px;
    fontWeight: bold;
    fontFamily: Roboto;
    border: 0.5px solid #ACACAC;
`
/**release date */