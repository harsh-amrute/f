import { render, fireEvent, screen, waitFor  } from '@testing-library/react';
import SelectMaster from './index';
import { type Master, type Option } from "../../../../VectorFlow/types/MDM";
import {generateOptions} from '../../../../helpers/utils';
import { BrowserRouter as Router } from 'react-router-dom'
import { UserDataContext } from '../../../../context';
import {QueryClientProvider} from '@tanstack/react-query';
import { setupReactQuery } from '../../../../config/react-query-config';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../../redux/store/store';

describe('SelectMaster Component', () => {
  // Create mock data for testing
  const data:Master[] = [
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
  const options:Option[] = generateOptions(data);
  const selectedOptions:Option[] = [];
  const selectedMasters:Master[] = [...data];
  const filterButtonStatus:Master[] = [];
  const setFilterButtonStatus = jest.fn();
  const themeUi = 'NOIRFUSION';
  const isLoading = false;
  const handleSubmit = jest.fn();

  const queryClient = setupReactQuery()


  const contextWrapper = (children:ReactNode) => {
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
    selectedMasters,
    filterButtonStatus,
    setFilterButtonStatus,
    themeUi,
    isLoading,
    handleSubmit
  }

  // it('should render loading spinner when isLoading is true', () => {
  //   render(contextWrapper(<SelectMaster {...props} isLoading={true} />));

  //   // Check if the loading spinner is displayed
  //   const loader = screen.getByTestId('loader')
  //   expect(loader).toBeInTheDocument();
  //   expect(loader).toHaveAttribute('src','../assets/img/VectorFLOW/loaderBig.svg')
  // });

  // it('should render search input filter buttons and cards when isLoading is false', () => {

  //   render(contextWrapper(<SelectMaster {...props} />));
  //   // Check if Search Filter is rendered
  //   expect(screen.getByTestId('search-wrapper')).toBeInTheDocument();
  //   //Check if Filter Status Buttons are rendered
  //   expect(screen.getAllByTestId('button-outline-status')).toHaveLength(data.length);
  //   //Check if Master Cards are rendered
  //   expect(screen.getAllByTestId('master-card')).toHaveLength(data.length);
  // });

  // it('should set selected masters to all masters when the length becomes 0',() => {
    
  //   render(contextWrapper(<SelectMaster {...props} selectedMasters={[]} />));

  //   expect(storeDispatchSpy).toHaveBeenCalledWith({payload:data,type:"mdm/setSelectedMasters"});

  // });

  // it('should add SKU master when clicked on SKU Filter Button when inactive1', () => {

  //   const temp:Master[] = [...data.filter((master)=>master.id === 1)]

  //   render(contextWrapper(<SelectMaster {...props} selectedMasters={[]} />));

  //   // Get the first filter button
  //   const filterButton = screen.getAllByTestId('button-outline-status');

  //   // Simulate a click event on the filter button
  //   fireEvent.click(filterButton[0]);

  //   // Check if it Empties the search field options
  //   expect(storeDispatchSpy).toHaveBeenCalledWith({payload:[],type:"mdm/setSelectedOptions"});
  //   expect(setFilterButtonStatus).toBeCalledWith([...temp]);
  //   expect(storeDispatchSpy).toHaveBeenCalledWith({payload:[...temp],type:"mdm/setSelectedMasters"});

  // });

  // it('should add SKU master when clicked on SKU Filter Button when inactive (Master is not present in selectedMasters)', () => {

  //   const temp:Master[] = [...data.filter((master)=>master.id === 1)]

  //   render(contextWrapper(<SelectMaster {...props} selectedMasters={[]} />));

  //   // Get the first filter button
  //   const filterButton = screen.getAllByTestId('button-outline-status');

  //   // Simulate a click event on the filter button
  //   fireEvent.click(filterButton[0]);

  //   // Check if it Empties the search field options
  //   expect(storeDispatchSpy).toHaveBeenCalledWith({payload:[],type:"mdm/setSelectedOptions"});

  //   expect(storeDispatchSpy).toHaveBeenCalledWith({payload:[...temp],type:"mdm/setSelectedMasters"});

  // });

  // it('should add SKU master when clicked on SKU Filter Button when inactive (Master is present in selectedMasters)', () => {

  //   const temp:Master[] = [...data.filter((master)=>master.id === 1)]

  //   render(contextWrapper(<SelectMaster {...props} selectedMasters={temp} />));

  //   // Get the first filter button
  //   const filterButton = screen.getAllByTestId('button-outline-status');

  //   // Simulate a click event on the filter button
  //   fireEvent.click(filterButton[0]);

  //   // Check if it Empties the search field options
  //   expect(storeDispatchSpy).toHaveBeenCalledWith({payload:[],type:"mdm/setSelectedOptions"});

  //   expect(storeDispatchSpy).toHaveBeenCalledWith({payload:[...temp],type:"mdm/setSelectedMasters"});

  // });

  // it('should return warning if trying to deselect master when coming from tabs page', () => {
  //   const notifyErrorSpy = jest.spyOn(toasts,'notifyError');
  //   const temp:Master[] = [...data.filter((master)=>master.id === 1)];
  //   render(contextWrapper(<SelectMaster {...props} filterButtonStatus={temp} />));
  //   const filterButton = screen.getAllByTestId('button-outline-status');
  //   fireEvent.click(filterButton[0]);
  //   expect(notifyErrorSpy).toBeCalled();

  // })

  // it('should Select SKU Master', () => {

  //   render(contextWrapper(<SelectMaster {...props} />));
   
  //   const filterButton = screen.getAllByTestId('button-outline-status');

  //   // Simulate a click event on the filter button
  //   fireEvent.click(filterButton[0]);

  //   // Check if it Empties the search field options
  //   // expect(storeDispatchSpy).toHaveBeenCalledWith({payload:[],type:"mdm/setSelectedOptions"});

  //   // expect(setFilterButtonStatus).toBeCalledWith([]);

  //   // expect(storeDispatchSpy).toHaveBeenCalledWith({payload:[...data.filter((master:Master)=>master.id !== 1)],type:"mdm/setSelectedMasters"});

  // });

  it('should deselect SKU Master', async () => {


    render(contextWrapper(<SelectMaster {...props} />));

    // const initialState = [data[0]];

    // const useStateSpy = jest.spyOn(React, 'useState');

    // useStateSpy.mockReturnValue([initialState,()=>{}])

   
    const filterButton = screen.getAllByTestId('button-outline-status');

    // Simulate a click event on the filter button
    fireEvent.click(filterButton[0]);

    await waitFor(() => {
      fireEvent.click(filterButton[0])
    })

    // const filterButtonUpdated = screen.getAllByTestId('button-outline-status');
    // fireEvent.click(filterButtonUpdated[0]);

    

  });

  

  // it('should render search cancel and submit button with proper functionality', () => {

  //   render(contextWrapper(<SelectMaster {...props} />));

  //   const cancelButton = screen.getByText('Cancel')
  //   expect(cancelButton).toBeInTheDocument();
  //   fireEvent.click(cancelButton);
  //   expect(global.window.location.pathname).toContain('/master-data-management/control-panel');

  //   const submitButton = screen.getByText('Submit')
  //   expect(submitButton).toBeInTheDocument();
  //   fireEvent.click(submitButton);
  // });

  // it('should handle click on filter select input',async () => {

  //   render(contextWrapper(<SelectMaster {...props} />));

  //   await waitFor(async () => {
  //     const reactSelect = screen.getByRole('combobox');
  //     expect(reactSelect).toBeInTheDocument();
  //     await select(reactSelect, ['SKU Code']);
  //     expect(storeDispatchSpy).toBeCalled();
  //   });
   
  // });
});
