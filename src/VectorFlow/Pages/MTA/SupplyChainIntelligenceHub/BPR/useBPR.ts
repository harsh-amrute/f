import { useState,useMemo, useEffect } from "react"
import { AgGridReactProps } from "ag-grid-react"

import { useGetBPRData, useGetBPRUIConfiguration } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub"
import { useUserData } from "../../../../../context"
import { BPREcoColorCellRenderer,BPRRemarksCellRenderer,BPRSubmitRemarkCellRenderer,BPRTagsCellRenderer,BPRTechColorCellRenderer } from "./BPRCellRenderers"
import { mapBPRFieldsToColDefs } from "../../../../../helpers/utils"

const useBPR =()=>{

    const {isSideBarOpen} = useUserData()

    const [isSubGridOpen,toggleSubGrid] = useState<boolean>(false)
    const [activeRow,setActiveRow] = useState<any>()
    const [activeRowIndex,setActiveRowIndex] = useState<number | null>(null)
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [BPRRowData,setBPRRowData] = useState<any[]>([])
  
  
    const {data,isLoading:isBPRUILoading,isError} = useGetBPRUIConfiguration()
    
  
    const {mutateAsync:getBPRData} = useGetBPRData()

  
    const BPRColumns = mapBPRFieldsToColDefs(data?.data.data)

  
    useEffect(()=>{
        async function getBPRRowData(){
            const rowData =await  getBPRData({
                filters:[],
                paginationParameter:{
                    pageNumber:1,
                    recordsPerPage:50
                }
            })
            setBPRRowData(rowData.data.data)
            setIsLoading(false)
        }
        getBPRRowData()
    },[])
    
  
    const customCellRenderers = useMemo(() => ({
        grapCellRenderer:'',
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
                setActiveRow(params.data.transit)
                toggleSubGrid(true)
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
                'min-width':180,
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

   
    return {
        isSideBarOpen,
        isSubGridOpen,
        isLoading : isLoading || isBPRUILoading,
        isError,
        activeRow,
        BPRColumns,
        BPRRowData,
        agGridProps,
        toggleSubGrid,
        setActiveRow
    }
}

export default  useBPR