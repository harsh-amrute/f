import { screen, render, fireEvent, cleanup } from "@testing-library/react"
import { useGetPlanningDataCount, useGetPlanningDataGraph } from "../../../../Services/MTA/SupplyChainIntelligenceHub/Planning";
// import { UserDataContext } from "../../../../../context";
import { getPlanningDataCountMockData, MonitorGITChildMockData } from "../../../../../mock-data/Planning";
import Planning from ".";
import { act } from "react-dom/test-utils";

jest.mock("../../../../Services/MTA/SupplyChainIntelligenceHub/Planning");

const useGetPlanningDataCountMock = useGetPlanningDataCount as jest.MockedFunction<
    typeof useGetPlanningDataCount
>;

const useGetPlanningDataGraphMock = useGetPlanningDataGraph as jest.MockedFunction<
    typeof useGetPlanningDataGraph
>;

const useGetPlanningDataCountMockData: any = {
    mutateAsync: () => {
        return { data: getPlanningDataCountMockData };
    },
};

const useGetPlanningDataGraphMockData: any = {
    mutateAsync: () => {
        return { data: {recordCount:345,data:MonitorGITChildMockData} };
    },
    isLoading:false
};


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
            return useGetPlanningDataGraphMockData
        })
        
    });

    it("Renders Select Category Planning Quadrant", () => {
        render(<Planning/>)
    })

    it("Switches Floating Tab", async () => {
        render(<Planning/>);
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
        render(<Planning/>);
        // fireEvent.click(screen.getAllByText('To Child')[0])
        await act(async () => {
            fireEvent.click(screen.getAllByText('To Child')[0])
        })
        expect(screen.getAllByTestId('floatingTabButton').length).toEqual(3);
        cleanup();
        render(<Planning/>);
        await act(async () => {
            fireEvent.click(screen.getAllByText('From Parent')[0])
        })

    })

    it("Renders Expedite Graphs", async () => {
        render(<Planning/>);
        await act(async () => {
            fireEvent.click(screen.getAllByText('To Child')[1])
        })
        cleanup();
        render(<Planning/>);
        await act(async () => {
            fireEvent.click(screen.getAllByText('From Parent')[1])
        })

    })

    it("Renders Excess Inventory Graphs", async () => {
        render(<Planning/>);
        await act(async () => {
            fireEvent.click(screen.getAllByText('Review')[0])
        })
    })

    it("Renders Order Fulfillment Graphs", async () => {
        render(<Planning/>);
        await act(async () => {
            fireEvent.click(screen.getAllByText('Review')[1])
        })
    })

    it("Switches Floating Tab on Click", () => {
        render(<Planning/>);
        fireEvent.click(screen.getAllByText('To Child')[0])
        // fireEvent.click(screen.getByTestId('floatingTabButton'));
    })
    
  
})
