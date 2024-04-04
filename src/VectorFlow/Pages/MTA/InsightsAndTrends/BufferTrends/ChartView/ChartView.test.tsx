import { screen,render,fireEvent,cleanup } from "@testing-library/react";
import { mockBTGTechData,mockBTGEcoData,graphsMock } from "../../../../../../mock-data/BufferTrends";
import { useGetBufferTrendsGraph } from '../../../../../Services/MTA/InsightsAndTrends/BufferTrends/index'

import { ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { setupReactQuery } from "../../../../../../config/react-query-config";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { UserDataContext } from "../../../../../../context/UserDataContext";
import { useGetPlanningDataGraph } from "~/VectorFlow/Services/MTA/SupplyChainIntelligenceHub/Planning";
import { store } from "../../../../../../redux/store/store";
import {act} from "react-dom/test-utils"
import ChartView from ".";
import { BufferTrendsGraphDateState } from "~/VectorFlow/types/BPR";
import BufferTrends from "..";



const queryClient = setupReactQuery();
const mockContextValue = {
    user: { user: { theme_ui: "NOIRFUSION" } },
    changeColorTheme: jest.fn(),
    isSideBarOpen: true,
    toggleSideBar: jest.fn()
  };

  const contextWrapper = (children:any) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Router>
            <UserDataContext.Provider value={mockContextValue}>
              {children}
            </UserDataContext.Provider>
        </Router>
      </QueryClientProvider>
    );
  }



jest.mock("../../../../../Services/MTA/InsightsAndTrends/BufferTrends")
jest.mock("ag-charts-react", () => ({
    AgChartsReact: jest.fn(() => null)
  }));



  const useGetBufferTrendsGraphMocked = useGetBufferTrendsGraph as jest.MockedFunction <
        typeof useGetBufferTrendsGraph
    >;

const useGetBufferTrendsGraphMockData:any = (mockData:any)=>({
    mutateAsync : () => {
      return { data: {data:mockData} };
    },
    isLoading:false
});

describe ("Buffer trends charts",()=>{
  global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };

  it("should render chart view",()=>{
      render(contextWrapper(<ChartView currentTab="technicalView" currentGraphData={[]} currentPageTab="Absolute" isLoading={false}  graphs={graphsMock}  updateGraphState={()=>console.log("a")} />))
      render(contextWrapper(<ChartView currentTab="economicalView" currentGraphData={[]} currentPageTab="Absolute" isLoading={false}  graphs={graphsMock}  updateGraphState={()=>console.log("a")} />))
  })

})
