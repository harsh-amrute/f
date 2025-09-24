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
} from "../VFFilterContent/index";

import { RootState } from "../../../../../redux/store/store";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onReset: () => void;
  activeFilterCount?: number;
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
}) => {
  const { user } = useUserData();
  const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);
  const reportCode = useReportCode();

  const availableSections = useMemo<SectionType[]>(() => {
    if (!EnvConfig) {
      // No config → show all filters
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
      // DB is empty → show all filters
      return sections;
    }

    // DB has config → only show filters explicitly mapped to current report
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

  const currentActiveFilters = Object.values(filters).filter(
    (v) => v !== ""
  ).length;

  const handleInputChange = (field: string, value: string) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  const handleApply = () => onApply(filters);

  const handleReset = () => {
    setFilters(
      Object.keys(filters).reduce((acc, k) => ({ ...acc, [k]: "" }), {})
    );
    onReset();
  };

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
            <VFButtonOutline
              themeUi={user.user.theme_ui}
              onClick={handleReset}
              style={{ fontSize: 15, fontWeight: 450, height: 45 }}
            >
              Reset Filters
            </VFButtonOutline>
            <VFButton
              themeUi={user.user.theme_ui}
              onClick={handleApply}
              style={{ fontSize: 15, fontWeight: 450, height: 45 }}
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