import styled,{keyframes} from 'styled-components'

import * as globalStyles from "../../../styles/global";

const slideUp = keyframes`
    0%{
        transform:translateY(-10px);
        opacity:0.3;
    }
    /* 30%{
        transform:translateY(-10px);
    }
    60%{
        transform:translateY(10px);
    }
    90%{
        transform:translateY(-5px);
    } */
    100%{
        transform:translateY(0px);
        opacity:1;
    }
`

export const Content = styled.div`
    width:100%;
    height:100%;
    padding:10px 5px 5px  5px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    animation:${slideUp} 0.3s;
    overflow:auto;
    background-color:white;
`

export const URLsForm = styled.form`
    flex:1;
    width:100%;
    height:100%;
    padding:10px;
    display:flex;
    flex-direction:column;
`

export const InputWrapper = styled.div`
    display:flex;
    flex-direction:column;
     width:100%;
     margin-top:14px;
`

export const Label = styled.label`
    margin-bottom:5px;
    font-size:16px;
`

export const TableWrapper = styled.div`
    zoom:0.9;
    padding:5px;
`

export const DrawerHeader = styled.div<{themeUi:string}>`
    width:100% ;
    height:40px;
    border-radius:1px;
    padding:0px 5px;
    display:flex;
    align-items:center;
    /* background-color: #edeff0; */

    color:${(props)=>props.themeUi === "PUREELEGANCE"?"black":"black"};
    
`
export const ButtonsWrapper = styled.div`
    width:100%;
    display:flex;
    gap:10px;
`

export const DrawerHeaderText = styled.div`
    font-size:25px;
`


export const CheckBoxesWrapper = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:14px;
`

export const CheckBoxesHeader = styled.div`
    font-size:16px;
    margin-bottom:10px;
`

export const CheckBoxesContainer = styled.div`
    
`

export const CheckBoxWrapper = styled.div`
    display:flex;
`