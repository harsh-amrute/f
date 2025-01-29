import { forwardRef } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { VFTableWrapper } from "./styles";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import './styles.css'
import { useUserData } from "../../../../../context";

interface VFTableProps extends AgGridReactProps {
  height?: string;
  disableZoomScaling?: boolean;
  hideStatusBar?: boolean; 
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
      filter: "agTextColumnFilter",
      floatingFilterComponentParams: { suppressFilterButton: false },
      floatingFilter: true,
      suppressMenu: false,
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
      { statusPanel: "agAggregationComponent" },
    ],
  };

  return (
    <VFTableWrapper
      className={`${getClassName()} ag-theme-alpine vfwrap`}
      role="table"
      height={props.height || "auto"}
      disableZoomScaling={props.disableZoomScaling || false}
    >
      <AgGridReact
        ref={ref}
        {...props}
        gridOptions={gridOptions}
        statusBar={props.hideStatusBar ? undefined : props.statusBar || defaultStatusBar} 
        enableRangeSelection
        rowHeight={props.rowHeight || 30}
        suppressMenuHide={props.suppressMenuHide !== undefined ? props.suppressMenuHide : false}
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
    </VFTableWrapper>
  );
});

export default VFTable;
