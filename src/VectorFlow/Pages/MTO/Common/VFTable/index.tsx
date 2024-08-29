import { forwardRef } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { VFTableWrapper } from "./styles";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import './styles.css'
import { useUserData } from "../../../../../context";


interface VFTableProps extends AgGridReactProps {
  height?: string,
  disableZoomScaling?: boolean
}


const VFTable = forwardRef((props: VFTableProps, ref: any) => {

  const { user } = useUserData()

  const theme = user.user.theme_ui

  const getClassName = () => {
    switch (theme) {
      case "NOIRFUSION":
        return "ag-theme-noir-fusion"
      case "REGALBLAZE":
        return "ag-theme-regal-blaze"
      case "PUREELEGANCE":
        return "ag-theme-pure-elegance"
      case "CHARCOALCHIC":
        return "ag-theme-charcoal-chic"
      default:
        return "ag-theme-noir-fusion"
    }
  }

  console.log(props.gridOptions)

  return (
    <VFTableWrapper className={`${getClassName()} ag-theme-alpine vfwrap`} role={"table"} height={props.height} disableZoomScaling={props.disableZoomScaling}>
      <AgGridReact
        ref={ref}
        {...props}
        gridOptions={{
          ...props.gridOptions,
          defaultColDef: {
            ...props.gridOptions?.defaultColDef,
            filter: "agTextColumnFilter",
            floatingFilterComponentParams: { suppressFilterButton: false },
            floatingFilter: true,
            suppressMenu: false,
            // wrapHeaderText: true,
            // autoHeaderHeight: true,
            // flex: 0,
          },
          sideBar: {
            toolPanels: [
              {
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
              },
            ],
          },
        }}
        statusBar={{
          statusPanels: [
            { statusPanel: 'agTotalAndFilteredRowCountComponent' },
            { statusPanel: 'agTotalRowCountComponent' },
            { statusPanel: 'agFilteredRowCountComponent' },
            { statusPanel: 'agSelectedRowCountComponent' },
            { statusPanel: 'agAggregationComponent' }
          ]
        }}
        enableRangeSelection
        rowHeight={30}
        suppressMenuHide={false}
        suppressDragLeaveHidesColumns={true}
        defaultColDef={
          {
            ...props?.defaultColDef,
            filter: "agTextColumnFilter",
            floatingFilterComponentParams: { suppressFilterButton: false },
            floatingFilter: true,
            suppressMenu: false,
            // wrapHeaderText: true,
            // autoHeaderHeight: true,
            // flex: 0,
          }
        }
      />
    </VFTableWrapper>
  );
});

export default VFTable;