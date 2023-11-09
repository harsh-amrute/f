import { screen, render } from "@testing-library/react"
import VFModal from "."

const dummyprops = {
  openModal: true,
  closeModal: jest.fn(),
  headerText: "Header",
  headerIcon: '/assets/img/VectorFLOW/NMS/warning.svg',
  children:<p>Hello</p>
}

describe("VFModalCard Component", () => {
  it("renders the component in the document when openModal is true", () => {
    render(<VFModal {...dummyprops}>Hello</VFModal>)
    const headerText = screen.getByText("Header")
    const headerIcon = screen.getByTestId('vfmodal-img')
    expect(headerText).toBeInTheDocument()
    expect(headerIcon).toBeInTheDocument()
    expect(headerIcon).toHaveAttribute('src','/assets/img/VectorFLOW/NMS/warning.svg')
  })
  
})
