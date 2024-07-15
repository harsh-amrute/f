import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GridView from './GridView';
import procData from '../ProcurementData';
import columnData from '../ColumnData';
import { InsightsAndTrendsString } from '../../../../../../../VectorFlow/Pages/MTO/Common/String';
import { ColDef } from 'ag-grid-enterprise';
import { Order } from '../../../../../../../VectorFlow/types/MTO';
import { QueryClientProvider } from '@tanstack/react-query';
import { AgGridReactProps } from 'ag-grid-react';
import { setupReactQuery } from '../../../../../../../config/react-query-config';
import { createStore } from '../../../../../../../redux/store/store';
import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../../../context';

const queryClient = setupReactQuery();

const dummyStore: any = {
    AnalyticsData: {}
};

const mockedStore = createStore(dummyStore);

const contextWrapper = (children: ReactNode, store: any) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Provider store={store}>
                    <UserDataContext.Provider
                        value={{
                            user: { user: { theme_ui: "NOIRFUSION" } },
                            changeColorTheme: (color) => {
                                return color;
                            },
                            isSideBarOpen: true, toggleSideBar: jest.fn
                        }}
                    >
                        {children}
                    </UserDataContext.Provider>
                </Provider>
            </Router>
        </QueryClientProvider>
    );
};


const agGridProps: AgGridReactProps = {
    tooltipShowDelay: 0,
    tooltipTrigger: "focus",
    gridOptions: {
        rowHeight: 50,
        getRowStyle: (params: any) => {
            return {
                background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
            };
        },

        rowSelection: 'multiple',
        suppressRowClickSelection: true,
        enableBrowserTooltips: true,
        enableRangeSelection: true,

        pagination: true,
        defaultColDef: {
            cellStyle: {
                'text-align': 'center',
                'height': '50px',
                "font-style": "normal",
                "font-variant": "normal",
                "font-weight": "300",
                "font-size": "20px",
                "font-family": "Roboto",
                'text-overflow': 'ellipsis',
                'white-space': 'nowrap',
                'resizable': 'true',
            },
        },

    },
    masterDetail: true,

    paginationAutoPageSize: true,
    enterNavigatesVertically: true,
    enterNavigatesVerticallyAfterEdit: true,
    groupDefaultExpanded: 0,

    onCellEditingStopped(event: any) {
        const field = event.colDef.field;
        // const newValue = event.newValue;
        const rowIndex = event.rowIndex;

        if (!field || rowIndex == null) {
            return;
        }
    }
};

// const [ShortageColumns, setShortageColumns] = useState(columnData);
const ShortageColumns = columnData;

const mapDataToColumns = (data: Order[], columns: ColDef[]) => {
    return data.map(item => {
        const mappedItem: any = {};
        columns.forEach(column => {
            if (column.field) {
                if (column.field === "rmpm") {
                    if (item['or'] > 0) {
                        mappedItem[column.field] = InsightsAndTrendsString.ordersWithRMPM;
                    }
                    else if (item['po'] > 0) {
                        mappedItem[column.field] = InsightsAndTrendsString.ordersWithFullkitOPO;
                    }
                    else if (item['sit'] > 0) {
                        mappedItem[column.field] = InsightsAndTrendsString.ordersWithFullkitSIT;
                    }
                    else {
                        mappedItem[column.field] = InsightsAndTrendsString.ordersWithFullkitOHS;
                    }
                }
                else {
                    mappedItem[column.field] = item[column.field as keyof Order];
                }
            }
        });
        return mappedItem;
    });
};

const convertedData = mapDataToColumns(procData, columnData);
const ShortageDatas = convertedData;

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
        render(contextWrapper(<GridView agGridProps={agGridProps} ShortageColumns={ShortageColumns} ShortageDatas={ShortageDatas} />, mockedStore));
    });

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
        expect(stockInHandCell).toHaveTextContent('10');
    });

    test('renders the correct styles for alternate rows', () => {
        const rows = screen.getAllByRole('row');

        expect(rows[1]).toHaveStyle('background: #EBEBEB');
        expect(rows[2]).toHaveStyle('background: #F7F7F7');
    });
});
