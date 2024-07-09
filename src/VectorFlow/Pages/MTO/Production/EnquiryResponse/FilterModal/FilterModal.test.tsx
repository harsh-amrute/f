import { ReactNode } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterModal from '.';
import {createStore} from '../../../../../../redux/store/store'
import { setupReactQuery } from '../../../../../../config/react-query-config';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../../context';

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

describe('FilterModal Component', () => {
  const handleClose = jest.fn();
  const handleOkay = jest.fn();
  const handleOptionSelect = jest.fn();
  const handleNameChange = jest.fn();
  global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };

  const filters = [
    { key: 'filter1', heading: 'Filter 1', options: ['Option 1', 'Option 2'] },
    { key: 'filter2', heading: 'Filter 2', options: ['Option 3', 'Option 4'] },
  ];

  const selectedOptions = {
    plantName: 'Test Plant',
    productGroup: ['Option 1'],
    department: [],
    ccrGroup: [],
    ccrName: [],
  };

  it('renders modal when isOpen is true', () => {
    render(contextWrapper( <FilterModal
      isOpen={true}
      handleClose={handleClose}
      handleOkay={handleOkay}
      filters={filters}
      selectedOptions={selectedOptions}
      handleOptionSelect={handleOptionSelect}
      handleNameChange={handleNameChange}
    />,mockedStore)
     
    );

    expect(screen.getByText('Select Filter')).toBeInTheDocument();
    expect(screen.getByText('Resource Filters')).toBeInTheDocument();
    expect(screen.getByText('Filter 1')).toBeInTheDocument();
    expect(screen.getByText('Filter 2')).toBeInTheDocument();
  });

  it('calls handleOkay when apply button is clicked', () => {
    render(
      <FilterModal
        isOpen={true}
        handleClose={handleClose}
        handleOkay={handleOkay}
        filters={filters}
        selectedOptions={selectedOptions}
        handleOptionSelect={handleOptionSelect}
        handleNameChange={handleNameChange}
      />
    );

    fireEvent.click(screen.getByText('Apply Filter'));
    expect(handleOkay).toHaveBeenCalledTimes(1);
  });

  it('calls handleNameChange on input change', () => {
    render(
      <FilterModal
        isOpen={true}
        handleClose={handleClose}
        handleOkay={handleOkay}
        filters={filters}
        selectedOptions={selectedOptions}
        handleOptionSelect={handleOptionSelect}
        handleNameChange={handleNameChange}
      />
    );

    const input = screen.getByTestId('plntNmInput');
    fireEvent.change(input, { target: { value: 'New Plant' } });
    expect(handleNameChange).toHaveBeenCalledWith(expect.objectContaining({
        value: 'New Plant',
        name: 'plantName',
    }));
  });
});
