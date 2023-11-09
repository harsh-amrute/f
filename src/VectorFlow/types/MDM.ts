import {
    GridApi,
    ColumnApi,
    ColDef
} from 'ag-grid-community'
export interface Master{
    id:number,
    name:string,
    fields:Field[]
}

export interface Option{
    label:string,
    value:string
}

export interface Field{
    displayName:string,
    key:string,
    visible:boolean
}

export interface Tab{
    id:number,
    fields:Field[],
    name:string,
    status:string
}

export interface Filter{
    id:string
    masterId:number | undefined,
    field:string
    operator:string
    text:string
}

export interface GetMasterDataPayload {
    masterId:number,
    masterName:string,
    filters:Array<{attributeName:string,operator:string,value:string}>,
    fields:Array<{key:string}>,
    paginationParameter:PaginationPayload
    
}

export interface PaginationPayload {
    pageNumber:number,
    recordsPerPage:number
}

export interface VFtableProps{
    rowData:Array<any>
    columnDefs:ColDef[]
    ref:any
}

// export interface GridRef{
//     api:GridApi
//     columnApi:ColumnApi
// }