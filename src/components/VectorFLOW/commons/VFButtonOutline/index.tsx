import { SCButtonOutline } from "./styles"
import React,{CSSProperties, ReactNode, useState} from 'react';

interface VFButtonOutlineProps{
    onClick:() => void,
    themeUi:string,
    disabled?:boolean,
    width?:number,
    color?:string,
    onHoverChild?:ReactNode
    children:React.ReactNode
    style?:CSSProperties
}

const VFButtonOutline = (props:VFButtonOutlineProps)=>{
    

    const {
        onClick,
        themeUi,
        disabled,
        width,
        children,
        color,
        onHoverChild,
        style
    } = props

    const [hoverState,setHoverState] = useState(false);

    const getChildren = ()=>{
        if(onHoverChild){
            if(hoverState){
                return onHoverChild
            }
        }
        return children
    }

    return(
        <SCButtonOutline color={color} onClick={onClick} themeUi={themeUi} isDisabled={disabled} customWidth={width} hoverState={hoverState} onMouseOver={()=>setHoverState(true)} onMouseOut={()=>setHoverState(false)} style={{...style}}>
            {getChildren()}
        </SCButtonOutline>
    )
}

export default VFButtonOutline;