import { SCContainer, SCErrorToolTipLi, SCErrorToolTipUl, SCToolTipWrapper } from "./styles"
import { ICellRendererParams } from "ag-grid-enterprise"
import React, { CSSProperties, useState } from "react";
import Portal from "../../layouts/Portal";
import useViewPort from "../../../../hooks/useViewPort";

const ErrorCell = (props:ICellRendererParams)=>{

    const {getGridZoom,getScreenZoomValue} = useViewPort()

    const currScreenZoom = getScreenZoomValue()
    const currGridZoom = getGridZoom()


    const [errorCellPosition,setErrorCellPosition] = useState<CSSProperties>()
    const [isToolTipOpen,setIsToolTipOpen] = useState<boolean>(false)

    const message = props.data.error;

    const messages = message?.split('.').filter((msg:string)=>msg.length > 1)
    
    const getFomattedMessage = (msg:string) => {
        if(msg.length > 30) {
            return msg.slice(0,30)+'...'
        }
        return msg;
    }

    const onMouseIn = (e: React.MouseEvent<HTMLElement>) => {
        const { bottom, left, top } = e.currentTarget.getBoundingClientRect();
    
        const tooltipHeight =messages.length * 33 /* Height of your tooltip */;
        const viewportHeight = window.innerHeight;
    
        let tooltipTop = (bottom * currGridZoom * currScreenZoom) + 10;
    
        // Check if tooltip overflows on the bottom side
        if (tooltipTop + tooltipHeight > viewportHeight) {
            tooltipTop = (top * currGridZoom * currScreenZoom) - tooltipHeight;
        }
    
        setErrorCellPosition({
            left: left *currGridZoom * currScreenZoom,
            top: tooltipTop
        });
    
        setIsToolTipOpen(true);
    }

    const onMouseOut = ()=>{
        setIsToolTipOpen(false)
    }

    return(
        <>
        {message &&
            <SCContainer style={{overflow:'visible'}} >
                <img src="/assets/img/VectorFLOW/NMS/error.svg" width={17} height={17} style={{marginRight:'7px',marginLeft:'5px',cursor:"pointer"}} onMouseEnter={onMouseIn} onMouseLeave={onMouseOut} data-testid="errorImage"/>
                <p  >{getFomattedMessage(message)}</p>
                {isToolTipOpen && (
                    <Portal wrapperId="error-tooltip">
                        <SCToolTipWrapper style={{...errorCellPosition}} onMouseEnter={()=>setIsToolTipOpen(true)} onMouseLeave={onMouseOut}>
                            <SCErrorToolTipUl>
                                {(messages && messages.length>0) &&  messages.map((sentence:string,index:number)=>{
                                    return <SCErrorToolTipLi key={index}>{sentence}</SCErrorToolTipLi>
                                })}
                            </SCErrorToolTipUl>
                        </SCToolTipWrapper>
                    </Portal>
                )}
            </SCContainer>
        }
        </>
        
    )
}

export default ErrorCell;