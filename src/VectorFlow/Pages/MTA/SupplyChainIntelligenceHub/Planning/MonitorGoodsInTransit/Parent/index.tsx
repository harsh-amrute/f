import GridViewTable from "../../GridView/GridViewTable"
import { useMemo } from "react";
import { BPRRemarksCellRenderer,BPRSubmitRemarkCellRenderer,BPRTagsCellRenderer } from "../../../BPR/BPRCellRenderers";
import { AgGridReactProps } from "ag-grid-react";

const MonitorGITParent = ({data}:{data:any})=>{



    const customCellRenderers = useMemo(() => ({
        // grapCellRenderer:BPRGraphCellRenderer,
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
        return columns.map((column:{header:string,colCode:string})=>{
            return {
                field:column['colCode'],
                colId:column['colCode'],
                header:column['header']
            }
        })
    }

    const colDefs = mapUIConfigToColdefs(data['uiConfig'])

    // if(isLoading){
    //   return (
    //     <VFLoader/>
    //   )
    // }


    return(
        <GridViewTable agGridProps={agGridProps} agGridColDefs={colDefs} agGridRowData={data['data']} customGridRowData={[]} customGridColDef={[]} isSubGridOpen={false}/>
    )
}

export default MonitorGITParent