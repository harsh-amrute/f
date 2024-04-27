import { useGetBORUIConfiguration, useBORData, useBORDataCount } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BuyerOrderReport"
import {useGetState} from '../../../../Services/MTA/SupplyChainIntelligenceHub/BPR'
import { mapBORFieldsToColDefs } from "../../../../../helpers/utils"
import { useState,useMemo, useEffect,useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"
import {DispatchColorCellRenderer} from "./CellRenderer"
import { SeasonalityGraphCellRenderer } from "../../../../../components/VectorFLOW/commons/SeasonalityCellRenderers"

import { useSelector } from "react-redux"

import { RootState } from "../../../../../redux/store/store"

export const useBOR =()=>{
    const ref=  useRef()
    const tempRef = useRef()
     //const [activeRow,setActiveRow] = useState<any>()
     const {data} = useGetBORUIConfiguration();
   
    // const [isSubGridOpen,toggleSubGrid] = useState<boolean>(false);
     const [rowData,setRowData] = useState([]);

     const [recordCount,setRecordCount] = useState<number>(0)
     const [currentPage,setCurrentPage] = useState(1);

     const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

     const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])
 
     const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])
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

      const {mutateAsync:getState,isLoading:isSavedDataLoading} = useGetState()
    const [columnState,setColumnState] = useState<any>()
    const {currentGridState} = useSelector((state:RootState)=>state.mta)

    const sideBar = {
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


    useEffect(()=>{
        const getTableState = async()=>{
          try{
            const data =  await getState("BOR")
            setColumnState(JSON.parse(data.data.data))
          }catch(err:any){
            setColumnState(BORColumns)
          }
        }
        getTableState()
    },[currentGridState])

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
         sideBar:sideBar,
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

      const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:''});
        }
      };
      console.log(columnState)
      const onExportToExcelCallBack=async(pageNumber:number)=>{
        const data =  await getBorData({
            filters:[],
            paginationParameter:{
                pageNumber:pageNumber,
                recordsPerPage:5000
            }
        })
        
        return data.data.data
    }

     return {   
        ref,    
        isLoading,      
        BORColumns,
        agGridProps,
        rowData ,
        currentPage,
        rowsPerPage,
        recordCount,
        columnState,
        isSavedDataLoading,
        handleChangePage,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        onExportToExcelCallBack 
    }
}
