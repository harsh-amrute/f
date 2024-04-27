import { useState,useMemo, useEffect, CSSProperties,useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"

import { useGetBPRData, useGetBPRUIConfiguration, useGetBPRRemarkHistory, useSubmitBPRRemark, useGetDailyData, useGetBPRDataCount,useGetState } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BPR"
import { useUserData } from "../../../../../context"
import { BPREcoColorCellRenderer,BPRRemarksCellRenderer,BPRSubmitRemarkCellRenderer,BPRTagsCellRenderer,BPRTechColorCellRenderer } from "./BPRCellRenderers"
import { mapBPRFieldsToColDefs } from "../../../../../helpers/utils"
import { notifyError, notifyLoader, notifySuccess } from "../../../../../helpers/notify"
import { toast } from "react-toastify"
import BPRGraphCellRenderer from "./BPRGraphCellRenderer"
import useViewPort from "../../../../../hooks/useViewPort"
import type { RootState } from '../../../../../redux/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {TOGGLE_GRAPH_MODAL,UPDATE_DAILY_DATA} from '../../../../../redux/actions/MTA';
import { type DailyDataGraph } from "../../../../types/MTA";


const useBPR =()=>{


    const ref = useRef()
    const tempRef = useRef()

    const {isSideBarOpen} = useUserData()
    const {getGridZoom,getScreenZoomValue} = useViewPort()
    const dispatch = useDispatch();

    const gridZoom = getGridZoom()
    const screenZoom = getScreenZoomValue() 

    const showDailyDataGraphModal = useSelector((state:RootState) => state.mta.showDailyDataGraphModal);
    const showNormChangeHistoryTable = useSelector((state:RootState) => state.mta.showNormChangeHistoryTable);
    const dailyData = useSelector((state:RootState) => state.mta.dailyData);

    const [isSubGridOpen,toggleSubGrid] = useState<boolean>(false)
    const [currGridPage,setCurrGridPage] = useState<number>(1)
    const [recordCount,setRecordCount] = useState<number>(0)
    const [activeRow,setActiveRow] = useState<any>()
    const [BPRRowData,setBPRRowData] = useState<any[]>([])


    const [submitRemarkToolTipPosition,setSubmitRemarkToolipPosition] = useState<CSSProperties>({})
    const [remarkHistoryToolipPosition,setRemarkHistoryToolipPosition] = useState<CSSProperties>({})

    const [isSubmitRemarkToolTipOpen,setIsSubmitRemarkToolTipOpen] = useState<boolean>(false)
    const [isRemarkHistoryToolTipOpen,setIsRemarkHistoryToolTipOpen] = useState<boolean>(false)
   
    const [remark,setRemark] = useState<string>('')
    const [submitRemarkData,setSubmitRemarkData] = useState({
        skucode:'',
        whcode:''
    })

    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

    const [remarkHistory,setRemarkHistory] = useState<any[]>([])
  
    const {data,isLoading:isBPRUILoading,isError} = useGetBPRUIConfiguration()
    
    const {mutateAsync:getBPRData,isLoading:isBPRDataLoading} = useGetBPRData()

    const {mutateAsync:submitRemark} = useSubmitBPRRemark()

    const {mutateAsync:getRemarkHistory} = useGetBPRRemarkHistory()

    const {mutateAsync:getDailyData} = useGetDailyData();

    const {mutateAsync:getBPRDataCount,isLoading:isBPRDataCountLoading} = useGetBPRDataCount()

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
            const data =  await getState("BPR")
            setColumnState(JSON.parse(data.data.data))
          }catch(err:any){
            setColumnState(BPRColumns)
          }
        }
        getTableState()
    },[currentGridState])
  

    useEffect(()=>{
        async function getBPRRowData(){

            try{
                const countData = await getBPRDataCount({
                    id: 1,
                    name: "",
                    fields: [],
                    filters:[],
                    paginationParameter:{
                        pageNumber:currGridPage,
                        recordsPerPage:parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50') 
                    }
                })
    
                setRecordCount(countData.data.recordCount)
    
                const rowData =await  getBPRData({
                    id: 1,
                    name: "",
                    fields: [],
                    filters:[],
                    paginationParameter:{
                        pageNumber:currGridPage,
                        recordsPerPage:parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50') 
                    }
                })
                setBPRRowData(rowData.data.data)
            }catch(err:any){
                notifyError(err)
            }
        }
        getBPRRowData()
    },[currGridPage])
  
    const customCellRenderers = useMemo(() => ({
        grapCellRenderer:BPRGraphCellRenderer,
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
        sideBar:sideBar,
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

    const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
            console.log('calledonce')
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:''});
        }
      };

    const updateRemark = (e:any)=>setRemark(e.currentTarget.value)
    

    const onSubmitRemark = async()=>{
        
        try{
            if(remark.length===0) throw new Error("Remark cannot be empty")
            const toastId = notifyLoader("Submitting Remark")
            const {data} = await submitRemark({
                remark:remark,
                whcode:submitRemarkData.whcode,
                skucode:submitRemarkData.skucode
            })
            toast.dismiss(toastId)
            // if(data.status!==200)notifyError('Something went wrong')
            
            notifySuccess(data.msg)
            setRemark('')
            
            setIsSubmitRemarkToolTipOpen(false)
        }catch(err:any){
            notifyError(err.message)
        }
    }
    

    const onCloseSubmitRemark =()=>setIsSubmitRemarkToolTipOpen(false)


    const onCloseRemarkHistory = ()=>setIsRemarkHistoryToolTipOpen(false)


    const onOpenSubmitRemark = (e:React.MouseEvent<HTMLElement>,row:any)=>{
        const {top,left} = e.currentTarget.getBoundingClientRect()
        setSubmitRemarkToolipPosition({
            top: top * gridZoom * screenZoom,
            left: left * gridZoom * screenZoom,
        })
        setSubmitRemarkData(row)
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
            SKUCode:params['SKUCode'],
            WHCode:params['WhCode']
        }
        const result = await getDailyData(payload)
        const dailyData:DailyDataGraph = {
            rowData:params.data,
            chartData:result.data.data['dailyData'],
            normChangeData:result.data.data['normChangeHistory'],
            masterData:result.data.data['MasterData'],
            suggestionData:result.data.data['SuggestionHistoryData'],
            monitoringData:result.data.data['MonitoringData']
        }

        dispatch(UPDATE_DAILY_DATA(dailyData));
        dispatch(TOGGLE_GRAPH_MODAL(true));
    }

    const onExportToExcelCallBack=async(pageNumber:number)=>{
        const data =  await getBPRData({
            id:1,
            name:'',
            fields:[],
            filters:[],
            paginationParameter:{
                pageNumber:pageNumber,
                recordsPerPage:5000
            }
        })
        
        return data.data.data
    }


    const handleOnPageChange = (pageNumber:number)=>setCurrGridPage(pageNumber)

    const rowsPerPage = useMemo(()=>parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50'),[])

    const BPRColumns = mapBPRFieldsToColDefs(data?.data.data,onOpenSubmitRemark,onOpenRemarkHistory,onOpenDailyDataGraph)

   
    return {
        isSideBarOpen,
        isSubGridOpen,
        isLoading : isBPRDataLoading || isBPRUILoading || isBPRDataCountLoading,
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
        onSubmitRemark,
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
        columnState,
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

export default useBPR