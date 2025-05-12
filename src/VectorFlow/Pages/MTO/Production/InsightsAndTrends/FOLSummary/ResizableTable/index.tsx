import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-enterprise";
import { useEffect } from "react";
import CustomPageSizeInput from "../../../../../../../VectorFlow/Pages/MTO/Common/VFPagination/CustomPageSizeInput";
import VFTable from "../../../../../../../VectorFlow/Pages/MTO/Common/VFTable";
import { VFTableWrapper } from './style';

interface IResizeTableProps {
  colDef: ColDef[];
  data: any;
  setCurrentGridRef: any;
  currentGridRef: any;
  columnState: any;
  gridRef: any;
  userPageSize: number;
  savePageSize: any;
}

const ResizableTable = (props: IResizeTableProps) => {
  const {
    data, colDef, setCurrentGridRef, currentGridRef, columnState,
    userPageSize, savePageSize
  } = props;

  const getRowStyle = (params: any) => {
    return { background: params.node.rowIndex % 2 === 0 ? "white" : "#F4F4F4" };
  };

  const defaultColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    floatingFilterComponentParams: { suppressFilterButton: true },
    suppressMenu: true,
    resizable: true,
    cellStyle: {
      textAlign: 'center',
      fontStyle: "normal",
      fontVariant: "normal",
      fontSize: "20px",
      fontFamily: "Roboto",
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      resizable: 'true',
    },
    flex: 1,
  };

  useEffect(() => {
    if (currentGridRef?.current && columnState?.length) {
      const result = currentGridRef.current.api.applyColumnState({
        state: columnState,
        applyOrder: true
      });
      if (!result) console.error('Failed to apply column state');
    }
  }, [columnState]);


  const customPage = () => (
    <div style={{ display: 'flex', justifyContent: 'end', gap: '1rem', width: '100%',paddingBottom: '3px' }}>
      <CustomPageSizeInput
        savePageSize={savePageSize}
        userPageSize={userPageSize}
      />
    </div>
  );

  return (
    <VFTableWrapper>
      <VFTable
        ref={props.gridRef}
        columnDefs={colDef}
        rowData={data}
        defaultColDef={defaultColDef}
        getRowStyle={getRowStyle}
        statusBar={{
          statusPanels: [{ statusPanel: customPage, align:'right' }],
        }}
        pagination={true}
        onGridReady={(params: any) => {
          params.api.autoSizeAllColumns();
          setCurrentGridRef(props.gridRef);
        }}
        paginationPageSize={userPageSize}
        paginationPageSizeSelector={false}
        maintainColumnOrder
      />
    </VFTableWrapper>
  );
};

export default ResizableTable;
