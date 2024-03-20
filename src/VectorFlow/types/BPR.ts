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

export interface BPRFilter{
    type?:string
    name:string
    attributeName:string
    operator:string
    value:string | string[]
}

export interface BPRFilterGroup{
    id:string
    label:string
    filters:Array<BPRFilter>
}

export interface BPRFilterState{
    supplyChainFilter:BPRFilterGroup
    locationFilter:BPRFilterGroup
    productFilter:BPRFilterGroup
    availabilityFilter:BPRFilterGroup
    coverageFilter:BPRFilterGroup
    colorFilter:BPRFilterGroup
}


