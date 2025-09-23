import React from 'react';
import { FilterGroup, FilterColumn, FilterTitle, InputField, SelectField } from './style';

interface FilterSectionProps {
  filters: any;
  onFilterChange: (field: string, value: string) => void;
}

// Supply Chain Node Filter Component
export const SupplyChainNodeFilters: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  return (
    <>
      <FilterGroup>
        <FilterColumn>
          <FilterTitle>Location Type</FilterTitle>
          <SelectField 
            value={filters.locationType}
            onChange={(e) => onFilterChange('locationType', e.target.value)}
          >
            <option value="">Select Location Type</option>
            <option value="warehouse">Warehouse</option>
            <option value="store">Store</option>
            <option value="distribution">Distribution Center</option>
          </SelectField>
        </FilterColumn>
        
        <FilterColumn>
          <FilterTitle>Select Location</FilterTitle>
          <SelectField 
            value={filters.selectedLocation}
            onChange={(e) => onFilterChange('selectedLocation', e.target.value)}
          >
            <option value="">Choose Location</option>
            <option value="loc1">Location 1</option>
            <option value="loc2">Location 2</option>
            <option value="loc3">Location 3</option>
          </SelectField>
        </FilterColumn>
      </FilterGroup>

      <FilterGroup>
        <FilterColumn>
          <FilterTitle>Search by name</FilterTitle>
          <InputField 
            type="text"
            placeholder="Enter name..."
            value={filters.searchByName}
            onChange={(e) => onFilterChange('searchByName', e.target.value)}
          />
        </FilterColumn>
      </FilterGroup>

      <FilterGroup>
        <FilterColumn>
          <FilterTitle>For Children</FilterTitle>
          <FilterTitle subTitle>Location Type</FilterTitle>
          <SelectField 
            value={filters.childrenLocationType}
            onChange={(e) => onFilterChange('childrenLocationType', e.target.value)}
          >
            <option value="">Select Children Location Type</option>
            <option value="child-warehouse">Child Warehouse</option>
            <option value="child-store">Child Store</option>
          </SelectField>
        </FilterColumn>
        
        <FilterColumn>
          <FilterTitle style={{ opacity: 0 }}>Placeholder</FilterTitle>
          <FilterTitle subTitle>Q</FilterTitle>
          <InputField 
            type="text"
            placeholder="Enter quantity..."
            value={filters.quantity}
            onChange={(e) => onFilterChange('quantity', e.target.value)}
          />
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