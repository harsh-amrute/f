import { CSSProperties, useMemo, useState,useEffect ,useRef} from "react";

import {toast} from 'react-toastify'

import useViewPort from "../../../../../hooks/useViewPort";

import { AgGridReactProps } from "ag-grid-react";
import { ColDef } from "ag-grid-enterprise";

import { BPRSubmitRemarkCellRenderer } from "../BPR/BPRCellRenderers";

import {useGetState} from '../../../../Services/MTA/SupplyChainIntelligenceHub/BPR'

import { notifyLoader,notifyError,notifySuccess } from "../../../../../helpers/notify";
import ColorCellRenderer from "./ColorCellRenderer";
import ETACellRenderer from "./ETACellRenderer";
import ShowRemarkCellRenderer from "./ShowRemarkCellRenderer";
import { useSelector } from "react-redux";

import { RootState } from "../../../../../redux/store/store";



const useOpenExpeditingRequests = () => {

    const ref = useRef()
    const tempRef = useRef()

    const [submitRemarkToolTipPosition,setSubmitRemarkToolipPosition] = useState<CSSProperties>({})
    const [remarkHistoryToolipPosition,setRemarkHistoryToolipPosition] = useState<CSSProperties>({})

    const [remark,setRemark] = useState<string>('')
    const [remarkHistory,setRemarkHistory] = useState<any[]>([])

    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

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
        etaCellRenderer:ETACellRenderer,
        colorCellRenderer:ColorCellRenderer,
        submitRemarkCellRenderer: BPRSubmitRemarkCellRenderer,
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
            setColumnState(tableColDefs)
          }
        }
        getTableState()
    },[currentGridState])

    const agGridProps: AgGridReactProps = {

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
            console.log('calledonce')
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:''});
        }
      };

    const onOpenSubmitRemark = (e: React.MouseEvent<HTMLElement>) => {
        const { top, left } = e.currentTarget.getBoundingClientRect()
        setSubmitRemarkToolipPosition({
            top: top * gridZoom * screenZoom,
            left: left * gridZoom * screenZoom,
        })
        setIsSubmitRemarkToolTipOpen(true)

    }

    const onOpenRemarkHistory = async (e: React.MouseEvent<HTMLElement>) => {
        try {
            setIsRemarkHistoryToolTipOpen(false)
            const toastId = notifyLoader("Getting remark history")
            const { top, left } = e.currentTarget.getBoundingClientRect()
            setRemarkHistoryToolipPosition({
                top: top * gridZoom * screenZoom,
                left: left * gridZoom * screenZoom,
                height: 360,
                width: 350
            })
            toast.dismiss(toastId)
            setRemarkHistory([])
            setIsRemarkHistoryToolTipOpen(true)
        } catch (err: any) {
            notifyError(err.message)
        }
    }

    const onSubmitRemark = async()=>{
        
        try{
            if(remark.length===0) throw new Error("Remark cannot be empty")
            const toastId = notifyLoader("Submitting Remark")
            // const {data} = await submitRemark({
            //     remark:"The SKU is having trouble with the order delivery please help us with suitable actions"
            // })
            toast.dismiss(toastId)
            // if(data.status!==200)notifyError('Something went wrong')
            
            notifySuccess('Remark has been submitted')
            setRemark('')
            
            setIsSubmitRemarkToolTipOpen(false)
        }catch(err:any){
            notifyError(err.message)
        }
    }

    const updateRemark = (e:any)=>setRemark(e.currentTarget.value)

    const onCloseSubmitRemark =()=>setIsSubmitRemarkToolTipOpen(false)


    const onCloseRemarkHistory = ()=>setIsRemarkHistoryToolTipOpen(false)

    const tableColDefs = useMemo((): Array<ColDef> => {
        return [
            {
                headerName: "SKU Code",
                colId: 'sc',
                field: 'sc'
            },
            {
                headerName: "Receiver Location",
                colId: 'rl',
                field: 'rl'
            },
            {
                headerName: "Sender Location",
                colId: 'sl',
                field: 'sl'
            },
            {
                headerName: "RR Qty",
                colId: 'rr',
                field: 'rr'
            },
            {
                headerName: "Recv Priority",
                colId: 'rp',
                field: 'rp',
                cellRenderer:'colorCellRenderer'
            },
            {
                headerName: "Black + Red Ageing",
                colId: 'br',
                field: 'br'
            },
            {
                headerName: "Potential Loss Per Day",
                colId: 'plpd',
                field: 'plpd'
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
                colId: 'eta',
                field: 'eta',
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
            }
        ]
    }, [])

    const onExportToExcelCallBack=async(pageNumber:number)=>{
        // const data =  await getBPRData({
        //     id:1,
        //     name:'',
        //     fields:[],
        //     filters:[],
        //     paginationParameter:{
        //         pageNumber:pageNumber,
        //         recordsPerPage:5000
        //     }
        // })
        console.log(pageNumber)
        return [
            {
              "sc": "456ZY...",
              "rl": "Mumbai, Maharashtra",
              "sl": "Delhi, Delhi",
              "rr": 2,
              "rp": "White",
              "br": "7 Days",
              "plpd": "₹ 6.2L",
              "action": "Pending",
              "eta": "2023-11-28",
              "history": ""
            },
            {
              "sc": "789WX...",
              "rl": "Bangalore, Karnataka",
              "sl": "Kolkata, West Bengal",
              "rr": 3,
              "rp": "Blue",
              "br": "14 Days",
              "plpd": "₹ 4.8L",
              "action": "Approved",
              "eta": "2023-10-05",
              "history": ""
            },
            {
              "sc": "234AB...",
              "rl": "Chennai, Tamil Nadu",
              "sl": "Hyderabad, Telangana",
              "rr": 1,
              "rp": "Red",
              "br": "5 Days",
              "plpd": "₹ 7.3L",
              "action": "Completed",
              "eta": "2023-12-20",
              "history": ""
            },
            {
                "sc": "456ZY...",
                "rl": "Mumbai, Maharashtra",
                "sl": "Delhi, Delhi",
                "rr": 2,
                "rp": "White",
                "br": "7 Days",
                "plpd": "₹ 6.2L",
                "action": "Pending",
                "eta": "2023-11-28",
                "history": ""
              },
              {
                "sc": "789WX...",
                "rl": "Bangalore, Karnataka",
                "sl": "Kolkata, West Bengal",
                "rr": 3,
                "rp": "Blue",
                "br": "14 Days",
                "plpd": "₹ 4.8L",
                "action": "Approved",
                "eta": "2023-10-05",
                "history": ""
              },
              {
                "sc": "234AB...",
                "rl": "Chennai, Tamil Nadu",
                "sl": "Hyderabad, Telangana",
                "rr": 1,
                "rp": "Red",
                "br": "5 Days",
                "plpd": "₹ 7.3L",
                "action": "Completed",
                "eta": "2023-12-20",
                "history": ""
              },
              {
                "sc": "456ZY...",
                "rl": "Mumbai, Maharashtra",
                "sl": "Delhi, Delhi",
                "rr": 2,
                "rp": "White",
                "br": "7 Days",
                "plpd": "₹ 6.2L",
                "action": "Pending",
                "eta": "2023-11-28",
                "history": ""
              },
              {
                "sc": "789WX...",
                "rl": "Bangalore, Karnataka",
                "sl": "Kolkata, West Bengal",
                "rr": 3,
                "rp": "Blue",
                "br": "14 Days",
                "plpd": "₹ 4.8L",
                "action": "Approved",
                "eta": "2023-10-05",
                "history": ""
              },
              {
                "sc": "234AB...",
                "rl": "Chennai, Tamil Nadu",
                "sl": "Hyderabad, Telangana",
                "rr": 1,
                "rp": "Red",
                "br": "5 Days",
                "plpd": "₹ 7.3L",
                "action": "Completed",
                "eta": "2023-12-20",
                "history": ""
              },
              {
                "sc": "456ZY...",
                "rl": "Mumbai, Maharashtra",
                "sl": "Delhi, Delhi",
                "rr": 2,
                "rp": "White",
                "br": "7 Days",
                "plpd": "₹ 6.2L",
                "action": "Pending",
                "eta": "2023-11-28",
                "history": ""
              },
              {
                "sc": "789WX...",
                "rl": "Bangalore, Karnataka",
                "sl": "Kolkata, West Bengal",
                "rr": 3,
                "rp": "Blue",
                "br": "14 Days",
                "plpd": "₹ 4.8L",
                "action": "Approved",
                "eta": "2023-10-05",
                "history": ""
              },
              {
                "sc": "234AB...",
                "rl": "Chennai, Tamil Nadu",
                "sl": "Hyderabad, Telangana",
                "rr": 1,
                "rp": "Red",
                "br": "5 Days",
                "plpd": "₹ 7.3L",
                "action": "Completed",
                "eta": "2023-12-20",
                "history": ""
              }
          ]
    }


    return {
        agGridProps,
        tableColDefs,
        remark,
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
        onExportToExcelCallBack
    }
}

export default useOpenExpeditingRequests