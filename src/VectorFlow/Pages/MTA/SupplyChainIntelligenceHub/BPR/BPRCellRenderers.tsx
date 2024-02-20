
import { ICellRendererParams } from "ag-grid-enterprise"
import React, { useState } from "react"
import Portal from "../../../../../components/VectorFLOW/layouts/Portal"

import { BPRColorCellRendererWrapper, 
    BPRTagsCellRendererWrapper,
    BPRRemarksToolTipWrapper, 
    BPRRemarksCellRendererWrapper,
    BPRRemarksToolTipContent,
    BPRRemarksToolTipContentHeader,
    BPRRemarksToolTipContentColumnContainer, 
    BPRRemarksToolTipContentColumn, 
    BPRRemarksToolTipContentRowContainer, 
    BPRRemarksToolTipContentRow, 
    BPRRemarksToolTipContentRowCell ,
    BPRColorCellRendererIcon,
    BPRRemarksToolTipContentRowNameCellSection,
    BPRRemarksToolTipContentRowDataCellSection,
    BPRSubmitRemarkInput,
    BPRRemarkToolTipTextArea,
    BPRRemarkToolTipButtonGroup,
    BPRRemarkToolTipButton
} from "./styles"


interface BPRRemarksCellRendererProps extends ICellRendererParams{
    onClick:(params:any)=>void
}


// interface ColorMapper {
//     [key: string]: {
//         bg: string;
//         text: string;
//     };
// }


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



export const BPRSubmitRemarkCellRenderer = ()=>{



    const [isOpen,setIsOpen] = useState<boolean>(false)
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [tooltipPosition,setToolTipPosition] = useState<any>()
    

    const handleClick = (e:React.MouseEvent<HTMLElement>)=>{
        const toolTipContainer = document.getElementById('tooltip')
        if(toolTipContainer && toolTipContainer.children.length>0){
            toolTipContainer.remove()
        }
        if(isOpen)return setIsOpen(false)

        const {top,left} = e.currentTarget.getBoundingClientRect()
        setToolTipPosition({
            top: top * 0.75 * 0.75,
            left: left * 0.75 * 0.75 ,
        })
        setIsOpen(true)
        setIsLoading(false)

    }

    return(
        <BPRRemarksCellRendererWrapper>
            <BPRSubmitRemarkInput placeholder="Type Remark" ref={(ref) => {
        if (!ref) return;

        ref.onclick = (e:any) => {
         handleClick(e)
          e.stopPropagation();
        };
      }}/>
            {isOpen && (
                    <Portal wrapperId="tooltip">
                        <BPRRemarksToolTipWrapper style={{top:tooltipPosition.top,left:tooltipPosition.left}}>
                            <BPRRemarksToolTipContent  className="custom-scrollbar">
                                <BPRRemarkToolTipTextArea placeholder="Type your remark here"/>
                                <BPRRemarkToolTipButtonGroup>
                                    <BPRRemarkToolTipButton style={{marginRight:10,backgroundColor:'rgb(188, 61, 129)',color:'white'}} onClick={()=>setIsOpen(false)} >
                                        Submit
                                    </BPRRemarkToolTipButton>
                                    <BPRRemarkToolTipButton style={{border:'1px solid rgb(130, 15, 76)'}} onClick={()=>setIsOpen(false)} >
                                        Cancel
                                    </BPRRemarkToolTipButton>
                                </BPRRemarkToolTipButtonGroup>
                            </BPRRemarksToolTipContent>
                        </BPRRemarksToolTipWrapper>
                    </Portal>
            )}
        </BPRRemarksCellRendererWrapper>
    )
}

export const BPRRemarksCellRenderer = ()=>{

    const [isOpen,setIsOpen] = useState<boolean>(false)
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [remarkHistory,setRemarkHistory] = useState<any[]>([])
    const [tooltipPosition,setToolTipPosition] = useState<any>()

    const handleClick = (e:React.MouseEvent<HTMLElement>)=>{
        if(isOpen)return setIsOpen(false)
        const {top,left} = e.currentTarget.getBoundingClientRect()
        setToolTipPosition({
            top: top * 0.75 * 0.75,
            left: left * 0.75 * 0.75 ,
        })
        setRemarkHistory([
            {
              "skuCode": "ARES0798C004",
              "whCode": "2224",
              "remarkDate": "2024-01-17T11:26:14.190",
              "Remark": "Check, if this data is correct and we can use this",
              "userName": "Sanuj"
              
            },
            {
              "skuCode": "ARES0439C002",
              "whCode": "2087",
              "remarkDate": "2024-01-19T10:41:10.900",
              "Remark": "ETA 37 kg by 19th Jan-24, Ok I assume this wil reach here",
              "userName": "Sanuj"
              
            },
            {
              "skuCode": "ARES0439C002",
              "whCode": "2108",
              "remarkDate": "2024-01-19T10:44:42.717",
              "Remark": "11 kg by Unloading;Case need to verify by vector team ;",
              "userName": "Sanuj"
              
            },
            {
              "skuCode": "ARES0439C002",
              "whCode": "2178",
              "remarkDate": "2024-01-19T13:45:29.990",
              "Remark": "Mid Feb ; Pls confirm the quantity to be delivered by Mid Feb.",
              "userName": "Sanuj"
             
            }
          ])
          setIsOpen(true)
        setIsLoading(false)

    }

    return (
        <BPRRemarksCellRendererWrapper >
            <BPRColorCellRendererIcon 
             src="/assets/img/VectorFLOW/BPR/eye.svg"
             ref={(ref) => {
                if (!ref) return;
        
                ref.onclick = (e:any) => {
                 handleClick(e)
                  e.stopPropagation();
                };
              }}
             />
            {
                isOpen && (
                        <Portal wrapperId="tooltip">
                            <BPRRemarksToolTipWrapper style={{top:tooltipPosition.top,left:tooltipPosition.left,width:300,height:300}}>
                            <BPRRemarksToolTipContent className="custom-scrollbar">
                            < BPRRemarksToolTipContentHeader>
                                    Remarks History
                            </BPRRemarksToolTipContentHeader>
                            <BPRRemarksToolTipContentColumnContainer>
                                <BPRRemarksToolTipContentColumn style={{width:220}}>
                                    Date
                                </BPRRemarksToolTipContentColumn>
                                <BPRRemarksToolTipContentColumn style={{width:'100%'}}>
                                    Remarks
                                </BPRRemarksToolTipContentColumn>
                            </BPRRemarksToolTipContentColumnContainer>
                            {
                                isLoading
                                ?
                                <p>Loading...</p>
                                :
                                <BPRRemarksToolTipContentRowContainer>
                                {remarkHistory.map((r:any)=>{
                                    return(
                                        <BPRRemarksToolTipContentRow>
                                        {Object.keys(r).map((key:string)=>{
                                                if(key==="remarkDate" ){
                                                    return(
                                                        <BPRRemarksToolTipContentRowCell style={{width:130}}>
                                                            {r[key]}
                                                        </BPRRemarksToolTipContentRowCell>
                                                    )
                                                }
                                                if(key==='Remark'){
                                                    return(
                                                        <BPRRemarksToolTipContentRowCell >
                                                            <BPRRemarksToolTipContentRowNameCellSection>
                                                                Name - {r.userName}
                                                            </BPRRemarksToolTipContentRowNameCellSection>
                                                            <BPRRemarksToolTipContentRowDataCellSection>
                                                                {r.Remark}
                                                            </BPRRemarksToolTipContentRowDataCellSection>
                                                        </BPRRemarksToolTipContentRowCell>
                                                    )
                                                }
                                        })}
                                        </BPRRemarksToolTipContentRow>
                                        )
                                })}
                            </BPRRemarksToolTipContentRowContainer>
                            }
                            </BPRRemarksToolTipContent>
                        </BPRRemarksToolTipWrapper>
                    </Portal>
                )
            }
        </BPRRemarksCellRendererWrapper>
    )
}
