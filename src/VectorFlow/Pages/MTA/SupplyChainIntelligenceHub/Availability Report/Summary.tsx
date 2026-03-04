import { useMemo, useRef } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { ARTableWrapper, ARTableHeader } from "./styles.css";
import VFTable from "../../../../../VectorFlow/Pages/MTO/Common/VFTable";

interface SpliViewTableProps extends AgGridReactProps {
  header: string;
  paginationProps: any;
}

export interface SplitViewProps {
  techTable: SpliViewTableProps;
  ecoTable: SpliViewTableProps;
  isLocked: boolean;
  toggleLockMode: (value: boolean) => void;
  themeUi: string;
  initialColumnState: any;
}

const CategoryBadgeCellRenderer = (params: any) => {
  const value = params.value;
  if (!value || value === "-") return <span>{value ?? ""}</span>;

  const colorMap: Record<
    string,
    { bg: string; color: string; border?: string }
  > = {
    Black: { bg: "#000000", color: "#ffffff" },
    Red: { bg: "#e53935", color: "#ffffff" },
    Yellow: { bg: "#f9a825", color: "#ffffff" },
    Green: { bg: "#43a047", color: "#ffffff" },
    White: { bg: "#ffffff", color: "#000000", border: "1px solid #ccc" },
    Grey: { bg: "#9e9e9e", color: "#ffffff" },
    Total: { bg: "transparent", color: "#000000" },
    Availability: { bg: "transparent", color: "#000000" },
  };

  const style = colorMap[value];

  if (!style || value === "Total" || value === "Availability") {
    return <span style={{ fontWeight: "bold" }}>{value}</span>;
  }

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 14px",
        borderRadius: "4px",
        backgroundColor: style.bg,
        color: style.color,
        border: style.border ?? "none",
        fontWeight: 500,
        minWidth: 60,
        textAlign: "center",
      }}
    >
      {value}
    </span>
  );
};

const buildSummaryRows = () => [
  { Category: "Black", AbsoluteNo: 10, Percentage: 3 },
  { Category: "Red", AbsoluteNo: 10, Percentage: 5 },
  { Category: "Yellow", AbsoluteNo: 1, Percentage: 3 },
  { Category: "Green", AbsoluteNo: 1, Percentage: 6 },
  { Category: "White", AbsoluteNo: 2, Percentage: 9 },
  { Category: "Grey", AbsoluteNo: 11, Percentage: 2 },
  { Category: "Total", AbsoluteNo: 35, Percentage: 28 },
  { Category: "Availability", AbsoluteNo: "-", Percentage: 11 },
];

const BoldCellRenderer = (params: any) => {
  const isBold =
    params.data?.Category === "Total" ||
    params.data?.Category === "Availability";
  return (
    <span style={{ fontWeight: isBold ? "bold" : "normal" }}>
      {params.value}
    </span>
  );
};

const summaryColDefs = [
  {
    headerName: "Category",
    field: "Category",
    colId: "Category",
    cellRenderer: CategoryBadgeCellRenderer,
    minWidth: 130,
    flex: 1,
    cellStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    headerName: "Absolute No.",
    field: "AbsoluteNo",
    colId: "AbsoluteNo",
    cellRenderer: BoldCellRenderer,
    minWidth: 130,
    flex: 1,
    cellStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    headerName: "Percentage",
    field: "Percentage",
    colId: "Percentage",
    cellRenderer: BoldCellRenderer,
    minWidth: 130,
    flex: 1,
    cellStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
];

const summaryDefaultColDef = {
  floatingFilter: true,
  filter: "agMultiColumnFilter",
  sortable: true,
  suppressHeaderMenuButton: true,
  resizable: false,
  suppressAutoSize: true,
  flex: 1,
  width: 50,
  minWidth: 80,
  cellClass: "btr_cell_style",
};

const getRowStyle = (params: any) => {
  if (
    params.data?.Category === "Total" ||
    params.data?.Category === "Availability"
  ) {
    return { background: "#f0f0f0", fontWeight: "bold" };
  }
  return params.node.rowIndex % 2 === 0
    ? { background: "#EBEBEB" }
    : { background: "#F7F7F7" };
};

interface SummaryTableProps {
  gridRef: React.RefObject<AgGridReact>;
  header: string;
  rowData: any[];
  gridOptions: any;
  tableKey: string;
}

const SummaryTable = ({
  gridRef,
  header,
  rowData,
  gridOptions,
  tableKey,
}: SummaryTableProps) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "0 12px",
      boxSizing: "border-box",
    }}
  >
    <p className={ARTableHeader}>{header}</p>

    <div style={{ flex: 1, width: "100%", minHeight: 0 }}>
      <VFTable
        key={tableKey}
        ref={gridRef}
        disableZoomScaling
        rowHeight={38}
        sideBar={null}
        height="93.6%"
        columnDefs={summaryColDefs}
        rowData={rowData}
        defaultColDef={summaryDefaultColDef}
        gridOptions={{
          ...gridOptions,
          getRowStyle,
          suppressDragLeaveHidesColumns: true,
          onGridSizeChanged: (params: any) => {
            params.api.sizeColumnsToFit();
          },
          suppressAutoSize: true,
        }}
        statusBar={{ statusPanels: [] }}
        tooltipMouseTrack={true}
        tooltipShowDelay={100}
        onGridReady={(params: any) => {
          params.api.sizeColumnsToFit();
        }}
      />
    </div>
  </div>
);

const Summary = (props: SplitViewProps) => {
  const { techTable, ecoTable } = props;

  const ref1 = useRef<AgGridReact>(null);
  const ref2 = useRef<AgGridReact>(null);

  // TODO: replace buildSummaryRows() with real API data derived from techTable / ecoTable rowData
  const techSummaryRows = techTable.rowData ?? [];
  const ecoSummaryRows = ecoTable.rowData ?? [];
  return (
    <div
      className={ARTableWrapper}
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
        gap: "24px",
      }}
    >
      <div style={{ flex: 1, minWidth: 1 }}>
        <SummaryTable
          gridRef={ref1}
          header={techTable.header}
          rowData={techSummaryRows}
          gridOptions={techTable.gridOptions}
          tableKey="summary-tech"
        />
      </div>

      <div style={{ flex: 1, minWidth: 1 }}>
        <SummaryTable
          gridRef={ref2}
          header={ecoTable.header}
          rowData={ecoSummaryRows}
          gridOptions={ecoTable.gridOptions}
          tableKey="summary-eco"
        />
      </div>
    </div>
  );
};

export default Summary;
