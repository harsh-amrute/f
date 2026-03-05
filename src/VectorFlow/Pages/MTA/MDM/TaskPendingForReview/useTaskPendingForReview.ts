import { ColDef, ColGroupDef } from "ag-grid-enterprise"
import { useEffect, useRef, useState } from "react"
import { useApproveTask, useGetMasterUIConfiguration, useGetPendingTasks, useGetTaskCount, useGetTaskDetails } from "../../../../../VectorFlow/Services/MTA/MDM"

import { createTaskPendingSubmitPayload, getActionName, getExistingColumnFields, getExistingColumns, mapMasterToColumnGroupDefs, mapNewAndOldMasterRowDataToCustomRowData, mapPendingTaskToColumnDefs } from "../../../../../helpers/utils"
import { GridRef, Master, TaskDataType } from "../../../../../VectorFlow/types/MDM"
import TaskPendingLinkCellRenderer from "./TaskPendingLinkCellRenderer"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from '../../../../../redux/store/store';
import { toast } from "react-toastify/unstyled";
import { notifyLoader,notifyError,notifySuccess } from "../../../../../helpers/notify";
import { SET_RECORD_COUNT } from "../../../../../redux/actions/MDM";
import { useUserData } from "../../../../../context"

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
    const [modifiedRowsSet,setModifiedRowsSet] = useState<Set<string>>(new Set());
    const [currMasterId,setCurrMasterId] = useState<number>(0)

    const recordCount = useSelector((state:RootState) => state.mdm.recordCount)
    const rowsPerPage = 50;

    const {data,isLoading,refetch} = useGetPendingTasks()

    const {mutateAsync:getTaskDetails,isLoading:isViewTableLoading} = useGetTaskDetails()

    const {mutateAsync:getMasterUIConfiguration,isError:isMasterUiConfigurationLoading} = useGetMasterUIConfiguration();

    const {mutateAsync:getTaskCount} = useGetTaskCount();

    const {mutateAsync:approveTask } = useApproveTask();
    const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);
    const TASKPENDINGFORREVIEW_PAGE = EnvConfig['TASKPENDINGFORREVIEW_PAGE'];
    const chunkSize = TASKPENDINGFORREVIEW_PAGE

    const showLoader = isLoading || isMasterUiConfigurationLoading || isViewTableLoading;

    const [actionStatus,setActionStatus] = useState<string>('');

    const [TASK_ID,setTaskId] = useState<string>('')

    const [noDataMessage, setNoDataMessage] = useState<string>('');
    const [colGenArgs, setColGenArgs] = useState<any>(null);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [allTaskDataStore, setAllTaskDataStore] = useState<Map<string, any>>(new Map());
    const mergeAndDeduplicateRows = (existingRows: any[], newRows: any[]) => {
        const map = new Map();
        existingRows.forEach(row => {
            const id = getRowUniqueId(row);
            map.set(id, row);
        });
        newRows.forEach(row => {
            const id = getRowUniqueId(row);
            map.set(id, row);
        });
        return Array.from(map.values());
    };

    const getRowUniqueId = (data: any) => {
        let key1, key2, key3;
        if (currMasterId === 1) {
            key1 = data?.sc;
        }
        if (currMasterId === 2) {
            key1 = data?.wc;
        }
        if (currMasterId === 3) {
            key1 = data?.sc;
            key2 = data?.wc;
        }
        if (currMasterId === 4 || currMasterId === 5) {
            key1 = data?.sc;
            key2 = data?.wc;
            key3 = data?.spc
        }
        if (key1 && key2) {
            return `${key1}_${key2}`;
        }
        if (key1 && key2 && key3) {
            return `${key1}_${key2}_${key3}`;
        }
        return `${key1}`;
    };

    useEffect(() => {
        if (ref.current?.api && detailTableRowData?.length > 0) {
            ref.current.api.forEachNode((node) => {
                if (node.data) {
                    const uniqueId = getRowUniqueId(node.data);

                    if (modifiedRowsSet.has(uniqueId)) {
                        node.setSelected(true);
                    }
                }
            });
        }
    }, [detailTableRowData, modifiedRowsSet]);

    useEffect(() => {
        if (!isViewTableOpen && ref.current?.api && detailTableRowData?.length > 0) {
        let rejectedCount = 0;
        ref.current.api.forEachNode((rowNode) => {
            if (rowNode.data.status === "Rejected") {
                rowNode.setSelected(true)
                rejectedCount++;
            }
        });
        const allRowsAreRejected = rejectedCount === detailTableRowData.length;
        setIsDisabled(allRowsAreRejected);
    }
}, [detailTableRowData, isViewTableOpen]);

useEffect(() => {
    if (colGenArgs) {
        setDetailTableColDefs(
            mapMasterToColumnGroupDefs(
                colGenArgs.existingColumnFields,
                colGenArgs.currentTaskMasterId,
                themeUi,
                colGenArgs.taskActionTypeValue,
                toggleApproveAllModal,
                toggleRejectAllModal,
                actionStatus,
                isDisabled
            )
        );
    }
}, [isDisabled, colGenArgs]); 

    const resetState = ()=>{
        setDetailTableColDefs([])
        setDetailTableRowData([])
        setAllTaskDataStore(new Map());
        setTaskActionType(0)
        dispatch(SET_RECORD_COUNT(0))
        setSelectedRows(0)
        setModifiedRowsSet(new Set());
    }

    const handleOnClick = async (taskData: TaskDataType) => {
        let toastId;
        try {
            resetState()
            
            setTaskId(taskData.TaskID)
            
            setTaskActionType(taskData.Actiontype)
            
            const tempToastId = notifyLoader('Loading Data')
            const res:any = await getTaskCount(taskData.TaskID);

            const taskCount = JSON.parse(res.data.recordCount)[0].recordcount;
            dispatch(SET_RECORD_COUNT(taskCount));
            const payload = {
                taskId:taskData.TaskID,
                paginationParameter:{
                    pageNumber:1,
                    recordsPerPage:chunkSize
                }
            }
                toast.dismiss(tempToastId)
                toastId = notifyLoader(`Downloading Data...`)
                const result = await getTaskDetails(payload);
                const taskDataStore = result?.data?.data || [];
                toast.dismiss(toastId);
                if (taskDataStore.length > 0 && taskDataStore[0]?.data?.length != undefined) {
                    const currentTaskMaster = taskDataStore[0];
                    const currentTaskMasterId: number = currentTaskMaster.MasterId;
                    setCurrMasterId(currentTaskMasterId);
                    setNoDataMessage('');
                     const uiConfigurationResponse = await getMasterUIConfiguration(getActionName(taskData.Actiontype).value);
                    const masters:Master[] = uiConfigurationResponse.data.data;
                    const currentMasterFields = masters.find((master: Master)=>master.id==currentTaskMasterId)?.fields
                    if (currentMasterFields) {
                        const existingColumns = getExistingColumns(
                            currentTaskMaster.data ?
                                (taskData.Actiontype === 2 && currentTaskMasterId !== 6 && currentTaskMasterId !== 10) || (currentTaskMasterId === 13) ?
                                JSON.parse(currentTaskMaster?.data[0].new) :
                                currentTaskMaster?.data[0] : []
                        );
                        let existingColumnFields = getExistingColumnFields(existingColumns, currentMasterFields);
                        if(taskData.Actiontype === 3) {
                            existingColumnFields = existingColumnFields.filter(field =>
                                field?.isDelete || field?.key === 'sd' || field?.key === 'wd'
                            );
                        }
                        setColGenArgs({
                            existingColumnFields: existingColumnFields, 
                            currentTaskMasterId: currentTaskMasterId,
                            taskActionTypeValue: getActionName(taskData.Actiontype).value
                        });
                        const initialRows = mapNewAndOldMasterRowDataToCustomRowData(
                            currentTaskMaster.data,
                            existingColumnFields,
                            getActionName(taskData.Actiontype).value,
                            currentTaskMasterId
                        );
                        setAllTaskDataStore(prev => {
                            const newMap = new Map(prev);
                            initialRows.forEach((row: any) => {
                                const uniqueId = getRowUniqueId(row);
                                newMap.set(uniqueId, row);
                            });
                            return newMap;
                        });
                        setDetailTableRowData(mapNewAndOldMasterRowDataToCustomRowData(
                            currentTaskMaster.data,
                            existingColumnFields,
                            getActionName(taskData.Actiontype).value,
                            currentTaskMasterId
                        ));
                }
            } else {
                // No data case
                setNoDataMessage('No Data To Approve.');
            }
            

            notifySuccess("Task Details Fetched Successfully");
            setIsViewTableOpen(false)
            
        } catch (error) {
            toast.dismiss();
            console.log(error)
            notifyError("Something Went Wrong");
            
        }
        
    }

    const handleChangePage = async (pageNo: number) => {
        let toastId;
        try {
            setCurrentPage(pageNo);
            setDetailTableRowData([]);
            toastId = notifyLoader(`Loading Page ${pageNo}...`);

            const payload = {
                taskId: TASK_ID,
                paginationParameter: {
                    pageNumber: pageNo,
                    recordsPerPage: chunkSize
                }
            };

            const result = await getTaskDetails(payload);
            const taskDataStore = result?.data?.data || [];

            toast.dismiss(toastId);

            if (taskDataStore.length > 0 && taskDataStore[0]?.data && colGenArgs) {
                const currentTaskMaster = taskDataStore[0];

                let newRowData = mapNewAndOldMasterRowDataToCustomRowData(
                    currentTaskMaster.data,
                    colGenArgs.existingColumnFields,
                    getActionName(taskActionype || 0).value,
                    currMasterId
                );

                setAllTaskDataStore((prevMap: Map<string, any>) => {
                    const newMap = new Map(prevMap);
                    newRowData.forEach((row: any) => {
                        const uniqueId = getRowUniqueId(row);
                        newMap.set(uniqueId, row);
                    });
                    return newMap;
                });

                newRowData = newRowData.map((row: any) => {
                    const uniqueId = getRowUniqueId(row);
                    if (modifiedRowsSet.has(uniqueId)) {
                        return {
                            ...row,
                            status: 'Approved',
                            isModified: true
                        };
                    }
                    return row;
                });

                setDetailTableRowData(newRowData);

                if (ref.current?.api) {
                    ref.current.api.ensureIndexVisible(0);
                }
            }

        } catch (error) {
            toast.dismiss(toastId);
            notifyError("Failed to load page");
            console.error(error);
        }
    }
    const onCancel = ()=>setIsViewTableOpen(true)

    const onTaskSubmit = async () => {
        let toastId;
        let allRows = Array.from(allTaskDataStore.values());
        allRows = allRows.map((row: any) => {
            const uniqueId = getRowUniqueId(row);

            if (modifiedRowsSet.has(uniqueId)) {
                return {
                    ...row,
                    status: 'Approved',
                    isModified: true
                };
            }
            return row;
        });
        const updatedRowData = createTaskPendingSubmitPayload(allRows, taskActionype || 0, currMasterId);
        try {
            const noActionPerformed = updatedRowData.find((row: any) => row.status === '');

            if (noActionPerformed) {
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
    
            for (let i=0; i<recordCount; i += chunkSize) {
                if (i + chunkSize < updatedRowData.length) {
                    payload.data = updatedRowData.slice(i, i + chunkSize);
                    toast.update(toastId, { render: `Submitting Data ${i + chunkSize}/${updatedRowData.length}` })
                    submitProgress += chunkSize;
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

    const onSelectionTypeSuccess = async (status: string,) => {
        if (status === "Approved" ) {
            const payload: any = {
                taskId: TASK_ID,
                isApproveAll: "1",
                Comments:"bulk approve"
            }
            notifyLoader(`Submitting ${recordCount} records`)
            await approveTask(payload);
            return notifySuccess('All records approved successfully');
        }
        if (status === "Rejected" ) {
            const payload: any = {
                taskId: TASK_ID,
                isApproveAll: "0",
                Comments:"bulk rejected"
            }
            notifyLoader(`Submitting ${recordCount} records`)
            await approveTask(payload);
            return notifySuccess('All records rejected successfully');
        }
        const pageSize:any = ref.current?.api.paginationGetPageSize()
        const currentPage:any = ref.current?.api.paginationGetCurrentPage()
        const filteredData:any = []
        ref.current?.api.forEachNodeAfterFilter((n) => {
            filteredData.push(n.id)
        })
        const startIndex = currentPage * pageSize
        const endIndex = startIndex + pageSize
        const pageData = filteredData.slice(startIndex, endIndex);
        const idsToUpdate = new Set<string>();
        const processRowUpdate = (rowNode: any) => {
            rowNode.setDataValue('status', status);
            rowNode.setSelected(true);
            if (rowNode.data) {
                const uniqueId = getRowUniqueId(rowNode.data);
                idsToUpdate.add(uniqueId);
            }
        };

        const applyLogicToRow = (rowNode: any) => {
            if (rowNode.data.isModified) {
                processRowUpdate(rowNode);
            }
            else if (!rowNode.data.isModified && taskActionype === 2 && status === "Rejected") {
                processRowUpdate(rowNode);
            }
            else if (taskActionype !== 2 || currMasterId === 6) {
                processRowUpdate(rowNode);
            }
        };
        switch (selectionType){
            case 'All':
                ref.current?.api.forEachNode((rowNode) => {
                    applyLogicToRow(rowNode);
                });
                setActionStatus(status);
                break;
            case 'Current':
                ref.current?.api.forEachNode((rowNode)=>{
                    if(pageData.includes(rowNode.id)){
                        applyLogicToRow(rowNode);
                    }
                });
                break;
            default:
                return;
        }
        if (idsToUpdate.size > 0) {
            setModifiedRowsSet((prevSet) => {
                const newSet = new Set(prevSet);
                idsToUpdate.forEach(id => newSet.add(id));
                return newSet;
            });
        }
        if(status === 'Approved') {
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
        noDataMessage,
        chunkSize,
        modifiedRowsSet
    }
}

export default useTaskPendingForReview



