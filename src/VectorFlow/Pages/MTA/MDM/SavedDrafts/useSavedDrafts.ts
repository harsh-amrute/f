import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import {useGetAllDrafts, useDeleteDraft,useGetDraftById,useGetMasterUIConfiguration } from "../../../../../VectorFlow/Services/MTA/MDM"
import { notifyError, notifyPromise } from "../../../../../helpers/notify"

import { FILL_MASTERS, SET_DRAFT_ID, STORE_ALL_MASTERS, TOGGLE_SELECT_MASTER_SCREEN, UPDATE_ACTIVE_MASTER } from "../../../../../redux/actions/MDM"
import { createMastersStateFromDraftData, getActionName, mapMasterToMasterState } from "../../../../../helpers/utils"
import { MDMMasterState } from "../../../../../VectorFlow/types/MDM"
// import type { RootState } from '../../../../../redux/store/store';

const useSavedDrafts = ()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {mutateAsync:getDraftById} = useGetDraftById()
    const {mutateAsync:getMasterUIConfiguration} = useGetMasterUIConfiguration()
    const {mutateAsync:deleteDraft} = useDeleteDraft()
    const [isDeleteModalOpen,toggleDeleteModal] = useState<boolean>(false)
    const [deleteDraftId,setDeleteDraftId] = useState<string>("");
    const {data,isLoading,refetch} = useGetAllDrafts();
    // const chunkSize = useSelector((state:RootState) => state.mdm.chunkSize)
    const allDrafts = data?.data.data;
  

    const openDeleteModal = (draftId:string)=>{
        setDeleteDraftId(draftId)
        toggleDeleteModal(true)
    }

    const closeDeleteModal =()=>toggleDeleteModal(false)

    const onEditDraft = async(draftDetails:any)=>{

       try{
        
        
        const draftData = await getDraftById(draftDetails.DraftId)

        const mastersData= await getMasterUIConfiguration(getActionName(draftDetails.ActionType).value)

        const fields = mastersData.data.data
        const masterState = createMastersStateFromDraftData(draftData.data.data,fields)
        const activeMaster = masterState.find((m:MDMMasterState)=>m.progress!=='submitted')
        dispatch(TOGGLE_SELECT_MASTER_SCREEN(false))
        dispatch(STORE_ALL_MASTERS(mapMasterToMasterState(fields)))
        dispatch(FILL_MASTERS(masterState))
        dispatch(SET_DRAFT_ID(draftDetails.DraftId))
        if(activeMaster)dispatch(UPDATE_ACTIVE_MASTER(masterState.indexOf(activeMaster)))
        
        navigate(`/master-data-management/control-panel/${getActionName(draftDetails.ActionType).label}`)
       }catch(error:any){
        notifyError(error.message)
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
