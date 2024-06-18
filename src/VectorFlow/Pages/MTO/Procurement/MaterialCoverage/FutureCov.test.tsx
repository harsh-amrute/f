import React,{ReactNode} from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FutureCov from './FutureCov';
import { setupReactQuery } from '../../../../../config/react-query-config';
// Install this package if not already installed
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserDataContext } from '../../../../../context';
import {createStore} from '../../../../../redux/store/store'

const queryClient = setupReactQuery();

const dummyStore:any ={
  AnalyticsData:{}
}

const mockedStore = createStore(dummyStore)


const contextWrapper = (children: ReactNode) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Provider store={mockedStore}>
            <UserDataContext.Provider
              value={{
                user: { user: { theme_ui: "NOIRFUSION" } },
                changeColorTheme: (color) => {
                  return color;
                },
                isSideBarOpen:true,toggleSideBar:jest.fn
              }}
            >
              {children}
            </UserDataContext.Provider>
          </Provider>
        </Router>
      </QueryClientProvider>
    );
  }

describe("FutureCoverage Component", () => {
    test("Div present on the screen", () => {
        const handleToggleComponentMock = jest.fn();
        const setDetailDataObj=jest.fn()
        render(contextWrapper(<FutureCov handleToggleComponent={handleToggleComponentMock} setDetailDataObj={setDetailDataObj}/>))
        const navigate = screen.getByTestId("btn_navigate")
        expect(navigate).toBeInTheDocument();
        fireEvent.click(navigate);
    })

})

