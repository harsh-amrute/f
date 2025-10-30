import { ICellRendererParams } from "ag-grid-enterprise";
import { notifyError } from "../../../../../helpers/notify";
import { ActionRendererWrapper, ActionButtonWrapper } from "./styles.css";

interface TaskPendingActionRendererProps extends ICellRendererParams {
  onApprove: () => void;
  onReject: (id: string) => void;
}

const TaskPendingActionRenderer = (props: TaskPendingActionRendererProps) => {
  const onClick = (status: string) => {
    if (!props.data.isModified && status === "Approved") {
      return notifyError("No Actions Available");
    }
    if (props.data.status === status) {
      props.node.setDataValue("status", "");
      props.node.setSelected(false);
      return;
    }
    props.node.setDataValue("status", status);
    props.node.setSelected(true);
  };

  const { status } = props.data;
  return (
    <div className={ActionRendererWrapper}>
      <img
        className={ActionButtonWrapper}
        src={
          status === "Approved"
            ? "/assets/img/VectorFLOW/NMS/task-pending-approve.svg"
            : "/assets/img/VectorFLOW/NMS/task-pending-approve-grey.svg"
        }
        onClick={() => onClick("Approved")}
      />
      <img
        className={ActionButtonWrapper}
        src={
          status === "Rejected"
            ? "/assets/img/VectorFLOW/NMS/task-pending-reject.svg"
            : "/assets/img/VectorFLOW/NMS/task-pending-reject-grey.svg"
        }
        onClick={() => onClick("Rejected")}
      />
    </div>
  );
};

export default TaskPendingActionRenderer;
