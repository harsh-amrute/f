import { useSelector,useDispatch } from 'react-redux'
import { RootState } from '../../../../../redux/store/store';
import { MDMMasterState } from '../../../../../VectorFlow/types/MDM';
import { RESET_STATE, REMOVE_MASTER, ADD_MASTER,UPDATE_ACTIVE_MASTER, UPDATE_PROGRESS_STATE, FILL_MASTERS, TOGGLE_UPLOAD_MODAL, TOGGLE_SELECT_MASTER_SCREEN } from '../../../../../redux/actions/MDM';
import { useNavigate } from "react-router";

import { notifyError } from '../../../../../helpers/notify';


const useAdd=()=>{
    const allMasters = useSelector((state:RootState)=>state.mdm.allMasters); //empty arrya jaha data jaega api se
    const selectedMasters = useSelector((state:RootState)=>state.mdm.masters)
    const activeMaster = useSelector((state:RootState)=>state.mdm.activeMaster)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSelectMasterOpen = useSelector((state:RootState)=>state.mdm.isSelectMasterOpen)

    const onCancel=()=>{
        dispatch(RESET_STATE());
        navigate('/master-data-management/control-panel');
    }

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
        console.log(activeMaster.rowData.length)
        if(activeMaster.rowData.length<=0)dispatch(TOGGLE_UPLOAD_MODAL(true))
        dispatch(UPDATE_PROGRESS_STATE('view'))
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

    const handleTabChange = (currMaster: MDMMasterState) => {
        if(currMaster.progress === 'submitted') return notifyError(`The ${currMaster.name} is already submitted`);

        if(currMaster.id===activeMaster.id)return 
  
        const nextMasterIndex = selectedMasters.findIndex((master:MDMMasterState)=>master.progress !== 'submitted');
  
        if(currMaster.id === selectedMasters[nextMasterIndex].id){

            dispatch(UPDATE_ACTIVE_MASTER(nextMasterIndex))
            dispatch(TOGGLE_UPLOAD_MODAL(true))
            return 
        }
        else return notifyError(`Please Complete the ${selectedMasters[nextMasterIndex].name}`);  
  
        
        
      }

    return {
        allMasters,
        onCancel,
        selectedMasters,
        activeMaster,
        isSelectMasterOpen,
        handleOnClickMaster,
        handleSubmitSelectMaster,
        handleRadioButton,
        handleTabChange
    }
}

export default useAdd