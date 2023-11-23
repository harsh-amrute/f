import { render, screen } from "@testing-library/react"
import { UserDataContext } from "../../../../../context"
import VFTaskBar from "./VFTaskbar"

const mockFn = jest.fn()
const dummyProps = {
    onBack:mockFn,
    onClearAndExportErrors:mockFn,
    onModifyData:mockFn,
    onReset:mockFn,
    onSubmit:mockFn,
    onDeleteSelected:mockFn,
    onExportData:mockFn
}

const contextWrapper = (children:any)=>{
    return (
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
    )
}

describe("VFTaskBar",()=>{
    it('renders the VFTaskBar',()=>{
        render(contextWrapper(<VFTaskBar {...dummyProps} masterProgress="submitted"/>))
        const taskbar = screen.getByTestId("taskbar")
        expect(taskbar).toBeInTheDocument()
    })
    it('renders the VFTaskBar with masterPrgoress=view',()=>{
        render(contextWrapper(<VFTaskBar {...dummyProps} masterProgress="view"/>))
        const taskbar = screen.getByTestId("taskbar")
        expect(taskbar).toBeInTheDocument()
    })
    it('renders the VFTaskBar with masterPrgoress=default',()=>{
        render(contextWrapper(<VFTaskBar {...dummyProps} masterProgress="default"/>))
    })
    it('renders the VFTaskBar with masterPrgoress=error',()=>{
        render(contextWrapper(<VFTaskBar {...dummyProps} masterProgress="error"/>))
        const taskbar = screen.getByTestId("taskbar")
        expect(taskbar).toBeInTheDocument()
    })
    it('renders the VFTaskBar with masterPrgoress=uploaded',()=>{
        render(contextWrapper(<VFTaskBar {...dummyProps} masterProgress="uploaded"/>))
        const taskbar = screen.getByTestId("taskbar")
        expect(taskbar).toBeInTheDocument()
    })
    
})