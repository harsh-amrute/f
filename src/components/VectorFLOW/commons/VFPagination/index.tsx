import Pagination from "../../../../components/commons/Pagination"
import { PaginationWrapper, SelectedRowsCountWrapper, TotalItemsWrapper } from "./styles"
export interface VFPaginationProps{
    selectedRows:number
    totalRows:number
    currentPage:number
    rowsPerPage:number
    handleChangePage:(e:any)=>void
    handleChangePerPage?:(e:any)=>void
    showTotalItems?:boolean,
    showPagination?:boolean
}


const VFPagination  = (props:VFPaginationProps)=>{

    const{
        selectedRows,
        totalRows,
        currentPage,
        rowsPerPage,
        handleChangePage,
        handleChangePerPage,
        showTotalItems,
        showPagination
    } = props
    
    const getTotalItemsString = () => {
        if(totalRows <= rowsPerPage) return `1-${totalRows}`;
        if(currentPage===1) return `1-${rowsPerPage}`;
        const start = (currentPage * rowsPerPage)-rowsPerPage + 1;
        const end = (currentPage)*rowsPerPage;
        if(end >= totalRows) return `${start}-${totalRows}`;
        return `${start}-${(currentPage)*rowsPerPage}`;
    }
    return(
        <PaginationWrapper data-testid="vf_pagination">
            {
                (selectedRows > 0) && <SelectedRowsCountWrapper>
                                        Selected {selectedRows} out of {totalRows}
                                      </SelectedRowsCountWrapper>
            }
            {
                showTotalItems &&  
                    <TotalItemsWrapper>
                        Total Items : {getTotalItemsString()}/{totalRows}
                    </TotalItemsWrapper>
            }
            {
                showPagination && 
                    <Pagination
                    page={currentPage}
                    pageCount={totalRows/rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangePerPage={handleChangePerPage}
                />
            }
            
           
            
        </PaginationWrapper>
    )
}

export default VFPagination