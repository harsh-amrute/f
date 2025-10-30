import { ICellRendererParams } from "ag-grid-enterprise";
import React from "react";
import { useUserData } from "../../../../../context";
import { actionContainer, actionButton } from "./styles.css";

interface ActionRendererProps extends ICellRendererParams {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MTOActionRenderer = (props: ActionRendererProps) => {
  const { data, onDelete, onEdit } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const editIcon =
    themeUi === "REGALBLAZE"
      ? "/assets/img/VectorFLOW/NMS/edit-draft-regal.svg"
      : "/assets/img/VectorFLOW/NMS/edit-draft.svg";

  const deleteIcon =
    themeUi === "REGALBLAZE"
      ? "/assets/img/VectorFLOW/NMS/delete-draft-regal.svg"
      : "/assets/img/VectorFLOW/NMS/delete-draft.svg";

  return (
    <div className={actionContainer}>
      <img
        className={actionButton}
        src={editIcon}
        height={16}
        width={16}
        onClick={() => onEdit(data)}
        data-testid="edit-draft"
        alt="Edit draft"
      />
      <img
        className={actionButton}
        src={deleteIcon}
        height={16}
        width={16}
        onClick={() => onDelete(data.DraftId)}
        data-testid="delete-draft"
        alt="Delete draft"
      />
    </div>
  );
};

export default MTOActionRenderer;
