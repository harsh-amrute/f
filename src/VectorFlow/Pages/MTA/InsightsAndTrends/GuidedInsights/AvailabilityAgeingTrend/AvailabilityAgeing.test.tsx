import { render } from "@testing-library/react";

import { useGetAvailabilityAgeing} from "../../../../../Services/MTA/InsightsAndTrends";
import { GuidedInsights } from "../../../../../../mock-data/GuidedInsights";
import AvailabilityAgeingTrend from './';
jest.mock("../../../../../Services/MTA/InsightsAndTrends");
jest.mock("ag-charts-react", () => ({
  AgChartsReact: jest.fn(() => null) 
}));
const useGetAvailabilityAgeingMock = useGetAvailabilityAgeing as jest.MockedFunction<
    typeof useGetAvailabilityAgeing
>;
//const useGetAvailabilityAgeingData: any = { data: {data: GuidedInsights.AvailabilityAgeingTrendData }};

const useGetAvailabilityAgeingData: any = {
  mutateAsync: () => {
    return { data: {data: GuidedInsights.AvailabilityAgeingTrendData }};
  },
};
describe("Availability Ageing ", () => {
global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };
    beforeEach(()=>{
        useGetAvailabilityAgeingMock.mockImplementation(()=>{
            return useGetAvailabilityAgeingData;
        })

    })


     it("Availability Ageing", () => {
       
        render(<AvailabilityAgeingTrend/>)

    })
})