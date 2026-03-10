import { forwardRef } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { VFTableWrapper, vHeight, vZoom } from "./styles.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.css";
import { useUserData } from "../../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface VFTableProps extends AgGridReactProps {
  height?: string;
  disableZoomScaling?: boolean;
}

const VFTable = forwardRef((props: VFTableProps, ref: any) => {
  const { user } = useUserData();

  const theme = user.user.theme_ui;

  const getClassName = () => {
    switch (theme) {
      case "NOIRFUSION":
        return "ag-theme-noir-fusion";
      case "REGALBLAZE":
        return "ag-theme-regal-blaze";
      case "PUREELEGANCE":
        return "ag-theme-pure-elegance";
      case "CHARCOALCHIC":
        return "ag-theme-charcoal-chic";
      default:
        return "ag-theme-noir-fusion";
    }
  };

  return (
    <div
      className={`${VFTableWrapper} ${getClassName()} ag-theme-alpine vfwrap`}
      role="table"
      style={assignInlineVars({
        [vHeight]: props.height || "auto",
      })}
    >
      <AgGridReact
        ref={ref}
        {...props}
        rowHeight={props.rowHeight || 30}
        defaultColDef={{
          resizable: true,
          ...props.defaultColDef,
        }}
        paginationPageSizeSelector={false}
        suppressDragLeaveHidesColumns={true}
      />
    </div>
  );
});

export default VFTable;
