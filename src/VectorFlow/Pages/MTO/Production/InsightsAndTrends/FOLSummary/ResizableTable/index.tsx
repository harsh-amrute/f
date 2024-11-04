import { ColDef } from "ag-grid-enterprise";
import { useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import VFTable from "../../../../../../../VectorFlow/Pages/MTO/Common/VFTable";
import { VFTableWrapper } from './style'
import { pagination } from "../../../../../../../VectorFlow/Pages/MTO/Common/Enum";

interface IResizeTableProps {
  colDef: ColDef[];
  data: any;
  setCurrentGridRef: any,
  currentGridRef: any,
  columnState: any,
  gridRef: any
}

const ResizableTable = (props: IResizeTableProps) => {
  const {data, colDef, setCurrentGridRef, currentGridRef, columnState} = props;

  const getRowStyle = (params: any) => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: "white" };
    }
    return { background: "#F4F4F4" };
  };

  const defaultColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    floatingFilterComponentParams: { suppressFilterButton: true },
    suppressMenu: true,
    resizable: true,
    cellStyle: {
      'text-align': 'center',
      "font-style": "normal",
      "font-variant": "normal",
      "font-size": "20px",
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
        ref={props.gridRef}
        columnDefs={colDef}
        rowData={data}
        defaultColDef={defaultColDef}
        getRowStyle={getRowStyle}
        pagination
        onGridReady={(params: any) => {
          params.api.autoSizeAllColumns();

          setCurrentGridRef(props.gridRef);
        }}
        paginationPageSize={pagination.mtoPageSize}

      />
    </VFTableWrapper>

  );
};

export default ResizableTable;
