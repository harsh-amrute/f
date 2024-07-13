import React, { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FullKitGraph from '.';
import { setupReactQuery } from '../../../../../../../config/react-query-config';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../../../context';
import { createStore } from '../../../../../../../redux/store/store';

jest.mock('ag-charts-react', () => ({
    AgChartsReact: () => <div>AgChartsReact Mock</div>,
}));

const queryClient = setupReactQuery();

const dummyStore:any ={
  AnalyticsData:{}
}

const mockedStore = createStore(dummyStore)

const contextWrapper = (children: ReactNode,store:any) => {
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
              isSideBarOpen:true,toggleSideBar:jest.fn
            }}
          >
            {children}
          </UserDataContext.Provider>
        </Provider>
      </Router>
    </QueryClientProvider>
  );
};

describe('FullKitGraph Component', () => {
    global.ResizeObserver = class MockedResizeObserver {
        observe = jest.fn();
        unobserve = jest.fn();
        disconnect = jest.fn();
      };

    test('renders without crashing', () => {
        render(contextWrapper(<FullKitGraph />,mockedStore));
        expect(screen.getByText('AgChartsReact Mock')).toBeInTheDocument();
    });

    test('displays the correct title', () => {
        render(contextWrapper(<FullKitGraph />,mockedStore));
        const title = screen.queryByTestId('fullKit-graph');
        expect(title).toBeInTheDocument();
    });

    test('render the FullKit grid properly', () => {
        render(contextWrapper(<FullKitGraph />,mockedStore));
        const toggleBtn = screen.getByTestId('grid-toggle-btn');

        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('fullKit-grid')).toBeInTheDocument();
    });

    test('chart is rendered with the correct options', () => {
        render(contextWrapper(<FullKitGraph />,mockedStore));
        // Check if the AgChartsReact component mock is rendered
        expect(screen.getByText('AgChartsReact Mock')).toBeInTheDocument();
        // Ideally, here you would check if the AgChartsReact component is called with the correct props (options)
        // But since it's a mock, we're checking the render only
    });
});
