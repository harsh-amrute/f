import { render, screen } from '@testing-library/react';
import React from 'react';
import VFTable from './';

describe('should render the VFTable component', () => {
    const ref = React.createRef<any>();
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
  
  it("Shoudl render the table in the DOM",()=>{
    render(<VFTable rowData={rowData} columnDefs={columnDefs} ref={ref}  onColumnVisible={jest.fn()}/>);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  })

  it("Should export the grid data to excel",()=>{
    render(<VFTable rowData={rowData} columnDefs={columnDefs} ref={ref}  onColumnVisible={jest.fn()}/>);
    ref.current.api.exportDataAsExcel()
    
  })

});
