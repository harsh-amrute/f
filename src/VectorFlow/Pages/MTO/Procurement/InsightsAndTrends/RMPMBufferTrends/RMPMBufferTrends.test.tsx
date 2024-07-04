
import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RMPMBufferTrends from './index';
import { setupReactQuery } from '../../../../../../config/react-query-config';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../../context';
import { createStore } from '../../../../../../redux/store/store';

const queryClient = setupReactQuery();

const dummyStore: any = {
    AnalyticsData: {}
}

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

class ResizeObserver {
    observe() { console.log('observe') }
    unobserve() { console.log('unobserve') }
    disconnect() { console.log('disconnect') }
}

window.ResizeObserver = ResizeObserver;

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

describe('RMPMBufferTrends Component', () => {

    test('renders both MTO and MTA panes in Allotment', () => {
        render(contextWrapper(<RMPMBufferTrends />, mockedStore));
        expect(screen.getAllByText(/RM \/ PM Buffer Trend/i).length).toBe(2);
    });
});
