import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { TOGGLE_SELECT_MASTER_SCREEN } from "../../../../../redux/actions/MDM"
import { useGetDraftById, useGetMasterUIConfiguration } from "../../../../../VectorFlow/Services/MTA/MDM"
import { notifyPromise } from "../../../../../helpers/notify"
import { MDMService } from "../../../../../VectorFlow/Services/MTA/MDM/api"


const useSavedDrafts = ()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {mutateAsync:getDraftById} = useGetDraftById()
    const {mutateAsync:getMasterUIConfiguration} = useGetMasterUIConfiguration()
    const [isDeleteModalOpen,toggleDeleteModal] = useState<boolean>(false)
    const [deleteDraftId,setDeleteDraftId] = useState<string>("")

    const openDeleteModal = (draftId:string)=>{
        setDeleteDraftId(draftId)
        toggleDeleteModal(true)
    }

    const closeDeleteModal =()=>toggleDeleteModal(false)

    const onEditDraft = async(draftId:string)=>{

        const draftData = await getDraftById(draftId)
        const mastersData= await getMasterUIConfiguration('modify')



        const masters = mastersData.data.data
        
        // dispatch(TOGGLE_SELECT_MASTER_SCREEN(true))
        // navigate('/master-data-management/view-modify')
    }


    
    const onDeleteDraft = async()=>{
        closeDeleteModal();
        await notifyPromise(
            MDMService.deleteDraft(deleteDraftId),
            {
                pending:'Deleting Draft',
                success:'Draft has been deleted sucessfully',
                error:'Something went wrong'
            }
        )
    }

    return{
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        onEditDraft,
        onDeleteDraft
    }
}

export default useSavedDrafts
