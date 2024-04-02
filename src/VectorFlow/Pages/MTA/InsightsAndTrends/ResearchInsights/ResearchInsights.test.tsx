import { render, screen} from '@testing-library/react';
import { UserDataContext } from "../../../../../context";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { setupReactQuery } from "../../../../../config/react-query-config";
import { useGetBPRData,useGetBPRUIConfiguration } from '../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR';
import { GetBPRDataMockResponse,GetBPRUIConfigurationMockResponse} from '../../../../../mock-data/BPR';
import ResearchInsights from './index';

import { ReactNode } from "react";
import { Provider } from "react-redux";
import {store} from "../../../../../redux/store/store";


// Mock context data

jest.mock('../../../../Services/MTA/SupplyChainIntelligenceHub/BPR')

const mockContextValue = {
  user: { user: { theme_ui: "NOIRFUSION" } },
  changeColorTheme: jest.fn(),
  isSideBarOpen: true,
  toggleSideBar: jest.fn()
};

// Mock the query client
const queryClient = setupReactQuery();


const useGetBPRDataMock = useGetBPRData as jest.MockedFunction<
  typeof useGetBPRData
>

const useGetBPRUIConfigurationMock = useGetBPRUIConfiguration as jest.MockedFunction<
    typeof useGetBPRUIConfiguration
  >;



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

describe('Research and insights Component', () => {
  global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };

  beforeEach(() => {

    useGetBPRUIConfigurationMock.mockImplementation(():any=>{
        return {data: {data:GetBPRUIConfigurationMockResponse},isLoading:false};
      })
  

    useGetBPRDataMock.mockImplementation(():any=>{
      return {
        mutateAsync:()=>{
          return {data:GetBPRDataMockResponse}
        }
      }
    })


  });
  it('renders loader when isLoading is true', () => {
    useGetBPRUIConfigurationMock.mockImplementation(():any=>{
        return {data: {data:GetBPRUIConfigurationMockResponse},isLoading:true};
      })
      render(contextWrapper(<ResearchInsights />,store));
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders BPR layout properly', () => {
    render(contextWrapper(<ResearchInsights />,store));
    // Add your assertions here to ensure the layout renders correctly
  });
});



  