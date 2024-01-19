import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { mapRowDataWithSrNo } from "../../../../../helpers/utils"
import useTaskPendingForReview from "./useTaskPendingForReview"
import TaskPendingTaskBar from "./TaskPendingTaskBar"
import { TaskPendingWrapper } from "./styles"


const TaskPendingForReview = ()=>{

    const {
        ref,
        viewTableColDefs,
        detailTableColDefs,
        detailTableRowData,
        isViewTableOpen,
        viewTableRowData,
        showLoader,
        selectedRows,
        recordCount,
        currentPage,
        rowsPerPage,
        handleChangePage,
        onCancel,
        setSelectedRows
    } = useTaskPendingForReview()


    if(showLoader){
        return <VFLoader/>
    }

    if(isViewTableOpen){
        return(
            <TaskPendingWrapper>
                <VFTable
                columnDefs={viewTableColDefs}
                gridOptions={{
                    getRowStyle: (params: any) => {
                      if (params.node.rowIndex % 2 === 0) {
                        return { background: "#EBEBEB" };
                      }
                      return { background: "#F7F7F7" };
                    },
                  }}
                rowData={mapRowDataWithSrNo(viewTableRowData)}  
            />
            </TaskPendingWrapper>
        )
    }
    return (
        <TaskPendingWrapper>
            <VFTable
                ref={ref}
                columnDefs={detailTableColDefs}
                gridOptions={{
                    getRowStyle: (params: any) => {
                    if (params.node.rowIndex % 2 === 0) {
                        return { background: "#EBEBEB" };
                    }
                    return { background: "#F7F7F7" };
                    },
                }}
                rowData={detailTableRowData}
                rowSelection='multiple'
                suppressRowClickSelection
                onSelectionChanged={()=>{
                    if(ref && ref.current){
                        setSelectedRows(ref.current.api.getSelectedRows().length)
                    }
                    
                }}
                pagination={true}
                paginationPageSize={rowsPerPage}
                suppressPaginationPanel={true}
            />
            <VFPagination
                selectedRows={selectedRows}
                totalRows={recordCount}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}

            />
            <TaskPendingTaskBar
                disableSubmit={selectedRows==0}
                onCancel={onCancel}
                onSubmit={()=>console.log('')}
            />
        </TaskPendingWrapper>
        
    )
}

export default TaskPendingForReview