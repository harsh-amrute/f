import { render, fireEvent, screen} from '@testing-library/react';
import VFTab from './index';
import { MDMMasterState, type Master, type Tab} from "../../../../VectorFlow/types/MDM";
import _ from 'lodash';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from '../../../../redux/store/store';
import {QueryClientProvider} from '@tanstack/react-query';
import { setupReactQuery } from '../../../../config/react-query-config';
import { BrowserRouter as Router } from 'react-router-dom'
import { UserDataContext } from '../../../../context';
import { MasterData } from '../../../../mock-data/MDM';



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

const activeMaster:MDMMasterState = MasterData[0];
const themeUi = 'NOIRFUSION';
const handleTabClose = jest.fn();
const handleTabChange = jest.fn();
const newTabHandler = jest.fn();


const props = {
  activeMaster:activeMaster,
  themeUi:themeUi,
  onTabChange:handleTabChange,
  onTabClose:handleTabClose,
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

    render(contextWrapper(<VFTab {...props} />));
    const tabCloseBtn = screen.getAllByTestId('tab-close')[0];
    fireEvent.click(tabCloseBtn)
    expect(handleTabClose).toHaveBeenCalled();

  });

  it('calls Completed tab when status is completed', () => {

    MasterData[0].progress = 'submitted';

    render(contextWrapper(<VFTab {...props}/>))

  });

  it('Prevents changing to Already Completed Tab', () => {

    MasterData[0].progress = 'submitted';

    render(contextWrapper(<VFTab {...props}/>))

    const tabCloseBtn = screen.getAllByTestId('tab-close')[0];
    fireEvent.click(tabCloseBtn);

  });

  
});
