import { SCButtonOutline } from "./styles"
import React from 'react';

interface VFButtonOutlineProps{
    onClick:() => void,
    themeUi:string,
    disabled?:boolean,
    width?:number,
    children:React.ReactNode
}

const VFButton = (props:VFButtonOutlineProps)=>{
    
    const {
        onClick,
        themeUi,
        disabled,
        width,
        children,
    } = props

    
    return(
        <SCButtonOutline onClick={onClick} themeUi={themeUi} isDisabled={disabled} customWidth={width}>
            {children}
        </SCButtonOutline>
    )
}

export default VFButton;