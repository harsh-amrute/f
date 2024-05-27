import { AgeingCell, AgeingIcon, AgeingText, AgeingToolTipSection, AgeingToolTipText, AgeingToolTipWrapper, BPRViewTableRowCell,BPRViewTableToolTip } from "./styles"

import Portal from '../../../../../components/VectorFLOW/layouts/Portal'

import React, { CSSProperties, useState } from "react"
import useViewPort from "../../../../../hooks/useViewPort"


interface AgeingCellRendererProps{
    value:any
}


const AgeingCellRenderer = (props:AgeingCellRendererProps)=>{

    const {
        value
    } = props

    

    const {getScreenZoomValue} = useViewPort()

    const screenSize = getScreenZoomValue()

    const [isOpen,setIsOpen] = useState(false)

    const [toolTipPosition,setoolTipPosition] = useState<CSSProperties>({
       
    })

    const onMouseIn = (e:React.MouseEvent<HTMLElement>)=>{
        const {top,left} = e.currentTarget.getBoundingClientRect()
        setoolTipPosition({
            top:(top * screenSize) -80,
            left:(left* screenSize ) - 75
        })
        setIsOpen(true)
    }

    const onMouseOut = ()=>setIsOpen(false)

    return(
        <BPRViewTableRowCell style={{display:'flex',flexDirection:"row",position:'relative',justifyContent:'center'}}>
            <AgeingCell>
                <AgeingText>
                    {value.ag}
                </AgeingText>
                <AgeingIcon onMouseEnter={onMouseIn} onMouseLeave={onMouseOut} src="/assets/img/VectorFLOW/BPR/ageing-sub-grid.svg"/>
            </AgeingCell>
            {isOpen && (
                <Portal wrapperId="viewtable">
                    <BPRViewTableToolTip onMouseEnter={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)} style={{top:toolTipPosition.top,left:toolTipPosition.left}}>
                        <AgeingToolTipWrapper>
                            <AgeingToolTipSection>
                                <AgeingToolTipText>Creation Date -</AgeingToolTipText>
                                <AgeingToolTipText>{value.cd}</AgeingToolTipText>
                            </AgeingToolTipSection>
                            <AgeingToolTipSection>
                                <AgeingToolTipText>SLT -</AgeingToolTipText>
                                <AgeingToolTipText>{value.slt}</AgeingToolTipText>
                            </AgeingToolTipSection>
                            <AgeingToolTipSection>
                                <AgeingToolTipText>TLT -</AgeingToolTipText>
                                <AgeingToolTipText>{value.tlt}</AgeingToolTipText>
                            </AgeingToolTipSection>
                        </AgeingToolTipWrapper>
                    </BPRViewTableToolTip>
                </Portal>
            )}
        </BPRViewTableRowCell>
    )
}

export default AgeingCellRenderer