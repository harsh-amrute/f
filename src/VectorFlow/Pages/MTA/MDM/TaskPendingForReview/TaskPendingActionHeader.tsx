import {
  ActionHeaderContent,
  ActionHeaderWrapper,
  TaskPendingActionHeaderButton,
  headerBtnBgVar,
} from "./styles.css";
import { useUserData } from "../../../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../../styles/global";

const TaskPendingActionHeader = (props: any) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  // const [actionStatus,setActionStatus] = useState<string>('')

  // const onUnCheckAll = ()=>{
  //     props.api.forEachNode((rowNode:any)=>{
  //         rowNode.setDataValue('status','')
  //         rowNode.setSelected(false)
  //     })
  // }

  const handleChange = (unCheckEvent: boolean, query: string) => {
    // if(!unCheckEvent){
    //   onUnCheckAll()
    // }
    // else {

    // }

    if (query === "Approved") {
      props.showApproveAllModal(true);
    } else {
      props.showRejectAllModal(true);
    }

    // if(unCheckEvent){
    //     onUnCheckAll()
    //     setActionStatus('')
    //     return
    // }
    // setActionStatus(query)
    // props.api.forEachNode((rowNode)=>{
    //     rowNode.setDataValue('status',query)
    //     rowNode.setSelected(true)
    // })
  };

  // useEffect(() => {
  //   // Check for mismatched statuses and uncheck checkboxes if needed
  //   // const handleStatusMismatch = (query: string) => {
  //   //   props.api.forEachNode((rowNode:any) => {
  //   //     if (rowNode.data.status !== query) {
  //   //       setActionStatus(''); // Uncheck the checkbox
  //   //       return; // No need to continue iterating
  //   //     }
  //   //   });
  //   // };

  //   // handleStatusMismatch('Approved');
  //   // handleStatusMismatch('Rejected');

  //   // const totalRows = props.api.paginationGetRowCount();
  //   // const selectedRows = props.api.getSelectedRows();
  //   // const approvedRows = selectedRows.filter((row:any)=>row.status === 'Approved');
  //   // if(approvedRows.length === totalRows) setActionStatus('Approved');

  // }, [props.api.getSelectedRows()])

  return (
    <div className={ActionHeaderWrapper}>
      <div className={ActionHeaderContent}>
        <button
          className={TaskPendingActionHeaderButton}
          style={assignInlineVars({
            [headerBtnBgVar]: globalStyles.chooseThemeColor[themeUi]?.color5,
          })}
          onClick={() =>
            handleChange(props.actionStatus === "Approved", "Approved")
          }
          disabled={props.disabled}
        >
          Approve All
        </button>
      </div>
      <div className={ActionHeaderContent}>
        <button
          className={TaskPendingActionHeaderButton}
          style={assignInlineVars({
            [headerBtnBgVar]: globalStyles.chooseThemeColor[themeUi]?.color5,
          })}
          onClick={() =>
            handleChange(props.actionStatus === "Rejected", "Rejected")
          }
        >
          Reject All
        </button>
      </div>
    </div>
  );
};

export default TaskPendingActionHeader;
