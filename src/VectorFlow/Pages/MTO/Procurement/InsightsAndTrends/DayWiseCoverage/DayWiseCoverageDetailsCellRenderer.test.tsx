import { render } from '@testing-library/react';
import DayWiseCoverageDetailsCellRenderer from './DayWiseCoverageDetailsCellRenderer';

import { QueryClientProvider } from '@tanstack/react-query';
import { setupReactQuery } from '../../../../../../config/react-query-config';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../../context';
import { createStore } from '../../../../../../redux/store/store';

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

describe('DayWise Coverage Details Cell Renderer', () => {
    it('renders without crashing', () => {
        const data = {
            data: {
                children: []
            }
        }
        render(contextWrapper(<DayWiseCoverageDetailsCellRenderer {...data} />, mockedStore));
    });
})
