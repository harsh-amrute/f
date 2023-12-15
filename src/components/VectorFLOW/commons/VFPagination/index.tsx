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
    
    const getTotalItemsString = () => {
        if(totalRows <= rowsPerPage) return `1-${totalRows}`;
        if(currentPage===1) return `1-${rowsPerPage}`;
        return `${(currentPage * rowsPerPage)+1}-${(currentPage+1)*rowsPerPage}`;
    }
    return(
        <PaginationWrapper data-testid="vf_pagination">
            <SelectedRowsCountWrapper>
                Selected {selectedRows} out of {totalRows}
            </SelectedRowsCountWrapper>
            <TotalItemsWrapper>
                Total Items : {getTotalItemsString()}/{totalRows}
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