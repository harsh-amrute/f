import styled from 'styled-components';

export const Main = styled.div`
    display:flex;
    padding:10px;
    align-items:center;
    justify-content: center;
    width: 100%;
    flex-wrap:wrap;
`

export const MainContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-left:20px;
  padding: 1rem;
`

export const Box = styled.div`
    width: 250px;
    height: 200px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow:0px 6px 12px #74747429;
    //box-shadow: -5px 4px 20px #91919133;
    opacity: 1;
    border-radius: 6px;
    position: relative;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content: space-between;
    margin-right:30px;
    margin-bottom:10px
`

export const PercentBorderContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Percentborder = styled.div` 
    border: 3px solid #F0F0F0;
    border-radius: 50%;
    background-color:#CDCDCD;
    height: 50px;
    width: 50px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
`

export const Percent = styled.h3`
    text-align: center;
`
export const BtnGroup = styled.div`
    height: 80px;
    width:100%;
    display: flex;
    //padding-top: 0;
    //background-color:#EBEBEB
    
`

export const Btns = styled.button`
    width: 100%;
    padding-top:5px;
    padding-right:5px
`

export const TextXAxis = styled.h3`
    font-size:16px;
    text-align:center;
    transform:rotate(-90deg);   
    width:max-content;
    text-wrap:nowrap;
    //text-decoration:underline;
`

export const TextYAxis = styled.h3`
    font-size:16px;
    text-align:center;
    //text-decoration:underline;
    padding-bottom:5px;
    
`

export const ViewOrder = styled.button`
    font-size:10px;
    color:#BC3D81;
    margin-bottom:30px;
    background-color:#fcf0f7;
    width:70%;
    padding:10px;
    text-align:center;
    border-radius:8px;
`

export const TextOnBox = styled.div`
    position:absolute;
    bottom:100%;
    left:0;
    background-color:#E0E0E0;
    width:80px;
    border-radius:8px 8px 0 0;
    fontColor:#000;
    justify-content:'center';
    display:flex;
    align-items: center;
    justify-content: center;
`

export const ImgDiv = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    padding:1px;
    
`

export const ColorOnLeft = styled.div<{ color: string, height: string }>`
    position:absolute;
    right:100%;
    border-radius: 8px 0 0 8px;
    background-color: ${props => props.color ? props.color : null};
    width:20px;
    height:${props => props.height ? props.height : null};

    &:nth-of-type(1){
        top:0px;
        z-index: 0;
    }
    &:nth-of-type(2){
        top:15px;
        z-index:1;

    }
    &:nth-of-type(3){
        top:25px;
        z-index:2;
    }
`

export const Separator = styled.div<{ color: any }>`
    border-right:1px solid ${(props) => props.color};
    height:100%`

export const BTRLayoutTabsWrapper = styled.div`
    display:flex;
    justify-content:center;
    margin-bottom:15px;
`

export const ButtonImg = styled.img`
    justify-content:center;
    align-item:center;
    margin-right:3px;
`
export const Btncount = styled.div`
    justify-content:center;
    align-item:center;
    width:100%;
`
export const diviLine = styled.div`
    width:"400" 
    style:"border: 2px dashed #C0C0C0" 
    color:"#FFFFFF" 
    size:"6"
`

export const TextOnColor = styled.h3`
    font-size: 10px;
    transform: rotate(-90deg);
    text-wrap: nowrap;
    color: white;
`
export const underLine = styled.div`
    width:"400" 
    style:"border: 1px solid #000" 
    color:"#000"    
`
