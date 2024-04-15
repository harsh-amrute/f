import { screen, render, fireEvent } from "@testing-library/react"
import NormChangeHistoryTable from "."
import { QueryClientProvider } from "@tanstack/react-query";
import { UserDataContext } from "../../../../context";
import { setupReactQuery } from "../../../../config/react-query-config";
import {ReactNode} from 'react'


const mockFunction = jest.fn()
const queryClient = setupReactQuery()

const dummyprops = {
    data:[],
    onGoBack:mockFunction
}

const contextWrapper = (children: ReactNode) => {
    return (
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    );
  }
  

it('Clicks on GoBack button',()=>{
    render(contextWrapper(<NormChangeHistoryTable {...dummyprops}></NormChangeHistoryTable>))
        const goBackButton = screen.getByText("Go Back!"); 
        expect(goBackButton).toBeInTheDocument()
         fireEvent.click(goBackButton)
})


