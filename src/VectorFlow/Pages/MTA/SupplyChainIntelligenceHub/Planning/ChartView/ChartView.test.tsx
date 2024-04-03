import { render } from "@testing-library/react"
import ChartView from '.';
import { MonitorGITChildMockData,ExpediteParentMockData,MonitorGITChildCustomMockData } from "../../../../../../mock-data/Planning";
import { UserDataContext } from "../../../../../../context/UserDataContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { setupReactQuery } from "../../../../../../config/react-query-config";
import { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../../../../redux/store/store";
import { useGetPlanningDataCustom } from "../../../../../Services/MTA/SupplyChainIntelligenceHub/Planning";

// const mockFn = jest.fn()
const queryClient = setupReactQuery();

jest.mock("ag-charts-react", () => ({
  AgChartsReact: jest.fn(() => null)
}));

jest.mock("../../../../../Services/MTA/SupplyChainIntelligenceHub/Planning");

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

const useGetPlanningDataCustomMock = useGetPlanningDataCustom as jest.MockedFunction<
    typeof useGetPlanningDataCustom
  >;

  const useGetPlanningDataCustomMockData: any = {
    mutateAsync: () => {
      return { data: {data:MonitorGITChildCustomMockData} };
    },
  };

describe("Monitor GIT Child",()=>{
  global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };

  it("Renders Chart View",() => {
    render(contextWrapper(<ChartView category="" currentTab="" currentGraphData={[]}/>,store))
    render(contextWrapper(<ChartView category="GITToChild" currentTab="locationWise" currentGraphData={MonitorGITChildMockData}/>,store))
    render(contextWrapper(<ChartView category="GITToChild" currentTab="transporterWise" currentGraphData={MonitorGITChildMockData}/>,store))
    useGetPlanningDataCustomMock.mockImplementation(()=>{
      return useGetPlanningDataCustomMockData
    })
    render(contextWrapper(<ChartView category="GITToChild" currentTab="custom" currentGraphData={MonitorGITChildCustomMockData}/>,store))
    render(contextWrapper(<ChartView category="GITToChild" currentTab="" currentGraphData={MonitorGITChildMockData}/>,store))
    render(contextWrapper(<ChartView category="GITFromParent" currentTab="" currentGraphData={MonitorGITChildMockData}/>,store))
    render(contextWrapper(<ChartView category="ExpediteFromParent" currentTab="expediteDispatches" currentGraphData={ExpediteParentMockData}/>,store))
    render(contextWrapper(<ChartView category="ExpediteFromParent" currentTab="createAvailabilityAtParent" currentGraphData={ExpediteParentMockData}/>,store))
    render(contextWrapper(<ChartView category="ExpediteFromParent" currentTab="custom" currentGraphData={[]}/>,store))
    render(contextWrapper(<ChartView category="ExcessInventory" currentTab="CustomScreens" currentGraphData={[]}/>,store))
    render(contextWrapper(<ChartView category="OrderFulfillment" currentTab="CustomScreens" currentGraphData={[]}/>,store))

  })

})