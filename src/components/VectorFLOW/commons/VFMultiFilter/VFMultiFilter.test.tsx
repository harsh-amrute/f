import { fireEvent, render, screen } from "@testing-library/react";
import VFMultiFilter from ".";
import { QueryClientProvider } from "@tanstack/react-query";
import { UserDataContext } from "../../../../context";
import { setupReactQuery } from "../../../../config/react-query-config";
import {ReactNode} from 'react'
import { useGetAllSKUs } from "../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
import {GetAllSKUsMockResponse} from '../../../../mock-data/BPR'

const mockFunction = jest.fn()

const queryClient = setupReactQuery()

jest.mock("../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR");



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
  

const useGetAllSKUMock = useGetAllSKUs as jest.MockedFunction<
    typeof useGetAllSKUs
>;

const dummyprops={
    onApplyFilter:mockFunction,
    onGoBack:mockFunction,
    selectedOption:mockFunction,
    toggleAdd:mockFunction,
    placeholder:"hello",
    supplyChainNodeFilterActive:true,
    locationFilterActive:true,
    productFilterActive:true,
    availabilityFilterActive:true,
    colorFilterActive:true,
    coverageFilterActive:true,
    horizonActive:true,
    headerText: "Header",
    headerIcon: '/assets/img/VectorFLOW/NMS/select-filter.svg',
    multiFilter: {
        supplyChainFilter:{
            id:'1',
            label:'SupplyChain',
            filters:[]
        },
        locationFilter:{
            id:'2',
            label:'Location',
            filters:[]
        },
        productFilter:{
            id:'3',
            label:'Product',
            filters:[]
        },
        availabilityFilter:{
            id:'4',
            label:'Availability',
            filters:[]
        },
        coverageFilter:{
            id:'5',
            label:'Coverage',
            filters:[]
        },
        colorFilter:{
            id:'6',
            label:'Color',
            filters:[]
        },
    },
    setMultiFilter:mockFunction,  
}


describe("VFMultiFilter Component", () => {
    global.ResizeObserver = class MockedResizeObserver {
        observe = jest.fn();
        unobserve = jest.fn();
        disconnect = jest.fn();
      };
    beforeEach(()=>{
       
        useGetAllSKUMock.mockImplementation(():any=>{
            return {data:{data:GetAllSKUsMockResponse},isLoading:false}
        })
    })

   
    // it("renders the component in the document when VFMultiFilter is true", () => {
    //     // useGetAllSKUMock.mockImplementation(():any=>{
    //     //     return {
    //     //         isLoading:false,
    //     //         data:{data:GetAllSKUsMockResponse}
    //     //     }
    //     // })
    //   render(contextWrapper(<VFMultiFilter {...dummyprops}></VFMultiFilter>))
    //     // const headerText = screen.getByText("Header")
    //     // const headerIcon = screen.getByTestId('vfmultifilter-img')
    //     // expect(headerText).toBeInTheDocument()
    //     // expect(headerIcon).toBeInTheDocument()
    //     // expect(headerIcon).toHaveAttribute('src','/assets/img/VectorFLOW/BPR/select-filter.svg')
    //     const goBackButton = screen.getByText("Go Back!"); 
    //     expect(goBackButton).toBeInTheDocument()
    //     fireEvent.click(goBackButton)
    //     const applybutton = screen.getByText("Apply Filter");
    //     expect(applybutton).toBeInTheDocument();
    // })

    it('Handles all checkboxes',()=>{
        render(contextWrapper(<VFMultiFilter {...dummyprops}></VFMultiFilter>))

        const checkboxes = screen.getAllByRole('checkbox')
        console.debug(checkboxes.length)
        checkboxes.forEach((checkbox:any)=>{
            fireEvent.click(checkbox)
        })
        checkboxes.forEach((checkbox:any)=>{
            fireEvent.click(checkbox)
        })
    })

    it('Handles all dropdowns',()=>{
        render(contextWrapper(<VFMultiFilter {...dummyprops}></VFMultiFilter>))

        const dropdowns = screen.getAllByRole('combobox')
        dropdowns.forEach((dropdown:any)=>{
            fireEvent.change(dropdown,{target:{value:'bfbf'}})
        })
        dropdowns.forEach((dropdown:any)=>{
            fireEvent.change(dropdown,{target:{value:'hfsafbshfa'}})
        })
    })

    it('Handles all input value',()=>{
        render(contextWrapper(<VFMultiFilter {...dummyprops}></VFMultiFilter>))

        const inputs = screen.getAllByPlaceholderText('Value')
        inputs.forEach((input:any)=>{
            fireEvent.change(input,{target:{value:'fsafa'}})
        })
        inputs.forEach((input:any)=>{
            fireEvent.change(input,{target:{value:'bfksabfksafkbk'}})
        })
    })

    it('handles open animation', ()=>{
        render(contextWrapper(<VFMultiFilter {...dummyprops}></VFMultiFilter>))
        const openanimation=screen.getAllByTestId('down-arrow')
        openanimation.forEach((open:any)=>{
            fireEvent.click(open)
        })
        openanimation.forEach((open:any)=>{
            fireEvent.click(open)
        })
    })

    it("renders all the filters in the component", () => {
            render(contextWrapper(<VFMultiFilter {...dummyprops}></VFMultiFilter>))
            const supplyChainNodeFilter=screen.getByTestId("supplyChainNodeFilter");
            expect(supplyChainNodeFilter).toBeInTheDocument()
            const productFilter=screen.getByTestId("productFilter");
            expect(productFilter).toBeInTheDocument()
            const availabilityFilter=screen.getByTestId("availabilityFilter");
            expect(availabilityFilter).toBeInTheDocument()
            const locationFilter=screen.getByTestId("locationFilter");
            expect(locationFilter).toBeInTheDocument()
            const coverageFilter=screen.getByTestId("coverageFilter");
            expect(coverageFilter).toBeInTheDocument()
            const colorFilter=screen.getByTestId("colorFilter");
            expect(colorFilter).toBeInTheDocument()
            const horizonActive=screen.getByTestId('horizonActive');
            expect(horizonActive).toBeInTheDocument()
        })

        // it('handles multiselect',()=>{
        //     render(contextWrapper(<VFMultiFilter {...dummyprops}></VFMultiFilter>))
        //     const allMultiSelects = screen.getAllByTestId('vfmaster-search-icon')
        //     allMultiSelects.forEach((multiSelect:any)=>{
        //         fireEvent.click(multiSelect)
        //         screen.logTestingPlaygroundURL()
               
        //         const option = screen.getByText('ARES0798C004')
        //         fireEvent.click(option)

             
        //     })
       // })
    
  })



//   it("renders the component in the document when VFMultiFilter is true", () => {
//         useGetAllSKUMock.mockImplementation(():any=>{
//             return {
//                 isLoading:false,
//                 data:{data:GetAllSKUsMockResponse}
//             }
//         })
//       render(contextWrapper(<VFMultiFilter {...dummyprops}></VFMultiFilter>))
//         // const headerText = screen.getByText("Header")
//         // const headerIcon = screen.getByTestId('vfmultifilter-img')
//         // expect(headerText).toBeInTheDocument()
//         // expect(headerIcon).toBeInTheDocument()
//         // expect(headerIcon).toHaveAttribute('src','/assets/img/VectorFLOW/BPR/select-filter.svg')

//         const goBackButton = screen.getByText("Go Back!"); 
//         expect(goBackButton).toBeInTheDocument()
//         fireEvent.click(goBackButton)
//         const applybutton = screen.getByText("Apply");
//         expect(applybutton).toBeInTheDocument();
//     })

    

