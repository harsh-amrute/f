import { Tooltip } from "react-tooltip"
import { generateRandomId } from "../../../../../helpers/utils"
import { BPRViewTableRowCell } from "./styles"

import 'react-tooltip/dist/react-tooltip.css'
import { useState } from "react"


interface BPRViewTableRowCellWithReadMore{
    value:string
}


const BPRViewTableRowCellWithReadMore = (props:BPRViewTableRowCellWithReadMore)=>{

    const {
        value
    } = props

    const [toolTipId,setToolTipId] = useState(generateRandomId())

    return(
        <BPRViewTableRowCell style={{display:'flex',flexDirection:"row",position:'relative'}}>
            <p >{value.slice(0,15)}...</p>
            <a style={{color:'#BC3D81',cursor:'default'}}  data-tooltip-id={toolTipId} data-tooltip-content={value} >Read full </a>
            <Tooltip style={{zIndex:30000,whiteSpace:"break-spaces",textAlign:"left"}} id={toolTipId} place='left' />
        </BPRViewTableRowCell>
    )
}

export default BPRViewTableRowCellWithReadMore