import {
    GridApi,
    ColumnApi,
    ColDef
} from 'ag-grid-enterprise'
import Joi from 'joi'

export type ViewModifyProgressState = "default" | "view" | "error" | "uploaded" | "submitted" | "editOnline" | "editOnlineSaved" | "editOnlineSubmitted" | "seasonality" | "phaseInPhaseOut" | "deleteUploaded" | "deleteView"| "deleteOnline" | "deleteOnlineSaved" | "deleteOnlineSubmitted";
export interface MDMStore{
    allMasters:MDMMasterState[],
    masters:MDMMasterState[],
    options:Option[],
    selectedOptions:Option[],
    activeMaster:MDMMasterState,
    isSelectMasterOpen:boolean,
    draftId:string
    isUploadModalOpen:boolean,
    chunkSize:number,
    recordCount:number
}

export interface MDMMasterState{
    id:number,
    name:string,
    colDefs:ColDef[]
    rowData:any[]
    filters:Filter[]
    progress:ViewModifyProgressState,
    fields:Field[]
}
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
    isEdit:boolean
    isAdd:boolean
    isDownload:boolean
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
    id:number,
    name:string,
    filters:Array<{attributeName:string,op:string,value:string}>,
    fields:Array<{key:string}>,
    paginationParameter?:PaginationPayload | object
    
}

export interface PaginationPayload {
    pageNumber:number,
    recordsPerPage:number
}

export interface VFtableProps{
    rowData:Array<any>
    columnDefs:ColDef[] | undefined
    ref:any
    onColumnChange:()=>void
}

export interface GridRef{
    api:GridApi
    columnApi:ColumnApi
}

export interface AddRecordMaster{
    id:number,
    name:string
}

export interface AddRecordMasterGroup{
    name:string
    masters:AddRecordMaster[]
}
export interface MasterIdToSchema{
    [key: string]: Joi.ObjectSchema<any>
}


export interface QueryFilteredDataConfigs{
    filters:Array<{attributeName:string,op:string,value:string}>,
    fields:Array<{key:string}>
    showAll?:boolean,
    pagination?:boolean
    count?:boolean,
    currentPage?:number
}

export interface UploadModalRadioButtonsType{
    label:string
    value:any
}
export interface NormHistory {
    date:string,
    old_norm:string,
    new_norm:string,
    change_reason:string
}

export interface DailyData {
    date:string,
    stock:string,
    git:string
}
export interface SeasonalityQuickFilterType{
    id:number
    label:string
    color:string
}

export interface DraftActionType{
    id:number
    label:string
    value:string
}