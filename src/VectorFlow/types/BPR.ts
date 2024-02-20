

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