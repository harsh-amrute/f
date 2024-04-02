import { screen,render,fireEvent, act, waitFor } from "@testing-library/react";
import SelectCategory from ".";
import { UserDataContext } from "../../../../context";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { setupReactQuery } from "../../../../config/react-query-config";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import {store} from "../../../../redux/store/store";

const dummyprops = {
    childMonitorCount:100,
    parentMonitorCount:100,
    childExpediteCount:100,
    parentExpediteCount:100,
    reviewExcessInventoryCount:100,
    reviewOrderFulfillmentCount:100,
    onMonitorParentClick:jest.fn(),
    onMonitorChildClick:jest.fn(),
    onExpediteParentClick:jest.fn(),
    onExpediteChildClick:jest.fn(),
    onExcessInventoryReviewClick:jest.fn(),
    onOrderFulfillmentReviewClick:jest.fn(),
}

const queryClient = setupReactQuery();

const contextWrapper = (children: ReactNode,store:any) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Provider store={store}>
            <UserDataContext.Provider
              value={{
                user: { user: { theme_ui: "NOIRFUSION" } },
                changeColorTheme: (color:any) => {
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
  };



describe ("SelectCategory Component", () => {
    it("renders the Select Category component", async () => {
        render (contextWrapper(<SelectCategory{...dummyprops}></SelectCategory>,store));

        const btn = screen.getAllByText('From Parent')[0];
        fireEvent.click(btn);
        expect(btn).toBeInTheDocument();

        const count=screen.getAllByText('100')[0];
        expect(count).toBeInTheDocument();
        act(()=>{
            
            const button=screen.getAllByText('Edit Filter')[0]
            expect(button).toBeInTheDocument();
            fireEvent.click(button);
        })
        screen.logTestingPlaygroundURL()
        
    })

})