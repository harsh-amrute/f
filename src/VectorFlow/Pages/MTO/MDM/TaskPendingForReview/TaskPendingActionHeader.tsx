import { ActionHeaderContent, ActionHeaderWrapper, TaskPendingActionHeaderButton } from "./styles"
import { useUserData } from "../../../../../context";


const TaskPendingActionHeader = (props:any)=>{

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  // const [actionStatus,setActionStatus] = useState<string>('')

    


    // const onUnCheckAll = ()=>{
    //     props.api.forEachNode((rowNode:any)=>{
    //         rowNode.setDataValue('status','')
    //         rowNode.setSelected(false)
    //     })
    // }

    const handleChange = (unCheckEvent:boolean,query:string)=>{
      // if(!unCheckEvent){
      //   onUnCheckAll()
      // }
      // else {

      // }

      if(query === 'Approved'){
        props.showApproveAllModal(true)
      }
      else{
        props.showRejectAllModal(true)
      }
      
    }

  

    return( 
        <ActionHeaderWrapper>   
            <ActionHeaderContent>
                <TaskPendingActionHeaderButton themeUi={themeUi}  onClick={()=>handleChange(props.actionStatus==='Approved',"Approved")} >Approve All</TaskPendingActionHeaderButton>
            </ActionHeaderContent>
            <ActionHeaderContent>
                <TaskPendingActionHeaderButton themeUi={themeUi} onClick={()=>handleChange(props.actionStatus==='Rejected',"Rejected")} >Reject All</TaskPendingActionHeaderButton>
            </ActionHeaderContent> 
        </ActionHeaderWrapper>
    )
}

export default TaskPendingActionHeader
