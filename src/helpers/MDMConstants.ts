import { ColDef } from 'ag-grid-enterprise';
import TaskPendingActionRenderer from '../VectorFlow/Pages/MTA/MDM/TaskPendingForReview/TaskPendingActionRenderer';
import { AbsoluteValueSeasonalitySchema, AddPIPOSchema, AddPOSchema, AddTargetNormSchema, DeltaPercentageSeasonalitySchema, ForceNormChangeSchema, LocationSchema, MOQSchema, SeasonalityStatusSchema, SKULocationSchema, SKUSchema, SOBSchema, StopPIPOSchema } from '../validators/schemas/MTA/MDM/index';
import {type Option, type MasterIdToSchema, SeasonalityQuickFilterType} from '../VectorFlow/types/MDM';
import TaskPendingActionHeader from '../VectorFlow/Pages/MTA/MDM/TaskPendingForReview/TaskPendingActionHeader';
import { SKUSchemaDelete } from '../validators/schemas/MTA/MDM/SKU';
import { LocationSchemaDelete } from '../validators/schemas/MTA/MDM/Location';
import { SKULocationSchemaDelete } from '../validators/schemas/MTA/MDM/SKULocation';
import { SOBSchemaDelete } from '../validators/schemas/MTA/MDM/SOB';

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
    '5':MOQSchema,
    '6':StopPIPOSchema,
    '7':AddPOSchema,
    '8':AddPIPOSchema,
    '9':AddTargetNormSchema,
    '10':SeasonalityStatusSchema,
    '11':AbsoluteValueSeasonalitySchema,
    '12':DeltaPercentageSeasonalitySchema,
    '13':ForceNormChangeSchema

}

export const masterIdToDeleteSchemaMapper:MasterIdToSchema = {
    '1':SKUSchemaDelete,
    '2':LocationSchemaDelete,
    '3':SKULocationSchemaDelete,
    '4':SOBSchemaDelete
}

export const defaultColDefs:ColDef = {
    minWidth:140,
    cellStyle: {
      "text-align": "center",
      'text-overflow':'ellipsis',
      'white-space':'nowrap'
    },
    flex: 1,
}

export const BTRDefaultColDefs:ColDef = {
    minWidth:100,
    cellStyle: {
      "text-align": "center",
      'text-overflow':'ellipsis',
      'white-space':'nowrap'
    },
    flex: 1,
    cellClass:'btr_cell_style'
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
            "border-left":"solid 1px #B9B9B9",
            "text-align":'center'
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

export const taskStatusCustomColDefs :any[] = [
    {
        field:'comments',
        colId:'comments',
        headerName:'Comments',
        cellStyle: {
        "text-align": "center"
        },
        flex: 1,
    },
    {
        field:'status',
        colId:'status',
        headerName:'Status',
        cellStyle:{
            "border-right":"solid 1px #B9B9B9",
            "border-left":"solid 1px #B9B9B9",
            "text-align":'center'
        },
        flex:1,
        minWidth:100
    },
]



export const  seasonalityQuickFilterData:SeasonalityQuickFilterType[] = [
    {
        id:[1],
        label:'Not Started',
        color:'#898989'
    },
    {
        id:[2,3,4,5,6],
        label:'In Progress',
        color:'#EDD44C'
    },
    {
        id:[7],
        label:'Finished',
        color:'#52B736'
    },
    {
        id:[21],
        label:'Aborted',
        color:'#1D1B1C'
    },
    {
        id:[23],
        label:'Stopped',
        color:'#E33A3A'
    }
]
export const masterGroupMapper:masterGroupMapperType[] = [
    {
      name:"SKU",
      masters:['1']
    },
    {
      name:"Location",
      masters:['2',]
    },
    {
      name:"SKU Location",
      masters:['11','7','13','5','4','3']
    },
    {
      name:"Plant/CCR",
      masters:[]
    },
  ]

  export const ImageMapper:any={
    '1':'/assets/img/VectorFLOW/NMS/AddRecords/sku-1.svg', 
    '5':'/assets/img/VectorFLOW/NMS/AddRecords/MOQ-1.svg',
    '4':'/assets/img/VectorFLOW/NMS/AddRecords/sob-1.svg',
    '2':'/assets/img/VectorFLOW/NMS/AddRecords/location-1.svg',
    '11':'/assets/img/VectorFLOW/NMS/AddRecords/seasonality.svg',
    '7':'/assets/img/VectorFLOW/NMS/AddRecords/phase-in-phase-out.svg',
    '13':'/assets/img/VectorFLOW/NMS/AddRecords/invest-1.svg',
    '3':'/assets/img/VectorFLOW/NMS/AddRecords/sku-location.svg'
  
}

export const ImageMapperHover:any={
    '1':'/assets/img/VectorFLOW/NMS/AddRecords/sku-1-hover.svg', 
    '5':'/assets/img/VectorFLOW/NMS/AddRecords/MOQ-1-Hover.svg',  
    '4':'/assets/img/VectorFLOW/NMS/AddRecords/sob-1-hover.svg',  
    '2':'/assets/img/VectorFLOW/NMS/AddRecords/location-1-hover.svg' ,
    '11':'/assets/img/VectorFLOW/NMS/AddRecords/seasonality-hover.svg',
    '7':'/assets/img/VectorFLOW/NMS/AddRecords/phase-in-phase-out-hover.svg',
    '13':'/assets/img/VectorFLOW/NMS/AddRecords/invest-1-hover.svg',
    '3':'/assets/img/VectorFLOW/NMS/AddRecords/sku-location-hov.svg'
  
}

export const TaskPendingAvoidColumnsMapper:any ={
    "1":["sc"],
    "2":['wc'],
    "3":['sc','wc'],
    "4":['sc'],
    "5":['sc'],
    "7":['sc','wc'],
    "8":['sc','wc','pi'],
    "13":['sc','wc']
}

export const customKeys = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'c9',
    'c10',
    'c11',
    'c12',
    'c13',
    'c14',
    'c15'
]

export const mdmRoutes = [
    '/master-data-management/control-panel/view-modify',
    '/master-data-management/control-panel/add',
    '/master-data-management/control-panel/delete'
]