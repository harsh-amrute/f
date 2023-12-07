
import { Dispatch,SetStateAction,useEffect, useState } from "react";
import { Container, QuickFilterHeader,SCButtonContainer, SCLoaderContainer, SCCardContainer } from "./styles"

import VFMasterCard from "../../commons/VFMasterCard";
import VFMasterFieldSearch from "../../commons/VFMasterFieldSearch";
import ButtonOutlineStatus from "../../../commons/ButtonOutline/button";
import VFButton from "../../commons/VFButton";
import VFButtonOutline from "../../commons/VFButtonOutline";
import { useNavigate } from "react-router";
import { type MDMMasterState, type Master, type Option } from "../../../../VectorFlow/types/MDM";
import { useDispatch, useSelector } from 'react-redux';
import { notifyError } from "../../../../helpers/notify";
import { RootState } from "../../../../redux/store/store";
import { ADD_MASTER, FILL_MASTERS, FILL_SELECTED_OPTIONS, FILTER_MASTER, REMOVE_MASTER, RESET_STATE } from "../../../../redux/actions/MDM";

interface SelectMasterProps{
    data:MDMMasterState[],
    options:Option[],
    selectedOptions:Option[],
    filterButtonStatus:number[],
    setFilterButtonStatus:Dispatch<SetStateAction<number[]>>
    themeUi:string,
    isLoading:boolean,
    handleSubmit:() => void
}

const SelectMaster = (
    {
        data,
        options,
        selectedOptions,
        filterButtonStatus,
        setFilterButtonStatus,
        themeUi,
        isLoading,
        handleSubmit
    }:SelectMasterProps)=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const masters = useSelector((state:RootState)=>state.mdm.masters);
    
    const [tempMasters,setTempMasters] = useState<number[]>([])

    
    if(isLoading){
        return (
            <SCLoaderContainer>
                <img src="../assets/img/VectorFLOW/loaderBig.svg" data-testid="loader"/>
            </SCLoaderContainer>
        )
    }

    const onClickFilterButton = (currMaster:MDMMasterState) => {

        if(getFilterButtonStatus(currMaster.id) && !tempMasters.find((t:number)=>t === currMaster.id)){
            notifyError('You can only add new master')
            return
        }
        else{
            setTempMasters([...tempMasters,currMaster.id])
        }
        dispatch(FILL_SELECTED_OPTIONS([]));
        
        if(getFilterButtonStatus(currMaster.id)){
            setFilterButtonStatus(filterButtonStatus.filter((masterId:number)=>masterId !== currMaster.id));
            dispatch(REMOVE_MASTER(currMaster.id))
        }
        else{
            setFilterButtonStatus([...filterButtonStatus,currMaster.id]);
            if(masters.find((selectedMaster:MDMMasterState)=>selectedMaster.id === currMaster.id)){
                dispatch(FILTER_MASTER(currMaster.id));
            }
            else{
                if(filterButtonStatus.length === 0) dispatch(FILL_MASTERS([currMaster]));
                else dispatch(ADD_MASTER(currMaster));
            }
        }   
    }

    const getFilterButtonStatus = (masterId:number) => {
        return filterButtonStatus.find((id:number)=>id===masterId) ? true : false;
    }

    const setValue = (options:any) => {
        dispatch(FILL_SELECTED_OPTIONS(options))
    }

    const onCancel = () => {
        dispatch(RESET_STATE());
        navigate('/master-data-management/control-panel');
    }

    return(
        <Container >
            <Container style={{flexDirection:'row',gap:'44px'}}>
                <VFMasterFieldSearch 
                    value={selectedOptions} 
                    setValue={setValue} 
                    options={options} 
                    placeholder={'Select'} 
                    handleListChild={()=>{setFilterButtonStatus([])}} 
                    maxToShow={3} 
                    backgroundColor={'#FFFFFF'}
                    disabled={tempMasters.length === 0 ? true : false}
                    onClick={()=>{
                        if(tempMasters.length === 0){
                            notifyError("You Can only select from Quick Filters")
                        }
                    }} 
                />
                <Container style={{flexDirection:'row'}}>
                    <QuickFilterHeader>
                        Quick Filters -
                    </QuickFilterHeader>
                    <Container style={{flexDirection:'row',flexWrap:'wrap',maxWidth:'900px',gap:'10px'}}>
                        {data?.map((master:MDMMasterState)=>{
                            return(
                                <ButtonOutlineStatus
                                    status={getFilterButtonStatus(master.id)}
                                    text={master.name}
                                    onChange={()=>onClickFilterButton(master)}
                                    icon=''
                                    key={master.id}
                                    style={{ fontSize:'13px',fontFamily:'Roboto',letterSpacing:'0px',fontWeight:400,lineHeight:'15px',width:'auto',minWidth:'90px'}}
                                />
                            )
                        })}
                    </Container>
                </Container>
            </Container>
            <SCCardContainer>
                {masters.map((item:MDMMasterState)=>{
                    return <VFMasterCard data={{...item,name:item.name + ' Master'}} key={item.id} selectedFields={selectedOptions.map((s:Option)=>s.label)}/>
                })}
            </SCCardContainer>
            <SCButtonContainer>
                <VFButtonOutline onClick={onCancel} themeUi={themeUi} width={141} disabled={false}>
                    Cancel
                </VFButtonOutline>
                <VFButton onClick={() =>{ handleSubmit() }} themeUi={themeUi} width={141}>
                    Submit
                </VFButton>

            </SCButtonContainer>
            
        </Container>
    )
}

export default SelectMaster;