import { ErrorText, SCContainer, SCErrorToolTipLi, SCErrorToolTipUl, SCToolTipWrapper } from "./styles"
import { ICellRendererParams } from "ag-grid-enterprise"
import React, { CSSProperties, useState } from "react";
import Portal from "../../layouts/Portal";
import useViewPort from "../../../../hooks/useViewPort";
import { useUserData } from "../../../../context";

const ErrorCell = (props:ICellRendererParams)=>{

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    const {getGridZoom,getScreenZoomValue} = useViewPort()

    const currScreenZoom = getScreenZoomValue()
    const currGridZoom = getGridZoom()


    const [errorCellPosition,setErrorCellPosition] = useState<CSSProperties>()
    const [isToolTipOpen,setIsToolTipOpen] = useState<boolean>(false)

    const message = props.data.error;

    if(!message)return null


    function customSplitter(str:string,exec:(s:number)=>boolean){
        const result:Array<string> = []
        let currStr = ""
        for (let index = 0; index < str.length; index++) {
            if(exec(index)){
                result.push(currStr)
                currStr = ""
            }
            else{
                currStr += str[index]
            }
        }
        if (currStr.length > 0)result.push(currStr);
            
        return result
    }

    // const messages = message?.split('.').filter((msg:string)=>msg.length > 1)

    const messages = customSplitter(message, (s) => {
        try {
            const prevChar = message[s - 1];
            const nextChar = message[s + 1];
    
    
            return (
                message[s] === "." &&
                (isNaN(parseInt(prevChar)) ||
                isNaN(parseInt(nextChar)))
            );
        } catch (err) {
            console.error(err);
            return false;
        }
    });


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
    
        let tooltipTop = (bottom) + 10;
    
        // Check if tooltip overflows on the bottom side
        if (tooltipTop + tooltipHeight > viewportHeight) {
            tooltipTop = (top) - tooltipHeight;
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
            <SCContainer style={{overflow:'visible'}}  themeUi={themeUi}>
                <img src={"/assets/img/VectorFLOW/NMS/error.svg"} width={17} height={17} style={{marginRight:'7px',marginLeft:'5px'}} onMouseEnter={onMouseIn} onMouseLeave={onMouseOut} data-testid="errorImage"/>
                <ErrorText  >{getFomattedMessage(message)}</ErrorText>
                {isToolTipOpen && (
                    <Portal wrapperId="error-tooltip">
                        <SCToolTipWrapper themeUi={themeUi} data-testid='tooltip-wrapper' style={{...errorCellPosition}} onMouseEnter={()=>setIsToolTipOpen(true)} onMouseLeave={onMouseOut}>
                            <SCErrorToolTipUl>
                                {(messages && messages.length>0) &&  messages.map((sentence:string,index:number)=>{
                                    return <SCErrorToolTipLi key={index}>{sentence}</SCErrorToolTipLi>
                                })}
                            </SCErrorToolTipUl>
                        </SCToolTipWrapper>
                    </Portal>
                )}
            </SCContainer>
        </>
        
    )
}

export default ErrorCell;