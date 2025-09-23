import React, { useState } from 'react';
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { useUserData } from "../../../../../context";

import { 
  ModalContent, 
  FilterLayout,
  SidebarSection,
  ContentSection,
  SidebarItem,
  FooterSection,
  FooterButtons
} from './style';

import {
  SupplyChainNodeFilters,
  LocationFilters,
  ProductFilters,
  AvailabilityFilters,
  AttributesFilters
} from '../VFFilterContent/index';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onReset: () => void;
  activeFilterCount?: number;
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  isOpen, 
  onClose, 
  onApply, 
  onReset, 
}) => {
  const { user } = useUserData();

  const [activeSection, setActiveSection] = useState('Supply Chain Node');
  const [filters, setFilters] = useState({
    locationType: '',
    selectedLocation: '',
    searchByName: '',
    childrenLocationType: '',
    quantity: '',
    location: '',
    locationTypeLocation: '',
    product: '',
    productCategory: '',
    availability: '',
    sku: '',
    loc: ''
  });

  // Calculate active filters count
  const calculateActiveFilters = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  const currentActiveFilters = calculateActiveFilters();

  const handleInputChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleReset = () => {
    setFilters({
      locationType: '',
      selectedLocation: '',
      searchByName: '',
      childrenLocationType: '',
      quantity: '',
      location: '',
      locationTypeLocation: '',
      product: '',
      productCategory: '',
      availability: '',
      sku: '',
      loc: ''
    });
    onReset();
  };

    const CustomHeader = () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.65rem',
      color: 'white' 
    }}>
      <span>Filter</span>
      {currentActiveFilters > 0 && (
        <span style={{
          background: '#fffafdff',
          color: 'black',
          borderRadius: '50%',
          width: '22px',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          fontWeight: '500'
        }}>
          {currentActiveFilters}
        </span>
      )}
    </div>
  );
  
  const renderFilterContent = () => {
    const filterProps = {
      filters,
      onFilterChange: handleInputChange
    };

    switch (activeSection) {
      case 'Supply Chain Node':
        return <SupplyChainNodeFilters {...filterProps} />;

      case 'Location':
        return <LocationFilters {...filterProps} />;

      case 'Product':
        return <ProductFilters {...filterProps} />;

      case 'Availability':
        return <AvailabilityFilters {...filterProps} />;

      case 'Attributes - SKU Loc':
        return <AttributesFilters {...filterProps} />;

      default:
        return null;
    }

  };

  return (
    <VFModalCard
      zoom={'0.78'}
      openModal={isOpen}
      closeModal={onClose}
      headerIcon={'/assets/img/MTAVFMultiFilter/filter-vertical.svg'} 
      headerText={<CustomHeader/>}  
      closeIcon={'/assets/img/MTAVFMultiFilter/cross-small.svg'} 
      paddingLeftAndRight={0}   
      backgroundColor={'#f4f4f4'}
      headerBgColor={'#000000'}
      data-testid="vfmultifilter-img"
    >
      <ModalContent>
        <FilterLayout>
          <SidebarSection>
            {[
              'Supply Chain Node',
              'Location',
              'Product',
              'Availability',
              'Attributes - SKU Loc'
            ].map((section) => (
              <SidebarItem
                key={section}
                active={activeSection === section}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </SidebarItem>
            ))}
          </SidebarSection>
          
          <ContentSection>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0' }}>
              {renderFilterContent()}
            </div>
          </ContentSection>
        </FilterLayout>

        <FooterSection>
          <FooterButtons>
            <VFButtonOutline 
              themeUi={user.user.theme_ui} 
              onClick={handleReset}
            >
              Reset Filters
            </VFButtonOutline>
            <VFButton 
              themeUi={user.user.theme_ui} 
              onClick={handleApply}
            >
              Apply Filter 
            </VFButton>
          </FooterButtons>
        </FooterSection>
      </ModalContent>
    </VFModalCard>
  );
};

export default FilterModal;