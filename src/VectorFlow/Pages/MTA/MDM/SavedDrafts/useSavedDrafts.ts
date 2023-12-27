import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router"
import {useGetAllDrafts, useDeleteDraft } from "../../../../../VectorFlow/Services/MTA/MDM"
import { notifyPromise } from "../../../../../helpers/notify"


const useSavedDrafts = ()=>{

    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    // const {mutateAsync:getDraftById} = useGetDraftById()
    // const {mutateAsync:getMasterUIConfiguration} = useGetMasterUIConfiguration()
    const {mutateAsync:deleteDraft} = useDeleteDraft()
    const [isDeleteModalOpen,toggleDeleteModal] = useState<boolean>(false)
    const [deleteDraftId,setDeleteDraftId] = useState<string>("");
    const {data,isLoading,refetch} = useGetAllDrafts();
    const allDrafts = data?.data.data;
  

    const openDeleteModal = (draftId:string)=>{
        setDeleteDraftId(draftId)
        toggleDeleteModal(true)
    }

    const closeDeleteModal =()=>toggleDeleteModal(false)

    const onEditDraft = async(draftId:string)=>{
        console.log(draftId)

        // const draftData = await getDraftById(draftId)
        // const mastersData= await getMasterUIConfiguration('modify')



        // const masters = mastersData.data.data
        
        // dispatch(TOGGLE_SELECT_MASTER_SCREEN(true))
        // navigate('/master-data-management/view-modify')
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
