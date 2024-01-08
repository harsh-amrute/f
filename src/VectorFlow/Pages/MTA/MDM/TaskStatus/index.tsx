import React, { useRef, useState } from "react"

import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"

import {  getActionName, mapTaskStatusToColDefs,getExistingColumns,getExistingColumnFields,mapNewAndOldMasterRowDataToCustomRowData,mapMasterToColumnGroupDefs } from "../../../../../helpers/utils"
import TaskStatusMasterDetail from "./TaskStatusMasterDetail"
import { useGetTasKDetailDownloadData, useGetTaskStatusData,useGetMasterUIConfiguration } from "../../../../../VectorFlow/Services/MTA/MDM"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import { GridRef, Master } from "../../../../../VectorFlow/types/MDM"
import { AgGridReactProps } from "ag-grid-react"
import { notifyError } from "../../../../../helpers/notify"
import { ColDef } from "ag-grid-enterprise"


const TaskStatus = ()=>{


    const {data,isLoading} = useGetTaskStatusData()
    const gridRef = useRef<GridRef>()

    const {mutateAsync:getTaskDetailDownloadData} = useGetTasKDetailDownloadData()
    const {mutateAsync:getMasterUIConfiguration} = useGetMasterUIConfiguration()

    const rowData = data?.data.data || []
    const [tempAgGridRowData,setTempAgridRowData] = useState<any>([])
    const [tempAgGridColDefs,setTempAgGridColDefs] = useState<ColDef[]>([])
    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);
    
    const tempAgGridProps:AgGridReactProps = {
        columnDefs:tempAgGridColDefs,
        onRowDataUpdated:(event)=>{
          if(tempDownloadData)event.api.exportDataAsExcel({fileName:"downloadFileName" });
        }
      };

    const onDownloadTaskDetails = async(payload:any)=>{
        console.log(payload)
        
       try{
        const response = await getTaskDetailDownloadData(payload)
        const currentTaskMaster = response.data.data[0]
        console.log(currentTaskMaster)
        const currentTaskMasterId:number = currentTaskMaster.MasterId
        
        const uiConfigurationResponse = await getMasterUIConfiguration('add')
        
        const masters:Master[] = uiConfigurationResponse.data.data
        const currentMasterFields = masters.find((master:Master)=>master.id==currentTaskMasterId)?.fields
        console.log(currentMasterFields)
       
        if(currentMasterFields){
          const existingColumns = getExistingColumns(payload.Actiontype==2?JSON.parse(currentTaskMaster.data[0].new):currentTaskMaster.data[0])
          const existingColumnFields = getExistingColumnFields(existingColumns,currentMasterFields)
          setTempAgGridColDefs(mapMasterToColumnGroupDefs(existingColumnFields,currentTaskMasterId,getActionName(payload.Actiontype).value))
          setTempAgridRowData(mapNewAndOldMasterRowDataToCustomRowData(currentTaskMaster.data,existingColumnFields,getActionName(payload.Actiontype).value,currentTaskMasterId))
          setTempDownloadData(true)
          setTempAgridRowData(['fas'])
        }
       }catch(error:any){
        notifyError(error.message)
       }
    }

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