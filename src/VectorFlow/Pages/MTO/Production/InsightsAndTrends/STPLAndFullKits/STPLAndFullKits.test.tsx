import '@testing-library/jest-dom/extend-expect';
import STPLAndFullKits from '.';

import { ReactNode } from 'react';

import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import { setupReactQuery } from '../../../../../../config/react-query-config';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../../context';
import { createStore } from '../../../../../../redux/store/store';

jest.mock('ag-charts-react');


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

describe('STPLAndFullKits Component', () => {

    global.ResizeObserver = class MockedResizeObserver {
        observe = jest.fn();
        unobserve = jest.fn();
        disconnect = jest.fn();
      };

  it('renders component and toggles view',async () => {
    render(contextWrapper(<STPLAndFullKits />, mockedStore));

    // Check initial rendering
    expect(screen.getByTestId('stpl-graph')).toBeInTheDocument();
    expect(screen.getByTestId('fullKit-graph')).toBeInTheDocument();
    expect(screen.queryByTestId('grid-view')).not.toBeInTheDocument();

    // Toggle view
    fireEvent.click(screen.getByText('Grid View'));

    // Check rendering after toggling view
    await waitFor(()=>{
        expect(screen.queryByTestId('stpl-graph')).not.toBeInTheDocument();
        expect(screen.queryByTestId('fullKit-graph')).not.toBeInTheDocument();
        expect(screen.queryByTestId('grid-view')).toBeInTheDocument();
        expect(screen.getByText('Plant')).toBeInTheDocument();
        expect(screen.getByText('Department')).toBeInTheDocument();
        expect(screen.getByText('CCR Group')).toBeInTheDocument();
        expect(screen.getByText('CCR Name')).toBeInTheDocument();
        expect(screen.getByText('Released WIP In Days')).toBeInTheDocument();
        expect(screen.getByText('Unreleased Full Kit In Days')).toBeInTheDocument();
      
    })
  });

  it('renders MTOActionToolBar component', () => {
    render(contextWrapper(<STPLAndFullKits />, mockedStore));

    expect(screen.queryByText('+ Add Filter')).toBeInTheDocument();
    expect(screen.queryByText('Chart View')).toBeInTheDocument();
    expect(screen.queryByText('Grid View')).toBeInTheDocument();
  });

});


