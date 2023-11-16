import { SCButtonOutline } from "./styles"
import React,{useState} from 'react';

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

    const [hoverState,setHoverState] = useState(false);

    return(
        <SCButtonOutline color={color} onClick={onClick} themeUi={themeUi} isDisabled={disabled} customWidth={width} hoverState={hoverState} onMouseOver={()=>setHoverState(true)} onMouseOut={()=>setHoverState(false)}>
            {children}
        </SCButtonOutline>
    )
}

export default VFButtonOutline;