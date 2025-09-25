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

// Availability Filter Component
export const AvailabilityFilters: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  const styles = useThemeStyles();
  return (
    <>
      <FilterGroup>
        <FilterColumn style={{minWidth:'400px', maxWidth: 'none'}}>
          <TextWrapper>Select Operation</TextWrapper>
          <DropDownRow>
            <DropDownWrapper>
              <Select 
                placeholder={"VirtualNorm"} 
                styles={styles} 
                components={{ 
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null
                }}
                isDisabled={true}
                value={{ label: "Virtual Norm", value: "Virtual Norm" }}
                options={[]}
              />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select placeholder={"Select an Operation"} styles={styles} components={{ IndicatorSeparator: () => null }} />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select 
                placeholder="Enter a value" 
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
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"}/>
            </IconWrapper>
          </DropDownRow>
          <DropDownRow>
            <DropDownWrapper>
              <Select 
                placeholder={"Norm"} 
                styles={styles} 
                components={{ 
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null
                }}
                isDisabled={true}
                value={{ label: "Norm", value: "Norm" }}
                options={[]}
              />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select placeholder={"Select an Operation"} styles={styles} components={{ IndicatorSeparator: () => null }} />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select 
                placeholder="Enter a value" 
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
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"}/>
            </IconWrapper>
          </DropDownRow>
          <DropDownRow>
            <DropDownWrapper>
              <Select 
                placeholder={"Stock"} 
                styles={styles} 
                components={{ 
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null
                }}
                isDisabled={true}
                value={{ label: "Stock", value: "Stock" }}
                options={[]}
              />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select placeholder={"Select an Operation"} styles={styles} components={{ IndicatorSeparator: () => null }} />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select 
                placeholder="Enter a value" 
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
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"}/>
            </IconWrapper>
          </DropDownRow>
          <DropDownRow>
            <DropDownWrapper>
              <Select 
                placeholder={"GIT"} 
                styles={styles} 
                components={{ 
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null
                }}
                isDisabled={true}
                value={{ label: "GIT", value: "GIT" }}
                options={[]}
              />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select placeholder={"Select an Operation"} styles={styles} components={{ IndicatorSeparator: () => null }} />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select 
                placeholder="Enter a value" 
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
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"}/>
            </IconWrapper>
          </DropDownRow>
        </FilterColumn>
      </FilterGroup>
    </>
  );
};
