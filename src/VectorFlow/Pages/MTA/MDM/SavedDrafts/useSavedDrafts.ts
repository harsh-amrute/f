import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router"
import {useGetAllDrafts, useDeleteDraft,useGetDraftById,useGetMasterUIConfiguration, useGetDraftCount } from "../../../../../VectorFlow/Services/MTA/MDM"
import { notifyError, notifyPromise, notifySuccess, notifyLoader } from "../../../../../helpers/notify"

import { FILL_MASTERS, SET_DRAFT_ID, SET_RECORD_COUNT, STORE_ALL_MASTERS, TOGGLE_SELECT_MASTER_SCREEN, UPDATE_ACTIVE_MASTER, UPDATE_DATA_AVAILABILITY_STATUS } from "../../../../../redux/actions/MDM"
import { createMastersStateFromDraftData, getActionName, mapMasterToMasterState } from "../../../../../helpers/utils"
import { MDMMasterState } from "../../../../../VectorFlow/types/MDM"
import type { RootState } from '../../../../../redux/store/store';
import { toast } from 'react-toastify';

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
    const allDrafts = data?.data.data;
  

    const openDeleteModal = (draftId:string)=>{
        setDeleteDraftId(draftId)
        toggleDeleteModal(true)
    }

    const closeDeleteModal =()=>toggleDeleteModal(false)

    const onEditDraft = async(draftDetails:any)=>{
       let toastId;

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
