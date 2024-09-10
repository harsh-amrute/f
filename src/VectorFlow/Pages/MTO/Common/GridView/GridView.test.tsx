import React, { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridView from './';
import { notifyError, notifySuccess } from '../../../../../helpers/notify';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../context';
import { createStore } from '../../../../../redux/store/store';
import { setupReactQuery } from '../../../../../config/react-query-config';

// import OverlayLoader from '../../../../../VectorFlow/Pages/MTO/Common/Loader';
// import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination';

// Mock the dependencies
// jest.mock('../../../../../helpers/notify');
// jest.mock('../../../../../VectorFlow/Pages/MTO/Common/Loader', () => jest.fn(() => <div>Loading...</div>));
// jest.mock('../../../../../components/VectorFLOW/commons/VFPagination', () => jest.fn(() => <div>Pagination Component</div>));
// jest.mock('../../../../../components/VectorFLOW/commons/VFTable', () => jest.fn(() => <div>VFTable Component</div>));


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

describe('GridView Component', () => {

    const getDataMock = jest.fn();
    const setCurrentGridRefMock = jest.fn();

    const defaultProps = {
        getData: getDataMock,
        colDef: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        setCurrentGridRef: setCurrentGridRefMock,
        currentGridRef: null,
        columnState: [],
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should trigger getData on mount', () => {
        render(contextWrapper(<GridView {...defaultProps} />, mockedStore));

        expect(getDataMock).toHaveBeenCalledTimes(1);
        expect(getDataMock).toHaveBeenCalledWith({ graphflag: 0, page: 1 });
    });

    test('should apply column state when grid is ready', async () => {
        const currentGridRefMock = { current: { api: { applyColumnState: jest.fn() } } };

        render(contextWrapper(<GridView {...defaultProps} currentGridRef={currentGridRefMock} columnState={[{ colId: 'test' }]} colDef={[{ field: 'test' }]} />, mockedStore));

        await waitFor(() => {
            expect(currentGridRefMock.current.api.applyColumnState).toHaveBeenCalledWith({
                state: [{ colId: 'test' }],
                applyOrder: true,
            });
        });
    });

});
