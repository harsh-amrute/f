import { render, screen } from '@testing-library/react';
import { setupReactQuery } from '../../../../../../config/react-query-config';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../../context';
import { createStore } from '../../../../../../redux/store/store';
import OrderRescheduling from '.';
import { useGetOrderSchedulingData } from '../../../../../../VectorFlow/Services/MTO/Production/OrderRescheduling';

const queryClient = setupReactQuery();

const dummyStore: any = {
    AnalyticsData: {}
}

const mockedStore = createStore(dummyStore)

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

jest.mock('../../../../../../VectorFlow/Services/MTO/Production/OrderRescheduling', () => ({
    useGetOrderSchedulingData: jest.fn()
}));

describe("OrderRescheduling Component", () => {
    beforeEach(() => {
        (useGetOrderSchedulingData as jest.Mock).mockReturnValue({
            mutateAsync: jest.fn().mockResolvedValue({
                data: {
                    data: {
                        results: []
                    }
                }
            })
        });
    });



    // works
    test("Tabs are rendered correctly", () => {
        render(contextWrapper(<OrderRescheduling />, mockedStore));
        const unscheduleTab = screen.getAllByText(/Unschedule/i);
        const overwriteDueDateTab = screen.getAllByText(/Overwrite Due Date/i);
        expect(unscheduleTab[0]).toBeInTheDocument();
        expect(overwriteDueDateTab[0]).toBeInTheDocument();
    });



    test("Buttons are rendered based on current tab", () => {
        render(contextWrapper(<OrderRescheduling />, mockedStore));
        const unscheduleButton = screen.getAllByText(/Unschedule/i);
        expect(unscheduleButton[0]).toBeInTheDocument();

        // Simulate tab change to "Overwrite Due Date"
        const overwriteDueDateTab = screen.getAllByText(/Overwrite Due Date/i);
        overwriteDueDateTab[0].click();
        const overwriteDueDateButton = screen.getAllByText(/Overwrite Due Date/i);
        expect(overwriteDueDateButton[0]).toBeInTheDocument();
    });

    test("Data fetching function is called once", async () => {
        render(contextWrapper(<OrderRescheduling />, mockedStore));
        expect(useGetOrderSchedulingData().mutateAsync).toHaveBeenCalledTimes(1);
    });
});
