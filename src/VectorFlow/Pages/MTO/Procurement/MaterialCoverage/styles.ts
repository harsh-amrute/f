import styled from 'styled-components';

export const Main = styled.div`
    display:flex;
    padding:10px;
    align-items:center;
    justify-content: center;
    width: 100%;
`

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  //background-color:#9e9e92;
  margin-left:20px;
  padding: 1rem;
`

export const Box = styled.div`
    width: 250px;
    height: 200px;
    border: 1px solid #9e9e9e;
    border-radius: 8px;
    box-shadow: 2px 2px 1px #9e9e9a;
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
    border: 1px solid;
    border-radius: 50%;
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
    width: 100 %;
   /*border: 1px solid;*/
    display: flex;
    padding-top: 0;
`

export const Btns = styled.button`
    width: 100 %;
    border: 1px solid #9e9e9e;
    //margin-top:10px;
    padding-top:10px;
`

export const TextXAxis = styled.h3`
    font-size:16px;
    text-align:center;

`

export const ViewOrder = styled.h2`
    font-size:10px
`

export const TextOnBox = styled.div`
    position:absolute;
    bottom:100%;
    left:0;
    background-color:#9e9e9e;
    width:60px;
    border-radius:8px 8px 0 0;
    fontColor:#000,
    justify-content:'center'
`

export const ColorOnLeft = styled.div<{ color: string }>`
    position:absolute;
    right:100%;
    border-radius: 8px 0 0 8px;
    background-color: ${props => props.color ? props.color : 'black'};
    width:20px;
    height:20px;

    &:nth-of-type(1){
        top: 10px;
        z-index: 0;
    }
    &:nth-of-type(2){
        top: 15px;
        z-index: 1;

    }
    &:nth-of-type(3){
        top: 25px;
        z-index: 1;

    }
`