import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import { UserDataContext } from "../../../../../context";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { setupReactQuery } from "../../../../../config/react-query-config";
import {GetStateMockResponse,ResetStateMockResponse,SaveStateMockResponse} from '../../../../../mock-data/BPR';

import {useGetState,useResetState,useSaveState} from '../../../../Services/MTA/SupplyChainIntelligenceHub/BPR'
import { ReactNode } from "react";
import { Provider } from "react-redux";
import {store} from "../../../../../redux/store/store";
import OpenExpeditingRequests from './index';

// Mock context data

jest.mock('../../../../Services/MTA/SupplyChainIntelligenceHub/BPR')

// const mockContextValue = {
//   user: { user: { theme_ui: "NOIRFUSION" } },
//   changeColorTheme: jest.fn(),
//   isSideBarOpen: true,
//   toggleSideBar: jest.fn()
// };

// Mock the query client
const queryClient = setupReactQuery();

const useGetStateMock = useGetState as jest.MockedFunction<
typeof useGetState
>

const useSaveStateMock = useSaveState as jest.MockedFunction<
typeof useSaveState
>

const useResetStateMock = useResetState as jest.MockedFunction<
typeof useResetState
>

// const contextWrapper = (children:any) => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//           <UserDataContext.Provider value={mockContextValue}>
//             {children}
//           </UserDataContext.Provider>
//       </Router>
//     </QueryClientProvider>
//   );
// }


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



describe("It handles all interactions",()=>{
  global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };


  beforeEach(() => {
    useGetStateMock.mockImplementation(():any=>{
      return{
        mutateAsync:()=>{
          return {
            data:{data: GetStateMockResponse}
          }
        }
      }
      
    })

    useSaveStateMock.mockImplementation(():any=>{
      return{
        mutateAsync:()=>{
          return {
            data:{data: SaveStateMockResponse}
          }
        }
      }
      
    })

    useResetStateMock.mockImplementation(():any=>{
      return{
        mutateAsync:()=>{
          return {
            data:{data: ResetStateMockResponse}
          }
        }
      }
      
    })

    render(contextWrapper(<OpenExpeditingRequests/>,store))
  });

  it("submits a remark",async()=>{
   
    await waitFor(async () => {
      // Perform interactions after the data has been fetched
      const cell = screen.getAllByPlaceholderText("Type Remark")[0];
     
      fireEvent.click(cell);

      const textarea = screen.getByPlaceholderText("Type your remark here");
      fireEvent.change(textarea,{ target: { value: 'Some remark' } })

      const submitBtn = screen.getByText('Submit')
      fireEvent.click(submitBtn)
    });
  })

  it('clicks on remarkhistory',async()=>{
    await waitFor(async()=>{
      
      const imgElement = screen.getAllByRole('img', { name: /history icon/i })[0]
      fireEvent.click(imgElement)
    })
  })
  
})
