
import SelectGroupedMasters from "../../../../../components/VectorFLOW/layouts/SelectGroupedMasters";
import useDelete from "./useDelete";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import { notifySuccess } from "../../../../../helpers/notify";


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
        <SelectGroupedMasters  
            onSubmit={()=>notifySuccess('Submitted')} //console.log
            onCancel={onCancel}
            handleOnClickMaster={handleOnClickMaster}
            allMasters={allMasters}
            selectedMasters={selectedMasters}
            text={'delete'}
        />  
    
    )  
}

export default DeleteRecord;