import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { mapRowDataWithSrNo } from "../../../../../helpers/utils"
import useTaskPendingForReview from "./useTaskPendingForReview"
import TaskPendingTaskBar from "./TaskPendingTaskBar"
import { TaskPendingWrapper } from "./styles"
import ApproveAllModal from "./ApproveAllModal"
import RejectAllModal from "./RejectAllModal"


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
        setSelectedRows,
        onTaskSubmit,
        showApproveAllModal,
        toggleApproveAllModal,
        showRejectAllModal,
        toggleRejectAllModal,
        onSelectionTypeSuccess,
        setSelectionType
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
                // suppressPaginationPanel={true}
            />
            <VFPagination
                selectedRows={selectedRows}
                totalRows={recordCount}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                showPagination={false}
                showTotalItems={false}

            />
            {
                showApproveAllModal && 
                    <ApproveAllModal onSuccess={()=>onSelectionTypeSuccess('Approved')} onClose={()=>toggleApproveAllModal(false)} setSelectionType={setSelectionType}/>
            }
            {
                showRejectAllModal && 
                    <RejectAllModal onSuccess={()=>onSelectionTypeSuccess('Rejected')} onClose={()=>toggleRejectAllModal(false)} setSelectionType={setSelectionType} />
            }
            <TaskPendingTaskBar
                disableSubmit={selectedRows==0}
                onCancel={onCancel}
                onSubmit={onTaskSubmit}
            />
        </TaskPendingWrapper>
        
    )
}

export default TaskPendingForReview