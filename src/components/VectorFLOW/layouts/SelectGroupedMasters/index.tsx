import VFButtonOutline from "../../../VectorFLOW/commons/VFButtonOutline";
import { ContentWrapper, TextContainer, TextFilterWrapper,VFMasterGroupCard,VFMasterGroupCardHeader,VFMasterGroupCardHeaderText, VFButtonWrapper,VFMasterGroupCardContent,VFMasterGroupCardImage,VFMasterGroupCardText,VFMasterGroupCardContainer} from "./styles"
import { useUserData } from "../../../../context";
import VFButton from "../../../VectorFLOW/commons/VFButton";
import { useState,ReactNode} from "react";
import { AddRecordMasterGroup, MDMMasterState } from "../../../../VectorFlow/types/MDM";
import {ImageMapper,ImageMapperHover} from "../../../../helpers/MDMConstants"
interface SelectGroupedMastersProps {
    allMasters:MDMMasterState[]
    onSubmit:()=>void;
    onCancel:()=>void;
    onHover?:ReactNode;
    onSelectMasters?:()=>void;
}

interface CardProps{
    master:MDMMasterState
}


const SelectGroupedMasters = (props:SelectGroupedMastersProps)=>{   
    const{
        allMasters,
        onSubmit,
        onCancel,
        onSelectMasters
    } = props

    const {user} = useUserData()

    const Card=(props:CardProps)=>{
     const [isHovered, setIsHovered] = useState(false);
     const {master} = props;

        return(
            <VFMasterGroupCardContent theme={user.user.theme_ui} 
                id={master.name} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onSelectMasters}>
            <VFMasterGroupCardImage> 
                <img src={isHovered
                ?ImageMapperHover[master.id]
                :ImageMapper[master.id]
            } 
                alt={master.name}/>
                </VFMasterGroupCardImage>
                <VFMasterGroupCardText>
                <div key={master.name}>
                <p>{master.name}</p>
                </div>
                </VFMasterGroupCardText>
            </VFMasterGroupCardContent>
        )
    }
    
 return(
    <ContentWrapper>
        <TextFilterWrapper>
            <TextContainer>
            <p>What kind of records do you want to add?</p>
            </TextContainer>
        </TextFilterWrapper>
        <VFMasterGroupCardContainer> 
         {
        allMasters.map(container=>{
            return(
            <VFMasterGroupCard> 
             <VFMasterGroupCardHeader>
              <VFMasterGroupCardHeaderText> 
                <p>{container.name}</p>
             </VFMasterGroupCardHeaderText>
                {container.masters.map((obj)=>{
                    if(container.masters.includes(obj.id))
                return(
                <Card obj={obj}/>
            )})}
            </VFMasterGroupCardHeader> 
            </VFMasterGroupCard>
                    )
                })
            }
        </VFMasterGroupCardContainer> 
        <VFButtonWrapper>
            <VFButtonOutline onClick={onCancel} themeUi={user.user.theme_ui} color={'#A8A2A3'} style={{marginRight:'25px'}}>Cancel</VFButtonOutline>
            <VFButton onClick={onSubmit} themeUi={user.user.theme_ui}>Submit</VFButton>
        </VFButtonWrapper>
    </ContentWrapper>
    )
}

export default SelectGroupedMasters;