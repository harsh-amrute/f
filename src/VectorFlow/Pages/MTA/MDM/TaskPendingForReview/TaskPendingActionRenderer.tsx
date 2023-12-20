import { ICellRendererParams } from "ag-grid-enterprise"
import { ActionRendererWrapper,ActionButtonWrapper } from "./styles"


interface TaskPendingActionRendererProps extends ICellRendererParams{
    onApprove:()=>void
    onReject:(id:string)=>void
}

export const TaskPendingActionRenderer = (props:TaskPendingActionRendererProps)=>{

    
    const onApprove = ()=>{
        props.node.setDataValue('status',"Approved")
    }

    const onReject= ()=>{
        props.node.setDataValue('status',"Rejected")
    }
    
    const {status} = props.data
    return(
       <ActionRendererWrapper>
         <ActionButtonWrapper src={status==="Approved"?"/assets/img/VectorFLOW/NMS/task-pending-approve.svg":"/assets/img/VectorFLOW/NMS/task-pending-approve-grey.svg"} height={24} width={24} onClick={onApprove}/>
         <ActionButtonWrapper src={status==="Rejected"?"/assets/img/VectorFLOW/NMS/task-pending-reject.svg":"/assets/img/VectorFLOW/NMS/task-pending-reject-grey.svg"} height={24} width={24} onClick={onReject}/>
       </ActionRendererWrapper>
    )
}

export default TaskPendingActionRenderer
