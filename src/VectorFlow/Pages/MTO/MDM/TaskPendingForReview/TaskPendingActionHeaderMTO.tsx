import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  ActionHeaderContent,
  ActionHeaderWrapper,
  TaskPendingActionHeaderButton,
  color5Var,
} from "./styles.css";
import { useUserData } from "../../../../../context";
import { useDispatch, useSelector } from "react-redux";
import { SET_TASK_PENDING_ROW_DATA } from "../../../../../redux/actions/MTO";
import _ from "lodash";
import * as globalStyles from '../../../../../styles/global';

const TaskPendingActionHeader = (props: any) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const dispatch = useDispatch();
  const detailTableRowData = useSelector(
    (state: any) => state.mto.taskPendingRowData
  );
  const handleChange = (query: string) => {
    if (query === "Approved") {
      const newRowData = _.cloneDeep([...detailTableRowData]);
      newRowData.forEach((e) => {
        e.appStatus = true;
        e.ia = true;
      });
      dispatch(SET_TASK_PENDING_ROW_DATA(newRowData));
    } else {
      const newRowData = _.cloneDeep([...detailTableRowData]);
      newRowData.forEach((e) => {
        e.appStatus = false;
        e.ia = false;
      });
      dispatch(SET_TASK_PENDING_ROW_DATA(newRowData));
    }
    props.api.refreshCells();
  };

  return (
    <div className={ActionHeaderWrapper}>
      <div className={ActionHeaderContent}>
        <button
          className={TaskPendingActionHeaderButton}
          style={assignInlineVars({
            [color5Var]: globalStyles.chooseThemeColor[themeUi]?.color5,
          })}
          onClick={() => handleChange("Approved")}
        >
          Approve All
        </button>
      </div>
      <div className={ActionHeaderContent}>
        <button
          className={TaskPendingActionHeaderButton}
          style={assignInlineVars({
            [color5Var]: globalStyles.chooseThemeColor[themeUi]?.color5,
          })}
          onClick={() => handleChange("Rejected")}
        >
          Reject All
        </button>
      </div>
    </div>
  );
};

export default TaskPendingActionHeader;
