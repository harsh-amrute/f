import Pagination from "../../../../components/commons/Pagination"
import { PaginationWrapper, SelectedRowsCountWrapper, TotalItemsWrapper } from "./styles"

interface SelectedRowsCountProps{
    selectedRows:number
    totalRows:number
}


interface VFPaginationProps{
    masterProgress:string
    selectedRows:number
    totalRows:number
    currentPage:number
    totalPages:number
    handleChangePage:(e:any)=>void
    handleChangePerPage:(e:any)=>void
}

const SelectedRowsCount = (props:SelectedRowsCountProps)=>{

    const{
        selectedRows,
        totalRows
    } = props

    return(
        <SelectedRowsCountWrapper>
            Selected {selectedRows} out of {totalRows}
        </SelectedRowsCountWrapper>
    )
}

const VFPagination  = (props:VFPaginationProps)=>{

    const{
        masterProgress,
        selectedRows,
        totalRows,
        currentPage,
        totalPages,
        handleChangePage,
        handleChangePerPage
    } = props
    

    return(
        <PaginationWrapper>
            <SelectedRowsCount
                selectedRows={selectedRows}
                totalRows={totalRows}
            />
            <TotalItemsWrapper>
                Total Items : {totalRows}
            </TotalItemsWrapper>
            <Pagination
                page={currentPage}
                pageCount={totalPages}
                handleChangePage={handleChangePage}
                handleChangePerPage={handleChangePerPage}
            />
        </PaginationWrapper>
    )
}

export default VFPagination