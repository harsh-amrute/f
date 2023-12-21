import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store/store';
import {masterGroupMapper} from '../../../../../helpers/MDMConstants';
import { useGetMasterUIConfiguration } from '../../../../../VectorFlow/Services/MTA/MDM';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MDMMasterState } from '../../../../../VectorFlow/types/MDM';
import { STORE_ALL_MASTERS,RESET_STATE, REMOVE_MASTER, ADD_MASTER } from '../../../../../redux/actions/MDM';
import { useNavigate } from "react-router";


const useAdd=()=>{
    const allMasters = useSelector((state:RootState)=>state.mdm.allMasters); //empty arrya jaha data jaega api se
    const selectedMasters = useSelector((state:RootState)=>state.mdm.masters)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {mutateAsync:getMasterUIConfigurationData,isLoading:isAddRecordsLoading} = useGetMasterUIConfiguration(); //usequery se uiconfi ko bulaya hai

    useEffect(()=>{
        const getData=async()=>{
            const data = await getMasterUIConfigurationData('add')
            console.log(data.data.data)
            dispatch(STORE_ALL_MASTERS(data.data.data))
        }
        getData()
        
    },[])

    const mapMasterUIToMasterGroup=(currentMaster:{id:number,name:string})=>{

           masterGroupMapper.map((m)=>{
            if( m.masters.includes(currentMaster.id.toString())){
                return true
            }
           })
        
        return false
    }

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
        console.log('dsfa')
    }
    

    return {
        allMasters,
        onCancel,
        mapMasterUIToMasterGroup,
        isAddRecordsLoading,
        selectedMasters,
        handleOnClickMaster
    }

}

export default useAdd