

import { screen, render, fireEvent, cleanup } from "@testing-library/react"
import VFPagination, { VFPaginationProps } from "."

const dummyFn = jest.fn()

const dummyprops:VFPaginationProps = {
    selectedRows:10,
    totalRows:900,
    rowsPerPage:10,
    currentPage:1,
    handleChangePage:dummyFn,
    handleChangePerPage:dummyFn
}

describe("VFPagination Component", () => {
  it("renders the component in the document", () => {
    render(<VFPagination {...dummyprops}/>)

    const component = screen.getByTestId('vf_pagination')
    expect(component).toBeInTheDocument()

    cleanup();
    render(<VFPagination {...dummyprops} currentPage={2}/>)
  })

  
  it("clicks on the next and previous buttons", () => {
    render(<VFPagination {...dummyprops}/>)

    const nextBtn = screen.getByText('pagination.next')
    const previousBtn = screen.getByText('pagination.previous')
    fireEvent.click(nextBtn)
    fireEvent.click(previousBtn)
    expect(dummyFn).toBeCalledTimes(2)
  })
})
