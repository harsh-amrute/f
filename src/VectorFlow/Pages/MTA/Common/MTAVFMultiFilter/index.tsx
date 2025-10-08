import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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
  FooterButtons,
} from "./style";

import {
  SupplyChainNodeFilters,
  LocationFilters,
  ProductFilters,
  AvailabilityFilters,
  AttributesFilters,
  ColorFilters,
  CoverageFilters,
  HistroricalFilter,
  HorizonFilter,
} from "../VFFilterContent/index";

import { RootState } from "../../../../../redux/store/store";
import { BPRFilterState } from "../../../../../VectorFlow/types/BPR";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onReset: () => void;
  activeFilterCount?: number;
  multiFilter: BPRFilterState;
}

interface SectionType {
  key: string;
  label: string;
  component: React.ComponentType<any>;
  values: string[];
}

const filterConfigMap: Record<
  string,
  { label: string; component: React.ComponentType<any> }
> = {
  FILTER_SUPPLY_CHAIN_NODE: {
    label: "Supply Chain Node",
    component: SupplyChainNodeFilters,
  },
  FILTER_LOCATION: { label: "Location", component: LocationFilters },
  FILTER_PRODUCT: { label: "Product", component: ProductFilters },
  FILTER_AVAILABILITY: {
    label: "Availability",
    component: AvailabilityFilters,
  },
  FILTER_ATTRIBUTES: {
    label: "Attributes - SKU Loc",
    component: AttributesFilters,
  },
  FILTER_COLOR: {
    label: "Color Filter",
    component: ColorFilters,
  },
  FILTER_COVERAGE: {
    label: "Coverage Filter",
    component: CoverageFilters,
  },
  HISTRORICAL_FILTER: {
    label: "Histrorical Filter",
    component: HistroricalFilter,
  },
  HORIZON_FILTER: {
    label: "Horizon Filter",
    component: HorizonFilter,
  },
};

const getConfigValues = (raw?: string) =>
  raw
    ? raw
        .split(",")
        .map((v) => v.trim().toUpperCase())
        .filter(Boolean)
    : [];

const useReportCode = () => {
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  return parts[parts.length - 1]?.toUpperCase() || "";
};

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  onReset,
  multiFilter: initialMultiFilter,
}) => {
  const { user } = useUserData();
  const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);
  const reportCode = useReportCode();

  const availableSections = useMemo<SectionType[]>(() => {
    if (!EnvConfig) {
      return Object.entries(filterConfigMap).map(
        ([key, { label, component }]) => ({
          key,
          label,
          component,
          values: [],
        })
      );
    }

    const normalizedEnvConfig: Record<string, string> = {};
    Object.entries(EnvConfig).forEach(([key, val]) => {
      normalizedEnvConfig[key.toUpperCase()] = (val as string) || "";
    });

    const upperReportCode = reportCode.toUpperCase().trim();

    const sections: SectionType[] = Object.entries(filterConfigMap).map(
      ([key, { label, component }]) => {
        const values = getConfigValues(normalizedEnvConfig[key.toUpperCase()]);
        return { key, label, component, values };
      }
    );

    const hasAnyConfig = sections.some((s) => s.values.length > 0);

    if (!hasAnyConfig) {
      return sections;
    }

    return sections.filter((s) => s.values.includes(upperReportCode));
  }, [EnvConfig, reportCode]);

  const [activeSection, setActiveSection] = useState(
    availableSections.length > 0 ? availableSections[0].label : ""
  );

  useEffect(() => {
    if (
      availableSections.length &&
      !availableSections.some((s) => s.label === activeSection)
    ) {
      setActiveSection(availableSections[0].label);
    }
  }, [availableSections, activeSection]);

  const [filters, setFilters] = useState<Record<string, string>>({
    locationType: "",
    selectedLocation: "",
    searchByName: "",
    childrenLocationType: "",
    quantity: "",
    location: "",
    locationTypeLocation: "",
    product: "",
    productCategory: "",
    availability: "",
    sku: "",
    loc: "",
  });

  const [multiFilter, setMultiFilter] = useState<BPRFilterState>(
    initialMultiFilter || {
      supplyChainFilter: { id: "1", label: "SupplyChain", filters: [] },
      locationFilter: { id: "2", label: "Location", filters: [] },
      productFilter: { id: "3", label: "Product", filters: [] },
      availabilityFilter: { id: "4", label: "Availability", filters: [] },
      coverageFilter: { id: "5", label: "Coverage", filters: [] },
      colorFilter: { id: "6", label: "Color", filters: [] },
      generalFilter: { id: "7", label: "General", filters: [] },
      customAttributeFilter: { id: "8", label: "Attribute", filters: [] },
    }
  );

  useEffect(() => {
    if (initialMultiFilter) {
      setMultiFilter(initialMultiFilter);
    }
  }, [initialMultiFilter]);

  const handleApply = () => {
    onApply(multiFilter);
  };

  const handleReset = () => {
    const resetMultiFilter: BPRFilterState = {
      supplyChainFilter: { id: "1", label: "SupplyChain", filters: [] },
      locationFilter: { id: "2", label: "Location", filters: [] },
      productFilter: { id: "3", label: "Product", filters: [] },
      availabilityFilter: { id: "4", label: "Availability", filters: [] },
      coverageFilter: { id: "5", label: "Coverage", filters: [] },
      colorFilter: { id: "6", label: "Color", filters: [] },
      generalFilter: { id: "7", label: "General", filters: [] },
      customAttributeFilter: { id: "8", label: "Attribute", filters: [] },
    };

    setMultiFilter(resetMultiFilter);
    setFilters(
      Object.keys(filters).reduce((acc, k) => ({ ...acc, [k]: "" }), {})
    );
    onReset();
  };

  const handleMultiFilterChange = (newMultiFilter: BPRFilterState) => {
    setMultiFilter(newMultiFilter);
  };

  const currentActiveFilters =
    Object.values(filters).filter((v) => v !== "").length +
    Object.values(multiFilter).reduce(
      (count, f) => count + (f.filters?.length || 0),
      0
    );

  const handleInputChange = (field: string, value: string) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  const CustomHeader = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.65rem",
        color: "white",
      }}
    >
      <span
        style={{ marginLeft: "-13px", fontSize: "1.8rem", fontWeight: 410 }}
      >
        Filter
      </span>
      {currentActiveFilters > 0 && (
        <span
          style={{
            background: "#fffafdff",
            color: "black",
            borderRadius: "50%",
            width: "22px",
            height: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            fontWeight: 530,
          }}
        >
          {currentActiveFilters}
        </span>
      )}
    </div>
  );

  const renderFilterContent = () => {
    const section = availableSections.find((s) => s.label === activeSection);
    if (!section) return null;
    const FilterComponent = section.component;
    return (
      <FilterComponent
        multiFilter={multiFilter}
        onMultiFilterChange={handleMultiFilterChange}
        filters={filters}
        onFilterChange={handleInputChange}
        availableValues={section.values}
      />
    );
  };

  return (
    <VFModalCard
      zoom="0.73"
      openModal={isOpen}
      closeModal={onClose}
      headerIcon="/assets/img/MTAVFMultiFilter/filter-vertical.svg"
      headerText={<CustomHeader />}
      closeIcon="/assets/img/VectorFLOW/NMS/close-white.svg"
      paddingLeftAndRight={0}
      backgroundColor="#f4f4f4"
      headerBgColor="#000000"
      data-testid="vfmultifilter-img"
      absolute
    >
      <ModalContent>
        <FilterLayout>
          <SidebarSection>
            {availableSections.map(({ label }) => (
              <SidebarItem
                theme_ui={user.user.theme_ui}
                key={label}
                active={activeSection === label}
                onClick={() => setActiveSection(label)}
              >
                {label}
              </SidebarItem>
            ))}
          </SidebarSection>
          <ContentSection>
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 0" }}>
              {renderFilterContent()}
            </div>
          </ContentSection>
        </FilterLayout>
        <FooterSection>
          <FooterButtons>
            {currentActiveFilters > 0 && (
              <VFButtonOutline
                themeUi={user.user.theme_ui}
                onClick={handleReset}
                style={{ fontSize: 15, fontWeight: 450, height: 45 }}
              >
                Reset Filters
              </VFButtonOutline>
            )}
            <VFButton
              themeUi={user.user.theme_ui}
              onClick={handleApply}
              style={{ fontSize: 15, fontWeight: 450, height: 45 }}
            >
              {currentActiveFilters > 0 ? "Apply Filter" : "Show All"}
            </VFButton>
          </FooterButtons>
        </FooterSection>
      </ModalContent>
    </VFModalCard>
  );
};

export default FilterModal;
