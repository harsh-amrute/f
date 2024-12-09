import { ActionHeaderContent, ActionHeaderWrapper, TaskPendingActionHeaderButton } from "./styles"
import { useUserData } from "../../../../../context";
import { useDispatch, useSelector } from "react-redux";
import { SET_TASK_PENDING_ROW_DATA, SET_TASK_PENDING_SELECTED } from "../../../../../redux/actions/MTO";
import _ from "lodash";



const TaskPendingActionHeader = (props:any)=>{

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const dispatch = useDispatch();

  const detailTableRowData = useSelector((state: any)=> state.mto.taskPendingRowData)




  // const [actionStatus,setActionStatus] = useState<string>('')




    // const onUnCheckAll = ()=>{
    //     props.api.forEachNode((rowNode:any)=>{
    //         rowNode.setDataValue('status','')
    //         rowNode.setDataValue('status','')
    //         rowNode.setSelected(false)
    //     })
    // }

    const handleChange = (query:string)=>{
      // if(!unCheckEvent){
      //   onUnCheckAll()
      // }
      // else {

      // }

      // if(query === 'Approved'){
      //   props.toggleApproveAllModal(true)
      // }
      // else{
      //   props.toggleRejectAllModal(true)
      // }

      if(query==="Approved"){
        const newRowData = _.cloneDeep([...detailTableRowData]);
        newRowData.forEach((e)=>{
          e.appStatus = true;
        })
        dispatch(SET_TASK_PENDING_ROW_DATA(newRowData));

      }
      else{
        const newRowData = _.cloneDeep([...detailTableRowData]);
        newRowData.forEach((e)=>{
          e.appStatus = false;
        })
        dispatch(SET_TASK_PENDING_ROW_DATA(newRowData));


      }

      props.api.refreshCells();      
    }

    
  

    return( 
        <ActionHeaderWrapper>   
            <ActionHeaderContent>
                <TaskPendingActionHeaderButton themeUi={themeUi}  onClick={()=>handleChange("Approved")} >Approve All</TaskPendingActionHeaderButton>
            </ActionHeaderContent>
            <ActionHeaderContent>
                <TaskPendingActionHeaderButton themeUi={themeUi} onClick={()=>handleChange("Rejected")} >Reject All</TaskPendingActionHeaderButton>
            </ActionHeaderContent> 
        </ActionHeaderWrapper>
    )
}

export default TaskPendingActionHeader
