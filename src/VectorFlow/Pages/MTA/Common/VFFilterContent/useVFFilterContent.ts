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