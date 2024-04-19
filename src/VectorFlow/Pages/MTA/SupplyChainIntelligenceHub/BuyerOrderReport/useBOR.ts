import { useGetBORUIConfiguration, useBORData, useBORDataCount } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BuyerOrderReport"
import { mapBORFieldsToColDefs } from "../../../../../helpers/utils"
import { useState,useMemo, useEffect } from "react"
import { AgGridReactProps } from "ag-grid-react"
import {DispatchColorCellRenderer} from "./CellRenderer"
import { SeasonalityGraphCellRenderer } from "../../../../../components/VectorFLOW/commons/SeasonalityCellRenderers"

export const useBOR =()=>{
    
     //const [activeRow,setActiveRow] = useState<any>()
     const {data} = useGetBORUIConfiguration();
   
    // const [isSubGridOpen,toggleSubGrid] = useState<boolean>(false);
     const [rowData,setRowData] = useState([]);

     const [recordCount,setRecordCount] = useState<number>(0)
     const [currentPage,setCurrentPage] = useState(1);
    //  const rowsPerPage=50;
     const rowsPerPage = parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100');
     const handleChangePage = async (pageNo:any) => {
         setCurrentPage(pageNo);
         loadGridData(pageNo);
      }


     const {mutateAsync:getBorData, isLoading} = useBORData();
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
            const payload={
            filters:[],
             paginationParameter: {
        pageNumber: 1,
        // recordPerPage:20
    recordsPerPage: parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100')
    }
        }
        const resultCount=await getBorDataCount(payload);
        setRecordCount(resultCount?.data?.recordCount);
      }
    
    const loadGridData = async (pageNo:any)=> {
        const payload={
            filters:[],
            paginationParameter:{pageNumber:pageNo,recordsPerPage:rowsPerPage}
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
        paginationPageSize:parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100'),
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
        // pivotMode:true,
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
