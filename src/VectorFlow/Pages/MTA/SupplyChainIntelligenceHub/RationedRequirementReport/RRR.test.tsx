

import { fireEvent,render,screen,act } from "@testing-library/react";
import {useGetRRRUIConfiguration,useGetRRRData,useGetRRRDataCount} from '../../../../Services/MTA/SupplyChainIntelligenceHub/RRR'


import {mockRRRData,mockRRRUiConfig,mockRRRDataCount} from '../../../../../mock-data/RRR';
import RRR from "./";

jest.mock("../../../../Services/MTA/SupplyChainIntelligenceHub/RRR");

const useGetRRRUIConfigurationMock = useGetRRRUIConfiguration as jest.MockedFunction<
typeof useGetRRRUIConfiguration
>;

const useRRRDataMock = useGetRRRData as jest.MockedFunction<
  typeof useGetRRRData
>;

const useRRRDataCountMock = useGetRRRDataCount as jest.MockedFunction<
    typeof useGetRRRDataCount
>;

window.URL.createObjectURL = jest.fn();


const useRRRDataResult: any = {
    mutateAsync: () => {
      return { data: mockRRRData };
    },
  };

const useGetRRRUIConfigurationMockResult:any ={
  mutateAsync:()=>{
    return {
      data:{data: mockRRRUiConfig}  
    }
  }
}

const useGetRRRCountResult: any = {
  mutateAsync: () => {
    return { data: mockRRRDataCount };
  },
};

  describe("Renders RRR Component", ()=>{
    beforeEach(()=>{
        useGetRRRUIConfigurationMock.mockImplementation(()=>{
            return useGetRRRUIConfigurationMockResult;
        });
        useRRRDataMock.mockImplementation(()=>{
            return useRRRDataResult;
        });
        useRRRDataCountMock.mockImplementation(()=>{
            return useGetRRRCountResult ;
        });

    });
    it("renders Loading Overlay Component when loading", async()=>{
        useGetRRRUIConfigurationMock.mockImplementation(()=>{
            return {...useGetRRRUIConfigurationMockResult,isLoading:true};
        });
        render(<RRR/>)
    })





     it("renders RRReport", async()=>{
        await act(async () => {
               render(<RRR/>)
          })
    })

     it("Handles Pagination", async()=>{
        await act(async () => {
               render(<RRR/>)
          })
        const nextBtn = screen.getAllByText('pagination.next');
       
        fireEvent.click(nextBtn[0]);
    })
})
  
