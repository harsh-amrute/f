import { SCButton } from "./styles"
import React,{CSSProperties} from 'react';

interface VFButtonProps{
    onClick:() => void,
    themeUi:string,
    disabled?:boolean,
    width?:number,
    children:React.ReactNode
    style?:CSSProperties

}

const VFButton = (props:VFButtonProps)=>{
    
    const {
        onClick,
        themeUi,
        disabled,
        width,
        style,
        children,
    } = props

    
    return(
        <SCButton onClick={onClick} themeUi={themeUi} isDisabled={disabled} customWidth={width} style={style} data-testid="vf-button">
            {children}
        </SCButton>
    )
}

export default VFButton;