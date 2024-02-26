import { SCContainer, SCErrorToolTipLi, SCErrorToolTipUl, SCToolTipWrapper } from "./styles"
import { ICellRendererParams } from "ag-grid-enterprise"
import React, { CSSProperties, useState } from "react";
import Portal from "../../layouts/Portal";

const ErrorCell = (props:ICellRendererParams)=>{

    const [errorCellPosition,setErrorCellPosition] = useState<CSSProperties>()
    const [isToolTipOpen,setIsToolTipOpen] = useState<boolean>(false)

    const message = props.data.error;

    const messages = message?.split(/(?<=\.)\s+/) 
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
    
        let tooltipTop = (bottom * 0.75 * 0.75) + 10;
    
        // Check if tooltip overflows on the bottom side
        if (tooltipTop + tooltipHeight > viewportHeight) {
            tooltipTop = (top * 0.75 * 0.75) - tooltipHeight;
        }
    
        setErrorCellPosition({
            left: left * 0.75 * 0.75,
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
                <img src="/assets/img/VectorFLOW/NMS/error.svg" width={17} height={17} style={{marginRight:'7px',marginLeft:'5px',cursor:"pointer"}} onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}/>
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