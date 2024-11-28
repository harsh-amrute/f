import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router"
import {useGetAllDrafts, useDeleteDraft,useGetDraftById,useGetMasterUIConfiguration, useGetDraftCount, useGetMTODrafts, useGetMTODraftById, useGetMTOMasterUIConfiguration, useGetBufferMasterData } from "../../../../../VectorFlow/Services/MTA/MDM"
import { notifyError, notifyPromise, notifySuccess, notifyLoader } from "../../../../../helpers/notify"

import { FILL_MASTERS, SET_DRAFT_ID, SET_RECORD_COUNT, STORE_ALL_MASTERS, TOGGLE_SELECT_MASTER_SCREEN, TOGGLE_UPLOAD_MODAL, UPDATE_ACTIVE_MASTER, UPDATE_DATA_AVAILABILITY_STATUS, UPDATE_FILTER } from "../../../../../redux/actions/MDM"
import { createMastersStateFromDraftData, generateRandomId, getActionName, mapMasterToMasterState } from "../../../../../helpers/utils"
import { MDMMasterState } from "../../../../../VectorFlow/types/MDM"
import type { RootState } from '../../../../../redux/store/store';
import { toast } from 'react-toastify';
import { useUserData } from "../../../../../context"
import MTOErrorWarningCell from "../ViewModify/MTOErrorWarningCell"
import { SET_BUFFER_MODIFY_DATA } from "../../../../../redux/actions/MTO"

const useSavedDrafts = ()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {mutateAsync:getDraftById} = useGetDraftById()
    const {mutateAsync:getMasterUIConfiguration} = useGetMasterUIConfiguration()
    const {mutateAsync:deleteDraft} = useDeleteDraft()
    const [isDeleteModalOpen,toggleDeleteModal] = useState<boolean>(false)
    const [deleteDraftId,setDeleteDraftId] = useState<string>("");
    const {data,isLoading,refetch} = useGetAllDrafts();
    const {mutateAsync:getDraftCount} = useGetDraftCount();
    const chunkSize = useSelector((state:RootState) => state.mdm.chunkSize)
    const [allDrafts, setAllDrafts] = useState<any>(data?.data?.data);
    const {mutateAsync: getMtoDrafts} = useGetMTODrafts();
    const {mutateAsync: getDraftByIdMTO} = useGetMTODraftById();
    const {mutateAsync: getMTOMasterUIConfiguration} = useGetMTOMasterUIConfiguration();
    const {mutateAsync: getBufferMasterData} = useGetBufferMasterData();
    
    const user = useUserData();

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

        console.log("month,,,,", month);

        const newMonth = month.toString();
        const formattedDate = `${year}/${newMonth}/${day} ${newHours}:${minutes}:${seconds} ${period}`;
        return formattedDate;
    }
    
    const getCombinedMTOData = async()=>{
        try{
            // TODO: change the data to userid later now data is available for this
            const response:any = await getMtoDrafts(user.user.user.id);
            let concatedData:any = [];
            if(data && data.data && data.data.data){
                concatedData = [...data.data.data];
            }
            response.data.data.forEach((draft: any)=>{
                // const date = new Date(draft.co);
                const newData = {
                    DraftId: draft.did,
                    ActionType: draft.at,
                    LastModifiedDateTime: convertDateFormat(draft.co.toString()),
                    Masters: draft.at +" - "+ draft.mnm,
                    SearchKeys: draft.sk,
                    userid: draft.uid,
                    isMTO: true
                }
                concatedData.push(newData);
            })
            
            setAllDrafts(concatedData);
            
        }
        catch(error){
            console.log(error)
        }
    }
    
    
    
    useEffect(()=>{
        // if(data?.data){
            getCombinedMTOData();
        // }
    },[data])
    
    const openDeleteModal = (draftId:string)=>{
        setDeleteDraftId(draftId)
        toggleDeleteModal(true)
    }
    
    const closeDeleteModal =()=>toggleDeleteModal(false)

    // export const createMastersStateFromDraftData = (draftData: any[], fields: any[]): any[] => {

    //     const masters: MDMMasterState[] = []
    //     draftData.map((master) => {
    //       const existingMaster = fields.find((m: any) => m.id == master.MasterId)
    //       if (existingMaster) {
    //         masters.push({
    //           id: existingMaster.id,
    //           name: existingMaster.name,
    //           colDefs: master.GridState.length > 0 ? JSON.parse(master.GridState) : mapMasterToColumnDefs(existingMaster.fields, existingMaster.id),
    //           rowData: master.DataMaster || [],
    //           isChecked: true,
    //           filters: [{
    //             id: generateRandomId(),
    //             masterId: existingMaster.id,
    //             field: '',
    //             operator: '',
    //             text: ''
    //           }],
    //           progress: master.Status,
    //           fields: existingMaster.fields
    //         })
    //       }
    //     })
    //     return masters


    //   }

    const convertToColDefs = (data:any, ActionType: string) => {
        return data
          .sort((a:any, b:any) => (a.col_Position || 0) - (b.col_Position || 0))
          .map((item: any) => ({
            field: item?.key,                    // Use the "key" as the "field"
            colId: item?.key,                    // Also set "colId" from "key"
            headerName: item?.displayName,        // Set "headerName" from "displayName"
            floatingFilter: false,              // Set default values for additional properties
            wrapText: true,
            autoHeight: true,
            editable: (ActionType == "Modify") ? false : true
          }));
      };
    
    const onEditDraft = async(draftDetails:any)=>{
        let toastId;
        if(draftDetails.isMTO){
            
            try{
                const res: any = await getDraftByIdMTO(draftDetails.DraftId);
                dispatch(SET_RECORD_COUNT(res.data.data.count));
                const draftData:any = res.data.data.results;

                if(draftDetails.isMTO && (draftDetails.ActionType === "Modify")){
                    try{
                        const result = await getBufferMasterData();
                        // draftData = [...draftData, ...result.data.data];
                        console.log(result);

                        // console.log("final DraftData .... ", draftData);
                    }
                    catch(e){
                        console.log(e);
                    }
                }
           

            const mastersDataRes= await getMTOMasterUIConfiguration();
            const mastersData = mastersDataRes.data.data[1];
        
            toast.dismiss();
            
            const fields = mastersData.fields;

            // draftData
            // DataMaster gridState MasterId Status
            // const masterState = createMastersStateFromDraftData(draftData,fields)
            // const activeMaster = masterState.find((m:MDMMasterState)=>m.progress!=='submitted');
                // const activeMaster= "dsf";

            dispatch(SET_BUFFER_MODIFY_DATA(draftData));

            const masterState:any = [
                {   isMTO: true,
                    "id": 501,
                    "name": "Buffer",
                    "colDefs": [{checkboxSelection: true},{colId: 'err', field: 'err',cellRenderer: MTOErrorWarningCell, headerName: 'Error'  },...convertToColDefs(fields,draftDetails.ActionType)],
                    "rowData": draftData,
                    "isChecked": true,
                    "filters": [{
                        id: generateRandomId(),
                        masterId: 501,
                        field: "",
                        operator: '',
                        text: ''
                    }],
                    "progress": "view",
                    "fields": fields
                }
            ]

            if(draftDetails.isMTO && (draftDetails.ActionType === "Modify")){
                masterState[0].colDefs = [...convertToColDefs(fields, draftDetails.ActionType)];
            }

            dispatch(TOGGLE_UPLOAD_MODAL(false));

            
            dispatch(TOGGLE_SELECT_MASTER_SCREEN(false));
            // dispatch(STORE_ALL_MASTERS(mapMasterToMasterState(fields)))
            // dispatch(UPDATE_FILTER(masterState.filters))
            dispatch(FILL_MASTERS(masterState))
            dispatch(SET_DRAFT_ID(draftDetails.DraftId))
            dispatch(UPDATE_DATA_AVAILABILITY_STATUS(true))
            dispatch(UPDATE_ACTIVE_MASTER(0))
            
            // dispatch(UPDATE_ACTIVE_MASTER(masterState.indexOf(activeMaster))            // dispatch(UPDATE_ACTIVE_MASTER())
            if(draftDetails.ActionType == "Modify"){
                navigate(`/mto/master-data-management/control-panel/view-modify`);
            }
            else if(draftDetails.ActionType === "Add"){
                navigate(`/mto/master-data-management/control-panel/${draftDetails.ActionType.toLowerCase()}`);
            }
            else{
            navigate(`/mto/master-data-management/control-panel/${draftDetails.ActionType.toLowerCase()}`);

            }
            toast.dismiss();
            notifySuccess("Draft Loaded Successfully");

        }
        catch(error){
            console.log(error);
        }
            
            // console.log('act name..',draftDetails.ActionType)
            // toast.dismiss();
            // notifySuccess("Draft Loaded Successfully");



            return;
        }
          
            try{
                
                const res:any = await getDraftCount(draftDetails.DraftId);
                const draftCount = JSON.parse(res.data.recordCount)[0].recordCount;
                dispatch(SET_RECORD_COUNT(draftCount));
                let draftDataRaw = [];
                const payload = {
            pageNumber:1,
            recordsPerPage:chunkSize
        }
        
        toastId = notifyLoader(`Downloading Data 0 / ${draftCount}`)
        
        if(draftCount <= chunkSize){
            const result = await getDraftById({id:draftDetails.DraftId,body:payload});
            draftDataRaw = result.data.data;
        }
        else{
            const numberOfPages = Math.ceil(draftCount/chunkSize);
            for(let i=1; i<=numberOfPages; i++){
                payload.pageNumber = i;
                const result = await getDraftById({id:draftDetails.DraftId,body:payload})
                draftDataRaw.push(...result.data.data);
                if(i===numberOfPages) toast.update(toastId,{render:`Downloading Data ${draftCount} / ${draftCount}`})
                else toast.update(toastId,{render:`Downloading Data ${i*chunkSize} / ${draftCount}`})
            }
        }
        toast.dismiss(toastId);

        notifyLoader("Getting Draft Ready")
        
        // toast.update(toastId,{render:"Getting Draft Ready"});
        
        const draftData:any = [];
        draftDataRaw.forEach((data:any)=>{
        const masterIndex = draftData.findIndex((draftObj:any) => draftObj.MasterId == data.MasterId);
            if(masterIndex >= 0){
                if(("DataMaster" in data)){
                    draftData[masterIndex].DataMaster = [...draftData[masterIndex].DataMaster,...data.DataMaster];
                }
                return;
            }
            else{
                draftData.push(data);
            }
            
        })
        
        const mastersData= await getMasterUIConfiguration(getActionName(draftDetails.ActionType).value)
        
        toast.dismiss();
        
        const fields = mastersData.data.data
        const masterState = createMastersStateFromDraftData(draftData,fields)
        const activeMaster = masterState.find((m:MDMMasterState)=>m.progress!=='submitted');
        
        dispatch(TOGGLE_SELECT_MASTER_SCREEN(false))
        dispatch(STORE_ALL_MASTERS(mapMasterToMasterState(fields)))
        dispatch(FILL_MASTERS(masterState))
        dispatch(SET_DRAFT_ID(draftDetails.DraftId))
        if(activeMaster){
            dispatch(UPDATE_ACTIVE_MASTER(masterState.indexOf(activeMaster)))
            dispatch(UPDATE_DATA_AVAILABILITY_STATUS(true))
        }

        
        
        navigate(`/master-data-management/control-panel/${getActionName(draftDetails.ActionType).label}`);
        toast.dismiss();
        notifySuccess("Draft Loaded Successfully");

    }catch(error:any){
        notifyError(error.message);
        toast.dismiss(toastId)
    }
    }
    
    
    
    const onDeleteDraft = async()=>{
        closeDeleteModal();
        await notifyPromise(
            deleteDraft(deleteDraftId),
            {
                pending:'Deleting Draft',
                success:'Draft has been deleted sucessfully',
                error:'Something went wrong'
            }
        )
        refetch();
    }

    return{
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        onEditDraft,
        onDeleteDraft,
        allDrafts,
        isLoading
    }
}

export default useSavedDrafts
