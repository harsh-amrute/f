import { ICellRendererParams } from "ag-grid-enterprise";
import { useUserData } from "../../../../../context";
import { actionContainer, actionButtonWrapper } from "./styles.css";

interface ActionRendererProps extends ICellRendererParams {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ActionRenderer = (props: ActionRendererProps) => {
  const { data, onDelete, onEdit } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  return (
    <div className={actionContainer}>
      <img
        className={actionButtonWrapper}
        src={
          themeUi === "REGALBLAZE"
            ? "/assets/img/VectorFLOW/NMS/edit-draft-regal.svg"
            : "/assets/img/VectorFLOW/NMS/edit-draft.svg"
        }
        onClick={() => onEdit(data)}
        data-testid="edit-draft"
        alt="Edit draft"
      />
      <img
        className={actionButtonWrapper}
        src={
          themeUi === "REGALBLAZE"
            ? "/assets/img/VectorFLOW/NMS/delete-draft-regal.svg"
            : "/assets/img/VectorFLOW/NMS/delete-draft.svg"
        }
        onClick={() => onDelete(data.DraftId)}
        data-testid="delete-draft"
        style={{marginLeft:"30px"}}
        alt="Delete draft"
      />
    </div>
  );
};

export default ActionRenderer;
