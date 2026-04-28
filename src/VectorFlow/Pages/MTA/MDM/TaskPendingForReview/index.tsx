import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { mapRowDataWithSrNo } from "../../../../../helpers/utils"
import useTaskPendingForReview from "./useTaskPendingForReview"
import TaskPendingTaskBar from "./TaskPendingTaskBar"
import { TaskPendingWrapper } from "./styles.css"
import ApproveAllModal from "./ApproveAllModal"
import RejectAllModal from "./RejectAllModal"
import { useUserData } from "../../../../../context"
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../redux/store/store"


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
        setSelectionType,
        noDataMessage,
        handleChangePage,
        chunkSize,
        currentPage,
        onSelectionTypeSuccess1,
        handleChangePage1,
        isBulkAction,
        disableSubmitButton
    } = useTaskPendingForReview()

    const EnvConfig = useSelector((state:RootState) =>state.mta.EnvConfig);
    const TASKPENDINGFORREVIEW_PAGE = EnvConfig['TASKPENDINGFORREVIEW_PAGE'];  
    const recordCount = useSelector((state:RootState) =>state.mdm.recordCount);
    let isAllDataVisible = true;
    if (recordCount <= chunkSize || !isBulkAction) {
      isAllDataVisible = false;
    }
    const approveButtonLabel = isAllDataVisible ? "Submit All" : `Ok`;

    const rejectButtonLabel = isAllDataVisible ? "Reject All" : `Ok`;

    if(showLoader) return <VFLoader/>
    const suppressMovable = true;
        return (
          isViewTableOpen ? (
            <div className={TaskPendingWrapper}>
                    <VFTable
                    height={"100%"}
                    columnDefs={viewTableColDefs}
                    suppressMovableColumns={suppressMovable}
                    gridOptions={{
                        getRowStyle: (params: any) => {
                          if (params.node.rowIndex % 2 === 0) {
                            return { background: "#EBEBEB" };
                          }
                          return { background: "#F7F7F7" };
                        },
                        enableRangeSelection:true,
                        rowSelection:'multiple',
                      }}
                      statusBar={{
                        statusPanels:[
                          { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                          { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                          { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                          { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                          { statusPanel: 'agAggregationComponent', align: 'left' },
                        ]
                      }}
                    rowData={mapRowDataWithSrNo(viewTableRowData)}
                    localeText={{ noRowsToShow: noDataMessage?.length>0?noDataMessage:"No data to approve."}}
                    pagination={false}
                    paginationPageSize={parseInt(TASKPENDINGFORREVIEW_PAGE || '100')}  
                />
                </div>
          ): (
            <div className={TaskPendingWrapper}>
                <VFTable
                    height={"85%"}
                    ref={ref}
                    columnDefs={detailTableColDefs}
                    gridOptions={{
                        readOnlyEdit:false,
                        getRowStyle: (params: any) => {
    
                        if (params.node.rowIndex % 2 === 0) {
                            return { background: "#EBEBEB" };
                        }
    
                        return { background: "#F7F7F7" };
                        },
                        enableRangeSelection:true,
                        rowSelection:'multiple',
                      }}
                      statusBar={{
                        statusPanels:[
                          { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                          { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                          { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                          { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                          { statusPanel: 'agAggregationComponent', align: 'left' },
                        ]
                      }}
                    rowData={detailTableRowData}
                    localeText={{ noRowsToShow: noDataMessage?.length>0?noDataMessage:"No data to approve."}}
                    suppressRowClickSelection 
                    onSelectionChanged={()=>{
                        if(ref && ref.current){
                            setSelectedRows(ref.current.api.getSelectedRows().length)
                        }
    
                    }}
                    onGridReady={() => {
                        const api = ref.current?.api;
                        if (!api) return;
                        api.forEachNode((rowNode) => {
                            if (rowNode.data?.status === "Rejected") {
                                rowNode.setSelected(true);
                            }
                        });
                    }}
                    pagination={true} 
                    suppressPaginationPanel={true}
                    paginationPageSize={parseInt(TASKPENDINGFORREVIEW_PAGE || '100')}  
                    // paginationPageSize={50}
                    // suppressPaginationPanel={true}
                />
    
    
                <VFPagination
                    selectedRows={selectedRows}
                    totalRows={recordCount}
                    currentPage={currentPage}
                    rowsPerPage={chunkSize}
                    handleChangePage={isBulkAction ? handleChangePage1  :handleChangePage}
                    showPagination={true}
                    showTotalItems={true}
    
                />
                {
                    showApproveAllModal && 
                        <ApproveAllModal onSuccess={() => isBulkAction === true ? onSelectionTypeSuccess1('Approved') : onSelectionTypeSuccess('Approved')} onClose={()=>toggleApproveAllModal(false)} setSelectionType={setSelectionType} isAllDataVisible={isAllDataVisible} approveButtonLabel={approveButtonLabel} isBulkAction={isBulkAction}/>
                }
                {
                    showRejectAllModal && 
                        <RejectAllModal onSuccess={()=> isBulkAction === true ? onSelectionTypeSuccess1('Rejected') : onSelectionTypeSuccess('Rejected')} onClose={()=>toggleRejectAllModal(false)} setSelectionType={setSelectionType} isAllDataVisible={isAllDataVisible} rejectButtonLabel={rejectButtonLabel} isBulkAction={isBulkAction}/>
                }
                <TaskPendingTaskBar
                    isSideBarOpen={isSideBarOpen}
                    disableSubmit={(selectedRows!==detailTableRowData?.length) || disableSubmitButton}
                    onCancel={onCancel}
                    onSubmit={onTaskSubmit}
                    isAllDataVisible={isAllDataVisible}
                />
            </div>
          )
        )   
     
    // if(isViewTableOpen){
    //     return(
    //         <TaskPendingWrapper>
    //             <VFTable
    //             height={"100%"}
    //             columnDefs={viewTableColDefs}
    //             suppressMovableColumns={suppressMovable}
    //             gridOptions={{
    //                 getRowStyle: (params: any) => {
    //                   if (params.node.rowIndex % 2 === 0) {
    //                     return { background: "#EBEBEB" };
    //                   }
    //                   return { background: "#F7F7F7" };
    //                 },
    //                 enableRangeSelection:true,
    //                 rowSelection:'multiple',
    //               }}
    //               statusBar={{
    //                 statusPanels:[
    //                   { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
    //                   { statusPanel: 'agTotalRowCountComponent', align: 'left' },
    //                   { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
    //                   { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
    //                   { statusPanel: 'agAggregationComponent', align: 'left' },
    //                 ]
    //               }}
    //             rowData={mapRowDataWithSrNo(viewTableRowData)}
    //             localeText={{ noRowsToShow: noDataMessage?noDataMessage:"No data to approve."}}
    //             pagination={true}
    //             paginationPageSize={parseInt(process.env.REACT_APP_TASKPENDINGFORREVIEW_PAGE || '100')}  
    //         />
    //         </TaskPendingWrapper>
    //     )
    // }
    // return (
    //     <TaskPendingWrapper>
    //         <VFTable
    //             height={"85%"}
    //             ref={ref}
    //             columnDefs={detailTableColDefs}
    //             gridOptions={{
    //                 readOnlyEdit:false,
    //                 getRowStyle: (params: any) => {
                        
    //                 if (params.node.rowIndex % 2 === 0) {
    //                     return { background: "#EBEBEB" };
    //                 }
                    
    //                 return { background: "#F7F7F7" };
    //                 },
    //                 enableRangeSelection:true,
    //                 rowSelection:'multiple',
    //               }}
    //               statusBar={{
    //                 statusPanels:[
    //                   { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
    //                   { statusPanel: 'agTotalRowCountComponent', align: 'left' },
    //                   { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
    //                   { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
    //                   { statusPanel: 'agAggregationComponent', align: 'left' },
    //                 ]
    //               }}
    //             rowData={detailTableRowData}
    //             suppressRowClickSelection 
    //             onSelectionChanged={()=>{
    //                 if(ref && ref.current){
    //                     setSelectedRows(ref.current.api.getSelectedRows().length)
    //                 }
                    
    //             }}
    //             pagination={true}
    //             paginationPageSize={parseInt(process.env.REACT_APP_TASKPENDINGFORREVIEW_PAGE || '100')}  
    //             // paginationPageSize={50}
    //             // suppressPaginationPanel={true}
    //         />
                    

    //         {/* <VFPagination
    //             selectedRows={selectedRows}
    //             totalRows={recordCount}
    //             currentPage={currentPage}
    //             rowsPerPage={rowsPerPage}
    //             handleChangePage={handleChangePage}
    //             showPagination={false}
    //             showTotalItems={false}

    //         /> */}
    //         {
    //             showApproveAllModal && 
    //                 <ApproveAllModal onSuccess={()=>onSelectionTypeSuccess('Approved')} onClose={()=>toggleApproveAllModal(false)} setSelectionType={setSelectionType}/>
    //         }
    //         {
    //             showRejectAllModal && 
    //                 <RejectAllModal onSuccess={()=>onSelectionTypeSuccess('Rejected')} onClose={()=>toggleRejectAllModal(false)} setSelectionType={setSelectionType} />
    //         }
    //         <TaskPendingTaskBar
    //             isSideBarOpen={isSideBarOpen}
    //             disableSubmit={selectedRows!==detailTableRowData?.length}
    //             onCancel={onCancel}
    //             onSubmit={onTaskSubmit}
    //         />
    //     </TaskPendingWrapper>
        
    // )
}

export default TaskPendingForReview