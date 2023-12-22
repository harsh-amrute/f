import { fireEvent, render, screen } from "@testing-library/react"
import { UserDataContext } from "../../../../../context"
import { store } from "../../../../../redux/store/store"
import AddRecord from ".";
import { ReactNode } from "react";
import { setupReactQuery } from "../../../../../config/react-query-config";
import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { useGetMasterUIConfiguration } from "../../../../../VectorFlow/Services/MTA/MDM";
import { getMasterUIConfigurationMockData } from "../../../../../mock-data/MDM";

jest.mock("../../../../Services/MTA/MDM");

const useGetMasterUIConfigurationMock = useGetMasterUIConfiguration as jest.MockedFunction<
   typeof useGetMasterUIConfiguration
>

window.URL.createObjectURL = jest.fn();

const useGetMasterUIConfigurationMockData: any = {
  mutateAsync: () => {
    return { data: getMasterUIConfigurationMockData };
  },
};

const queryClient = setupReactQuery()

const contextWrapper = (children: ReactNode,store:any) => {
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
}

describe("AddRecord Component", () => {
  beforeEach(()=>{
      useGetMasterUIConfigurationMock.mockImplementation(()=>{
      return useGetMasterUIConfigurationMockData
      })

   })

   it("renders loader on isLoading=true",()=>{
    useGetMasterUIConfigurationMock.mockImplementation(():any=>{
      return {
        mutateAsync: () => {
          return { data: getMasterUIConfigurationMockData };
        },
        isLoading:true
      }
      })
    render(contextWrapper(<AddRecord/>,store))
   })

   it("handle on submit",()=>{
    render(contextWrapper(<AddRecord/>,store))
    fireEvent.click(screen.getByText('Submit'));
   })

   it("handles on cancel",()=>{
    render(contextWrapper(<AddRecord/>,store))
    const closebtn=screen.getByText('Cancel')
    fireEvent.click(closebtn); 
   })

   it("Handles on click",()=>{
    render(contextWrapper(<AddRecord/>,store))
    const clickableElement = screen.getAllByTestId("vf-master-group-card")[0];
    fireEvent.click(clickableElement);
    fireEvent.click(clickableElement);
   })

   it("renders on the dom",()=>{
    useGetMasterUIConfigurationMock.mockImplementation(()=>{
      return useGetMasterUIConfigurationMockData
      })
    render(contextWrapper(<AddRecord/>,store))
   })
   
})
