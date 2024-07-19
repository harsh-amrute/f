import React, { ReactNode } from 'react';
import BTMTA from './index';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { setupReactQuery } from '../../../../../../../config/react-query-config';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../../../context';
import { createStore } from '../../../../../../../redux/store/store';

const queryClient = setupReactQuery();

const dummyStore: any = {
    AnalyticsData: {}
}

const dummyData = [{}];

afterEach(() => {
    jest.resetAllMocks(); // Reset mocks after each test
});

jest.mock('ag-charts-react', () => ({
    AgChartsReact: jest.fn(() => <div data-testid="mock-ag-charts-react"></div>),
}));

jest.mock('ag-charts-community', () => ({
    AgCharts: {
        download: jest.fn(),
    },
}));

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

describe('BTMTA Component', () => {

    test('renders BTMTA component with isMTO prop as false', () => {
        render(contextWrapper(<BTMTA data={dummyData} isMTO={false} />, mockedStore));

        expect(screen.getByText(/Select Horizon/i)).toBeInTheDocument();
    });

    test('renders BTMTA component with isMTO prop as true', () => {
        render(contextWrapper(<BTMTA data={dummyData} isMTO={true} />, mockedStore));

        expect(screen.getByText(/Select Horizon/i)).toBeInTheDocument();
    });


    test('toggles between Percentage and Absolute Value and updates the chart', async () => {
        render(contextWrapper(<BTMTA data={dummyData} isMTO={false} />, mockedStore));

        const capsuleButton = screen.getByText('Percentage');
        fireEvent.click(capsuleButton);

        await waitFor(() => {
            expect(screen.getByText('Absolute Value')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Absolute Value'));

        await waitFor(() => {
            expect(screen.getByText('Percentage')).toBeInTheDocument();
        });
    });


});
