import { fireEvent, render, screen ,cleanup} from "@testing-library/react"
import { UserDataContext } from "../../../../../context"
import { createStore, store } from "../../../../../redux/store/store"
import AddRecord from ".";
import { ReactNode } from "react";
import { setupReactQuery } from "../../../../../config/react-query-config";
import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { useGetMasterUIConfiguration,useGetMasterData,useGetCount,useCreateDraft,useModifyDraft,useGetSeasonalityDetails,useDeleteDraft,useModifyMasterData, useDeleteTask,useAddMasterData } from "../../../../../VectorFlow/Services/MTA/MDM";
import { getMasterUIConfigurationMockData ,createDraftMockData,MasterData, MasterDataWithSubmittedMaster,getSeasonalityDetailsMockData,deleteDraftMockData,modifyMasterMockData, deleteTaskMockData} from "../../../../../mock-data/MDM";
import { type MDMStore } from "../../../../../VectorFlow/types/MDM";
import {mapMasterToColumnDefs} from '../../../../../helpers/utils'

jest.mock("../../../../Services/MTA/MDM");

const useGetMasterUIConfigurationMock = useGetMasterUIConfiguration as jest.MockedFunction<
   typeof useGetMasterUIConfiguration
>

window.URL.createObjectURL = jest.fn();

const useGetMasterUIConfigurationMockData: any = {
  mutateAsync: () => {
    return { data: getMasterUIConfigurationMockData };
  },
};

const useGetMasterDataMock = useGetMasterData as jest.MockedFunction<
  typeof useGetMasterData
>;

const useGetCountMock = useGetCount as jest.MockedFunction<
  typeof useGetCount
>;

const useCreateDraftMock = useCreateDraft as jest.MockedFunction<
  typeof useCreateDraft
>;

const useModifyDraftMock = useModifyDraft as jest.MockedFunction<
  typeof useModifyDraft
>;

const useGetSeasonalityDetailsMock = useGetSeasonalityDetails as jest.MockedFunction<
typeof useGetSeasonalityDetails
>;

const useModifyMasterDataMock = useModifyMasterData as jest.MockedFunction<
typeof useModifyMasterData
>;

const useDeleteDraftMock = useDeleteDraft as jest.MockedFunction<
typeof useDeleteDraft
>;

const useAddMasterDataMock = useAddMasterData as jest.MockedFunction<
typeof useAddMasterData
>;

const useDeleteTaskMock = useDeleteTask as jest.MockedFunction<
typeof useDeleteTask
>;

window.URL.createObjectURL = jest.fn();

const useMasterDataResult: any = {
  mutateAsync: () => {
    return { data: mockMasterData };
  },
};


const useGetCountResult: any = {
  mutateAsync: () => {
    return { data: mockMasterData };
  },
};

const useCreateDraftMockData :any={
  mutateAsync:()=>{
    return {data:createDraftMockData}
  }
}

const useModifyDraftMockData :any={
  mutateAsync:()=>{
    return {data:createDraftMockData}
  }
}

const useGetSeasonalityDetailsMockData:any = {
  mutateAsync:()=>{
    return {data:getSeasonalityDetailsMockData}
  }
}

const useModifyMasterDataMockData:any = {
  mutateAsync:() => {
    return {data:modifyMasterMockData}
  }
}

const useDeleteDraftMockData:any = {
  mutateAsync:() => {
    return {data:deleteDraftMockData}
  }
}

const useDeleteTaskMockData:any = {
  mutateAsync:() => {
    return {data:deleteTaskMockData}
  }
}

const mockMasterData: any = {
  recordCount: 345,
  data: [
    {
      SKUSrNo: 1,
      SKUCode: "Q1231231DE12",
      SKUName: "Text Description",
      SKUAttr1: "ABC",
      SKUAttr2: "Group A",
      SKUAttr3: "PTH",
      SKUAttr4: 50,
      SKUAttr5: "Arrow New",
      SKUAttr6: "Red",
      SKUAttr7: 25,
      SKUAttr8: "mm",
      SKUAttr9: 35,
      SKUAttr10: "ABC",
      SKUAttr11: "SubCategory",
      SKUAttr12: "2022-11-08",
      SKUAttr13: "Dymmy Value",
      SKUAttr14: "ABC Group",
      SKUAttr15: "Dummy Value",
      SKUAttr16: "mm",
    },
    {
      SKUSrNo: 2,
      SKUCode: "Q1231231FG34",
      SKUName: "Text Description",
      SKUAttr1: "ABC",
      SKUAttr2: "Group A",
      SKUAttr3: "PTH",
      SKUAttr4: 50,
      SKUAttr5: "Arrow New",
      SKUAttr6: "Red",
      SKUAttr7: 25,
      SKUAttr8: "mm",
      SKUAttr9: 35,
      SKUAttr10: "ABC",
      SKUAttr11: "SubCategory",
      SKUAttr12: "2022-11-08",
      SKUAttr13: "Dymmy Value",
      SKUAttr14: "ABC Group",
      SKUAttr15: "Dummy Value",
      SKUAttr16: "mm",
    },
    {
      SKUSrNo: 3,
      SKUCode: "Q1231231FG34",
      SKUName: "Text Description",
      SKUAttr1: "ABC",
      SKUAttr2: "Group A",
      SKUAttr3: "PTH",
      SKUAttr4: 50,
      SKUAttr5: "Arrow New",
      SKUAttr6: "Red",
      SKUAttr7: 25,
      SKUAttr8: "mm",
      SKUAttr9: 35,
      SKUAttr10: "ABC",
      SKUAttr11: "SubCategory",
      SKUAttr12: "2022-11-08",
      SKUAttr13: "Dymmy Value",
      SKUAttr14: "ABC Group",
      SKUAttr15: "Dummy Value",
      SKUAttr16: "mm",
    },
  ],
};


const queryClient = setupReactQuery()

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
            }}
          >
            {children}
          </UserDataContext.Provider>
        </Provider>
      </Router>
    </QueryClientProvider>
  );
}

describe("AddRecord Component", () => {
   

  beforeEach(() => {

    const mockState:MDMStore = {
      allMasters:MasterData,
      masters:MasterData,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'default',name:MasterData[0].name,colDefs:mapMasterToColumnDefs(MasterData[0].fields),rowData:[]},
      isSelectMasterOpen:true,
      draftId:'',
      isUploadModalOpen:false,
      chunkSize:100,
      recordCount:0
    }

    useGetMasterUIConfigurationMock.mockImplementation(()=>{
      return useGetMasterUIConfigurationMockData
      })


    useGetMasterDataMock.mockImplementation(() => {
      return useMasterDataResult;
    });

    useGetCountMock.mockImplementation(() => {
      return useGetCountResult;
    });

    useCreateDraftMock.mockImplementation(()=>{
      return useCreateDraftMockData
    })

    useModifyDraftMock.mockImplementation(()=>{
      return useModifyDraftMockData
    })

    useGetSeasonalityDetailsMock.mockImplementation(()=>{
      return useGetSeasonalityDetailsMockData;
    })

    useModifyMasterDataMock.mockImplementation(() => {
      return useModifyMasterDataMockData;
    })

    useDeleteDraftMock.mockImplementation(() => {
      return useDeleteDraftMockData;
    })

    useDeleteTaskMock.mockImplementation(() => {
      return useDeleteTaskMockData;
    })

    useAddMasterDataMock.mockImplementation(()=>{
      return useModifyDraftMockData;
    })

    const mockedStore = createStore(mockState)

    render(contextWrapper(<AddRecord/>,mockedStore))

  });

  afterEach(()=>{
    cleanup();
    // jest.clearAllMocks();
  })


   it("renders loader on isLoading=true",()=>{

    useGetMasterUIConfigurationMock.mockImplementation(():any=>{
      return {
        mutateAsync: () => {
          return { data: getMasterUIConfigurationMockData };
        },
        isLoading:true
      }
      })
    
   })

   it("handle on submit",()=>{
    fireEvent.click(screen.getByText('Submit'));
   })

   it("handles on cancel",()=>{
    const closebtn=screen.getByText('Cancel')
    fireEvent.click(closebtn); 
   })

   it("Handles on click",()=>{
    const clickableElement = screen.getAllByTestId("vf-master-group-card")[0];
    fireEvent.click(clickableElement);
    fireEvent.click(clickableElement);
   })

   it("renders on the dom",()=>{
    useGetMasterUIConfigurationMock.mockImplementation(()=>{
      return useGetMasterUIConfigurationMockData
      })
    render(contextWrapper(<AddRecord/>,store))
   })

   it('clicks on seasonality master',()=>{
    const clickableElement = screen.getByText('Seasonality');
    fireEvent.click(clickableElement);
    fireEvent.click(clickableElement);
   })

   it('clicks on PIPO master',()=>{
    const clickableElement = screen.getByText( 'Phase In Phase Out');
    fireEvent.click(clickableElement);
    fireEvent.click(clickableElement);
   })

  
})


describe("Handles all custom redux interactions",()=>{
  global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };
  beforeEach(() => {

    useGetMasterUIConfigurationMock.mockImplementation(()=>{
      return useGetMasterUIConfigurationMockData
      })


    useGetMasterDataMock.mockImplementation(() => {
      return useMasterDataResult;
    });

    useGetCountMock.mockImplementation(() => {
      return useGetCountResult;
    });

    useCreateDraftMock.mockImplementation(()=>{
      return useCreateDraftMockData
    })

    useModifyDraftMock.mockImplementation(()=>{
      return useModifyDraftMockData
    })

    useGetSeasonalityDetailsMock.mockImplementation(()=>{
      return useGetSeasonalityDetailsMockData;
    })

    useModifyMasterDataMock.mockImplementation(() => {
      return useModifyMasterDataMockData;
    })

    useDeleteDraftMock.mockImplementation(() => {
      return useDeleteDraftMockData;
    })

    useDeleteTaskMock.mockImplementation(() => {
      return useDeleteTaskMockData;
    })

    useAddMasterDataMock.mockImplementation(()=>{
      return useModifyDraftMockData;
    })

  });

  afterEach(()=>{
    cleanup();
  })
  it('handles tab change',()=>{
    const mockState:MDMStore = {
      allMasters:MasterDataWithSubmittedMaster,
      masters:MasterDataWithSubmittedMaster,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterDataWithSubmittedMaster[0].fields,filters:MasterDataWithSubmittedMaster[0].filters,progress:'submitted',name:MasterDataWithSubmittedMaster[0].name,colDefs:mapMasterToColumnDefs(MasterDataWithSubmittedMaster[0].fields),rowData:[]},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false,
      chunkSize:100,
      recordCount:0
    }

    const mockedStore = createStore(mockState)

    render(contextWrapper(<AddRecord/>,mockedStore))
    const clickableElement = screen.getByText('Location')
    fireEvent.click(clickableElement)
   })

   it('handles tab change when progres != submitted',()=>{
    const mockState:MDMStore = {
      allMasters:MasterDataWithSubmittedMaster,
      masters:MasterDataWithSubmittedMaster,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterDataWithSubmittedMaster[0].fields,filters:MasterDataWithSubmittedMaster[0].filters,progress:'default',name:MasterDataWithSubmittedMaster[0].name,colDefs:mapMasterToColumnDefs(MasterDataWithSubmittedMaster[0].fields),rowData:[]},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false,
      chunkSize:100,
      recordCount:0
    }

    const mockedStore = createStore(mockState)

    render(contextWrapper(<AddRecord/>,mockedStore))
    const clickableElement = screen.getByText('Location')
    fireEvent.click(clickableElement)
   })

   it('handles tab change close',()=>{
    const mockState:MDMStore = {
      allMasters:MasterDataWithSubmittedMaster,
      masters:MasterDataWithSubmittedMaster,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterDataWithSubmittedMaster[0].fields,filters:MasterDataWithSubmittedMaster[0].filters,progress:'default',name:MasterDataWithSubmittedMaster[0].name,colDefs:mapMasterToColumnDefs(MasterDataWithSubmittedMaster[0].fields),rowData:[]},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false,
      chunkSize:100,
      recordCount:0
    }

    const mockedStore = createStore(mockState)

    render(contextWrapper(<AddRecord/>,mockedStore))
    const clickableElement = screen.getAllByTestId('tab-close')[0]
    fireEvent.click(clickableElement)
   })
})

