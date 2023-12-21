import VFButtonOutline from "../../../VectorFLOW/commons/VFButtonOutline";
import { ContentWrapper, TextContainer, TextFilterWrapper,VFMasterGroupCard,VFMasterGroupCardHeader,VFMasterGroupCardHeaderText, VFButtonWrapper,VFMasterGroupCardContent,VFMasterGroupCardImage,VFMasterGroupCardText,VFMasterGroupCardContainer} from "./styles"
import { useUserData } from "../../../../context";
import VFButton from "../../../VectorFLOW/commons/VFButton";
import { useState,ReactNode} from "react";
import { MDMMasterState } from "../../../../VectorFlow/types/MDM";
import {ImageMapper,ImageMapperHover, masterGroupMapper} from "../../../../helpers/MDMConstants"
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import * as globalStyles from "../../../../styles/global";

export interface SelectGroupedMastersProps {
    onSubmit:()=>void;
    onCancel:()=>void;
    onHover?:ReactNode;
    onSelectMasters:()=>void;
    mapMasterUIToMasterGroup:(params:any)=>boolean;
    handleOnClickMaster:(master:MDMMasterState)=>void;
    allMasters:MDMMasterState[]
    selectedMasters:MDMMasterState[]
}
interface CardProps{
    master:MDMMasterState
    onClick:()=>void
    handleOnClickMaster:(master:MDMMasterState)=>void
}

const Card=(props:CardProps)=>{
    const {user} = useUserData()
    const selectedMasters = useSelector((state:RootState)=>state.mdm.masters)
    const [isHovered, setIsHovered] = useState(false);
    const {
        master,
        handleOnClickMaster
    } = props;

    return(
        <VFMasterGroupCardContent theme={user.user.theme_ui} style={{backgroundColor: selectedMasters.find((m:MDMMasterState)=>m.id===master.id)|| isHovered ? globalStyles.chooseThemeColor[user.user.theme_ui]?.color5 : 'white'}}
            id={master.name} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={()=>handleOnClickMaster(master)}
        >
            <VFMasterGroupCardImage 
                style={{
                    backgroundColor:selectedMasters.find((m)=>m.id===master.id) || isHovered ? globalStyles.chooseThemeColor[user.user.theme_ui]?.color5 : '#F4F4F4',
                    border:selectedMasters.find((m)=>m.id===master.id) || isHovered ? 'white 1px solid':'none'
                }}>
                <img src={isHovered || selectedMasters.find((m:MDMMasterState)=>m.id===master.id)
                    ?ImageMapperHover[master.id]
                    :ImageMapper[master.id]
                    }
                    alt={master.name}
                />
            </VFMasterGroupCardImage>
            <VFMasterGroupCardText style={{color:selectedMasters.find((m:MDMMasterState)=>m.id===master.id) || isHovered ? 'white': 'black'}}>
                <div key={master.name}>
                <p>{master.name}</p>
                </div>
            </VFMasterGroupCardText>
        </VFMasterGroupCardContent>
    )
}
const SelectGroupedMasters = (props:SelectGroupedMastersProps)=>{   
    const{
        onSubmit,
        onCancel,
        handleOnClickMaster,
        allMasters,
        selectedMasters
    } = props

    const {user} = useUserData();
    console.log(allMasters);
    console.log(selectedMasters)
   // const selectedMasters = useSelector((state:RootState)=>state.mdm.masters)
    //const allMasters = useSelector((state:RootState)=>state.mdm.allMasters)

 return(
    <ContentWrapper>
        <TextFilterWrapper>
            <TextContainer>
             <p>What kind of records do you want to add?</p>
            </TextContainer>
        </TextFilterWrapper>
        <VFMasterGroupCardContainer> 
        {
        masterGroupMapper.map(masterGroup=>{
         if(masterGroup.masters.length<1)return 
            return(
            <VFMasterGroupCard> 
                <VFMasterGroupCardHeader>
                    <VFMasterGroupCardHeaderText> 
                        <p>{masterGroup.name}</p>
                    </VFMasterGroupCardHeaderText>
                        {allMasters.map((currentMaster)=>{
                            if(masterGroup.masters.includes(currentMaster.id.toString())){
                            return(
                            <Card master={currentMaster} onClick={()=>console.log('')} handleOnClickMaster={handleOnClickMaster}/>
                        )}})}
                </VFMasterGroupCardHeader> 
            </VFMasterGroupCard>
                    )
            })
        }
        </VFMasterGroupCardContainer> 
            <VFButtonWrapper>
                <VFButtonOutline onClick={onCancel} themeUi={user.user.theme_ui} color={'#A8A2A3'} style={{marginRight:'25px'}}>Cancel</VFButtonOutline>
                <VFButton onClick={onSubmit} themeUi={user.user.theme_ui} disabled={selectedMasters.length===0}>Submit</VFButton>
            </VFButtonWrapper> 
    </ContentWrapper>
    )
}

export default SelectGroupedMasters;

