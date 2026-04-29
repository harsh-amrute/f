import React, { useEffect, useState } from "react";
import {
  filterGroup,
  filterColumn,
  textWrapper,
  dropDownWrapper,
  dropDownRow,
  iconWrapper,
} from "./style.css";
import Select from "react-select";
import { useThemeStyles } from "../../../../../hooks/useVFFilterContent";
import { numericOperators } from "./useVFFilterContent";
import { useUserData } from "../../../../../context";
import { BPRFilter, BPRFilterState } from "../../../../../VectorFlow/types/BPR";
import "./styles.css";

const historicalFilterOptions = [
  {
    label: "Virtual Norm",
    value: "virtualNorm",
    name: "HF1",
    attributeName: "virtualNorm",
  },
  { label: "Norm", value: "norm", name: "HF2", attributeName: "norm" },
  { label: "Stock", value: "stock", name: "HF3", attributeName: "stock" },
  { label: "GIT", value: "git", name: "HF4", attributeName: "git" },
];

interface HistoricalFilterProps {
  filters: any;
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
}

export const HistroricalFilter: React.FC<HistoricalFilterProps> = ({
  multiFilter,
  onMultiFilterChange,
}) => {
  const styles = useThemeStyles();
  const { user } = useUserData();

  const [rowSelections, setRowSelections] = useState<{
    [columnId: string]: { operation?: any; value?: string };
  }>({});

  useEffect(() => {
    if (multiFilter?.historicalFilter?.filters) {
      const restored: typeof rowSelections = {};

      historicalFilterOptions.forEach((col) => {
        const saved = multiFilter.historicalFilter.filters.find(
          (f: BPRFilter) => f.name === col.name
        );
        if (saved) {
          restored[col.value] = {
            operation:
              numericOperators.find((op) => op.value === saved.operator) ??
              null,
            value: saved.value,
          };
        }
      });

      setRowSelections(restored);
    }
  }, [multiFilter?.historicalFilter?.filters]);

  const isRowComplete = (columnId: string) => {
    const row = rowSelections[columnId];
    return row?.operation && row?.value && row.value.trim() !== "";
  };

  const onFilterChange = (
    columnId: string,
    field: "operation" | "value",
    selected: any
  ) => {
    const updated = {
      ...rowSelections,
      [columnId]: { ...rowSelections[columnId], [field]: selected },
    };
    setRowSelections(updated);

    const parentId = "historicalFilter";
    const columnInfo = historicalFilterOptions.find(
      (col) => col.value === columnId
    );
    const current = updated[columnId];

    if (
      columnInfo &&
      current?.operation &&
      current?.value !== undefined &&
      current?.value !== ""
    ) {
      const newFilter: BPRFilter = {
        attributeName: columnInfo.attributeName,
        value: current.value,
        operator: current.operation.value,
        label: columnInfo.label,
        name: columnInfo.name,
      };

      const existingFilters = multiFilter[parentId]?.filters ?? [];
      const updatedMultiFilter: BPRFilterState = {
        ...multiFilter,
        [parentId]: {
          ...multiFilter[parentId],
          filters: [
            ...existingFilters.filter(
              (f: BPRFilter) => f.name !== columnInfo.name
            ),
            newFilter,
          ],
        },
      };

      onMultiFilterChange(updatedMultiFilter);
    }
  };

  const handleResetRow = (columnId: string) => {
    setRowSelections((prev) => ({
      ...prev,
      [columnId]: { operation: null, value: "" },
    }));

    const parentId = "historicalFilter";
    const columnInfo = historicalFilterOptions.find(
      (col) => col.value === columnId
    );

    if (columnInfo) {
      const existingFilters = multiFilter[parentId]?.filters ?? [];
      const updatedMultiFilter: BPRFilterState = {
        ...multiFilter,
        [parentId]: {
          ...multiFilter[parentId],
          filters: existingFilters.filter(
            (f: BPRFilter) => f.name !== columnInfo.name
          ),
        },
      };
      onMultiFilterChange(updatedMultiFilter);
    }
  };

  return (
    <div className={filterGroup}>
      <div
        className={filterColumn}
        style={{ minWidth: "400px", maxWidth: "none" }}
      >
        <div className={textWrapper}>Select Operation</div>

        {historicalFilterOptions.map((column) => (
          <div className={dropDownRow} key={column.value}>
            <div className={dropDownWrapper}>
              <Select
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isDisabled
                value={{ label: column.label, value: column.value }}
                options={[]}
              />
            </div>

            <div className={dropDownWrapper}>
              <Select
                options={numericOperators}
                placeholder="Select an Operation"
                styles={styles}
                isSearchable={false}
                components={{ IndicatorSeparator: () => null }}
                value={rowSelections[column.value]?.operation ?? null}
                onChange={(selected) =>
                  onFilterChange(column.value, "operation", selected)
                }
              />
            </div>
            <div className={dropDownWrapper}>
              <input
                placeholder="Enter value"
                className={`filter-input ${
                  user.user.theme_ui === "REGALBLAZE"
                    ? "filter-input--regal"
                    : "filter-input--default"
                }`}
                value={rowSelections[column.value]?.value ?? ""}
                onChange={(e) =>
                  onFilterChange(column.value, "value", e.target.value)
                }
              />
            </div>
            <div
              className={iconWrapper}
              data-theme={user.user.theme_ui}
              style={{
                opacity: isRowComplete(column.value) ? 0 : 1,
                cursor: "default",
              }}
            >
              <img
                src="/assets/img/MTAVFMultiFilter/Error.svg"
                alt="error"
                title={
                  isRowComplete(column.value)
                    ? "All fields are filled"
                    : "Some fields are empty"
                }
              />
            </div>
            <div
              className={iconWrapper}
              data-theme={user.user.theme_ui}
              style={{ cursor: "pointer" }}
              onClick={() => handleResetRow(column.value)}
            >
              <img
                src="/assets/img/MTAVFMultiFilter/refresh.svg"
                alt="refresh"
                title="Reset this filter row"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
