import { ColDef } from 'ag-grid-enterprise';
import {TaskPendingActionRenderer} from '../VectorFlow/Pages/MTA/MDM/TaskPendingForReview/TaskPendingActionRenderer';
import { LocationSchema, SKULocationSchema, SKUSchema, SOBSchema } from '../validators/schemas/MTA/MDM/index';
import {type Option, type MasterIdToSchema} from '../VectorFlow/types/MDM';
import TaskPendingActionHeader from '../VectorFlow/Pages/MTA/MDM/TaskPendingForReview/TaskPendingActionHeader';

interface masterGroupMapperType {
    masters:string[],
    name:string
}
export const operators:Option[] = [
    {
      label:'Equals To',
      value:'='
    },
    {
        label:'Not Equal To',
        value:'!='
    },
    {
        label:'>',
        value:'>'
    },
    {
        label:'>=',
        value:'>='
    },
    {
        label:'<',
        value:'<'
    },
    {
        label:'<=',
        value:'<='
    },
    {
        label:'Contains',
        value:'contains'
    },
    {
        label:'Starts With',
        value:'startsWith'
    },
    {
        label:'Ends With',
        value:'endsWith'
    },
    {
        label:'Has Value',
        value:'hasValue'
    },
    {
        label:'Has No Value',
        value:'hasNoValue'
    }
  ]

export const masterIdToSchemaMapper:MasterIdToSchema = {
    '1':SKUSchema,
    '2':LocationSchema,
    '3':SKULocationSchema,
    '4':SOBSchema,
}


export const defaultColDefs:ColDef = {
    minWidth:180,
    cellStyle: {
      "text-align": "center",
    },
    flex: 1,
}

export const taskPendingCustomColDefs :any[] = [
    {
        field:'action',
        colId:'action',
        headerName:'Action',
        children:[
            {
                headerComponent:TaskPendingActionHeader,
                cellRenderer:TaskPendingActionRenderer,
                width:300,
                cellStyle:{
                    "border-left":"solid 1px #B9B9B9"
                }
            }
            // {
            //     field:"reject",
            //     colId:'reject',
            //     headerName:"Reject All",
            //     headerCheckboxSelection:true,
            //     cellRenderer:TaskPendingRejectActionButton,
            //     width:150,
            //     cellStyle:{
            //         "border-right":"solid 1px #B9B9B9"
            //     }
            // }
        ],
        cellStyle: {
        "text-align": "center"
        },
        flex: 1,
    },
    {
        field:'status',
        colId:'status',
        headerName:'Status',
        suppressSpanHeaderHeight: true,
        cellStyle:{
            "border-right":"solid 1px #B9B9B9",
            "border-left":"solid 1px #B9B9B9"
        },
        flex:1,
        minWidth:100
    },
    {
        field:'comments',
        colId:'comments',
        headerName:'Comments',
        suppressSpanHeaderHeight: true,
        editable:true,
        ...defaultColDefs
    }
]

export const masterGroupMapper:masterGroupMapperType[] = [
    {
      name:"SKU",
      masters:['1']
    },
    {
      name:"Location",
      masters:['5','4']
    },
    {
      name:"SKU Location",
      masters:['2']
    },
    {
      name:"Plant/CCR",
      masters:[]
    }
  ]

  export const ImageMapper:any={
    '1':'/assets/img/VectorFLOW/NMS/AddRecords/sku-1.svg', 
    '5':'/assets/img/VectorFLOW/NMS/AddRecords/MOQ-1.svg',
    '4':'/assets/img/VectorFLOW/NMS/AddRecords/sob-1.svg',
    '2':'/assets/img/VectorFLOW/NMS/AddRecords/location-1.svg'
  
}

export const ImageMapperHover:any={
    '1':'/assets/img/VectorFLOW/NMS/AddRecords/sku-1-hover.svg', 
    '5':'/assets/img/VectorFLOW/NMS/AddRecords/MOQ-1-Hover.svg',  
    '4':'/assets/img/VectorFLOW/NMS/AddRecords/sob-1-hover.svg',  
    '2':'/assets/img/VectorFLOW/NMS/AddRecords/location-1-hover.svg' 
}
