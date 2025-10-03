import React from "react";
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
} from "./style";
import Select, { components } from "react-select";
import { useThemeStyles } from "../../../../../hooks/useVFFilterContent";
import { useFilterRows } from "./useVFFilterContent";
import { stringOpertors } from './useVFFilterContent';
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../../context";

interface FilterSectionProps {
  filters: any;
  onFilterChange: (field: string, value: string) => void;
}

const handleApply = () => {
  console.log("Search Button.................");
};

// Location Filter Component
export const LocationFilters: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
}) => {
  const { user } = useUserData();
  const styles = useThemeStyles();
  const { filterRows, addFilterRow, removeFilterRow, isMaxRows, isMinRows } =
    useFilterRows();
  return (
    <>
      <FilterGroup>
        <FilterColumn style={{ minWidth: "400px", maxWidth: "none" }}>
          <TextWrapper>Select Operation</TextWrapper>
          {filterRows.map((row) => (
            <DropDownRow style={{ alignItems: "center" }}>
              <DropDownWrapper>
                <Select
                  placeholder={"Select Column"}
                  styles={styles}
                  components={{ IndicatorSeparator: () => null }}
                />
              </DropDownWrapper>
              <DropDownWrapper>
                <Select
                  
                options={stringOpertors}
                placeholder={"Select Operation"}
                  
                styles={styles}
                  
                components={{ IndicatorSeparator: () => null }}
                
              />
              </DropDownWrapper>
              <DropDownWrapper>
                <Select
                  placeholder="Enter value"
                  styles={styles}
                  components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                    Menu: () => null,
                  }}
                  isSearchable={true}
                  inputValue={filters.someValue || ""}
                  onInputChange={(inputValue) =>
                    onFilterChange("someValue", inputValue)
                  }
                  menuIsOpen={false}
                  options={[]}
                />
              </DropDownWrapper>
            <div style={{display:'flex', alignItems:'center', marginBottom:'2px'}}>
                <IconWrapper theme_ui={user.user.theme_ui}>
                  <img src={"/assets/img/MTAVFMultiFilter/Error.svg"} />
                </IconWrapper>
                <IconWrapper
                  theme_ui={user.user.theme_ui}
                  disabled={isMaxRows}
                  onClick={!isMaxRows ? addFilterRow : undefined}
                >
                  <img
                  src={"/assets/img/MTAVFMultiFilter/plus-sign-circle.svg"}
                />
                </IconWrapper>
                <IconWrapper
                  theme_ui={user.user.theme_ui}
                  disabled={isMinRows}
                  onClick={() => !isMinRows && removeFilterRow(row.id)}
                >
                  <img
                  src={"/assets/img/MTAVFMultiFilter/minus-sign-circle.svg"}
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
                styles={{
                  ...styles,
                  control: (base: any, state: any) => ({
                      ...base,
                      minHeight: "48px",
                      border: state.isFocused
                        ? user.user.theme_ui === "REGALBLAZE" ? "2px solid #FCA311" : "2px solid #BC3D80"
                        : "1px solid #c7c0c0ff",
                      borderRadius: "10px",
                      boxShadow: "none",
                      outline: "none",
                      "&:hover": {
                        border: state.isFocused
                          ? user.user.theme_ui === "REGALBLAZE" ? "2px solid #FCA311" : "2px solid #BC3D80"
                          : "1px solid #c7c0c0ff",
                      },
                  }),
                  valueContainer: (base: any) => ({
                    ...base,
                    paddingLeft: "175px", 
                  }),
                  placeholder: (base: any) => ({
                    ...base,
                    fontSize: "14px",
                    marginLeft: "1px",
                  }),
              }}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  // Menu: () => null,
                }}
                // isSearchable={true}
                isClearable
                inputValue={filters.someValue || ""}
                onInputChange={(inputValue) =>
                  onFilterChange("someValue", inputValue)
                }
                // menuIsOpen={false}
                options={[{ value: 'apple', label: 'Apple' }, {value: 'b', label: 'B'}]}
              />
              
              <div style={{ width: 165, marginTop: -44, marginLeft: 4.5}}>
                <Select
                  placeholder="Location Code"
                  styles={{
                  ...styles,
                  control: (base: any, state: any) => ({
                      ...base,
                      minHeight: "39px",
                      border: state.isFocused
                        ? user.user.theme_ui === "REGALBLAZE" ? "2px solid #FCA311" :"2px solid #BC3D80"
                        : "1px solid #c7c0c0ff",
                      borderRadius: "7px",
                      boxShadow: "none",
                      outline: "none",
                      "&:hover": {
                        border: state.isFocused
                          ? user.user.theme_ui === "REGALBLAZE" ? "2px solid #FCA311" : "2px solid #BC3D80"
                          : "1px solid #c7c0c0ff",
                      },
                }),
              }}
                  components={{ IndicatorSeparator: () => null }}
                  options={[
                    { value: "Location Code", label: "Location Code" },
                    { value: "Location Description", label: "Location Description" },
                  ]}
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
