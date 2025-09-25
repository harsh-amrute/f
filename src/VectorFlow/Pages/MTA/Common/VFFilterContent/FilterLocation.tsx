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

// Location Filter Component
export const LocationFilters: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  const styles = useThemeStyles();
  const { filterRows, addFilterRow, removeFilterRow, isMaxRows, isMinRows } = useFilterRows();
  return (
    <>
      <FilterGroup>
        <FilterColumn style={{minWidth:'400px', maxWidth: 'none'}}>
          <TextWrapper>Select Operation</TextWrapper>
          {filterRows.map((row) => (
            <DropDownRow style={{alignItems:'center'}}>
            <DropDownWrapper>
              <Select placeholder={"Select Column"} styles={styles} components={{ IndicatorSeparator: () => null }} />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select placeholder={"Select Operation"} styles={styles} components={{ IndicatorSeparator: () => null }} />
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
                inputValue={filters.someValue || ''} 
                onInputChange={(inputValue) => onFilterChange('someValue', inputValue)}
                menuIsOpen={false} 
                options={[]} 
              />
            </DropDownWrapper>
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/Error.svg"}/>
            </IconWrapper>
            <IconWrapper 
              disabled={isMaxRows} 
              onClick={!isMaxRows ? addFilterRow : undefined}
            >
              <img src={"/assets/img/MTAVFMultiFilter/plus-sign-circle.svg"}/>
            </IconWrapper>
            <IconWrapper 
              disabled={isMinRows}
              onClick={() => !isMinRows && removeFilterRow(row.id)}
            >
              <img src={"/assets/img/MTAVFMultiFilter/minus-sign-circle.svg"}/>
            </IconWrapper>
          </DropDownRow>
          ))}
        </FilterColumn>
      </FilterGroup>

      <FilterGroup style={{paddingTop:'10px'}}>
        <FilterColumn>
          <TextWrapper>Select Location</TextWrapper>
          <DropDownRow>
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
                inputValue={filters.someValue || ''} 
                onInputChange={(inputValue) => onFilterChange('someValue', inputValue)}
                menuIsOpen={false} 
                options={[]} 
              />
            </DropDownWrapper>
          </DropDownRow>
        </FilterColumn>
        
      </FilterGroup>
    </>
  );
};
