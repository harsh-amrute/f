import {
  render,
  fireEvent,
  screen,
  cleanup,
} from "@testing-library/react";
import ViewModify from "./index";
import { QueryClientProvider } from "@tanstack/react-query";
import { setupReactQuery } from "../../../../../config/react-query-config";
import { BrowserRouter as Router } from "react-router-dom";
import { UserDataContext } from "../../../../../context";
import {
  useGetMasterUIConfiguration,
  useGetMasterData,
  useGetCount,
  useCreateDraft,
  useModifyDraft,
  useGetSeasonalityDetails,
} from "../../../../Services/MTA/MDM";
import _ from "lodash";
import { createStore, store } from "../../../../../redux/store/store";
import { Provider } from "react-redux";
import { ReactNode } from "react";

import { RESET_STATE } from "../../../../../redux/actions/MDM";
// import { toast } from 'react-toastify'
import { type MDMStore } from "../../../../../VectorFlow/types/MDM";
import { createDraftMockData, getSeasonalityDetailsMockData, MasterData, mockMasterData } from "../../../../../mock-data/MDM";
import { mapMasterToColumnDefs } from "../../../../../helpers/utils";


jest.mock("../../../../Services/MTA/MDM");


// jest.mock('react-toastify', () => ({
//   toast: {
//     error: jest.fn(),
//     success:jest.fn(),
//     loading:jest.fn()
//   },
// }))


const useGetMasterUIConfigurationMock = useGetMasterUIConfiguration as jest.MockedFunction<
    typeof useGetMasterUIConfiguration
  >;
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

window.URL.createObjectURL = jest.fn();

const useMasterDataResult: any = {
  mutateAsync: () => {
    return { data: mockMasterData };
  },
};

const useGetMasterUIConfigurationMockResult:any ={
  mutateAsync:()=>{
    return {
      data:{data: mockData}  
    }
  }
}

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



const mockData = [
  {
    id: 1,
    name: "SKU",
    fields: [
      {
        displayName: "SKU Code",
        key: "sku_code",
        visible: true,
      },
      {
        displayName: "SKU Name",
        key: "sku_name",
        visible: true,
      },
      {
        displayName: "Item Category Code",
        key: "item_category_code",
        visible: false,
      },
    ],
  },
  {
    id: 2,
    name: "Location",
    fields: [
      {
        displayName: "Location Code",
        key: "location_code",
        visible: true,
      },
      {
        displayName: "Location Name",
        key: "location_name",
        visible: true,
      },
      {
        displayName: "c1",
        key: "LocAttr1",
        visible: false,
      },
    ],
  },
  {
    id: 10,
    name: "Seasonality",
    fields: [
      {
        displayName: "SKU Code",
        key: "sku_code",
        visible: true,
      },
      {
        displayName: "SKU Name",
        key: "sku_name",
        visible: true,
      },
      {
        displayName: "Segment",
        key: "SKULocAttr1",
        visible: false,
      },
    ],
  },
];

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
};

const queryClient = setupReactQuery();

describe("Renders View Modify Component", () => {
  beforeEach(() => {
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
  });

  it("renders the view modify component when loading", async () => {

    useGetMasterUIConfigurationMock.mockImplementation(() => {
      return useGetMasterUIConfigurationMockResult;
    });

    render(contextWrapper(<ViewModify />,store));

  });

  it("renders the view modify component", async () => {
    useGetMasterUIConfigurationMock.mockImplementation(():any => {
      return  useGetMasterUIConfigurationMockResult;
    });


    render(contextWrapper(<ViewModify />,store));

    expect(screen.getByLabelText('Example Label')).toBeInTheDocument();
  });
});

describe("Handles all Interaction in ViewModify Component", () => {

  beforeEach(() => {
    const mockState:MDMStore = {
      allMasters:MasterData,
      masters:MasterData,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'default',name:MasterData[0].name,colDefs:mapMasterToColumnDefs(MasterData[0].fields),rowData:[]},
      isSelectMasterOpen:true,
      draftId:'',
      isUploadModalOpen:false
    }

    const mockStore = createStore(mockState);

    useGetMasterUIConfigurationMock.mockImplementation(():any => {
      return useGetMasterUIConfigurationMockResult;
    });


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

    store.dispatch(RESET_STATE());

    render(contextWrapper(<ViewModify />,mockStore));
  });

  afterEach(()=>{
    cleanup()
  })


  it("Check if Submitted Directly all masters should be selected", async () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);
    const tabs = screen.getAllByTestId("tab-button");
    expect(tabs.length).toBe(5);
  });

  it("Check if Masters are selected as per the filters", async () => {
    const reactSelect = await screen.findByLabelText("Example Label");
    expect(reactSelect).toBeInTheDocument();
    fireEvent.focus(reactSelect);
    fireEvent.keyDown(reactSelect, { key: 'ArrowDown', code: 40 });
    fireEvent.click(screen.getAllByText("SKU Code")[0]);

    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    // const tabs = screen.getAllByTestId("tab-button");
    // expect(tabs.length).toBe(2);
  });

  it("Check if All Tabs are closed Select Master Screen is Opened", async () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const tabsList = screen.getAllByTestId("tab-close");
    tabsList.forEach((tab: HTMLElement) => {
      fireEvent.click(tab);
    });

    // expect(toast.error).toHaveBeenCalled()
  });

  it("Check if any Active Tabs is Closed First Tab is set to Default", async () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const tabsList = screen.getAllByTestId("tab-button");
    const tabNo = _.random(1, tabsList.length - 1);
    fireEvent.click(tabsList[tabNo]);

    const tabCloseBtn = screen.getAllByTestId("tab-close")[tabNo];
    fireEvent.click(tabCloseBtn);
  });

  it("Check if active tab closes when X is clicked", async () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const tabCloseBtn = screen.getAllByTestId("tab-close")[0];
    fireEvent.click(tabCloseBtn);
  });

  it("Check if Add new master is working", async () => {
    // const filterButton = screen.getAllByTestId("button-outline-status");
    // fireEvent.click(filterButton[0]);
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);
    const addNewMaster = screen.getByTestId("new-tab");
    fireEvent.click(addNewMaster);
  });

  it("Check if any InActive Tabs is Closed First Tab is set to Default", async () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const tabCloseBtn = screen.getAllByTestId("tab-close");
    const tabNo = _.random(1, tabCloseBtn.length - 1);
    fireEvent.click(tabCloseBtn[tabNo]);
  });


  it("Check if another Filter Box is Added on Clicking Plus Icon", () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const addFilterIcon = screen.getByTestId("add-filter");
    fireEvent.click(addFilterIcon);

    const filters = screen.getAllByTestId("vffilter-wrapper");
    expect(filters.length).toEqual(2);
  });

  it("Check if Filter is Deleted on Clicking Delete Icon (Dustbin)", () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const addFilterIcon = screen.getByTestId("add-filter");
    fireEvent.click(addFilterIcon);

    const filters = screen.getAllByTestId("delete-icon");
    fireEvent.click(filters[filters.length - 1]);
    expect(screen.getAllByTestId("delete-icon").length).toEqual(
      filters.length - 1
    );
  });

  it("Check If Single Filter is Present It Cannot be Deleted", () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const filter = screen.getByTestId("delete-icon");
    fireEvent.click(filter);
    expect(filter).toBeInTheDocument();
  });

  it("Check If Select Master Screen is Opened on Clicking Add New Master", () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const addNewMaster = screen.getByTestId("new-tab");
    fireEvent.click(addNewMaster);
    // const reactSelect = screen.queryAllByRole("combobox")[0];
    // expect(reactSelect).toBeInTheDocument();
  });

  it("Queries Filtered Data when clicked on Apply Filter", () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const applyFilter = screen.getByText("Apply Filter");
    fireEvent.click(applyFilter);
  });

  it("Queries All Data when clicked on Show All", () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const showAll = screen.getByText("Show All");
    fireEvent.click(showAll);
  });

  // it("Goes Back to Select Master screen when clicking on back button", () => {
  //   const submit = screen.getByText("Submit");
  //   fireEvent.click(submit);

  //   const backBtn = screen.getByTestId("back-btn");
  //   fireEvent.click(backBtn);
  // });

  // it("Resets the Filters and Data", () => {
  //   const submit = screen.getByText("Submit");
  //   fireEvent.click(submit);

  //   const backBtn = screen.getByText("Reset");
  //   fireEvent.click(backBtn);
  // });

  it("Submits the Data", () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);
  });

  it("Opens the WarningModal", () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const applyFilter = screen.getByText("Apply Filter");
    fireEvent.click(applyFilter);
  });

  

  // it("Opens the UploadModal", () => {
  //   const submit = screen.getByText("Submit");
  //   fireEvent.click(submit);

  //   // const modifyData = screen.getByText("Modify Selected Data");
  //   // fireEvent.click(modifyData);

  //   const downloadBtn = screen.getByText("Download");
  //   fireEvent.click(downloadBtn);
  // });

  // it("Fetches the filter data on clicking on Apply Filter", async () => {
  //   const submit = screen.getByText("Submit");
  //   fireEvent.click(submit);
  //   await waitFor(async () => {
  //     const reactSelect = screen.getAllByRole("combobox")[0];
  //     expect(reactSelect).toBeInTheDocument();
  //     await select(reactSelect, ["SKU Code"]);
  //   });
  //   await waitFor(async () => {
  //     const reactSelect = screen.getAllByRole("combobox")[1];
  //     expect(reactSelect).toBeInTheDocument();
  //     await select(reactSelect, ["Equals To"]);
  //   });
  //   const textInput = screen.getByTestId("text-input");
  //   fireEvent.change(textInput, { target: { value: "a" } });

  //   await act(async () => {
  //     const applyFilter = await screen.findByText("Apply Filter");
  //     userEvent.click(applyFilter);
  //   });

  // });

});

describe("Handles All Interactions (Mocking Redux Store)",() => {
  const mockState:MDMStore = {
    allMasters:MasterData,
    masters:MasterData,
    options:[],
    selectedOptions:[],
    activeMaster:{id:1,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'default',name:MasterData[0].name,colDefs:mapMasterToColumnDefs(MasterData[0].fields),rowData:[]},
    isSelectMasterOpen:false,
    draftId:'',
    isUploadModalOpen:false
  }

  beforeEach(() => {

    useGetMasterUIConfigurationMock.mockImplementation(():any => {
      return useGetMasterUIConfigurationMockResult;
    });


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

    

  });

  afterEach(()=>{
    cleanup();
    // jest.clearAllMocks();
  })


  it("Clears And Export Errors",async ()=>{

    mockState.activeMaster.progress = 'error';
    mockState.isSelectMasterOpen = false;
    mockState.activeMaster.rowData = [{error:"SKU Code Has Pipe and Comma",...mockMasterData.data[0]},mockMasterData.data[1]];

    const mockStore = createStore(mockState);

    render(contextWrapper(<ViewModify/>,mockStore));

    fireEvent.click(screen.getByText("Clear & Export Errors"));

  })

  it("Exports The Data to Excel when Clicking on Export Data Button",async ()=>{

    const updatedMockState:MDMStore = {
      allMasters:MasterData,
      masters:MasterData,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'view',name:MasterData[0].name,colDefs:[],rowData:mockMasterData.data},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false
    }

    const mockStore = createStore(updatedMockState);

    render(contextWrapper(<ViewModify/>,mockStore));

    fireEvent.click(screen.getByText("Export Data"));


  })

  it("Resets The State When Clicked on Back Button",async ()=>{

    const updatedMockState:MDMStore = {
      allMasters:MasterData,
      masters:MasterData,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'view',name:MasterData[0].name,colDefs:[],rowData:mockMasterData.data},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false
    }

    const mockStore = createStore(updatedMockState);

    render(contextWrapper(<ViewModify/>,mockStore));

    const backBtn = screen.getAllByTestId('vf-button-outline')[1];

    fireEvent.click(backBtn);



  })

  it("Submits The Data",async ()=>{

    let updatedMockState:MDMStore = {
      allMasters:MasterData,
      masters:MasterData,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'uploaded',name:MasterData[0].name,colDefs:[],rowData:mockMasterData.data},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false
    }

    let mockStore = createStore(updatedMockState);

    render(contextWrapper(<ViewModify/>,mockStore));

    fireEvent.click(screen.getByTestId("vf-button"));

    //submits the date when edit online

    updatedMockState = {...updatedMockState,activeMaster:{...updatedMockState.activeMaster,progress:'editOnlineSaved'}}

    cleanup();

    mockStore = createStore(updatedMockState);

    render(contextWrapper(<ViewModify/>,mockStore));

    fireEvent.click(screen.getByTestId("vf-button"));


    // expect(toast.success).toBeCalled();

  })

  it("Deletes The Selected Data",async ()=>{

    const checkBoxColDefs = {
      field:'checkbox',
      colId:'checkbox',
      headerName:'',
      checkboxSelection:true,
      headerCheckboxSelection:true,
      headerCheckboxSelectionCurrentPageOnly:true
    };

    const uploadedStateColDefs:any = [checkBoxColDefs,mapMasterToColumnDefs(MasterData[0].fields)]

    // const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ 
    //   current: { 
    //     api:{
    //       getSelectedRows(){
    //         return mockMasterData.data[0];
    //       }
    //     } 
    //   } 
    // });

    const updatedMockState:MDMStore = {
      allMasters:MasterData,
      masters:MasterData,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'uploaded',name:MasterData[0].name,colDefs:uploadedStateColDefs,rowData:mockMasterData.data},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false
    }

    const mockStore = createStore(updatedMockState);

    render(contextWrapper(<ViewModify/>,mockStore));

    // expect(useRefSpy).toBeCalledTimes(1);

    fireEvent.click(screen.getByText("Delete Selected"));

    // expect(toast.error).toBeCalled();

    

  })

  it("Handles Pagination When Data is on Client Side",async ()=>{

    const updatedMockState:MDMStore = {
      allMasters:MasterData,
      masters:MasterData,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'view',name:MasterData[0].name,colDefs:mapMasterToColumnDefs(MasterData[0].fields),rowData:mockMasterData.data},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false
    }

    const mockStore = createStore(updatedMockState);

    render(contextWrapper(<ViewModify/>,mockStore));

    fireEvent.click(screen.getByLabelText("Next page"));
    

  })

  it("Updates to Edit Online State when Clicking on Edit Online Button",async ()=>{

    const updatedMockState:MDMStore = {
      allMasters:MasterData,
      masters:MasterData,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'view',name:MasterData[0].name,colDefs:mapMasterToColumnDefs(MasterData[0].fields),rowData:mockMasterData.data},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false
    }

    const mockStore = createStore(updatedMockState);

    render(contextWrapper(<ViewModify/>,mockStore));

    fireEvent.click(screen.getByText("Edit Online"));
    

  })

  it("Resets the Data when Clicking on Reset Button",async ()=>{

    const updatedMockState:MDMStore = {
      allMasters:MasterData,
      masters:MasterData,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'editOnline',name:MasterData[0].name,colDefs:mapMasterToColumnDefs(MasterData[0].fields),rowData:mockMasterData.data},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false
    }

    const mockStore = createStore(updatedMockState);

    render(contextWrapper(<ViewModify/>,mockStore));

    fireEvent.click(screen.getByText("Reset"));
    

  })

  it("Check IF Seasonality UI is Loaded",async ()=>{

    console.debug(mapMasterToColumnDefs(MasterData[0].fields,10));

    const updatedMockState:MDMStore = {
      allMasters:MasterData,
      masters:[{id:10,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'seasonality',name:'Seasonality',colDefs:mapMasterToColumnDefs(MasterData[0].fields,10),rowData:mockMasterData.data}],
      options:[],
      selectedOptions:[],
      activeMaster:{id:10,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'seasonality',name:'Seasonality',colDefs:mapMasterToColumnDefs(MasterData[0].fields,10),rowData:mockMasterData.data},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false
    }

    const mockStore = createStore(updatedMockState);

    render(contextWrapper(<ViewModify/>,mockStore));

    const quickFilters = screen.getAllByTestId('seasonality-quick-filter');

    expect(quickFilters.length).toBe(5);

    fireEvent.click(quickFilters[0]);

    fireEvent.click(screen.getByText('Resume'))
    fireEvent.click(screen.getByText('Stop Selected'))

    //Displays Chart
    // fireEvent.click(screen.getByTestId('graph-icon'));
    

  })

  // it("Shows Chart When CLicked on Chart Icon in case of Seasonality Master",async ()=>{

  //   const updatedMockState:MDMStore = {
  //     allMasters:MasterData,
  //     masters:MasterData,
  //     options:[],
  //     selectedOptions:[],
  //     activeMaster:{id:10,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'editOnline',name:MasterData[0].name,colDefs:mapMasterToColumnDefs(MasterData[0].fields),rowData:mockMasterData.data},
  //     isSelectMasterOpen:false,
  //     draftId:''
  //   }

  //   const mockStore = createStore(updatedMockState);

  //   render(contextWrapper(<ViewModify/>,mockStore));

  //   fireEvent.click(screen.getByText("Reset"));
    

  // })

 

  it("Saves To Draft",async ()=>{
   
    let mockState:MDMStore = {
      allMasters:MasterData,
      masters:MasterData,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'editOnline',name:MasterData[0].name,colDefs:mapMasterToColumnDefs(MasterData[0].fields),rowData:mockMasterData.data},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false
    }

    const mockStore = createStore(mockState);

    const mockStoreDispatchSpy = jest.spyOn(mockStore, 'dispatch')


    render(contextWrapper(<ViewModify/>,mockStore));

    fireEvent.click(screen.getByText('Save', { selector: 'button' })); 

    expect(mockStoreDispatchSpy).toBeCalledWith({payload:"editOnlineSaved",type:"UPDATE_PROGRESS_STATE"});

    cleanup();

    //If DraftId is present it calls Modifies Draft Service

    mockState = {...mockState,draftId:'ABC1234'};
    
    render(contextWrapper(<ViewModify/>,createStore(mockState)));

    fireEvent.click(screen.getByText('Save', { selector: 'button' })); 

    //Does not Updates Progress state if there are errors

    const errorColDefs = {
      field:'error',
      colId:'error',
      headerName:'Error',
      floatingFilter:false, 
      cellRenderer:'errorCell',
      suppressColumnsToolPanel:true,
      wrapText:true,
      autoHeight:true,
    }

    mockState = {...mockState,activeMaster:{...mockState.activeMaster,colDefs:[errorColDefs,...mockState.activeMaster.colDefs]}}

    render(contextWrapper(<ViewModify/>,createStore(mockState)));

    fireEvent.click(screen.getByText('Save', { selector: 'button' })); 

    //Shows Error Modal When Service Call is not successful

    cleanup();

    render(contextWrapper(<ViewModify/>,createStore(mockState)));

    useModifyDraftMock.mockImplementation(()=>{
      return useModifyDraftMockData;
    })
    fireEvent.click(screen.getByText('Save', { selector: 'button' })); 




    
  })

  it('Click on seasonality quick filter',()=>{
    const testData = [{...mockMasterData.data[0],SKUCode:"QACE1234,|"},mockMasterData.data[1],mockMasterData.data[2]]
    const updatedMockState:MDMStore = {
      allMasters:MasterData,
      masters:[{id:10,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'seasonality',name:"Seasonality",colDefs:mapMasterToColumnDefs(MasterData[0].fields),rowData:testData}],
      options:[],
      selectedOptions:[],
      activeMaster:{id:10,fields:MasterData[0].fields,filters:MasterData[0].filters,progress:'seasonality',name:"Seasonality",colDefs:mapMasterToColumnDefs(MasterData[0].fields),rowData:testData},
      isSelectMasterOpen:false,
      draftId:'',
      isUploadModalOpen:false
    }

    const mockStore = createStore(updatedMockState);

    render(contextWrapper(<ViewModify/>,mockStore));

    const notStartedQuickFilter = screen.getByText('Not Started')
    fireEvent.click(notStartedQuickFilter)
    fireEvent.click(notStartedQuickFilter)
  })

})

// describe("It handles react portals",()=>{
//   beforeEach(()=>{



//     const result: any = {
//       isLoading: false,
//       data: { data: { data: mockData } },
//     };
//     useGetMasterUIConfigurationMock.mockImplementation(() => {
//       return result;
//     });

//     useGetMasterDataMock.mockImplementation(() => {
//       return useMasterDataResult;
//     });

//     store.dispatch(RESET_STATE());
      

    
   
//   })

//   it("Renderers the viewmodify page",()=>{
//     render(contextWrapper(<ViewModify/>,store))
//     // screen.debug()

//     const submit = screen.getByText("Submit");
//     fireEvent.click(submit);

//     // const columnsToolPanel = screen.getByText('Columns');
//     // fireEvent.click(columnsToolPanel);
    
//     // screen.logTestingPlaygroundURL();


//     // const showAllBtn = screen.getByText("Show All");
//     // fireEvent.click(showAllBtn);

//     // const warningModalCloseIcon =  document.querySelectorAll('#root')[0]!
//     // console.debug(warningModalCloseIcon)
//     // fireEvent.click(warningModalCloseIcon)
//   })

// })
