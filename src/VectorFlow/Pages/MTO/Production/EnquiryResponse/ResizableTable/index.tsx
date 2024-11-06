import { ColDef } from "ag-grid-enterprise";
import React, { useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import VFTable from "../../../Common/VFTable";
import { VFTableWrapper } from "./styles";

interface IResizeTableProps {
  colDef: ColDef[];
  data: any;
  setCurrentGridRef: any,
  currentGridRef: any,
  columnState: any,
  gridRef: any
}

const ResizableTable = (props: IResizeTableProps) => {
  const { data, colDef, setCurrentGridRef, currentGridRef, columnState } = props;
  const gridRef = props.gridRef;

  const getRowStyle = (params: any) => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: "white" };
    }
    return { background: "#F4F4F4" };
  };

  const defaultColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    suppressMenu: true,
    resizable: true,
    cellStyle: {
      'text-align': 'center',
      "font-style": "normal",
      "font-variant": "normal",
      "font-size": "20px",
      'font-weight': "300",
      "font-family": "Roboto",
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
      'resizable': 'true',
    },
    flex: 1,
  };

  useEffect(()=>{ 
    if (currentGridRef?.current && columnState?.length) {
        const result = currentGridRef.current.api.applyColumnState({
            state: columnState,
            applyOrder: true
        });
        if (!result) {
            console.error('Failed to apply column state');
        }
    }
  });
  
  return (
    <VFTableWrapper>

      <VFTable
        ref={gridRef}
        columnDefs={colDef}
        rowData={data}
        defaultColDef={defaultColDef}
        getRowStyle={getRowStyle}
        pagination
        paginationPageSize={15}
        onGridReady={(params: any) => {
          params.api.autoSizeAllColumns();

          setCurrentGridRef(gridRef);
        }}
        gridOptions={{
          sideBar: {
            toolPanels: ["agColumnsToolPanel"],
          },
        }}

      />
    </VFTableWrapper>

  );
};

export default React.memo(ResizableTable);
