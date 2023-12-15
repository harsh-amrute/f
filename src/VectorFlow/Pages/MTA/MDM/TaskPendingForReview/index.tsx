import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import {  mapPendingTaskToColumnDefs, mapRowDataWithSrNo } from "../../../../../helpers/utils"
import useTaskPendingForReview from "./useTaskPendingForReview"

const TaskPendingForReview = ()=>{

    const {
        viewTableColDefs,
        viewTableRowData,
        detailTableColDefs,
        detailTableRowData,
        isViewTableOpen
    } = useTaskPendingForReview()


    if(isViewTableOpen){
        return(
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
                rowData={viewTableRowData}
            />
        )
    }
    return (
        <VFTable
            
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
        />
    )
}

export default TaskPendingForReview