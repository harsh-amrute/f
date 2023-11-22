import { screen, render } from "@testing-library/react"
import WarningModal from "./WarningModal"
import { UserDataContext } from "../../../../../context"

const mockFunction = jest.fn()

const dummyprops = {
  count:10,
  onSuccess:mockFunction,
  onFailure:mockFunction,
  onCloseModal:mockFunction
}

describe("WarningModal Component", () => {
  it("renders the count props in the document ", () => {
    render( <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
              <WarningModal {...dummyprops} />
            </UserDataContext.Provider>)
    const Modalcount = screen.getByText(10)
    expect(Modalcount).toBeInTheDocument()
   
  })
  
})
