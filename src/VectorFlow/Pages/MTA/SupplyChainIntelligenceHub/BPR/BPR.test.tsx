import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import BPR from './index';
import { UserDataContext } from "../../../../../context";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { setupReactQuery } from "../../../../../config/react-query-config";
import { useGetBPRData, useGetBPRRemarkHistory, useGetBPRUIConfiguration, useSubmitBPRRemark, useGetDailyData } from '../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR';
import { GetBPRDataMockResponse, GetBPRUIConfigurationMockResponse, GetDailyDataMockResponse } from '../../../../../mock-data/BPR';

import { ReactNode } from "react";
import { Provider } from "react-redux";
import {store} from "../../../../../redux/store/store";

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

const useGetBPRUIConfigurationMock = useGetBPRUIConfiguration as jest.MockedFunction<
    typeof useGetBPRUIConfiguration
  >;

const useGetBPRDataMock = useGetBPRData as jest.MockedFunction<
  typeof useGetBPRData
>

const useSubmitBPRRemarkMock = useSubmitBPRRemark as jest.MockedFunction<
  typeof useSubmitBPRRemark
>

const useGetBPRRemarkHistoryMock = useGetBPRRemarkHistory as jest.MockedFunction<
  typeof useGetBPRRemarkHistory
>

const useGetDailyDataMock = useGetDailyData as jest.MockedFunction<
  typeof useGetDailyData
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

describe('BPR Component', () => {
  global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };

  beforeEach(() => {
    useGetBPRUIConfigurationMock.mockImplementation(():any=>{
      return {data: {data:GetBPRUIConfigurationMockResponse},isLoading:false};
    })

    useGetBPRDataMock.mockImplementation(():any=>{
      return {
        mutateAsync:()=>{
          return {data:GetBPRDataMockResponse}
        }
      }
    })

    useSubmitBPRRemarkMock.mockImplementation(():any=>{
      return{
        mutateAsync:()=>{
          return{data:{
            "recordCount": "10",
            "data": [],
            "status": 200,
            "msg": "Remark Submitted Successfully",
            "errorCount": null,
            "error": null,
            "conflictErrorCount": null,
            "conflictError": null
        }}
        }
      }
    })

    useGetBPRRemarkHistoryMock.mockImplementation(():any=>{
      return{
        mutateAsync:()=>{
          return {data:{
            "recordCount": "10",
            "data": [
                {
                    "author": "Akash Shewale",
                    "date": "2023-10-20 10:20:12 am",
                    "remark": "The SKU is having trouble with the order delivery please help us with suitable actions"
                },
                {
                    "author": "Akash Shewale",
                    "date": "2023-10-20 10:20:12 am",
                    "remark": "The SKU is having trouble with the order delivery please help us with suitable actions"
                },
                {
                    "author": "Akash Shewale",
                    "date": "2023-10-20 10:20:12 am",
                    "remark": "The SKU is having trouble with the order delivery please help us with suitable actions"
                }
            ],
            "status": 200,
            "msg": null,
            "errorCount": null,
            "error": null,
            "conflictErrorCount": null,
            "conflictError": null
        }}
        }
      }
    })
  
    useGetDailyDataMock.mockImplementation(():any=>{
      return{
        mutateAsync:()=>{
          return {
            data:{data: GetDailyDataMockResponse}
          }
        }
      }
      
    })

  });
  it('renders loader when isLoading is true', () => {
    useGetBPRUIConfigurationMock.mockImplementation(():any=>{
      return {data: {data:GetBPRUIConfigurationMockResponse},isLoading:true};
    })
    render(contextWrapper(<BPR />,store));
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders BPR layout properly', () => {
    render(contextWrapper(<BPR />,store));
    // Add your assertions here to ensure the layout renders correctly
  });
});


describe("It handles all interactions",()=>{
  global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };


  beforeEach(() => {
    useGetBPRUIConfigurationMock.mockImplementation(():any=>{
      return {data: {data:GetBPRUIConfigurationMockResponse},isLoading:false};
    })

    useGetBPRDataMock.mockImplementation(():any=>{
      return {
        mutateAsync:()=>{
          return {data:GetBPRDataMockResponse}
        },
        isLoading:false
      }
    })

    useGetDailyDataMock.mockImplementation(():any=>{
      return{
        mutateAsync:()=>{
          return {
            data:{data: GetDailyDataMockResponse}
          }
        }
      }
      
    })

    useSubmitBPRRemarkMock.mockImplementation(():any=>{
      return{
        mutateAsync:()=>{
          return{data:{
            "recordCount": "10",
            "data": [],
            "status": 200,
            "msg": "Remark Submitted Successfully",
            "errorCount": null,
            "error": null,
            "conflictErrorCount": null,
            "conflictError": null
        }}
        }
      }
    })

    useGetBPRRemarkHistoryMock.mockImplementation(():any=>{
      return{
        mutateAsync:()=>{
          return {data:{
            "recordCount": "10",
            "data": [
                {
                    "author": "Akash Shewale",
                    "date": "2023-10-20 10:20:12 am",
                    "remark": "The SKU is having trouble with the order delivery please help us with suitable actions"
                },
                {
                    "author": "Akash Shewale",
                    "date": "2023-10-20 10:20:12 am",
                    "remark": "The SKU is having trouble with the order delivery please help us with suitable actions"
                },
                {
                    "author": "Akash Shewale",
                    "date": "2023-10-20 10:20:12 am",
                    "remark": "The SKU is having trouble with the order delivery please help us with suitable actions"
                }
            ],
            "status": 200,
            "msg": null,
            "errorCount": null,
            "error": null,
            "conflictErrorCount": null,
            "conflictError": null
        }}
        }
      }
    })
    render(contextWrapper(<BPR/>,store))
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
      
      const imgElement = screen.getAllByRole('img', { name: /eye icon/i })[0]
      fireEvent.click(imgElement)
    })
  })
  
})
