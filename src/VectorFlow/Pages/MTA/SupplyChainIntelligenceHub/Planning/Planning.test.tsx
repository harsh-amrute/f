import { screen, render, fireEvent, cleanup } from "@testing-library/react"
import { useGetPlanningDataCount, useGetPlanningDataGraph, useGetPlanningDataGrid } from "../../../../Services/MTA/SupplyChainIntelligenceHub/Planning";
// import { UserDataContext } from "../../../../../context";
import { getPlanningDataCountMockData, MonitorGITChildMockData,MonitorGITParentMockData ,getPlanningDataGridMockData, ExpediteParentMockData,ExpediteChildMockData, getPlanningDataGraphMockData } from "../../../../../mock-data/Planning";
import Planning from ".";
import { act } from "react-dom/test-utils";
import { UserDataContext } from "../../../../../context/UserDataContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { setupReactQuery } from "../../../../../config/react-query-config";
import { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../../../redux/store/store";

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

jest.mock("../../../../Services/MTA/SupplyChainIntelligenceHub/Planning");

const useGetPlanningDataCountMock = useGetPlanningDataCount as jest.MockedFunction<
    typeof useGetPlanningDataCount
>;

const useGetPlanningDataGraphMock = useGetPlanningDataGraph as jest.MockedFunction<
    typeof useGetPlanningDataGraph
>;

const useGetPlanningDataGridMock = useGetPlanningDataGrid as jest.MockedFunction<
    typeof useGetPlanningDataGrid
>;

const useGetPlanningDataCountMockData: any = {
    mutateAsync: () => {
        return { data: getPlanningDataCountMockData };
    },
};

const useGetPlanningDataGraphMockData: any = (mockData:any) => ({
    mutateAsync: () => {
        return { data: {recordCount:345,data:mockData} };
    },
    isLoading:false
});

const useGetPlanningDataGridMockData: any = (mockData:any) => ({
    mutateAsync: () => {
        return { data: {recordCount:345,data:mockData} };
    },
});


describe("Planning Quadrant", () => {

    global.ResizeObserver = class MockedResizeObserver {
        observe = jest.fn();
        unobserve = jest.fn();
        disconnect = jest.fn();
      };

    beforeEach(() => {
        useGetPlanningDataCountMock.mockImplementation(()=>{
            return useGetPlanningDataCountMockData
        }) 
        useGetPlanningDataGraphMock.mockImplementation(()=>{
            return useGetPlanningDataGraphMockData(getPlanningDataGraphMockData)
        })
        useGetPlanningDataGridMock.mockImplementation(()=>{
            return useGetPlanningDataGridMockData(getPlanningDataGridMockData)
        })
    });

    it("Renders Select Category Planning Quadrant", () => {
        render(contextWrapper(<Planning/>,store));
    })

    it("Switches Floating Tab", async () => {
        useGetPlanningDataGraphMock.mockImplementation(()=>{
            return useGetPlanningDataGraphMockData(MonitorGITChildMockData)
        })
        render(contextWrapper(<Planning/>,store));
        await act(async () => {
            fireEvent.click(screen.getAllByText('To Child')[0])
        })
        expect(screen.getAllByTestId('floatingTabButton').length).toEqual(3);
        await act(async () => {
            fireEvent.click(screen.getAllByTestId('floatingTabButton')[1]);
        })
        expect(screen.getAllByTestId('floatingTabButton')[1]).toHaveStyle('color:white')

    })

    it("Renders MonitorGIT Graphs", async () => {
        useGetPlanningDataGraphMock.mockImplementation(()=>{
            return useGetPlanningDataGraphMockData(MonitorGITChildMockData)
        })
        render(contextWrapper(<Planning/>,store));
        // fireEvent.click(screen.getAllByText('To Child')[0])
        await act(async () => {
            fireEvent.click(screen.getAllByText('To Child')[0])
        })
        expect(screen.getAllByTestId('floatingTabButton').length).toEqual(3);
        cleanup();
        useGetPlanningDataGridMock.mockImplementation(()=>{
            return useGetPlanningDataGridMockData(MonitorGITParentMockData)
        })
        render(contextWrapper(<Planning/>,store));
        await act(async () => {
            fireEvent.click(screen.getAllByText('From Parent')[0])
        })

    })

    it("Renders Expedite Graphs", async () => {
        useGetPlanningDataGraphMock.mockImplementation(()=>{
            return useGetPlanningDataGraphMockData(ExpediteChildMockData)
        })
        render(contextWrapper(<Planning/>,store));
        await act(async () => {
            fireEvent.click(screen.getAllByText('To Child')[1])
        })
        cleanup();
        useGetPlanningDataGraphMock.mockImplementation(()=>{
            return useGetPlanningDataGraphMockData(ExpediteParentMockData)
        })
        render(contextWrapper(<Planning/>,store));
        await act(async () => {
            fireEvent.click(screen.getAllByText('From Parent')[1])
        })

    })

    it("Renders Excess Inventory Graphs", async () => {
        render(contextWrapper(<Planning/>,store));
        await act(async () => {
            fireEvent.click(screen.getAllByText('Review')[0])
        })
    })

    it("Renders Order Fulfillment Graphs", async () => {
        render(contextWrapper(<Planning/>,store));
        await act(async () => {
            fireEvent.click(screen.getAllByText('Review')[1])
        })
    })

    it("Switches Floating Tab on Click", () => {
        render(contextWrapper(<Planning/>,store));
        fireEvent.click(screen.getAllByText('To Child')[0])
        // fireEvent.click(screen.getByTestId('floatingTabButton'));
    })
    
  
})
