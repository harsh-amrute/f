import React, { useEffect, useState, useMemo } from "react";
import {
  FilterGroup,
  FilterColumn,
  TextWrapper,
  DropDownWrapper,
  DropDownRow,
  IconWrapper,
} from "./style";
import Select, { components, MultiValue, ActionMeta } from "react-select";
import {
  useThemeStyles,
  useColorOptionStyles,
  useColorThemeStyles,
} from "../../../../../hooks/useVFFilterContent";
import { useFilterRows, stringOpertors } from "./useVFFilterContent";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../../context";
import { BPRFilter, BPRFilterState } from "../../../../../VectorFlow/types/BPR";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import { useGetAllSKUs } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR"; // Adjust import path as needed

interface ProductFilterProps {
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
}

interface SKUOption {
  label: string;
  value: string;
  id: string;
  originalData: any;
}

const handleApply = () => {
  console.log("Search Button.................");
};

export const ProductFilters: React.FC<ProductFilterProps> = ({
  multiFilter,
  onMultiFilterChange,
}) => {
  const styles = useThemeStyles();
  const {
    filterRows,
    addFilterRow,
    handleAddRow,
    handleRemoveRow,
    removeFilterRow,
    isMaxRows,
    isMinRows,
    setFilterRows,
    resetFilterRows,
  } = useFilterRows();
  const { user } = useUserData();
  const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);

  const PRODUCT_PERMISSION_L1 = EnvConfig["PRODUCT_PERMISSION_L1"];
  const PRODUCT_PERMISSION_L2 = EnvConfig["PRODUCT_PERMISSION_L2"];
  const PRODUCT_PERMISSION_L3 = EnvConfig["PRODUCT_PERMISSION_L3"];

  const filterProductOptions = [
    { value: "p1", label: PRODUCT_PERMISSION_L1, name: "PF1" },
    { value: "p2", label: PRODUCT_PERMISSION_L2, name: "PF2" },
    { value: "p3", label: PRODUCT_PERMISSION_L3, name: "PF3" },
    { value: "p4", label: "P4", name: "PF4" },
    { value: "p5", label: "P5", name: "PF5" },
  ];

  const [rowSelections, setRowSelections] = useState<{
    [rowId: number]: { column?: any; operation?: any; value?: any };
  }>({});

  const [rowFilterIndexMap, setRowFilterIndexMap] = useState<
    Record<number, number>
  >({});
  const [isInitialized, setIsInitialized] = useState(false);

  const [filterType, setFilterType] = useState<"SKU Code" | "SKU Description">(
    "SKU Code"
  );
  const [selectedSKUs, setSelectedSKUs] = useState<SKUOption[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [manualSearchQuery, setManualSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const { data: skuData, isLoading: isSkuDataLoading } = useGetAllSKUs();

  const colorStyles = useColorThemeStyles({
    minWidth: "620px",
    minHeight: "48px",
    valueContainerPaddingLeft: "175px",
    inputColor: "#333",
    placeholderColor: "#999",
    menuListMaxHeight: 400,
    gridColumns: 2,
    menuWidth: "800px",
    gridGap: "12px",
    optionPadding: "8px 16px",
  });

  const targetSize = 2000;
  const skuDataSize = skuData?.data?.data?.length || 0;
  const shouldUseLocalData = skuDataSize <= targetSize;
  const shouldShowSearchButton = !shouldUseLocalData;

  const customFilterOption = (option: any, inputValue: string) => {
    if (!inputValue) return false;

    const searchTerm = inputValue.toLowerCase();
    const optionLabel = option.label.toLowerCase();
    const optionValue = option.value.toLowerCase();

    return optionLabel.includes(searchTerm) || optionValue.includes(searchTerm);
  };

  const localSKUOptions = useMemo((): SKUOption[] => {
    if (!skuData?.data?.data || !shouldUseLocalData) return [];

    return skuData.data.data.map((sku: any) => {
      const label =
        filterType === "SKU Code" ? sku.sc : `${sku.sc} (${sku.sd})`;
      return {
        label: label,
        value: sku.sc,
        id: sku.sc,
        originalData: sku,
      };
    });
  }, [skuData, filterType, shouldUseLocalData]);

  const skuOptions = localSKUOptions;

  const isLoading = isSkuDataLoading;

  const CustomOption = (props: any) => {
    const optionStyles = useColorOptionStyles();
    return (
      <components.Option {...props}>
        <div style={optionStyles.optionContainer}>
          <input
            type="checkbox"
            checked={props.isSelected}
            style={optionStyles.checkbox}
            readOnly
          />
          <span style={optionStyles.colorName}>{props.data.label}</span>
        </div>
      </components.Option>
    );
  };

  useEffect(() => {
    const parentId = "productFilter";
    const savedFilters = multiFilter[parentId]?.filters || [];
    const savedSKUFilters = savedFilters.filter((f) => f.name === "PF6");
    const skuOptionsMap = new Map();
    localSKUOptions.forEach((option) => {
      skuOptionsMap.set(option.value, option);
    });

    const restoredSKUs = savedSKUFilters.map((f) => {
      const existingOption = skuOptionsMap.get(f.value);
      if (existingOption) {
        return existingOption;
      }
      return {
        value: f.value,
        label: f.label || f.value,
        id: f.value,
        originalData: { sc: f.value, sd: f.label },
      };
    });
    setSelectedSKUs(restoredSKUs);

    const operationFilters = savedFilters.filter(
      (f) => !f.name.startsWith("PF6")
    );

    if (operationFilters.length === 0) {
      setRowSelections({});
      resetFilterRows(1);
      setRowFilterIndexMap({});
      setIsInitialized(true);
      return;
    }

    if (isInitialized) return;

    const newRows = operationFilters.map((_, idx) => ({ id: idx }));
    setFilterRows(newRows);

    const restored: {
      [rowId: number]: { column?: any; operation?: any; value?: any };
    } = {};
    const indexMap: Record<number, number> = {};

    operationFilters.forEach((f: BPRFilter, idx: number) => {
      const column = filterProductOptions.find(
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
  }, [
    isInitialized,
    multiFilter?.productFilter?.filters,
    setFilterRows,
    localSKUOptions,
  ]);

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

    const parentId = "productFilter";
    const current = updatedSelections[rowId];

    if (
      current?.column &&
      current?.operation &&
      current?.value !== undefined &&
      (current?.operation?.value === "hasvalue" ||
        current?.operation?.value === "hasnovalue" ||
        (current?.value !== undefined && current?.value !== ""))
    ) {
      const newFilter: BPRFilter = {
        attributeName: current.column.value,
        value:
          current?.operation?.value === "hasvalue"
            ? "hasvalue"
            : current?.operation?.value === "hasnovalue"
            ? "hasnovalue"
            : current.value,
        operator: current.operation.value,
        label: current.column.label,
        name: current.column.name,
      };

      const existingFilters = (multiFilter[parentId]?.filters ||
        []) as BPRFilter[];
      const operationFilters = existingFilters.filter(
        (f) => !f.name.startsWith("PF6")
      );
      const skuFilters = existingFilters.filter((f) => f.name === "PF6");

      const nextFilters = operationFilters.slice();
      const idx = rowFilterIndexMap[rowId];

      const newIndexMap = { ...rowFilterIndexMap };

      if (typeof idx === "number" && idx >= 0 && idx < nextFilters.length) {
        nextFilters[idx] = newFilter;
      } else {
        nextFilters.push(newFilter);
        newIndexMap[rowId] = nextFilters.length - 1;
      }
      console.log("Applying filter:", newFilter, nextFilters);
      onMultiFilterChange({
        ...multiFilter,
        [parentId]: {
          ...multiFilter[parentId],
          filters: [...nextFilters, ...skuFilters],
        },
      });

      setRowFilterIndexMap(newIndexMap);
    }
  };

  const handleRemoveRowWithFilter = (rowId: number) => {
    if (isMinRows) return;

    const parentId = "productFilter";
    const existingFilters = (multiFilter[parentId]?.filters ||
      []) as BPRFilter[];
    const operationFilters = existingFilters.filter(
      (f) => !f.name.startsWith("PF6")
    );
    const skuFilters = existingFilters.filter((f) => f.name === "PF6");

    const idx = rowFilterIndexMap[rowId];

    const nextFilters = operationFilters.slice();
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
      [parentId]: {
        ...multiFilter[parentId],
        filters: [...nextFilters, ...skuFilters],
      },
    });
  };

  const handleSKUSelectChange = (
    newValue: MultiValue<any>,
    actionMeta: ActionMeta<any>
  ) => {
    const selected = Array.isArray(newValue) ? [...newValue] : [];
    setSelectedSKUs(selected);

    setSearchQuery("");
    setHasSearched(false);
    setManualSearchQuery("");

    const parentId = "productFilter";
    const existingFilters = (multiFilter[parentId]?.filters ||
      []) as BPRFilter[];
    const operationFilters = existingFilters.filter(
      (f) => !f.name.startsWith("PF6")
    );

    const newFilters = selected.map((sku) => ({
      attributeName: "SKU",
      value: sku.value,
      operator: "=",
      label: "SKU",
      name: "PF6",
    }));

    const updatedMultiFilter: BPRFilterState = {
      ...multiFilter,
      [parentId]: {
        ...multiFilter[parentId],
        filters: [...operationFilters, ...newFilters],
      },
    };

    onMultiFilterChange(updatedMultiFilter);
  };
  const handleSearchApply = async () => {
    console.log("Search button clicked with query:", searchQuery);

    if (searchQuery && searchQuery.length >= 2) {
      setHasSearched(true);
      setManualSearchQuery(searchQuery);
    } else {
      console.log("Search query too short:", searchQuery);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !shouldUseLocalData) {
      handleSearchApply();
    }
  };

  const handleFilterTypeChange = (selected: any) => {
    setFilterType(selected.value);
    setSelectedSKUs([]);
    setSearchQuery("");
    setManualSearchQuery("");
    setHasSearched(false);

    const parentId = "productFilter";
    const existingFilters = (multiFilter[parentId]?.filters ||
      []) as BPRFilter[];
    const operationFilters = existingFilters.filter(
      (f) => !f.name.startsWith("PF6")
    );

    const updatedMultiFilter: BPRFilterState = {
      ...multiFilter,
      [parentId]: {
        ...multiFilter[parentId],
        filters: operationFilters,
      },
    };

    onMultiFilterChange(updatedMultiFilter);
  };

  const handleInputChange = (inputValue: string, { action }: any) => {
    if (action === "input-change") {
      setSearchQuery(inputValue);
      if (hasSearched && inputValue.length < 2) {
        setManualSearchQuery("");
        setHasSearched(false);
      }
    }
  };

  const getFilteredOptions = () => {
    if (!shouldUseLocalData) {
      return skuOptions;
    }

    if (!searchQuery) {
      return [];
    }

    return skuOptions.filter((option) =>
      customFilterOption(option, searchQuery)
    );
  };

  const filteredOptions = getFilteredOptions();

  if (!isInitialized) {
    return null;
  }

  return (
    <>
      <FilterGroup>
        <FilterColumn style={{ minWidth: "400px", maxWidth: "none" }}>
          <TextWrapper>Select Operation</TextWrapper>
          {filterRows.map((row) => (
            <DropDownRow style={{ alignItems: "center" }} key={row.id}>
              <DropDownWrapper>
                <Select
                  options={filterProductOptions}
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
                  }${
                    rowSelections[row.id]?.operation?.value === "hasvalue" ||
                    rowSelections[row.id]?.operation?.value === "hasnovalue"
                      ? " filter-input--disabled"
                      : ""
                  }`}
                  value={rowSelections[row.id]?.value || ""}
                  onChange={(e) =>
                    onFilterChange(row.id, "value", e.target.value)
                  }
                  disabled={
                    rowSelections[row.id]?.operation?.value === "hasvalue" ||
                    rowSelections[row.id]?.operation?.value === "hasnovalue"
                  }
                />
              </DropDownWrapper>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "2px",
                }}
              >
                <IconWrapper theme_ui={user.user.theme_ui}>
                  <img
                    src="/assets/img/MTAVFMultiFilter/Error.svg"
                    alt="error"
                  />
                </IconWrapper>
                <IconWrapper
                  theme_ui={user.user.theme_ui}
                  disabled={isMaxRows}
                  onClick={handleAddRow}
                >
                  <img
                    src="/assets/img/MTAVFMultiFilter/plus-sign-circle.svg"
                    alt="add"
                  />
                </IconWrapper>
                <IconWrapper
                  theme_ui={user.user.theme_ui}
                  disabled={isMinRows}
                  onClick={() => handleRemoveRowWithFilter(row.id)}
                >
                  <img
                    src="/assets/img/MTAVFMultiFilter/minus-sign-circle.svg"
                    alt="remove"
                  />
                </IconWrapper>
              </div>
            </DropDownRow>
          ))}
        </FilterColumn>
      </FilterGroup>

      <FilterGroup style={{ paddingTop: "10px" }}>
        <FilterColumn>
          <TextWrapper>Select Location</TextWrapper>
          <DropDownRow>
            <DropDownWrapper style={{ flex: 1 }}>
              <Select
                placeholder={
                  shouldUseLocalData
                    ? "Type SKU code to search..."
                    : "Type to search SKUs and click Search button"
                }
                options={shouldUseLocalData ? filteredOptions : skuOptions}
                styles={{
                  ...colorStyles,
                  menu: (base) => ({
                    ...base,
                    minWidth: "620px",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "#333",
                  }),
                }}
                components={{
                  Option: CustomOption,
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                }}
                isMulti
                isSearchable
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                value={selectedSKUs}
                onChange={handleSKUSelectChange}
                onInputChange={handleInputChange}
                inputValue={searchQuery}
                onKeyDown={handleKeyPress}
                isLoading={isLoading}
                filterOption={
                  shouldUseLocalData ? customFilterOption : undefined
                }
                noOptionsMessage={({ inputValue }) =>
                  shouldUseLocalData
                    ? inputValue
                      ? "No SKUs found"
                      : "Start typing to search SKUs"
                    : "No SKUs found. Try searching with the Search button."
                }
              />

              <div style={{ width: 165, marginTop: -44, marginLeft: 4.5 }}>
                <Select
                  placeholder="SKU Code"
                  styles={{
                    ...styles,
                    control: (base: any, state: any) => ({
                      ...base,
                      minHeight: "39px",
                      border: state.isFocused
                        ? user.user.theme_ui === "REGALBLAZE"
                          ? "2px solid #FCA311"
                          : "2px solid #BC3D80"
                        : "1px solid #c7c0c0ff",
                      borderRadius: "7px",
                      boxShadow: "none",
                      outline: "none",
                      "&:hover": {
                        border: state.isFocused
                          ? user.user.theme_ui === "REGALBLAZE"
                            ? "2px solid #FCA311"
                            : "2px solid #BC3D80"
                          : "1px solid #c7c0c0ff",
                      },
                    }),
                  }}
                  components={{ IndicatorSeparator: () => null }}
                  options={[
                    { value: "SKU Code", label: "SKU Code" },
                    { value: "SKU Description", label: "SKU Description" },
                  ]}
                  value={{
                    value: filterType,
                    label: filterType,
                  }}
                  onChange={handleFilterTypeChange}
                />
              </div>
            </DropDownWrapper>

            {shouldShowSearchButton && (
              <VFButton
                themeUi={user.user.theme_ui}
                onClick={handleSearchApply}
                width={120}
                style={{
                  fontSize: 15,
                  fontWeight: 350,
                  height: 44,
                  marginBottom: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                disabled={!searchQuery || searchQuery.length < 2 || isLoading}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <img
                    src="/assets/img/MTAVFMultiFilter/Search-white.svg"
                    alt="search"
                    style={{ width: 16, height: 16 }}
                  />
                  <span>{isLoading ? "Searching..." : "Search"}</span>
                </div>
              </VFButton>
            )}
          </DropDownRow>
        </FilterColumn>
      </FilterGroup>
    </>
  );
};
