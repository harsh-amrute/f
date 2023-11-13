import { render, screen } from '@testing-library/react';
import React from 'react';
import VFTable from './';

describe('should render the VFTable component', () => {
    const ref = React.createRef<any>();
    window.URL.createObjectURL = jest.fn(); //Mocking since the window object is not available

    // const refObj:object = {
    //     api:{
    //         exportDataAsExcel
    //     }
    // }

    
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
    render(<VFTable rowData={rowData} columnDefs={columnDefs} ref={ref} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  })

  it("Should resize the grid onGridReady",()=>{
    render(<VFTable rowData={rowData} columnDefs={columnDefs} ref={ref} />);
    // console.debug()
    ref.current.props.onGridReady();
    
  })

  it("Should export the grid data to excel",()=>{
    render(<VFTable rowData={rowData} columnDefs={columnDefs} ref={ref} />);
    ref.current.api.exportDataAsExcel()
    
  })

  it("Should resize the grid onColumnVisible",()=>{
    render(<VFTable rowData={rowData} columnDefs={columnDefs} ref={ref} />);
    ref.current.props.onColumnVisible()
    
  })

  it("Should resize the grid onGridSizeChanged",()=>{
    render(<VFTable rowData={rowData} columnDefs={columnDefs} ref={ref} />);
    ref.current.props.onGridSizeChanged()
    
  })

  it("Should resize the grid onToolPanelVisibleChanged",()=>{
    render(<VFTable rowData={rowData} columnDefs={columnDefs} ref={ref} />);
    ref.current.props.onToolPanelVisibleChanged()
    
  })

  
  

//   const headers = screen.getAllByRole('columnheader');
//   expect(headers.length).toBe(3);
//   expect(headers[0]).toHaveTextContent('ID');
//   expect(headers[1]).toHaveTextContent('Name');
//   expect(headers[2]).toHaveTextContent('Age');

//   const rows = screen.getAllByRole('row');
//   expect(rows.length).toBe(2);

//   const row1Cells = rows[0].querySelectorAll('td');
//   expect(row1Cells.length).toBe(3);
//   expect(row1Cells[0]).toHaveTextContent('1');
//   expect(row1Cells[1]).toHaveTextContent('John Doe');
//   expect(row1Cells[2]).toHaveTextContent('30');

//   const row2Cells = rows[1].querySelectorAll('td');
//   expect(row2Cells.length).toBe(3);
//   expect(row2Cells[0]).toHaveTextContent('2');
//   expect(row2Cells[1]).toHaveTextContent('Jane Doe');
//   expect(row2Cells[2]).toHaveTextContent('25');
});
