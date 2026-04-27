import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  filterGroup,
  filterColumn,
  textWrapper,
  dropDownWrapper,
  dropDownRow,
} from "./style.css";
import Select, {
  components,
  CSSObjectWithLabel,
  MultiValue,
  ActionMeta,
} from "react-select";
import {
  useColorThemeStyles,
  useThemeStyles,
} from "../../../../../hooks/useVFFilterContent";
import { useUserData } from "../../../../../context";
import { useGetAllLocations } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
import { BPRFilter, BPRFilterState } from "../../../../../VectorFlow/types/BPR";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import useGetLocation from "../../../../../hooks/useGetLocation";

interface FilterSectionProps {
  filters: any;
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
}

interface LocationOption {
  label: string;
  value: string;
  id: string;
  originalData?: any;
}

type FilterType = "Location Code" | "Location Description" | "Location Type";

const getFilterId = (type: FilterType): "SCF1" | "SCF2" =>
  type === "Location Type" ? "SCF1" : "SCF2";

const getAttributeName = (type: FilterType): string =>
  type === "Location Type" ? "forlocation" : "forchildrenlocationcode";

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

export const SupplyChainNodeFilters: React.FC<FilterSectionProps> = ({
  multiFilter,
  onMultiFilterChange,
}) => {
  const { user } = useUserData();
  const colorStyles = useColorThemeStyles({
    minWidth: "720px",
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
  const styles = useThemeStyles();

  const parentId = "supplyChainFilter" as const;

  const [filterType, setFilterType] = useState<FilterType>("Location Code");
  const [selectedLocations, setSelectedLocations] = useState<LocationOption[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const isUpdatingFromInternal = useRef(false);

  const { data: locationData, isLoading: isLocationDataLoading } =
    useGetAllLocations();
  const { locations } = useGetLocation();

  const customFilterOption = (option: any, inputValue: string) => {
    if (!inputValue) return false;
    const searchTerm = inputValue.toLowerCase();
    return (
      option.label.toLowerCase().includes(searchTerm) ||
      option.value.toLowerCase().includes(searchTerm)
    );
  };

  const locationOptions = useMemo((): LocationOption[] => {
    if (filterType === "Location Type") {
      return locations.map((lt: any) => ({
        label: lt.label,
        value: lt.id,
        id: lt.id,
        originalData: lt,
      }));
    }

    if (!locationData?.data?.data) return [];
    return locationData.data.data.map((location: any) => ({
      label: filterType === "Location Description" ? location.wd : location.wc,
      value: location.wc,
      id: location.wc,
      originalData: location,
    }));
  }, [locationData, locations, filterType]);

  const filteredOptions = searchQuery
    ? locationOptions.filter((opt) => customFilterOption(opt, searchQuery))
    : [];

  useEffect(() => {
    if (isUpdatingFromInternal.current) {
      isUpdatingFromInternal.current = false;
      return;
    }

    const savedFilters = (multiFilter?.[parentId]?.filters ||
      []) as BPRFilter[];
    const scf1Filters = savedFilters.filter((f) => f.name === "SCF1");
    const scf2Filters = savedFilters.filter((f) => f.name === "SCF2");

    if (scf1Filters.length > 0) {
      setFilterType("Location Type");
      setSelectedLocations(
        scf1Filters.map((f: BPRFilter) => {
          return {
            value: f.value,
             label: f.value, 
            id: f.value,
          };
        })
      );
    } else if (scf2Filters.length > 0) {
      setFilterType("Location Code");
      setSelectedLocations(
        scf2Filters.map((f: BPRFilter) => {
          return {
            value: f.value,
            label: f.value, 
            id: f.value,
          };
        })
      );
    } else {
      setFilterType("Location Code");
      setSelectedLocations([]);
    }
  }, [multiFilter?.[parentId]?.filters]);

  const handleLocationSelectChange = (
    newValue: MultiValue<any>,
    _: ActionMeta<any>
  ) => {
    const selected = Array.isArray(newValue) ? [...newValue] : [];
    setSelectedLocations(selected);
    setSearchQuery("");

    const currentFilterId = getFilterId(filterType);
    const currentAttributeName = getAttributeName(filterType);

    const existingFilters = (multiFilter[parentId]?.filters ||
      []) as BPRFilter[];
    const otherFilters = existingFilters.filter(
      (f) => f.name !== currentFilterId
    );

    const newFilters: BPRFilter[] = selected.map((loc) => ({
      attributeName: currentAttributeName,
      value: loc.value,
      operator: "=",
      label: filterType,
      name: currentFilterId,
    }));

    isUpdatingFromInternal.current = true;
    onMultiFilterChange({
      ...multiFilter,
      [parentId]: {
        ...multiFilter[parentId],
        filters: [...otherFilters, ...newFilters],
      },
    });
  };

  const handleFilterTypeChange = (selected: any) => {
    const newType = selected.value as FilterType;
    const prevFilterId = getFilterId(filterType);
    const newFilterId = getFilterId(newType);

    setFilterType(newType);
    setSelectedLocations([]);
    setSearchQuery("");

    const existingFilters = (multiFilter[parentId]?.filters ||
      []) as BPRFilter[];
    const otherFilters = existingFilters.filter(
      (f) => f.name !== prevFilterId && f.name !== newFilterId
    );

    isUpdatingFromInternal.current = true;
    onMultiFilterChange({
      ...multiFilter,
      [parentId]: { ...multiFilter[parentId], filters: otherFilters },
    });
  };

  const handleInputChange = (inputValue: string, { action }: any) => {
    if (action === "input-change") {
      setSearchQuery(inputValue);
    }
  };

  if (isLocationDataLoading) {
    return <VFLoader />;
  }

  return (
    <div className={filterGroup}>
      <div className={filterColumn}>
        <div className={textWrapper}>For Children</div>
        <div className={dropDownRow}>
          <div className={dropDownWrapper} style={{ flex: 1 }}>
            <Select
              placeholder="Search by name"
              options={filteredOptions}
              styles={{
                ...colorStyles,
                menu: (base) =>
                  ({ ...base, minWidth: "620px" } as CSSObjectWithLabel),
                input: (base) =>
                  ({ ...base, color: "#333" } as CSSObjectWithLabel),
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
              onInputChange={handleInputChange}
              inputValue={searchQuery}
              filterOption={customFilterOption}
              noOptionsMessage={({ inputValue }) =>
                inputValue
                  ? "No locations found"
                  : "Start typing to search locations"
              }
            />

            <div style={{ width: 165, marginTop: -44, marginLeft: 4.5 }}>
              <Select
                placeholder="Location Code"
                classNamePrefix="rs"
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
                  { value: "Location Type", label: "Location Type" },
                ]}
                value={{ value: filterType, label: filterType }}
                onChange={handleFilterTypeChange}
                isSearchable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const useColorOptionStyles = () => {
  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;
  const themeColor = theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80";

  return {
    checkbox: {
      width: "16px",
      height: "16px",
      accentColor: themeColor,
      cursor: "pointer",
      flexShrink: 0,
    },
    colorPanel: {
      width: "20px",
      height: "20px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      flexShrink: 0,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      order: 2,
    },
    colorName: {
      fontSize: "14px",
      fontFamily: "Roboto, sans-serif",
      fontWeight: "400",
      color: "#333",
      flex: 1,
      textAlign: "left" as const,
      order: 1,
    },
    optionContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: "100%",
      padding: "4px 0",
    },
  };
};
