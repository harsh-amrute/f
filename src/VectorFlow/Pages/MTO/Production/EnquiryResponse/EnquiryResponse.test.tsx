import { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EnquiryResponse from '.';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../context';
import {createStore} from '../../../../../redux/store/store'
import { setupReactQuery } from '../../../../../config/react-query-config';
import Note from './Note';

jest.mock('../../../../Services/MTO/Production/EnquiryResponse');
jest.mock('../../../../../../src/components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar', () => (props: any) => (
  <div data-testid="action-toolbar">
    {props.selectedFilters.map((filter: any, index: any) => (
      <div key={index}>{filter.label}</div>
    ))}
    <button onClick={props.onAddFilter}>+ Add Filter</button>
  </div>
));

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
  global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };
  

  it('renders without crashing', () => {
    render(contextWrapper(<EnquiryResponse />, mockedStore));
  });

  it('displays table data', () => {
    render(contextWrapper(<EnquiryResponse />, mockedStore));
    expect(screen.getByTestId('table-wrapper')).toBeInTheDocument();
  });

  it('applies filters correctly',async () => {
    render(contextWrapper(<EnquiryResponse />, mockedStore));

    // Open filter modal
    fireEvent.click(screen.getByText('+ Add Filter'));
    
    // Assert that modal content is visible
    await waitFor(() => {
      expect(screen.getByText('Select Filter')).toBeInTheDocument();
    });
    
    // Simulate clicking "Apply" to apply filters
    fireEvent.click(screen.getByText('Apply Filter'));

    // Assert that modal content is no longer in the document
    await waitFor(() => {
      expect(screen.getByTestId('table-wrapper')).toHaveTextContent('Plant Department CCR Group CCR Name FOL ( in Days ) No Rows To Show');
    });
  });

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
    fireEvent.click(screen.getByText('+ Add Filter'));
    
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

  it('displays note message', () => {
    render(<Note type="danger" message={<p>test-message</p>} />);
    expect(screen.getByText('test-message')).toBeInTheDocument();
  });

  it('shows blur cover when no product group selected', () => {
    render(contextWrapper(<EnquiryResponse />, mockedStore));
    expect(screen.getByText('Please select filter for product group to view estimated due date')).toBeInTheDocument();
  });

  it('switches tabs correctly', () => {
    render(contextWrapper(<EnquiryResponse />,mockedStore));
    const rmNotAvailableTab = screen.getByText('RM Not Available');
    const rmAvailableTab = screen.getByText('RM Available');
    
    fireEvent.click(rmAvailableTab);
    expect(screen.getByText('Production Buffer')).toBeInTheDocument();
    
    fireEvent.click(rmNotAvailableTab);
    expect(screen.getByText('Procurement Buffer')).toBeInTheDocument();
  });

  it('To check if no data is available', async () => {
    render(contextWrapper(<EnquiryResponse />, mockedStore));

    // Open Modal
    fireEvent.click(screen.getByText('+ Add Filter'));
    await waitFor(() => {
      expect(screen.getByText('Select Filter')).toBeInTheDocument();
    });
    // Find the input field and add value
    const input = screen.getByTestId('plntNmInput');
    fireEvent.change(input, { target: { value: 'Plant 1' } });

    fireEvent.click(screen.getByText('Apply Filter'));
    await waitFor(() => {
      expect(screen.queryByText('Select Filter')).toBeNull();
      expect(screen.getByTestId('table-wrapper')).toHaveTextContent('No Rows To Show');
    });
  });
});
