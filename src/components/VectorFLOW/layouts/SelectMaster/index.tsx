
import { Dispatch,SetStateAction,useEffect, useState } from "react";
import { Container, QuickFilterHeader,SCButtonContainer, SCLoaderContainer, SCCardContainer } from "./styles"

import VFMasterCard from "../../commons/VFMasterCard";
import VFMasterFieldSearch from "../../commons/VFMasterFieldSearch";
import ButtonOutlineStatus from "../../../commons/ButtonOutline/button";
import VFButton from "../../commons/VFButton";
import VFButtonOutline from "../../commons/VFButtonOutline";
import { useNavigate } from "react-router";
import { type Master, type Option } from "../../../../VectorFlow/types/MDM";
import { useDispatch } from 'react-redux';
import { setSelectedOptions, setSelectedMasters } from '../../../../redux/features/MDM';
import { notifyError } from "../../../../helpers/notify";

interface SelectMasterProps{
    data:Master[],
    options:Option[],
    selectedOptions:Option[],
    selectedMasters:Master[],
    filterButtonStatus:Master[],
    setFilterButtonStatus:Dispatch<SetStateAction<Master[]>>
    themeUi:string,
    isLoading:boolean,
    handleSubmit:() => void
}

const SelectMaster = (
    {
        data,
        options,
        selectedOptions,
        selectedMasters,
        filterButtonStatus,
        setFilterButtonStatus,
        themeUi,
        isLoading,
        handleSubmit
    }:SelectMasterProps)=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [tempMasters,setTempMasters] = useState<Master[]>([])

    useEffect(()=>{

        if(selectedMasters?.length === 0 && data) {
            dispatch(setSelectedMasters([...data]));
        }

    },[selectedMasters])
    
    if(isLoading){
        return (
            <SCLoaderContainer>
                <img src="../assets/img/VectorFLOW/loaderBig.svg" data-testid="loader"/>
            </SCLoaderContainer>
        )
    }
    // console.debug(filterButtonStatus);

    const onClickFilterButton = (currentMaster:Master) => {
        // console.debug(getFilterButtonStatus(currentMaster),tempMasters)

        if(getFilterButtonStatus(currentMaster) && !tempMasters.find((t:Master)=>t.id===currentMaster.id)){
            notifyError('You can only add new master')
            return
        }
        else{
            // console.debug(filterButtonStatus,currentMaster)
            setTempMasters([...tempMasters,currentMaster])
        }
        dispatch(setSelectedOptions([]));
        
        
        if(getFilterButtonStatus(currentMaster)){
            console.log('in if')
            setFilterButtonStatus(filterButtonStatus.filter((master:Master)=>master.id !== currentMaster.id));
            dispatch(setSelectedMasters([...selectedMasters.filter(((selectedMaster:Master)=>selectedMaster.id !== currentMaster.id))]))
        }
        else{
            console.log('else');
            setFilterButtonStatus([...filterButtonStatus,currentMaster]);
            if(selectedMasters.find((selectedMaster:Master)=>selectedMaster.id === currentMaster.id)){
                dispatch(setSelectedMasters([...selectedMasters.filter(((selectedMaster:Master)=>selectedMaster.id === currentMaster.id))]));
            }
            else{
                dispatch(setSelectedMasters([...selectedMasters,currentMaster]));
            }
        }   
    }

    const shouldDisplayCard = (currentMaster:Master) => {
        return selectedMasters.find((selectedMaster:Master)=>selectedMaster.id === currentMaster.id);
    }

    const getFilterButtonStatus = (currentMaster:Master) => {
        return filterButtonStatus.find((selectedMaster:Master)=>selectedMaster.id===currentMaster.id) ? true : false;
    }

    const setValue = (option:any) => {
        dispatch(setSelectedOptions(option));
    }

    return(
        <Container >
            <Container style={{flexDirection:'row',gap:'44px'}}>
                <VFMasterFieldSearch value={selectedOptions} setValue={setValue} options={options} placeholder={'Select'} handleListChild={()=>{setFilterButtonStatus([])}} maxToShow={3} backgroundColor={'#FFFFFF'} />
                <Container style={{flexDirection:'row'}}>
                    <QuickFilterHeader>
                        Quick Filters -
                    </QuickFilterHeader>
                    <Container style={{flexDirection:'row',flexWrap:'wrap',maxWidth:'900px',gap:'10px'}}>
                        {data?.map((master:Master)=>{
                            return(
                                <ButtonOutlineStatus
                                    status={getFilterButtonStatus(master)}
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
                {data?.map((item:Master)=>{
                    return shouldDisplayCard(item) && <VFMasterCard data={{...item,name:item.name + ' Master'}} key={item.id} selectedFields={selectedOptions.map((s:Option)=>s.label)}/>
                })}
            </SCCardContainer>
            <SCButtonContainer>
                <VFButtonOutline onClick={()=>navigate('/master-data-management/control-panel')} themeUi={themeUi} width={141} disabled={false}>
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