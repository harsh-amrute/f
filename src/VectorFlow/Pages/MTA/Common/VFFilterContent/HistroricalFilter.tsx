import React, { useState } from "react";
import {
  filterGroup,
  filterColumn,
  textWrapper,
  dropDownWrapper,
  dropDownRow,
  iconWrapper,
} from "./style.css";
import Select from "react-select";
import {
  useThemeStyles,
} from "../../../../../hooks/useVFFilterContent";
import { numericOperators } from "./useVFFilterContent";
import { useUserData } from "../../../../../context";
import "./styles.css";

interface AvailabilityFilterProps {
  filters: any;
  onFilterChange: (field: string, value: any) => void;
  onApplyFilter: (filters: any) => void;
  initialFilters?: any;
}

export const HistroricalFilter: React.FC<AvailabilityFilterProps> = ({
  filters,
  onFilterChange,
}) => {
  const styles = useThemeStyles();
  const { user } = useUserData();

  return (
    <>
      <div className={filterGroup}>
        <div className={filterColumn} style={{ minWidth: "400px", maxWidth: "none" }}>
          <div className={textWrapper}>Select Operation</div>
          <div className={dropDownRow}>
            <div className={dropDownWrapper}>
              <Select
                placeholder={"VirtualNorm"}
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isDisabled={true}
                value={{ label: "Virtual Norm", value: "Virtual Norm" }}
                options={[]}
              />
            </div>
            <div className={dropDownWrapper}>
              <Select
                options={numericOperators}
                placeholder={"Select an Operation"}
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
              />
            </div>
            <div className={dropDownWrapper}>
              <Select
                placeholder="Enter a value"
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isSearchable={true}
                inputValue={filters.someValue || ""}
                onInputChange={(inputValue) =>
                  onFilterChange("someValue", inputValue)
                }
                menuIsOpen={false}
                options={[]}
              />
            </div>
            <div className={iconWrapper} data-theme={user.user.theme_ui}>
              <img src={"/assets/img/MTAVFMultiFilter/Error.svg"} />
            </div>
            <div className={iconWrapper} data-theme={user.user.theme_ui}>
              <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"} />
            </div>
          </div>
          <div className={dropDownRow}>
            <div className={dropDownWrapper}>
              <Select
                placeholder={"Norm"}
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isDisabled={true}
                value={{ label: "Norm", value: "Norm" }}
                options={[]}
              />
            </div>
            <div className={dropDownWrapper}>
              <Select
                placeholder={"Select an Operation"}
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
                options={numericOperators}
              />
            </div>
            <div className={dropDownWrapper}>
              <Select
                placeholder="Enter a value"
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isSearchable={true}
                inputValue={filters.someValue || ""}
                onInputChange={(inputValue) =>
                  onFilterChange("someValue", inputValue)
                }
                menuIsOpen={false}
                options={[]}
              />
            </div>
            <div className={iconWrapper} data-theme={user.user.theme_ui}>
              <img src={"/assets/img/MTAVFMultiFilter/Error.svg"} />
            </div>
            <div className={iconWrapper} data-theme={user.user.theme_ui}>
              <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"} />
            </div>
          </div>
          <div className={dropDownRow}>
            <div className={dropDownWrapper}>
              <Select
                placeholder={"Stock"}
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isDisabled={true}
                value={{ label: "Stock", value: "Stock" }}
                options={[]}
              />
            </div>
            <div className={dropDownWrapper}>
              <Select
                placeholder={"Select an Operation"}
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
                options={numericOperators}
              />
            </div>
            <div className={dropDownWrapper}>
              <Select
                placeholder="Enter a value"
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isSearchable={true}
                inputValue={filters.someValue || ""}
                onInputChange={(inputValue) =>
                  onFilterChange("someValue", inputValue)
                }
                menuIsOpen={false}
                options={[]}
              />
            </div>
            <div className={iconWrapper} data-theme={user.user.theme_ui}>
              <img src={"/assets/img/MTAVFMultiFilter/Error.svg"} />
            </div>
            <div className={iconWrapper} data-theme={user.user.theme_ui}>
              <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"} />
            </div>
          </div>
          <div className={dropDownRow}>
            <div className={dropDownWrapper}>
              <Select
                placeholder={"GIT"}
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isDisabled={true}
                value={{ label: "GIT", value: "GIT" }}
                options={[]}
              />
            </div>
            <div className={dropDownWrapper}>
              <Select
                placeholder={"Select an Operation"}
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
                options={numericOperators}
              />
            </div>
            <div className={dropDownWrapper}>
              <Select
                placeholder="Enter a value"
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isSearchable={true}
                inputValue={filters.someValue || ""}
                onInputChange={(inputValue) =>
                  onFilterChange("someValue", inputValue)
                }
                menuIsOpen={false}
                options={[]}
              />
            </div>
            <div className={iconWrapper} data-theme={user.user.theme_ui}>
              <img src={"/assets/img/MTAVFMultiFilter/Error.svg"} />
            </div>
            <div className={iconWrapper} data-theme={user.user.theme_ui}>
              <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
