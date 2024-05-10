
import React, { CSSProperties, useState } from 'react'
import {ColorGroupCellRendererWrapper, ColorGroupColorCell, ColorGroupColorCellToolTip, CurrentLocationCellRendererWrapper} from './styles'

const colorMapper =(color:string)=> {

    switch (color){
        case "White":
            return {
                "bg":"#CCCCCC",
                "text":"black",
                "label":"White"
            }
        case "Yellow":
            return {
                "bg":"#EBBF2C",
                "text":"black",
                "label":"Yellow"
            }
        case "Green":
            return {
                "bg":"#418D18",
                "text":"white",
                "label":"Green"
            }
        case "Red":
            return {
                "bg":"#E53F3F",
                "text":"white",
                "label":"Red"
            }
        case "Black":
            return{
                "bg":"#000000",
                "text":"white",
                "label":"Black"
            }
        default:
            return{
                "bg":"#CCCCCC",
                "text":"black",
                "label":"White"
            }
    }
}

export const CurrentLocationCellRenderer = (params:any)=>{
    const isEven = (params.rowIndex%2)===1
    return(
        <CurrentLocationCellRendererWrapper style={{backgroundColor:isEven?"#EFEFEF":'white'}}>
            {params.value}
        </CurrentLocationCellRendererWrapper>
    )
}

export const ColorGroupColorCellWrapper = (props:{color:string,value:number,totalCount:number})=>{

    const [isToolTipOpen,toggleToolTip] = useState<boolean>(false)
    const [errorCellPosition,setErrorCellPosition] = useState<any>()

    const currColorObj = colorMapper(props.color)

    const onMouseIn = (e: React.MouseEvent<HTMLElement>) => {
        const { bottom, left,width } = e.currentTarget.getBoundingClientRect();
        console.log(width)
        const tooltipHeight =110/* Height of your tooltip */;
    
        const tooltipTop = (bottom) + 10;
    
        // Check if tooltip overflows on the bottom side
        // if (tooltipTop + tooltipHeight > viewportHeight) {
        //     tooltipTop = (top) - tooltipHeight;
        // }
    
        setErrorCellPosition({
            left: (left-75)+(width/2),
            top: tooltipTop - tooltipHeight
        });
    
        toggleToolTip(true);
    }

    return(
        <React.Fragment>
            <ColorGroupColorCell
               style={{
                width:`${(props.value/props.totalCount) *100}%`,
                backgroundColor:currColorObj.bg
            }}
                onMouseEnter={onMouseIn}
                onMouseLeave={()=>toggleToolTip(false)}
            >
                {isToolTipOpen&& (
                    <ColorGroupColorCellToolTip
                        triangleColor={currColorObj.bg}
                        style={{
                            backgroundColor:currColorObj.bg,
                            color:currColorObj.text,
                            top:errorCellPosition.top,
                            left:errorCellPosition.left
                        }}
                    >
                        {((props.value/props.totalCount) *100).toFixed(0)} % {currColorObj.label}
                    </ColorGroupColorCellToolTip>
                )}
            </ColorGroupColorCell>
        </React.Fragment>
    )
}

export const ColorGroupCellRenderer = (params:any)=>{
    if(!params.value ){
        return null
    }

    if(!params.data.count || params.data.count===0){
        return <>There is no data</>
    }

    return(
        <ColorGroupCellRendererWrapper>
            {Object.keys(params.value).map((key:string)=>{
                return(
                    <ColorGroupColorCellWrapper color={key} value={params.value[key]} key={key} totalCount={params.data.count}/>
                   )
            })}
        </ColorGroupCellRendererWrapper>
    )
}