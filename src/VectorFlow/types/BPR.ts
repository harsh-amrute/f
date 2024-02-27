import { CSSProperties } from "react"

export interface BPRField {
    Report_Name:string
    Col_Code:string
    Col_Position:number
    Header:string
    Visible:boolean
    CellAlignment:string
    Value:string
}

export interface BPRDataPayload{
    filters:any[]
    paginationParameter:{
        pageNumber:number,
        recordsPerPage:number
    }
}


export interface BPRSubmitRemarkToolTipProps{
    remark:string 
    style:CSSProperties
    setRemark:(params:any)=>void
    onSuccess:()=>void
    onClose:()=>void
}

export interface BPRRemarkHistoryToolTipProps{
    remarkHistory:any[] 
    style:CSSProperties
    onClose:()=>void
}

export interface SubmitBPRRemarkPayload{
    remark:string
}