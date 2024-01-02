import { useSelector,useDispatch } from 'react-redux'
import { RootState } from '../../../../../redux/store/store';
import { useGetMasterUIConfiguration } from '../../../../../VectorFlow/Services/MTA/MDM';
import { useEffect} from 'react';
import { MDMMasterState } from '../../../../../VectorFlow/types/MDM';
import { STORE_ALL_MASTERS,RESET_STATE, REMOVE_MASTER, ADD_MASTER } from '../../../../../redux/actions/MDM';
import { useNavigate } from "react-router";
import { mapMasterToMasterState } from '../../../../../helpers/utils';


const useDelete=()=>{
    const allMasters = useSelector((state:RootState)=>state.mdm.allMasters); 
    const selectedMasters = useSelector((state:RootState)=>state.mdm.masters)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {mutateAsync:getMasterUIConfigurationData,isLoading:isDeleteRecordsLoading} = useGetMasterUIConfiguration(); 

    useEffect(()=>{
        const getData=async()=>{
            const data = await getMasterUIConfigurationData('remove')
            dispatch(STORE_ALL_MASTERS(mapMasterToMasterState(data.data.data)))
        }
        getData()
        
    },[])


    const onCancel=()=>{
        dispatch(RESET_STATE());
        navigate('/master-data-management/control-panel');
    }

    const handleOnClickMaster=(master:MDMMasterState)=>{
        if(selectedMasters.find((m:MDMMasterState)=>m.id===master.id)){
            dispatch(REMOVE_MASTER(master.id))
            return
        }
        dispatch(ADD_MASTER(master))
       
    }

    return {
        allMasters,
        onCancel,
        isDeleteRecordsLoading,
        selectedMasters,
        handleOnClickMaster
    }
}

export default useDelete