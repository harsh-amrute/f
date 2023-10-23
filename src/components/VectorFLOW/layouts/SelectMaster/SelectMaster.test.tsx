import { render, fireEvent, screen, waitFor  } from '@testing-library/react';
import SelectMaster from './index';
import { type Master, type Option } from "../../../../VectorFlow/types/MDM";
import {generateOptions} from '../../../../helpers/utils';
import { BrowserRouter as Router } from 'react-router-dom'
import { UserDataContext } from '../../../../context';
import selectEvent from 'react-select-event';

describe('SelectMaster Component', () => {
  // Create mock data for testing
  const data = [
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
  const setSelectedOptions = jest.fn();
  const selectedMasters:Master[] = [...data];
  const setSelectedMasters = jest.fn();
  const filterButtonStatus:Master[] = [];
  const setFilterButtonStatus = jest.fn();
  const themeUi = 'NOIRFUSION';
  const isLoading = false;


  const props = {
    data,
    options,
    selectedOptions,
    setSelectedOptions,
    selectedMasters,
    setSelectedMasters,
    filterButtonStatus,
    setFilterButtonStatus,
    themeUi,
    isLoading
  }

  it('should render loading spinner when isLoading is true', () => {
    render(
      <Router>
        <SelectMaster
         {...props}
         isLoading={true}
        />
      </Router>
    );

    // Check if the loading spinner is displayed
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('src','../assets/img/VectorFLOW/loaderBig.svg')
  });

  it('should render search input filter buttons and cards when isLoading is false', () => {

    render(
      <Router>
        <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
          <SelectMaster
            {...props}
          />
        </UserDataContext.Provider>
      </Router>
    );
    // Check if Search Filter is rendered
    expect(screen.getByTestId('search-wrapper')).toBeInTheDocument();
    //Check if Filter Status Buttons are rendered
    expect(screen.getAllByTestId('button-outline-status')).toHaveLength(data.length);
    //Check if Master Cards are rendered
    expect(screen.getAllByTestId('master-card')).toHaveLength(data.length);
  });

  it('should set selected masters to all masters when the length becomes 0',() => {
    
    // selectedMasters = [];

    render(
      <Router>
        <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
          <SelectMaster
            {...props}
            selectedMasters={[]}
          />
        </UserDataContext.Provider>
      </Router>
    );

    expect(setSelectedMasters).toBeCalledWith(data);

  });

  it('should add SKU master when clicked on SKU Filter Button when inactive1', () => {

    const temp:Master[] = [...data.filter((master)=>master.id === 1)]

    render(
      <Router>
        <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
          <SelectMaster
            {...props}
          />
        </UserDataContext.Provider>
    </Router>
    );

    // Get the first filter button
    const filterButton = screen.getAllByTestId('button-outline-status');

    // Simulate a click event on the filter button
    fireEvent.click(filterButton[0]);

    // Check if it Empties the search field options
    expect(setSelectedOptions).toHaveBeenCalledWith([]);
    expect(setFilterButtonStatus).toBeCalledWith([...temp]);
    expect(setSelectedMasters).toHaveBeenCalledWith([...temp]);

  });

  it('should add SKU master when clicked on SKU Filter Button when inactive (Master is not present in selectedMasters)', () => {

    const temp:Master[] = [...data.filter((master)=>master.id === 1)]

    render(
      <Router>
        <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
          <SelectMaster
            {...props}
            selectedMasters={[]}
          />
        </UserDataContext.Provider>
    </Router>
    );

    // Get the first filter button
    const filterButton = screen.getAllByTestId('button-outline-status');

    // Simulate a click event on the filter button
    fireEvent.click(filterButton[0]);

    // Check if it Empties the search field options
    expect(setSelectedOptions).toHaveBeenCalledWith([]);

    expect(setSelectedMasters).toHaveBeenCalledWith([...temp]);

  });

  it('should remove SKU master when clicked on SKU Filter Button when active (Master is present in selectedMasters)', () => {

    const temp:Master[] = [...data.filter((master)=>master.id === 1)]

    render(
      <Router>
        <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
          <SelectMaster
            {...props}
            filterButtonStatus={temp}
          />
        </UserDataContext.Provider>
    </Router>
    );

    // Get the first filter button
    const filterButton = screen.getAllByTestId('button-outline-status');

    // Simulate a click event on the filter button
    fireEvent.click(filterButton[0]);

    // Check if it Empties the search field options
    expect(setSelectedOptions).toHaveBeenCalledWith([]);

    expect(setFilterButtonStatus).toBeCalledWith([]);

    expect(setSelectedMasters).toBeCalledWith([...data.filter((master:Master)=>master.id !== 1)]);

  });

  it('should render search cancel and submit button with proper functionality', () => {

    render(
      <Router>
        <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color:string) => {return color}}}>
          <SelectMaster
            {...props}
          />
        </UserDataContext.Provider>
      </Router>
    );

    const cancelButton = screen.getByText('Cancel')
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(global.window.location.pathname).toContain('/master-data-management/control-panel');

    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
  });

  it('should handle click on filter select input',async () => {

    render(
      <Router>
        <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color:string) => {return color}}}>
          <SelectMaster
            {...props}
          />
        </UserDataContext.Provider>
      </Router>
    );

    
    await waitFor(async () => {
      const reactSelect = screen.getByRole('combobox');
      expect(reactSelect).toBeInTheDocument();
      await selectEvent.select(reactSelect, ['SKU Code']);
      expect(setSelectedOptions).toBeCalled();
    });
   
  });
});
