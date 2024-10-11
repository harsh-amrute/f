import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { mapRowDataWithSrNo } from "../../../../../helpers/utils"
import useTaskPendingForReview from "./useTaskPendingForReview"
import TaskPendingTaskBar from "./TaskPendingTaskBar"
import { TaskPendingWrapper } from "./styles"
import ApproveAllModal from "./ApproveAllModal"
import RejectAllModal from "./RejectAllModal"
import {useEffect, useState} from 'react'
import { useUserData } from "../../../../../context"
import { useGetMTOTaskStatusData } from "../../../../../VectorFlow/Services/MTA/MDM"


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

    if(showLoader) return <VFLoader/>

    // const [mtoPendingData, setMTOPendingData] = useState<any>([]);
    // const {mutateAsync: getMTOTaskStatusData} = useGetMTOTaskStatusData();
    const MTOToMTAFormat=(inData: any)=>{

      const newData:any = [];
      inData.forEach((val:any)=>{
          const newVal:any = {}
          newVal.TaskID = val.tid;
          newVal.PendingSince = val.co;
          newVal.TaskName = val.tnm;
          newVal.TaskStatus = val.std;
          newVal.Requester = val.r_nm;

          newData.push(newVal);
      })

      return newData;
  }

  const getMTOTaskData = async()=>{
      try{
          // const response = await getMTOTaskStatusData();
          // const response = {data: {data: {results: []}}}
          // console.log("MTO task data....", response.data.data.results);
          // const transformedData = MTOToMTAFormat(response.data.data.results);
          // if(viewTableRowData){
          //     setMTOPendingData([...viewTableRowData, ...transformedData])
          // }
          // else{

          //     setMTOPendingData([...transformedData]);
          // }
      }
      catch(error){
          console.log(error)
      }
  }


    // useEffect(()=>{
      // if(viewTableRowData){
      //   getMTOTaskData();
      // }
      
    // },[viewTableRowData])

    if(isViewTableOpen){
        return(
            <TaskPendingWrapper>
                <VFTable
                height={"100%"}
                columnDefs={viewTableColDefs}
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
                // rowData={mtoPendingData}
                pagination={true}
                paginationPageSize={parseInt(process.env.REACT_APP_TASKPENDINGFORREVIEW_PAGE || '100')}  
            />
            </TaskPendingWrapper>
        )
    }
    return (
        <TaskPendingWrapper>
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
                suppressRowClickSelection 
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
                disableSubmit={selectedRows!==detailTableRowData.length}
                onCancel={onCancel}
                onSubmit={onTaskSubmit}
            />
        </TaskPendingWrapper>
        
    )
}

export default TaskPendingForReview