import {useMemo,useState} from 'react';
import GridViewTable from "../../GridView/GridViewTable";
import { BPRTagsCellRenderer } from "../../../BPR/BPRCellRenderers";
import { AgGridReactProps } from "ag-grid-react";
import { VFPaginationProps } from "../../../../../../../components/VectorFLOW/commons/VFPagination";
import { SideBarDef } from 'ag-grid-enterprise';
import { createIconColumn } from '../../../../../../../helpers/utils';
import BPRGraphCellRenderer from '../../../BPR/BPRGraphCellRenderer';
import ColorCellRenderer from '../../../../InsightsAndTrends/BTR/ColorCellRenderer';

const OrderFulfillmentGrid = ({data,paginationProps,onOpenDailyDataGraph,currentCategory,currentTab}:{data:any,paginationProps:VFPaginationProps,onOpenDailyDataGraph:any,currentCategory:string,currentTab:string})=>{

    const [activeRow,setActiveRow] = useState<any>();
    const [isSubGridOpen,toggleSubGrid] = useState<any>(false);

    const customCellRenderers = useMemo(() => ({
        grapCellRenderer:BPRGraphCellRenderer,
        tagsCellRenderer:BPRTagsCellRenderer,
        colorCellRenderer:ColorCellRenderer
      }), []);

      const sideBar:SideBarDef = {
        toolPanels: [
          {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
            toolPanelParams: {
              suppressPivots: true,
              suppressPivotMode: true,
            },
          
          },
        ],
        defaultToolPanel:'',
      }

    const agGridProps:AgGridReactProps = {
        
        suppressRowTransform:true,
        tooltipShowDelay:0.3,
        tooltipTrigger:'focus',
        tooltipInteraction:true,
        // rowSelection:'single',
        readOnlyEdit:true,
        gridOptions:{
            rowHeight:50,
            getRowStyle: (params: any) => {
            if (params.node.rowIndex % 2 === 0) {
                return { background: "#EBEBEB" };
            }
            return { background: "#F7F7F7" };
            },
        },
        onRowClicked:(params:any)=>{
            if(params.data.transit && params.data.transit.length>0){
                setActiveRow(params.data.transit)
                toggleSubGrid(true)
            }
        },
        sideBar:sideBar,
        suppressRowClickSelection:true,
        components:customCellRenderers,
        defaultColDef:{
            floatingFilter: true,
            filter: "agMultiColumnFilter",
            cellDataType:false,
            resizable:false,
            cellStyle:{
                "flex":1,
                'text-align':'center',
                'height':'50px',
                "font-style":"normal",
                " font-variant":"normal",
                " font-weight":"300",
                " font-size":"20px",
                " font-family":"Roboto",
                "display":"block",
                'text-overflow':'ellipsis',
                'white-space':'nowrap'
            },
        }
    }

    const mapUIConfigToColdefs = (columns:Array<{header:string,colCode:string,colPosition:number}>) => {
        let colDefs = [];
        columns.sort((column1:{header:string,colCode:string,colPosition:number},column2:{header:string,colCode:string,colPosition:number})=>{
            return column1.colPosition - column2.colPosition;
        })
        const dailyDataColDef = {...createIconColumn({id:'graph',label:'',cellRenderer:'grapCellRenderer'}),cellRendererParams:{onOpenDailyDataGraph:onOpenDailyDataGraph}}
        const tagsColDef =  {
            colId:'tags',
            field:'tags',
            headerName:"Tags",
            cellRenderer:'tagsCellRenderer',
            width:100
          }
        colDefs = columns.map((column:{header:string,colCode:string,colPosition:number})=>{
            if(['plp','pip'].includes(column.colCode)){
                return {
                    field:column['colCode'],
                    colId:column['colCode'],
                    headerName:column['header'],
                    cellRenderer:'colorCellRenderer',
                }
            }
            return {
                field:column['colCode'],
                colId:column['colCode'],
                headerName:column['header'],
            }
        })
        return [dailyDataColDef,tagsColDef,...colDefs]
    }

    const colDefs = mapUIConfigToColdefs(data['uiConfig'])

    const customGridColDef = [
        {
            headerName:"Order No/Tracking No",
            colId:'on',
            field:'on'
        },
        {
            headerName:"Creation Date",
            colId:'id',
            field:'id'
        },
        {
            headerName:"Due Date",
            colId:'dd',
            field:'dd'
        },
        {
            headerName:"Price",
            colId:'p',
            field:'p'
        },
        {
            headerName:"Order Status",
            colId:'os',
            field:'os'
        },
      
    ]
    

    return(
        <GridViewTable 
            currentTab={currentTab}
            currentCategory={currentCategory}
            agGridProps={agGridProps} 
            agGridColDefs={colDefs} 
            agGridRowData={data['data']} 
            customGridRowData={activeRow} 
            customGridColDef={customGridColDef} 
            isSubGridOpen={isSubGridOpen}
            paginationProps={paginationProps}
            tablePrefixSrc={'/assets/img/VectorFLOW/BPR/order-fullfilment-table-prefix.svg'}
        />
    )
}

export default OrderFulfillmentGrid