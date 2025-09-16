import { CustomCellRendererProps } from "ag-grid-react";
import React from "react";
import VFButton from "../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../context";

interface MyCellRendererProps extends CustomCellRendererProps {
  allPermissions?: any[];
  setIsPermissionModalOpen?: (open: boolean) => void;
  setRowIndex: (index: number) => void;
}

const PermissionViewCellRenderer = (params: MyCellRendererProps) => {
  const PermissionCount =
    params.data.permissions &&
    typeof params.data.permissions === "object" &&
    !Array.isArray(params.data.permissions)
      ? Object.keys(params.data.permissions).length
      : 0;

  const user = useUserData();
  const themeUi = user.user.user.theme_ui;

  return (
    <>
      {PermissionCount > 0 ? (
        <VFButton
          disabled={false}
          style={{ width: "140px", height: "25px", fontSize: "1rem" }}
          themeUi={themeUi}
          onClick={() => {
            params.setRowIndex(params.node.rowIndex || 0);
            params.setIsPermissionModalOpen?.(true);
          }}
        >
          {"Edit Permissions"}
        </VFButton>
      ) : (
        <VFButton
          disabled={false}
          style={{ width: "140px", height: "25px", fontSize: "1rem" }}
          themeUi={themeUi}
          onClick={() => {
            params.setRowIndex(params.node.rowIndex || 0);
            params.setIsPermissionModalOpen?.(true);
          }}
        >
          {"Select Permissions"}
        </VFButton>
      )}
    </>
  );
};

export default PermissionViewCellRenderer;
