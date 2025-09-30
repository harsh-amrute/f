import React, { useState, useEffect } from "react";
import {
  FilterGroup,
  FilterColumn,
  TextWrapper,
  DropDownWrapper,
  MultiSelectCheckBoxComponent,
} from "./style";
import Select, { components } from "react-select";
import { useThemeStyles } from "../../../../../hooks/useVFFilterContent";
import useGetLocation from "../../../../../hooks/useGetLocation";
import { useUserData } from "../../../../../context";
import { useGetAllLocations } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
import { BPRFilter, BPRFilterState } from "../../../../../VectorFlow/types/BPR";

interface FilterSectionProps {
  filters: any;
  supplyChainForLocationCheckBoxList?: Array<any>;
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
}

interface FilterMultiSelectCheckboxProps {
  filterOptions: Array<{ label: string; id: string; value: string }>;
  filterState: Array<any>;
  header?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    option: any,
    header: string
  ) => void;
  filterId?: any;
}

export const SupplyChainNodeFilters: React.FC<FilterSectionProps> = ({
  multiFilter,
  onMultiFilterChange,
}) => {
  const { locations } = useGetLocation();
  const styles = useThemeStyles();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

  const FilterMultiSelectCheckbox = ({
    filterOptions,
    header,
    onChange,
  }: FilterMultiSelectCheckboxProps) => {
    const colorMap: string[] = ["#9A0101", "#EBBF2B", "#418D18"];
    const { user } = useUserData();

    const themeUi = user.user.theme_ui;

    const handleCheckboxChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      option: any
    ) => {
      onChange(e, option, header || "");
    };

    const isChecked = (optionLabel: string) => {
      return (
        selectedOptions[header as keyof typeof selectedOptions]?.includes(
          optionLabel
        ) || false
      );
    };

    return (
      <>
        {filterOptions.map(
          (
            option: { label: string; id: string; value: string },
            index: number
          ) => {
            const color = colorMap[index];
            return (
              <MultiSelectCheckBoxComponent key={option.id} theme={themeUi}>
                <input
                  type="checkbox"
                  name={option.value}
                  value={option.value}
                  style={{
                    width: "15px",
                    height: "20px",
                    marginLeft: 15,
                    marginRight: 4,
                    borderRadius: "2px",
                  }}
                  onChange={(e) => handleCheckboxChange(e, option)}
                  checked={isChecked(option.value)}
                />
                {header === "Coverage" ? (
                  <div
                    style={{
                      height: "12px",
                      width: "12px",
                      backgroundColor: color,
                    }}
                  ></div>
                ) : null}
                <label
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    fontSize: "13px",
                    color: "#313131",
                  }}
                >
                  {option.label}
                </label>
              </MultiSelectCheckBoxComponent>
            );
          }
        )}
      </>
    );
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: any,
    header: string
  ) => {
    const { checked, value } = e.target;

    setSelectedOptions((prev) => {
      const currentSelected =
        prev[header as keyof typeof selectedOptions] || [];

      if (checked) {
        return {
          ...prev,
          [header]: [...currentSelected, value],
        };
      } else {
        return {
          ...prev,
          [header]: currentSelected.filter((item) => item !== value),
        };
      }
    });

    const filterId =
      header === "ForLocation"
        ? "SCF1"
        : header === "ForChildren"
        ? "SCF2"
        : header === "ForChildrenLocationCode"
        ? "SCF3"
        : "";

    const parentId = "supplyChainFilter";

    onFilterChange(
      filterId,
      e,
      parentId as keyof BPRFilterState,
      "value",
      header
    );
  };

  const onFilterChange = (
    filterId: string,
    e: any,
    parentId: keyof BPRFilterState,
    property: string,
    header?: string,
    updateLabel?: boolean
  ) => {
    const filterObj: BPRFilter = {
      attributeName: "",
      value: "",
      operator: "",
      label: "",
      name: filterId,
    };

    if (filterId === "SCF1") {
      filterObj.attributeName = "ForLocation";
      filterObj.label = "ForLocation";
      filterObj.operator = "=";
    } else if (filterId === "SCF2") {
      filterObj.attributeName = "ForChildren";
      filterObj.label = "ForChildren";
      filterObj.operator = "=";
    } else if (filterId === "SCF3") {
      filterObj.attributeName = "ForChildrenLocationCode";
      filterObj.label = "ForChildrenLocationCode";
      filterObj.operator = "=";
    }

    let finalValue: any | [];
    let selectedValues: any = [];
    const finalLabel: string = e.label;

    const getTrimmedValue = (finalValue: any) => {
      return finalValue.split(" ")[0];
    };

    if (e.value) {
      finalValue = e.value;
    } else if (e.target && e.target.type === "checkbox") {
      finalValue = e.target.name;

      filterObj.value = finalValue;
      filterObj.name = filterId;

      const newFilterObj = { ...filterObj, value: finalValue };

      selectedValues = [...multiFilter[parentId].filters];

      if (
        !selectedValues.some(
          (obj: any) => obj.value === finalValue && obj.name === filterId
        )
      ) {
        selectedValues.push(newFilterObj);
      } else {
        selectedValues = selectedValues.filter(
          (obj: any) => !(obj.value === finalValue && obj.name === filterId)
        );
      }

      const updatedMultiFilter = {
        ...multiFilter,
        [parentId]: {
          ...multiFilter[parentId],
          filters: [...selectedValues],
        },
      };

      onMultiFilterChange(updatedMultiFilter);
      return;
    } else if (e.target) {
      finalValue = e.target.value;
    } else if (Array.isArray(e)) {
      finalValue = e.map((ele: any) => {
        const newfilterObj = { ...filterObj };
        newfilterObj.value = getTrimmedValue(ele.label);
        return newfilterObj;
      });
    }

    const currFilter: BPRFilter | undefined = multiFilter[
      parentId
    ].filters.find((filter: BPRFilter) => {
      return filter.name === filterId;
    });

    let updatedFilters: BPRFilter[];

    if (currFilter) {
      if (Array.isArray(e)) {
        let tempFilteredArray = multiFilter[parentId].filters.filter(
          (f: BPRFilter) => f.name !== filterId
        );
        tempFilteredArray = [...tempFilteredArray, ...finalValue];
        updatedFilters = tempFilteredArray;
      } else {
        updatedFilters = multiFilter[parentId].filters.map(
          (filter: BPRFilter) => {
            if (filter.name === filterId) {
              const result: any = { ...filter };
              if (finalLabel && updateLabel) {
                result["label"] = finalLabel;
              }
              if (finalValue !== undefined) {
                result[property] = finalValue;
              }
              return result;
            }
            return filter;
          }
        );
      }
    } else {
      if (Array.isArray(e) && e.length === 1) {
        filterObj[property as keyof BPRFilter] = finalValue[0].value;
        updatedFilters = [...multiFilter[parentId].filters, { ...filterObj }];
      } else {
        filterObj[property as keyof BPRFilter] = finalValue;
        if (finalLabel && updateLabel) filterObj["label"] = finalLabel;
        updatedFilters = [...multiFilter[parentId].filters, { ...filterObj }];
      }
    }

    const updatedMultiFilter = {
      ...multiFilter,
      [parentId]: {
        ...multiFilter[parentId],
        filters: updatedFilters,
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
          <DropDownWrapper>
            <Select
              placeholder={"Location Type"}
              styles={{
                ...styles,
                menuList: (base) => ({
                  ...base,
                  maxHeight: 400,
                  overflowY: "auto",
                }),
              }}
              components={{
                IndicatorSeparator: () => null,
                MenuList: (props) => (
                  <components.MenuList {...props}>
                    <FilterMultiSelectCheckbox
                      header={"ForLocation"}
                      filterOptions={locationOptionsWithValue}
                      filterState={multiFilter.supplyChainFilter.filters}
                      onChange={handleCheckboxChange}
                    />
                  </components.MenuList>
                ),
              }}
              isMulti
              isSearchable={false}
              menuIsOpen={openDropdown === "ForLocation"}
              onMenuOpen={() => setOpenDropdown("ForLocation")}
              onMenuClose={() => setOpenDropdown(null)}
              value={selectedOptions.ForLocation.map((option) => ({
                label: option,
                value: option,
              }))}
              options={[]}
            />
          </DropDownWrapper>
        </FilterColumn>

        <FilterColumn>
          <TextWrapper>For Children</TextWrapper>
          <DropDownWrapper>
            <Select
              placeholder={"Location Type"}
              styles={{
                ...styles,
                menuList: (base) => ({
                  ...base,
                  maxHeight: 400,
                  overflowY: "auto",
                }),
              }}
              components={{
                IndicatorSeparator: () => null,
                MenuList: (props) => (
                  <components.MenuList {...props}>
                    <FilterMultiSelectCheckbox
                      header={"ForChildren"}
                      filterOptions={locationOptionsWithValue}
                      filterState={multiFilter.supplyChainFilter.filters}
                      onChange={handleCheckboxChange}
                    />
                  </components.MenuList>
                ),
              }}
              isMulti
              isSearchable={false}
              menuIsOpen={openDropdown === "ForChildren"}
              onMenuOpen={() => setOpenDropdown("ForChildren")}
              onMenuClose={() => setOpenDropdown(null)}
              value={selectedOptions.ForChildren.map((option) => ({
                label: option,
                value: option,
              }))}
              options={[]}
            />
          </DropDownWrapper>
        </FilterColumn>
      </FilterGroup>

      <FilterGroup style={{ paddingTop: "10px" }}>
        <FilterColumn style={{ maxWidth: "100%", flex: 1, width: "100%" }}>
          <TextWrapper>Select Location</TextWrapper>
          <DropDownWrapper>
            <Select
              placeholder={"Search By name"}
              styles={{
                ...styles,
                menuList: (base) => ({
                  ...base,
                  maxHeight: 400,
                  overflowY: "auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "8px",
                  padding: "8px",
                }),
              }}
              components={{
                IndicatorSeparator: () => null,
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
                MenuList: (props) => (
                  <components.MenuList {...props}>
                    <FilterMultiSelectCheckbox
                      header={"ForChildrenLocationCode"}
                      filterOptions={locationCheckboxOptions}
                      filterState={multiFilter.supplyChainFilter.filters}
                      onChange={handleCheckboxChange}
                    />
                  </components.MenuList>
                ),
              }}
              isMulti={true}
              menuIsOpen={openDropdown === "ForChildrenLocationCode"}
              onMenuOpen={() => setOpenDropdown("ForChildrenLocationCode")}
              onMenuClose={() => setOpenDropdown(null)}
              value={selectedOptions.ForChildrenLocationCode.map((option) => ({
                label: option,
                value: option,
              }))}
              isSearchable={false}
              options={[]}
            />
          </DropDownWrapper>
        </FilterColumn>
      </FilterGroup>
    </>
  );
};
