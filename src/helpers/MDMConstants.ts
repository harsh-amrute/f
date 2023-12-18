import { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import TaskPendingActionRenderer from '../VectorFlow/Pages/MTA/MDM/TaskPendingForReview/TaskPendingActionRenderer';
import { LocationSchema, SKULocationSchema, SKUSchema, SOBSchema } from '../validators/schemas/MTA/MDM/index';
import {type Option, type MasterIdToSchema} from '../VectorFlow/types/MDM';
import TaskPendingActionHeader from '../VectorFlow/Pages/MTA/MDM/TaskPendingForReview/TaskPendingActionHeader';

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

export const masterGroupMapper = [
    {
      name:"SKU",
      masters:[1]
    },
    {
      name:"Location",
      masters:[5,4]
    },
    {
      name:"SKU Location",
      masters:[2]
    },
    {
      name:"Plant/CCR",
      masters:[]
    }
  ]

  export const ImageMapper={
    1:'/assets/img/VectorFLOW/NMS/AddRecords/sku-1.svg', 
   // 'Discount Period':'/assets/img/VectorFLOW/NMS/AddRecords/calendar-1.svg',
   // 'IST Yield':'/assets/img/VectorFLOW/NMS/AddRecords/invest-1.svg',
   // 'Groupping':'/assets/img/VectorFLOW/NMS/AddRecords/groupping.svg',
    
//    'Deployment':'/assets/img/VectorFLOW/NMS/AddRecords/deployment-1.svg',
//    'SKU-Location':'/assets/img/VectorFLOW/NMS/AddRecords/sku-loc(2).svg',
   //'pivotal':'/assets/img/VectorFLOW/NMS/AddRecords/pivot.svg
    5:'/assets/img/VectorFLOW/NMS/AddRecords/MOQ-1.svg',
    4:'/assets/img/VectorFLOW/NMS/AddRecords/sob-1.svg',
    // 'Seasonality-Retail':'/assets/img/VectorFLOW/NMS/AddRecords/seasonality-hover.svg',
    // 'Seasonality':'/assets/img/VectorFLOW/NMS/AddRecords/seasonality-hover.svg',
//    10:'/assets/img/VectorFLOW/NMS/AddRecords/phase-in-phase-out.svg',
    
   2:'/assets/img/VectorFLOW/NMS/AddRecords/location-1.svg',
    // 'Contact':'/assets/img/VectorFLOW/NMS/AddRecords/contact-1.svg',
   // 'Loc-Capacity':'/assets/img/VectorFLOW/NMS/AddRecords/location-capacity-1.svg',
   // 'Loc-Priority':'/assets/img/VectorFLOW/NMS/AddRecords/loc-pri-1.svg',

    // 'CCR':'/assets/img/VectorFLOW/NMS/AddRecords/ccr.svg',
    // 'Buffer':'/assets/img/VectorFLOW/NMS/AddRecords/buffer-1.svg',

}

export const ImageMapperHover={
    1:'/assets/img/VectorFLOW/NMS/AddRecords/sku-1-hover.svg', //sku
    // 'Discount Period':'/assets/img/VectorFLOW/NMS/AddRecords/calendar-1-hover.svg',
    // 'IST Yield':'/assets/img/VectorFLOW/NMS/AddRecords/invest-1-hover.svg',
    // 'Groupping':'/assets/img/VectorFLOW/NMS/AddRecords/groupping-hover.svg',
 
    // 'Deployment':'/assets/img/VectorFLOW/NMS/AddRecords/deployment-1-hover.svg',
    // 'skuLocation':'/assets/img/VectorFLOW/NMS/AddRecords/sku-loc-hov(2).svg',
    //'pivotal':,
    5:'/assets/img/VectorFLOW/NMS/AddRecords/MOQ-1-Hover.svg',  //moq
    4:'/assets/img/VectorFLOW/NMS/AddRecords/sob-1.svg',  //sob
    // 'Seasonality-Retail':'/assets/img/VectorFLOW/NMS/AddRecords/seasonality-hover.svg',
    // 'Seasonality':'/assets/img/VectorFLOW/NMS/AddRecords/seasonality-hover.svg',
    // 10:'/assets/img/VectorFLOW/NMS/AddRecords/phase-in-phase-out-hover.svg', //pipo
    
    2:'/assets/img/VectorFLOW/NMS/AddRecords/location-1-hover.svg', //location
    // 'Contact':'/assets/img/VectorFLOW/NMS/AddRecords/contact-1-hover.svg',
    // 'Loc-Capacity':'/assets/img/VectorFLOW/NMS/AddRecords/loc-capacity.svg',
    // 'Loc-Priority':'/assets/img/VectorFLOW/NMS/AddRecords/loc-pri-1-hover.svg',

    // 'CCR':'/assets/img/VectorFLOW/NMS/AddRecords/ccr-hover.svg',
    // 'Buffer':'/assets/img/VectorFLOW/NMS/AddRecords/buffer-1-hover.svg',
}