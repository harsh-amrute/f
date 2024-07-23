import { ColDef } from "ag-grid-enterprise";
import { useState, useMemo, useRef } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import { VFTableWrapper } from "./styles";
import FullkitCellRenderer from "../../../Common/FullkitCellRenderer";

interface IResizeTableProps {
  header: ColDef[];
  data: any;
}

const ResizableTable = (props: IResizeTableProps) => {
  const { data } = props;
  const tempRef = useRef();



  const columnDefs: ColDef[] = [
    {
      headerName: "Plant",
      field: "plnm",
      colId: "plnm",
      minWidth: 150,

      cellStyle: {
        fontSize: "18px",
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
      },
    },
    {
      headerName: "Department",
      field: "dpnm",
      colId: "dpnm",
      minWidth: 110,
      cellStyle: {
        fontSize: "18px",
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
      },
    },
    {
      headerName: "CCR Group",
      field: "gnm",
      colId: "gnm",
      minWidth: 120,
      cellStyle: {
        fontSize: "18px",
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
      },
    },
    {
      headerName: "CCR Name",
      field: "cnm",
      colId: "cnm",
      minWidth: 120,
      cellStyle: {
        fontSize: "18px",
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
      },
    },
    {
      headerName: "FOL (in days)",
      field: "fol",
      filter: "agNumberColumnFilter",
      colId: "fol",
      minWidth: 120,
      cellRenderer: FullkitCellRenderer,
      cellStyle: {
        fontSize: "18px",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      },
    },
  ];

  const getRowStyle = (params: any) => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: "white" };
    }
    return { background: "#F4F4F4" };
  };

  const defaultColDef = {
    cellStyle: {
      'text-align': 'center',
      "font-style": "normal",
      "font-variant": "normal",
      "font-weight": "300",
      "font-size": "20px",
      "font-family": "Roboto",
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
      'resizable': 'true',
    },
    flex: 1,
  };

  return (
    <VFTableWrapper>

      <VFTable
        ref={tempRef}
        columnDefs={columnDefs}
        rowData={data}
        defaultColDef={defaultColDef}
        getRowStyle={getRowStyle}
        disableZoomScaling
        pagination

      />
    </VFTableWrapper>

  );
};

export default ResizableTable;
