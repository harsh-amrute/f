import { ColDef, ColGroupDef } from "ag-grid-enterprise"
import { useEffect, useRef, useState } from "react"
import { useGetMasterUIConfiguration, useGetPendingTasks, useGetTaskDetails } from "../../../../../VectorFlow/Services/MTA/MDM"

import { getExistingColumnFields, getExistingColumns, mapMasterToColumnGroupDefs, mapNewAndOldMasterRowDataToCustomRowData, mapPendingTaskToColumnDefs } from "../../../../../helpers/utils"
import { GridRef, Master } from "../../../../../VectorFlow/types/MDM"
import TaskPendingLinkCellRenderer from "./TaskPendingLinkCellRenderer"


const useTaskPendingForReview = ()=>{
    const ref = useRef<GridRef>()
    const [isViewTableOpen,setIsViewTableOpen] = useState(true)
    const [viewTableColDefs,setViewTableColDefs] = useState<ColDef[] | ColGroupDef[]>()
    const [detailTableColDefs,setDetailTableColDefs] = useState<ColDef[] | ColGroupDef[]>()
    const [detailTableRowData,setDetailTableRowData] = useState<any[]>([])
    const [recordCount,setRecordCount] = useState<number>(0)
    const [selectedRows,setSelectedRows] = useState<number>(0)
    const [currentPage,setCurrentPage] = useState<number>(0)
    const rowsPerPage = 14

    const {data,isLoading} = useGetPendingTasks()

    const {mutateAsync:getTaskDetails,isLoading:isViewTableLoading} = useGetTaskDetails()

    const {mutateAsync:getMasterUIConfiguration,isError:isMasterUiConfigurationLoading} = useGetMasterUIConfiguration()

    const showLoader = isLoading || isMasterUiConfigurationLoading || isViewTableLoading

    const handleOnClick = async(taskId:string)=>{
        console.log(taskId)
        setIsViewTableOpen(false)
      const response = await getTaskDetails('1_202312061821491222')
      const currentTaskMaster = response.data.data[0]
      const currentTaskMasterid:number = currentTaskMaster.MasterId
      setRecordCount(currentTaskMaster.data.length)
      setDetailTableRowData(response.data.data)
      
      const uiConfigurationResponse = await getMasterUIConfiguration('add')
      
      const masters:Master[] = uiConfigurationResponse.data.data
      const currentMasterFields = masters.find((master:Master)=>master.id==currentTaskMasterid)?.fields
      
      if(currentMasterFields){
        const existingColumns = getExistingColumns(currentTaskMaster.data)
        const existingColumnFields = getExistingColumnFields(existingColumns,currentMasterFields)
        setDetailTableColDefs(mapMasterToColumnGroupDefs(existingColumnFields,'add'))
        setDetailTableRowData(mapNewAndOldMasterRowDataToCustomRowData(currentTaskMaster.data,existingColumnFields,'modify'))
        
      }
    }

    const handleChangePage = async (pageNo:any) => {
        setCurrentPage(pageNo);
        ref.current?.api.paginationGoToPage(pageNo);
      }

    const onCancel = ()=>setIsViewTableOpen(true)

    useEffect(()=>{
        setViewTableColDefs(mapPendingTaskToColumnDefs([
            {
                field:"SrNo",
                colId:"SrNo",
                headerName:"Sr No.",
            },
            {
                field:"PendingSince",
                colId:"PendingSince",
                headerName:"Pending since",
            },
            {
                field:"ageing",
                colId:"ageing",
                headerName:"Ageing",
            },
            {
                field:"TaskName",
                colId:"TaskName",
                headerName:"Task Name",
                cellRenderer:TaskPendingLinkCellRenderer,
                cellRendererParams:{
                    onClick:handleOnClick
                }
            },
            {
                field:"RequesterName",
                colId:"RequesterName",
                headerName:"Requester",                  
            }
        ]))
    },[])
    return{
        ref,
        isViewTableOpen,
        viewTableColDefs,
        detailTableColDefs,
        viewTableRowData : data?.data.data,
        detailTableRowData,
        showLoader,
        recordCount,
        selectedRows,
        setSelectedRows,
        currentPage,
        rowsPerPage,
        handleChangePage,
        handleOnClick,
        onCancel
    }
}

export default useTaskPendingForReview



