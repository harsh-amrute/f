import { VFMasterCardContainer, VFMasterCardHeader, VFMasterCardListContainer, VFMasterCardListItem } from "./styles"

interface VFMasterCardProps{
    data:{id:number,name:string,fields:string[]}
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
                {data.fields.map((title,index)=>{
                    return <VFMasterCardListItem key={index} isSelected={selectedFields.includes(title)}>{title}</VFMasterCardListItem>
                })}
            </VFMasterCardListContainer>
        </VFMasterCardContainer>
    )
}

export default VFMasterCard