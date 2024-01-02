import { useSelector,useDispatch } from 'react-redux'
import { RootState } from '../../../../../redux/store/store';
import { MDMMasterState } from '../../../../../VectorFlow/types/MDM';
import { UPDATE_ACTIVE_MASTER,RESET_STATE, REMOVE_MASTER, ADD_MASTER,TOGGLE_SELECT_MASTER_SCREEN,UPDATE_PROGRESS_STATE,UPDATE_COLDEFS,FILL_MASTERS, TOGGLE_UPLOAD_MODAL } from '../../../../../redux/actions/MDM';
import { useNavigate } from "react-router";
import { ColDef } from 'ag-grid-enterprise';


const useDelete=()=>{
    const allMasters = useSelector((state:RootState)=>state.mdm.allMasters); 
    const activeMaster = useSelector((state:RootState)=>state.mdm.activeMaster)
    const selectedMasters = useSelector((state:RootState)=>state.mdm.masters)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnClickMaster=(master:MDMMasterState)=>{

        //For seasonality
        if(master.id==11){
            const doesSeasonalityMasterExist = selectedMasters.find((m:MDMMasterState)=>m.id==11 || m.id==12)
            if(doesSeasonalityMasterExist){
                dispatch(REMOVE_MASTER(doesSeasonalityMasterExist.id))
                return
            }
            return dispatch(ADD_MASTER({...master,name:'Seasonality'}))
        }
        

        //for PIPO
        if(master.id==7){
            const doesPIPOMasterExist = selectedMasters.find((m:MDMMasterState)=>m.id==7 || m.id==8 || m.id==9)
            if(doesPIPOMasterExist){
                dispatch(REMOVE_MASTER(doesPIPOMasterExist.id))
                return
            }
            return dispatch(ADD_MASTER({...master,name:'Phase In Phase Out'}))
        }

        if(selectedMasters.find((m:MDMMasterState)=>m.id===master.id)){
            dispatch(REMOVE_MASTER(master.id))
            return
        }        
        dispatch(ADD_MASTER(master))
       
    }

    const handleSubmitSelectMaster = ()=>{
        dispatch(UPDATE_ACTIVE_MASTER(0));
        dispatch(TOGGLE_SELECT_MASTER_SCREEN(false))
        dispatch(UPDATE_PROGRESS_STATE('default'))
    }
    


    const handleRadioButton = (masterFileId:number)=>{
        if(masterFileId==activeMaster.id){
            return
        }
        const isSeasonality = masterFileId==11 || masterFileId==12
        const doesMasterExist = allMasters.find((m:MDMMasterState)=>m.id==masterFileId)
        if(doesMasterExist){
            const newSelectedMasters = selectedMasters.map((master:MDMMasterState)=>{
                if(master.id==activeMaster.id){
                    return {...doesMasterExist,name:isSeasonality?"Seasonality":"Phase In Phase Out"}
                }
                return master
            })
            dispatch(FILL_MASTERS(newSelectedMasters))
            dispatch(UPDATE_ACTIVE_MASTER({...doesMasterExist,name:isSeasonality?"Seasonality":"Phase In Phase Out"}))
        }
        
    }

    const onDeleteOnline = ()=>{
        const updatedColdefs = activeMaster.colDefs.map((col:ColDef)=>{
          return {...col,editable:true,}
        })
        dispatch(UPDATE_PROGRESS_STATE('deleteOnline'))
        dispatch(UPDATE_COLDEFS(updatedColdefs))
      }

    const onDeleteData = ()=>{
        dispatch(TOGGLE_UPLOAD_MODAL(true))
    }

    

    const onCancel=()=>{
        dispatch(RESET_STATE());
        navigate('/master-data-management/control-panel');
    }

    return {
        allMasters,
        selectedMasters,
        onCancel,
        onDeleteOnline,
        onDeleteData,
        handleOnClickMaster,
        handleRadioButton,
        handleSubmitSelectMaster
    }
}

export default useDelete