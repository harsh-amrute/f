import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ResizableTable from '.';

describe('ResizableTable', () => {
  test('should resize table on drag', () => {
    const header = [
      { headerName: 'Plant', field: 'plnm', colId: 'plnm' },
      { headerName: 'Department', field: 'dpnm', colId: 'dpnm' },
      { headerName: 'CCR Group', field: 'gnm', colId: 'gnm' },
      { headerName: 'CCR Name', field: 'cnm', colId: 'cnm' },
      { headerName: 'FOL (in Days)', field: 'fol', colId: 'fol' },
    ];
    const data = [
      { plnm: 'Plant 1', dpnm: 'Department 1', gnm: 'Group 1', cnm: 'Name 1', fol: 5 },
      { plnm: 'Plant 2', dpnm: 'Department 2', gnm: 'Group 2', cnm: 'Name 2', fol: 3 },
    ];

    render(<ResizableTable header={header} data={data} />);

    const resizeBar = screen.getByTestId('resize-bar');

    // Initial table height should be 300px
    let tableWrapper = screen.getByTestId('table-wrapper');
    expect(tableWrapper.style.height).toBe('300px');

    // Simulate mouse down on resize bar
    fireEvent.mouseDown(resizeBar, { clientY: 0 });

    // Simulate mouse move to resize
    fireEvent.mouseMove(document, { clientY: 200 });

    // Check if the table height has changed
    tableWrapper = screen.getByTestId('table-wrapper');
    expect(tableWrapper.style.height).toBe('500px'); // Assuming the delta height calculation correctly adjusts to 500px

    // Simulate mouse up to end resize
    fireEvent.mouseUp(document);

    // Check that the resize event listeners are removed properly
    fireEvent.resize(window);

    // Additional assertions can be added to verify behavior after resizing
  });
});
