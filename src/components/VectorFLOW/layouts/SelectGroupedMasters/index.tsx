import VFButtonOutline from "../../../VectorFLOW/commons/VFButtonOutline";
import { ContentWrapper, TextContainer, TextFilterWrapper,VFMasterGroupCard,VFMasterGroupCardHeader,VFMasterGroupCardHeaderText, VFButtonWrapper,VFMasterGroupCardContent,VFMasterGroupCardImage,VFMasterGroupCardText,VFMasterGroupCardContainer} from "./styles"
import { useUserData } from "../../../../context";
import VFButton from "../../../VectorFLOW/commons/VFButton";
import { useState,ReactNode} from "react";
import { MDMMasterState } from "../../../../VectorFlow/types/MDM";
import {ImageMapper,ImageMapperHover, masterGroupMapper} from "../../../../helpers/MDMConstants"
import * as globalStyles from "../../../../styles/global";

export interface SelectGroupedMastersProps {
    onSubmit:()=>void;
    onCancel:()=>void;
    onHover?:ReactNode;
    handleOnClickMaster:(master:MDMMasterState)=>void;
    allMasters:MDMMasterState[]
    selectedMasters:MDMMasterState[]
    text:string
}
interface CardProps{
    master:MDMMasterState
    handleOnClickMaster:(master:MDMMasterState)=>void
    selectedMasters:MDMMasterState[]
}

const Card=(props:CardProps)=>{
    const {user} = useUserData()
    const [isHovered, setIsHovered] = useState(false);
    const {
        master,
        handleOnClickMaster,
        selectedMasters
    } = props;

    const getMasterName = ():string=>{
        if(master.id==11 || master.id==12){
            return "Seasonality"
        }
        if(master.id==7 || master.id==8 || master.id==9){
            return 'Phase In Phase Out'
        }
        return master.name
    }

    const doesMasterExist = ()=>{
        if(master.id==7){
            return selectedMasters.find((m)=>m.id==7 || m.id==8 || m.id==9)
        }
        if(master.id==11){
            return selectedMasters.find((m)=>m.id==11 || m.id==12)
        }
        return selectedMasters.find((m)=>m.id==master.id)
    }

    return(
        <VFMasterGroupCardContent data-testid='vf-master-group-card' theme={user.user.theme_ui} style={{backgroundColor: doesMasterExist()|| isHovered ? globalStyles.chooseThemeColor[user.user.theme_ui]?.color5 : 'white'}}
            id={master.name} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={()=>handleOnClickMaster(master)}
        >
            <VFMasterGroupCardImage data-testid="vf-master-card-image"
                style={{ 
                    backgroundColor:doesMasterExist() || isHovered ? globalStyles.chooseThemeColor[user.user.theme_ui]?.color5 : '#F4F4F4',
                    border:doesMasterExist() || isHovered ? 'white 1px solid':'none'
                }}>
                <img src={isHovered || doesMasterExist()
                    ?ImageMapperHover[master.id]
                    :ImageMapper[master.id]
                    }
                    alt={master.name}
                    height='37px'
                    width='37px'
                />
            </VFMasterGroupCardImage>
            <VFMasterGroupCardText style={{color:doesMasterExist() || isHovered ? 'white': 'black'}}>
                <div key={master.name}>
                <p>{getMasterName()}</p>
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
        selectedMasters,
        text
    } = props

    const {user} = useUserData();
   
 return(
    <ContentWrapper>
        <TextFilterWrapper>
            <TextContainer>
             <p>What kind of records do you want to {text}?</p>
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
                       
                </VFMasterGroupCardHeader>
                {allMasters.map((currentMaster)=>{
                            if(masterGroup.masters.includes(currentMaster.id.toString())){
                            return(
                            <Card master={currentMaster} handleOnClickMaster={handleOnClickMaster} selectedMasters={selectedMasters}/>
                        )}})} 
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

