import { useCallback, useState } from 'react';
import { BPRFilterState, BPRFilter } from "../../../../types/BPR";

interface FilterRow {
  id: number;
}

interface UseVFMultiFilterProps {
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
}

interface SelectChangeParams {
  newValue: any;
  header: string;
  filterId: string;
  parentId: keyof BPRFilterState;
  attributeName?: string;
}

export const useFilterRows = (initialCount = 1, maxRows = 5) => {
  const [filterRows, setFilterRows] = useState<FilterRow[]>(
    Array(initialCount)
      .fill(null)
      .map((_, idx) => ({ id: idx }))
  );

  const addFilterRow = useCallback(() => {
    setFilterRows((prev) => {
      if (prev.length >= maxRows) return prev;
      const newId =
        prev.length > 0 ? Math.max(...prev.map((r) => r.id)) + 1 : 0;
      return [...prev, { id: newId }];
    });
  }, [maxRows]);

  const removeFilterRow = useCallback((id: number) => {
    setFilterRows((prev) =>
      prev.length > 1 ? prev.filter((row) => row.id !== id) : prev
    );
  }, []);

  const resetFilterRows = useCallback((count: number) => {
    setFilterRows(
      Array(count)
        .fill(null)
        .map((_, idx) => ({ id: idx }))
    );
  }, []);

  const handleAddRow = useCallback(() => {
    if (filterRows.length < maxRows) addFilterRow();
  }, [filterRows.length, maxRows, addFilterRow]);

  const handleRemoveRow = useCallback(
    (rowId: number) => {
      if (filterRows.length > 1) removeFilterRow(rowId);
    },
    [filterRows.length, removeFilterRow]
  );

  return {
    filterRows,
    setFilterRows,
    addFilterRow,
    removeFilterRow,
    resetFilterRows,
    handleAddRow,
    handleRemoveRow,
    isMaxRows: filterRows.length >= maxRows,
    isMinRows: filterRows.length <= 1,
  };
};

export const stringOpertors = [
  { label: "Equal to", value: "equalto" },
  { label: "Not Equal to", value: "notequalto" },
  { label: "Does not contain", value: "doesnotcontain" },
  { label: "Starts With", value: "startswith" },
  { label: "Does not start with", value: "doesnotstartwith" },
  { label: "Ends with", value: "endswith" },
  { label: "Does not end with", value: "doesnotendwith" },
  { label: "Has no value", value: "hasnovalue" },
]

export const numericOperators = [
  { label: "Equal to", value: "equalto" },
  { label: "Greater than", value: "greaterthan" },
  { label: "Less than", value: "smallerthan" },
  { label: "Greater than equal to", value: "greaterthanequalto" },
  { label: "Less than equal to", value: "smallerthanequalto" },
  { label: "Not equal", value: "notequalto" },
]

export const colorOptions = [
  { value: "red", label: "Red", color: "red" },
  { value: "yellow", label: "Yellow", color: "gold" },
  { value: "green", label: "Green", color: "green" },
  { value: "black", label: "Black", color: "black" },
  { value: "white", label: "White", color: "lightgrey" },
  { value: "blue", label: "Blue", color: "blue" },
  { value: "grey", label: "Grey", color: "grey" },
];

export const colorFilterOptions = [
  { value: 'black', label: 'Black' },
  { value: 'black/red', label: 'Black/Red' },
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'white', label: 'White' },
]

export const useVFMultiFilter = ({
  multiFilter,
  onMultiFilterChange,
}: UseVFMultiFilterProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

  const handleSelectChange = useCallback(({
    newValue,
    header,
    filterId,
    parentId,
    attributeName
  }: SelectChangeParams) => {

    const selectedValues = newValue
      ? newValue.map((item: any) => item.value)
      : [];

    setSelectedOptions((prev) => ({
      ...prev,
      [header]: selectedValues,
    }));

    const parentFilter = multiFilter[parentId];

    const existingFilters = parentFilter.filters.filter(
      (f: BPRFilter) => f.name !== filterId
    );

    const newFilters = selectedValues.map((value: string) => ({
      attributeName: attributeName || header,
      value: value,
      operator: "=",
      label: header,
      name: filterId,
    }));

    const updatedMultiFilter: BPRFilterState = {
      ...multiFilter,
      [parentId]: {
        ...parentFilter,
        filters: [...existingFilters, ...newFilters],
      },
    };

    onMultiFilterChange(updatedMultiFilter);
  }, [multiFilter, onMultiFilterChange]);

  const getSelectedValues = useCallback((header: string): string[] => {
    return selectedOptions[header] || [];
  }, [selectedOptions]);

  const setSelectedValues = useCallback((header: string, values: string[]) => {
    setSelectedOptions(prev => ({
      ...prev,
      [header]: values
    }));
  }, []);

  return {
    handleSelectChange,
    selectedOptions,
    getSelectedValues,
    setSelectedValues
  };
};