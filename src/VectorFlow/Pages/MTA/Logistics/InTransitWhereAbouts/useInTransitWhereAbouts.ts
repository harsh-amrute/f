
import { CSSProperties, useMemo, useState,useEffect ,useRef} from "react";

import {toast} from 'react-toastify'


import { AgGridReactProps } from "ag-grid-react";



import { notifyLoader,notifyError,notifySuccess } from "../../../../../helpers/notify";
import ShowRemarkCellRenderer from "../../SupplyChainIntelligenceHub/OpenExpeditingRequests/ShowRemarkCellRenderer";

import SubmitRemarkCellRenderer from "../../SupplyChainIntelligenceHub/OpenExpeditingRequests/SubmitRemarkCellRenderer";
import MasterDetail from "./MasterDetail";
import { ColorGroupCellRenderer, CurrentLocationCellRenderer, ETACellRenderer } from "./CellRenderers";
import { getColumnsForExcelExport, mapInTransitWhereAboutsRowData, mapSubmitRemarkData } from "../../../../../helpers/utils";
import { useGetInTransitWhereAboutsData, useGetInTransitWhereAboutsDataCount,useGetRemarkDetailsForInTransit, useGetTransporterDetails, useSubmitRemarksForInTransit } from "../../../../../VectorFlow/Services/MTA/Logistics/InTransitWhereAbouts";
import useBPRFilter from "../../../../../hooks/useBPRFilter";
import { useUserData } from "../../../../../context";
import { ColDef } from "ag-grid-enterprise";
import { defaultAgGridSideBarForBPR } from "../../../../../helpers/BPRConstants";
import { useGetState } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";





const useInTransitWhereAbouts = ()=>{
    const ref = useRef()
    const tempRef = useRef()

    const {user} = useUserData()

    const [internalRef,setInternalRef] = useState<any>()

    const [gridState,setGridState] = useState<any>()

    const themeUi = user.user.theme_ui

    const {mutateAsync:getDataCount,isLoading:isCountLoading} = useGetInTransitWhereAboutsDataCount()

    const {mutateAsync:getData,isLoading:isDataLoading} = useGetInTransitWhereAboutsData()

    const {mutateAsync:getRemarkDetails} = useGetRemarkDetailsForInTransit()

    const {mutateAsync:submitRemark} = useSubmitRemarksForInTransit()

    const {mutateAsync:getTransporterDetails} = useGetTransporterDetails()

    const {state:currentFilter,setState:setCurrFilter,onDelete} = useBPRFilter()

    const [submitRemarkToolTipPosition,setSubmitRemarkToolipPosition] = useState<CSSProperties>({})

    const [submitETAToolTipPosition,setSubmitETAToolipPosition] = useState<CSSProperties>({})

    const [submitCurrentLocationToolTipPosition,setSubmitCurrentLocationToolipPosition] = useState<CSSProperties>({})

    const [rowData,setRowData] = useState<Array<any>>([])

    const [editedRows,setEditedRows] = useState<Array<any>>([])

    const [recordCount,setRecordCount] = useState<number>(0)

    const [currentPage,setCurrentPage] = useState<number>(1)

    const [remark,setRemark] = useState<string>('')

    const [etaValue,setETAValue] = useState<string>('')

    const [currentLocationValue,setCurrentLocationValue] = useState<string>('')

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
    const [isSubmitETAToolTipOpen,setIsSubmitETAToolTipOpen] = useState<boolean>(false)
    const [isSubmitCurrentLocationTipOpen,setIsSubmitCurrentLocationToolTipOpen] = useState<boolean>(false)
    const [isRemarkHistoryToolTipOpen,setIsRemarkHistoryToolTipOpen] = useState<boolean>(false)



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

    const {mutateAsync:getState} = useGetState()
    // const [columnState,setColumnState] = useState<any>()
    // const {currentGridState} = useSelector((state:RootState)=>state.mta)

    // useEffect(()=>{
    //     const getTableState = async()=>{
    //       try{
    //         const data =  await getState("OpenExpeditingRequests")
    //         setColumnState(JSON.parse(data.data.data))
    //       }catch(err:any){
    //         setColumnState(colDefs)
    //       }
    //     }
    //     getTableState()
    //     getRowData(currentFilter,1)
    // },[currentGridState])

    useEffect(()=>{
      const getInitialData =async()=>{
        await getRecordCount(currentFilter)
        await getRowData(currentFilter,1)
      }
      getInitialData()
    },[]) 

    useEffect(()=>{
      const getTableState = async()=>{
        try{
          const data =  await getState("InTransitWhereAbouts")
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
          internalRef.api.applyColumnState({state:gridState.columns })
      }
  },[internalRef,gridState])
    

    const agGridProps: AgGridReactProps =useMemo(()=>{
      return  {
        readOnlyEdit:false,
        icons:{
          groupExpanded: `<img src=${themeUi==="REGALBLAZE"?"/assets/img/VectorFLOW/BPR/intransit-where-abouts-minus-regal.svg":"/assets/img/VectorFLOW/BPR/intransit-where-abouts-minus.svg"} style="width: 20px; height: 20px;">`,
          groupContracted:`<img src=${themeUi==="REGALBLAZE"?"/assets/img/VectorFLOW/BPR/intransit-where-abouts-plus-regal.svg":"/assets/img/VectorFLOW/BPR/intransit-where-abouts-plus.svg"} style="width: 20px; height: 20px;">`
        },
        masterDetail:true,
        detailRowHeight:500,
        detailCellRenderer:MasterDetail,
        detailCellRendererParams:{
          onContactDetails:onOpenContactModal
        },
        // detailRowAutoHeight:true,
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
          gridOptions: {
              animateRows:true,
              rowHeight: 50,
              getRowStyle: (params: any) => {
                  if (params.node.rowIndex % 2 === 0) {
                      return { background: "#EBEBEB" };
                  }
                  return { background: "#F7F7F7" };
              },
              readOnlyEdit:true
          },
          
          sideBar:defaultAgGridSideBarForBPR,
          // suppressRowClickSelection: true,
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
          },
          enableRangeSelection:true ,
          rowSelection:"multiple",
          // onPasteEnd:(params)=>console.log(params),
          // enableGroupEdit:true,
          statusBar : {
              statusPanels: [
                { statusPanel: 'agTotalAndFilteredRowCountComponent', align:'left' },
                { statusPanel: 'agTotalRowCountComponent', align:'left' },
                { statusPanel: 'agFilteredRowCountComponent', align:'left' },
                { statusPanel: 'agSelectedRowCountComponent', align:'left' },
                { statusPanel: 'agAggregationComponent', align:'left' },
              ],
            },
            onCellValueChanged:(params)=>onCellValueChanged(params.data,"OrderNo"),
            onGridReady:(params)=>setInternalRef(params)
      }
    },[])

    const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:'InTransitWhereAbouts',columnKeys:getColumnsForExcelExport(colDefs)});
        }
      };


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
    const getRecordCount = async(filter:any)=>{
      try{
        const payload = {
          "id": 0,
          "name": "",
          "fields": [],
          "paginationParameter": {
            "pageNumber": 0,
            "recordsPerPage": 0
          },
          filters:filter
        }
        const countData = await getDataCount(payload)
        const count= JSON.parse(countData.data.recordCount)
        setRecordCount(count)
      }catch(err:any){
        notifyError(err)
      }
    }

    const getRowData = async(filter:any,pageNo:number)=>{
      const payload = {
        "id": 0,
        "name": "",
        "fields": [],
        "paginationParameter": {
          pageNumber:pageNo,
          recordsPerPage:100
        },
        filters:filter
      }
      const data = await getData(payload)
      setRowData(mapInTransitWhereAboutsRowData(data.data.data))
      // setRowData(mapInTransitWhereAboutsRowData(GetInTransitWhereAboutsMockResponse.data))
    }

    const handlePageChange = async(pageNo:number)=>{
      setEditedRows([])
      const payload = {
        "id": 0,
        "name": "",
        "fields": [],
        "paginationParameter": {
          pageNumber:pageNo,
          recordsPerPage:100
        },
        filters:currentFilter
      }
      const data = await getData(payload)
      setCurrentPage(pageNo)
      setRowData(mapInTransitWhereAboutsRowData(data.data.data))
    }

    const onOpenSubmitRemark = (e: React.MouseEvent<HTMLElement>,data:any) => {
      setIsSubmitETAToolTipOpen(false)
      setIsSubmitCurrentLocationToolTipOpen(false)
        setActiveRow(data)
        const { top, left } = e.currentTarget.getBoundingClientRect()
        setSubmitRemarkToolipPosition({
            top: top,
            left: left
    })
        setIsSubmitRemarkToolTipOpen(true)

    }

    const onOpenSubmitETA = (e: React.MouseEvent<HTMLInputElement>,data:any) => {
      setIsSubmitCurrentLocationToolTipOpen(false)
      setIsSubmitRemarkToolTipOpen(false)
      setActiveRow(data)
      setETAValue(e.currentTarget.value)
      const { top, left } = e.currentTarget.getBoundingClientRect()
      setSubmitETAToolipPosition({
          top: top ,
          left: left 
      })
      setIsSubmitETAToolTipOpen(true)

  }

  const onOpenSubmitCurrentLocation = (e: React.MouseEvent<HTMLInputElement>,data:any) => {
    setIsSubmitRemarkToolTipOpen(false)
    setIsSubmitETAToolTipOpen(false)
    setActiveRow(data)
    setCurrentLocationValue(e.currentTarget.value)
    const { top, left } = e.currentTarget.getBoundingClientRect()
    setSubmitCurrentLocationToolipPosition({
        top: top ,
        left: left 
    })
    setIsSubmitCurrentLocationToolTipOpen(true)

}

    const onOpenRemarkHistory = async (e: React.MouseEvent<HTMLElement>,data:any) => {
      console.debug(e,data)
        try {
            setIsRemarkHistoryToolTipOpen(false)
            const toastId = notifyLoader("Getting remark history")
            const remarkData = await getRemarkDetails({
              orderNo:data.OrderNo
            })
            toast.dismiss(toastId)
          //   setRemarkHistory([
          //     {
          //         name:'JP',
          //         remark:"Moved from Mumbai and Reached Nagpur",
          //         date:'2023 - 09 - 20 | 12 pm',
          //         eta:'2024-05-07',
          //         currentLocation:'Pune'
          //     },
          //     {
          //         name:'RT',
          //         remark:"Moved from Mumbai and Reached Nagpur",
          //         date:'2023 - 09 - 20 | 12 pm',
          //         eta:'2024-05-07',
          //         currentLocation:'Mumbai'
          //     },
          //     {
          //         name:'MD',
          //         remark:"Moved from Mumbai and Reached Nagpur",
          //         date:'2023 - 09 - 20 | 12 pm',
          //         eta:'2024-05-07',
          //         currentLocation:'Delhi'
          //     },
          //     {
          //         name:'AF',
          //         remark:"Moved from Mumbai and Reached Nagpur",
          //         date:'2023 - 09 - 20 | 12 pm',
          //         eta:'2024-05-07',
          //         currentLocation:'Pune'
          //     },
          //     {
          //         name:'FD',
          //         remark:"Moved from Mumbai and Reached Nagpur",
          //         date:'2023 - 09 - 20 | 12 pm',
          //         eta:'2024-05-07',
          //         currentLocation:'Mumbai'
          //     },
          //     {
          //         name:'AF',
          //         remark:"Moved from Mumbai and Reached Nagpur",
          //         date:'2023 - 09 - 20 | 12 pm',
          //         eta:'2024-05-07',
          //         currentLocation:'Delhi'
          //     }
          // ])
          setRemarkHistory(remarkData.data.data)
            setIsRemarkHistoryToolTipOpen(true)
        } catch (err: any) {
            notifyError(err.message)
        }
    }

    const onSubmitRemark = async()=>{
        try{
            if(remark.length===0) throw new Error("Remark Cannot Be Empty")
            const toastId = notifyLoader("Submitting Remark")
            await submitRemark(mapSubmitRemarkData({...activeRow,remark:remark}))
            toast.dismiss(toastId)
            
            notifySuccess('Remark Has Been Submitted')
            setRemark('')
            setActiveRow({})
            
            setIsSubmitRemarkToolTipOpen(false)
        }catch(err:any){
            notifyError(err.message)
        }
    }

    const onSubmitCurrentLocation = async()=>{
        try{
            if(currentLocationValue.length===0) throw new Error("Location Cannot Be Empty")
            const toastId = notifyLoader("Submitting Data")
            await submitRemark(mapSubmitRemarkData({...activeRow,CurrentLoc:currentLocationValue}))
            toast.dismiss(toastId)
            
            notifySuccess('Data Has Been Submitted')
            setRemark('')
            setActiveRow({})
            
            setIsSubmitCurrentLocationToolTipOpen(false)
        }catch(err:any){
            notifyError(err.message)
        }
    }

    const onSubmitETA = async()=>{
      try{
          if(etaValue.length===0) throw new Error("ETA Cannot Be Empty")
          const toastId = notifyLoader("Submitting Data")
          await submitRemark(mapSubmitRemarkData({...activeRow,ETA:etaValue}))
          toast.dismiss(toastId)
          
          notifySuccess('Data Has Been Submitted')
          setRemark('')
          setActiveRow({})
          
          setIsSubmitETAToolTipOpen(false)
      }catch(err:any){
          notifyError(err.message)
      }
  }


    const updateRemark = (e:any)=>setRemark(e.currentTarget.value)

    const onCloseSubmitRemark =()=>setIsSubmitRemarkToolTipOpen(false)

    const onCloseSubmitETA = ()=>setIsSubmitETAToolTipOpen(false)

    const onCloseSubmitCurentLocation = ()=>setIsSubmitCurrentLocationToolTipOpen(false)

    const onCloseRemarkHistory = ()=>setIsRemarkHistoryToolTipOpen(false)

    async function onOpenContactModal (params:any){
      console.log(params)

     try{
      notifyLoader("Loading Details")
      const contactData = await getTransporterDetails({orderNo:params["OrderNo"]})
      if(contactData.data.data[0]){
        setCurrentUserDetails(contactData.data.data[0])
        toggleContactModal(true)
        
        notifySuccess('Data Loaded Successfully')
      }else{
        toast.dismiss()
        notifyError("Contact Details Not Found")
      }
     }catch(err:any){
      notifyError(err)
     }
    }

    function onCloseContactModal(){
      // setCurrentUserDetails({
      //   name:'',
      //   phone:'',
      //   email:''
      // })
      toggleContactModal(false)
    }

  
    const onApplyFilter = async(filter:any)=>{
      setEditedRows([])
      setCurrFilter(filter)
      setCurrentPage(1)
      await(getRecordCount(filter))
      await getRowData(filter,1)
      

    }

    const onDeleteFilter = async(parentId:any, filterId:any, value:any)=>{
      const updatedFilter = onDelete(parentId,filterId,value)
      onApplyFilter(updatedFilter)
  }

    const onExportToExcelCallBack = async(pageNo:number)=>{
      const payload = {
        "id": 0,
        "name": "",
        "fields": [],
        "paginationParameter": {
          pageNumber:pageNo,
          recordsPerPage:5000
        },
        filters:currentFilter
      }
      const data = await getData(payload)
      return data.data.data
    }
      
    const onSubmitEditedRows = async()=>{
      notifyLoader('Submitting data')
      console.log(editedRows)
     try{
      const payload = editedRows.map((r)=>{
        return mapSubmitRemarkData(r)
      })
      await submitRemark({data:payload})
      toast.dismiss()
      setEditedRows([])
     }catch(err){
      notifyError("Something went wrong")
     }
    }
      

    const colDefs = useMemo(():ColDef[]=>{
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
        cellRenderer:'currentLocationCellRenderer',
        cellRendererParams:{
          onClick:onOpenSubmitCurrentLocation
      },
      editable:true
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
        floatingFilter:false,
        editable:true
    },
      {
        headerName: "ETA",
        colId: 'ETA',
        field: 'ETA',
        cellRenderer:'etaCellRenderer',
        cellRendererParams:{
          onClick:onOpenSubmitETA
        },
        floatingFilter:false,
        editable:true,
        cellDataType:'dateString'
    },
      {
          headerName: "",
          colId: 'rh',
          field: 'rh',
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
        isLoading : isDataLoading || isCountLoading,
        remarkHistory,
        isSubmitRemarkToolTipOpen,
        isRemarkHistoryToolTipOpen,
        submitRemarkToolTipPosition,
        updateRemark,
        onSubmitRemark,
        onCloseSubmitRemark,
        onCloseRemarkHistory,
        ref,
        // columnState,
        // isSavedDataLoading,
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
        onCloseContactModal,
        onOpenSubmitETA,
        isSubmitETAToolTipOpen,
        etaValue,
        setETAValue,
        submitETAToolTipPosition,
        onCloseSubmitETA,
        isSubmitCurrentLocationTipOpen,
        submitCurrentLocationToolTipPosition,
        currentLocationValue,
        setCurrentLocationValue,
        onOpenSubmitCurrentLocation,
        onCloseSubmitCurentLocation,
        currentPage,
        recordCount,
        getRowData,
        currentFilter,
        setCurrFilter,
        onDeleteFilter,
        onApplyFilter,
        onExportToExcelCallBack,
        onSubmitCurrentLocation,
        onSubmitETA,
        handlePageChange,
        editedRows,
        onSubmitEditedRows,
        themeUi
    }
}

export default useInTransitWhereAbouts