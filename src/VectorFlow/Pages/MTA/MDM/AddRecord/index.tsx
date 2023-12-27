
import SelectGroupedMasters from "../../../../../components/VectorFLOW/layouts/SelectGroupedMasters";
import useAdd from "./useAdd";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import { notifySuccess } from "../../../../../helpers/notify";


const AddRecord = () => {
    const {
        isAddRecordsLoading,
        onCancel,
        allMasters,
        selectedMasters,
        handleOnClickMaster
    } = useAdd();


    if(isAddRecordsLoading){
        return <VFLoader/>
    }

    return(
        <SelectGroupedMasters 
            onSelectMasters={()=>{console.log("")}}  
            onSubmit={()=>notifySuccess('Submitted')}  //console.log()
            onCancel={onCancel}
            handleOnClickMaster={handleOnClickMaster}
            allMasters={allMasters}
            selectedMasters={selectedMasters}
        />

        
    )

    
}

export default AddRecord;