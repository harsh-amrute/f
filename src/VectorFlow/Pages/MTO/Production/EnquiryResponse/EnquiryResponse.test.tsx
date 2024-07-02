import React, { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EnquiryResponse from '.';
// Install this package if not already installed
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../context';
import {createStore} from '../../../../../redux/store/store'
import { setupReactQuery } from '../../../../../config/react-query-config';

// Mock useGetEnquiryResData hook
jest.mock('../../../../Services/MTO/Production/EnquiryResponse', () => ({
  useGetEnquiryResData: jest.fn(() => ({
    data: {
      data: {
        data: {
          results: [
            { id: 1, plnm: 'Plant A', it: { ItemType1: { proc_size: 10, prod_size: 20 } } },
            { id: 2, plnm: 'Plant B', it: { ItemType2: { proc_size: 15, prod_size: 25 } } },
          ],
        },
      },
    },
  })),
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

describe('EnquiryResponse', () => {
  it('renders EnquiryResponse component correctly', async () => {
    render(contextWrapper(<EnquiryResponse />, mockedStore));

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText('Department')).toBeInTheDocument();
      expect(screen.getByText('CCR Group')).toBeInTheDocument();
      expect(screen.getByText('CCR Name')).toBeInTheDocument();
    });

    // Check if Estimated Due Date and Note components are rendered
    expect(screen.getByText('Procurement Buffer')).toBeInTheDocument();
    expect(screen.getByText('Production Buffer')).toBeInTheDocument();
    expect(screen.getByText('Most Loaded CCR')).toBeInTheDocument();
    expect(screen.getByText('Earliest Readiness Date')).toBeInTheDocument();
  });

   it('opens and closes filter modal', async () => {
    render(contextWrapper(<EnquiryResponse />, mockedStore));

    // Open filter modal
    fireEvent.click(screen.getByText('Edit Filter'));
    
    // Assert that modal content is visible
    await waitFor(() => {
      expect(screen.getByText('Select Filter')).toBeInTheDocument();
    });
    
    // Simulate clicking "Go Back!" to close the modal
    fireEvent.click(screen.getByText('Go Back!'));

    // Assert that modal content is no longer in the document
    await waitFor(() => {
      expect(screen.queryByText('Select Filter')).toBeNull();
    });
  });

});
