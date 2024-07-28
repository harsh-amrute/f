import { ColDef } from "ag-grid-enterprise";
import { useRef } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import { VFTableWrapper } from "./styles";

interface IResizeTableProps {
  header: ColDef[];
  data: any;
}

const ResizableTable = (props: IResizeTableProps) => {
  const { data, header } = props;
  const tempRef = useRef();



  const columnDefs = header;

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
      "font-weight": "200",
      "font-size": "16px",
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
        pagination

      />
    </VFTableWrapper>

  );
};

export default ResizableTable;
