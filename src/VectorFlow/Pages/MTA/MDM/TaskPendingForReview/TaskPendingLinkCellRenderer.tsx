import { ICellRendererParams } from "ag-grid-enterprise";
import { useUserData } from "../../../../../context";
import { LinkWrapper } from "./styles.css";

import * as globalStyles from "../../../../../styles/global";

interface TaskPendingLinkCellRendererProps extends ICellRendererParams {
  onClick: (taskDetail: any) => void;
}

const TaskPendingLinkCellRenderer = (
  params: TaskPendingLinkCellRendererProps
) => {
  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  return (
    <div
      className={LinkWrapper}
      style={{ color: globalStyles.chooseThemeColor[themeUi].color4 }}
      onClick={() => params.onClick(params.data)}
    >
      {params.data.TaskName}
    </div>
  );
};

export default TaskPendingLinkCellRenderer;
