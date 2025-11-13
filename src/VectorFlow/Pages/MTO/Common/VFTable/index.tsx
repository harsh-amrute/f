import { forwardRef } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { VFTableWrapper, vHeight } from "./style.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles.css";
import { useUserData } from "../../../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { FillOperationParams } from "ag-grid-enterprise";

interface VFTableProps extends AgGridReactProps {
  height?: string;
  disableZoomScaling?: boolean;
  hideStatusBar?: boolean; 
  cellSelection?: {
    handle: {
      mode: string;
      setFillValue: (params: FillOperationParams) => void;
    };
  };
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

  const defaultGridOptions = {
    defaultColDef: {
      enableValue: true,
      filter: "agTextColumnFilter",
      floatingFilterComponentParams: { suppressFilterButton: false },
      floatingFilter: true,
      enableRowGroup: true,
    },
    sideBar: {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
        },
      ],
    },
    autoGroupColumnDef: {
      minWidth: 250,
    },
  };

  const gridOptions = {
    ...defaultGridOptions,
    ...props.gridOptions,
    defaultColDef: {
      ...defaultGridOptions.defaultColDef,
      ...props.gridOptions?.defaultColDef,
    },
  };

  const defaultStatusBar = {
    statusPanels: [
      { statusPanel: "agTotalAndFilteredRowCountComponent" },
      { statusPanel: "agTotalRowCountComponent" },
      { statusPanel: "agFilteredRowCountComponent" },
      { statusPanel: "agSelectedRowCountComponent" },

      {
        statusPanel: "agAggregationComponent",
        statusPanelParams: {
          aggFuncs: ["avg", "sum", "min", "max", "count"],
        },
      },
    ],
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
        gridOptions={gridOptions}
        statusBar={
          props.hideStatusBar ? undefined : props.statusBar || defaultStatusBar
        }
        enableRangeSelection
        rowHeight={props.rowHeight || 30}
        suppressMenuHide={
          props.suppressMenuHide !== undefined ? props.suppressMenuHide : false
        }
        suppressDragLeaveHidesColumns={
          props.suppressDragLeaveHidesColumns !== undefined
            ? props.suppressDragLeaveHidesColumns
            : true
        }
        defaultColDef={{
          ...defaultGridOptions.defaultColDef,
          ...props?.gridOptions?.defaultColDef,
          ...props?.defaultColDef,
        }}
      />
    </div>
  );
});

export default VFTable;
