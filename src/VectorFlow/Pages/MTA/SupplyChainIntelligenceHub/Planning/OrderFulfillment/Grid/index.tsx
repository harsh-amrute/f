import {useMemo} from 'react';
import GridViewTable from "../../GridView/GridViewTable";
import { BPRTagsCellRenderer } from "../../../BPR/BPRCellRenderers";
import { AgGridReactProps } from "ag-grid-react";
import { VFPaginationProps } from "../../../../../../../components/VectorFLOW/commons/VFPagination";
import { SideBarDef } from 'ag-grid-enterprise';
import { createIconColumn } from '../../../../../../../helpers/utils';
import BPRGraphCellRenderer from '../../../BPR/BPRGraphCellRenderer';
import ColorCellRenderer from '../../../../InsightsAndTrends/BTR/ColorCellRenderer';

const OrderFulfillmentGrid = ({data,paginationProps,onOpenDailyDataGraph}:{data:any,paginationProps:VFPaginationProps,onOpenDailyDataGraph:any})=>{

   
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

    const mapUIConfigToColdefs = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];
        const dailyDataColDef = {...createIconColumn({id:'graph',label:'',cellRenderer:'grapCellRenderer'}),cellRendererParams:{onOpenDailyDataGraph:onOpenDailyDataGraph}}
        colDefs = columns.map((column:{header:string,colCode:string})=>{
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
                headerName:column['header']
            }
        })
        return [dailyDataColDef,...colDefs]
    }

    const colDefs = mapUIConfigToColdefs(data['uiConfig'])
    

    return(
        <GridViewTable 
            agGridProps={agGridProps} 
            agGridColDefs={colDefs} 
            agGridRowData={data['data']} 
            customGridRowData={[]} 
            customGridColDef={[]} 
            isSubGridOpen={false}
            paginationProps={paginationProps}
        />
    )
}

export default OrderFulfillmentGrid