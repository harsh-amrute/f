import {  render, act } from '@testing-library/react';
import { useGetBORUIConfiguration, useBORData, useBORDataCount } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BuyerOrderReport"
import { mockBORData,mockBORCountData,mockBORUIConfigData} from "../../../../../mock-data/BOR";
import BuyerOrderReport from './';
jest.mock("../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BuyerOrderReport");
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { setupReactQuery } from "../../../../../config/react-query-config";



import { ReactNode } from "react";
import { Provider } from "react-redux";
import {store} from "../../../../../redux/store/store";
import { UserDataContext } from "../../../../../context";
import { GetDailyDataMockResponse } from '../../../../../mock-data/BPR';
import { useGetDailyData } from '../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR';


const useGetBORUIConfigurationMock = useGetBORUIConfiguration as jest.MockedFunction<
    typeof useGetBORUIConfiguration
  >;
  const useBORDataMock = useBORData as jest.MockedFunction<
    typeof useBORData
  >;
    const useBORDataCountMock = useBORDataCount as jest.MockedFunction<
    typeof useBORDataCount
  >;

  const useGetDailyDataMock = useGetDailyData as jest.MockedFunction<
  typeof useGetDailyData
>;

  window.URL.createObjectURL = jest.fn();

  const queryClient = setupReactQuery();

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

  
const useBORDataResult: any = {
  mutateAsync: () => {
    return { data: mockBORData };
  },
};

const useGetMasterUIConfigurationMockResult:any ={
  mutateAsync:()=>{
    return {
      data:{data: mockBORUIConfigData}  
    }
  }
}

const useGetBORCountResult: any = {
  mutateAsync: () => {
    return { data: mockBORCountData };
  },
};

describe("Renders BOR Component", ()=>{
    beforeEach(()=>{
        useGetBORUIConfigurationMock.mockImplementation(()=>{
            return useGetMasterUIConfigurationMockResult;
        });
        useBORDataCountMock.mockImplementation(()=>{
            return useGetBORCountResult;
        });
        useBORDataMock.mockImplementation(()=>{
            return useBORDataResult;
        });

        // useGetDailyDataMock.mockImplementation(():any=>{
        //   return{
        //     mutateAsync:()=>{
        //       return {
        //         data:{data: GetDailyDataMockResponse}
        //       }
        //     }
        //   }
          
        // })

    });
    it("renders Loading Overlay Component when loading", async()=>{
        
        render(contextWrapper(<BuyerOrderReport />,store));
    })
    //  it("renders BuyerOrderReport", async()=>{
    //     await act(async () => {
    //       render(contextWrapper(<BuyerOrderReport />,store));
    //       })
    // })

    //  it("Handles Pagination", async()=>{
    //     await act(async () => {
    //       render(contextWrapper(<BuyerOrderReport />,store));
    //       })

    //       const nextBtn = screen.getAllByAltText('pagination-next-arrow')
    //     fireEvent.click(nextBtn[0]);
    // })
})
