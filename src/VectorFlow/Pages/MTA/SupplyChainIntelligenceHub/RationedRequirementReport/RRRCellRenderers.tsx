import { ICellRendererParams } from "ag-grid-enterprise"
import { CustomTooltipProps } from "ag-grid-react"
import { useState } from "react"

import {BPRColorCellRendererWrapper, BPRTagsCellRendererWrapper,BPRRemarksToolTipWrapper, BPRRemarksCellRendererWrapper} from "./styles"

const colorMapper =(color:string)=> {

    switch (color){
        case "White":
            return {
                "bg":"white",
                "text":"black"
            }
        case "Yellow":
            return {
                "bg":"#EBBF2B",
                "text":"white"
            }
        case "Green":
            return {
                "bg":"#418D18",
                "text":"white"
            }
        case "Red":
            return {
                "bg":"#F04D4D",
                "text":"white"
            }
        case "Black":
            return{
                "bg":"#000000",
                "text":"white"
            }
        default:
            return{
                "bg":"white",
                "text":"black"
            }
    }
}

export const BPRTechColorCellRenderer = (params:ICellRendererParams)=>{

    const techColor = params.data.TechColor

    const cellColor = colorMapper(params.data.TechColor)

    if(!techColor || techColor.lenght<1){
        return(
            <BPRColorCellRendererWrapper style={{backgroundColor:cellColor.bg,color:cellColor.text}}>
                NULL
            </BPRColorCellRendererWrapper>
        )
    }

    return(
        <BPRColorCellRendererWrapper style={{backgroundColor:cellColor.bg,color:cellColor.text}}>
            {params.data.TechPen}%
        </BPRColorCellRendererWrapper>
    )
}


export const BPREcoColorCellRenderer = (params:ICellRendererParams)=>{


    const ecoColor = params.data.EcoColor

    const cellColor = colorMapper(ecoColor)

    if(!ecoColor || ecoColor.lenght<1){
        return(
            <BPRColorCellRendererWrapper style={{backgroundColor:cellColor.bg,color:cellColor.text}}>
                NULL
            </BPRColorCellRendererWrapper>
        )
    }

    return(
        <BPRColorCellRendererWrapper style={{backgroundColor:cellColor.bg,color:cellColor.text}}>
            {params.data.EcoPen}%
        </BPRColorCellRendererWrapper>
    )
}

export const BPRTagsCellRenderer = (params:ICellRendererParams)=>{
    return(
        <BPRTagsCellRendererWrapper>
            {params.data.tags}
        </BPRTagsCellRendererWrapper>
    )
}

export const BRPRemarksToolTip = (params:CustomTooltipProps)=>{
    console.log(params)
    return(
        <BPRRemarksToolTipWrapper>
            {params.value}
        </BPRRemarksToolTipWrapper>
    )
}

export const BPRRemarksCellRenderer = (params:any)=>{

    const [isOpen,setIsOpen] = useState<boolean>(false)

    return (
        <BPRRemarksCellRendererWrapper onClick={()=>setIsOpen(!isOpen)}>
            {
                isOpen && (
                    <BPRRemarksToolTipWrapper>
                        {params.value}
                    </BPRRemarksToolTipWrapper>
                )
            }
        </BPRRemarksCellRendererWrapper>
    )
}