import { render } from "@testing-library/react";

import { useGetChronicUnavailabilityGridView} from "../../../../../Services/MTA/InsightsAndTrends";
import { GuidedInsights } from "../../../../../../mock-data/GuidedInsights";
import ChronicGridView from './';
jest.mock("../../../../../Services/MTA/InsightsAndTrends");
const useGetChronicUnavailabilityGridViewMock = useGetChronicUnavailabilityGridView as jest.MockedFunction<
    typeof useGetChronicUnavailabilityGridView
>;
const useGetChronicUnavailabilityGridViewData: any = { data: {data: GuidedInsights.ChronicGridViewData }};

describe("Chronic Unavailability ", () => {
global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };
    beforeEach(()=>{
        useGetChronicUnavailabilityGridViewMock.mockImplementation(()=>{
            return useGetChronicUnavailabilityGridViewData;
        })

    })
        
     it("Renders Chronic Unavailability", () => {
        
      render(<ChronicGridView currentGridData={useGetChronicUnavailabilityGridViewData?.data?.data}/>)
       
    })
})