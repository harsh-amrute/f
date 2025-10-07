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

  const { filterRows, addFilterRow, removeFilterRow, isMaxRows, isMinRows, setFilterRows } =
    useFilterRows();

  const [attributeOptions, setAttributeOptions] = useState<any[]>([]);
  const [rowSelections, setRowSelections] = useState<{
    [rowId: number]: { column?: any; operation?: any; value?: any };
  }>({});

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const getBPRUiConfig = async () => {
      const response = await getUiConfig(UIColumnConfigName.BPR);
      const allCols = response?.data?.data || [];

      const filtered = allCols.filter((col: any) =>
        ["skulocattr", "skuattr", "locattr"].some((kw) =>
          col.Col_Code?.toLowerCase()?.includes(kw)
        )
      );

      const formatted = filtered.map((col: any) => ({
        value: col.Col_Code,
        label: col.Header,
        name: col.Col_Code,
      }));

      setAttributeOptions(formatted);
    };

    getBPRUiConfig();
  }, []);

  useEffect(() => {
    const parentId = "customAttributeFilter";
    const savedFilters = multiFilter[parentId]?.filters || [];

    if (savedFilters.length === 0) {
      setRowSelections({});
      setIsInitialized(true);
      return;
    }

    const newRows = savedFilters.map((_, idx) => ({ id: idx }));
    setFilterRows(newRows);

    const restored: {
      [rowId: number]: { column?: any; operation?: any; value?: any };
    } = {};

    savedFilters.forEach((f: BPRFilter, idx: number) => {
      const column = attributeOptions.find((opt) => opt.value === f.attributeName);
      const operation = stringOpertors.find((op) => op.value === f.operator);
      restored[idx] = {
        column: column || null,
        operation: operation || null,
        value: f.value,
      };
    });

    setRowSelections(restored);
    setIsInitialized(true);
  }, [multiFilter?.customAttributeFilter?.filters, attributeOptions]);

  const onFilterChange = (
    rowId: number,
    field: "column" | "operation" | "value",
    selected: any
  ) => {
    const updated = {
      ...rowSelections,
      [rowId]: { ...rowSelections[rowId], [field]: selected },
    };
    setRowSelections(updated);

    const parentId = "customAttributeFilter";
    const current = updated[rowId];

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
        name: `${current.column.value}_${rowId}`,
      };

      const existingFilters = multiFilter[parentId]?.filters || [];
      const filteredFilters = existingFilters.filter((f: BPRFilter) => f.name !== newFilter.name);

        const updatedMultiFilter = {
        ...multiFilter,
        [parentId]: {
          ...multiFilter[parentId],
          filters: [...filteredFilters, newFilter],
        },
      };

      onMultiFilterChange(updatedMultiFilter);
    }
  };

  if (!isInitialized) return null;

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
                onChange={(selected) => onFilterChange(row.id, "column", selected)}
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
                onChange={(selected) => onFilterChange(row.id, "operation", selected)}
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
                onChange={(e) => onFilterChange(row.id, "value", e.target.value)}
              />
            </DropDownWrapper>

            <div style={{ display: "flex", alignItems: "center" }}>
              <IconWrapper theme_ui={user.user.theme_ui}>
                <img src={"/assets/img/MTAVFMultiFilter/Error.svg"} alt="error" />
              </IconWrapper>
              <IconWrapper
                theme_ui={user.user.theme_ui}
                disabled={isMaxRows}
                onClick={addFilterRow}
              >
                <img
                  src={"/assets/img/MTAVFMultiFilter/plus-sign-circle.svg"}
                  alt="add"
                />
              </IconWrapper>
              <IconWrapper
                theme_ui={user.user.theme_ui}
                disabled={isMinRows}
                onClick={() => removeFilterRow(row.id)}
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
