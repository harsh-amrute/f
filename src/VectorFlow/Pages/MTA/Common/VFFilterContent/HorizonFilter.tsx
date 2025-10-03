import React from "react";
import {
  FilterGroup,
  FilterColumn,
  TextWrapper,
  DropDownWrapper,
} from "./style";
import Select from "react-select";
import { useColorThemeStyles } from "../../../../../hooks/useVFFilterContent";
import useGetLocation from "../../../../../hooks/useGetLocation";
import { BPRFilterState } from "../../../../../VectorFlow/types/BPR";

interface FilterSectionProps {
  filters: any;
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
}

export const HorizonFilter: React.FC<FilterSectionProps> = () => {
  const { locations } = useGetLocation();
  const colorStyles = useColorThemeStyles();

  return (
    <>
      <FilterGroup>
        <FilterColumn>
          <TextWrapper>From Date</TextWrapper>
          <DropDownWrapper style={{ gap: "20px" }}>
            <Select
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                IndicatorSeparator: () => null,
                ClearIndicator: () => null,
                DropdownIndicator: () => (
                  <img
                    src={"/assets/img/MTAVFMultiFilter/calendar.svg"}
                    style={{
                      marginRight: "8px",
                      width: "20px",
                      height: "20px",
                    }}
                    alt="search"
                  />
                ),
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
              placeholder="dd/mm/yyyy"
            />
          </DropDownWrapper>
        </FilterColumn>

        <FilterColumn>
          <TextWrapper>To Date</TextWrapper>
          <DropDownWrapper style={{ gap: "20px" }}>
            <Select
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                IndicatorSeparator: () => null,
                ClearIndicator: () => null,
                DropdownIndicator: () => (
                  <img
                    src={"/assets/img/MTAVFMultiFilter/calendar.svg"}
                    style={{
                      marginRight: "8px",
                      width: "20px",
                      height: "20px",
                    }}
                    alt="search"
                  />
                ),
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
              placeholder="dd/mm/yyyy"
            />
          </DropDownWrapper>
        </FilterColumn>
      </FilterGroup>
    </>
  );
};

