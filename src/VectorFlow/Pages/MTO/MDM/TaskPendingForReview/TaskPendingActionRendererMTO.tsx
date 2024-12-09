import { ICellRendererParams } from "ag-grid-enterprise"
import { ActionRendererWrapper,ActionButtonWrapper } from "./styles"
import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import useTaskPendingForReview from "./useTaskPendingForReview"
import { SET_TASK_PENDING_SELECTED } from "../../../../../redux/actions/MTO"


interface TaskPendingActionRendererProps extends ICellRendererParams{
    onApprove:()=>void
    onReject:(id:string)=>void
}

const TaskPendingActionRendererMTO = (props:TaskPendingActionRendererProps| any)=>{

    const {detailTableRowData} = useTaskPendingForReview();

    const dispatch = useDispatch();


  const selectedRows = useSelector((state: any) => state.mto.taskPendingSelected);

    const [approved, setApproved] =  useState(true);


    props.api.setNodesSelected({ nodes: [props.node], newValue: approved });

    const onClick = (status:string)=>{
        const selectedBCD = props.api.getSelectedRows().some((data:any)=>data.bcd === props.data.bcd);
        if(status==='Approved' && !selectedBCD){
            props.api.setNodesSelected({ nodes: [props.node], newValue: true });
            setApproved(!approved);
            const newData : any = [];
            detailTableRowData.map((data:any, index: any)=>{
                const newVal  = _.cloneDeep(data);
                if(index===props.node.rowIndex){
                    
                    newVal.selectStatus = '';
                    newData.push(newVal);
                }
                else{
                    newData.push(newVal);
                }
            })
            dispatch(SET_TASK_PENDING_SELECTED(newData))
        }
        else if(status==='Rejected' && selectedBCD){
            props.api.setNodesSelected({nodes: [props.node], newValue: false});
            setApproved(!approved);
            const newData : any = [];
            detailTableRowData.map((data:any, index: any)=>{
                const newVal  = _.cloneDeep(data);
                if(index===props.node.rowIndex){
                    
                    newVal.selectStatus = 'approve';
                    newData.push(index);
                }
            })
        dispatch(SET_TASK_PENDING_SELECTED([]))

        }
    }

        return(
            <ActionRendererWrapper>
              <ActionButtonWrapper src={((selectedRows && selectedRows.includes(props.data))|| (selectedRows==='all')) ? "/assets/img/VectorFLOW/NMS/task-pending-approve.svg" : "/assets/img/VectorFLOW/NMS/task-pending-approve-grey.svg"} height={16} width={16} onClick={() => onClick('Approved')} />
              <ActionButtonWrapper src={(selectedRows && !selectedRows.includes(props.data) && !(selectedRows==='all'))?"/assets/img/VectorFLOW/NMS/task-pending-reject.svg":"/assets/img/VectorFLOW/NMS/task-pending-reject-grey.svg"} height={16} width={16} onClick={()=>onClick('Rejected')}/>
            </ActionRendererWrapper>
         )
    
   
}

export default TaskPendingActionRendererMTO
