import React, { useEffect, useState } from 'react';
import {
  FilterGroup,
  FilterColumn,
  TextWrapper,
  DropDownWrapper,
  DropDownRow,
  IconWrapper,
} from './style';
import Select from 'react-select';
import { useThemeStyles } from '../../../../../hooks/useVFFilterContent';
import { useFilterRows, stringOpertors } from './useVFFilterContent';
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';
import { useUserData } from '../../../../../context';
import { BPRFilter, BPRFilterState } from '../../../../../VectorFlow/types/BPR';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store/store';

interface ProductFilterProps {
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
}

const handleApply = () => {
  console.log('Search Button.................');
};

export const ProductFilters: React.FC<ProductFilterProps> = ({
  multiFilter,
  onMultiFilterChange,
}) => {
  const styles = useThemeStyles();
  const {
    filterRows,
    addFilterRow,
    handleAddRow,
    handleRemoveRow,
    removeFilterRow,
    isMaxRows,
    isMinRows,
    setFilterRows,
  } = useFilterRows();
  const { user } = useUserData();
  const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);

  const PRODUCT_PERMISSION_L1 = EnvConfig['PRODUCT_PERMISSION_L1'];
  const PRODUCT_PERMISSION_L2 = EnvConfig['PRODUCT_PERMISSION_L2'];
  const PRODUCT_PERMISSION_L3 = EnvConfig['PRODUCT_PERMISSION_L3'];

  const filterProductOptions = [
    { value: 'p1', label: PRODUCT_PERMISSION_L1, name: 'PF1' },
    { value: 'p2', label: PRODUCT_PERMISSION_L2, name: 'PF2' },
    { value: 'p3', label: PRODUCT_PERMISSION_L3, name: 'PF3' },
    { value: 'p4', label: 'P4', name: 'PF4' },
    { value: 'p5', label: 'P5', name: 'PF5' },
  ];

  const [rowSelections, setRowSelections] = useState<{
    [rowId: number]: { column?: any; operation?: any; value?: any };
  }>({});

  const [rowFilterIndexMap, setRowFilterIndexMap] = useState<Record<number, number>>({});

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    const parentId = 'productFilter';
    const savedFilters = multiFilter[parentId]?.filters || [];

    if (savedFilters.length === 0) {
      setRowSelections({});
      setRowFilterIndexMap({});
      setIsInitialized(true);
      return;
    }

    const newRows = savedFilters.map((_, idx) => ({ id: idx }));
    setFilterRows(newRows);

    const restored: { [rowId: number]: { column?: any; operation?: any; value?: any } } = {};
    const indexMap: Record<number, number> = {};

    savedFilters.forEach((f: BPRFilter, idx: number) => {
      const column = filterProductOptions.find((opt) => opt.value === f.attributeName);
      const operation = stringOpertors.find((op) => op.value === f.operator);

      restored[idx] = {
        column: column || null,
        operation: operation || null,
        value: f.value,
      };
      indexMap[idx] = idx; 
    });

    setRowSelections(restored);
    setRowFilterIndexMap(indexMap);
    setIsInitialized(true);
  }, [isInitialized, multiFilter?.productFilter?.filters, setFilterRows]);

  const onFilterChange = (
    rowId: number,
    field: 'column' | 'operation' | 'value',
    selected: any
  ) => {
    const updatedSelections = {
      ...rowSelections,
      [rowId]: { ...rowSelections[rowId], [field]: selected },
    };
    setRowSelections(updatedSelections);

    const parentId = 'productFilter';
    const current = updatedSelections[rowId];

    if (
      current?.column &&
      current?.operation &&
      current?.value !== undefined &&
      current?.value !== ''
    ) {

      const newFilter: BPRFilter = {
        attributeName: current.column.value,
        value: current.value,
        operator: current.operation.value,
        label: current.column.label,
        name: current.column.name, 
      };

      const existingFilters = (multiFilter[parentId]?.filters || []) as BPRFilter[];
      const nextFilters = existingFilters.slice();
      const idx = rowFilterIndexMap[rowId];

      const newIndexMap = { ...rowFilterIndexMap };

      if (typeof idx === 'number' && idx >= 0 && idx < nextFilters.length) {
        nextFilters[idx] = newFilter;
      } else {
        nextFilters.push(newFilter); 
        newIndexMap[rowId] = nextFilters.length - 1;
      }

      onMultiFilterChange({
        ...multiFilter,
        [parentId]: {
          ...multiFilter[parentId],
          filters: nextFilters,
        },
      });

      setRowFilterIndexMap(newIndexMap);
    }
  };

  const handleRemoveRowWithFilter = (rowId: number) => {
    if (isMinRows) return;

    const parentId = 'productFilter';
    const existingFilters = (multiFilter[parentId]?.filters || []) as BPRFilter[];
    const idx = rowFilterIndexMap[rowId];

    const nextFilters = existingFilters.slice();
    const newIndexMap = { ...rowFilterIndexMap };

    if (typeof idx === 'number' && idx >= 0 && idx < nextFilters.length) {
      nextFilters.splice(idx, 1); 

      Object.keys(newIndexMap).forEach((k) => {
        const rid = Number(k);
        if (rid === rowId) return;
        if (newIndexMap[rid] > idx) newIndexMap[rid] = newIndexMap[rid] - 1;
      });
    }

    handleRemoveRow(rowId);
    setRowSelections((prev) => {
      const copy = { ...prev };
      delete copy[rowId];
      return copy;
    });
    delete newIndexMap[rowId];
    setRowFilterIndexMap(newIndexMap);

    onMultiFilterChange({
      ...multiFilter,
      [parentId]: {
        ...multiFilter[parentId],
        filters: nextFilters,
      },
    });
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <>
      <FilterGroup>
        <FilterColumn style={{ minWidth: '400px', maxWidth: 'none' }}>
          <TextWrapper>Select Operation</TextWrapper>
          {filterRows.map((row) => (
            <DropDownRow style={{ alignItems: 'center' }} key={row.id}>
              <DropDownWrapper>
                <Select
                  options={filterProductOptions}
                  placeholder="Select Column"
                  styles={styles}
                  components={{ IndicatorSeparator: () => null }}
                  value={rowSelections[row.id]?.column || null}
                  onChange={(selected) => onFilterChange(row.id, 'column', selected)}
                />
              </DropDownWrapper>
              <DropDownWrapper>
                <Select
                  options={stringOpertors}
                  placeholder="Select Operation"
                  styles={styles}
                  isSearchable={false}
                  components={{ IndicatorSeparator: () => null }}
                  value={rowSelections[row.id]?.operation || null}
                  onChange={(selected) => onFilterChange(row.id, 'operation', selected)}
                />
              </DropDownWrapper>
              <DropDownWrapper>
                <input
                  placeholder="Enter value"
                  className={`filter-input ${
                    user.user.theme_ui === 'REGALBLAZE'
                      ? 'filter-input--regal'
                      : 'filter-input--default'
                  }`}
                  value={rowSelections[row.id]?.value || ''}
                  onChange={(e) => onFilterChange(row.id, 'value', e.target.value)}
                />
              </DropDownWrapper>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '2px',
                }}
              >
                <IconWrapper theme_ui={user.user.theme_ui}>
                  <img src="/assets/img/MTAVFMultiFilter/Error.svg" alt="error" />
                </IconWrapper>
                <IconWrapper
                  theme_ui={user.user.theme_ui}
                  disabled={isMaxRows}
                  onClick={handleAddRow}
                >
                  <img
                    src="/assets/img/MTAVFMultiFilter/plus-sign-circle.svg"
                    alt="add"
                  />
                </IconWrapper>
                <IconWrapper
                  theme_ui={user.user.theme_ui}
                  disabled={isMinRows}
                  onClick={() => handleRemoveRowWithFilter(row.id)}
                >
                  <img
                    src="/assets/img/MTAVFMultiFilter/minus-sign-circle.svg"
                    alt="remove"
                  />
                </IconWrapper>
              </div>
            </DropDownRow>
          ))}
        </FilterColumn>
      </FilterGroup>

      <FilterGroup style={{ paddingTop: '10px' }}>
        <FilterColumn>
          <TextWrapper>Select Location</TextWrapper>
          <DropDownRow>
            <DropDownWrapper style={{ flex: 1 }}>
              <Select
                placeholder="Enter value"
                styles={{
                  ...styles,
                  control: (base: any, state: any) => ({
                    ...base,
                    minHeight: '48px',
                    border: state.isFocused
                      ? user.user.theme_ui === 'REGALBLAZE'
                        ? '2px solid #FCA311'
                        : '2px solid #BC3D80'
                      : '1px solid #c7c0c0ff',
                    borderRadius: '10px',
                    boxShadow: 'none',
                    outline: 'none',
                    '&:hover': {
                      border: state.isFocused
                        ? user.user.theme_ui === 'REGALBLAZE'
                          ? '2px solid #FCA311'
                          : '2px solid #BC3D80'
                        : '1px solid #c7c0c0ff',
                    },
                  }),
                  valueContainer: (base: any) => ({
                    ...base,
                    paddingLeft: '175px',
                  }),
                  placeholder: (base: any) => ({
                    ...base,
                    fontSize: '14px',
                    marginLeft: '1px',
                  }),
                }}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                }}
                isClearable
                options={[
                  { value: 'apple', label: 'Apple' },
                  { value: 'b', label: 'B' },
                ]}
              />

              <div style={{ width: 165, marginTop: -44, marginLeft: 4.5 }}>
                <Select
                  placeholder="SKU Code"
                  styles={{
                    ...styles,
                    control: (base: any, state: any) => ({
                      ...base,
                      minHeight: '39px',
                      border: state.isFocused
                        ? user.user.theme_ui === 'REGALBLAZE'
                          ? '2px solid #FCA311'
                          : '2px solid #BC3D80'
                        : '1px solid #c7c0c0ff',
                      borderRadius: '7px',
                      boxShadow: 'none',
                      outline: 'none',
                      '&:hover': {
                        border: state.isFocused
                          ? user.user.theme_ui === 'REGALBLAZE'
                            ? '2px solid #FCA311'
                            : '2px solid #BC3D80'
                          : '1px solid #c7c0c0ff',
                      },
                    }),
                  }}
                  components={{ IndicatorSeparator: () => null }}
                  options={[
                    { value: 'SKU Code', label: 'SKU Code' },
                    { value: 'SKU Description', label: 'SKU Description' },
                  ]}
                />
              </div>
            </DropDownWrapper>

            <VFButton
              themeUi={user.user.theme_ui}
              onClick={handleApply}
              width={120}
              style={{
                fontSize: 15,
                fontWeight: 350,
                height: 44,
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <img
                  src="/assets/img/MTAVFMultiFilter/Search-white.svg"
                  alt="search"
                  style={{ width: 16, height: 16 }}
                />
                <span>Search</span>
              </div>
            </VFButton>
          </DropDownRow>
        </FilterColumn>
      </FilterGroup>
    </>
  );
};