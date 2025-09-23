import React from 'react';
import { FilterGroup, FilterColumn, FilterTitle, InputField, SelectField, TextWrapper, DropDownWrapper } from './style';
import Select from 'react-select'
import { useThemeStyles } from '../../../../../hooks/useVFFilterContent'; 
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
  return (
    <FilterGroup>
      <FilterColumn>
        <FilterTitle>Location</FilterTitle>
        <SelectField 
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
        >
          <option value="">Select Location</option>
          <option value="main-warehouse">Main Warehouse</option>
          <option value="branch-1">Branch 1</option>
          <option value="branch-2">Branch 2</option>
        </SelectField>
      </FilterColumn>
      
      <FilterColumn>
        <FilterTitle>Location Type</FilterTitle>
        <SelectField 
          value={filters.locationTypeLocation}
          onChange={(e) => onFilterChange('locationTypeLocation', e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="retail">Retail</option>
          <option value="wholesale">Wholesale</option>
          <option value="online">Online</option>
        </SelectField>
      </FilterColumn>
    </FilterGroup>
  );
};

// Product Filter Component
export const ProductFilters: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  return (
    <FilterGroup>
      <FilterColumn>
        <FilterTitle>Product</FilterTitle>
        <SelectField 
          value={filters.product}
          onChange={(e) => onFilterChange('product', e.target.value)}
        >
          <option value="">Select Product</option>
          <option value="product-a">Product A</option>
          <option value="product-b">Product B</option>
          <option value="product-c">Product C</option>
        </SelectField>
      </FilterColumn>
      
      <FilterColumn>
        <FilterTitle>Product Category</FilterTitle>
        <SelectField 
          value={filters.productCategory}
          onChange={(e) => onFilterChange('productCategory', e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="food">Food</option>
        </SelectField>
      </FilterColumn>
    </FilterGroup>
  );
};

// Availability Filter Component
export const AvailabilityFilters: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  return (
    <FilterGroup>
      <FilterColumn>
        <FilterTitle>Availability</FilterTitle>
        <SelectField 
          value={filters.availability}
          onChange={(e) => onFilterChange('availability', e.target.value)}
        >
          <option value="">Select Availability</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="pre-order">Pre-order</option>
        </SelectField>
      </FilterColumn>

       <FilterColumn>
        <FilterTitle>Availability</FilterTitle>
        <SelectField 
          value={filters.availability}
          onChange={(e) => onFilterChange('availability', e.target.value)}
        >
          <option value="">Select Availability</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="pre-order">Pre-order</option>
        </SelectField>
      </FilterColumn>

    </FilterGroup>
  );
};

// Attributes Filter Component
export const AttributesFilters: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  return (
    <FilterGroup>
      <FilterColumn>
        <FilterTitle>SKU</FilterTitle>
        <InputField 
          type="text"
          placeholder="Enter SKU..."
          value={filters.sku}
          onChange={(e) => onFilterChange('sku', e.target.value)}
        />
      </FilterColumn>
      
      <FilterColumn>
        <FilterTitle>Location Code</FilterTitle>
        <InputField 
          type="text"
          placeholder="Enter location code..."
          value={filters.loc}
          onChange={(e) => onFilterChange('loc', e.target.value)}
        />
      </FilterColumn>
    </FilterGroup>
  );
};