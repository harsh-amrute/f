import { render, fireEvent, screen,waitFor} from '@testing-library/react';

import ViewModify from './index';
import {QueryClientProvider} from '@tanstack/react-query';
import { setupReactQuery } from '../../../../../config/react-query-config';
import { BrowserRouter as Router } from 'react-router-dom'
import { UserDataContext } from '../../../../../context';
import { useGetMasterUIConfiguration } from '../../../../Services/MTA/MDM';
import {select} from 'react-select-event'
import _ from 'lodash';

jest.mock('../../../../Services/MTA/MDM');

const useGetMasterUIConfigurationMock = useGetMasterUIConfiguration as jest.MockedFunction<typeof useGetMasterUIConfiguration>;

const mockData = [
    { 
      id: 1,
      name: 'SKU', 
      fields:[
          {
            displayName:'SKU Code',
            key:"sku_code",
            visible:true
          },
          {
            displayName:'SKU Name',
            key:"sku_name",
            visible:true
          },
          {
            displayName: "Item Category Code",
            key: "item_category_code",
            visible: false
          },
      ] 
    },
    { 
      id: 2,
      name: 'Location', 
      fields:[
          {
            displayName:'Location Code',
            key:"location_code",
            visible:true
          },
          {
            displayName:'Location Name',
            key:"location_name",
            visible:true
          },
          {
            displayName: "c1",
            key: "LocAttr1",
            visible: false
          },
      ] 
    },
    { 
      id: 3,
      name: 'SKU Location', 
      fields:[
          {
            displayName:'SKU Code',
            key:"sku_code",
            visible:true
          },
          {
            displayName:'SKU Name',
            key:"sku_name",
            visible:true
          },
          {
            displayName: "Segment",
            key: "SKULocAttr1",
            visible: false
          },
      ] 
    },
    
  ];


const queryClient = setupReactQuery()
describe('Renders View Modify Component', () => {

    it('renders the view modify component when loading', async () => {

  
        let result:any = {
            isLoading:true,
            // data:{data:{responseData:{data:mockData}}}
        }
        useGetMasterUIConfigurationMock.mockImplementation(()=>{
            return result
        })
    
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
                        <ViewModify/>
                    </UserDataContext.Provider>
                </Router>
            </QueryClientProvider>
        )

        result = {
            isLoading:false,
            data:{data:{responseData:{data:undefined}}}
        }
        useGetMasterUIConfigurationMock.mockImplementation(()=>{
            return result
        })
    
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
                        <ViewModify/>
                    </UserDataContext.Provider>
                </Router>
            </QueryClientProvider>
        )
    
      });

  it('renders the view modify component', async () => {

  
    const result:any = {
        isLoading:false,
        data:{data:{responseData:{data:mockData}}}
    }
    useGetMasterUIConfigurationMock.mockImplementation(()=>{
        return result
    })

    render(
        <QueryClientProvider client={queryClient}>
            <Router>
                <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
                    <ViewModify/>
                </UserDataContext.Provider>
            </Router>
        </QueryClientProvider>
    )

    const filterButton = screen.getAllByTestId('button-outline-status');
    fireEvent.click(filterButton[0]);
    
    await waitFor(async () => {
        const reactSelect = screen.getByRole('combobox');
        expect(reactSelect).toBeInTheDocument();
        await select(reactSelect, ['SKU Code']);
      });

  });
  
});


describe('Handles all Interaction in ViewModify Component', () => { 

  beforeEach(() => {
      const result:any = {
        isLoading:false,
        data:{data:{responseData:{data:mockData}}}
    }
    useGetMasterUIConfigurationMock.mockImplementation(()=>{
        return result
    })

    render(
        <QueryClientProvider client={queryClient}>
            <Router>
                <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
                    <ViewModify/>
                </UserDataContext.Provider>
            </Router>
        </QueryClientProvider>
    )
  })

  it('Check if Submitted Directly all masters should be selected', async () => {
    
    const submit = screen.getByText('Submit');
    fireEvent.click(submit);
    const tabs = screen.getAllByTestId('tab-button');
    expect(tabs.length).toBe(3);    

  });

  it("Check if Masters are selected as per the filters",async () => {

    await waitFor(async () => {
      const reactSelect = screen.getByRole('combobox');
      expect(reactSelect).toBeInTheDocument();
      await select(reactSelect, ['SKU Code']);
    });

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const tabs = screen.getAllByTestId('tab-button');
    expect(tabs.length).toBe(2);
    

  })

  it("Check if All Tabs are closed Select Master Screen is Opened",async () => {

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const tabsList = screen.getAllByTestId('tab-close');
    tabsList.forEach((tab:HTMLElement) => {
      fireEvent.click(tab);
    })

    const reactSelect = screen.getByRole('combobox');
    expect(reactSelect).toBeInTheDocument();    

  })

  it("Check if any Active Tabs is Closed First Tab is set to Default",async () => {

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const tabsList = screen.getAllByTestId('tab-button');
    const tabNo = _.random(1,tabsList.length-1);
    fireEvent.click(tabsList[tabNo]);

    const tabCloseBtn = screen.getAllByTestId('tab-close')[tabNo];
    fireEvent.click(tabCloseBtn);

  })

  it("Check if any InActive Tabs is Closed First Tab is set to Default",async () => {

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const tabCloseBtn = screen.getAllByTestId('tab-close');
    const tabNo = _.random(1,tabCloseBtn.length-1);
    fireEvent.click(tabCloseBtn[tabNo]);

  })
 
  it("Check if another Filter Box is Added on Clicking Plus Icon",() => {

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const addFilterIcon = screen.getByTestId('add-filter');
    fireEvent.click(addFilterIcon);

    const filters = screen.getAllByTestId('vffilter-wrapper');
    expect(filters.length).toEqual(2);
  

  })

  it("Check if Filter is Deleted on Clicking Delete Icon (Dustbin)",() => {

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const addFilterIcon = screen.getByTestId('add-filter');
    fireEvent.click(addFilterIcon);

    const filters = screen.getAllByTestId('delete-icon');
    fireEvent.click(filters[filters.length-1]);
    expect(screen.getAllByTestId('delete-icon').length).toEqual(filters.length-1);

  })

  it("Check If Single Filter is Present It Cannot be Deleted",() => {

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const filter = screen.getByTestId('delete-icon');
    fireEvent.click(filter);
    expect(filter).toBeInTheDocument();

  })

  it("Check If Select Master Screen is Opened on Clicking Add New Master",() => {

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const addNewMaster = screen.getByTestId('new-tab');
    fireEvent.click(addNewMaster);
    const reactSelect = screen.getByRole('combobox');
    expect(reactSelect).toBeInTheDocument();

  })

  it("Queries Filtered Data when clicked on Apply Filter",() => {

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const applyFilter = screen.getByText('Apply Filter');
    fireEvent.click(applyFilter);

  })

  it("Queries All Data when clicked on Show All",() => {

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const showAll = screen.getByText('Show All');
    fireEvent.click(showAll);

  })

  it("Goes Back to Select Master screen when clicking on back button",() => {

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const backBtn = screen.getByTestId('back-btn');
    fireEvent.click(backBtn);
    
  })

  it("Resets the Filters and Data",() => {

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const backBtn = screen.getByText('Reset');
    fireEvent.click(backBtn);
    
  })

  it("Submits the Data",() => {

    const submit = screen.getByText('Submit');
    fireEvent.click(submit);

    const submitData = screen.getByText('Submit');
    fireEvent.click(submitData);
    
  })





 })
