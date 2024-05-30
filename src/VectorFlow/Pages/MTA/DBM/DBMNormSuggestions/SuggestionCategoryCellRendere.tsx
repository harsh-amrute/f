import React,{useState,CSSProperties} from "react"
import { DBMSuggestionsReasonsToIdMapper } from "../../../../../helpers/BPRConstants"

import Portal from "../../.././../../components/VectorFLOW/layouts/Portal"
import {  BPRViewTableToolTip } from "../../SupplyChainIntelligenceHub/BPR/styles"
import { SuggestionCategoryIcon } from "./styles"


const SuggestionCategoryCellRenderer = (params:any)=>{

    const  upwards =["1","2","3","4","6","7","8","9","10"]

    const Comment:any = params.data.Comment

    const CommentId:any = DBMSuggestionsReasonsToIdMapper[Comment]

    const [isOpen,setIsOpen] = useState(false)

    const [toolTipPosition,setoolTipPosition] = useState<CSSProperties>({
       
    })

    const onMouseIn = (e:React.MouseEvent<HTMLElement>)=>{
        
        const {top,left} = e.currentTarget.getBoundingClientRect()
        setoolTipPosition({
            top:(top * 0.75 * 0.75) -60,
            left:(left* 0.75* 0.75 ) -95
        })
        setIsOpen(true)
    }

    const onMouseOut = ()=>{
        setIsOpen(false)
    }
    return(
        <React.Fragment>
           {(upwards.includes(CommentId))?<SuggestionCategoryIcon src='/assets/img/VectorFLOW/BPR/analytics-increase.svg' onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}/> :<SuggestionCategoryIcon style={{transform:'rotate(90deg)'}} src='/assets/img/VectorFLOW/BPR/analytics-decrease.svg' onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}/>}
           {isOpen && (
                    <Portal wrapperId="viewtable">
                        <BPRViewTableToolTip onMouseEnter={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)} style={{top:toolTipPosition.top,left:toolTipPosition.left,maxWidth:200}}>
                            <p style={{textAlign:'center'}}>{Comment}</p>
                        </BPRViewTableToolTip>
                    </Portal>
                )}
        </React.Fragment>
    )
}

// src='/assets/img/VectorFLOW/BPR/analytics-increase.svg'

export  default SuggestionCategoryCellRenderer