import React, { ReactNode } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ResizableTable from '.';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../../context';
import { createStore } from '../../../../../../redux/store/store';
import { setupReactQuery } from '../../../../../../config/react-query-config';
import { BrowserRouter as Router } from 'react-router-dom';


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

describe('ResizableTable', () => {
  test('should resize table on drag', () => {
    const header = [
      { headerName: 'Plant', field: 'plnm', colId: 'plnm' },
      { headerName: 'Department', field: 'dpnm', colId: 'dpnm' },
      { headerName: 'CCR Group', field: 'gnm', colId: 'gnm' },
      { headerName: 'CCR Name', field: 'cnm', colId: 'cnm' },
      { headerName: 'FOL (in Days)', field: 'fol', colId: 'fol' },
    ];
    const data = [
      { plnm: 'Plant 1', dpnm: 'Department 1', gnm: 'Group 1', cnm: 'Name 1', fol: 5 },
      { plnm: 'Plant 2', dpnm: 'Department 2', gnm: 'Group 2', cnm: 'Name 2', fol: 3 },
    ];

    render(contextWrapper(<ResizableTable header={header} data={data} />, mockedStore));

    const resizeBar = screen.getByTestId('resize-bar');

    // Initial table height should be 300px
    let tableWrapper = screen.getByTestId('table-wrapper');
    expect(tableWrapper.style.height).toBe('300px');

    // Simulate mouse down on resize bar
    fireEvent.mouseDown(resizeBar, { clientY: 0 });

    // Simulate mouse move to resize
    fireEvent.mouseMove(document, { clientY: 200 });

    // Check if the table height has changed
    tableWrapper = screen.getByTestId('table-wrapper');
    expect(tableWrapper.style.height).toBe('500px'); // Assuming the delta height calculation correctly adjusts to 500px

    // Simulate mouse up to end resize
    fireEvent.mouseUp(document);

    // Check that the resize event listeners are removed properly
    fireEvent.resize(window);

    // Additional assertions can be added to verify behavior after resizing
  });
});
