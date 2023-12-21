import { screen, render } from "@testing-library/react"
import { UserDataContext } from "../../../../../context"
import SelectGroupedMasters from "../../../../../components/VectorFLOW/layouts/SelectGroupedMasters"
import {fireEvent,} from "@testing-library/react";

const mockFunction = jest.fn()

const dummyprops = {
    allMasters:[],
    onSubmit:mockFunction,
    onCancel:mockFunction,
    onSelectMasters:mockFunction,
    mapMasterUIToMasterGroup:mockFunction,
    handleOnClickMaster:mockFunction
    
 

}
   

describe("AddRecord Component", () => {
    it("renders the document", () => {
      render( <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
                <SelectGroupedMasters {...dummyprops} />
              </UserDataContext.Provider>)
                 const submit = screen.getByText("Submit");
                 fireEvent.click(submit);
                 const cancel=screen.getByText("cancel");
                 fireEvent.click(cancel);
    
    })
    
  })
