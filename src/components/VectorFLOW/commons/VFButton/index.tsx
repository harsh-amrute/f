import { SCButton } from "./styles"
import React,{CSSProperties, ReactNode} from 'react';

interface VFButtonProps{
    onClick:() => void,
    themeUi:string,
    disabled?:boolean,
    width?:number,
    children:React.ReactNode
    style?:CSSProperties
    onHoverChild?:ReactNode



}

const VFButton = (props:VFButtonProps)=>{
    
    const {
        onClick,
        themeUi,
        disabled,
        width,
        style,
        children,
        onHoverChild,

    } = props

    const hoverState =false;
    
    const getChildren = ()=>{
        if(onHoverChild){
            if(hoverState){
                return onHoverChild
            }
        }
        return children
    }
    
    return(
        <SCButton onClick={onClick} themeUi={themeUi} isDisabled={disabled} customWidth={width} style={style} data-testid="vf-button">
            {getChildren()}
        </SCButton>
    )
}

export default VFButton;