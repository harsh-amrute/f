
import SelectGroupedMasters from "../../../../../components/VectorFLOW/layouts/SelectGroupedMasters";
import useAdd from "./useAdd";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";


const AddRecord = () => {
    const {
        isAddRecordsLoading,
        onCancel,
        mapMasterUIToMasterGroup,
        allMasters,
        selectedMasters,
        handleOnClickMaster
    } = useAdd();


    if(isAddRecordsLoading){
        return <VFLoader/>
    }

    return(
        <SelectGroupedMasters 
            onSelectMasters={()=>{}}  
            onSubmit={()=>console.log('')}
            onCancel={onCancel}
            mapMasterUIToMasterGroup={mapMasterUIToMasterGroup}
            handleOnClickMaster={handleOnClickMaster}
            allMasters={allMasters}
            selectedMasters={selectedMasters}
        />

        
    )

    
}

export default AddRecord;