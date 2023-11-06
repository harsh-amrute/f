import { SCButtonOutline } from "./styles"
import React, { useContext } from 'react';
import * as globalStyles from "../../../../styles/global";

interface VFButtonOutlineProps{
    onClick:() => void,
    themeUi:string,
    disabled?:boolean,
    width?:number,
    color?:string,
    children:React.ReactNode
}

const VFButtonOutline = (props:VFButtonOutlineProps)=>{
    

    const {
        onClick,
        themeUi,
        disabled,
        width,
        children,
        color
    } = props

    
    return(
        <SCButtonOutline color={color} onClick={onClick} themeUi={themeUi} isDisabled={disabled} customWidth={width}>
            {children}
        </SCButtonOutline>
    )
}

export default VFButtonOutline;