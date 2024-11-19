// import { useGetBORUIConfiguration, useBORData, useBORDataCount } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BuyerOrderReport"
import {useGetState,useGetDailyData, useGetUiConfig} from '../../../../Services/MTA/SupplyChainIntelligenceHub/BPR'
import { convertUiConfigToOptions, mapBORColorBandWiseFieldsToColDefs } from "../../../../../helpers/utils"
import { useState,useMemo, useEffect,useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"
import BPRGraphCellRenderer from "../BPR/BPRGraphCellRenderer"
import { BPRFilterState } from "../../../../types/BPR"

import { useSelector,useDispatch } from "react-redux"

import { RootState } from "../../../../../redux/store/store"
import {TOGGLE_GRAPH_MODAL,UPDATE_DAILY_DATA} from '../../../../../redux/actions/MTA';
import { type DailyDataGraph } from "../../../../types/MTA";
import { notifyError, notifyLoader} from "../../../../../helpers/notify"
import { toast } from "react-toastify"

import useBPRFilter from "../../../../../hooks/useBPRFilter";
import { defaultAgGridSideBarForBPR } from "../../../../../helpers/BPRConstants";
import { GridRef } from "../../../../types/MDM"
import { BPRSubmitRemarkCellRenderer, TextToTextColorMapper } from "../BPR/BPRCellRenderers"

import { ColDef } from "ag-grid-enterprise"
import { useGetBORColorBandWisData, useGetBORColorBandWiseRecordCount } from '../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BORColorBandWise'



export const useBORColorBandwise =()=>{

    const ref=  useRef<GridRef>()

    const tempRef = useRef()

    const [internalRef,setInternalRef] = useState<any>()

    const [editedRows,setEditedRows] = useState<Array<any>>([])

    const {state:currFilter,setState:setCurrFilter,onDelete} = useBPRFilter()


     const {mutateAsync:getUiConfig,isLoading:isBORUILoading} = useGetUiConfig();

     const dispatch = useDispatch();
   
    //  const [toggleSubGrid] = useState<boolean>(false);
     const [currGridPage,setCurrGridPage] = useState<number>(1)

     const [rowData,setRowData] = useState<Array<any>>([]);

     const [colDefs,setColDefs] = useState<Array<ColDef>>([])

     const [recordCount,setRecordCount] = useState<number>(0)

     const [currentPage,setCurrentPage] = useState(1);

     const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

     const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])
 
     const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])


     const showDailyDataGraphModal = useSelector((state:RootState) => state.mta.showDailyDataGraphModal);

     const showNormChangeHistoryTable = useSelector((state:RootState) => state.mta.showNormChangeHistoryTable);

     const dailyData = useSelector((state:RootState) => state.mta.dailyData);
    //  const rowsPerPage=50;
     const rowsPerPage = parseInt(process.env.REACT_APP_BOR_COLORBANDWISE_ROWS_PER_PAGE || '100');

     const handleChangePage = async (pageNo:any) => {
         setCurrentPage(pageNo);
         loadGridData(pageNo,currFilter);
      }


     const {mutateAsync:getData} = useGetBORColorBandWisData();

     const {mutateAsync:getDataCount} = useGetBORColorBandWiseRecordCount();

     const {mutateAsync:getDailyData} = useGetDailyData();

     const customCellRenderers = useMemo(() => ({
        grapCellRenderer:BPRGraphCellRenderer,
        submitRemarkCellRenderer:BPRSubmitRemarkCellRenderer,
        colorCellRenderer:TextToTextColorMapper
        
      }), []);

      const onCellValueChanged = (newRow: any, primaryKey: string) => {
        setEditedRows((prev) => {
          let found = false; // Flag to track if the row has been updated
          const updatedRows = prev.map((row) => {
            if (row[primaryKey] === newRow[primaryKey]) {
              found = true;
              return { ...newRow }; // Return updated row
            }
            return row; // Return unchanged row
          });
      
          if (!found) {
            // If no existing row was found, add the new row
            return [...updatedRows, {...newRow}];
          }
          return updatedRows;
        });
      };

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

      
      // const BORColumns = useMemo(()=>mapBORColorBandWiseFieldsToColDefs(data?.data.data,onOpenDailyDataGraph),[data])
      

      const {mutateAsync:getState,isLoading:isSavedDataLoading} = useGetState()

      const [gridState,setGridState] = useState<any>()

      useEffect(()=>{
        const getTableState = async()=>{
          try{
            const data =  await getState("BOR_Color_Bandwise")
            setGridState(JSON.parse(data.data.data))
          }catch(err:any){
            setGridState({
                charts:[],
                columns:[],
                pivot:false
            })
          }
        }
        getTableState()

    },[])
  
    useEffect(()=>{
      if(internalRef && gridState.columns){
        internalRef.api.applyColumnState({state:gridState.columns,applyOrder:true })
    }
    },[internalRef,gridState])

      useEffect(()=>{       
        const fetchData = async () => {
            await getRecordsCount();
            await getBORColorBandWiseUiConfig()
            await loadGridData(currentPage);


        };
        fetchData();

    }, []);


      const getRecordsCount=async(filter?:any)=>{
        const payload={
          filters:filter || {},
          paginationParameter: {
            pageNumber: currentPage,
            recordsPerPage: parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100')
          }
        }
        const resultCount=await getDataCount(payload);
        
        setRecordCount(resultCount?.data?.data[0]?.count || 0); 
      }
    
    const loadGridData = async (pageNo:any,filter?:any)=> {
        try{
          notifyLoader("loading Grid Data")
          const payload={
            filters:filter || {},
            paginationParameter:{pageNumber:pageNo,recordsPerPage:rowsPerPage}
        }
        const result = await getData(payload);
        setRowData(result.data.data)
        toast.dismiss()
        }catch(err:any){
          notifyError(err)
          setRecordCount(0)
          setRowData([])
        }

    }

    const getBORColorBandWiseUiConfig = async()=>{
      try{
          const response = await getUiConfig('BOR_OA')
          setColDefs(mapBORColorBandWiseFieldsToColDefs(response.data.data,onOpenDailyDataGraph))
      }catch(err:any){
          notifyError("Something Went Wrong")
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

     const agGridProps:AgGridReactProps = useMemo(()=>{
      return {
        tooltipShowDelay:0,
        tooltipTrigger:"focus",
        readOnlyEdit:false,
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
         sideBar:defaultAgGridSideBarForBPR,
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
           
        },
        onGridReady:(params)=>setInternalRef(params),
        onCellValueChanged:(params)=>onCellValueChanged(params.data,"SKUCode")
      }
     },[])

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
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:'BuyerOrderReport-ColorBandWise',columnKeys:ref.current?.api.getAllDisplayedColumns().map((c)=>c.getColId())});
        }
      };
      const onExportToExcelCallBack=async(pageNumber:number)=>{
        const data =  await getData({
            filters:currFilter,
            paginationParameter:{
                pageNumber:pageNumber,
                recordsPerPage:5000
            }
        })
        
        return data.data.data
    }

    const onSubmitRemarks = async()=>{
      try{
       const toastId = notifyLoader("Submitting Remark")
      //  const payload = editedRows.map((e)=>{
      //      return {
      //          remark:e.remarks,
      //          whcode:e.WHCode,
      //          skucode:e.SKUCode
      //      }
           
      //  })
      //  const {data} = await submitRemark({data:payload})
       toast.dismiss(toastId)
      //  notifySuccess(data.msg)
       setEditedRows([])
      }catch(err:any){
       notifyError(err.message)
      }
   }

      const generalFilterOptions = useMemo(()=>{
        return convertUiConfigToOptions(colDefs)
    },[colDefs])

  
     return {   
        ref,    
        isLoading :isBORUILoading,      
        colDefs,
        agGridProps,
        rowData ,
        currentPage,
        rowsPerPage,
        recordCount,
        gridState,
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
        generalFilterOptions,
        onSubmitRemarks,
        editedRows
    }
}
