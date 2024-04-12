import {  render} from "@testing-library/react";
import { useGetAvailabilityTrend} from "../../../../../Services/MTA/InsightsAndTrends";
import { GuidedInsights } from "../../../../../../mock-data/GuidedInsights";
import AvailabilityTrend from ".";

jest.mock("../../../../../Services/MTA/InsightsAndTrends");
const useGetAvailabilityTrendMock = useGetAvailabilityTrend as jest.MockedFunction<
    typeof useGetAvailabilityTrend
>;
jest.mock("ag-charts-react", () => ({
  AgChartsReact: jest.fn(() => null) // Replace null with a mock component if needed
}));
//const useGetAvailabilityTrendData: any =  { data: {data: GuidedInsights.AvailabilityTrendData }}; 
const useGetAvailabilityTrendData: any = {
  mutateAsync: () => {
    return { data: {data: GuidedInsights.AvailabilityTrendData }};
  },
};
describe("Availability Trend", () => {
     beforeEach(()=>{
      useGetAvailabilityTrendMock.mockImplementation(()=>{
            return useGetAvailabilityTrendData;
        })
    });
     it("Renders Availability Trend", () => {
        
        render(<AvailabilityTrend/>)
       
    })
})
