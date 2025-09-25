import React from 'react';
import { FilterGroup, FilterColumn, FilterTitle, InputField, SelectField, TextWrapper, DropDownWrapper, DropDownRow, IconWrapper } from './style';
import Select, { components } from "react-select";
import { useThemeStyles } from '../../../../../hooks/useVFFilterContent'; 
import { useFilterRows } from './useVFFilterContent';
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';
interface FilterSectionProps {
  filters: any;
  onFilterChange: (field: string, value: string) => void;
}

// Supply Chain Node Filter Component
export const SupplyChainNodeFilters: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  const styles = useThemeStyles();
  return (
    <>
      <FilterGroup>
        <FilterColumn>
          <TextWrapper>For Location</TextWrapper>
          <DropDownWrapper >
            <Select placeholder={"Location Type"} styles={styles} components={{ IndicatorSeparator: () => null }}></Select>
          </DropDownWrapper>
        </FilterColumn>
        
        <FilterColumn>
          <TextWrapper>For Children</TextWrapper>
          <DropDownWrapper >
            <Select placeholder={"Location Type"} styles={styles} components={{ IndicatorSeparator: () => null }}></Select>
          </DropDownWrapper>
        </FilterColumn>
      </FilterGroup>

      <FilterGroup style={{paddingTop:'10px'}}>
        <FilterColumn style={{ maxWidth: "100%", flex: 1, width: "100%" }}>
          <TextWrapper>Select Location</TextWrapper>
          <DropDownWrapper >
            <Select 
              placeholder={"Search By name"} 
              styles={styles} 
              components={{ 
                IndicatorSeparator: () => null,
                DropdownIndicator: () => (
                  <img 
                    src={"/assets/img/VectorFLOW/NMS/search.svg"} 
                    style={{
                      marginRight:'8px',
                      width: '14px',
                      height: '14px'
                    }} 
                    alt="search" 
                  />
                )
              }} 
            />
          </DropDownWrapper>
        </FilterColumn>
      </FilterGroup>
    </>
  );
};
