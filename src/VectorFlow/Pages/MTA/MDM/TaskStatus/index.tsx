import React, { useRef, useState } from "react"

import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"

import {  getActionName, mapTaskStatusToColDefs,getExistingColumns,getExistingColumnFields, mapMasterToTaskStatusColumnGroupDefs, mapTaskStatusDataToRowData } from "../../../../../helpers/utils"
import TaskStatusMasterDetail from "./TaskStatusMasterDetail"
import { useGetTaskDetailDownloadData, useGetTaskStatusData,useGetMasterUIConfiguration } from "../../../../../VectorFlow/Services/MTA/MDM"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import { GridRef, Master } from "../../../../../VectorFlow/types/MDM"
import { AgGridReactProps } from "ag-grid-react"
import { notifyError } from "../../../../../helpers/notify"
import { ColDef } from "ag-grid-enterprise"
import { differenceInDays} from "date-fns"


const TaskStatus = ()=>{


    const {data,isLoading} = useGetTaskStatusData()
    const gridRef = useRef<GridRef>()

    const {mutateAsync:getTaskDetailDownloadData} = useGetTaskDetailDownloadData()
    const {mutateAsync:getMasterUIConfiguration} = useGetMasterUIConfiguration()

    
    
    const [tempAgGridRowData,setTempAgridRowData] = useState<any>([])
    const [currentMasterName,setCurrentMasterName] = useState<string>('')
    const [tempAgGridColDefs,setTempAgGridColDefs] = useState<ColDef[]>([])
    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);
    
    const tempAgGridProps:AgGridReactProps = {
        columnDefs:tempAgGridColDefs,
        onRowDataUpdated:(event)=>{
          if(tempDownloadData)event.api.exportDataAsExcel({fileName:currentMasterName });
        }
      };

    const onDownloadTaskDetails = async(payload:any)=>{
        
       try{
        const actionName = getActionName(payload.Actiontype).value
        const response = await getTaskDetailDownloadData({taskId:payload.TaskID,approverId:payload.ApproverId})
        const currentTaskMaster = response.data.data[0]
        const currentTaskMasterId:number = currentTaskMaster.MasterId
        
        const uiConfigurationResponse = await getMasterUIConfiguration(actionName)
        
        const masters:Master[] = uiConfigurationResponse.data.data
        const currentMasterFields = masters.find((master:Master)=>master.id==currentTaskMasterId)
       
        if(currentMasterFields){
          setCurrentMasterName(currentMasterFields.name)
          const existingColumns = getExistingColumns(payload.Actiontype==2?JSON.parse(currentTaskMaster.data[0].new):currentTaskMaster.data[0])
          const existingColumnFields = getExistingColumnFields(existingColumns,currentMasterFields.fields)
          setTempAgGridColDefs(mapMasterToTaskStatusColumnGroupDefs(existingColumnFields,currentTaskMasterId,actionName))
          setTempAgridRowData(mapTaskStatusDataToRowData(currentTaskMaster.data,existingColumnFields,actionName))
          setTempDownloadData(true)
        }
       }catch(error:any){
        notifyError(error.message)
       }
    }

    const rowData = data?.data.data || []
    // rowData = rowData.map((row:any)=>{
    //     return {
    //         ...row,
    //         PendingSince:formatMDMDate(row.PendingSince),
           
    //     }
    // })
    rowData.sort((a:any,b:any)=>{
       
       return differenceInDays(b.PendingSince,a.PendingSince) 
    })
    // rowData = rowData.map((r:any)=>{
    //     return {
    //         ...r,
    //         PendingSince:format(r.PendingSince,'dd/MM/yy hh:mm:ss a')
    //     }
    // })

    if(isLoading){
        return <VFLoader/>
    }

    return(
        <React.Fragment>
            <VFTable
                masterDetail
                detailCellRenderer={TaskStatusMasterDetail}
                detailCellRendererParams={{
                    onDownload:onDownloadTaskDetails
                }}
                rowHeight={60}
                detailRowAutoHeight
                gridOptions={{
                    getRowStyle: (params: any) => {
                        if (params.node.rowIndex % 2 === 0) {
                            return { background: "#EBEBEB" };
                        }
                        return { background: "#F7F7F7" };
                    }
                }}
                rowData={rowData}
                columnDefs={mapTaskStatusToColDefs([
                    {
                        field:"TaskID",
                        colId:"TaskID",
                        headerName:"Task Id",
                        flex:1,
                        cellStyle: {
                            "textAlign": "center",
                        },
                        cellRenderer: 'agGroupCellRenderer' 
                    },
                    {
                        field:"PendingSince",
                        colId:"PendingSince",
                        headerName:"Date",
                        flex:1,
                        cellStyle: {
                            "textAlign": "center",
                        }
                    },
                    {
                        field:"TaskName",
                        colId:"TaskName",
                        headerName:"Activity",
                        flex:1,
                        cellStyle: {
                            "textAlign": "center",
                        }
                    },
                    {
                        field:"Approver",
                        colId:"Approver",
                        headerName:"Approver Name",
                        flex:1,
                        cellStyle: {
                            "textAlign": "center",
                        }
                    },
                    {
                        field:"Requester",
                        colId:"Requester",
                        headerName:"Requester Name",
                        flex:1,
                        cellStyle: {
                            "textAlign": "center",
                        }
                    },
                    {
                        field:"TaskStatus",
                        colId:"TaskStatus",
                        headerName:"Status",
                        flex:1,
                        cellStyle: {
                            "textAlign": "center",
                        }
                    }
                ])}
                pagination
                paginationPageSize={10}            
            />
            <div style={{display:'none'}}>                
                  <VFTable
                    ref={gridRef}
                    rowData={tempAgGridRowData}
                    {...tempAgGridProps}
                  />
                </div>
        </React.Fragment>
    )
}

export default TaskStatus