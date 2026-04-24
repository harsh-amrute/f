import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { useUserData } from "../../../../../context";
import { SupplyChainNodeFilters } from "../VFFilterContent/FilterSupplyChainNode";
import { HorizonFilter } from "../VFFilterContent/HorizonFilter";
import { ColorFilters } from "../VFFilterContent/FilterColor";
import { LocationFilters } from "../VFFilterContent/FilterLocation";
import { ProductFilters } from "../VFFilterContent/FilterProduct";
import { AvailabilityFilters } from "../VFFilterContent/FilterAvailability";
import { AttributesFilters } from "../VFFilterContent/FilterAttributes";
import { HistroricalFilter } from "../VFFilterContent/HistroricalFilter";
import { CoverageFilters } from "../VFFilterContent/FilterCoverage";
import {
  modalContent,
  filterLayout,
  sidebarSection,
  sidebarItem,
  contentSection,
  footerSection,
  footerButtons,
  sbBgVar,
  sbColorVar,
  sbWeightVar,
  sbMarginRightVar,
  sbHoverBgVar,
  sbHoverColorVar,
} from "./style.css";
import { RootState } from "../../../../../redux/store/store";
import { BPRFilterState } from "../../../../../VectorFlow/types/BPR";
import { UPDATE_MTA_VF_MULTI_FILTER } from "../../../../../redux/actions/MTA";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onReset: () => void;
  activeFilterCount?: number;
  multiFilter: BPRFilterState;
  currentTab?: string;
  currCategory?: any;
  reportName?: any;
  reportType?: string;
  activeTab?: "norm" | "virtualnorm"
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
  currentTab = "both",
  currCategory,
  reportName,
  reportType,
  activeTab,
}) => {
  const { user } = useUserData();
  const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);
  const reportCode = useReportCode();
  const dispatch = useDispatch();
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

    const currentReportType = reportType?.toUpperCase() || upperReportCode;
    const coverageReports = ["ORDERFULFILLMENT"];
    
    if (coverageReports.includes(currentReportType)) {
      return sections.filter((s) => {
        if (s.key === "FILTER_COVERAGE") return true;
        if (s.key === "FILTER_AVAILABILITY") return false;
        return s.values.includes(upperReportCode);
      });
    }
    return sections.filter((s) => {
      if (s.key === "FILTER_COVERAGE") return false;
      if (s.key === "FILTER_AVAILABILITY") return s.values.includes(upperReportCode);
      return s.values.includes(upperReportCode);
    });
  }, [EnvConfig, reportCode, reportType]);

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
      horizonFilter: { id: "9", label: "Horizon", filters: [] },
    }
  );

  useEffect(() => {
    if (initialMultiFilter) {
      setMultiFilter(initialMultiFilter);
      dispatch(UPDATE_MTA_VF_MULTI_FILTER(initialMultiFilter))

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
      horizonFilter: { id: "9", label: "Horizon", filters: [] },
    };

    setMultiFilter(resetMultiFilter);
    dispatch(UPDATE_MTA_VF_MULTI_FILTER(resetMultiFilter))
    setFilters(
      Object.keys(filters).reduce((acc, k) => ({ ...acc, [k]: "" }), {})
    );
    onReset();
  };

  const handleMultiFilterChange = (newMultiFilter: BPRFilterState) => {
    setMultiFilter(newMultiFilter);
    dispatch(UPDATE_MTA_VF_MULTI_FILTER(newMultiFilter))
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

    if (section.label === "Availability") {
      return (
        <FilterComponent
          multiFilter={multiFilter}
          onMultiFilterChange={handleMultiFilterChange}
          filters={filters}
          onFilterChange={handleInputChange}
          currentTab={currentTab}
          currCategory={currCategory}
          activeTab={activeTab} 
        />
      );
    }
    if (section.label === "Attributes - SKU Loc") {
      return (
        <FilterComponent
          multiFilter={multiFilter}
          onMultiFilterChange={handleMultiFilterChange}
          filters={filters}
          onFilterChange={handleInputChange}
          reportName={reportName}
        />
      );
    }

    return (
      <FilterComponent
        multiFilter={multiFilter}
        onMultiFilterChange={handleMultiFilterChange}
        filters={filters}
        onFilterChange={handleInputChange}
      />
    );
  };

  const themeColor =
    user.user.theme_ui === "REGALBLAZE" ? "#14213D" : "#000000";
  const isRegal = user.user.theme_ui === "REGALBLAZE";

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
      headerBgColor={themeColor}
      data-testid="vfmultifilter-img"
      absolute
    >
      <div className={modalContent}>
        <div className={filterLayout}>
          <div className={sidebarSection}>
            {availableSections.map(({ label }) => {
              const active = activeSection === label;
              return (
                <div
                  key={label}
                  className={sidebarItem}
                  style={assignInlineVars({
                    [sbBgVar]: active
                      ? isRegal
                        ? "#fca2113d"
                        : "#fce4f0"
                      : "transparent",
                    [sbColorVar]: active
                      ? isRegal
                        ? "#FCA311"
                        : "#BC3D80"
                      : "#000000ff",
                    [sbWeightVar]: active ? "480" : "400",
                    [sbMarginRightVar]: active ? "-1px" : "0",
                    [sbHoverBgVar]: active
                      ? isRegal
                        ? "#fca2111b"
                        : "#fce4f0"
                      : "#e9ecef",
                    [sbHoverColorVar]: isRegal ? "#FCA311" : "#BC3D80",
                  })}
                  onClick={() => setActiveSection(label)}
                >
                  {label}
                </div>
              );
            })}
          </div>

          <div className={contentSection}>
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 0" }}>
              {renderFilterContent()}
            </div>
          </div>
        </div>

        <div className={footerSection}>
          <div className={footerButtons}>
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
          </div>
        </div>
      </div>
    </VFModalCard>
  );
};

export default FilterModal;
