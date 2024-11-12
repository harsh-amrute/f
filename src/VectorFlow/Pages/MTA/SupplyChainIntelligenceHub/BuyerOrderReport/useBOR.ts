import { useGetBORUIConfiguration, useBORData, useBORDataCount,useSubmitBORRemark,useGetBORRemarkHistory } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BuyerOrderReport"
import {useGetState,useGetDailyData} from '../../../../Services/MTA/SupplyChainIntelligenceHub/BPR'
import { convertUiConfigToOptions, mapBORFieldsToColDefs } from "../../../../../helpers/utils"
import { useState,useMemo, useEffect,useRef, CSSProperties } from "react"
import { AgGridReactProps } from "ag-grid-react"
import {DispatchColorCellRenderer} from "./CellRenderer"
import BPRGraphCellRenderer from "../../../../Pages/MTA/SupplyChainIntelligenceHub/BPR/BPRGraphCellRenderer"
import { BPRFilterState } from "../../../../../VectorFlow/types/BPR"

import { useSelector,useDispatch } from "react-redux"

import { RootState } from "../../../../../redux/store/store"
import {TOGGLE_GRAPH_MODAL,UPDATE_DAILY_DATA} from '../../../../../redux/actions/MTA';
import { type DailyDataGraph } from "../../../../types/MTA";
import { notifyError, notifyLoader,notifySuccess} from "../../../../../helpers/notify"
import { toast } from "react-toastify"

import useBPRFilter from "../../../../../hooks/useBPRFilter";
import { defaultAgGridSideBarForBPR } from "../../../../../helpers/BPRConstants";
import { GridRef } from "../../../../../VectorFlow/types/MDM"
import {  BPRSubmitRemarkCellRenderer } from "../BPR/BPRCellRenderers"
import useViewPort from "../../../../../hooks/useViewPort"
import { BORRemarksCellRenderer } from "./BORCellRenderers"




export const useBOR =()=>{
    const ref=  useRef<GridRef>()
    const tempRef = useRef()

    const [internalRef,setInternalRef] = useState<any>()

    const {state:currFilter,setState:setCurrFilter,onDelete} = useBPRFilter()

     const {data,isLoading:isBORUILoading} = useGetBORUIConfiguration();
     const dispatch = useDispatch();
   
     const {getGridZoom,getScreenZoomValue} = useViewPort()
 
     const gridZoom = getGridZoom()
     const screenZoom = getScreenZoomValue() 

    //  const [toggleSubGrid] = useState<boolean>(false);
     const [currGridPage,setCurrGridPage] = useState<number>(1)

     const [rowData,setRowData] = useState([]);

     const [recordCount,setRecordCount] = useState<number>(0)
     const [currentPage,setCurrentPage] = useState(1);

     const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

     const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])
 
     const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])
     const [generalFilterOptions,setGeneralFilterOptions] = useState();

     const [isSubmitRemarkToolTipOpen,setIsSubmitRemarkToolTipOpen] = useState<boolean>(false)
     const [submitRemarkToolTipPosition,setSubmitRemarkToolipPosition] = useState<CSSProperties>({})
     const [isRemarkHistoryToolTipOpen,setIsRemarkHistoryToolTipOpen] = useState<boolean>(false)
     const [remarkHistoryToolipPosition,setRemarkHistoryToolipPosition] = useState<CSSProperties>({})
     const {mutateAsync:getBORRemarkHistory} = useGetBORRemarkHistory() || {};
     const [remarkHistory,setRemarkHistory] = useState<any[]>([])
     const [editedRows,setEditedRows] = useState<Array<any>>([])
     const [remark,setRemark] = useState<string>('')

     const {mutateAsync:submitRemark} = useSubmitBORRemark() || {}




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
        submitRemarkCellRenderer:BPRSubmitRemarkCellRenderer,
        remarksCellRenderer:BORRemarksCellRenderer

        
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

    const onOpenSubmitRemark = (e:React.MouseEvent<HTMLElement>)=>{
      const {top,left} = e.currentTarget.getBoundingClientRect()
      setSubmitRemarkToolipPosition({
          top: top * gridZoom * screenZoom,
          left: left * gridZoom * screenZoom,
      })
      setIsSubmitRemarkToolTipOpen(true)

  }

  const onOpenRemarkHistory = async(e:React.MouseEvent<HTMLElement>,row:any)=>{
    try{
        setIsRemarkHistoryToolTipOpen(false)
        const toastId = notifyLoader("Getting remark history")
        const {top,left} = e.currentTarget.getBoundingClientRect()
        setRemarkHistoryToolipPosition({
            top: top *  gridZoom * screenZoom,
            left: left *  gridZoom * screenZoom,
            height:360,
            width:350
        })
        const {data} = await getBORRemarkHistory(row)
        toast.dismiss(toastId)
        setRemarkHistory(data.data)
        setIsRemarkHistoryToolTipOpen(true)
    }catch(err:any){
        notifyError(err.message)
    }
    }

    const onCellValueChanged = (newRow: any, primaryKey: string) => {
      console.log('ghsuiag')
      setEditedRows((prev:any) => {
        let found = false; // Flag to track if the row has been updated
        const updatedRows = prev.map((row:any) => {
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
    const onSubmitRemarks = async()=>{
      try{
       const toastId = notifyLoader("Submitting Remark")
       const payload = editedRows.map((e)=>{
           return {
               remark:e.remarks,
               whcode:e.WHCode,
               skucode:e.SKUCode,
               spc:e.SupplierCode
           }
           
       })
       const {data} = await submitRemark({data:payload})
       toast.dismiss(toastId)
       notifySuccess(data.msg)
       setEditedRows([])
      }catch(err:any){
       notifyError(err.message)
      }
   }

   const onCloseSubmitRemark =()=>setIsSubmitRemarkToolTipOpen(false)

   const onCloseRemarkHistory = ()=>setIsRemarkHistoryToolTipOpen(false)

   const updateRemark = (e:any)=>setRemark(e.currentTarget.value)
 
      const BORColumns = useMemo(()=>mapBORFieldsToColDefs(data?.data.data,onOpenDailyDataGraph,onOpenSubmitRemark, onOpenRemarkHistory),[data])
      const {mutateAsync:getState,isLoading:isSavedDataLoading} = useGetState()
      const [gridState,setGridState] = useState<any>()

      useEffect(()=>{
        const getTableState = async()=>{
          try{
            const data =  await getState("BOR")
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
        if(internalRef){
            console.log('in if')
            internalRef.api.applyColumnState({state:gridState.columns })
        }
    },[internalRef,gridState])

      useEffect(()=>{       
        const fetchData = async () => {
            await getRecordsCount();
            await loadGridData(currentPage);


        };
        fetchData();
        setGeneralFilterOptions(convertUiConfigToOptions(data?.data.data))

    }, [isBORUILoading]);


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
        // onGridReady:(params)=>setInternalRef(params)
        onCellValueChanged:(params)=>onCellValueChanged(params.data,"SKUCode"),
        onGridReady:(params)=>setInternalRef(params)
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
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:'BuyerOrderReport',columnKeys:ref.current?.api.getAllDisplayedColumns().map((c)=>c.getColId())});
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
        isLoading :isBORUILoading,      
        BORColumns,
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
        isSubmitRemarkToolTipOpen,
        isRemarkHistoryToolTipOpen,
        remarkHistory,
        remark,
        submitRemarkToolTipPosition,
        remarkHistoryToolipPosition,
        onSubmitRemarks,
        editedRows,
        updateRemark,
        onCloseRemarkHistory,
        onCloseSubmitRemark,

    }
}
