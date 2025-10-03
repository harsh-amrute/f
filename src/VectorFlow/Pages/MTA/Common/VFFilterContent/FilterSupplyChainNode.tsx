import React, { useState, useEffect } from "react";
import {
  FilterGroup,
  FilterColumn,
  TextWrapper,
  DropDownWrapper,
} from "./style";
import Select, { components } from "react-select";
import { useColorThemeStyles } from "../../../../../hooks/useVFFilterContent";
import useGetLocation from "../../../../../hooks/useGetLocation";
import { useUserData } from "../../../../../context";
import { useGetAllLocations } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
import { BPRFilter, BPRFilterState } from "../../../../../VectorFlow/types/BPR";

interface FilterSectionProps {
  filters: any;
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
}

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
  const { locations } = useGetLocation();
  const colorStyles = useColorThemeStyles();

  const [selectedOptions, setSelectedOptions] = useState<{
    ForLocation: string[];
    ForChildren: string[];
    ForChildrenLocationCode: string[];
  }>({
    ForLocation: [],
    ForChildren: [],
    ForChildrenLocationCode: [],
  });

  const { data: locationData, isLoading: isLocationDataLoading } =
    useGetAllLocations();

  const locationCheckboxOptions =
    locationData?.data?.data?.map((location: any) => ({
      label: `${location.wc} (${location.wd})`,
      id: location.wc,
      value: location.wc,
    })) || [];

  const locationOptionsWithValue = locations.map((location: any) => ({
    label: location.label,
    id: location.id,
    value: location.id || location.label,
  }));

  const handleSelectChange = (newValue: any, header: string) => {
    const filterId =
      header === "ForLocation"
        ? "SCF1"
        : header === "ForChildren"
        ? "SCF2"
        : header === "ForChildrenLocationCode"
        ? "SCF3"
        : "";

    const parentId = "supplyChainFilter";

    const selectedValues = newValue
      ? newValue.map((item: any) => item.value)
      : [];

    setSelectedOptions((prev) => ({
      ...prev,
      [header]: selectedValues,
    }));

    const existingFilters = multiFilter[parentId].filters.filter(
      (f: BPRFilter) => f.name !== filterId
    );

    const newFilters = selectedValues.map((value: string) => ({
      attributeName: header,
      value: value,
      operator: "=",
      label: header,
      name: filterId,
    }));

    const updatedMultiFilter = {
      ...multiFilter,
      [parentId]: {
        ...multiFilter[parentId],
        filters: [...existingFilters, ...newFilters],
      },
    };

    onMultiFilterChange(updatedMultiFilter);
  };

  useEffect(() => {
    if (multiFilter?.supplyChainFilter) {
      const forLocationFilters = multiFilter.supplyChainFilter.filters.filter(
        (f: BPRFilter) => f.name === "SCF1"
      );
      const forChildrenFilters = multiFilter.supplyChainFilter.filters.filter(
        (f: BPRFilter) => f.name === "SCF2"
      );

      const forChildrenLocationCode =
        multiFilter.supplyChainFilter.filters.filter(
          (f: BPRFilter) => f.name === "SCF3"
        );

      setSelectedOptions((prev) => ({
        ...prev,
        ForLocation: forLocationFilters.map((f: BPRFilter) => f.value),
        ForChildren: forChildrenFilters.map((f: BPRFilter) => f.value),
        ForChildrenLocationCode: forChildrenLocationCode.map(
          (f: BPRFilter) => f.value
        ),
      }));
    }
  }, [multiFilter]);

  return (
    <>
      <FilterGroup>
        <FilterColumn>
          <TextWrapper>For Location</TextWrapper>
          <DropDownWrapper style={{ gap: "20px" }}>
            <Select
              options={locationOptionsWithValue}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option: CustomOption,
                IndicatorSeparator: () => null,
                ClearIndicator: () => null,
              }}
              styles={{
                ...colorStyles,
                menuList: (base) => ({
                  ...base,
                  maxHeight: 500,
                  overflowY: "auto",
                  scrollbarWidth: "none",
                }),
              }}
              placeholder="Location Type"
              value={selectedOptions.ForLocation.map((option) => ({
                label: option,
                value: option,
              }))}
              onChange={(newValue) =>
                handleSelectChange(newValue, "ForLocation")
              }
            />
          </DropDownWrapper>
        </FilterColumn>

        <FilterColumn>
          <TextWrapper>For Children</TextWrapper>
          <DropDownWrapper style={{ gap: "20px" }}>
            <Select
              options={locationOptionsWithValue}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option: CustomOption,
                IndicatorSeparator: () => null,
                ClearIndicator: () => null,
              }}
              styles={{
                ...colorStyles,
                menuList: (base) => ({
                  ...base,
                  maxHeight: 500,
                  overflowY: "auto",
                  scrollbarWidth: "none",
                }),
              }}
              placeholder="Location Type"
              value={selectedOptions.ForChildren.map((option) => ({
                label: option,
                value: option,
              }))}
              onChange={(newValue) =>
                handleSelectChange(newValue, "ForChildren")
              }
            />
          </DropDownWrapper>
        </FilterColumn>
      </FilterGroup>

      <FilterGroup style={{ paddingTop: "10px" }}>
        <FilterColumn style={{ maxWidth: "100%", flex: 1, width: "100%" }}>
          <TextWrapper>Select Location</TextWrapper>
          <DropDownWrapper style={{ gap: "20px" }}>
            <Select
              options={locationCheckboxOptions}
              isMulti
              isSearchable={true}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option: CustomOption,
                IndicatorSeparator: () => null,
                ClearIndicator: () => null,
                DropdownIndicator: () => (
                  <img
                    src={"/assets/img/VectorFLOW/NMS/search.svg"}
                    style={{
                      marginRight: "8px",
                      width: "14px",
                      height: "14px",
                    }}
                    alt="search"
                  />
                ),
              }}
              styles={{
                ...colorStyles,
                menuList: (base) => ({
                  ...base,
                  maxHeight: 400,
                  overflowY: "auto",
                  scrollbarWidth: "none",
                }),
              }}
              placeholder="Search By name"
              value={selectedOptions.ForChildrenLocationCode.map((option) => ({
                label: option,
                value: option,
              }))}
              onChange={(newValue) =>
                handleSelectChange(newValue, "ForChildrenLocationCode")
              }
            />
          </DropDownWrapper>
        </FilterColumn>
      </FilterGroup>
    </>
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