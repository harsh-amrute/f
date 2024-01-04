
import SelectGroupedMasters from "../../../../../components/VectorFLOW/layouts/SelectGroupedMasters";
import useDelete from "./useDelete";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import { notifySuccess } from "../../../../../helpers/notify";
import SubmitConflictModal from "../ViewModify/SubmitConflictModal";



const DeleteRecord = () => {
    const {
        isDeleteRecordsLoading,
        onCancel,
        allMasters,
        selectedMasters,
        handleOnClickMaster
    } = useDelete();


    if(isDeleteRecordsLoading){
        return <VFLoader/>
    }

    return(
        <>
        <SubmitConflictModal totalCount={20} modificationCount={4} recordCount={16} onCloseModal={()=>(console.log(''))} onFailure={()=>(console.log(''))} onSuccess={()=>(console.log(''))}></SubmitConflictModal>
        <SelectGroupedMasters  
            onSubmit={()=>notifySuccess('Submitted')} //console.log
            onCancel={onCancel}
            handleOnClickMaster={handleOnClickMaster}
            allMasters={allMasters}
            selectedMasters={selectedMasters}
            text={'delete'}
        /> 
        </>
        
    )  
}

export default DeleteRecord;