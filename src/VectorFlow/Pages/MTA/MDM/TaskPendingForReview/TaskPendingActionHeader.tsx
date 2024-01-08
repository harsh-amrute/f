import {ICellRendererParams} from 'ag-grid-enterprise'
import { useEffect, useState } from 'react'

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

    
  useEffect(() => {
    // Check for mismatched statuses and uncheck checkboxes if needed
    const handleStatusMismatch = (query: string) => {
      props.api.forEachNode((rowNode) => {
        if (rowNode.data.status !== query) {
          setActionStatus(''); // Uncheck the checkbox
          return; // No need to continue iterating
        }
      });
    };

    handleStatusMismatch('Approved');
    handleStatusMismatch('Rejected');
    console.log('effect')
  }, [props.api])

    return( 
        <ActionHeaderWrapper>   
            <ActionHeaderContent>
                <input type={'checkbox'} onChange={()=>handleChange(actionStatus==='Approved',"Approved")} checked={actionStatus==='Approved'}/>
                <p>Approve All</p>
            </ActionHeaderContent> 
            <ActionHeaderContent>
                <input type={'checkbox'} onChange={()=>handleChange(actionStatus==='Rejected',"Rejected")} checked={ actionStatus==='Rejected'}/>
                <p>Reject All</p>
            </ActionHeaderContent> 
        </ActionHeaderWrapper>
    )
}

export default TaskPendingActionHeader
