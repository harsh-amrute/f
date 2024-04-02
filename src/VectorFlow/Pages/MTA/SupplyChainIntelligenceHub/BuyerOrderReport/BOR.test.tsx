import { fireEvent, render, screen,act } from '@testing-library/react';
import { useGetBORUIConfiguration, useBORData, useBORDataCount } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BuyerOrderReport"
import { mockBORData,mockBORCountData,mockBORUIConfigData} from "../../../../../mock-data/BOR";
import BuyerOrderReport from './';
jest.mock("../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BuyerOrderReport");

const useGetBORUIConfigurationMock = useGetBORUIConfiguration as jest.MockedFunction<
    typeof useGetBORUIConfiguration
  >;
  const useBORDataMock = useBORData as jest.MockedFunction<
    typeof useBORData
  >;
    const useBORDataCountMock = useBORDataCount as jest.MockedFunction<
    typeof useBORDataCount
  >;

  window.URL.createObjectURL = jest.fn();

  
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

    });
    it("renders Loading Overlay Component when loading", async()=>{
        useGetBORUIConfigurationMock.mockImplementation(()=>{
            return {...useGetMasterUIConfigurationMockResult,isLoading:true};
        });
        render(<BuyerOrderReport/>)
    })
     it("renders BuyerOrderReport", async()=>{
        await act(async () => {
               render(<BuyerOrderReport/>)
          })
    })

     it("Handles Pagination", async()=>{
        await act(async () => {
               render(<BuyerOrderReport/>)
          })

          const nextBtn = screen.getAllByAltText('pagination-next-arrow')
        fireEvent.click(nextBtn[0]);
    })
})
