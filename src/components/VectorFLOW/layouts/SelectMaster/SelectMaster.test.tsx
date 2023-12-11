import { render, fireEvent, screen} from '@testing-library/react';
import SelectMaster from './index';
import { type Option, type MDMStore } from "../../../../VectorFlow/types/MDM";
import {generateOptions} from '../../../../helpers/utils';
import { BrowserRouter as Router } from 'react-router-dom'
import { UserDataContext } from '../../../../context';
import {QueryClientProvider} from '@tanstack/react-query';
import { setupReactQuery } from '../../../../config/react-query-config';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore} from '../../../../redux/store/store';
import {MasterData} from '../../../../mock-data/MDM';


describe('SelectMaster Component', () => {
  // Create mock data for testing

  const data = MasterData;
  const options:Option[] = generateOptions(MasterData);
  const selectedOptions:Option[] = [];
  const filterButtonStatus:number[] = [];
  const setFilterButtonStatus = jest.fn();
  const themeUi = 'NOIRFUSION';
  const isLoading = false;
  const handleSubmit = jest.fn();

  const queryClient = setupReactQuery();

  jest.mock('react-toastify', () => ({
    toast: {
      error: jest.fn(),
      success:jest.fn()
    },
  }))

  const mockState:MDMStore = {
    allMasters:MasterData,
    masters:MasterData,
    options:[],
    selectedOptions:[],
    activeMaster:{id:0,fields:[],filters:MasterData[0].filters,progress:'default',name:'',colDefs:[],rowData:[]},
    isSelectMasterOpen:true,
  }

  const mockStore = createStore(mockState);


  const contextWrapper = (children:ReactNode,store:any) => {
    return(
      <QueryClientProvider client={queryClient}>
          <Router>
            <Provider store={store}>
              <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
                  {children}
              </UserDataContext.Provider>
            </Provider>
          </Router>
        </QueryClientProvider>
    )
  }



  const props = {
    data,
    options,
    selectedOptions,
    filterButtonStatus,
    setFilterButtonStatus,
    themeUi,
    isLoading,
    handleSubmit,
  }

  const storeDispatchSpy = jest.spyOn(mockStore, 'dispatch')

  it('should render loading spinner when isLoading is true', () => {
    render(contextWrapper(<SelectMaster {...props} isLoading={true} />,mockStore));

    // Check if the loading spinner is displayed
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('src','../assets/img/VectorFLOW/loaderBig.svg')
  });

  it('should render search input filter buttons and cards when isLoading is false', () => {

    render(contextWrapper(<SelectMaster {...props} />,mockStore));
    // Check if Search Filter is rendered
    expect(screen.getByTestId('search-wrapper')).toBeInTheDocument();
    //Check if Filter Status Buttons are rendered
    expect(screen.getAllByTestId('button-outline-status')).toHaveLength(data.length);
    //Check if Master Cards are rendered
    expect(screen.getAllByTestId('master-card')).toHaveLength(data.length);
  });

  // it('should set selected masters to all masters when the length becomes 0',() => {
    
  //   render(contextWrapper(<SelectMaster {...props} />,mockStore));

  //   expect(storeDispatchSpy).toHaveBeenCalledWith({payload:data,type:"mdm/setSelectedMasters"});

  // });

  it('should add SKU master when clicked on SKU Filter Button when inactive', () => {

    render(contextWrapper(<SelectMaster {...props} />,mockStore));

    // Get the first filter button
    const filterButton = screen.getAllByTestId('button-outline-status');

    // Simulate a click event on the filter button
    fireEvent.click(filterButton[0]);

    // Check if it Empties the search field options
    expect(storeDispatchSpy).toHaveBeenCalledWith({payload:[],type:"FILL_SELECTED_OPTIONS"});
    expect(setFilterButtonStatus).toBeCalledWith([1]);
    expect(storeDispatchSpy).toHaveBeenCalledWith({payload:1,type:"FILTER_MASTER"});

  });

  it('should add SKU master when clicked on SKU Filter Button when inactive (Master is not present in Selected Masters)', () => {

    const mockState:MDMStore = {
      allMasters:MasterData,
      masters:[],
      options:[],
      selectedOptions:[],
      activeMaster:{id:0,fields:[],filters:MasterData[0].filters,progress:'default',name:'',colDefs:[],rowData:[]},
      isSelectMasterOpen:true,
    }

    const localMockStore = createStore(mockState);

    const localMockStoreDispatchSpy = jest.spyOn(localMockStore, 'dispatch')

    render(contextWrapper(<SelectMaster {...props} />,localMockStore));

    // Get the first filter button
    const filterButton = screen.getAllByTestId('button-outline-status');

    // Simulate a click event on the filter button
    fireEvent.click(filterButton[0]);

    // Check if it Empties the search field options
    expect(localMockStoreDispatchSpy).toHaveBeenCalledWith({payload:[],type:"FILL_SELECTED_OPTIONS"});

    expect(localMockStoreDispatchSpy).toHaveBeenCalledWith({payload:MasterData[0],type:"ADD_MASTER"});

  });

  it('should return warning if trying to deselect master when coming from tabs page', () => {

    const mockState:MDMStore = {
      allMasters:MasterData,
      masters:MasterData,
      options:[],
      selectedOptions:[],
      activeMaster:{id:1,fields:[],filters:MasterData[0].filters,progress:'default',name:'',colDefs:[],rowData:[]},
      isSelectMasterOpen:true,
    }

    const localMockStore = createStore(mockState);
 
    render(contextWrapper(<SelectMaster {...props} filterButtonStatus={[1]}/>,localMockStore));
    const filterButton = screen.getAllByTestId('button-outline-status');
    fireEvent.click(filterButton[0]);
    
    // expect(toast.error).toBeCalled();

  })

  it('should Select SKU Master', () => {

    render(contextWrapper(<SelectMaster {...props} />,mockStore));
   
    const filterButton = screen.getAllByTestId('button-outline-status');

    // Simulate a click event on the filter button
    fireEvent.click(filterButton[0]);

    expect(storeDispatchSpy).toHaveBeenCalledWith({payload:[],type:"FILL_SELECTED_OPTIONS"});

    expect(setFilterButtonStatus).toBeCalledWith([1]);

    expect(storeDispatchSpy).toHaveBeenCalledWith({payload:1,type:"FILTER_MASTER"});

  });

  it('should deselect SKU Master', async () => {
 
    render(contextWrapper(<SelectMaster {...props} filterButtonStatus={[1]} />,mockStore));
   
    const filterButton = screen.getAllByTestId('button-outline-status');

    // Simulate a click event on the filter button
    fireEvent.click(filterButton[0]);

    expect(storeDispatchSpy).toHaveBeenCalledWith({payload:[],type:"FILL_SELECTED_OPTIONS"});

    expect(setFilterButtonStatus).toBeCalledWith([]);

    expect(storeDispatchSpy).toBeCalledWith({payload:1,type:"REMOVE_MASTER"})

  });

  it('should render search cancel and submit button with proper functionality', () => {

    render(contextWrapper(<SelectMaster {...props} />,mockStore));

    const cancelButton = screen.getByText('Cancel')
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(global.window.location.pathname).toContain('/master-data-management/control-panel');

    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
  });

  it('should handle click on filter select input',async () => {

    render(contextWrapper(<SelectMaster {...props} />,mockStore));

    const reactSelect = await screen.findByLabelText("Example Label");
    expect(reactSelect).toBeInTheDocument();
    fireEvent.focus(reactSelect);
    fireEvent.keyDown(reactSelect, { key: 'ArrowDown', code: 40 });
    fireEvent.click(screen.getAllByText("SKU Code")[0]);
    expect(storeDispatchSpy).toBeCalledWith({payload:[{label:'SKU Code',value:'sku_code'}],type:"FILL_SELECTED_OPTIONS"})

  });
});
