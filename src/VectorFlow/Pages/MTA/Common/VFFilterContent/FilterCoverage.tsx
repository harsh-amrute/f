import React, { useState } from "react";
import "./styles.css";
import { useThemeStyles } from "../../../../../hooks/useVFFilterContent";
import { FilterColumn, FilterGroup, TextWrapper } from "./style";

interface FilterSectionProps {
  filters: any;
  onFilterChange: (field: string, value: string) => void;
}

type CoverageOption = {
  label: string;
  value: string;
  color: string;
};

const coverageOptions: CoverageOption[] = [
  { label: "Gap < 33%", value: "low", color: "green" },
  { label: "33% ≤ Gap ≤ 67%", value: "medium", color: "goldenrod" },
  { label: "Gap > 67%", value: "high", color: "crimson" },
];

export const CoverageFilters: React.FC<FilterSectionProps> = () => {
  const styles = useThemeStyles();

    const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <FilterGroup>
      <FilterColumn style={{ minWidth: "400px", maxWidth: "none" }}>
        <TextWrapper>Coverage Filter</TextWrapper>
        <div className="chip-container">
          {coverageOptions.map((option) => {
            const isActive = selected.includes(option.value);
            return (
              <button
                key={option.value}
                onClick={() => toggleOption(option.value)}
                className={`chip ${isActive ? "active" : ""}`}
                style={{
                  backgroundColor: isActive ? option.color : "transparent",
                  borderColor: option.color,
                  color: isActive ? "white" : option.color,
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </FilterColumn>
    </FilterGroup>
  );
};
