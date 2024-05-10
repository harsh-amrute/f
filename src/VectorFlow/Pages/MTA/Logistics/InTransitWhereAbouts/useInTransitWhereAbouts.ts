
import { CSSProperties, useMemo, useState,useEffect ,useRef} from "react";

import {toast} from 'react-toastify'

import useViewPort from "../../../../../hooks/useViewPort";

import { AgGridReactProps } from "ag-grid-react";


import {useGetState} from '../../../../Services/MTA/SupplyChainIntelligenceHub/BPR'

import { notifyLoader,notifyError,notifySuccess } from "../../../../../helpers/notify";
import ETACellRenderer from "../../SupplyChainIntelligenceHub/OpenExpeditingRequests/ETACellRenderer";
import ShowRemarkCellRenderer from "../../SupplyChainIntelligenceHub/OpenExpeditingRequests/ShowRemarkCellRenderer";
import { useSelector } from "react-redux";

import { RootState } from "../../../../../redux/store/store";
import { useAddRemarkForExpedite, useGetOpenExpediteRequestData, useGetRemarkDetailsForExpedite } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/OpenExpeditingRequests";
import SubmitRemarkCellRenderer from "../../SupplyChainIntelligenceHub/OpenExpeditingRequests/SubmitRemarkCellRenderer";
import MasterDetail from "./MasterDetail";
import { ColorGroupCellRenderer, CurrentLocationCellRenderer } from "./CellRenderers";
import { GetInTransitWhereAboutsMockResponse } from "../../../../../mock-data/BPR";
import { mapInTransitWhereAboutsRowData } from "../../../../../helpers/utils";

const useInTransitWhereAbouts = ()=>{
    const ref = useRef()
    const tempRef = useRef()

    const {data,isLoading} = useGetOpenExpediteRequestData()
    const {mutateAsync:addRemark} = useAddRemarkForExpedite()
    const {mutateAsync:getRemark} = useGetRemarkDetailsForExpedite()

    const [submitRemarkToolTipPosition,setSubmitRemarkToolipPosition] = useState<CSSProperties>({})
    const [remarkHistoryToolipPosition,setRemarkHistoryToolipPosition] = useState<CSSProperties>({})

    const [remark,setRemark] = useState<string>('')
    const [activeRow,setActiveRow] = useState<any>({
      sc:'',
      wc:''
    })
    const [remarkHistory,setRemarkHistory] = useState<any[]>([])

    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

    const [isContactModalOpen,toggleContactModal] = useState<boolean>(false)

    const [currentUserDetails,setCurrentUserDetails] = useState<any>({
      name:"",
      phone:"",
      email:""
  })

    const [isSubmitRemarkToolTipOpen,setIsSubmitRemarkToolTipOpen] = useState<boolean>(false)
    const [isRemarkHistoryToolTipOpen,setIsRemarkHistoryToolTipOpen] = useState<boolean>(false)

    const { getGridZoom, getScreenZoomValue } = useViewPort()

    const gridZoom = getGridZoom()
    const screenZoom = getScreenZoomValue()

    const customCellRenderers = useMemo(() => ({
        // grapCellRenderer:BPRGraphCellRenderer,
        // colorTechCellRenderer:BPRTechColorCellRenderer,
        // colorEcoCellRenderer:BPREcoColorCellRenderer,
        // tagsCellRenderer:BPRTagsCellRenderer,
        currentLocationCellRenderer:CurrentLocationCellRenderer,
        etaCellRenderer:ETACellRenderer,
        colorCellRenderer:ColorGroupCellRenderer,
        submitRemarkCellRenderer: SubmitRemarkCellRenderer,
        remarksCellRenderer: ShowRemarkCellRenderer
    }), []);

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
            const data =  await getState("OpenExpeditingRequests")
            setColumnState(JSON.parse(data.data.data))
          }catch(err:any){
            setColumnState(colDefs)
          }
        }
        getTableState()
    },[currentGridState])

    

    const agGridProps: AgGridReactProps = {
      icons:{
        groupExpanded: '<img src="/assets/img/VectorFLOW/BPR/intransit-where-abouts-minus.svg" style="width: 20px; height: 20px;">',
        groupContracted:'<img src="/assets/img/VectorFLOW/BPR/intransit-where-abouts-plus.svg" style="width: 20px; height: 20px;">'
      },
      masterDetail:true,
      detailCellRenderer:MasterDetail,
      detailCellRendererParams:{
        onContactDetails:onOpenContactModal
      },
      detailRowAutoHeight:true,
      // detailCellRendererParams:{
      //   detailGridOptions: {
      //     columnDefs: [{ field: 'detailData' }],
      //   },
      //   getDetailRowData: function(params:any) {
      //     params.successCallback([1,2,3,4,5,5,3,23,2,5,2,2]);
      //   },
      //   pagination: true
      // },
        suppressRowTransform: true,
        tooltipShowDelay: 0.3,
        tooltipTrigger: 'focus',
        tooltipInteraction: true,
        // rowSelection:'single',
        readOnlyEdit: true,
        gridOptions: {
            rowHeight: 50,
            getRowStyle: (params: any) => {
                if (params.node.rowIndex % 2 === 0) {
                    return { background: "#EBEBEB" };
                }
                return { background: "#F7F7F7" };
            },
        },
        sideBar:sideBar,
        pagination: true,
        suppressRowClickSelection: true,
        components: customCellRenderers,
        defaultColDef: {
            floatingFilter: true,
            filter: "agMultiColumnFilter",
            cellDataType: false,
            resizable: false,
            minWidth:140,
            cellStyle: {
              "text-align": "center",
              'text-overflow':'ellipsis',
              'white-space':'nowrap'
            },
            flex: 1,
        }
    }

    const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:''});
        }
      };

    const onOpenSubmitRemark = (e: React.MouseEvent<HTMLElement>,data:any) => {
        setActiveRow(data)
        const { top, left } = e.currentTarget.getBoundingClientRect()
        setSubmitRemarkToolipPosition({
            top: top * gridZoom * screenZoom,
            left: left * gridZoom * screenZoom,
        })
        setIsSubmitRemarkToolTipOpen(true)

    }

    const onOpenRemarkHistory = async (e: React.MouseEvent<HTMLElement>,data:any) => {
        try {
            setIsRemarkHistoryToolTipOpen(false)
            const toastId = notifyLoader("Getting remark history")
            const { top, left } = e.currentTarget.getBoundingClientRect()
            const remarkData = await getRemark({
              whcode:data.wc,
              skucode:data.sc
            })
            setRemarkHistoryToolipPosition({
                top: top * gridZoom * screenZoom,
                left: left * gridZoom * screenZoom,
                height: 360,
                width: 350
            })
            toast.dismiss(toastId)
            setRemarkHistory(remarkData.data.data)
            setIsRemarkHistoryToolTipOpen(true)
        } catch (err: any) {
            notifyError(err.message)
        }
    }

    const onSubmitRemark = async()=>{
        try{
            if(remark.length===0) throw new Error("Remark cannot be empty")
            const toastId = notifyLoader("Submitting Remark")
            await addRemark({
                sc:activeRow.sc,
                wc:activeRow.wc,
                remark:remark
            })
            toast.dismiss(toastId)
            
            notifySuccess('Remark has been submitted')
            setRemark('')
            setActiveRow({
              sc:'',
              wc:''
            })
            
            setIsSubmitRemarkToolTipOpen(false)
        }catch(err:any){
            notifyError(err.message)
        }
    }

    const updateRemark = (e:any)=>setRemark(e.currentTarget.value)

    const onCloseSubmitRemark =()=>setIsSubmitRemarkToolTipOpen(false)


    const onCloseRemarkHistory = ()=>setIsRemarkHistoryToolTipOpen(false)

    function onOpenContactModal(data:any){
      setCurrentUserDetails(data)
      toggleContactModal(true)
    }

    function onCloseContactModal(){
      setCurrentUserDetails({
        name:'',
        phone:'',
        email:''
      })
      toggleContactModal(false)
    }

    const rowData = mapInTransitWhereAboutsRowData(GetInTransitWhereAboutsMockResponse.data)
  
      
      

    const colDefs = useMemo(()=>{
       return [
      {
        headerName: "Order No",
        colId: 'OrderNo',
        field: 'OrderNo',
        floatingFilter:false,
        cellRenderer: 'agGroupCellRenderer'
    },
    {
        headerName: "Dispath Date",
        colId: 'DispatchDate',
        field: 'DispatchDate',
        floatingFilter:false
    },
    {
        headerName: "Delay Beyond SLA",
        colId: 'dbs',
        field: 'dbs',
        floatingFilter:false
    },
    {
        headerName: "QTY",
        colId: 'Qty',
        field: 'Qty',
        floatingFilter:false
    },
    {
        headerName: "Current Loc",
        colId: 'CurrentLoc',
        field: 'CurrentLoc',
        floatingFilter:false,
        cellRenderer:'currentLocationCellRenderer'
    },
    {
        headerName: "On-Hand Inventory penetration",
        colId: 'on_hand_penetration',
        field: 'on_hand_penetration',
        cellRenderer:'colorCellRenderer',
        floatingFilter:false
    },
    {
        headerName: "Action",
        colId: 'action',
        field: 'action',
        cellRenderer: 'submitRemarkCellRenderer',
        cellRendererParams:{
            onClick:onOpenSubmitRemark
        },
        floatingFilter:false
    },
      {
        headerName: "ETA",
        colId: 'ETA',
        field: 'ETA',
        cellRenderer:'etaCellRenderer',
        floatingFilter:false
    },
      {
          headerName: "",
          colId: 'history',
          field: 'history',
          cellRenderer:'remarksCellRenderer',
          cellRendererParams:{
              onClick:onOpenRemarkHistory
          },
          floatingFilter:false,
          maxWidth:70
      }]
    },[])

    return {
        agGridProps,
        rowData,
        colDefs,
        remark,
        isLoading,
        remarkHistory,
        isSubmitRemarkToolTipOpen,
        isRemarkHistoryToolTipOpen,
        submitRemarkToolTipPosition,
        remarkHistoryToolipPosition,
        updateRemark,
        onSubmitRemark,
        onCloseSubmitRemark,
        onCloseRemarkHistory,
        ref,columnState,
        isSavedDataLoading,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        isContactModalOpen,
        onOpenContactModal,
        currentUserDetails,
        onCloseContactModal
    }
}

export default useInTransitWhereAbouts