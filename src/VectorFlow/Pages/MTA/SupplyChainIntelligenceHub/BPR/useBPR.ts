import { useState,useMemo, useEffect, CSSProperties } from "react"
import { AgGridReactProps } from "ag-grid-react"

import { useGetBPRData, useGetBPRUIConfiguration, useGetBPRRemarkHistory, useSubmitBPRRemark, useGetDailyData } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BPR"
import { useUserData } from "../../../../../context"
import { BPREcoColorCellRenderer,BPRRemarksCellRenderer,BPRSubmitRemarkCellRenderer,BPRTagsCellRenderer,BPRTechColorCellRenderer } from "./BPRCellRenderers"
import { mapBPRFieldsToColDefs } from "../../../../../helpers/utils"
import { notifyError, notifyLoader, notifySuccess } from "../../../../../helpers/notify"
import { toast } from "react-toastify"
import BPRGraphCellRenderer from "./BPRGraphCellRenderer"
import useViewPort from "../../../../../hooks/useViewPort"

const useBPR =()=>{

    const {isSideBarOpen} = useUserData()
    const {getGridZoom,getScreenZoomValue} = useViewPort()

    const gridZoom = getGridZoom()
    const screenZoom = getScreenZoomValue() 

    const [isSubGridOpen,toggleSubGrid] = useState<boolean>(false)
    const [activeRow,setActiveRow] = useState<any>()
    const [BPRRowData,setBPRRowData] = useState<any[]>([])


    const [submitRemarkToolTipPosition,setSubmitRemarkToolipPosition] = useState<CSSProperties>({})
    const [remarkHistoryToolipPosition,setRemarkHistoryToolipPosition] = useState<CSSProperties>({})

    const [isSubmitRemarkToolTipOpen,setIsSubmitRemarkToolTipOpen] = useState<boolean>(false)
    const [isRemarkHistoryToolTipOpen,setIsRemarkHistoryToolTipOpen] = useState<boolean>(false)
    const [showDailyDataGraphModal,toggleDailyDataGraphModal] = useState(false);
    const [dailyDataParams,setDailyDataParams] = useState<any>();
    const [normChangeData,setNormChangeData] = useState();
    const [chartData,setChartData] = useState();
    const [masterData,setMasterData] = useState<any>();
    const [normChangeHistoryTable,toggleNormChangeHistoryTable] = useState<boolean>(false);

    const [remark,setRemark] = useState<string>('')
    const [remarkHistory,setRemarkHistory] = useState<any[]>([])
  
    const {data,isLoading:isBPRUILoading,isError} = useGetBPRUIConfiguration()
    
  
    const {mutateAsync:getBPRData,isLoading:isBPRDataLoading} = useGetBPRData()

    const {mutateAsync:submitRemark} = useSubmitBPRRemark()

    const {mutateAsync:getRemarkHistory} = useGetBPRRemarkHistory()

    const {mutateAsync:getDailyData} = useGetDailyData();

    useEffect(()=>{
        async function getBPRRowData(){
            const rowData =await  getBPRData({
                filters:[],
                paginationParameter:{
                    pageNumber:1,
                    recordsPerPage:50
                }
            })
            setBPRRowData(rowData.data.data)
        }
        getBPRRowData()
    },[])
  
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
        paginationPageSize:parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50'),
        onRowClicked:(params:any)=>{
            if(params.data.transit && params.data.transit.length>0){
                setActiveRow(params.data.transit)
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
        pagination:true,
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

    const updateRemark = (e:any)=>setRemark(e.currentTarget.value)
    

    const onSubmitRemark = async()=>{
        
        try{
            if(remark.length===0) throw new Error("Remark cannot be empty")
            const toastId = notifyLoader("Submitting Remark")
            const {data} = await submitRemark({
                remark:"The SKU is having trouble with the order delivery please help us with suitable actions"
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
        setDailyDataParams(params);
        console.log(params.data)
        const payload:any = {
            SKUCode:params['SKUCode'],
            WHCode:params['WhCode']
        }
        const result = await getDailyData(payload)
        setChartData(result.data.data['dailyData'])
        setNormChangeData(result.data.data['normChangeHistory'])
        setMasterData(result.data.data['MasterData'])


        toggleDailyDataGraphModal(true);
    }

    const BPRColumns = mapBPRFieldsToColDefs(data?.data.data,onOpenSubmitRemark,onOpenRemarkHistory,onOpenDailyDataGraph)

   
    return {
        isSideBarOpen,
        isSubGridOpen,
        isLoading : isBPRDataLoading || isBPRUILoading,
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
        showDailyDataGraphModal,
        toggleDailyDataGraphModal,
        dailyDataParams,
        normChangeData,
        chartData,
        masterData,
        normChangeHistoryTable,
        toggleNormChangeHistoryTable
    }
}

export default useBPR