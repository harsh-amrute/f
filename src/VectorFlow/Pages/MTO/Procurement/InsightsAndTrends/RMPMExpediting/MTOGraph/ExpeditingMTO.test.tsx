import React, { ReactNode } from 'react';
import ExpeditingMTO from './ExpeditingMTO';
import { render, screen } from '@testing-library/react';
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

describe('Expediting MTO Component', () => {

    test('renders Expediting MTO component with isMTO prop as false', () => {
        render(contextWrapper(<ExpeditingMTO isMTO={false} date={'2023-12-12'} />, mockedStore));

        expect(screen.getByText(/Select Horizon/i)).toBeInTheDocument();
    });

    test('renders Expediting MTO component with isMTO prop as true', () => {
        render(contextWrapper(<ExpeditingMTO isMTO={true} date={'2023-12-12'} />, mockedStore));

        expect(screen.getByText(/Select Horizon/i)).toBeInTheDocument();
    });


});
