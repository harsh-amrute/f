import { render } from "@testing-library/react"
import ChartView from '.';
import { MonitorGITChildMockData } from "../../../../../../mock-data/Planning";

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

  it("Renders Chart View",() => {
    render(<ChartView category="" currentTab="" currentGraphData={[]}/>)
    render(<ChartView category="GITToChild" currentTab="locationWise" currentGraphData={MonitorGITChildMockData}/>)
    render(<ChartView category="GITToChild" currentTab="transporterWise" currentGraphData={MonitorGITChildMockData}/>)
    render(<ChartView category="GITToChild" currentTab="custom" currentGraphData={MonitorGITChildMockData}/>)
    render(<ChartView category="GITToChild" currentTab="" currentGraphData={MonitorGITChildMockData}/>)
    render(<ChartView category="GITFromParent" currentTab="" currentGraphData={MonitorGITChildMockData}/>)
    render(<ChartView category="ExpediteFromParent" currentTab="expediteDispatches" currentGraphData={[]}/>)
    render(<ChartView category="ExpediteFromParent" currentTab="CreateAvailabilityAtParent" currentGraphData={[]}/>)
    render(<ChartView category="ExpediteFromParent" currentTab="CustomScreens" currentGraphData={[]}/>)
    render(<ChartView category="ExcessInventory" currentTab="CustomScreens" currentGraphData={[]}/>)
    render(<ChartView category="OrderFulfillment" currentTab="CustomScreens" currentGraphData={[]}/>)

  })

})