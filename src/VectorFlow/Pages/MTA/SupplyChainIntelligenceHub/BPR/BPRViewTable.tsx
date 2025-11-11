import { useState, useMemo } from "react";
import { ColDef } from "ag-grid-enterprise";
import { useUserData } from "../../../../../context";
import BPRViewTableRequestCellRenderer from "./BPRViewTableRequestCellRenderer";
import BPRViewTableRowCellWithReadMore from "./BPRViewTableRowCellWithReadMore";
import {
  BPRViewTableWrapper,
  BPRViewTablePrefix,
  BPRViewTableGrid,
  BPRViewTableHeaderContainer,
  BPRViewTableRowContainer,
  BPRViewTableRow,
  BPRViewTableRowCell,
  BPRViewTablePrefixWrapper,
  BPRViewTablePrefixText,
  BPRViewTablePrefixIcon,
  BPRViewTableNoDataContainer,
  BPRViewTableNoDataHeader,
  BPRViewTableNoDataText,
  BPRViewTableHeaderTab,
  BPRViewTableAvailabilityCellRenderer,
  tabTextColorVar,
  tabBgVar,
  tabZIndexVar,
  tabMarLeftVar,
  tabPadLeftVar,
} from "./styles.css";
import AgeingCellRenderer from "./AgeingCellRenderer";
import WhereAboutsCellRenderer from "./WhereAboutsCellRenderer";
import BPRViewTableColumnHeader from "./BPRViewTableColumnHeader";
import {
  getFiltersArrayFromColDefs,
  performNumericalOpertionsForBPRViewTableFilter,
  performStringOpertionsForBPRViewTableFilter,
} from "../../../../../helpers/utils";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../../styles/global";

export interface BPRViewTableColDef {
  headerName: any;
  colId: string;
  field?: string;
  filter?: boolean;
  filterValue?: string;
  dataType?: string;
  onApplyFilter?: (filterString: string, query: string) => void;
  onCellClicked?: () => void;
}

interface BPRViewTableProps {
  colDefs: BPRViewTableColDef[];
  rowData: any;
  tablePrefixSrc: string;
  tableHeader: string;
  onRequestExpediting?: () => void;
}

const BPRViewTable = (props: BPRViewTableProps) => {
  const { colDefs, rowData, tablePrefixSrc, tableHeader, onRequestExpediting } =
    props;

  const onReq = () => {
    if (onRequestExpediting) {
      onRequestExpediting();
    }
  };

  const { user } = useUserData();
  const { theme_ui } = user.user;

  const [filters, setFilters] = useState<Array<any>>(
    getFiltersArrayFromColDefs(colDefs)
  );
  const onApplyFilter = (key: string, value: string, query: string) => {
    setFilters((prev) =>
      prev.map((f) =>
        f.colId === key ? { ...f, filterValue: value, query: query } : f
      )
    );
  };

  const filteredRows = useMemo((): Array<any> => {
    if (rowData) {
      if (Array.isArray(rowData)) {
        return rowData.filter((r: any) => {
          return filters.every((f) => {
            if (f.filterValue === "") {
              return true;
            }

            if (f.dataType === "number") {
              return performNumericalOpertionsForBPRViewTableFilter(
                parseFloat(r[f.colId]),
                parseFloat(f.filterValue),
                f.query
              );
            }

            if (!r[f.colId]) return false;

            return performStringOpertionsForBPRViewTableFilter(
              String(r[f.colId]).toUpperCase(),
              f.filterValue.toUpperCase(),
              f.query
            );
          });
        });
      }
    }
    return [];
  }, [filters, rowData]);

  const renderRows = () => {
    if (!filteredRows || filteredRows.length === 0) {
      return (
        <div className={BPRViewTableNoDataContainer}>
          <p className={BPRViewTableNoDataHeader}>No Data To Show</p>
          <p className={BPRViewTableNoDataText}>
            Please select a row from above table to view data
          </p>
        </div>
      );
    }
    return (
      filteredRows &&
      filteredRows.map((row: any, index: number) => {
        return (
          <div className={BPRViewTableRow} key={index}>
            {colDefs.map((colDef: ColDef, index: number) => {
              if (colDef.colId) {
                if (
                  row[colDef.colId] ||
                  colDef.colId === "whereabouts" ||
                  colDef.colId === "request"
                ) {
                  if (colDef.colId === "whereabouts") {
                    return <WhereAboutsCellRenderer value={row} />;
                  }

                  if (colDef.colId === "ag") {
                    return <AgeingCellRenderer value={row} />;
                  }

                  if (colDef.colId === "remarks") {
                    return (
                      <BPRViewTableRowCellWithReadMore
                        value={row[colDef.colId]}
                        key={index}
                      />
                    );
                  }
                  if (colDef.colId === "request") {
                    return (
                      <BPRViewTableRequestCellRenderer
                        onClick={onReq}
                        key={index}
                      />
                    );
                  }
                  if (colDef.colId === "avail") {
                    return (
                      <div className={BPRViewTableRowCell} key={index}>
                        <div className={BPRViewTableAvailabilityCellRenderer}>
                          {row[colDef.colId]}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className={BPRViewTableRowCell} key={index}>
                      {row[colDef.colId]}
                    </div>
                  );
                }
                return (
                  <div className={BPRViewTableRowCell} key={index}>
                    NULL
                  </div>
                );
              }
            })}
          </div>
        );
      })
    );
  };

  // pick colors based on your theme/status (example)
  const isActive = true; // status === 'active'
  const textColor = isActive ? "#000" : "#666";
  const themeUi = user?.user?.theme_ui;

  const bg =
    themeUi === "REGALBLAZE"
      ? globalStyles.chooseThemeColor[themeUi]?.color5
      : "transparent linear-gradient(74deg, #820F4C 0%, #BC3D81 100%) 0% 0% no-repeat padding-box";
  const marLeft = false;

  return (
    <div className={BPRViewTableWrapper}>
      <div className={BPRViewTablePrefixWrapper}>
        <div className={BPRViewTablePrefix}>
          <div
            className={BPRViewTableHeaderTab}
            style={assignInlineVars({
              [tabTextColorVar]: textColor,
              [tabBgVar]: bg,
              [tabZIndexVar]: String(1), // zIndex={1}
              ...(marLeft
                ? { [tabMarLeftVar]: "-1px", [tabPadLeftVar]: "4px" }
                : {}),
            })}
          >
            <div className={BPRViewTablePrefixText}>{tableHeader}</div>
            <img className={BPRViewTablePrefixIcon} src={tablePrefixSrc} />
          </div>
        </div>
      </div>

      <div className={BPRViewTableGrid}>
        {/* {tableHeader && (
                    <TableHeader>
                        {tableHeader}
                    </TableHeader>
                )} */}
        <div className={BPRViewTableHeaderContainer}>
          {colDefs.map((colDef, index) => {
            const currFilter = filters.find((f) => f.colId === colDef.colId);
            return (
              <BPRViewTableColumnHeader
                key={index}
                colDef={{
                  ...colDef,
                  filterValue: currFilter?.filterValue || "",
                  onApplyFilter: (filterString, query) => {
                    onApplyFilter(colDef.colId, filterString, query);
                  },
                }}
                query={currFilter?.query}
              />
            );
          })}
        </div>
        <div className={BPRViewTableRowContainer}>{renderRows()}</div>
      </div>
    </div>
  );
};

export default BPRViewTable;
