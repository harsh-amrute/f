import React, { useEffect, useState } from "react";
import {
  FilterGroup,
  FilterColumn,
  TextWrapper,
  DropDownWrapper,
  DropDownRow,
  IconWrapper,
} from "./style";
import Select, { components } from "react-select";
import {
  useColorOptionStyles,
  useColorThemeStyles,
  useThemeStyles,
} from "../../../../../hooks/useVFFilterContent";
import { useFilterRows, stringOpertors } from "./useVFFilterContent";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../../context";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import { BPRFilter, BPRFilterState } from "../../../../../VectorFlow/types/BPR";
import { useGetAllLocations } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
import { MultiValue, ActionMeta } from "react-select";

interface FilterSectionProps {
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
}

export const LocationFilters: React.FC<FilterSectionProps> = ({
  multiFilter,
  onMultiFilterChange,
}) => {
  const { user } = useUserData();
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
  } = useFilterRows();

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

  const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);

  const LOCATION_PERMISSION_L1 = EnvConfig["LOCATION_PERMISSION_L1"];
  const LOCATION_PERMISSION_L2 = EnvConfig["LOCATION_PERMISSION_L2"];
  const LOCATION_PERMISSION_L3 = EnvConfig["LOCATION_PERMISSION_L3"];

  const filterLocationOptions = [
    { value: "l1", label: LOCATION_PERMISSION_L1, name: "LF1" },
    { value: "l2", label: LOCATION_PERMISSION_L2, name: "LF2" },
    { value: "l3", label: LOCATION_PERMISSION_L3, name: "LF3" },
    { value: "l4", label: "L4", name: "LF4" },
    { value: "l5", label: "L5", name: "LF5" },
  ];

  const [rowSelections, setRowSelections] = useState<{
    [rowId: number]: { column?: any; operation?: any; value?: any };
  }>({});

  const [isInitialized, setIsInitialized] = useState(false);
  const [filterType, setFilterType] = useState<
    "Location Code" | "Location Description"
  >("Location Code");

  const { data: locationData, isLoading: isLocationDataLoading } =
    useGetAllLocations();

  const locationCheckboxOptions = React.useMemo(() => {
    if (!locationData?.data?.data) return [];
    return locationData.data.data.map((location: any) => {
      const label =
        filterType === "Location Code" ? `${location.wc}` : `${location.wd}`;
      return {
        label: label,
        id: location.wc,
        value: location.wc,
        originalData: location,
      };
    });
  }, [locationData, filterType]);

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

  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);

  useEffect(() => {
    const parentId = "locationFilter";
    const savedFilters = multiFilter[parentId]?.filters || [];

    if (savedFilters.length > 0) {
      const restored: {
        [rowId: number]: { column?: any; operation?: any; value?: any };
      } = {};
      savedFilters
        .filter((f) => !f.name.startsWith("LF6"))
        .forEach((f: BPRFilter, idx: number) => {
          const column = filterLocationOptions.find(
            (opt) => opt.value === f.attributeName
          );
          const operation = stringOpertors.find(
            (op) => op.value === f.operator
          );
          restored[idx] = {
            column: column || null,
            operation: operation || null,
            value: f.value,
          };
        });
      setRowSelections(restored);
    }

    const savedLocationFilters = savedFilters.filter((f) => f.name === "LF6");
    const restoredLocations = savedLocationFilters.map((f) => ({
      value: f.value,
      label: f.label === "LocationCode" ? f.value : f.label,
    }));
    setSelectedLocations(restoredLocations);

    setIsInitialized(true);
  }, [multiFilter]);

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

    const parentId = "locationFilter";
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
        name: current.column.name || `${current.column.value}_${rowId}`,
      };

      const existingFilters = multiFilter[parentId]?.filters || [];
      const filteredFilters = existingFilters.filter(
        (f: BPRFilter) => f.name !== newFilter.name
      );

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

  const handleLocationSelectChange = (
    newValue: MultiValue<any>,
    actionMeta: ActionMeta<any>
  ) => {
    const selected = Array.isArray(newValue) ? [...newValue] : [];
    setSelectedLocations(selected);

    const parentId = "locationFilter";
    const existingFilters = multiFilter[parentId]?.filters || [];

    const filteredFilters = existingFilters.filter(
      (f: BPRFilter) => f.name !== "LF6"
    );

    const newFilters = selected.map((loc) => ({
      attributeName: "Location",
      value: loc.value,
      operator: "=",
      label: "LocationCode",
      name: "LF6",
    }));

    const updatedMultiFilter: BPRFilterState = {
      ...multiFilter,
      [parentId]: {
        ...multiFilter[parentId],
        filters: [...filteredFilters, ...newFilters],
      },
    };

    onMultiFilterChange(updatedMultiFilter);
  };

  const handleApply = () => {
    console.log("Applied Filters: ", multiFilter);
  };

  const handleFilterTypeChange = (selected: any) => {
    setFilterType(selected.value);
  };

  if (!isInitialized) return null;

  return (
    <>
      <FilterGroup>
        <FilterColumn style={{ minWidth: "400px", maxWidth: "none" }}>
          <TextWrapper>Select Operation</TextWrapper>
          {filterRows.map((row) => (
            <DropDownRow key={row.id} style={{ alignItems: "center" }}>
              <DropDownWrapper>
                <Select
                  options={filterLocationOptions}
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
                  onClick={() => handleRemoveRow(row.id)}
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

      <FilterGroup style={{ paddingTop: "10px" }}>
        <FilterColumn>
          <TextWrapper>Select Location</TextWrapper>
          <DropDownRow>
            <DropDownWrapper style={{ flex: 1 }}>
              <Select
                placeholder="Enter value"
                options={locationCheckboxOptions}
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
                value={selectedLocations}
                onChange={handleLocationSelectChange}
              />

              <div style={{ width: 165, marginTop: -44, marginLeft: 4.5 }}>
                <Select
                  placeholder="Location Code"
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
                    { value: "Location Code", label: "Location Code" },
                    {
                      value: "Location Description",
                      label: "Location Description",
                    },
                  ]}
                  value={{
                    value: filterType,
                    label: filterType,
                  }}
                  onChange={handleFilterTypeChange}
                />
              </div>
            </DropDownWrapper>

            <VFButton
              themeUi={user.user.theme_ui}
              onClick={handleApply}
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
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <img
                  src={"/assets/img/MTAVFMultiFilter/Search-white.svg"}
                  alt="search"
                  style={{ width: 16, height: 16 }}
                />
                <span>Search</span>
              </div>
            </VFButton>
          </DropDownRow>
        </FilterColumn>
      </FilterGroup>
    </>
  );
};
