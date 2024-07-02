import { ColDef } from "ag-grid-enterprise";
import { useState, useEffect, useMemo, useRef } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import * as TableStyle from "./style";
const ROW_HEIGHT = 40; // Adjust as per your row height

interface IResizeTableProps {
  header: ColDef[];
  data: any;
}

const ResizableTable = (props: IResizeTableProps) => {
  const { header, data } = props;
  const tempRef = useRef();
  const [tableHeight, setTableHeight] = useState(300); // Initial table height
  const [numRows, setNumRows] = useState(5); // Initial number of visible rows

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    let initialY = e.clientY;

    const handleMouseMove = (moveEvent: any) => {
      const delta = moveEvent.clientY - initialY;
      setTableHeight((prevHeight) => prevHeight + delta);
      initialY = moveEvent.clientY;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const updateNumRows = () => {
      const containerElement = document.querySelector(".table-container");
      if (containerElement) {
        const containerHeight = containerElement.clientHeight;
        const newNumRows = Math.floor(containerHeight / ROW_HEIGHT);
        setNumRows(newNumRows);
      }
    };

    updateNumRows();
    window.addEventListener("resize", updateNumRows);
    return () => window.removeEventListener("resize", updateNumRows);
  }, []);

  const BarFillUI = (value: any) => {
    const val = value?.value;
    return (
      <TableStyle.CellWithBar>
        <TableStyle.BarContainer>
          <TableStyle.CellBar style={{ width: `${val < 10 ? val * 10 : val}%` }} />
        </TableStyle.BarContainer>
        <TableStyle.CellBarValue>{val || 0}</TableStyle.CellBarValue> 
      </TableStyle.CellWithBar>
    );
  };

  const CustomHeader = ({ headerName }: any) => {
    return (
      <div
        style={{
          fontFamily: "Roboto",
          background: "black",
          fontWeight: "500",
          fontSize: "18px",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {headerName}
      </div>
    );
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "Plant",
      field: "plnm",
      colId: "plnm",
      minWidth: 150,
      flex: 1,
      cellStyle: {
        fontSize: "18px",
        width: "100%",
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
      },
      headerComponent: () => <CustomHeader headerName="Plant" />,
    },
    {
      headerName: "Department",
      field: "dpnm",
      colId: "dpnm",
      minWidth: 110,
      flex: 1,
      cellStyle: {
        width: "100%",
        fontSize: "18px",
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
      },
      headerComponent: () => <CustomHeader headerName="Department" />,
    },
    {
      headerName: "CCR Group",
      field: "gnm",
      colId: "gnm",
      minWidth: 120,
      flex: 1,
      cellStyle: {
        width: "100%",
        fontSize: "18px",
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
      },
      headerComponent: () => <CustomHeader headerName="CCR Group" />,
    },
    {
      headerName: "CCR Name",
      field: "cnm",
      colId: "cnm",
      minWidth: 120,
      flex: 1,
      cellStyle: {
        width: "100%",
        fontSize: "18px",
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
      },
      headerComponent: () => <CustomHeader headerName="CCR Name" />,
    },
    {
      headerName: "fol (in Days)",
      field: "fol",
      filter: "agNumberColumnFilter",
      colId: "fol",
      minWidth: 120,
      flex: 1,
      cellRenderer: (params: any) => <BarFillUI value={params?.value} />,
      cellStyle: {
        width: "100%",
        fontSize: "18px",
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
      },
      headerComponent: () => <CustomHeader headerName="FOL ( in Dyays )" />,
    },
  ];

  const getRowStyle = (params: any) => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: "white" };
    }
    return { background: "#F4F4F4" };
  };

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  return (
    <TableStyle.TableResizebarWrapper >
      <TableStyle.TableContainer>
        <div data-testid='table-wrapper' style={{ height: tableHeight }}>
          <TableStyle.TableWrapper>
            <VFTable
              ref={tempRef}
              columnDefs={columnDefs}
              rowData={data}
              defaultColDef={defaultColDef}
              getRowStyle={getRowStyle}
              height={`${tableHeight + 40}px`}
            />
          </TableStyle.TableWrapper>
        </div>
      </TableStyle.TableContainer>
      <TableStyle.ResizeBar
        data-testid='resize-bar'
        onMouseDown={handleMouseDown}
      ></TableStyle.ResizeBar>
    </TableStyle.TableResizebarWrapper>
  );
};

export default ResizableTable;
