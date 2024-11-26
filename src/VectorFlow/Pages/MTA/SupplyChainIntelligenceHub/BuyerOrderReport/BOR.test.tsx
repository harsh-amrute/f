import {  render } from '@testing-library/react';
import { useGetBORUIConfiguration, useBORData, useBORDataCount , useSubmitBORRemark, useGetBORRemarkHistory,} from "../../../../Services/MTA/SupplyChainIntelligenceHub/BuyerOrderReport"
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


const useGetBORUIConfigurationMock = useGetBORUIConfiguration as jest.MockedFunction<
    typeof useGetBORUIConfiguration
  >;
  const useBORDataMock = useBORData as jest.MockedFunction<
    typeof useBORData
  >;
    const useBORDataCountMock = useBORDataCount as jest.MockedFunction<
    typeof useBORDataCount
  >;

  const useSubmitBORRemarkMock = useSubmitBORRemark as jest.MockedFunction<
  typeof useSubmitBORRemark
>

const useGetBORRemarkHistoryMock = useGetBORRemarkHistory as jest.MockedFunction<
  typeof useGetBORRemarkHistory
>

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

useSubmitBORRemarkMock.mockImplementation(():any=>{
  return{
    mutateAsync:()=>{
      return{data:{
        "recordCount": "10",
        "data": [],
        "status": 200,
        "msg": "Remark Submitted Successfully",
        "errorCount": null,
        "error": null,
        "conflictErrorCount": null,
        "conflictError": null
    }}
    }
  }
})

useGetBORRemarkHistoryMock.mockImplementation(():any=>{
  return{
    mutateAsync:()=>{
      return {data:{
        "recordCount": "10",
        "data": [
            {
                "author": "Akash Shewale",
                "date": "2023-10-20 10:20:12 am",
                "remark": "The SKU is having trouble with the order delivery please help us with suitable actions"
            },
        ],
        "status": 200,
        "msg": null,
        "errorCount": null,
        "error": null,
        "conflictErrorCount": null,
        "conflictError": null
    }}
    }
  }
})



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
