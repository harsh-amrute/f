
import { PaginationWrapper,StatusBarLabel,StatusBarLabelLight,StatusBarLabelBold,PaginationContainer, PaginationArrowIcon } from "./styles"


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
        totalRows,
        currentPage,
        rowsPerPage,
        handleChangePage,
    } = props

    const totalPages = Math.ceil(totalRows/rowsPerPage)
    
    const getTotalItemsString = () => {
        if(totalRows <= rowsPerPage) return `1 to ${totalRows}`;        
        if(currentPage===1) return `1 to ${rowsPerPage}`;
        const start = (currentPage * rowsPerPage)-rowsPerPage + 1;
        const end = (currentPage)*rowsPerPage;
        console.debug(end,totalRows)
        if(end >= totalRows) return `${start} to ${totalRows}`;
        return `${start} to ${(currentPage)*rowsPerPage}`;
    }

    const handleOnClick = (newPage:number)=>{
        if(newPage >totalPages)return handleChangePage(totalPages)
        if(newPage<=1)return handleChangePage(1)
        return handleChangePage(newPage)
    }

    return(
        <PaginationWrapper data-testid="vf_pagination">
            <PaginationContainer>
            <StatusBarLabel>
                <StatusBarLabelBold>
                {getTotalItemsString()} 
                </StatusBarLabelBold>
                <StatusBarLabelLight>
                    of
                </StatusBarLabelLight>
                <StatusBarLabelBold>
                    {totalRows}
                </StatusBarLabelBold>
            </StatusBarLabel>
            <StatusBarLabel style={{marginLeft:'10px'}}>
                <PaginationArrowIcon 
                    src="/assets/img/VectorFLOW/NMS/pagination-last-arrow.svg" 
                    style={{transform:'rotate(180deg)'}} 
                    onClick={()=>handleOnClick(0)}
                    alt="pagination-last-prev-arrow"
                />
                <PaginationArrowIcon 
                    src="/assets/img/VectorFLOW/NMS/pagination-arrow.svg" 
                    style={{transform:'rotate(180deg)'}} 
                    onClick={()=>handleOnClick(currentPage - 1)}
                    alt="pagination-prev-arrow"
                />
                <StatusBarLabelLight>
                    Page
                </StatusBarLabelLight>
                <StatusBarLabelBold>
                    {currentPage}
                </StatusBarLabelBold>
                <StatusBarLabelLight>
                    of
                </StatusBarLabelLight>
                <StatusBarLabelBold>
                    {totalPages}
                </StatusBarLabelBold>  
                
                <PaginationArrowIcon 
                    src="/assets/img/VectorFLOW/NMS/pagination-arrow.svg" 
                    onClick={()=>handleOnClick(currentPage + 1)}
                    alt="pagination-next-arrow"    
                />
                <PaginationArrowIcon 
                    src="/assets/img/VectorFLOW/NMS/pagination-last-arrow.svg" 
                    onClick={()=>handleOnClick(totalPages)}
                    alt="pagination-last-next-arrow"  
                />
            </StatusBarLabel>
            </PaginationContainer>
            
        </PaginationWrapper>
    )
}

export default VFPagination