import { useGetBORUIConfiguration, useBORData, useBORDataCount } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BuyerOrderReport"
import {useGetState,useGetDailyData} from '../../../../Services/MTA/SupplyChainIntelligenceHub/BPR'
import { getColumnsForExcelExport, mapBORFieldsToColDefs } from "../../../../../helpers/utils"
import { useState,useMemo, useEffect,useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"
import {DispatchColorCellRenderer} from "./CellRenderer"
import BPRGraphCellRenderer from "../../../../Pages/MTA/SupplyChainIntelligenceHub/BPR/BPRGraphCellRenderer"
import { BPRFilterState } from "../../../../../VectorFlow/types/BPR"

import { useSelector,useDispatch } from "react-redux"

import { RootState } from "../../../../../redux/store/store"
import {TOGGLE_GRAPH_MODAL,UPDATE_DAILY_DATA} from '../../../../../redux/actions/MTA';
import { type DailyDataGraph } from "../../../../types/MTA";
import { notifyError, notifyLoader} from "../../../../../helpers/notify"
import { toast } from "react-toastify"

import useBPRFilter from "../../../../../hooks/useBPRFilter";



export const useBOR =()=>{
    const ref=  useRef()
    const tempRef = useRef()

    const {state:currFilter,setState:setCurrFilter,onDelete} = useBPRFilter()

     const {data,isLoading} = useGetBORUIConfiguration();
     const dispatch = useDispatch();
   
    //  const [toggleSubGrid] = useState<boolean>(false);
     const [currGridPage,setCurrGridPage] = useState<number>(1)

     const [rowData,setRowData] = useState([]);

     const [recordCount,setRecordCount] = useState<number>(0)
     const [currentPage,setCurrentPage] = useState(1);

     const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

     const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])
 
     const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

     const showDailyDataGraphModal = useSelector((state:RootState) => state.mta.showDailyDataGraphModal);
     const showNormChangeHistoryTable = useSelector((state:RootState) => state.mta.showNormChangeHistoryTable);
     const dailyData = useSelector((state:RootState) => state.mta.dailyData);
    //  const rowsPerPage=50;
     const rowsPerPage = parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100');
     const handleChangePage = async (pageNo:any) => {
         setCurrentPage(pageNo);
         loadGridData(pageNo,currFilter);
      }


     const {mutateAsync:getBorData} = useBORData();
     const {mutateAsync:getBorDataCount} = useBORDataCount();
     const {mutateAsync:getDailyData} = useGetDailyData();

     const customCellRenderers = useMemo(() => ({
        grapCellRenderer:BPRGraphCellRenderer,
        colorDispatchCellRenderer:DispatchColorCellRenderer,
        
      }), []);

      const onOpenDailyDataGraph = async (params:any) => {
        const payload:any = {
            SKUCode:params.data['SKUCode'],
            WHCode:params.data['WHCode']
        }
        const result = await getDailyData(payload)
        const data = result.data.data[0];
        const dailyData:DailyDataGraph = {
            rowData:params.data,
            chartData:data['StockData'],
            normChangeData:data['NormChangeHistoryData'],
            masterData:data['MasterData'][0],
            suggestionData:data['SuggestionHistoryData'] ? data['SuggestionHistoryData'] : [],
            monitoringData:data['MonitoringData']
        }
  
        dispatch(UPDATE_DAILY_DATA(dailyData));
        dispatch(TOGGLE_GRAPH_MODAL(true));
    }

      
      const BORColumns = mapBORFieldsToColDefs(data?.data.data,onOpenDailyDataGraph)
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
        ]
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
        const fetchData = async () => {
            await getRecordsCount();
            await loadGridData(currentPage);
        };
        fetchData();
    }, []);

      const getRecordsCount=async(filter?:any)=>{
            const payload={
            filters:filter || {},
             paginationParameter: {
        pageNumber: currentPage,
        // recordPerPage:20
    recordsPerPage: parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100')
    }
        }
        const resultCount=await getBorDataCount(payload);
        setRecordCount(resultCount?.data?.recordCount);
      }
    
    const loadGridData = async (pageNo:any,filter?:any)=> {

        try{
          notifyLoader("loading Grid Data")
          const payload={
            filters:filter || {},
            paginationParameter:{pageNumber:pageNo,recordsPerPage:rowsPerPage}
        }
        const result = await getBorData(payload);
        setRowData(result.data.data || [])
        toast.dismiss()
        }catch(err:any){
          notifyError(err)
          setRecordCount(0)
          setRowData([])
        }

    }

    const onApplyFilter = async(filter:any)=>{
      await getRecordsCount(filter)
      await loadGridData(1,filter)
      setCurrFilter(filter)
      setCurrentPage(1)
    }

    const onDeleteFilter = async(parentId:any, filterId:any, value:any)=>{
      const updatedFilter = onDelete(parentId,filterId,value)
      onApplyFilter(updatedFilter)
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

      const getBORRowData=async(filter:BPRFilterState)=>{
        if(filter)setCurrFilter(filter)
        try{
            if(recordCount===0 || filter){
                await getRecordsCount(filter)
                setCurrGridPage(currGridPage)
            }

            await loadGridData(currentPage,filter)
         }
       catch(err:any){
            notifyError(err)
        }
    }

      const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:'BuyerOrderReport',columnKeys:getColumnsForExcelExport(BORColumns)});
        }
      };
      const onExportToExcelCallBack=async(pageNumber:number)=>{
        const data =  await getBorData({
            filters:currFilter,
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
        onExportToExcelCallBack,
        showDailyDataGraphModal,
        showNormChangeHistoryTable,
        dailyData,
        getBORRowData,
        onApplyFilter,
        currFilter,
        setCurrFilter,
        onDeleteFilter,
    }
}
