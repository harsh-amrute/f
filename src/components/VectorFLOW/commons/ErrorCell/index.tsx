import { SCContainer, SCErrorToolTipLi, SCErrorToolTipUl, SCToolTipWrapper } from "./styles"
import { ICellRendererParams } from "ag-grid-enterprise"
import { Tooltip } from "react-tooltip";
import React, { CSSProperties, useState } from "react";

const ErrorCell = (props:ICellRendererParams)=>{

    const [errorCellPosition,setErrorCellPosition] = useState<CSSProperties>()
    const [isToolTipOpen,setIsToolTipOpen] = useState<boolean>(false)

    const message = props.data.error;
    const rowId:any = props.node.rowIndex 
    const getFomattedMessage = (msg:string) => {
        if(msg.length > 30) {
            return msg.slice(0,30)+'...'
        }
        return msg;
    }

    const onMouseIn = (e:React.MouseEvent<HTMLElement>)=>{
        const {top,left} = e.currentTarget.getBoundingClientRect()
        setErrorCellPosition({
            top: top * 0.75 * 0.75,
            left: left * 0.75 * 0.75 ,
        })
        setIsToolTipOpen(true)
    }

    const onMouseOut = ()=>{
        setIsToolTipOpen(false)
    }

    return(
        <>
        {message &&
            <SCContainer style={{overflow:'visible'}}>
                <img src="/assets/img/VectorFLOW/NMS/error.svg" width={17} height={17} style={{marginRight:'7px',marginLeft:'5px'}}/>
                <p data-tooltip-id={rowId} onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}>{getFomattedMessage(message)}</p>
                {/* <Tooltip id={rowId} style={{width:'270px',backgroundColor:'rgba(255,255,255,1)',color:'#820F4C',borderRadius:'8px',border:'1px solid #BC3D81'}}>
                    <SCErrorToolTipUl>
                        {message.split(/(?<=\.)\s+/).map((sentence:string,index:number)=>{
                            return <SCErrorToolTipLi key={index}>{sentence}</SCErrorToolTipLi>
                        })}
                    </SCErrorToolTipUl>
                </Tooltip> */}
                {isToolTipOpen && (
                    <SCToolTipWrapper style={{...errorCellPosition}}>
                        <SCErrorToolTipUl>
                            {message.split(/(?<=\.)\s+/).map((sentence:string,index:number)=>{
                                return <SCErrorToolTipLi key={index}>{sentence}</SCErrorToolTipLi>
                            })}
                        </SCErrorToolTipUl>
                    </SCToolTipWrapper>
                )}
            </SCContainer>
        }
        </>
        
    )
}

export default ErrorCell;