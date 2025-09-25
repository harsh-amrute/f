import { useState } from 'react';

interface FilterRow {
  id: number;
}

export const useFilterRows = (initialCount = 1, maxRows = 5) => {
  const [filterRows, setFilterRows] = useState<FilterRow[]>(
    Array(initialCount).fill(null).map(() => ({ id: Date.now() + Math.random() }))
  );

  const addFilterRow = () => {
    if (filterRows.length < maxRows) {
      setFilterRows([...filterRows, { id: Date.now() + Math.random() }]);
    }
  };

  const removeFilterRow = (id: number) => {
    if (filterRows.length > 1) {
      setFilterRows(filterRows.filter(row => row.id !== id));
    }
  };

  return {
    filterRows,
    addFilterRow,
    removeFilterRow,
    isMaxRows: filterRows.length >= maxRows,
    isMinRows: filterRows.length <= 1
  };
};

export const stringOpertors = [
    { label: "Equal to", value: "eq"},
    { label: "Not Equal to", value: "neq"},
    { label: "Does not contain", value: "ncontains"},
    { label: "Starts With", value: "starts"},
    { label: "Does not start with", value: "nstarts"},
    { label: "Ends with", value: "ends"},
    { label: "Does not end with", value: "nends"},
    { label: "Has no value", value: "null"},
]

export const numericOperators = [
  { label: "Equal to", value: "eq"},
  { label: "Greater than", value: "greater"},
  { label: "Less than", value: "less"},
  { label: "Greater than equal to", value: "greaterEq"},
  { label: "Less than equal to", value: "lessEq"},
  { label: "Not equal", value: "notEq"},
]