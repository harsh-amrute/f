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
import {  differenceInSeconds} from "date-fns"
import { useUserData } from "../../../../../context"

import * as globalStyles from '../../../../../styles/global'
import { useSelector } from "react-redux"
import { RootState } from "../../../../../redux/store/store"


const TaskStatus = ()=>{


    const {data,isLoading} = useGetTaskStatusData()
    const gridRef = useRef<GridRef>()

    const {mutateAsync:getTaskDetailDownloadData} = useGetTaskDetailDownloadData()
    const {mutateAsync:getMasterUIConfiguration} = useGetMasterUIConfiguration()

    const {user} = useUserData()

    const themeUi = user.user.theme_ui
    
    const [tempAgGridRowData,setTempAgridRowData] = useState<any>([])
    const [currentMasterName,setCurrentMasterName] = useState<string>('')
    const [tempAgGridColDefs,setTempAgGridColDefs] = useState<ColDef[]>([])
    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false); 
    const EnvConfig = useSelector((state:RootState) =>state.mta.EnvConfig);
    const TASKSTATUS_PAGE = EnvConfig['TASKSTATUS_PAGE'];  
    
    const tempAgGridProps:AgGridReactProps = {
        columnDefs:tempAgGridColDefs,
        onRowDataUpdated:(event)=>{
          if(tempDownloadData)event.api.exportDataAsExcel({fileName:currentMasterName });
        }
      };

      const formatDate =  (dateString:string)=>{

        // Split the date string into its components
        const parts = dateString.split(/[/: ]/);

        // Parse the components
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Months are zero-based
        const year = parseInt(parts[2], 10);
        let hours = parseInt(parts[3], 10);
        const minutes = parseInt(parts[4], 10);
        const period = parts[5].toLowerCase(); // "AM" or "PM"

        // Adjust hours for PM
        if (period === "pm" && hours < 12) {
        hours += 12;
        }

        // Create a Date object
        return new Date(year, month, day, hours, minutes);
      }

      const onDownloadTaskDetails = async (payload: any) => {
        try {
            // 1. Show an immediate notification so the user knows the process started
            console.log("Preparing download for large dataset... Please wait.");
    
            // 2. Call your original method (now returning a Blob)
            const response = await getTaskDetailDownloadData({
                taskId: payload.TaskID,
                approverId: payload.ApproverId
            });
    
            // 3. Create a Blob from the response data
            // Even if it's 100k records, the browser handles this efficiently
            const blob = new Blob([response.data], { type: 'text/csv' });
            
            // 4. Create a download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            
            link.href = url;
            // Use the TaskID in the filename for easy identification
            link.setAttribute('download', `Task_${payload.TaskID}_Details.csv`);
            
            // 5. Trigger the download and cleanup
            document.body.appendChild(link);
            link.click();
            
            // Cleanup to prevent memory leaks
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
    
            console.log("Download started successfully.");
    
        } catch (error: any) {
            console.error("Download Error:", error);
            notifyError("Failed to download task details. The dataset might be too large or the session timed out.");
        }
    };

    const rowData = data?.data.data || []
    // rowData = rowData.map((row:any)=>{
    //     return {
    //         ...row,
    //         PendingSince:formatMDMDate(row.PendingSince),
           
    //     }
    // })
    rowData.sort((a:any,b:any)=>{
       return differenceInSeconds(formatDate(b.PendingSince),formatDate(a.PendingSince)) 
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
        <div style={{paddingTop:'20px',height:'95%'}}>
            <VFTable
                masterDetail
                detailCellRenderer={TaskStatusMasterDetail}
                detailCellRendererParams={{
                    onDownload:onDownloadTaskDetails
                }}
                // rowHeight={60}
                // detailRowAutoHeight
                getRowHeight={(params: any) => {
                    console.log("props", params);
                    console.log("Row Index:", params.node.rowIndex, "Expanded:", params.node.expanded);
   
                    if (params.node.expanded === undefined) {
                        if (params?.data?.Approvers?.length) {
                            console.log("Expanded with Approvers", params?.data?.Approvers?.length);
                            return params?.data?.Approvers?.length * 150;
                        } else {
                            return 150;
                        }
                    } else {
                        return 35;
                    }
                }}
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
                ],globalStyles.chooseThemeColor[themeUi].color4)}
                pagination
                // paginationPageSize={10}            
                paginationPageSize={parseInt(TASKSTATUS_PAGE || '200')}  
                height={"100%"}          

            />
            <div style={{display:'none'}}>                
                  <VFTable
                    ref={gridRef}
                    rowData={tempAgGridRowData}
                    {...tempAgGridProps}
                  />
                </div>
        </div>
    )
}

export default TaskStatus