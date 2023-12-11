import Pagination from "../../../../components/commons/Pagination"
import { PaginationWrapper, SelectedRowsCountWrapper, TotalItemsWrapper } from "./styles"
export interface VFPaginationProps{
    selectedRows:number
    totalRows:number
    currentPage:number
    rowsPerPage:number
    handleChangePage:(e:any)=>void
    handleChangePerPage:(e:any)=>void
}


const VFPagination  = (props:VFPaginationProps)=>{

    const{
        selectedRows,
        totalRows,
        currentPage,
        rowsPerPage,
        handleChangePage,
        handleChangePerPage
    } = props
    
    return(
        <PaginationWrapper data-testid="vf_pagination">
            <SelectedRowsCountWrapper>
                Selected {selectedRows} out of {totalRows}
            </SelectedRowsCountWrapper>
            <TotalItemsWrapper>
                Total Items : {totalRows}
            </TotalItemsWrapper>
            <Pagination
                page={currentPage}
                pageCount={totalRows/rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangePerPage={handleChangePerPage}
            />
        </PaginationWrapper>
    )
}

export default VFPagination