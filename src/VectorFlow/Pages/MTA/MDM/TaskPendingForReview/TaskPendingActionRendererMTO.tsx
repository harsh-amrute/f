import { ICellRendererParams } from "ag-grid-enterprise"
import { notifyError } from "../../../../../helpers/notify"
import { ActionRendererWrapper,ActionButtonWrapper } from "./styles"
import {useState, useEffect} from 'react'


interface TaskPendingActionRendererProps extends ICellRendererParams{
    onApprove:()=>void
    onReject:(id:string)=>void
}

const TaskPendingActionRendererMTO = (props:TaskPendingActionRendererProps| any)=>{
    
    console.log("taskpendingactionrenderer action status...",props )
    const [mtoStatusApproved, setMTOStatusApproved] = useState(false);
    const [mtoStatusRejected, setMTOStatusRejected] = useState(false);
    
    // props?.api?.selectAll();
    //  useEffect(()=>{
    //   console.log("this action status", props.actionStatus);
    //   if(props.actionStatus==='Approve All'){
    //   }
    //   else{
    //     props?.current?.api?.deselectAll();
    //   }
    // },[props.actionStatus])

    // console.log("valll", props);

    const [approved, setApproved] =  useState(true);


    props.api.setNodesSelected({ nodes: [props.node], newValue: approved });

   

    const onClick = (status:string)=>{
        
        if(status==='Approved'){
            props.api.setNodesSelected({ nodes: [props.node], newValue: true });
            const selectedNodes2 = props?.api?.getSelectedNodes();
            setApproved(!approved);
        }
        else{
            props.api.setNodesSelected({nodes: [props.node], newValue: false});
            setApproved(!approved);
        }
    }
    
    
        return(
            <ActionRendererWrapper>
              <ActionButtonWrapper src={(approved)?"/assets/img/VectorFLOW/NMS/task-pending-approve.svg":"/assets/img/VectorFLOW/NMS/task-pending-approve-grey.svg"} height={24} width={24} onClick={()=>onClick('Approved')}/>
              <ActionButtonWrapper src={(!(approved))?"/assets/img/VectorFLOW/NMS/task-pending-reject.svg":"/assets/img/VectorFLOW/NMS/task-pending-reject-grey.svg"} height={24} width={24} onClick={()=>onClick('Rejected')}/>
            </ActionRendererWrapper>
         )
    
   
}

export default TaskPendingActionRendererMTO
