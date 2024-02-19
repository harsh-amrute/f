import { useGetBORUIConfiguration, useBORData, useBORDataCount } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub"
import { mapBORFieldsToColDefs } from "../../../../../helpers/utils"
import { useState,useMemo, useEffect } from "react"
import { AgGridReactProps } from "ag-grid-react"
import {DispatchColorCellRenderer} from "../CellRenderer"
import { SeasonalityGraphCellRenderer } from "../../../../../components/VectorFLOW/commons/SeasonalityCellRenderers"

export const useBOR =()=>{
    
     //const [activeRow,setActiveRow] = useState<any>()
     const {data,isLoading} = useGetBORUIConfiguration();
   
    // const [isSubGridOpen,toggleSubGrid] = useState<boolean>(false);
     const [rowData,setRowData] = useState([]);

     const [recordCount,setRecordCount] = useState<number>(0)
     const [currentPage,setCurrentPage] = useState(1);
     const rowsPerPage = 50;
     const handleChangePage = async (pageNo:any) => {
        console.log(pageNo);
         setCurrentPage(pageNo);
         loadGridData(pageNo);
      }


     const {mutateAsync:getBorData,isLoading:isViewTableLoading} = useBORData();
     const {mutateAsync:getBorDataCount} = useBORDataCount();

     const customCellRenderers = useMemo(() => ({
        grapCellRenderer:SeasonalityGraphCellRenderer,
        colorDispatchCellRenderer:DispatchColorCellRenderer,
        
      }), []);

      
      const BORColumns = mapBORFieldsToColDefs(data?.data.data)

      useEffect(()=>{
        getRecordsCount();
        loadGridData(currentPage);
      },[])

      const getRecordsCount=async()=>{
        const resultCount=await getBorDataCount("");
        setRecordCount(resultCount?.data?.recordCount);
      }
    
    const loadGridData = async (pageNo:any)=> {
        console.log(currentPage);
        const payload={
            pageNumber:pageNo,recordsPerPage:rowsPerPage
        }
        const result = await getBorData(payload);
        setRowData(result?.data.data)

    }
  
  
     const agGridProps:AgGridReactProps = {
        tooltipShowDelay:0,
        tooltipTrigger:"focus",
        readOnlyEdit:true,
        suppressRowClickSelection:true,
        components:customCellRenderers,
        enableBrowserTooltips:true,
        gridOptions:{
            rowHeight:50,
            getRowStyle: (params: any) => {
            if (params.node.rowIndex % 2 === 0) {
                return { background: "#EBEBEB" };
            }
            return { background: "#F7F7F7" };
            },
        },
         pagination:false,
         defaultColDef:{
            floatingFilter: true,
            filter: "agMultiColumnFilter",
            cellDataType:false,
            cellStyle:{
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
            // onCellClicked:(params:any)=>{
            //     console.log(params)
            //     if(params.data.transit && params.data.transit.length>0){
            //         setActiveRow(params.data.transit)
            //         toggleSubGrid(true)
            //         return 
            //     }
            //     return setActiveRow(null)
            // }
        }
}

     return {       
        isLoading,      
        BORColumns,
        agGridProps,
        rowData ,
        currentPage,
        rowsPerPage,
        recordCount,
        handleChangePage   
    }
}
