import { VFMasterCardContainer, VFMasterCardHeader, VFMasterCardListContainer, VFMasterCardListItem } from "./styles"
import {type Master, type Field} from '../../../../VectorFlow/types/MDM';

interface VFMasterCardProps{
    data:Master
    selectedFields:string[],
}



const VFMasterCard = (props:VFMasterCardProps)=>{
    
    const {
        data,
        selectedFields
    } = props

    
    return(
        <VFMasterCardContainer>
            <VFMasterCardHeader>{data.name}</VFMasterCardHeader>
            <VFMasterCardListContainer data-testid='list-container'>
                {data.fields.map((title:Field,index)=>{
                    return title.visible && <VFMasterCardListItem key={index} isSelected={selectedFields.includes(title.displayName)}>{title.displayName}</VFMasterCardListItem>
                })}
            </VFMasterCardListContainer>
        </VFMasterCardContainer>
    )
}

export default VFMasterCard