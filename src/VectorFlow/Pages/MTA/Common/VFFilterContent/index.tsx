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

// Product Filter Component
export const ProductFilters: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
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
              disabled={filterRows.length >= 5} 
              onClick={filterRows.length >= 5 ? undefined : addFilterRow}
            >
              <img src={"/assets/img/MTAVFMultiFilter/plus-sign-circle.svg"}/>
            </IconWrapper>
            <IconWrapper 
              disabled={filterRows.length <= 1}
              onClick={() => removeFilterRow(row.id)}
            >
              <img src={"/assets/img/MTAVFMultiFilter/minus-sign-circle.svg"}/>
            </IconWrapper>
          </DropDownRow>
          ))}
        </FilterColumn>
      </FilterGroup>
    </>
  );
};

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

// Attributes Filter Component
export const AttributesFilters: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  const styles = useThemeStyles();
  const { filterRows, addFilterRow, removeFilterRow, isMaxRows, isMinRows } = useFilterRows();
  return (
    <>
      <FilterGroup>
        <FilterColumn style={{minWidth:'400px', maxWidth: 'none'}}>
          <TextWrapper>Select Atrributes - SKU Location</TextWrapper>
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
    </>
  );
};