import { fireEvent, render, screen } from '@testing-library/react';
import { useGetBORUIConfiguration, useBORData, useBORDataCount } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub"
import { mockBORData,mockBORCountData,mockBORUIConfigData} from "../../../../../mock-data/BOR";
import BuyerOrderReport from './';
jest.mock("../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub");

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
        render(<BuyerOrderReport/>)
    })

    // it("Changes Page when Clicked on Next",()=>{
    //     render(<BuyerOrderReport/>);
    //     const nextBtn = screen.getByLabelText('Next page');
    //     screen.logTestingPlaygroundURL();
    //     fireEvent.click(nextBtn);

    // })
})
// describe('should render the VFTable component', () => {
//     window.URL.createObjectURL = jest.fn();
    
//   const rowData = [
//     { id: 1, name: 'John Doe', age: 30 },
//     { id: 2, name: 'Jane Doe', age: 25 },
//   ];

//   const columnDefs = [
//     { header: 'ID', field: 'id' },
//     { header: 'Name', field: 'name' },
//     { header: 'Age', field: 'age' },
//   ];

//   const agGridProps = {
//     rowData:rowData,
//     columnDefs:columnDefs,
//     columnVisible:jest.fn()
//   }
  
//   it("Should render the table in the DOM",()=>{
//     render(<BuyerOrderReport/>);

//     const table = screen.getByRole('table');
//     expect(table).toBeInTheDocument();
//   })

// });
