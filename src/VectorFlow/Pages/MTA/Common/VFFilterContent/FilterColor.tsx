import React from "react";
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
import { useFilterRows } from "./useVFFilterContent";
import { stringOpertors } from "./useVFFilterContent";
import { useUserData } from "../../../../../context";

interface FilterSectionProps {
  filters: any;
  onFilterChange: (field: string, value: string) => void;
}

export const ColorFilters: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
}) => {
  const { user } = useUserData();
  const styles = useThemeStyles();
  const { filterRows, addFilterRow, removeFilterRow, isMaxRows, isMinRows } =
    useFilterRows();

  const colorTypeFilterOptions = [
    { value: "colorcount", label: "Color Count" },
    { value: "colorage", label: "Color Age" },
  ];
  return (
    <>
      <FilterGroup>
        <FilterColumn style={{ minWidth: "400px", maxWidth: "none" }}>
          <TextWrapper>Color Filter</TextWrapper>
          {filterRows.map((row) => (
            <DropDownRow style={{ alignItems: "center" }}>
              <DropDownWrapper>
                <Select
                  placeholder={"Select Type"}
                  styles={styles}
                  components={{ IndicatorSeparator: () => null }}
                  options={colorTypeFilterOptions}
                />
              </DropDownWrapper>
              <DropDownWrapper>
                <Select
                  placeholder={"Select Color"}
                  styles={styles}
                  components={{ IndicatorSeparator: () => null }}
                />
              </DropDownWrapper>
              <DropDownWrapper>
                <Select
                  options={stringOpertors}
                  placeholder={"Select OP"}
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "2px",
                }}
              >
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
    </>
  );
};
