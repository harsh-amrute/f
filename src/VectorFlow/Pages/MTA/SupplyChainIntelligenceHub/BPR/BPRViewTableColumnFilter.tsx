import { useMemo } from "react";

import { getBPRViewTableHeaderFilterOptions } from "../../../../../helpers/utils";
import {
  BPRViewTableColumnFilterContainer,
  BPRViewTableColumnFilterInput,
  BPRViewTableColumnFilterSelect,
  BPRViewTableColumnFilterSelectOption,
} from "./styles.css";

interface BPRViewTableColumnFilterProps {
  onApplyFilter: (filterString: string, query: any) => void;
  filterString: string;
  dataType?: string;
  query?: string;
}

const BPRViewTableColumnFilter = (props: BPRViewTableColumnFilterProps) => {
  const { onApplyFilter, filterString, dataType, query } = props;

  const filterOptions = useMemo(
    () => getBPRViewTableHeaderFilterOptions(dataType),
    [dataType]
  );

  return (
    <div className={BPRViewTableColumnFilterContainer}>
      <select
        className={BPRViewTableColumnFilterSelect}
        onChange={(e) => {
          onApplyFilter(filterString, e.target.value);
        }}
      >
        {filterOptions.map((f) => {
          return (
            <option
              className={BPRViewTableColumnFilterSelectOption}
              value={f.value}
              selected={f.value === query}
            >
              {f.label}
            </option>
          );
        })}
      </select>
      <input
        className={BPRViewTableColumnFilterInput}
        autoFocus
        placeholder="Filter.."
        onChange={(e) => {
          onApplyFilter(e.target.value, query);
        }}
        value={filterString}
      />
      {/* <BPRViewTableColumnFilterButton onClick={()=>onApplyFilter(filterString)}>
                Apply
            </BPRViewTableColumnFilterButton> */}
    </div>
  );
};

export default BPRViewTableColumnFilter;
