import '@testing-library/jest-dom/extend-expect';
import OrderAtRisk from '.';
import { ReactNode } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupReactQuery } from '../../../../../../config/react-query-config';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../../context';
import { createStore } from '../../../../../../redux/store/store';
import { useGetOrderRiskData } from '../../../../../Services/MTO/Production/InsightsAndTrends/OrderAtRisk';

jest.mock('ag-charts-react');
jest.mock('../../../../../Services/MTO/Production/InsightsAndTrends/OrderAtRisk');

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

describe('Order At Risk Component', () => {

  global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };

  beforeEach(() => {
    // Mock API response
    (useGetOrderRiskData as jest.Mock).mockReturnValue({
      data: {
        data: {
          r: [
            { r: 'Reason 1', bo: 10, ro: 5 },
            { r: 'Reason 2', bo: 15, ro: 10 }
          ],
          g: [
            { bpp: 'BPP 1', plnt: 'Plant 1', oid: 'Order 1', otyp: 'Type 1', li_id: 'Line 1', itmc: 'Code 1', itmd: 'Desc 1', oqty: 100, mjr_r: 'Major 1', min_r: 'Minor 1', cc: 'Customer 1', cn: 'Name 1' }
          ]
        }
      },
      isLoading: false
    });
  });

  it('renders component and toggles view', async () => {
    render(contextWrapper(<OrderAtRisk />, mockedStore));

    // Wait for loading to be false and data to be rendered
    await waitFor(() => expect(screen.queryByTestId('grid-view')).not.toBeInTheDocument());

    fireEvent.click(screen.getByText('Grid View'));

    await waitFor(() => {
      expect(screen.queryByTestId('grid-view')).toBeInTheDocument();
      expect(screen.getByText('BPP')).toBeInTheDocument();
      expect(screen.getByText('Plant')).toBeInTheDocument();
      expect(screen.getByText('Order Id')).toBeInTheDocument();
      expect(screen.getByText('Order Type')).toBeInTheDocument();
      expect(screen.getByText('Line Item Id')).toBeInTheDocument();
      expect(screen.getByText('Item Code')).toBeInTheDocument();
      expect(screen.getByText('Item Description')).toBeInTheDocument();
      expect(screen.getByText('Order Quantity')).toBeInTheDocument();
      expect(screen.getByText('Major Reason')).toBeInTheDocument();
      expect(screen.getByText('Minor Reason')).toBeInTheDocument();
      expect(screen.getByText('Customer Code')).toBeInTheDocument();
      expect(screen.getByText('Customer Name')).toBeInTheDocument();
    });
  });

  it('renders MTOActionToolBar component', async () => {
    render(contextWrapper(<OrderAtRisk />, mockedStore));

    await waitFor(() => {
      expect(screen.queryByText('+ Add Filter')).toBeInTheDocument();
      expect(screen.queryByText('Chart View')).toBeInTheDocument();
      expect(screen.queryByText('Grid View')).toBeInTheDocument();
    });
  });

});
