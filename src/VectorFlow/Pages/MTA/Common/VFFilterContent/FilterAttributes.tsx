import React, { useEffect, useState } from "react";
import {
  FilterGroup,
  FilterColumn,
  TextWrapper,
  DropDownWrapper,
  DropDownRow,
  IconWrapper,
} from "./style";
import Select from "react-select";
import { useThemeStyles } from "../../../../../hooks/useVFFilterContent";
import { useFilterRows, stringOpertors } from "./useVFFilterContent";
import { useUserData } from "../../../../../context";
import { useGetUIConfigData } from "../../../../Services/MTA/Common/UIConfig";
import { UIColumnConfigName } from "../../../../../helpers/Enum";
import { BPRFilter, BPRFilterState } from "../../../../../VectorFlow/types/BPR";

interface FilterSectionProps {
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
}

export const AttributesFilters: React.FC<FilterSectionProps> = ({
  multiFilter,
  onMultiFilterChange,
}) => {
  const { user } = useUserData();
  const styles = useThemeStyles();
  const { mutateAsync: getUiConfig } = useGetUIConfigData();

  const {
    filterRows,
    handleAddRow,
    handleRemoveRow,
    isMaxRows,
    isMinRows,
    setFilterRows,
    resetFilterRows,
  } = useFilterRows();

  const [attributeOptions, setAttributeOptions] = useState<any[]>([]);
  const [rowSelections, setRowSelections] = useState<
    Record<number, { column?: any; operation?: any; value?: any }>
  >({});
  const [rowFilterIndexMap, setRowFilterIndexMap] = useState<
    Record<number, number>
  >({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadAttributes = async () => {
      try {
        const res = await getUiConfig(UIColumnConfigName.BPR);

        const data = res?.data?.data?.data || res?.data?.data || [];

        console.log("UIConfig raw response:", data);

        const filtered = data.filter((col: any) =>
          ["skulocattr", "skuattr", "locattr"].some((kw) =>
            col.Col_Code?.toLowerCase()?.includes(kw)
          )
        );

        const finalCols = filtered.length > 0 ? filtered : data;

        const formatted = finalCols.map((col: any, idx: number) => ({
          value: col.Col_Code,
          label: col.Header || col.Col_Code,
          name: `CAF${idx + 1}`,
        }));

        console.log("Final attributeOptions:", formatted);

        setAttributeOptions(formatted);
      } catch (err) {
        console.error("Error loading UIConfig attributes:", err);
        setAttributeOptions([]);
      }
    };

    loadAttributes();
  }, [getUiConfig]);

  useEffect(() => {
    if (attributeOptions.length === 0) return;

    const parentId = "customAttributeFilter";
    const savedFilters = multiFilter[parentId]?.filters || [];

    if (savedFilters.length === 0) {
      setRowSelections({});
      resetFilterRows(1);
      setRowFilterIndexMap({});
      setIsInitialized(true);
      return;
    }

    if (isInitialized) return;

    const newRows = savedFilters.map((_, idx) => ({ id: idx }));
    setFilterRows(newRows);

    const restored: Record<
      number,
      { column?: any; operation?: any; value?: any }
    > = {};
    const indexMap: Record<number, number> = {};

    savedFilters.forEach((f: BPRFilter, idx: number) => {
      const column = attributeOptions.find(
        (opt) => opt.value === f.attributeName
      );
      const operation = stringOpertors.find((op) => op.value === f.operator);

      restored[idx] = {
        column: column || null,
        operation: operation || null,
        value: f.value,
      };
      indexMap[idx] = idx;
    });

    setRowSelections(restored);
    setRowFilterIndexMap(indexMap);
    setIsInitialized(true);
  }, [attributeOptions, multiFilter?.customAttributeFilter?.filters]);

  const onFilterChange = (
    rowId: number,
    field: "column" | "operation" | "value",
    selected: any
  ) => {
    const updatedSelections = {
      ...rowSelections,
      [rowId]: { ...rowSelections[rowId], [field]: selected },
    };
    setRowSelections(updatedSelections);

    const parentId = "customAttributeFilter";
    const current = updatedSelections[rowId];

    if (
      current?.column &&
      current?.operation &&
      current?.value !== undefined &&
      current?.value !== ""
    ) {
      const newFilter: BPRFilter = {
        attributeName: current.column.value,
        value: current.value,
        operator: current.operation.value,
        label: current.column.label,
        name: current.column.name,
      };

      const existingFilters = (multiFilter[parentId]?.filters ||
        []) as BPRFilter[];
      const nextFilters = existingFilters.slice();
      const idx = rowFilterIndexMap[rowId];
      const newIndexMap = { ...rowFilterIndexMap };

      if (typeof idx === "number" && idx >= 0 && idx < nextFilters.length) {
        nextFilters[idx] = newFilter;
      } else {
        nextFilters.push(newFilter);
        newIndexMap[rowId] = nextFilters.length - 1;
      }

      onMultiFilterChange({
        ...multiFilter,
        [parentId]: { ...multiFilter[parentId], filters: nextFilters },
      });

      setRowFilterIndexMap(newIndexMap);
    }
  };

  const handleRemoveRowWithFilter = (rowId: number) => {
    if (isMinRows) return;

    const parentId = "customAttributeFilter";
    const existingFilters = (multiFilter[parentId]?.filters ||
      []) as BPRFilter[];
    const idx = rowFilterIndexMap[rowId];
    const nextFilters = existingFilters.slice();
    const newIndexMap = { ...rowFilterIndexMap };

    if (typeof idx === "number" && idx >= 0 && idx < nextFilters.length) {
      nextFilters.splice(idx, 1);
      Object.keys(newIndexMap).forEach((k) => {
        const rid = Number(k);
        if (rid === rowId) return;
        if (newIndexMap[rid] > idx) newIndexMap[rid] = newIndexMap[rid] - 1;
      });
    }

    handleRemoveRow(rowId);
    setRowSelections((prev) => {
      const copy = { ...prev };
      delete copy[rowId];
      return copy;
    });
    delete newIndexMap[rowId];
    setRowFilterIndexMap(newIndexMap);

    onMultiFilterChange({
      ...multiFilter,
      [parentId]: { ...multiFilter[parentId], filters: nextFilters },
    });
  };

  if (!isInitialized || attributeOptions.length === 0) {
    return (
      <TextWrapper style={{ padding: "10px", color: "#666" }}>
        Loading attribute options...
      </TextWrapper>
    );
  }

  return (
    <FilterGroup>
      <FilterColumn style={{ minWidth: "400px", maxWidth: "none" }}>
        <TextWrapper>Select Attributes - SKU/Location</TextWrapper>
        {filterRows.map((row) => (
          <DropDownRow key={row.id} style={{ alignItems: "center" }}>
            <DropDownWrapper>
              <Select
                options={attributeOptions}
                placeholder="Select Column"
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
                value={rowSelections[row.id]?.column || null}
                onChange={(selected) =>
                  onFilterChange(row.id, "column", selected)
                }
              />
            </DropDownWrapper>

            <DropDownWrapper>
              <Select
                options={stringOpertors}
                placeholder="Select Operation"
                styles={styles}
                isSearchable={false}
                components={{ IndicatorSeparator: () => null }}
                value={rowSelections[row.id]?.operation || null}
                onChange={(selected) =>
                  onFilterChange(row.id, "operation", selected)
                }
              />
            </DropDownWrapper>

            <DropDownWrapper>
              <input
                placeholder="Enter value"
                className={`filter-input ${
                  user.user.theme_ui === "REGALBLAZE"
                    ? "filter-input--regal"
                    : "filter-input--default"
                }`}
                value={rowSelections[row.id]?.value || ""}
                onChange={(e) =>
                  onFilterChange(row.id, "value", e.target.value)
                }
              />
            </DropDownWrapper>

            <div style={{ display: "flex", alignItems: "center" }}>
              <IconWrapper theme_ui={user.user.theme_ui}>
                <img
                  src={"/assets/img/MTAVFMultiFilter/Error.svg"}
                  alt="error"
                />
              </IconWrapper>
              <IconWrapper
                theme_ui={user.user.theme_ui}
                disabled={isMaxRows}
                onClick={handleAddRow}
              >
                <img
                  src={"/assets/img/MTAVFMultiFilter/plus-sign-circle.svg"}
                  alt="add"
                />
              </IconWrapper>
              <IconWrapper
                theme_ui={user.user.theme_ui}
                disabled={isMinRows}
                onClick={() => handleRemoveRowWithFilter(row.id)}
              >
                <img
                  src={"/assets/img/MTAVFMultiFilter/minus-sign-circle.svg"}
                  alt="remove"
                />
              </IconWrapper>
            </div>
          </DropDownRow>
        ))}
      </FilterColumn>
    </FilterGroup>
  );
};
