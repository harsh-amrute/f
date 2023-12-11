import { render, screen } from '@testing-library/react';
import React from 'react';
import VFTable from './';

describe('should render the VFTable component', () => {
    window.URL.createObjectURL = jest.fn();
    
  const rowData = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 },
  ];

  const columnDefs = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Age', field: 'age' },
  ];

  const agGridProps = {
    rowData:rowData,
    columnDefs:columnDefs,
    columnVisible:jest.fn()
  }
  
  it("Should render the table in the DOM",()=>{
    render(<VFTable {...agGridProps}/>);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  })

});
