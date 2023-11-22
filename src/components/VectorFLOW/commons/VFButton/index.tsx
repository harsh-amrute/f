import { SCButton } from "./styles"
import React from 'react';

interface VFButtonProps{
    onClick:() => void,
    themeUi:string,
    disabled?:boolean,
    width?:number,
    children:React.ReactNode
}

const VFButton = (props:VFButtonProps)=>{
    
    const {
        onClick,
        themeUi,
        disabled,
        width,
        children,
    } = props

    
    return(
        <SCButton onClick={onClick} themeUi={themeUi} isDisabled={disabled} customWidth={width} data-testid="vf-button">
            {children}
        </SCButton>
    )
}

export default VFButton;