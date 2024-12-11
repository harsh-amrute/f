import { CSSProperties, useMemo, useState,useEffect ,useRef} from "react";

import {toast} from 'react-toastify'

import useViewPort from "../../../../../hooks/useViewPort";

import { AgGridReactProps } from "ag-grid-react";
import { ColDef } from "ag-grid-enterprise";


// import {useGetState} from '../../../../Services/MTA/SupplyChainIntelligenceHub/BPR'

import { notifyLoader,notifyError,notifySuccess } from "../../../../../helpers/notify";
import ColorCellRenderer from "./ColorCellRenderer";
import ETACellRenderer from "./ETACellRenderer";
import ShowRemarkCellRenderer from "./ShowRemarkCellRenderer";
// import { useSelector } from "react-redux";

// import { RootState } from "../../../../../redux/store/store";
import { useAddRemarkForExpedite, useGetOpenExpediteRequestData, useGetRemarkDetailsForExpedite } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/OpenExpeditingRequests";
import SubmitRemarkCellRenderer from "./SubmitRemarkCellRenderer";
import useBPRFilter from "../../../../../hooks/useBPRFilter";
import { useUserData } from "../../../../../context";
import { defaultAgGridSideBarForBPR } from "../../../../../helpers/BPRConstants";
import { useGetState } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";

const useOpenExpeditingRequests = () => {

    const ref = useRef()
    const tempRef = useRef()

    const [internalRef,setInternalRef] = useState<any>()

    const {user} = useUserData()
    const themeUi = user.user.theme_ui

    const {mutateAsync:getData} = useGetOpenExpediteRequestData()
    const {mutateAsync:addRemark} = useAddRemarkForExpedite()
    const {mutateAsync:getRemark} = useGetRemarkDetailsForExpedite()

    const [submitRemarkToolTipPosition,setSubmitRemarkToolipPosition] = useState<CSSProperties>({})
    const [remarkHistoryToolipPosition,setRemarkHistoryToolipPosition] = useState<CSSProperties>({})
    const {state:currentFilter,setState:setCurrentFilter,onDelete} = useBPRFilter()

    const [editedRows,setEditedRows] = useState<Array<any>>([])
    const [remark,setRemark] = useState<string>('')
    const [rowData,setRowData] = useState<Array<any>>([])
    const [colDefs,setColDefs] = useState<Array<any>>([])
    const [activeRow,setActiveRow] = useState<any>({
      sc:'',
      wc:''
    })
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
        submitRemarkCellRenderer: SubmitRemarkCellRenderer,
        remarksCellRenderer: ShowRemarkCellRenderer
    }), []);

    const {mutateAsync:getState} = useGetState()
    const [gridState,setGridState] = useState<any>()
    // const {currentGridState} = useSelector((state:RootState)=>state.mta)

    useEffect(()=>{
      const getTableState = async()=>{
        try{
          const data =  await getState("OpenExpeditingRequests")
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
    if(internalRef && gridState && gridState.columns){
        internalRef.api.applyColumnState({state:gridState.columns,applyOrder:true})
    }
},[internalRef,gridState])

      useEffect(()=>{
        const getRowData = async()=>{
          try{
            notifyLoader("Loading Grid Data")
            const data = await getData(currentFilter)
            setColDefs(mapFieldsToColDefs(data.data.data.config))
            const tempRowData = data?.data?.data?.data || [];
            if(!tempRowData.length){
              return notifyError("No Data To Show")
            }
            setRowData(tempRowData.map((r:any,index:number)=>({...r,id:index,action:''})))
            toast.dismiss()
            notifySuccess("Data Loaded Successfully")
          }catch(err:any){
            console.error(err)
            notifyError(err)
          }
        }
        getRowData()
      },[])

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
    // },[currentGridState])

    const agGridProps: AgGridReactProps =useMemo(()=>{
      return{
        suppressRowTransform: true,
        tooltipShowDelay: 0.3,
        tooltipTrigger: 'focus',
        tooltipInteraction: true,
        // rowSelection:'single',
        readOnlyEdit: false,
        gridOptions: {
            rowHeight: 50,
            getRowStyle: (params: any) => {
                if (params.node.rowIndex % 2 === 0) {
                    return { background: "#EBEBEB" };
                }
                return { background: "#F7F7F7" };
            },
        },
        sideBar:defaultAgGridSideBarForBPR,
        pagination: true,
        suppressRowClickSelection: true,
        components: customCellRenderers,
        defaultColDef: {
            floatingFilter: true,
            filter: "agMultiColumnFilter",
            cellDataType: false,
            minWidth:140,
            cellStyle: {
              "text-align": "center",
              'text-overflow':'ellipsis',
              'white-space':'nowrap'
            },
            flex: 1,
        },
        onCellValueChanged:(params)=>onCellValueChanged(params.data),
        onGridReady:(params)=>setInternalRef(params)
      }
    },[])

    const onCellValueChanged = (newRow: any) => {
      setEditedRows((prev) => {
        let found = false; // Flag to track if the row has been updated
        const updatedRows = prev.map((row) => {
          if (row.id === newRow.id) {
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
                SKUCode:activeRow.sc,
                WHCode:activeRow.wc,
                remark:remark,
            })
            toast.dismiss(toastId)
            
            notifySuccess('Remark Has Been submitted')
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

    const onApplyFilter = async(filter:any)=>{
      setCurrentFilter(filter)
      setEditedRows([])
      notifyLoader("Loading Grid Data")
      try{
        const data = await getData(filter)
        setRowData(data.data.data.datamap((r:any,index:number)=>({...r,id:index,action:''})))
        toast.dismiss()
      }catch(err:any){
        notifyError(err)
      }
      
    }


    const onSubmitEditedRows = async()=>{
      notifyLoader('Submitting data')
     try{
      const payload = editedRows.map((r)=>{
        return{
          SKUCode:r.sc,
          WHCode:r.wc,
          Remark:r.action || "",
          ETA:r.eta
        
      
    }
      })
      await addRemark({data:payload})
      toast.dismiss()
      setEditedRows([])
     }catch(err){
      console.log(err)
      notifyError("Something went wrong")
     }
    }

    const mapFieldsToColDefs  = (fields:Array<any>):Array<ColDef>=>{
      const config = fields
      let result:Array<ColDef> = []
      if(config){
        result =  config.map((col:any):ColDef=>{
          if(col.colCode==="pic"){
            return{
              headerName: col.header,
              colId: col.colCode,
              field: col.colCode,
              cellRenderer:'colorCellRenderer'
            }
          }
          if(col.colCode==='eta'){
            return {
              headerName: col.header,
              colId: col.colCode,
              field: col.colCode,
              // cellRenderer:'etaCellRenderer',
              cellRenderer:'etaCellRenderer',
              floatingFilter:false,
              editable:true,
              cellDataType:'date'
              
          }
          }
          return{
            headerName: col.header,
            colId: col.colCode,
            field: col.colCode
        }
        })
        result = [...result,{
          headerName: "Action",
          colId: 'action',
          field: 'action',
          cellRenderer: 'submitRemarkCellRenderer',
          floatingFilter:false,
          editable:true
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
      }
      return result
    }


    return {
        agGridProps,
        rowData,
        colDefs,
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
        ref,
        onOpenSubmitRemark,
        // isSavedDataLoading,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        currentFilter,
        setCurrentFilter,
        onDelete,
        onApplyFilter,
        onSubmitEditedRows,
        editedRows,
        themeUi
    }
}

export default useOpenExpeditingRequests