import React from 'react';
import { render, screen } from '@testing-library/react';
import BPRViewTable from './BPRViewTable';

describe('BPRViewTable Component', () => {
  const colDefs = [
    { headerName: 'ID' },
    { headerName: 'Name', colId: 'name' },
    { headerName: 'Remarks', colId: 'remarks' },
  ];

  const rowData = [
    { id: 1, name: 'John Doe', remarks: 'Some remarks for testing' },
    { id: 2, name: 'Jane Smith', remarks: 'Some other remarks for testing' },
  ];

  it('renders table header and row data correctly', () => {
    render(<BPRViewTable colDefs={colDefs} rowData={rowData} />);


  });

  it('renders NULL for missing data', () => {
    const rowDataWithNull = [
      { id: 1, name: 'John Doe', remarks: 'Some remarks for testing' },
      { id: 2, name: 'Jane Smith' }, // Missing remarks data
    ];

    render(<BPRViewTable colDefs={colDefs} rowData={rowDataWithNull} />);

    const remarksRow2 = screen.getByText('NULL');

    expect(remarksRow2).toBeInTheDocument();
  });
});
