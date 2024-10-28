import { screen, render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useGetAvailabilityTrend,  useGetChronicUnavailabilityGridView, useGetAvailabilityAgeing, useGetDBMNormSuggestionLoc, useGetDBMNormSuggestionPie, useGetDBMNormSuggestionSKUs, useGetDBMNormSuggestionAgeing, useGetExcessInventorySku, useGetExcessInventoryValue, useGetChronicUnavailabilityLoc, useGetChronicUnavailabilitySku} from "../../../../Services/MTA/InsightsAndTrends";
import { GuidedInsights } from "../../../../../mock-data/GuidedInsights";
import GuidedInsight from ".";
import { UserDataContext } from "../../../../../context";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { setupReactQuery } from "../../../../../config/react-query-config";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import {store} from "../../../../../redux/store/store";

jest.mock("../../../../Services/MTA/InsightsAndTrends");
jest.mock("ag-charts-react", () => ({
  AgCharts: jest.fn(() => null) // Replace null with a mock component if needed
}));

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

const useGetAvailabilityTrendMock = useGetAvailabilityTrend as jest.MockedFunction<
    typeof useGetAvailabilityTrend
>;
//const useGetAvailabilityTrendData: any =   { data:{data: GuidedInsights.AvailabilityTrendData }}; 
const useGetAvailabilityTrendData: any = {
  mutateAsync: () => {
    return { data:{data: GuidedInsights.AvailabilityTrendData }};
  },
};   

const useGetChronicUnavailabilityGridViewMock = useGetChronicUnavailabilityGridView as jest.MockedFunction<
    typeof useGetChronicUnavailabilityGridView
>;
//const useGetChronicUnavailabilityGridViewData: any = { data: {data: GuidedInsights.ChronicGridViewData }};
const useGetChronicUnavailabilityGridViewData: any = {
  mutateAsync: () => {
    return { data: {data: GuidedInsights.ChronicGridViewData }};
  },
};

const useGetAvailabiltyAgeingViewMock = useGetAvailabilityAgeing as jest.MockedFunction<
    typeof useGetAvailabilityAgeing
>;
const useGetAvailabiltyAgeingViewMockData: any = {
  mutateAsync: () => {
    return { data: {data: GuidedInsights.AvailabilityAgeingtrend }};
  },
};

// const useGetDBMNormSuggestionLocMock = useGetDBMNormSuggestionLoc as jest.MockedFunction<
//     typeof useGetAvailabilityAgeing
// >;
const useGetDBMNormSuggestionLocMockData: any = {
  mutateAsync: () => {
    return { data: {data: GuidedInsights.DBMSuggestionsLoc }};
  },
};

// const useGetDBMNormSuggestionPieMock = useGetDBMNormSuggestionPie as jest.MockedFunction<
//     typeof useGetAvailabilityAgeing
// >;
const useGetDBMNormSuggestionPieMockData: any = {
  mutateAsync: () => {
    return { data: {data: GuidedInsights.DBMSuggestionsPie }};
  },
};

// const useGetDBMNormSuggestionSKUsMock = useGetDBMNormSuggestionSKUs as jest.MockedFunction<
//     typeof useGetAvailabilityAgeing
// >;
const useGetDBMNormSuggestionSKUsData: any = {
  mutateAsync: () => {
    return { data: {data: GuidedInsights.DBMSuggestionsSKUs }};
  },
};

// const useGetDBMNormSuggestionAgeingMock = useGetDBMNormSuggestionAgeing as jest.MockedFunction<
//     typeof useGetAvailabilityAgeing
// >;
const useGetDBMNormSuggestionAgeingData: any = {
  mutateAsync: () => {
    return { data: {data: GuidedInsights.DBMSuggestionAgeing }};
  },
};

const useGetExcessInventorySkuMock = useGetExcessInventorySku as jest.MockedFunction<
    typeof useGetAvailabilityAgeing
>;
const useGetExcessInventorySkuData: any = {
  mutateAsync: () => {
    return { data: {data: GuidedInsights.ExcessInventorySkuData }};
  },
};

const useGetExcessInventoryValueMock = useGetExcessInventoryValue as jest.MockedFunction<
    typeof useGetAvailabilityAgeing
>;
const useGetExcessInventoryValueData: any = {
  mutateAsync: () => {
    return { data: {data: GuidedInsights.ExcessInventoryValueData}};
  },
};

// const useGetChronicUnavailabilityLocMock = useGetChronicUnavailabilityLoc as jest.MockedFunction<
//     typeof useGetAvailabilityAgeing
// >;
const useGetChronicUnavailabilityLocData: any = {
  mutateAsync: () => {
    return { data: {data: GuidedInsights.ChronicUnavailabilityLocData}};
  },
};

// const useGetChronicUnavailabilitySkuMock = useGetChronicUnavailabilitySku as jest.MockedFunction<
//     typeof useGetAvailabilityAgeing
// >;
const useGetChronicUnavailabilitySkuData: any = {
  mutateAsync: () => {
    return { data: {data: GuidedInsights.ChronicUnavailabilitySkuData}};
  },
};




// const useGetChronicUnavailabilityLocMock = useGetChronicUnavailabilityLoc as jest.MockedFunction<
//     typeof useGetChronicUnavailabilityLoc
// >;
// const useGetChronicUnavailabilityLocData: any ={ data: 
//             {data: GuidedInsights.ChronicUnavailabilityLocData }};
// const useGetChronicUnavailabilityLocData: any = {
//   mutateAsync: () => {
//     return { data:{data: GuidedInsights.ChronicUnavailabilityLocData }};
//   },
// }; 
  
// const useGetChronicUnavailabilitySkuMock = useGetChronicUnavailabilitySku as jest.MockedFunction<
//     typeof useGetChronicUnavailabilitySku
// >;
//const useGetChronicUnavailabilitySkuData: any =  { data: {data: GuidedInsights.ChronicUnavailabilitySkuData }}; 
//    const useGetChronicUnavailabilitySkuData: any = {
//   mutateAsync: () => {
//     return { data: {data: GuidedInsights.ChronicUnavailabilitySkuData }};
//   },
// }; 
describe("Availability Trend Data", () => {
    global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };
     beforeEach(()=>{
        useGetAvailabilityTrendMock.mockImplementation(()=>{
            return useGetAvailabilityTrendData;
        })
         useGetChronicUnavailabilityGridViewMock.mockImplementation(()=>{
            return useGetChronicUnavailabilityGridViewData;
        })
        useGetAvailabiltyAgeingViewMock.mockImplementation(()=>{
          return useGetAvailabiltyAgeingViewMockData
        })
        // useGetDBMNormSuggestionLocMock.mockImplementation(()=>{
        //   return useGetDBMNormSuggestionLocMockData
        // })
        // useGetDBMNormSuggestionPieMock.mockImplementation(()=>{
        //   return useGetDBMNormSuggestionPieMockData
        // })
        // useGetDBMNormSuggestionSKUsMock.mockImplementation(()=>{
        //   return useGetDBMNormSuggestionSKUsData
        // })
        // useGetDBMNormSuggestionAgeingMock.mockImplementation(()=>{
        //   return useGetDBMNormSuggestionAgeingData
        // })
        useGetExcessInventorySkuMock.mockImplementation(()=>{
          return useGetExcessInventorySkuData
        })
        useGetExcessInventoryValueMock.mockImplementation(()=>{
          return useGetExcessInventoryValueData
        })
        // useGetChronicUnavailabilityLocMock.mockImplementation(()=>{
        //   return useGetChronicUnavailabilityLocData
        // })
        // useGetChronicUnavailabilitySkuMock.mockImplementation(()=>{
        //   return useGetChronicUnavailabilitySkuData
        // })

        })
    
    
     it("Renders Availability Tred Data", () => {
             
        render(contextWrapper(<GuidedInsight />,store));
    })
    
    it("On changing tab to Availability trend data ", async() => {

        render(contextWrapper(<GuidedInsight />,store));
         await act(async () => {
            
            fireEvent.click(screen.getAllByTestId('floatingTabButton')[0])
        })
       
    })
    //   it("On changing tab to chronic unavailability", async() => {

    //      useGetChronicUnavailabilityLocMock.mockImplementation(()=>{
    //         return useGetChronicUnavailabilityLocData;
    //     })
    //     useGetChronicUnavailabilitySkuMock.mockImplementation(()=>{
    //         return useGetChronicUnavailabilitySkuData;
    //     })
        
    //     render(contextWrapper(<GuidedInsight />,store));
    //      await act(async () => {
            
    //         fireEvent.click(screen.getAllByTestId('floatingTabButton')[1])
    //     })
       
    // })
   })