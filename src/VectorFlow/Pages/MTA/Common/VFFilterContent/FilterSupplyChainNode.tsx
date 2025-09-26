import React, { useState } from "react";
import {
  FilterGroup,
  FilterColumn,
  FilterTitle,
  InputField,
  SelectField,
  TextWrapper,
  DropDownWrapper,
  DropDownRow,
  IconWrapper,
  MultiSelectCheckBoxComponent,
} from "./style";
import Select, { components } from "react-select";
import { useThemeStyles } from "../../../../../hooks/useVFFilterContent";
import { useFilterRows } from "./useVFFilterContent";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import useGetLocation from "../../../../../hooks/useGetLocation";
import { useUserData } from "../../../../../context";

interface FilterSectionProps {
  filters: any;
  onFilterChange: (field: string, value: string) => void;
  supplyChainForLocationCheckBoxList: Array<any>;
}

interface FilterMultiSelectCheckboxProps {
  filterOptions: Array<{ label: string; id: string }>;
  filterState: Array<any>;
  header?: string;
  onChange: any;
  filterId?: any;
}

// Supply Chain Node Filter Component
export const SupplyChainNodeFilters: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
}) => {
  const { locations } = useGetLocation();
  const styles = useThemeStyles();  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const FilterMultiSelectCheckbox = ({
    filterOptions,
    header,
    onChange,
    filterState,
  }: FilterMultiSelectCheckboxProps) => {
    const colorMap: string[] = ["#9A0101", "#EBBF2B", "#418D18"];
    const { user } = useUserData();

    const themeUi = user.user.theme_ui;
    return (
      <>
        {filterOptions.map(
          (option: { label: string; id: string }, index: number) => {
            const color = colorMap[index];
            return (
              <>
                <MultiSelectCheckBoxComponent key={option.id} theme={themeUi}>
                  <input
                    type="checkbox"
                    name={option.label}
                    style={{
                      width: "15px",
                      height: "20px",
                      marginLeft: 15,
                      marginRight: 4,
                      borderRadius: "2px",
                    }}
                    onChange={(e: any) => onChange(e, "value")}
                    checked={
                      !!filterState.find(
                        (filter) =>
                          option.label === filter.value &&
                          header === filter.attributeName
                      )
                    }
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
              </>
            );
          }
        )}
      </>
    );
  };

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
                      filterOptions={locations}
                      filterState={filters?.supplyChainFilter?.filters || []}
                      onChange={(e: any, key: string) =>
                        onFilterChange("1", key)
                      }
                    />
                  </components.MenuList>
                ),
              }}
              options={[]}
              isMulti
              menuIsOpen={openDropdown === "ForLocation"}
              onMenuOpen={() => setOpenDropdown("ForLocation")}
              onMenuClose={() => setOpenDropdown(null)}
              value={null}
              onChange={() => {
                console.log("demo");
              }}
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
                      filterOptions={locations}
                      filterState={filters?.supplyChainFilter?.filters || []}
                      onChange={(e: any, key: string) =>
                        onFilterChange("1", key)
                      }
                    />
                  </components.MenuList>
                ),
              }}
              options={[]}
              isMulti
              menuIsOpen={openDropdown === "ForChildren"}
              onMenuOpen={() => setOpenDropdown("ForChildren")}
              onMenuClose={() => setOpenDropdown(null)}
              value={null}
              onChange={() => {
                console.log("demo");
              }}
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
              styles={
               { ...styles,
                menuList: (base) => ({
                  ...base,
                  maxHeight: 400,
                  overflowY: "auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "8px",
                  padding: "8px",
                }),}
              }
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
                      header={"ForChildren"}
                      filterOptions={locations}
                      filterState={filters?.supplyChainFilter?.filters || []}
                      onChange={(e: any, key: string) =>
                        onFilterChange("1", key)
                      }
                    />
                  </components.MenuList>
                ),
              }}
              options={[]}
              isMulti
              menuIsOpen={openDropdown === "SearchByName"}
              onMenuOpen={() => setOpenDropdown("SearchByName")}
              onMenuClose={() => setOpenDropdown(null)}
              value={null}
              onChange={() => {
                console.log("demo");
              }}
            />
          </DropDownWrapper>
        </FilterColumn>
      </FilterGroup>
    </>
  );
};
