import { ColDef, ColGroupDef } from "ag-grid-enterprise"
import { useEffect, useRef, useState } from "react"
import { useApproveTask, useGetMasterUIConfiguration, useGetPendingTasks, useGetTaskCount, useGetTaskDetails } from "../../../../../VectorFlow/Services/MTA/MDM"

import { getActionName, getExistingColumnFields, getExistingColumns, mapMasterToColumnGroupDefs, mapNewAndOldMasterRowDataToCustomRowData, mapPendingTaskToColumnDefs } from "../../../../../helpers/utils"
import { GridRef, Master, TaskDataType } from "../../../../../VectorFlow/types/MDM"
import TaskPendingLinkCellRenderer from "./TaskPendingLinkCellRenderer"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from '../../../../../redux/store/store';
import { toast } from 'react-toastify';
import { notifyLoader,notifyError,notifySuccess } from "../../../../../helpers/notify";
import { SET_RECORD_COUNT } from "../../../../../redux/actions/MDM";

const useTaskPendingForReview = ()=>{
    const ref = useRef<GridRef>()
    const dispatch = useDispatch();
    const [isViewTableOpen,setIsViewTableOpen] = useState(true)
    const [viewTableColDefs,setViewTableColDefs] = useState<ColDef[] | ColGroupDef[]>()
    const [detailTableColDefs,setDetailTableColDefs] = useState<ColDef[] | ColGroupDef[]>()
    const [detailTableRowData,setDetailTableRowData] = useState<any[]>([])
    // const [recordCount,setRecordCount] = useState<number>(0)
    const [selectedRows,setSelectedRows] = useState<number>(0)
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [showApproveAllModal,toggleApproveAllModal] = useState<boolean>(false);
    const [showRejectAllModal,toggleRejectAllModal] = useState<boolean>(false);
    const [selectionType,setSelectionType] = useState<string>('');

    const recordCount = useSelector((state:RootState) => state.mdm.recordCount)
    const rowsPerPage = 50;

    const {data,isLoading} = useGetPendingTasks()

    const {mutateAsync:getTaskDetails,isLoading:isViewTableLoading} = useGetTaskDetails()

    const {mutateAsync:getMasterUIConfiguration,isError:isMasterUiConfigurationLoading} = useGetMasterUIConfiguration();

    const {mutateAsync:getTaskCount} = useGetTaskCount();

    const {mutateAsync:approveTask } = useApproveTask();

    const chunkSize = useSelector((state:RootState) => state.mdm.chunkSize) 

    const showLoader = isLoading || isMasterUiConfigurationLoading || isViewTableLoading;

    const [actionStatus,setActionStatus] = useState<string>('');

    const [TASK_ID,setTaskId] = useState<string>('')



    const resetState = ()=>{
        setDetailTableColDefs([])
        setDetailTableRowData([])
        dispatch(SET_RECORD_COUNT(0))
        setSelectedRows(0)
    }

    const handleOnClick = async(taskData:TaskDataType)=>{
        let toastId;
        try {
            resetState()
            setIsViewTableOpen(false)
            setTaskId(taskData.TaskID)
            
            const res:any = await getTaskCount(taskData.TaskID);

            const taskCount = JSON.parse(res.data.recordCount)[0].recordcount;
            dispatch(SET_RECORD_COUNT(taskCount));
         
            let taskDataStore:any = [];
            const payload = {
                taskId:taskData.TaskID,
                paginationParameter:{
                    pageNumber:1,
                    recordsPerPage:chunkSize
                }
            }

            toastId = notifyLoader(`Downloading Data 0 / ${taskCount}`)


            if(taskCount <= chunkSize){
                const result = await getTaskDetails(payload);
                taskDataStore = result.data.data;
            }
            else{
                const numberOfPages = Math.ceil(taskCount/chunkSize);
                for(let i=1; i<=numberOfPages; i++){
                    payload.paginationParameter.pageNumber = i;
                    const result = await getTaskDetails(payload)
                    taskDataStore.push(...result.data.data);
                    if(i===numberOfPages) toast.update(toastId,{render:`Downloading Data ${taskCount} / ${taskCount}`})
                    else toast.update(toastId,{render:`Downloading Data ${i*chunkSize} / ${taskCount}`})
                }
            }
            // const response = await getTaskDetails(payload)
            toast.dismiss(toastId);
            
            const currentTaskMaster = taskDataStore[0]
            const currentTaskMasterId:number = currentTaskMaster.MasterId
            
            setDetailTableRowData(taskDataStore)
        
            const uiConfigurationResponse = await getMasterUIConfiguration(getActionName(taskData.Actiontype).value)
            
            const masters:Master[] = uiConfigurationResponse.data.data
            const currentMasterFields = masters.find((master:Master)=>master.id==currentTaskMasterId)?.fields
            
            if(currentMasterFields){
                const existingColumns = getExistingColumns(taskData.Actiontype==2?JSON.parse(currentTaskMaster.data[0].new):currentTaskMaster.data[0])
                const existingColumnFields = getExistingColumnFields(existingColumns,currentMasterFields)
                setDetailTableColDefs(mapMasterToColumnGroupDefs(existingColumnFields,currentTaskMasterId,getActionName(taskData.Actiontype).value,toggleApproveAllModal,toggleRejectAllModal,actionStatus))
                setDetailTableRowData(mapNewAndOldMasterRowDataToCustomRowData(currentTaskMaster.data,existingColumnFields,getActionName(taskData.Actiontype).value,currentTaskMasterId))
                // dispatch(SET_RECORD_COUNT(currentTaskMaster.data.length));
            }

            notifySuccess("Task Details Fetched Successfully");
            
        } catch (error) {
            toast.dismiss();
            notifyError("Something Went Wrong");
            
        }
        
    }

    const handleChangePage = async (pageNo:any) => {
        setCurrentPage(pageNo);
        ref.current?.api.paginationGoToPage(pageNo);
      }

    const onCancel = ()=>setIsViewTableOpen(true)

    const onTaskSubmit = async () => {  
        let toastId;
        try {
            const noActionPerformed = detailTableRowData.find((row:any)=>row.status === '');

            if(noActionPerformed){
                notifyError("Please Update the Status for all Rows before submitting")
                return
            }
            let submitProgress = 0;

            const formattedDetailRowData = detailTableRowData.map((row:any)=>{
                return {...row,status:row.status==='Approved' ? "3" : "4"}
            })
 
            const payload:any =  {
                taskId:TASK_ID,
                recordCount:recordCount,
                data:[]
            }

            toastId = notifyLoader(`Submitting Data ${submitProgress}/${formattedDetailRowData.length}`);
    
            for(let i=0; i < recordCount; i+=chunkSize){
                if(i+chunkSize < formattedDetailRowData.length){
                    payload.data = formattedDetailRowData.slice(i,i+chunkSize);
                    toast.update(toastId,{render:`Submitting Data ${i+chunkSize}/${formattedDetailRowData.length}`})
                    submitProgress+=chunkSize;
                }
                else{
                    payload.data = formattedDetailRowData.slice(i)
                    toast.update(toastId,{render:`Submitting Data ${formattedDetailRowData.length}/${formattedDetailRowData.length}`})
                }
                
                await approveTask(payload);
            }
            toast.dismiss(toastId);
            setIsViewTableOpen(true);
            setDetailTableColDefs([]);
            setDetailTableRowData([]);
            setCurrentPage(1);
            setSelectedRows(0);
            setSelectionType('');

            notifySuccess('Data submitted successfully and Task status updated');

            
        } catch (error) {
            toast.dismiss();
            notifyError('Something Went Wrong');
        }
       
    }

    const onSelectionTypeSuccess = (status:string,) => {
        const pageSize:any = ref.current?.api.paginationGetPageSize()
        const currentPage:any = ref.current?.api.paginationGetCurrentPage()
        const filteredData:any = []
        ref.current?.api.forEachNodeAfterFilter((n) => {
            filteredData.push(n.id)
        })
        const startIndex = currentPage * pageSize
        const endIndex = startIndex + pageSize

        const pageData = filteredData.slice(startIndex, endIndex);
        
    

        
        switch (selectionType){
            case 'All':
                 ref.current?.api.forEachNode((rowNode)=>{
                    rowNode.setDataValue('status',status)
                    rowNode.setSelected(true)
                })
                setActionStatus(status);
                break;
            case 'Current':
                ref.current?.api.forEachNode((rowNode)=>{
                    if(pageData.includes(rowNode.id)){
                        rowNode.setDataValue('status',status)
                        rowNode.setSelected(true)
                        
                    }
                    
                })
                break;
            default:
                return;

        }
  
        if(status === 'Approved'){
            toggleApproveAllModal(false);
        }
        else{
            toggleRejectAllModal(false);
        }
    }

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
        onCancel,
        onTaskSubmit,
        showApproveAllModal,
        toggleApproveAllModal,
        showRejectAllModal,
        toggleRejectAllModal,
        onSelectionTypeSuccess,
        setSelectionType
    }
}

export default useTaskPendingForReview



