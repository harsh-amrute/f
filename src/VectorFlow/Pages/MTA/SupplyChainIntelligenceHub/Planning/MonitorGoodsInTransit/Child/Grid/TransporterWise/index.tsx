import {useState,useMemo} from 'react';
import GridViewTable from "../../../../GridView/GridViewTable";
import { BPRTagsCellRenderer } from "../../../../../BPR/BPRCellRenderers";
import { AgGridReactProps } from "ag-grid-react";
import { VFPaginationProps } from "../../../../../../../../../components/VectorFLOW/commons/VFPagination";
import { ColDef, SideBarDef } from 'ag-grid-enterprise';
import ColorCellRenderer from '../../../../../../InsightsAndTrends/BTR/ColorCellRenderer';
import { AgeingCellRenderer } from '../../../../../../../../../components/VectorFLOW/commons/AgeingCellRenderer';

const MonitorGITChildTransporterWiseGrid = ({data,paginationProps,currentCategory,currentTab}:{data:any,paginationProps:VFPaginationProps,onOpenDailyDataGraph:any,currentCategory:string,currentTab:string})=>{

    const [activeRow,setActiveRow] = useState<any>();
    const [isSubGridOpen,toggleSubGrid] = useState<any>(true);
    
    const customCellRenderers = useMemo(() => ({
        tagsCellRenderer:BPRTagsCellRenderer,
        colorCellRenderer:ColorCellRenderer,
        ageingCellRenderer:AgeingCellRenderer
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
                suppressRowGroups: true,
                suppressValues: true,
              },
          
          },
        ],
        defaultToolPanel:'',
      }

    const agGridProps:AgGridReactProps = {
        
        suppressRowTransform:true,
        tooltipShowDelay:0.1,
        // rowSelection:'single',
        readOnlyEdit:true,
        onRowClicked:(params:any)=>{
            if(params.data.transit && params.data.transit.length>0){
                setActiveRow(params.data.transit)
                toggleSubGrid(true)
            }
        },
        enableRangeSelection: true,
        rowSelection: "multiple",
        statusBar: {
          statusPanels: [
            { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
            { statusPanel: 'agTotalRowCountComponent', align: 'left' },
            { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
            { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
            { statusPanel: 'agAggregationComponent', align: 'left' },
          ],
        },
        gridOptions:{
            rowHeight:50,
            getRowStyle: (params: any) => {
            if (params.node.rowIndex % 2 === 0) {
                return { background: "#EBEBEB" };
            }
            return { background: "#F7F7F7" };
            },
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

    const customGridColDef = [
        {
            headerName:"SKU Code",
            colId:'SKUCode',
            field:'SKUCode'
        },
        {
            headerName:"Qty",
            colId:'InTransitQty',
            field:'InTransitQty'
        },
        {
            headerName:"Physical Inventory Color",
            colId:'PhysicalInventoryColor',
            field:'PhysicalInventoryColor'
        },
        {
            headerName:"Pipeline Inventory Color",
            colId:'PipelineInventoryColor',
            field:'PipelineInventoryColor'
        },
        {
            headerName:"Price",
            colId:'Price',
            field:'Price'
        },
        {
            headerName:"Business",
            colId:'SL1',
            field:'SL1'
        },
        {
            headerName:"Category",
            colId:'SL2',
            field:'SL2'
        },
    ]

    const mapUIConfigToColdefs = (columns:Array<{header:string,colCode:string,colPosition:number}>) => {
        let colDefs = [];
        const tagsColDef =  {
            colId:'tags',
            field:'t',
            headerName:"Tags",
            cellRenderer:'tagsCellRenderer',
            width:100,
        }
        const ageingColDef:ColDef =  {
            colId:'AgeingOrder',
            field:'AgeingOrder',
            tooltipField:'AgeingOrder',
            tooltipValueGetter:()=>{return "High Ageing"},
            headerName:"",
            cellRenderer:'ageingCellRenderer',
            width:100,
            floatingFilter:false
        }
        columns.sort((column1:{header:string,colCode:string,colPosition:number},column2:{header:string,colCode:string,colPosition:number})=>{
            return column1.colPosition - column2.colPosition;
        })
        colDefs = columns.map((column:{header:string,colCode:string})=>{
            if(['plp','pip'].includes(column.colCode)){
                return {
                    field:column['colCode'],
                    colId:column['colCode'],
                    headerName:column['header'],
                    cellRenderer:'colorCellRenderer',
                }
            }
            if(column.colCode === 't'){
                return tagsColDef
            }
            return {
                field:column['colCode'],
                colId:column['colCode'],
                headerName:column['header']
            }
        })
        // dispatch(UPDATE_GRID_STATE([ageingColDef,dailyDataColDef,...colDefs]))
        return [ageingColDef,...colDefs]
    }

    const colDefs = mapUIConfigToColdefs(data['uiConfig'])
    


   

    return(
        <GridViewTable 
            currentCategory={currentCategory}
            currentTab={currentTab}
            agGridProps={agGridProps} 
            agGridColDefs={colDefs} 
            agGridRowData={data['data']} 
            customGridRowData={activeRow} 
            customGridColDef={customGridColDef} 
            isSubGridOpen={isSubGridOpen}
            paginationProps={paginationProps}
            gridHeight={"95%"}
        />
    )
}

export default MonitorGITChildTransporterWiseGrid