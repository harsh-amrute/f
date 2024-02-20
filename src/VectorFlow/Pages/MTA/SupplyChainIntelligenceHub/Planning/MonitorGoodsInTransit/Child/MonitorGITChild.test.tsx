import { render} from "@testing-library/react"
import MonitorGITChildLocationWise from "./LocationWise";
import { MonitorGITChildMockData ,MonitorGITChildLocationWiseMockData, MonitorGITChildTransporterWiseMockData } from "../../../../../../../mock-data/Planning";
import MonitorGITChildCustom from "./Custom";

// const mockFn = jest.fn()

// const contextWrapper = (children:any)=>{
//     return (
//         <UserDataContext.Provider
//             value={{
//               user: { user: { theme_ui: "NOIRFUSION" } },
//               changeColorTheme: (color) => {
//                 return color;
//               },
//               isSideBarOpen:true,toggleSideBar:jest.fn
//             }}
//           >
//             {children}
//           </UserDataContext.Provider>
//     )
// }

describe("Monitor GIT Child",()=>{
  global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };

  it("Renders Location Wise View",() => {
    render(<MonitorGITChildLocationWise data={MonitorGITChildLocationWiseMockData}/>)
  })

  it("Renders Location Wise View",() => {
    render(<MonitorGITChildLocationWise data={MonitorGITChildTransporterWiseMockData}/>)
  })

  it("Renders Custom View",() => {
    render(<MonitorGITChildCustom data={MonitorGITChildMockData}/>)
  })

})