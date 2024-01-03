import { ICellRendererParams } from "ag-grid-enterprise"
import { ActionButtonWrapper, ActionContainer } from "./styles"


interface ActionRendererProps extends ICellRendererParams{
    onEdit:(id:string)=>void
    onDelete:(id:string)=>void
}

const ActionRenderer = (props:ActionRendererProps)=>{

    const {
        data,
        onDelete,
        onEdit
    } = props



    return(
        <ActionContainer>
            <ActionButtonWrapper src="/assets/img/VectorFLOW/NMS/edit-draft.svg" height={24} width={24} onClick={()=>onEdit(data)} data-testid="edit-draft"/>
            <ActionButtonWrapper src="/assets/img/VectorFLOW/NMS/delete-draft.svg" height={24} width={24} style={{marginLeft:"30px"}} onClick={()=>onDelete(data.DraftId)} data-testid="delete-draft"/>
        </ActionContainer>
    )
}

export default ActionRenderer