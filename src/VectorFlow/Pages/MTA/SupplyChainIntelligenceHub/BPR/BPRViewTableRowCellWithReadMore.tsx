import { BPRViewTableRowCell,BPRViewTableToolTip } from "./styles"

import Portal from '../../../../../components/VectorFLOW/layouts/Portal'

import 'react-tooltip/dist/react-tooltip.css'
import React, { CSSProperties, useState } from "react"


interface BPRViewTableRowCellWithReadMore{
    value:string
}


const BPRViewTableRowCellWithReadMore = (props:BPRViewTableRowCellWithReadMore)=>{

    const {
        value
    } = props

    const [isOpen,setIsOpen] = useState(false)

    const [toolTipPosition,setoolTipPosition] = useState<CSSProperties>({
       
    })

    const onMouseIn = (e:React.MouseEvent<HTMLElement>)=>{
        const {top,left} = e.currentTarget.getBoundingClientRect()
        setoolTipPosition({
            top:top * 0.75 -40,
            left:left
        })
        setIsOpen(true)
    }

    const onMouseOut = ()=>setIsOpen(false)

    return(
        <BPRViewTableRowCell style={{display:'flex',flexDirection:"row",position:'relative'}}>
            <p >{value.slice(0,15)}...</p>
            <p style={{color:'#BC3D81',cursor:'default'}} onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}>Read full </p>
            {isOpen && (
                <Portal wrapperId="viewtable">
                    <BPRViewTableToolTip onMouseEnter={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)} style={{top:toolTipPosition.top,right:40}}>
                        {value}
                    </BPRViewTableToolTip>
                </Portal>
            )}
        </BPRViewTableRowCell>
    )
}

export default BPRViewTableRowCellWithReadMore