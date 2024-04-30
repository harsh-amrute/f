import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { mapRowDataWithSrNo } from "../../../../../helpers/utils"
import useTaskPendingForReview from "./useTaskPendingForReview"
import TaskPendingTaskBar from "./TaskPendingTaskBar"
import { TaskPendingWrapper } from "./styles"
import ApproveAllModal from "./ApproveAllModal"
import RejectAllModal from "./RejectAllModal"
import { useUserData } from "../../../../../context"


const TaskPendingForReview = ()=>{

    const {isSideBarOpen} = useUserData();

    const {
        ref,
        viewTableColDefs,
        detailTableColDefs,
        detailTableRowData,
        isViewTableOpen,
        viewTableRowData,
        showLoader,
        selectedRows,
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
                height={900}
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
                pagination={true}
                paginationPageSize={parseInt(process.env.REACT_APP_TASKPENDINGFORREVIEW_PAGE || '100')}  
            />
            </TaskPendingWrapper>
        )
    }
    return (
        <TaskPendingWrapper>
            <VFTable
                height={750}
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
                statusBar={{
                    statusPanels:[
                      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                      { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                      { statusPanel: 'agAggregationComponent', align: 'left' },
                    ]
                  }}
                onSelectionChanged={()=>{
                    if(ref && ref.current){
                        setSelectedRows(ref.current.api.getSelectedRows().length)
                    }
                    
                }}

                pagination={true}
                paginationPageSize={parseInt(process.env.REACT_APP_TASKPENDINGFORREVIEW_PAGE || '100')}  
                // suppressPaginationPanel={true}
            />
                    

            {/* <VFPagination
                selectedRows={selectedRows}
                totalRows={recordCount}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                showPagination={false}
                showTotalItems={false}

            /> */}
            {
                showApproveAllModal && 
                    <ApproveAllModal onSuccess={()=>onSelectionTypeSuccess('Approved')} onClose={()=>toggleApproveAllModal(false)} setSelectionType={setSelectionType}/>
            }
            {
                showRejectAllModal && 
                    <RejectAllModal onSuccess={()=>onSelectionTypeSuccess('Rejected')} onClose={()=>toggleRejectAllModal(false)} setSelectionType={setSelectionType} />
            }
            <TaskPendingTaskBar
                isSideBarOpen={isSideBarOpen}
                disableSubmit={selectedRows==0}
                onCancel={onCancel}
                onSubmit={onTaskSubmit}
            />
        </TaskPendingWrapper>
        
    )
}

export default TaskPendingForReview