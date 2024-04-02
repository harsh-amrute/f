import { screen, render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useGetAvailabilityTrend, useGetChronicUnavailabilityLoc, useGetChronicUnavailabilitySku, useGetChronicUnavailabilityGridView} from "../../../../Services/MTA/InsightsAndTrends";
import { GuidedInsights } from "../../../../../mock-data/GuidedInsights";
import GuidedInsight from ".";
jest.mock("../../../../Services/MTA/InsightsAndTrends");
jest.mock("ag-charts-react", () => ({
  AgChartsReact: jest.fn(() => null) // Replace null with a mock component if needed
}));

const useGetAvailabilityTrendMock = useGetAvailabilityTrend as jest.MockedFunction<
    typeof useGetAvailabilityTrend
>;
const useGetAvailabilityTrendData: any =   { data:{data: GuidedInsights.AvailabilityTrendData }}; 
   

const useGetChronicUnavailabilityGridViewMock = useGetChronicUnavailabilityGridView as jest.MockedFunction<
    typeof useGetChronicUnavailabilityGridView
>;
const useGetChronicUnavailabilityGridViewData: any = { data: {data: GuidedInsights.ChronicGridViewData }};


const useGetChronicUnavailabilityLocMock = useGetChronicUnavailabilityLoc as jest.MockedFunction<
    typeof useGetChronicUnavailabilityLoc
>;
const useGetChronicUnavailabilityLocData: any ={ data: 
            {data: GuidedInsights.ChronicUnavailabilityLocData }}; 
  
const useGetChronicUnavailabilitySkuMock = useGetChronicUnavailabilitySku as jest.MockedFunction<
    typeof useGetChronicUnavailabilitySku
>;
const useGetChronicUnavailabilitySkuData: any =  { data: {data: GuidedInsights.ChronicUnavailabilitySkuData }}; 
   
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
        })
    
    
     it("Renders Availability Tred Data", () => {
             
        render(<GuidedInsight/>)
    })
    it("On changing tab to Availability trend data ", async() => {

        render(<GuidedInsight/>)
         await act(async () => {
            
            fireEvent.click(screen.getAllByTestId('floatingTabButton')[0])
        })
       
    })
      it("On changing tab to chronic unavailability", async() => {

         useGetChronicUnavailabilityLocMock.mockImplementation(()=>{
            return useGetChronicUnavailabilityLocData;
        })
        useGetChronicUnavailabilitySkuMock.mockImplementation(()=>{
            return useGetChronicUnavailabilitySkuData;
        })
        
        render(<GuidedInsight/>)
         await act(async () => {
            
            fireEvent.click(screen.getAllByTestId('floatingTabButton')[1])
        })
       
    })
   })