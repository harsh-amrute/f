import { render,screen } from "@testing-library/react"
import SavedDrafts from "."


describe("Handles all renders",()=>{
   it("renders on the dom",()=>{
    render(<SavedDrafts/>)
    const grid = screen.getByTestId('grid')
    expect(grid).toBeInTheDocument()
   })

})