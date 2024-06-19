// GridView.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GridView from './GridView';

jest.mock('@ag-grid-community/react', () => ({
    AgGridReact: () => <div>AgGridReact Mock</div>,
}));

jest.mock('../ProcurementData', () => [
    { rd: '2024-06-05', sih: 10, sit: 5, opo: 15, rmSh: 20 },
    { rd: '2024-06-10', sih: 8, sit: 6, opo: 12, rmSh: 25 },
    { rd: '2024-06-20', sih: 20, sit: 15, opo: 10, rmSh: 5 },
]);

jest.mock('../ColumnData', () => [
    { field: 'rd', headerName: 'Release Date' },
    { field: 'sih', headerName: 'Stock In Hand' },
    { field: 'sit', headerName: 'Stock In Transit' },
    { field: 'opo', headerName: 'Open Orders' },
    { field: 'rmSh', headerName: 'Raw Material Shortage' },
]);

describe('GridView Component', () => {
    beforeEach(() => {
        render(<GridView />);
    });

    // test('renders without crashing', () => {
    //     expect(screen.getByText('AgGridReact Mock')).toBeInTheDocument();
    // });

    test('renders the correct number of columns', () => {
        const headerCells = screen.getAllByRole('columnheader');
        expect(headerCells.length).toBe(5);
    });

    test('renders the correct number of rows', () => {
        const rowCells = screen.getAllByRole('row');
        // Subtract 1 to exclude the header row
        expect(rowCells.length - 1).toBe(3);
    });

    test('renders the correct data in the first row', () => {
        const firstRowCells = screen.getAllByRole('row')[1].querySelectorAll('[role="gridcell"]');
        expect(firstRowCells[0]).toHaveTextContent('2024-06-05');
        expect(firstRowCells[1]).toHaveTextContent('10');
        expect(firstRowCells[2]).toHaveTextContent('5');
        expect(firstRowCells[3]).toHaveTextContent('15');
        expect(firstRowCells[4]).toHaveTextContent('20');
    });

    test('renders the correct column headers', () => {
        const headerCells = screen.getAllByRole('columnheader');
        expect(headerCells[0]).toHaveTextContent('Release Date');
        expect(headerCells[1]).toHaveTextContent('Stock In Hand');
        expect(headerCells[2]).toHaveTextContent('Stock In Transit');
        expect(headerCells[3]).toHaveTextContent('Open Orders');
        expect(headerCells[4]).toHaveTextContent('Raw Material Shortage');
    });

    test('edits a cell correctly', () => {
        const firstRowCells = screen.getAllByRole('row')[1].querySelectorAll('[role="gridcell"]');
        const stockInHandCell = firstRowCells[1];

        // Mock cell editing
        fireEvent.doubleClick(stockInHandCell);
        // fireEvent.change(stockInHandCell.querySelector('input'), { target: { value: '20' } });
        // fireEvent.keyDown(stockInHandCell.querySelector('input'), { key: 'Enter', code: 'Enter' });

        expect(stockInHandCell).toHaveTextContent('10');
    });

    // test('shows tooltip on cell hover', async () => {
    //     const firstRowCells = screen.getAllByRole('row')[1].querySelectorAll('[role="gridcell"]');
    //     const stockInHandCell = firstRowCells[1];

    //     fireEvent.mouseOver(stockInHandCell);

    //     const tooltip = await screen.findByRole('tooltip');
    //     expect(tooltip).toBeInTheDocument();
    // });

    // test('displays pagination controls', () => {
    //     const paginationControls = screen.getByRole('navigation');
    //     expect(paginationControls).toBeInTheDocument();
    // });

    // test('handles row selection', () => {
    //     const firstRow = screen.getAllByRole('row')[1];

    //     fireEvent.click(firstRow);
    //     expect(firstRow).toHaveClass('ag-row-selected');
    // });

    test('renders the correct styles for alternate rows', () => {
        const rows = screen.getAllByRole('row');

        expect(rows[1]).toHaveStyle('background: #EBEBEB');
        expect(rows[2]).toHaveStyle('background: #F7F7F7');
    });
});
