import React,{useState,CSSProperties, useRef} from "react"
import { DBMSuggestionsReasonsToIdMapper } from "../../../../../helpers/BPRConstants"

import Portal from "../../.././../../components/VectorFLOW/layouts/Portal"
import {  BPRViewTableToolTip } from "../../SupplyChainIntelligenceHub/BPR/styles"
import { SuggestionCategoryIcon } from "./styles"
import Tooltip from "../../../../../VectorFlow/Pages/MTO/Common/Tooltip"


const SuggestionCategoryCellRenderer = (params:any)=>{

    const  upwards =["1","2","3","4","6","7","8","9","10"]

    const ref = useRef<HTMLDivElement>(null)


    const Comment:any = params.data.Comment

    const CommentId:any = DBMSuggestionsReasonsToIdMapper[Comment]

    const [isOpen,setIsOpen] = useState(false)

    const [toolTipPosition,setoolTipPosition] = useState<CSSProperties>({
       
    })

    const onMouseIn = (e:React.MouseEvent<HTMLElement>)=>{
        const {top,left} = e.currentTarget.getBoundingClientRect()
        setoolTipPosition({
            top:(top * 0.75 * 0.75) -10,
            left:(left* 0.75* 0.75 ) +5
        })
        setIsOpen(true)
    }

    const onMouseOut = ()=>{
        setIsOpen(false)
    }
    return(
        <Tooltip content={<p style={{textAlign:'center', fontSize: '10px', padding: '12px'}}>{Comment}</p>}>
        <React.Fragment>
           {(upwards.includes(CommentId))?<SuggestionCategoryIcon src='/assets/img/VectorFLOW/BPR/analytics-increase.svg' onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}/> :<SuggestionCategoryIcon style={{transform:'rotate(90deg)'}} src='/assets/img/VectorFLOW/BPR/analytics-decrease.svg' onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}/>}
        </React.Fragment>
        </Tooltip>
    )
}

// src='/assets/img/VectorFLOW/BPR/analytics-increase.svg'

export  default SuggestionCategoryCellRenderer