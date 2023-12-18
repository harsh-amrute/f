import VFButtonOutline from "../../commons/VFButtonOutline";
import { ContentWrapper, TextContainer, TextFilterWrapper,VFMasterGroupCard,VFMasterGroupCardHeader,VFMasterGroupCardHeaderText, VFButtonWrapper,VFMasterGroupCardContent,VFMasterGroupCardImage,VFMasterGroupCardText,VFMasterGroupCardContainer} from "./styles"
import { useUserData } from "../../../../context";
import VFButton from "../../commons/VFButton";
import { useState,ReactNode} from "react";
import { AddRecordMasterGroup } from "../../../../VectorFlow/types/MDM";

const ImageMapper={
    1:'/assets/img/VectorFLOW/NMS/AddRecords/sku-1.svg', 
   // 'Discount Period':'/assets/img/VectorFLOW/NMS/AddRecords/calendar-1.svg',
   // 'IST Yield':'/assets/img/VectorFLOW/NMS/AddRecords/invest-1.svg',
   // 'Groupping':'/assets/img/VectorFLOW/NMS/AddRecords/groupping.svg',
    
   'Deployment':'/assets/img/VectorFLOW/NMS/AddRecords/deployment-1.svg',
   //skuloc
   //pivotal
    5:'/assets/img/VectorFLOW/NMS/AddRecords/MOQ-1.svg',
    4:'/assets/img/VectorFLOW/NMS/AddRecords/sob-1.svg',
    // 'Seasonality-Retail':'/assets/img/VectorFLOW/NMS/AddRecords/seasonality-hover.svg',
    // 'Seasonality':'/assets/img/VectorFLOW/NMS/AddRecords/seasonality-hover.svg',
   10:'/assets/img/VectorFLOW/NMS/AddRecords/phase-in-phase-out.svg',
    
   2:'/assets/img/VectorFLOW/NMS/AddRecords/Location-1.svg',
    // 'Contact':'/assets/img/VectorFLOW/NMS/AddRecords/contact-1.svg',
   // 'Loc-Capacity':'/assets/img/VectorFLOW/NMS/AddRecords/location-capacity-1.svg',
   // 'Loc-Priority':'/assets/img/VectorFLOW/NMS/AddRecords/loc-pri-1.svg',

    // 'CCR':'/assets/img/VectorFLOW/NMS/AddRecords/ccr.svg',
    // 'Buffer':'/assets/img/VectorFLOW/NMS/AddRecords/buffer-1.svg',

}

const ImageMapperHover={
    1:'/assets/img/VectorFLOW/NMS/AddRecords/sku-1-hover.svg', //sku
    'Discount Period':'/assets/img/VectorFLOW/NMS/AddRecords/calendar-1-hover.svg',
    'IST Yield':'/assets/img/VectorFLOW/NMS/AddRecords/invest-1-hover.svg',
    'Groupping':'/assets/img/VectorFLOW/NMS/AddRecords/groupping-hover.svg',
 
    'Deployment':'/assets/img/VectorFLOW/NMS/AddRecords/deployment-1-hover.svg',
    //skuLocation
    //pivotal
    5:'/assets/img/VectorFLOW/NMS/AddRecords/MOQ-1-Hover.svg',   //moq
    4:'/assets/img/VectorFLOW/NMS/AddRecords/sob-1.svg',  //sob
    'Seasonality-Retail':'/assets/img/VectorFLOW/NMS/AddRecords/seasonality-hover.svg',
    'Seasonality':'/assets/img/VectorFLOW/NMS/AddRecords/seasonality-hover.svg',
    10:'/assets/img/VectorFLOW/NMS/AddRecords/phase-in-phase-out-hover.svg', //pipo
    
    2:'/assets/img/VectorFLOW/NMS/AddRecords/location-1-hover.svg', //location
    'Contact':'/assets/img/VectorFLOW/NMS/AddRecords/contact-1-hover.svg',
    'Loc-Capacity':'/assets/img/VectorFLOW/NMS/AddRecords/loc-capacity.svg',
    'Loc-Priority':'/assets/img/VectorFLOW/NMS/AddRecords/loc-pri-1-hover.svg',

    'CCR':'/assets/img/VectorFLOW/NMS/AddRecords/ccr-hover.svg',
    'Buffer':'/assets/img/VectorFLOW/NMS/AddRecords/buffer-1-hover.svg',
}
//img src=ImageMapper{['SKU']}   
interface AddRecord {
    onSubmit:()=>void;
    onCancel:()=>void;
    onHover?:ReactNode;
    onSelectMasters?:()=>void;
}

const Masters:AddRecordMasterGroup[]= [
    {
        name:"SKU",
        masters:[
            {
                id:1,
                name:'IST Yield'
            },
            {
                id:2,
                name:'Groupping'
            }
        ]
    },
    {
        name:"Location",
        masters:[]
    },
    {
        name:"SKU Location",
        masters:[]
    },
    {
        name:"plant/CCR",
        masters:[
        ]
    }
]

const AddRecord=(props:AddRecord)=>{   
    const{
        onSubmit,
        onCancel,
        onHover,
        onSelectMasters
    }=props

    const {user} = useUserData()

    const Card=(props:any)=>{
     const [isHovered, setIsHovered] = useState(false);
        return(
            <VFMasterGroupCardContent theme={user.user.theme_ui} 
            id={props.obj.name} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onSelectMasters}>
            <VFMasterGroupCardImage> 
                <img src={isHovered?ImageMapperHover[props.obj.name]:ImageMapper[props.obj.name]} 
                alt={props.obj.name}/>
                </VFMasterGroupCardImage>
                <VFMasterGroupCardText>
                <div key={props.obj.name}>
                <p>{props.obj.name}</p>
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
        Masters.map(container=>{
            return(
            <VFMasterGroupCard> 
             <VFMasterGroupCardHeader>
              <VFMasterGroupCardHeaderText> 
                <p>{container.name}</p>
             </VFMasterGroupCardHeaderText>
                {container.masters.map((obj)=>{
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

export default AddRecord;