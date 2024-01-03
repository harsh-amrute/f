import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { RootState } from '../../../../../redux/store/store';
import { GridRef, MDMMasterState } from '../../../../../VectorFlow/types/MDM';
import { UPDATE_ACTIVE_MASTER,RESET_STATE, REMOVE_MASTER, ADD_MASTER,TOGGLE_SELECT_MASTER_SCREEN,UPDATE_PROGRESS_STATE,UPDATE_COLDEFS,FILL_MASTERS, TOGGLE_UPLOAD_MODAL, UPDATE_ROW_DATA, UPDATE_FILTER } from '../../../../../redux/actions/MDM';
import { useNavigate } from "react-router";
import { ColDef } from 'ag-grid-enterprise';
import { useRemoveMasterData } from '../../../../..//VectorFlow/Services/MTA/MDM';
import { createSubmitMasterPayload, mapMasterToColumnDefs } from '../../../../../helpers/utils';
import { notifyError } from '../../../../../helpers/notify';


const useDelete=()=>{
    const allMasters = useSelector((state:RootState)=>state.mdm.allMasters); 
    const activeMaster = useSelector((state:RootState)=>state.mdm.activeMaster)
    const selectedMasters = useSelector((state:RootState)=>state.mdm.masters)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {mutateAsync:removeMasterData} = useRemoveMasterData()
    useEffect(()=>{
        if(activeMaster.progress === 'deleteOnline'){
            const updatedColdefs:ColDef[] = [{
                field:'checkbox',
                colId:'checkbox',
                headerName:'',
                checkboxSelection:true,
                headerCheckboxSelection:true,
                headerCheckboxSelectionCurrentPageOnly:true,
            },...activeMaster.colDefs]
            dispatch(UPDATE_COLDEFS(updatedColdefs))
        }
      },[activeMaster.progress]);
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
        dispatch(UPDATE_PROGRESS_STATE('deleteOnline'))
      }

    const onDeleteData = ()=>{
        dispatch(TOGGLE_UPLOAD_MODAL(true))
    }

    const onDeleteOnlineReset = ()=>{
        const currentMasterData = selectedMasters.find((master:MDMMasterState)=>master.id === activeMaster.id)
        if(currentMasterData) dispatch(UPDATE_ROW_DATA(currentMasterData.rowData))
        dispatch(UPDATE_PROGRESS_STATE('deleteOnline'))
    }
    
    const onDeleteOnlineSubmit = ()=>{
        dispatch(UPDATE_PROGRESS_STATE('editOnlineSubmitted'))
    }


    const onCancel=()=>{
        dispatch(RESET_STATE());
        navigate('/master-data-management/control-panel');
    }

    const onSubmit = async()=>{
        dispatch(UPDATE_PROGRESS_STATE('submitted'))
        await removeMasterData(createSubmitMasterPayload(activeMaster,'remove'))
    }


    return {
        allMasters,
        selectedMasters,
        onCancel,
        onDeleteOnline,
        onDeleteData,
        onSubmit,
        onDeleteOnlineSubmit,
        onDeleteOnlineReset,
        handleOnClickMaster,
        handleRadioButton,
        handleSubmitSelectMaster
    }
}

export default useDelete