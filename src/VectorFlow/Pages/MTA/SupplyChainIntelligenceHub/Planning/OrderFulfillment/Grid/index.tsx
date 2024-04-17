import GridViewTable from "../../GridView/GridViewTable"
import { useMemo } from "react";
import { BPREcoColorCellRenderer,BPRRemarksCellRenderer,BPRSubmitRemarkCellRenderer,BPRTechColorCellRenderer,BPRTagsCellRenderer } from "../../../BPR/BPRCellRenderers";
import { useGetBPRUIConfiguration } from "../../../../../../Services/MTA/SupplyChainIntelligenceHub/BPR";
import { AgGridReactProps } from "ag-grid-react";
import {mapBPRFieldsToColDefs} from '../../../../../../../helpers/utils';

const OrderFulfillmentGrid = ({data}:{data:any})=>{

    const {data:bprUIConfigData} = useGetBPRUIConfiguration()


    const customCellRenderers = useMemo(() => ({
        // grapCellRenderer:BPRGraphCellRenderer,
        colorTechCellRenderer:BPRTechColorCellRenderer,
        colorEcoCellRenderer:BPREcoColorCellRenderer,
        tagsCellRenderer:BPRTagsCellRenderer,
        submitRemarkCellRenderer:BPRSubmitRemarkCellRenderer,
        remarksCellRenderer:BPRRemarksCellRenderer
      }), []);

    const agGridProps:AgGridReactProps = {
        
        suppressRowTransform:true,
        tooltipShowDelay:0.3,
        tooltipTrigger:'focus',
        tooltipInteraction:true,
        // rowSelection:'single',
        readOnlyEdit:true,
        onRowClicked:(params:any)=>{
            if(params.data.transit && params.data.transit.length>0){
                // setActiveRow(params.data.transit)
                // toggleSubGrid(true)
            }
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
        pagination:true,
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

 

    const PlanningColumns = mapBPRFieldsToColDefs(bprUIConfigData?.data.data,()=>{console.log('hello')},()=>{console.log('hello')},()=>{console.log('hello')})

    return(
        <GridViewTable agGridProps={agGridProps} agGridColDefs={PlanningColumns} agGridRowData={data ? data : []} customGridRowData={[]} customGridColDef={[]} isSubGridOpen={false}/>
    )
}

export default OrderFulfillmentGrid