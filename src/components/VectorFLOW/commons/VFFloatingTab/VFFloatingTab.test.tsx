import {screen, render, fireEvent } from "@testing-library/react";
import VFFloatingTab, { VFFloatingTabProps } from ".";

const dummyId = '1'

const mockFn = jest.fn()

const dummyProps:VFFloatingTabProps = {
    tabs:[
        {
            id:dummyId,
            label:"One",
            value:"one"
        },
        {
            id:'2',
            label:"Two",
            value:"two"
        },
        {
            id:'3',
            label:"Three",
            value:"three"
        }
    ],
    defaultTab:1,
    handleClick:mockFn
}


describe('Filter Component', () => {
    it("Renders the component with all the props",()=>{
        render(<VFFloatingTab {...dummyProps}/>)
        const element = screen.getByText('One')
        fireEvent.click(element)
    })
    it("Renders the component with required props",()=>{
        render(<VFFloatingTab tabs={dummyProps.tabs}/>)
        const element = screen.getByText('Two')
        fireEvent.click(element)
    })
});



