import { render, fireEvent, screen} from '@testing-library/react';
import VFTab from './index';
import { type Master, type Tab} from "../../../../VectorFlow/types/MDM";
import _ from 'lodash';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from '../../../../redux/store/store';
import {QueryClientProvider} from '@tanstack/react-query';
import { setupReactQuery } from '../../../../config/react-query-config';
import { BrowserRouter as Router } from 'react-router-dom'
import { UserDataContext } from '../../../../context';

const storeDispatchSpy = jest.spyOn(store, 'dispatch')

const allMasters:Master[] = [
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

const tabs:Tab[] = [
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
    ],
    status:'' 
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
    ],
    status:'' 
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
    ],
    status:'' 
  }
];

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

const activeMaster:Master = allMasters[0];
const themeUi = 'NOIRFUSION';
const handleTabClose = jest.fn();
const newTabHandler = jest.fn();


const props = {
  allMasters:allMasters,
  activeMaster:activeMaster,
  tabs:tabs,
  themeUi:themeUi,
  onClose:handleTabClose,
  newTabTitle:'Add Master',
  newTabIcon:"/assets/img/VectorFLOW/NMS/add-circle.svg",
  newTabHandler:newTabHandler

}


describe('View Modify Component', () => {

  it('renders the VF Tab component', () => {

    render(contextWrapper(<VFTab {...props}/>))
  
  });

  it('changes tab when clicking', () => {

    render(contextWrapper(<VFTab {...props}/>))

    const tabsList = screen.getAllByTestId('tab-button');
    const tabNo = _.random(1,tabsList.length-1);  
    fireEvent.click(tabsList[tabNo]);

    expect(storeDispatchSpy).toHaveBeenCalledWith({payload:allMasters[tabNo],type:"mdm/setActiveMaster"});

  });

  it('closes tab when clicking close icon', () => {

    render(contextWrapper(<VFTab {...props}/>))

    const tabCloseBtn = screen.getAllByTestId('tab-close')[0];
    fireEvent.click(tabCloseBtn)
    expect(handleTabClose).toHaveBeenCalled();

  });

  it('calls New Tab Handler on clickng add new tab', () => {

    render(contextWrapper(<VFTab {...props}/>))

    const addNewTab = screen.getByTestId('new-tab');
    fireEvent.click(addNewTab);
    expect(newTabHandler).toHaveBeenCalled();

  });

  it('Renders component correctly when new tab details are not provided (i.e. optional props)', () => {

    render(contextWrapper(<VFTab {...props} newTabHandler={undefined}/>));

  });

  it('Renders component correctly when current tab is not in the list of all masters', () => {

    render(contextWrapper(<VFTab {...props} allMasters={allMasters.slice(1)}/>));
    const tabCloseBtn = screen.getAllByTestId('tab-close')[0];
    fireEvent.click(tabCloseBtn)
    expect(handleTabClose).toHaveBeenCalled();

  });

  it('calls Completed tab when status is completed', () => {

    tabs[0].status = 'completed';

    render(contextWrapper(<VFTab {...props}/>))

  });

  it('Prevents changing to Already Completed Tab', () => {

    tabs[0].status = 'completed';

    render(contextWrapper(<VFTab {...props}/>))

    const tabCloseBtn = screen.getAllByTestId('tab-close')[0];
    fireEvent.click(tabCloseBtn);

  });

  
});
