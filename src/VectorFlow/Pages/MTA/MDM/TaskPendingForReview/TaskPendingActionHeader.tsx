import {ICellRendererParams} from 'ag-grid-enterprise'
import { useState } from 'react'

import { ActionHeaderContent, ActionHeaderWrapper } from "./styles"


const TaskPendingActionHeader = (props:ICellRendererParams)=>{

    const [actionStatus,setActionStatus] = useState<string>('')


    const onUnCheckAll = ()=>{
        props.api.forEachNode((rowNode)=>{
            rowNode.setDataValue('status','')
        })
    }

    const handleChange = (unCheckEvent:boolean,query:string)=>{
        if(unCheckEvent){
            onUnCheckAll()
            setActionStatus('')
            return 
        }
        setActionStatus(query)
        props.api.forEachNode((rowNode)=>{
            rowNode.setDataValue('status',query)
        })
        
    }

    return(
        <ActionHeaderWrapper>
            <ActionHeaderContent>
                <input type={'checkbox'} onChange={()=>handleChange(actionStatus==='Approved',"Approved")} checked={actionStatus==='Approved'}/>
                <p>Approve All</p>
            </ActionHeaderContent> 
            <ActionHeaderContent>
                <input type={'checkbox'} onChange={()=>handleChange(actionStatus==='Rejected',"Rejected")} checked={actionStatus==='Rejected'}/>
                <p>Reject All</p>
            </ActionHeaderContent> 
        </ActionHeaderWrapper>
    )
}

export default TaskPendingActionHeader
