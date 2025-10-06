import React, { useState, useEffect } from "react";
import {
  FilterGroup,
  FilterColumn,
  TextWrapper,
  DropDownWrapper,
  DropDownRow,
  IconWrapper,
} from "./style";
import Select from "react-select";
import { useThemeStyles } from "../../../../../hooks/useVFFilterContent";
import { colorFilterOptions, numericOperators } from "./useVFFilterContent";
import { useUserData } from "../../../../../context";
import { BPRFilter, BPRFilterState } from "../../../../../VectorFlow/types/BPR";

interface FilterSectionProps {
  filters: any;
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
}

interface FilterRowState {
  id: string;
  type: string;
  attributeName: string;
  operator: string;
  value: string;
}

export const ColorFilters: React.FC<FilterSectionProps> = ({
  multiFilter,
  onMultiFilterChange,
}) => {
  const styles = useThemeStyles();
  const { user } = useUserData();

  const [filterRows, setFilterRows] = useState<FilterRowState[]>([
    { id: "CF1", type: "", attributeName: "", operator: "", value: "" },
    { id: "CF2", type: "", attributeName: "", operator: "", value: "" },
    { id: "CF3", type: "", attributeName: "", operator: "", value: "" },
  ]);

  const colorTypeFilterOptions = [
    { value: "colorcount", label: "Color Count" },
    { value: "colorage", label: "Color Age" },
  ];

  const isRowComplete = (row: FilterRowState) => {
    return row.type && row.attributeName && row.operator && row.value;
  };

  useEffect(() => {
    const updatedMultiFilter = { ...multiFilter };

    if (!updatedMultiFilter.colorFilter) {
      updatedMultiFilter.colorFilter = {
        id: "6",
        label: "Color",
        filters: [],
      };
    }

    updatedMultiFilter.colorFilter.filters = [];

    filterRows.forEach((row) => {
      if (isRowComplete(row)) {
        const filterObj: BPRFilter = {
          type: row.type,
          attributeName: row.attributeName,
          value: row.value,
          operator: row.operator,
          label: row.type,
          name: row.id,
        };

        updatedMultiFilter.colorFilter.filters.push(filterObj);
      }
    });

    onMultiFilterChange(updatedMultiFilter);
  }, [filterRows]);

  const handleFilterChange = (
    rowId: string,
    field: keyof FilterRowState,
    value: string
  ) => {
    setFilterRows((prev) => {
      return prev.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            [field]: value,
          };
        }
        return row;
      });
    });
  };

  const handleSelectChange = (
    rowId: string,
    field: keyof FilterRowState,
    selectedOption: any
  ) => {
    handleFilterChange(rowId, field, selectedOption?.value || "");
  };

  const handleResetRow = (rowId: string) => {
    setFilterRows((prev) => {
      return prev.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            type: "",
            attributeName: "",
            operator: "",
            value: "",
          };
        }
        return row;
      });
    });
  };

  return (
    <>
      <FilterGroup>
        <FilterColumn style={{ minWidth: "400px", maxWidth: "none" }}>
          <TextWrapper>Color Filter</TextWrapper>

          {filterRows.map((row) => {
            const isComplete = isRowComplete(row);

            return (
              <DropDownRow key={row.id} style={{ alignItems: "center" }}>
                <DropDownWrapper>
                  <Select
                    placeholder={"Select Type"}
                    styles={styles}
                    components={{ IndicatorSeparator: () => null }}
                    options={colorTypeFilterOptions}
                    value={
                      colorTypeFilterOptions.find(
                        (opt) => opt.value === row.type
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      handleSelectChange(row.id, "type", selectedOption)
                    }
                  />
                </DropDownWrapper>

                <DropDownWrapper>
                  <Select
                    options={colorFilterOptions}
                    placeholder={"Select Color"}
                    styles={styles}
                    components={{ IndicatorSeparator: () => null }}
                    value={
                      colorFilterOptions.find(
                        (opt) => opt.value === row.attributeName
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      handleSelectChange(
                        row.id,
                        "attributeName",
                        selectedOption
                      )
                    }
                  />
                </DropDownWrapper>

                <DropDownWrapper>
                  <Select
                    options={numericOperators}
                    placeholder={"Select OP"}
                    styles={styles}
                    components={{ IndicatorSeparator: () => null }}
                    value={
                      numericOperators.find(
                        (opt) => opt.value === row.operator
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      handleSelectChange(row.id, "operator", selectedOption)
                    }
                  />
                </DropDownWrapper>

                <DropDownWrapper>
                  <input
                    placeholder="Enter value"
                    className={`filter-input ${
                      user.user.theme_ui === "REGALBLAZE"
                        ? "filter-input--regal"
                        : "filter-input--default"
                    }`}
                    value={row.value}
                    onChange={(e) =>
                      handleFilterChange(row.id, "value", e.target.value)
                    }
                  />
                </DropDownWrapper>

                <IconWrapper
                  theme_ui={user.user.theme_ui}
                  style={{
                    opacity: isComplete ? 0 : 1,
                    cursor: isComplete ? "default" : "pointer",
                  }}
                >
                  <img src={"/assets/img/MTAVFMultiFilter/Error.svg"} />
                </IconWrapper>

                <IconWrapper
                  theme_ui={user.user.theme_ui}
                  onClick={() => handleResetRow(row.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"} />
                </IconWrapper>
              </DropDownRow>
            );
          })}
        </FilterColumn>
      </FilterGroup>
    </>
  );
};
