import { fireEvent, render, screen ,cleanup} from "@testing-library/react"
import { UserDataContext } from "../../../../../context"
import { createStore, store } from "../../../../../redux/store/store"
import { ReactNode } from "react";
import { setupReactQuery } from "../../../../../config/react-query-config";
import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { useGetMasterUIConfiguration,useGetMasterData,useGetCount,useCreateDraft,useModifyDraft,useGetSeasonalityDetails,useDeleteMasterData,useDeleteDraft, useModifyMasterData, useDeleteTask } from "../../../../../VectorFlow/Services/MTA/MDM";
import { getMasterUIConfigurationMockData ,createDraftMockData,MasterData, MasterDataWithSubmittedMaster,getSeasonalityDetailsMockData, mockMasterData,deleteDraftMockData,modifyMasterMockData, deleteTaskMockData} from "../../../../../mock-data/MDM";
import { type MDMStore } from "../../../../../VectorFlow/types/MDM";
import {mapMasterToColumnDefs} from '../../../../../helpers/utils'
import DeleteRecord from ".";

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

const useDeleteMasterDataMock = useDeleteMasterData as jest.MockedFunction<
typeof useDeleteMasterData
>;

const useModifyMasterDataMock = useModifyMasterData as jest.MockedFunction<
typeof useModifyMasterData
>;

const useDeleteDraftMock = useDeleteDraft as jest.MockedFunction<
typeof useDeleteDraft
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

const useRemoveMasterDataMockData:any = {
    mutateAsync:()=>{
      return {data:createDraftMockData}
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

describe("DeleteRecord Component", () => {
   

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
      recordCount:0,
      isDataAvailableLocally:true
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

    useDeleteMasterDataMock.mockImplementation(()=>{
        return useRemoveMasterDataMockData;
      })

    useDeleteDraftMock.mockImplementation(() => {
      return useDeleteDraftMockData;
    })

    useModifyMasterDataMock.mockImplementation(() => {
      return useModifyMasterDataMockData;
    })

    useDeleteTaskMock.mockImplementation(() => {
      return useDeleteTaskMockData;
    })

    const mockedStore = createStore(mockState)

    render(contextWrapper(<DeleteRecord/>,mockedStore))

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
    render(contextWrapper(<DeleteRecord/>,store))
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

    useDeleteMasterDataMock.mockImplementation(()=>{
        return useRemoveMasterDataMockData;
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
      recordCount:0,
      isDataAvailableLocally:true
    }

    const mockedStore = createStore(mockState)

    render(contextWrapper(<DeleteRecord/>,mockedStore))
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
      recordCount:0,
      isDataAvailableLocally:true
    }

    const mockedStore = createStore(mockState)

    render(contextWrapper(<DeleteRecord/>,mockedStore))
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
      recordCount:0,
      isDataAvailableLocally:true
    }

    const mockedStore = createStore(mockState)

    render(contextWrapper(<DeleteRecord/>,mockedStore))
    const clickableElement = screen.getAllByTestId('tab-close')[0]
    fireEvent.click(clickableElement)
   })

   it('handles Delete Online Save',()=>{
    const mockState:MDMStore = {
      allMasters:MasterDataWithSubmittedMaster,
      masters:MasterDataWithSubmittedMaster,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterDataWithSubmittedMaster[0].fields,filters:MasterDataWithSubmittedMaster[0].filters,progress:'deleteOnline',name:MasterDataWithSubmittedMaster[0].name,colDefs:mapMasterToColumnDefs(MasterDataWithSubmittedMaster[0].fields),rowData:mockMasterData.data},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false,
      chunkSize:100,
      recordCount:0,
      isDataAvailableLocally:true
    }

    const mockedStore = createStore(mockState)

    render(contextWrapper(<DeleteRecord/>,mockedStore))
    
    fireEvent.click(screen.getByText('Save', { selector: 'button' })); 
   })
})

