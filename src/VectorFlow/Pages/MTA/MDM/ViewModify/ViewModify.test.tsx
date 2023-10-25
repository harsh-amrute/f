import { render, fireEvent, screen,waitFor} from '@testing-library/react';

import ViewModify from './index';
import {QueryClientProvider} from '@tanstack/react-query';
import { setupReactQuery } from '../../../../../config/react-query-config';
import { BrowserRouter as Router } from 'react-router-dom'
import { UserDataContext } from '../../../../../context';
import { useGetMasterUIConfiguration } from '../../../../Services/MTA/MDM';
import {select} from 'react-select-event'

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
describe('View Modify Component', () => {

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
