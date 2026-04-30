import { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import VFTable from "../../../../../VectorFlow/Pages/MTO/Common/VFTable";
import { createPortal } from "react-dom";
import { useUserData } from "../../../../../context";
import {
  ARTableWrapper,
  ARTableHeader,
  tooltipPortal,
  tooltipArrow,
  tooltipText,
  formulaWrapper,
  formulaColumn,
  formulaNumerator,
  formulaDenominator,
  formulaMultiplier,
  infoButton,
  infoButtonWrapper,
  categoryBadge,
  categoryBadgeWhite,
  categoryWithIcon,
  boldText,
  tooltipBorderColorVar,
  badgeBgVar,
  badgeColorVar,
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface SpliViewTableProps extends AgGridReactProps {
  header: string;
}

export interface SplitViewProps {
  techTable: SpliViewTableProps;
  ecoTable: SpliViewTableProps;
  themeUi: string;
  activeTab: "norm" | "virtualnorm";
}

interface SummaryTableProps {
  gridRef: React.RefObject<AgGridReact>;
  header: string;
  rowData: any[];
  gridOptions: any;
  tableKey: string;
  tableType: "tech" | "eco";
  activeTab: "norm" | "virtualnorm";
}

interface BaseTooltipProps {
  borderColor: string;
  children: React.ReactNode;
}

const BaseTooltip = ({ borderColor, children }: BaseTooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const { user } = useUserData();
  const themeUi = user.user.theme_ui;
  
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !tipRef.current?.contains(e.target as Node)
      )
        setVisible(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnter = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY - 12,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
    setVisible(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (
      e.relatedTarget instanceof Node &&
      tipRef.current?.contains(e.relatedTarget)
    )
      return;
    setVisible(false);
  };

  return (
    <span className={infoButtonWrapper}>
      <button
        ref={btnRef}
        className={infoButton}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={themeUi === "REGALBLAZE" ? "/assets/img/info-btn-yellow.svg" : "/assets/img/info-btn.svg"} height={16} width={16} />
      </button>

      {visible &&
        createPortal(
          <div
            ref={tipRef}
            className={tooltipPortal}
            style={{
              top: coords.top,
              left: coords.left,
              ...assignInlineVars({ [tooltipBorderColorVar]: borderColor }),
            }}
            onMouseLeave={(e) => {
              if (btnRef.current?.contains(e.relatedTarget as Node)) return;
              setVisible(false);
            }}
          >
            <div
              className={tooltipArrow}
              style={assignInlineVars({ [tooltipBorderColorVar]: borderColor })}
            />
            {children}
          </div>,
          document.body
        )}
    </span>
  );
};

const FormulaTooltip = ({ color }: { color: string }) => (
  <BaseTooltip borderColor={color}>
    <div className={formulaWrapper}>
      <div className={formulaColumn}>
        <span
          className={formulaNumerator}
          style={assignInlineVars({ [tooltipBorderColorVar]: color })}
        >
          Red + Yellow + Green + Blue + White
        </span>
        <span
          className={formulaDenominator}
          style={assignInlineVars({ [tooltipBorderColorVar]: color })}
        >
          Black + Red + Yellow + Green + Blue + White
        </span>
      </div>
      <span
        className={formulaMultiplier}
        style={assignInlineVars({ [tooltipBorderColorVar]: color })}
      >
        × 100
      </span>
    </div>
  </BaseTooltip>
);

const GreyTooltip = ({
  activeTab,
  tableType,
}: {
  color: string;
  activeTab: "norm" | "virtualnorm";
  tableType: "tech" | "eco";
}) => {
  const normLabel = activeTab === "virtualnorm" ? "Virtual Norm" : "Norm";
  const formula =
    tableType === "tech"
      ? `${normLabel} + Stock = 0`
      : `${normLabel} + Stock + GIT = 0`;

  return (
    <BaseTooltip borderColor="#9e9e9e">
      <span className={tooltipText}>{formula}</span>
    </BaseTooltip>
  );
};

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  Black: { bg: "#000000", color: "#ffffff" },
  Blue: { bg: "#0c37e5ff", color: "#ffffff" },
  Red: { bg: "#e53935", color: "#ffffff" },
  Yellow: { bg: "#f9a825", color: "#ffffff" },
  Green: { bg: "#43a047", color: "#ffffff" },
  Grey: { bg: "#9e9e9e", color: "#ffffff" },
};

const CategoryBadgeCellRenderer = (params: any) => {
  const { user } = useUserData();
  const value = params.value;
  const themeUi = user.user.theme_ui;
  const activeTab: "norm" | "virtualnorm" =
    params.context?.activeTab ?? "virtualnorm";
  const tableType: "tech" | "eco" = params.context?.tableType ?? "tech";

  if (!value || value === "-") return <span>{value ?? ""}</span>;

  if (value === "Total") {
    return <span className={boldText}>{value}</span>;
  }

  if (value === "Availability") {
    return (
      <div className={categoryWithIcon}>
        <span className={boldText}>{value}</span>
        <FormulaTooltip
          color={themeUi !== "REGALBLAZE" ? "#ffffff" : "#ffffff"}
        />
      </div>
    );
  }

  if (value === "White") {
    return <span className={categoryBadgeWhite}>{value}</span>;
  }

  if (value === "Grey") {
    return (
      <div className={categoryWithIcon}>
        <span
          className={categoryBadge}
          style={assignInlineVars({
            [badgeBgVar]: "#9e9e9e",
            [badgeColorVar]: "#ffffff",
          })}
        >
          Grey
        </span>
        <GreyTooltip
          color="#9e9e9e"
          activeTab={activeTab}
          tableType={tableType}
        />
      </div>
    );
  }

  const colors = BADGE_COLORS[value];
  if (!colors) return <span>{value}</span>;

  return (
    <span
      className={categoryBadge}
      style={assignInlineVars({
        [badgeBgVar]: colors.bg,
        [badgeColorVar]: colors.color,
      })}
    >
      {value}
    </span>
  );
};
const BoldCellRenderer = (params: any) => {
  const isBold =
    params.data?.Category === "Total" ||
    params.data?.Category === "Availability" ||
    params.data?.Category === "Grey";
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
  return params.node.rowIndex % 2 === 0
    ? { background: "#EBEBEB" }
    : { background: "#F7F7F7" };
};

const SummaryTable = ({
  gridRef,
  header,
  rowData,
  gridOptions,
  tableKey,
  tableType,
  activeTab,
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
        height="103%"
        columnDefs={summaryColDefs}
        rowData={rowData}
        defaultColDef={summaryDefaultColDef}
        gridOptions={{
          ...gridOptions,
          getRowStyle,
          context: { tableType, activeTab },
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
  const { activeTab } = props;
  const CATEGORY_ORDER = [
    "Black",
    "Red",
    "Yellow",
    "Green",
    "Blue",
    "White",
    "Total",
    "Availability",
    "Grey",
  ];

  const techSummaryRows = useMemo(
    () =>
      [...(techTable.rowData ?? [])].sort(
        (a, b) =>
          CATEGORY_ORDER.indexOf(a.Category) -
          CATEGORY_ORDER.indexOf(b.Category)
      ),
    [techTable.rowData]
  );

  const ecoSummaryRows = useMemo(
    () =>
      [...(ecoTable.rowData ?? [])].sort(
        (a, b) =>
          CATEGORY_ORDER.indexOf(a.Category) -
          CATEGORY_ORDER.indexOf(b.Category)
      ),
    [ecoTable.rowData]
  );

  const ref1 = useRef<AgGridReact>(null);
  const ref2 = useRef<AgGridReact>(null);
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
          tableType="tech"
          activeTab={activeTab}
        />
      </div>

      <div style={{ flex: 1, minWidth: 1 }}>
        <SummaryTable
          gridRef={ref2}
          header={ecoTable.header}
          rowData={ecoSummaryRows}
          gridOptions={ecoTable.gridOptions}
          tableKey="summary-eco"
          tableType="eco"
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};

export default Summary;
