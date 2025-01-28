import { SaveBtn } from "./styles"
import React,{CSSProperties, ReactNode} from 'react';

interface VFButtonOutlineProps{
    onClick:() => void,
    themeUi:string,
    disabled?:boolean,
    width?:number,
    color?:string,
    onHoverChild?:ReactNode
    children:React.ReactNode
    style?:CSSProperties
    //isHoverDisabled?:boolean

}

const VFSaveButton = (props:VFButtonOutlineProps)=>{
    

    const {
        onClick,
        themeUi,
        disabled,
        width,
        children,
        color,
        style,
      
    } = props

    //const [hoverState,setHoverState] = useState(false);
    
    const getChildren = ()=>{
        // if(onHoverChild){
        //     if(hoverState){
        //         return onHoverChild
        //     }
        // }
        return children
    }

    return(
        <SaveBtn color={color} 
        onClick={onClick} 
        themeUi={themeUi} 
        isDisabled={disabled} 
        customWidth={width} 
        hoverState={false} 
        style={style}
        data-testid="vf-save-button">
            {getChildren()}
        </SaveBtn>
    )
}

export default VFSaveButton;

