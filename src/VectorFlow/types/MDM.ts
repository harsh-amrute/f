
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
    field:string
    operator:string
    text:string
}