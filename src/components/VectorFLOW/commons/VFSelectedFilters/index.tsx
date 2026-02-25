import { CSSProperties, useCallback } from "react";
import {
  BPRFilter,
  BPRFilterGroup,
  BPRFilterState,
} from "../../../.././VectorFlow/types/BPR";
import {
  VFSelectedFiltersChip,
  VFSelectedFiltersFilterCloseIcon,
  VFSelectedFiltersFilterContent,
  VFSelectedFiltersFilterLabel,
  VFSelectedFiltersFilterValue,
  VFSelectedFiltersPlaceHolder,
  VFSelectedFiltersWrapper,
  VFFilterScrollBar,
} from "./styles.css";
interface VFSelectedFiltersProps {
  filters: BPRFilterState;
  onRemoveFilter: (parentId: string, filterId: string, value: string) => void;
  style?: CSSProperties;
}

const VFSelectedFilters = (props: VFSelectedFiltersProps) => {
  const { filters, onRemoveFilter, style } = props;
  const areFiltersValid = useCallback(
    (groupedFilters: Array<BPRFilter>): boolean => {
      return groupedFilters.some(
        (f: BPRFilter) =>
          f.attributeName != "" && f.value != "" && f.operator != ""
      );
    },
    []
  );

  // Check if any filter group contains valid filters
  const hasValidFilters = Object.keys(filters).some((key: string) => {
    const currGroup: BPRFilterGroup = filters[key as keyof BPRFilterState];
    return currGroup.filters.length > 0 && areFiltersValid(currGroup.filters);
  });

  // If there are no valid filters, return null
  if (!hasValidFilters) {
    return null;
  }

  return (
    <div className={VFSelectedFiltersWrapper} style={style}>
      <p className={VFSelectedFiltersPlaceHolder}>Selected Filters</p>

      <div className={VFFilterScrollBar}>
        {Object.keys(filters).map((key: any) => {
          const currGroup: BPRFilterGroup = filters[key as keyof BPRFilterState];
          if (currGroup.filters.length > 0 && areFiltersValid(currGroup.filters)) {
            return (
              <span className={VFSelectedFiltersChip} key={currGroup.id}>
                <div className={VFSelectedFiltersFilterLabel}>
                  <b>{currGroup.label}:</b>
                </div>

                {currGroup.filters.map((filter: BPRFilter, index: number) => {
                  const isLast = index === currGroup.filters.length - 1;
                  return (
                    <div
                      className={VFSelectedFiltersFilterContent}
                      key={`${filter.name}-${filter.value}-${index}`}
                      style={{ borderRight: isLast ? 'none' : 'solid 2px gray' }}
                    >
                      <div className={VFSelectedFiltersFilterValue}>
                        <p>{filter.label}</p>
                        <p style={{ margin: '0 5px' }}>:</p>
                        <p>{filter.value}</p>
                      </div>

                      <img
                        className={VFSelectedFiltersFilterCloseIcon}
                        src="/assets/img/VectorFLOW/BPR/close-circle.svg"
                        onClick={() => onRemoveFilter(currGroup.id, filter.name, filter.value)}
                        data-testid="closeIcon-filter"
                      />
                    </div>
                  );
                })}
              </span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default VFSelectedFilters;
