import React, { useState } from "react";
import {
  filterGroup,
  filterColumn,
  textWrapper,
  dropDownWrapper,
  dropDownRow,
  iconWrapper,
} from "./style.css";
// import Select from "react-select";
import { useThemeStyles } from "../../../../../hooks/useVFFilterContent";
import { numericOperators } from "./useVFFilterContent";
import { useUserData } from "../../../../../context";
import "./styles.css";
import DownshiftSelect from "./DownshiftSelect/DownshiftSelect";

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
              {/* <Select
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
              /> */}
              <DownshiftSelect
                placeholder="VirtualNorm"
                options={[]} // no options
                disabled={true} // same as isDisabled
                value={{ label: "Virtual Norm", value: "Virtual Norm" }}
                onChange={undefined} // no-op because it's disabled
                isSearchable={false} // matches Menu: null + DropdownIndicator: null behavior
              />
            </div>
            <div className={dropDownWrapper}>
              {/* <Select
                options={numericOperators}
                placeholder={"Select an Operation"}
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
              /> */}
              <DownshiftSelect
                options={numericOperators}
                placeholder="Select an Operation"
                onChange={(selected) => {
                  console.log("Selected operation:", selected);
                }}
              />
            </div>
            <div className={dropDownWrapper}>
              {/* <Select
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
              /> */}
              <DownshiftSelect
                options={[]} // forces no menu
                placeholder="Enter a value"
                isSearchable={true} // keeps input editable
                value={null} // no selected item; it’s a free input
                onChange={undefined} // no-op because options list is empty
                disabled={false}
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
              {/* <Select
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
              /> */}
              <DownshiftSelect
                placeholder="Norm"
                options={[]} // no dropdown
                disabled={true} // matches isDisabled
                value={{ label: "Norm", value: "Norm" }}
                onChange={undefined} // no-op since disabled
                isSearchable={false} // optional: prevents input cursor
              />
            </div>
            <div className={dropDownWrapper}>
              {/* <Select
                placeholder={"Select an Operation"}
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
                options={numericOperators}
              /> */}
              <DownshiftSelect
                placeholder="Select an Operation"
                options={numericOperators}
                onChange={(selected) => {
                  console.log("Selected operation:", selected);
                }}
              />
            </div>
            <div className={dropDownWrapper}>
              {/* <Select
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
              /> */}
              <DownshiftSelect
                placeholder="Enter a value"
                options={[]} // ensures menu never opens
                disabled={false}
                isSearchable={true}
                value={null} // not selecting an option, just typing
                onChange={undefined} // no-op because options list is empty
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
              {/* <Select
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
              /> */}

              <DownshiftSelect
                placeholder="Stock"
                options={[]} // ensures no dropdown
                disabled={true} // matches isDisabled
                value={{ label: "Stock", value: "Stock" }}
                onChange={undefined} // no change allowed when disabled
                isSearchable={false} // prevents cursor inside input
              />
            </div>
            <div className={dropDownWrapper}>
              {/* <Select
                placeholder={"Select an Operation"}
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
                options={numericOperators}
              /> */}
              <DownshiftSelect
                placeholder="Select an Operation"
                options={numericOperators}
                onChange={(selected) => {
                  console.log("Selected operation:", selected);
                }}
              />
            </div>
            <div className={dropDownWrapper}>
              {/* <Select
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
              /> */}
              <DownshiftSelect
                placeholder="Enter a value"
                options={[]} // no menu ever opens
                isSearchable={true} // allows typing
                disabled={false}
                value={null} // no selected option
                onChange={undefined} // required but no-op
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
              {/* <Select
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
              /> */}
              <DownshiftSelect
                placeholder="GIT"
                options={[]} // no menu
                disabled={true} // same as isDisabled
                value={{ label: "GIT", value: "GIT" }}
                onChange={undefined} // no-op (disabled anyway)
                isSearchable={false} // prevents text cursor
              />
            </div>
            <div className={dropDownWrapper}>
              {/* <Select
                placeholder={"Select an Operation"}
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
                options={numericOperators}
              /> */}
              <DownshiftSelect
                placeholder="Select an Operation"
                options={numericOperators}
                onChange={(selected) => {
                  console.log("Selected operation:", selected);
                }}
              />
            </div>
            <div className={dropDownWrapper}>
              {/* <Select
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
              /> */}
              <DownshiftSelect
                placeholder="Enter a value"
                options={[]} // no dropdown
                isSearchable={true} // allows typing
                disabled={false}
                value={null} // not selecting an item
                onChange={undefined} // no-op (no options to select)
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
