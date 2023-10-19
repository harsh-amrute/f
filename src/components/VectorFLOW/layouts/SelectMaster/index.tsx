
import { Dispatch,SetStateAction,useEffect } from "react";
import { Container, QuickFilterHeader,SCButtonContainer, SCLoaderContainer, SCCardContainer } from "./styles"

import VFMasterCard from "../../commons/VFMasterCard/VFMasterCard";
import VFMasterFieldSearch from "../../commons/VFMasterFieldSearch/VFMasterFieldSearch";
import ButtonOutlineStatus from "../../../commons/ButtonOutline/button";
import VFButton from "../../commons/VFButton";
import VFButtonOutline from "../../commons/VFButtonOutline";
import { useNavigate } from "react-router";
import { type Master, type Option } from "../../../../VectorFlow/types/MDM";

interface SelectMasterProps{
    data:Master[],
    options:Option[],
    selectedOptions:Option[],
    setSelectedOptions:Dispatch<SetStateAction<Option[]>>,
    selectedMasters:Master[],
    setSelectedMasters:Dispatch<SetStateAction<Master[]>>,
    filterButtonStatus:Master[],
    setFilterButtonStatus:Dispatch<SetStateAction<Master[]>>
    themeUi:string,
    isLoading:boolean
}

const SelectMaster = ({data,options,selectedOptions,setSelectedOptions,selectedMasters,setSelectedMasters,filterButtonStatus,setFilterButtonStatus,themeUi,isLoading}:SelectMasterProps)=>{
    
    const navigate = useNavigate();

    useEffect(()=>{

        if(selectedMasters.length === 0 && data) {
            setSelectedMasters([...data]);
        }

    },[selectedMasters])
    
    if(isLoading){
        return (
            <SCLoaderContainer>
                <img src="../assets/img/VectorFLOW/loaderBig.svg"/>
            </SCLoaderContainer>
        )
    }

    const onClickFilterButton = (currentMaster:Master) => {
        console.log(selectedMasters);

        setSelectedOptions([])
        
        if(getFilterButtonStatus(currentMaster)){
            setFilterButtonStatus(filterButtonStatus.filter((master:Master)=>master.id !== currentMaster.id));
            setSelectedMasters([...selectedMasters.filter(((selectedMaster:Master)=>selectedMaster.id !== currentMaster.id))])
        }
        else{
            setFilterButtonStatus([...filterButtonStatus,currentMaster]);
            if(selectedMasters.find((selectedMaster:Master)=>selectedMaster.id === currentMaster.id)){
                setSelectedMasters([...selectedMasters.filter(((selectedMaster:Master)=>selectedMaster.id === currentMaster.id))])
            }
            else{
                setSelectedMasters([...selectedMasters,currentMaster]);
            }
        }

            
    }

    const shouldDisplayCard = (currentMaster:Master) => {
        return selectedMasters.find((selectedMaster:Master)=>selectedMaster.id === currentMaster.id);
    }

    const getFilterButtonStatus = (currentMaster:Master) => {
        return filterButtonStatus.find((selectedMaster:Master)=>selectedMaster.id===currentMaster.id) ? true : false;
    }

    return(
        <Container >
            <Container style={{flexDirection:'row',gap:'44px'}}>
                <VFMasterFieldSearch value={selectedOptions} setValue={setSelectedOptions} options={options} placeholder={'Select'} handleListChild={()=>{setFilterButtonStatus([])}} maxToShow={3} backgroundColor={'#FFFFFF'} />
                <Container style={{flexDirection:'row'}}>
                    <QuickFilterHeader>
                        Quick Filters -
                    </QuickFilterHeader>
                    <Container style={{flexDirection:'row',flexWrap:'wrap',maxWidth:'900px',gap:'10px'}}>
                        {data?.map((master:any)=>{
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
                    return shouldDisplayCard(item) && <VFMasterCard data={item} key={item.id} selectedFields={selectedOptions.map((s:Option)=>s.label)}/>
                })}
            </SCCardContainer>
            <SCButtonContainer>
                <VFButtonOutline onClick={()=>navigate('/master-data-management/control-panel')} themeUi={themeUi} width={141}>
                    Cancel
                </VFButtonOutline>
                <VFButton onClick={()=>console.log("test")} themeUi={themeUi} width={141}>
                    Submit
                </VFButton>

            </SCButtonContainer>
            
        </Container>
    )
}

export default SelectMaster;