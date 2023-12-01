import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";


import ViewModify from "./index";
import { QueryClientProvider } from "@tanstack/react-query";
import { setupReactQuery } from "../../../../../config/react-query-config";
import { BrowserRouter as Router } from "react-router-dom";
import { UserDataContext } from "../../../../../context";
import {
  useGetMasterUIConfiguration,
  useGetMasterData,
} from "../../../../Services/MTA/MDM";
import { select } from "react-select-event";
import _ from "lodash";
import { store } from "../../../../../redux/store/store";
import { Provider } from "react-redux";
import { resetState } from "../../../../../redux/features/MDM";
import { ReactNode } from "react";

import userEvent from "@testing-library/user-event";


jest.mock("../../../../Services/MTA/MDM");

const useGetMasterUIConfigurationMock =
  useGetMasterUIConfiguration as jest.MockedFunction<
    typeof useGetMasterUIConfiguration
  >;
const useGetMasterDataMock = useGetMasterData as jest.MockedFunction<
  typeof useGetMasterData
>;
window.URL.createObjectURL = jest.fn();

const useMasterDataResult: any = {
  mutateAsync: () => {
    return { data: mockMasterData };
  },
};

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
  ],
};

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
    id: 3,
    name: "SKU Location",
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

const contextWrapper = (children: ReactNode) => {
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
  });

  it("renders the view modify component when loading", async () => {
    const result: any = {
      isLoading: true,
      // data:{data:{responseData:{data:mockData}}}
    };
    useGetMasterUIConfigurationMock.mockImplementation(() => {
      return result;
    });

    render(contextWrapper(<ViewModify />));

  });

  it("renders the view modify component", async () => {
    const result: any = {
      isLoading: false,
      data: { data: { data: mockData } },
    };
    useGetMasterUIConfigurationMock.mockImplementation(() => {
      return result;
    });

    render(contextWrapper(<ViewModify />));

    const filterButton = screen.getAllByTestId("button-outline-status");
    fireEvent.click(filterButton[0]);

    await waitFor(async () => {
      const reactSelect = screen.getByRole("combobox");
      expect(reactSelect).toBeInTheDocument();
      await select(reactSelect, ["SKU Code"]);
    });
  });
});

describe("Handles all Interaction in ViewModify Component", () => {

  beforeEach(() => {
    const result: any = {
      isLoading: false,
      data: { data: { data: mockData } },
    };
    useGetMasterUIConfigurationMock.mockImplementation(() => {
      return result;
    });

    useGetMasterDataMock.mockImplementation(() => {
      return useMasterDataResult;
    });

    store.dispatch(resetState());

    render(contextWrapper(<ViewModify />));
  });


  it("Check if Submitted Directly all masters should be selected", async () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);
    const tabs = screen.getAllByTestId("tab-button");
    expect(tabs.length).toBe(3);
  });

  it("Check if Masters are selected as per the filters", async () => {
    await waitFor(async () => {
      const reactSelect = screen.getByRole("combobox");
      expect(reactSelect).toBeInTheDocument();
      await select(reactSelect, ["SKU Code"]);
    });

    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const tabs = screen.getAllByTestId("tab-button");
    expect(tabs.length).toBe(2);
  });

  it("Check if All Tabs are closed Select Master Screen is Opened", async () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const tabsList = screen.getAllByTestId("tab-close");
    tabsList.forEach((tab: HTMLElement) => {
      fireEvent.click(tab);
    });

    const reactSelect = screen.getByRole("combobox");
    expect(reactSelect).toBeInTheDocument();
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
    const filterButton = screen.getAllByTestId("button-outline-status");
    fireEvent.click(filterButton[0]);
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
    const reactSelect = screen.queryAllByRole("combobox")[0];
    expect(reactSelect).toBeInTheDocument();
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

  it("Goes Back to Select Master screen when clicking on back button", () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const backBtn = screen.getByTestId("back-btn");
    fireEvent.click(backBtn);
  });

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

  it("Clicks on show all button", () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    const showAllBtn = screen.getByText("Show All");
    fireEvent.click(showAllBtn);
  });

  it("Fetches the filter data on clicking on Apply Filter", async () => {
    const submit = screen.getByText("Submit");
    fireEvent.click(submit);
    await waitFor(async () => {
      const reactSelect = screen.getAllByRole("combobox")[0];
      expect(reactSelect).toBeInTheDocument();
      await select(reactSelect, ["SKU Code"]);
    });
    await waitFor(async () => {
      const reactSelect = screen.getAllByRole("combobox")[1];
      expect(reactSelect).toBeInTheDocument();
      await select(reactSelect, ["Equals To"]);
    });
    const textInput = screen.getByTestId("text-input");
    fireEvent.change(textInput, { target: { value: "a" } });

    await act(async () => {
      const applyFilter = await screen.findByText("Apply Filter");
      userEvent.click(applyFilter);
    });

  });

});

describe("It handles react portals",()=>{
  beforeEach(()=>{



    const result: any = {
      isLoading: false,
      data: { data: { data: mockData } },
    };
    useGetMasterUIConfigurationMock.mockImplementation(() => {
      return result;
    });

    useGetMasterDataMock.mockImplementation(() => {
      return useMasterDataResult;
    });

    store.dispatch(resetState());
      

    
   
  })

  it("Renderers the viewmodify page",()=>{
    render(contextWrapper(<ViewModify/>))
    // screen.debug()

    const submit = screen.getByText("Submit");
    fireEvent.click(submit);

    // const columnsToolPanel = screen.getByText('Columns');
    // fireEvent.click(columnsToolPanel);
    
    screen.logTestingPlaygroundURL();


    // const showAllBtn = screen.getByText("Show All");
    // fireEvent.click(showAllBtn);

    // const warningModalCloseIcon =  document.querySelectorAll('#root')[0]!
    // console.debug(warningModalCloseIcon)
    // fireEvent.click(warningModalCloseIcon)
  })

})
