import { ColDef, ColGroupDef } from "ag-grid-enterprise"
import { useEffect, useRef, useState } from "react"
import { useApproveTask, useGetMasterUIConfiguration, useGetMTOMasterUIConfiguration, useGetMTOTaskById, useGetMTOTaskStatusData, useGetPendingTasks, useGetTaskCount, useGetTaskDetails, usePutMtoBufferMasterData } from "../../../../../VectorFlow/Services/MTA/MDM"

import { createTaskPendingSubmitPayload, getActionName, getExistingColumnFields, getExistingColumns, mapMasterToColumnGroupDefs, mapNewAndOldMasterRowDataToCustomRowData, mapPendingTaskToColumnDefs } from "../../../../../helpers/utils"
import { GridRef, Master, TaskDataType } from "../../../../../VectorFlow/types/MDM"
import TaskPendingLinkCellRenderer from "./TaskPendingLinkCellRenderer"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from '../../../../../redux/store/store';
import { toast } from 'react-toastify';
import { notifyLoader,notifyError,notifySuccess } from "../../../../../helpers/notify";
import { SET_RECORD_COUNT} from "../../../../../redux/actions/MDM";
import { useUserData } from "../../../../../context"
import TaskPendingActionRendererMTO from "./TaskPendingActionRendererMTO"
import TaskPendingActionHeaderMTO from "./TaskPendingActionHeaderMTO"
import _ from "lodash"
import { SET_TASK_PENDING_SELECTED } from "../../../../../redux/actions/MTO"

const useTaskPendingForReview = ()=>{
    const ref = useRef<GridRef>()
    const dispatch = useDispatch();

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    const [taskActionype,setTaskActionType] = useState<number>()
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

    const [currMasterId,setCurrMasterId] = useState<number>(0)

    const recordCount = useSelector((state:RootState) => state.mdm.recordCount)
    const rowsPerPage = 50;

    const {data,isLoading,refetch} = useGetPendingTasks();
    const {mutateAsync : getMTOTaskStatusData} = useGetMTOTaskStatusData();

    const [mtoPendingTaskData, setMTOPendingTaskData ] = useState<any>([]);

    const GetMTOData = async()=>{
        try{
            const response = await getMTOTaskStatusData();
            setMTOPendingTaskData(MTOToMTAFormat(response.data.data.results))
            
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        GetMTOData();
    },[])




    const {mutateAsync:getTaskDetails,isLoading:isViewTableLoading} = useGetTaskDetails()

    const {mutateAsync:getMasterUIConfiguration,isError:isMasterUiConfigurationLoading} = useGetMasterUIConfiguration();

    const {mutateAsync:getTaskCount} = useGetTaskCount();
    
    const {mutateAsync : getMTOTAskById} = useGetMTOTaskById();

    const {mutateAsync:approveTask } = useApproveTask();

    const chunkSize = useSelector((state:RootState) => state.mdm.chunkSize) 

    const showLoader = isLoading || isMasterUiConfigurationLoading || isViewTableLoading;

    const [actionStatus,setActionStatus] = useState<string>('');

    const [TASK_ID,setTaskId] = useState<string>('')

  const { mutateAsync: MTOMasterUIConfiguration, /*isLoading: MTOBufferLoading*/ } = useGetMTOMasterUIConfiguration();

  const [mtoActionStatus,setMtoActionStatus] = useState<string>('ApproveAll');

  const [mtoTask, setMTOTask] = useState<any>(undefined);
  
  const {mutateAsync: putMTOBufferData} = usePutMtoBufferMasterData();

  const convertColumnsFormat = (columns:any) => {
    const sortedColumns = columns.sort((a:any,b:any)=>parseInt(a.col_Position)-parseInt(b.col_Position));
    return sortedColumns.map((col:any, index:any) => ({
        field:col.key,
        headerName:col.displayName,
        position:index+1,
        dataType:col.dataType,
        visible:col.visible
    }));
}

    const resetState = ()=>{
        setDetailTableColDefs([])
        setDetailTableRowData([])
        setTaskActionType(0)
        dispatch(SET_RECORD_COUNT(0))
        setSelectedRows(0)
    }

    const handleOnClick = async(taskData:TaskDataType|any)=>{
        let toastId;
        setMTOTask(taskData);
        if(taskData.isMTO){

            try{
                resetState()
            
                setTaskId(taskData.TaskID)
                
                setTaskActionType(1)
                const res: any = await getMTOTAskById(taskData.TaskID);

                const taskCount = res.data.data.count;
                dispatch(SET_RECORD_COUNT(taskCount));

                const taskDataStore = res.data.data.results;
                toast.dismiss(toastId);
            
                const currentTaskMaster = taskDataStore[0]
                // TODO: get the 
                const currentTaskMasterId:any = 501;
                setCurrMasterId(currentTaskMasterId);

                // // TODO: here
                const uiConfigurationResponse = await MTOMasterUIConfiguration();
            
                const masters:Master[] = uiConfigurationResponse.data.data
                const currentMasterFields = masters.find((master:Master)=>master.id==currentTaskMasterId)?.fields



   

                
                if(currentMasterFields){
                    // console.log(currentTaskMaster.data[0].new)

                    // TODO do the modification of column definations here!
                    const existingColumns = getExistingColumns(currentTaskMaster);

                        
                        const existingColumnFields = getExistingColumnFields(existingColumns,currentMasterFields)
                        const newColDefs = convertColumnsFormat(existingColumnFields);
                        newColDefs.push(
                            {
                                colId: 'selectStatus',
                                field: 'selectStatus',
                                headerComponent: TaskPendingActionHeaderMTO,
                                headerComponentParams: {
                                  showApproveAllModal: showApproveAllModal,
                                  toggleApproveAllModal,
                                  toggleRejectAllModal,
                                  showRejectAllModal: showRejectAllModal,
                                  setActionStatus,
                                  setMtoActionStatus,
                                  mtoActionStatus,
                                  actionStatus
                                },
                                cellRenderer: TaskPendingActionRendererMTO,
                                cellRendererParams: {
                                    actionStatus,
                                    setMtoActionStatus,
                                    mtoActionStatus,
                                    setActionStatus
                                },
                                width: 300,
                                cellStyle: {
                                  "border-left": "solid 1px #B9B9B9"
                                },
                                pinned: 'right'
                              }
                           
                            
                        )

                        const newData:any = [];

                        taskDataStore.forEach((ele:any)=>{
                            const newEle = _.cloneDeep(ele);
                            newEle.selectStatus = '';
                            newData.push(newEle);
                        })
                        
                       
                        setDetailTableColDefs(newColDefs);
                        // dispatch(UPDATE_ROW_DATA(newData));
                        // setDetailTableColDefs(mapMasterToColumnGroupDefs(existingColumnFields,currentTaskMasterId,themeUi,getActionName(1).value,toggleApproveAllModal,toggleRejectAllModal,actionStatus))
                        // setDetailTableRowData(taskDataStore);
                        setDetailTableRowData(newData);
                        // setDetailTableRowData(mapNewAndOldMasterRowDataToCustomRowData(currentTaskMaster.data,existingColumnFields,getActionName(taskData.Actiontype).value,currentTaskMasterId))
                    dispatch(SET_RECORD_COUNT(res.data.data.count));
                }

                notifySuccess("Task Details Fetched Successfully");
                setIsViewTableOpen(false)


            }
            catch(error){
                console.log(error)
            }
        }
        else{

            
            try {
            resetState()
            
            setTaskId(taskData.TaskID)
            
            setTaskActionType(taskData.Actiontype)
            
            const tempToastId = notifyLoader('Loading Data')
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
            toast.dismiss(tempToastId)
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
                    if(i===1){
                        taskDataStore.push(...result.data.data);
                    }
                    taskDataStore[0].data.push(...result.data.data[0].data);
                    if(i===numberOfPages) toast.update(toastId,{render:`Downloading Data ${taskCount} / ${taskCount}`})
                    else toast.update(toastId,{render:`Downloading Data ${i*chunkSize} / ${taskCount}`})
                }
            }
            // const response = await getTaskDetails(payload)
            toast.dismiss(toastId);
            
            const currentTaskMaster = taskDataStore[0]
            const currentTaskMasterId:number = currentTaskMaster.MasterId
            setCurrMasterId(currentTaskMasterId)
            
            
            const uiConfigurationResponse = await getMasterUIConfiguration(getActionName(taskData.Actiontype).value)
            
            const masters:Master[] = uiConfigurationResponse.data.data
            const currentMasterFields = masters.find((master:Master)=>master.id==currentTaskMasterId)?.fields
            if(currentMasterFields){
                // console.log(currentTaskMaster.data[0].new)
                const existingColumns = getExistingColumns(
                    (taskData.Actiontype === 2 && currentTaskMasterId !== 6 && currentTaskMasterId !== 10) || (currentTaskMasterId === 13)
                    ? JSON.parse(currentTaskMaster.data[0].new)
                    : currentTaskMaster.data[0]
                    );
                    
                    const existingColumnFields = getExistingColumnFields(existingColumns,currentMasterFields)
                    setDetailTableColDefs(mapMasterToColumnGroupDefs(existingColumnFields,currentTaskMasterId,themeUi,getActionName(taskData.Actiontype).value,toggleApproveAllModal,toggleRejectAllModal,actionStatus))
                    setDetailTableRowData(mapNewAndOldMasterRowDataToCustomRowData(currentTaskMaster.data,existingColumnFields,getActionName(taskData.Actiontype).value,currentTaskMasterId))
                // dispatch(SET_RECORD_COUNT(currentTaskMaster.data.length));
            }
            
            notifySuccess("Task Details Fetched Successfully");
            setIsViewTableOpen(false)
            
        } catch (error) {
            toast.dismiss();
            console.log(error)
            notifyError("Something Went Wrong");
            
        }
    }
        
    }

    const handleChangePage = async (pageNo:any) => {
        setCurrentPage(pageNo);
        ref.current?.api.paginationGoToPage(pageNo);
      }

    const onCancel = ()=>setIsViewTableOpen(true)

    const onTaskSubmit = async () => {  
        
       
        let toastId;
        const updatedRowData = createTaskPendingSubmitPayload(detailTableRowData,taskActionype || 0,currMasterId)
        console.log(updatedRowData)
        
        try {
            const noActionPerformed = updatedRowData.find((row:any)=>row.status === '');

            if(noActionPerformed){
                notifyError("Please Update the Status for all Rows before submitting")
                return
            }
            let submitProgress = 0;
 
            const payload:any =  {
                taskId:TASK_ID,
                recordCount:recordCount,
                data:[]
            }

            toastId = notifyLoader(`Submitting Data ${submitProgress}/${updatedRowData.length}`);
    
            for(let i=0; i < recordCount; i+=chunkSize){
                if(i+chunkSize < updatedRowData.length){
                    payload.data = updatedRowData.slice(i,i+chunkSize);
                    toast.update(toastId,{render:`Submitting Data ${i+chunkSize}/${updatedRowData.length}`})
                    submitProgress+=chunkSize;
                }
                else{
                    payload.data = updatedRowData.slice(i)
                    toast.update(toastId,{render:`Submitting Data ${updatedRowData.length}/${updatedRowData.length}`})
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
            refetch()
            notifySuccess('Data submitted successfully and Task status updated');

            
        } catch (error) {
            toast.dismiss();
            notifyError('Something Went Wrong');
        }
       
    }


    const mtoOnSelectionChange = ()=>{
        const selectRow:any = ref.current?.api.getSelectedRows();
        const selectedRows = [...selectRow]

        const newData:any = []; 

        if(selectedRows.length > 0 ){

            
            detailTableRowData.forEach((ele:any)=>{
                const newVal  = _.cloneDeep(ele)
                if(selectedRows.includes(ele)){
                        newVal.selectStatus = 'approve';
                    }
                else{
                        newVal.selectStatus = 'reject';
                    }
                newData.push(newVal);
            })
            dispatch(SET_TASK_PENDING_SELECTED([...selectedRows] ));

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
                    if(rowNode.data.isModified){
                        rowNode.setDataValue('status',status)
                        rowNode.setSelected(true)
                    }
                    if(!rowNode.data.isModified && taskActionype===2 && status==="Rejected"){
                        rowNode.setDataValue('status',status)
                        rowNode.setSelected(true)

                    }
                    else if(taskActionype!==2 || currMasterId===6){
                        rowNode.setDataValue('status',status)
                        rowNode.setSelected(true)

                    }
                })
                setActionStatus(status);
                break;
            case 'Current':
                ref.current?.api.forEachNode((rowNode)=>{
                    if(pageData.includes(rowNode.id) && rowNode.data.isModified){
                        rowNode.setDataValue('status',status)
                        rowNode.setSelected(true)
                        
                    }
                    if(pageData.includes(rowNode.id) && !rowNode.data.isModified && taskActionype===2 && status==="Rejected"){
                        rowNode.setDataValue('status',status)
                        rowNode.setSelected(true)
                    }
                    else if(pageData.includes(rowNode.id) && (taskActionype!==2 || currMasterId===6)){
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

    const MTOToMTAFormat=(inData: any)=>{

        const newData:any = [];
        inData.forEach((val:any)=>{
            const newVal:any = {}
            newVal.TaskID = val.tid;
            newVal.PendingSince = val.co;
            newVal.TaskName = val.tnm;
            newVal.TaskStatus = val.std;
            newVal.Requester = val.r_nm;
            newVal.isMTO = true;
  
            newData.push(newVal);
        })
  
        return newData;
    }

    useEffect(()=>{
        if(actionStatus==='Approve All'){
            ref?.current?.api.selectAll();
        }
        else{
            ref?.current?.api.deselectAll();
        }
    },[actionStatus])

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
                headerName:"Pending Since",
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

    const mtoSubmitTask=async()=>{

        const approvedData:any = ref.current?.api.getSelectedRows();
        const finData =
            {
              "tid": mtoTask.TaskID,
              "ti_id": approvedData[0].ti_id,
              "uid": user.user.id,
              "unm": user.user.name,
              "mmid": approvedData[0].mmid,
              "buffData": approvedData
            }
          
        try{
            const response = await putMTOBufferData(finData);
            if(response.status=== 200){
                notifySuccess("Task Updated Successfully");
            }
        }
        catch(error){
            console.log(error)
        }
    }
    
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
        setSelectionType,
        mtoPendingTaskData,
        actionStatus,
        mtoSubmitTask,
        setDetailTableRowData,
        mtoOnSelectionChange
    }
}

export default useTaskPendingForReview



