
import { ColDef, ColGroupDef } from "ag-grid-enterprise"
import { useEffect, useRef, useState } from "react"
import { useApproveTask, useGetBufferMasterData, useGetCCRMasterData, useGetMasterUIConfiguration, useGetMTOMasterUIConfiguration, useGetMTOTaskById, useGetMTOTaskStatusData, usePutMtoBufferMasterData, usePutMtoCalendarMasterData, usePutMtoCCRMasterData, usePutMtoPoogiMasterData } from "../../../../../VectorFlow/Services/MTA/MDM"

import { createTaskPendingSubmitPayload, getActionName, getCCRNamesFromId, getExistingColumnFields, getExistingColumns, mapMasterToColumnGroupDefs, mapNewAndOldMasterRowDataToCustomRowData, mapPendingTaskToColumnDefs } from "../../../../../helpers/utils"
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
import { SET_TASK_PENDING_ROW_DATA } from "../../../../../redux/actions/MTO"
import CommentCellRenderer from "./CommentCellRenderer"
import { v4 as uuidv4 } from "uuid";
import DaysOfWeekRenderer from "../ViewModify/DaysOfWeekRenderer"



const useTaskPendingForReview = ()=>{
    const [tempMasterData, setTempMasterData]= useState<any>(undefined);
    const [mid,setMID] = useState<any>(undefined);
    const { mutateAsync: getBufferMasterData } = useGetBufferMasterData();
    const {mutateAsync: getCCRMasterData} = useGetCCRMasterData();
    const {mutateAsync: getMtoCalendarMasterData} = usePutMtoCalendarMasterData();
     

    const GetInitialData = async(mid: any)=>{
        if(mid===501){
            try{

                const result = await getBufferMasterData({});
                setTempMasterData(result.data.data)
            }
            catch(e){
                console.log(e);
            }
        }
        else if(mid===502){
            try{
                const result = await getCCRMasterData({});
                setTempMasterData(result.data.data)
            }
            catch(e){
                console.log(e);
            }
        }
    }

    useEffect(()=>{
        if(mid){
          GetInitialData(mid);
        }
    },[mid])
    const ref = useRef<GridRef>()
    const dispatch = useDispatch();
    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    const [taskActionype,setTaskActionType] = useState<number>()
    const [isViewTableOpen,setIsViewTableOpen] = useState(true)
    const [viewTableColDefs,setViewTableColDefs] = useState<ColDef[] | ColGroupDef[]>()
    const [detailTableColDefs,setDetailTableColDefs] = useState<ColDef[] | ColGroupDef[]>()
    const detailTableRowData = useSelector((state: any)=> state.mto.taskPendingRowData)
    const setDetailTableRowData = (val: any)=>{
        dispatch(SET_TASK_PENDING_ROW_DATA(val));
    }

    // const [recordCount,setRecordCount] = useState<number>(0)
    const [selectedRows,setSelectedRows] = useState<number>(0)
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [showApproveAllModal,toggleApproveAllModal] = useState<boolean>(false);
    const [showRejectAllModal,toggleRejectAllModal] = useState<boolean>(false);
    const [selectionType,setSelectionType] = useState<string>('');

    const [currMasterId,setCurrMasterId] = useState<number>(0)

    const recordCount = useSelector((state:RootState) => state.mdm.recordCount)
    const rowsPerPage = 50;

    // const {data,isLoading,refetch} = useGetPendingTasks();
    const {mutateAsync : getMTOTaskStatusData, isLoading: showLoader} = useGetMTOTaskStatusData();

    const [mtoPendingTaskData, setMTOPendingTaskData ] = useState<any>([]);

    const GetMTOData = async()=>{
        try{
            const response = await getMTOTaskStatusData();
            setMTOPendingTaskData(MTOToMTAFormat(response.data.data))
            
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        GetMTOData();
    },[])



    

    const {mutateAsync:getMasterUIConfiguration} = useGetMasterUIConfiguration();

    const {mutateAsync : getMTOTAskById} = useGetMTOTaskById();

    const {mutateAsync:approveTask } = useApproveTask();

    const chunkSize = useSelector((state:RootState) => state.mdm.chunkSize) 

    // const showLoader = isLoading || isMasterUiConfigurationLoading || isViewTableLoading;

    const [actionStatus,setActionStatus] = useState<string>('');

    const [TASK_ID,setTaskId] = useState<string>('')

  const { mutateAsync: MTOMasterUIConfiguration, /*isLoading: MTOBufferLoading*/ } = useGetMTOMasterUIConfiguration();

  const [mtoActionStatus,setMtoActionStatus] = useState<string>('ApproveAll');

  const [mtoTask, setMTOTask] = useState<any>(undefined);
  
  const {mutateAsync: putMTOBufferData} = usePutMtoBufferMasterData();
  const {mutateAsync: putMTOAddPoogiMaster} = usePutMtoPoogiMasterData();
  const {mutateAsync: putMTOCCRData} = usePutMtoCCRMasterData();


  const convertColumnsFormat = async (columns:any, mid: any) => {
    if(mid===503){
        const newColDefs = [
            {
                field: "majdsc",
                headerName: "Major Reason",
                position: 1,
                dataType: "string",
                visible: true
            },
            {
                field: "mindsc",
                headerName: "Minor Reason",
                position: 2,
                dataType: "string",
                visible: true
            },
            {
                field: "plnm",
                headerName: "Plant",
                position: 3,
                dataType: "string",
                visible: true
            },

        ]
        return newColDefs;
    }

    const sortedColumns = columns.sort((a:any,b:any)=>parseInt(a.col_Position)-parseInt(b.col_Position));
    let ccrsData:any = [];
    const ccr = await getCCRMasterData({});


    if(ccr.data.data.length !== 0){
        ccrsData = ccr.data.data
    }

    return sortedColumns.map((col:any, index:any) => {
        
        if(col.key === "dow"){
            return {
                field: col.key,
                headerName: col.displayName,
                position: index + 1,
                dataType: col.dataType,
                visible: col.visible,
                cellRenderer: DaysOfWeekRenderer
            }
        }
        if(col.key === "ccr_id"){

            return {
                field: col.key,
                headerName: col.displayName,
                position: index + 1,
                dataType: "string",
                visible: col.visible,
                valueFormatter : (params:any)=>{
                    return getCCRNamesFromId(ccrsData,params?.data?.ccr_id)
                }
            }
        }else{
           return  {
            field:col.key,
            headerName:col.displayName,
            position:index+1,
            dataType:col.dataType,
            visible:col.visible
            }
        }
    });
}

    const resetState = ()=>{
        setDetailTableColDefs([])
        setDetailTableRowData([])
        setTaskActionType(0)
        dispatch(SET_RECORD_COUNT(0))
        setSelectedRows(0)
    }

    const ConvertToPoogiData = (data: any) => {
        const result: any[] = [];
        
        data.forEach((item: any) => {
            // Push the main object without minData
            const tempMajId = "maj_"+ uuidv4();
            result.push({
                majId: item.majId? item.majId: tempMajId,
                majdsc: item.majdsc,
                plnm: item.plnm,
                trmId: item.trmId? item.trmId: item.mintid,
                tid: item.tid,
                ti_id: item.ti_id,
                ie: item.ie || false,
                id: item.id || false,
                iu: item.iu || false,
                pl: item.pl,
                majcd: item.majcd,
                aon: item.aon,
                aid: item.aid,
                anm: item.anm,
                st: item.st,
                stnm: item.stnm
            });
    
            // Push each minData object with the corresponding majId and plnm
            if (item.minData && Array.isArray(item.minData)) {
            const tempMinId = "min_"+uuidv4();

                item.minData.forEach((minItem: any) => {
                    result.push({
                        majId: minItem.majId || tempMajId,
                        minId: minItem.minId || tempMinId,
                        mindsc: minItem.mindsc,
                        mintid: minItem.mintid,
                        mincd: minItem.mincd,
                        plnm: item.plnm,
                        ie: minItem.ie || false,
                        id: minItem.id || false,
                        iu: minItem.iu || false,
                        pl: item.pl,
                        aon: minItem.aon,
                        aid: minItem.aid,
                        anm: minItem.anm,
                        st: minItem.st,
                        stnm: minItem.stnm
                    });
                });
            }
        });
    
        return result;
    };

    const ConvertFromPoogiData = (data: any) => {
        const result: any = [];
    
        // Create a map to track majId and its corresponding object in the result
        const majIdMap = new Map();
    
        data.forEach((item: any) => {
            // Check and set majId to null if it starts with 'm'
            const majId = item.majId && item.majId.startsWith('m') ? null : item.majId;
    
            if (item.minId) {
                // Check and set minId to null if it starts with 'm'
                const minId = item.minId.startsWith('m') ? null : item.minId;
    
                // Handle minData objects
                const parent = majIdMap.get(majId);
    
                if (parent) {
                    // Add minData to the corresponding parent object
                    parent.minData.push({
                        minid: minId,
                        mindsc: item.mindsc,
                        mintid: item.mintid,
                        ie: item.ie || false,
                        id: item.id || false,
                        ia: item.appStatus === true ? true : false,
                        iu: item.iu || false,
                        mincd: item.mincd,
                        cm: item.cm || "",

                    });
                }
            } else {
                // Handle main objects
                const mainObject = {
                    majdsc: item.majdsc,
                    majid: majId,
                    trmId: item.trmId,
                    ia: item.appStatus === true ? true : false,
                    ie: item.ie || false,
                    id: item.id || false,
                    iu: item.iu || false,
                    cm: item.cm|| "",
                    majcd: item.majcd,
                    pl: item.pl,
                    minData: [], // Initialize an empty array for minData
                };
    
                result.push(mainObject);
                majIdMap.set(majId, mainObject); // Add to the map for reference
            }
        });
    
        return result;
    };
    
    
    const handleOnClick = async(taskData:TaskDataType|any)=>{
        let toastId;
        setMID(taskData.mid);
        setMTOTask(taskData);
        if(taskData.isMTO){

            try{
                resetState()
            
                setTaskId(taskData.TaskID)
                
                setTaskActionType(1)
                const res: any = await getMTOTAskById({taskId: taskData.TaskID, mmid: taskData.mid});

                const taskCount = res.data.data.count;
                dispatch(SET_RECORD_COUNT(taskCount));

                const taskDataStore = res.data.data.results;
                toast.dismiss(toastId)
                const currentTaskMaster = taskDataStore[0];
                // TODO: get the 
                const currentTaskMasterId:any = taskData.mid;
                setCurrMasterId(currentTaskMasterId);

                // // TODO: here
                const uiConfigurationResponse = await MTOMasterUIConfiguration();
            
                const masters:Master[] = uiConfigurationResponse.data.data
                const currentMasterFields = masters.find((master:Master)=>master.id==currentTaskMasterId)?.fields
                
                if(currentMasterFields){

                    // TODO do the modification of column definations here!
                    const existingColumns = getExistingColumns(currentTaskMaster);

                        const existingColumnFields = getExistingColumnFields(existingColumns,currentMasterFields)
                        const newColDefs = await convertColumnsFormat(existingColumnFields, taskData.mid);
                        newColDefs.push(
                            {
                                colId: "cm",
                                field: "cm",
                                headerName: "Comments",
                                cellRenderer: CommentCellRenderer,
                                pinned: 'right'
                            }
                        )
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

                        if(taskData.mid===503){
                            const poogiModifyData = ConvertToPoogiData(newData);
                            setDetailTableRowData(poogiModifyData);
                        }
                        else{
                            setDetailTableRowData(newData);
                        }
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
            
           
         
            const taskDataStore:any = [];
            toast.dismiss(tempToastId)

          
            toast.dismiss(toastId);
            
            const currentTaskMaster = taskDataStore[0]
            const currentTaskMasterId:number = currentTaskMaster.MasterId
            setCurrMasterId(currentTaskMasterId)
            
            
            const uiConfigurationResponse = await getMasterUIConfiguration(getActionName(taskData.Actiontype).value)
            
            const masters:Master[] = uiConfigurationResponse.data.data
            const currentMasterFields = masters.find((master:Master)=>master.id==currentTaskMasterId)?.fields
            if(currentMasterFields){
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
            // refetch()
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

    const getDaysDifference = (inputDate: string): number => {
        const givenDate = new Date(inputDate);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        givenDate.setHours(0, 0, 0, 0);
        const timeDifference = currentDate.getTime() - givenDate.getTime();
        const dayDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
        return dayDifference;
    };
    
    const convertDateFormat = (inputDate: string)=>{

        // Extract parts of the string
        const [date, ltime] = inputDate.split("T");
        const time = ltime.split(".")[0]; // Remove milliseconds
        const [year, month, day] = date.split("-");
        const [hours, minutes, seconds] = time.split(":");

        // Convert to 12-hour format
        const isPM = parseInt(hours) >= 12;
        const newHours = (parseInt(hours) % 12 || 12).toString().padStart(2, "0");
        const period = isPM ? "PM" : "AM";

        const newMonth = month;
        // Format the output
        const formattedDate = `${year}/${newMonth}/${day}  ${newHours}:${minutes}:${seconds} ${period}`;
        return formattedDate;
    }

    const MTOToMTAFormat=(inData: any)=>{

        const newData:any = [];
        inData.forEach((val:any)=>{
            const newVal:any = {}
            newVal.TaskID = val.tid;
            newVal.PendingSince = convertDateFormat(val.co);
            newVal.TaskName = val.tnm;
            newVal.TaskStatus = val.std;
            newVal.RequesterName = val.r_nm;
            newVal.mid = val.mid;
            newVal.isMTO = true,
            newVal.ageing = getDaysDifference(val.co);
  
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

    const validateBeforeSubmit = (finData: any) => {
        if (mid === 501) {
          let hasMatchingBSZAndBT = false;
          let hasExistingBCD = false;
          let bsz = null;
          let bt = null;
          let bcd = null;
      
          for (const newData of finData) {
            if(newData.ia===true && newData.bid===null){

                if (!hasMatchingBSZAndBT) {
                    hasMatchingBSZAndBT = tempMasterData.some(
                        (masterData: any) =>
                        masterData.bsz === newData.bsz && masterData.bt === newData.bt
                        );
                        if(hasMatchingBSZAndBT) bsz = newData.bsz; bt = newData.bt;
                    }
                    
                    if (hasExistingBCD===false) {
                        hasExistingBCD = tempMasterData.some(
                            (masterData: any) => masterData.bcd === newData.bcd
                            );
                            if(hasExistingBCD) bcd = newData.bcd;
                        }
                        
                        if (hasMatchingBSZAndBT && hasExistingBCD) {
                            break;
                        }
                    }
                }
      
          // Handle errors
          if (hasMatchingBSZAndBT) {
            toast.dismiss();
            notifyError(`A buffer with the size ${bsz} and type ${bt} exists in the buffer master`);
          }
          if (hasExistingBCD) {
            notifyError(`A buffer with the code ${bcd} exists in the buffer master`);
          }
      
          // Return the validation result
          return !(hasMatchingBSZAndBT || hasExistingBCD);
        }

        if(mid===502){
        let hasExistingCCD = false;
        let ccd = null;

        for (const newData of finData) {
            if (newData.ia === true && newData.cid === null) {
                if (!hasExistingCCD) {
                    hasExistingCCD = tempMasterData.some(
                        (masterData: any) => masterData.ccd === newData.ccd
                    );
                    if (hasExistingCCD) ccd = newData.ccd;
                }

                if (hasExistingCCD) {
                    break;
                }
            }
        }

        // Handle errors
        if (hasExistingCCD) {
            toast.dismiss();
            notifyError(`A CCR with the code ${ccd} exists in the CCR master`);
        }

        // Return the validation result
        return !hasExistingCCD;
        }
      
        return true;
      };
      


    const mtoSubmitTask=async()=>{

        if(mtoTask.mid===501){

            
            const newApprovedData:any = [];
            detailTableRowData.forEach((ele:any)=>{
            const newEle = {
                bid: ele.bid? ele.bid: null,
                bcd: ele.bcd,
                bd:ele.bd,
                bsz: ele.bsz,
                bt: ele.bt,
                bt_id: ele.bt_id, 
                iv: ele.iv? ele.iv: false,
                btd: ele.btd,
                ib: ele.ib,
                ti_id: ele.ti_id,
                mlt: ele.mlt,
                mmid: ele.mmid,
                slt: ele.slt,
                tbmId: ele.tbmId,
                cm: ele.cm? ele.cm: "",
                ia: (ele.appStatus && ele.appStatus===true)?true:false,
            }
            newApprovedData.push(newEle);
        })

        const finData =
        {
              "tid": mtoTask.TaskID,
              "ti_id": newApprovedData[0].ti_id,
              "uid": user.user.id,
              "unm": user.user.name,
              "mmid": newApprovedData[0].mmid,
              "buffData": newApprovedData
            }
            
            let isValid = validateBeforeSubmit(newApprovedData);
            newApprovedData.forEach((ele:any)=>{
                if(ele.ia===false && ele.cm===""){
                    (!isValid===false) && notifyError("Make sure you provide a comment for the rejected task!");
                    isValid = false;
                }

            })
            if(isValid===true){
                notifyLoader("Task is being approved...")
                
                try{
                    const response = await putMTOBufferData([finData]);
                    if(response.status=== 200){
                        notifySuccess("DB Updated Successfully");
                        dispatch(SET_TASK_PENDING_ROW_DATA([]));
                        setIsViewTableOpen(true);
                        GetInitialData(mid);
                    }
                    else{
                        notifyError("Failed to update DB!");
                    }
                }
            catch(error){
                notifyError("Failed to update DB!");
                console.log(error)
            }
        }
    }
    else if(mtoTask.mid===502){
           
        const newApprovedData:any = [];
        detailTableRowData.forEach((ele:any)=>{
        const newEle = {
            cid: ele.cid? ele.cid: null,
            ccd: ele.ccd,
            cnm:ele.cnm,
            cpd: ele.cpd,
            cwl: ele.cwl,
            whpd: ele.whpd,
            sh: ele.sh, 
            fh: ele.fh,
            rb: ele.rb,
            ti_id: ele.ti_id,
            a1: ele.a1,a2: ele.a2,a3: ele.a3,a4: ele.a4,a5: ele.a5,a6: ele.a6,a7: ele.a7,a8: ele.a8,a9: ele.a9,a10: ele.a10,
            cgid: ele.cgid,
            plid: ele.plid,
            dpid: ele.dpid,
            plnm: ele.plnm,
            dpnm:ele.dpnm,
            mmid: ele.mmid,
            tcmId: ele.tcmId,
            cm: ele.cm? ele.cm: "",
            iv: ele.iv? ele.iv: false,
            ia: (ele.appStatus && ele.appStatus===true)?true:false,
        }
        newApprovedData.push(newEle);
    })

    const finData =
    {
          "tid": mtoTask.TaskID,
          "ti_id": newApprovedData[0].ti_id,
          "uid": user.user.id,
          "unm": user.user.name,
          "mmid": newApprovedData[0].mmid,
          "ccrData": newApprovedData
        }
        
        let isValid = validateBeforeSubmit(newApprovedData);
        newApprovedData.forEach((ele:any)=>{
            if(ele.ia===false && ele.cm===""){
                (!isValid===false) && notifyError("Make sure you provide a comment for the rejected task!");
                isValid = false;
            }

        })
        if(isValid===true){
            notifyLoader("Task is being approved...")
            
            try{
                const response = await putMTOCCRData([finData]);
                if(response.status=== 200){
                    notifySuccess("DB Updated Successfully");
                    dispatch(SET_TASK_PENDING_ROW_DATA([]));
                    setIsViewTableOpen(true);
                    GetInitialData(mid);
                }
                else{
                    notifyError("Failed to Update DB!")
                }
            }
        catch(error){
            notifyError("Failed to Update DB!")
            console.log(error)
        }
    }}

    else if(mtoTask.mid===503){

        notifyLoader("Updating Task...")

        const newApprovedData = ConvertFromPoogiData(detailTableRowData);

        let isValid:any = true;

        detailTableRowData.forEach((el:any)=>{
            if(el.ia===false && el.cm===""){
                isValid = false;
            }
            el.minData.forEach((e:any)=>{
                if(e.ia===false && e.cm===""){
                    isValid = false;
                }
            })
        })
        if(isValid===false){
            notifyError("Make sure you provide a comment for the rejected task!")
        }

        const finData ={
            "tid": mtoTask.TaskID,
            "ti_id": detailTableRowData[0].ti_id,
            "uid": user.user.id,
            "unm": user.user.name,
            "mmid": 3,
            "reasonData": newApprovedData
        }
        
        try{
            const response = await putMTOAddPoogiMaster([finData]);
            if(response.status=== 200){
                notifySuccess("DB Updated Successfully");
                dispatch(SET_TASK_PENDING_ROW_DATA([]));
                setIsViewTableOpen(true);
                GetInitialData(mid);
            }
            else{
                notifyError("Failed to update DB!");
            }
        }
        catch(error){
            notifyError("Failed to update DB!");
            console.log(error)
        }
    }else if(mtoTask.mid === 504){
        notifyLoader("Updating Task...")
        try {

        const newApprovedData = detailTableRowData
        let isValid:any = true;
        newApprovedData.forEach((el:any)=>{
            if(el.ia===false && !el.cm){
                isValid = false;
            }
 
        })
        if(isValid===false){
            throw new Error("Make sure you provide a comment for the rejected task!")
        }

        const finalData = {
            "tid": mtoTask.TaskID,
            "ti_id": newApprovedData[0].ti_id,
            "uid": user.user.id,
            "unm": user.user.name,
            "mmid": 4,
            "cData": newApprovedData
        }
        
        
            const response = await getMtoCalendarMasterData(finalData);
            if(response.status=== 200){
                notifySuccess("DB Updated Successfully");
                dispatch(SET_TASK_PENDING_ROW_DATA([]));
                setIsViewTableOpen(true);
                GetInitialData(mid);
            }
            else{
                notifyError("Failed to update DB!");
            }
        } catch (error) {
            notifyError(error ? "Make sure you provide a comment for the rejected task!" : "Failed to update DB!");
            console.log(error)
        }
    }
    }

    
    return{
        ref,
        isViewTableOpen,
        viewTableColDefs,
        detailTableColDefs,
        // viewTableRowData : data?.data.data,
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
        currentMaster: mtoTask?.mid
    }
}

export default useTaskPendingForReview
