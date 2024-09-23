import { useState,useMemo, useEffect, CSSProperties,useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"

import { useGetBPRData, useGetBPRUIConfiguration, useGetBPRRemarkHistory, useSubmitBPRRemark, useGetDailyData, useGetBPRDataCount,useGetState } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BPR"
import { BPREcoColorCellRenderer,BPRRemarksCellRenderer,BPRSubmitRemarkCellRenderer,BPRTagsCellRenderer,BPRTechColorCellRenderer } from "./BPRCellRenderers"
import { getColumnsForExcelExport, mapBPRFieldsToColDefs, mapBPRRowData } from "../../../../../helpers/utils"
import { notifyError, notifyLoader, notifySuccess } from "../../../../../helpers/notify"
import { toast } from "react-toastify"
import BPRGraphCellRenderer from "./BPRGraphCellRenderer"
import useViewPort from "../../../../../hooks/useViewPort"
import type { RootState } from '../../../../../redux/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {TOGGLE_GRAPH_MODAL,UPDATE_DAILY_DATA} from '../../../../../redux/actions/MTA';
import { type DailyDataGraph } from "../../../../types/MTA";
import useBPRFilter from "../../../../../hooks/useBPRFilter"
import { useUserData } from "../../../../../context"

import { defaultAgGridSideBarForBPR } from "../../../../../helpers/BPRConstants";
import useGetlastRunData from "../../../../../hooks/useGetLastRunData"



const useBPR =()=>{


    const ref = useRef<any>()
    const tempRef = useRef()

    const [internalRef,setInternalRef] = useState<any>()

    const {getGridZoom,getScreenZoomValue} = useViewPort()
    const dispatch = useDispatch();

    const gridZoom = getGridZoom()
    const screenZoom = getScreenZoomValue() 

    const {user} = useUserData()
    const themeUi = user.user.theme_ui

    const showDailyDataGraphModal = useSelector((state:RootState) => state.mta.showDailyDataGraphModal);
    const showNormChangeHistoryTable = useSelector((state:RootState) => state.mta.showNormChangeHistoryTable);
    const dailyData = useSelector((state:RootState) => state.mta.dailyData);

    const [editedRows,setEditedRows] = useState<Array<any>>([])

    const [isSubGridOpen,toggleSubGrid] = useState<boolean>(true)
    const [currGridPage,setCurrGridPage] = useState<number>(1)
    const [recordCount,setRecordCount] = useState<number>(0)
    const [activeRow,setActiveRow] = useState<any>()
    const [BPRRowData,setBPRRowData] = useState<any[]>([])


    const [submitRemarkToolTipPosition,setSubmitRemarkToolipPosition] = useState<CSSProperties>({})
    const [remarkHistoryToolipPosition,setRemarkHistoryToolipPosition] = useState<CSSProperties>({})

    const [isSubmitRemarkToolTipOpen,setIsSubmitRemarkToolTipOpen] = useState<boolean>(false)
    const [isRemarkHistoryToolTipOpen,setIsRemarkHistoryToolTipOpen] = useState<boolean>(false)
   
    const [remark,setRemark] = useState<string>('')

    const {state:currFilter,setState:setCurrFilter,onDelete} = useBPRFilter()

    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

    const [remarkHistory,setRemarkHistory] = useState<any[]>([])
  
    const {data,isLoading:isBPRUILoading,isError} = useGetBPRUIConfiguration()

    const {date:lastRunDate} = useGetlastRunData()
    
    const {mutateAsync:getBPRData,isLoading:isRowDataLoading} = useGetBPRData()

    const {mutateAsync:submitRemark} = useSubmitBPRRemark()

    const {mutateAsync:getRemarkHistory} = useGetBPRRemarkHistory()

    const {mutateAsync:getDailyData} = useGetDailyData();

    const {mutateAsync:getBPRDataCount,isLoading:isBPRDataCountLoading} = useGetBPRDataCount()

    const {mutateAsync:getState,isLoading:isSavedDataLoading} = useGetState()
    const [gridState,setGridState] = useState<any>()


  
    useEffect(()=>{
        
        getInitialBPRRowData()
    },[])

    useEffect(()=>{
        const getTableState = async()=>{
          try{
            const data =  await getState("BPR")
            setGridState(JSON.parse(data.data.data))
          }catch(err:any){
            setGridState({
                charts:[],
                columns:BPRColumns,
                pivot:false
            })
          }
        }
        getTableState()
    },[])

    useEffect(()=>{
        if(internalRef && gridState.columns){
            internalRef.api.applyColumnState({state:gridState.columns})
        }
    },[internalRef,gridState])
  
    const customCellRenderers = useMemo(() => ({
        grapCellRenderer:BPRGraphCellRenderer,
        colorTechCellRenderer:BPRTechColorCellRenderer,
        colorEcoCellRenderer:BPREcoColorCellRenderer,
        tagsCellRenderer:BPRTagsCellRenderer,
        submitRemarkCellRenderer:BPRSubmitRemarkCellRenderer,
        remarksCellRenderer:BPRRemarksCellRenderer
      }), []);

  
    const agGridProps:AgGridReactProps = useMemo(()=>{

        return {
        
            suppressRowTransform:true,
            tooltipShowDelay:0.3,
            tooltipTrigger:'focus',
            tooltipInteraction:true,
            // rowSelection:'single',
            readOnlyEdit:false,
            sideBar:defaultAgGridSideBarForBPR,
            paginationPageSize:parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50'),
            onRowClicked:(params:any)=>{
                if(params.data.intransit && params.data.intransit.length>0){
                    setActiveRow(params.data.intransit)
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
            suppressRowClickSelection:true,
            components:customCellRenderers,
            defaultColDef:{
                floatingFilter: true,
                // filter: "agMultiColumnFilter",
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
            },
            onCellValueChanged:(params)=>onCellValueChanged(params.data,"SKUCode"),
            onGridReady:(params)=>setInternalRef(params)
        }
    },[])


    const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:'BufferPenetrationReport',columnKeys:getColumnsForExcelExport(BPRColumns)});
        }
      };

      const getInitialBPRRowData=async()=>{
        try{
            await getBPRRecordCount(currFilter)
            await getBPRRowData(currFilter,1)
        }catch(err:any){
            notifyError(err)
        }
    }

    const getBPRRecordCount = async(filter:any)=>{
        const countData = await getBPRDataCount({
            id: 1,
            name: "",
            fields: [],
            filters:filter,
            paginationParameter:{
                pageNumber:currGridPage,
                recordsPerPage:parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50') 
            }
        })

        setRecordCount(countData.data.recordCount)
    }

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

    const getBPRRowData = async(filter:any,pageNo:number)=>{
        notifyLoader("Loading Grid Data")
        const rowData =await  getBPRData({
            id: 1,
            name: "",
            fields: [],
            filters:filter,
            paginationParameter:{
                pageNumber:pageNo,
                recordsPerPage:parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50') 
            }
        })
        toast.dismiss()
        if(rowData.data.data && Array.isArray(rowData.data.data))setBPRRowData(mapBPRRowData(rowData.data.data))
        else setBPRRowData([])
        
    }

    const updateRemark = (e:any)=>setRemark(e.currentTarget.value)
    

    // const onSubmitRemark = async()=>{
        
    //     try{
    //         if(remark.length===0) throw new Error("Remark cannot be empty")
    //         const toastId = notifyLoader("Submitting Remark")
    //         const {data} = await submitRemark({
    //             remark:remark,
    //             whcode:submitRemarkData.whcode,
    //             skucode:submitRemarkData.skucode
    //         })
    //         toast.dismiss(toastId)
    //         // if(data.status!==200)notifyError('Something went wrong')
            
    //         notifySuccess(data.msg)
    //         setRemark('')
            
    //         setIsSubmitRemarkToolTipOpen(false)
    //     }catch(err:any){
    //         notifyError(err.message)
    //     }
    // }

    const onSubmitRemarks = async()=>{
       try{
        const toastId = notifyLoader("Submitting Remark")
        const payload = editedRows.map((e)=>{
            return {
                remark:e.remarks,
                whcode:e.WHCode,
                skucode:e.SKUCode
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
            const {data} = await getRemarkHistory(row)
            toast.dismiss(toastId)
            setRemarkHistory(data.data)
            setIsRemarkHistoryToolTipOpen(true)
        }catch(err:any){
            notifyError(err.message)
        }
    }

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

    const onExportToExcelCallBack=async(pageNumber:number)=>{
        const data =  await getBPRData({
            id:1,
            name:'',
            fields:[],
            filters:currFilter,
            paginationParameter:{
                pageNumber:pageNumber,
                recordsPerPage:5000
            }
        })
        
        return data.data.data
    }


    const handleOnPageChange = async(pageNumber:number)=>{
        setCurrGridPage(pageNumber)
        await getBPRRowData(currFilter,pageNumber)
    }

    const onApplyFilter = (filter:any)=>{
        setCurrFilter(filter)
        getBPRRecordCount(filter)
        setCurrGridPage(1)
        getBPRRowData(filter,1)
    }

    const onDeleteFilter = async(parentId:any, filterId:any, value:any)=>{
        const updatedFilter = onDelete(parentId,filterId,value)
        onApplyFilter(updatedFilter)
    }

    const rowsPerPage = useMemo(()=>parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50'),[])

    const BPRColumns =useMemo(()=>mapBPRFieldsToColDefs(data?.data.data,onOpenSubmitRemark,onOpenRemarkHistory,onOpenDailyDataGraph),[data])



   
    return {
        isSubGridOpen,
        isLoading :  isBPRUILoading || isBPRDataCountLoading,
        isError,
        activeRow,
        BPRColumns,
        BPRRowData,
        agGridProps,
        remark,
        remarkHistory,
        isRemarkHistoryToolTipOpen,
        remarkHistoryToolipPosition,
        isSubmitRemarkToolTipOpen,
        submitRemarkToolTipPosition,
        updateRemark,
        setIsSubmitRemarkToolTipOpen,
        setSubmitRemarkToolipPosition,
        toggleSubGrid,
        setActiveRow,
        onSubmitRemarks,
        onCloseRemarkHistory,
        onCloseSubmitRemark,
        dailyData,
        showDailyDataGraphModal,      
        handleOnPageChange,       
        recordCount,
        currGridPage,
        rowsPerPage,
        showNormChangeHistoryTable,
        ref,
        isSavedDataLoading,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        getBPRRowData,
        onExportToExcelCallBack,
        currFilter,
        onDelete,
        setCurrFilter,
        onApplyFilter,
        themeUi,
        editedRows,
        onDeleteFilter,
        isRowDataLoading,
        gridState,
        lastRunDate
    }
}

export default useBPR