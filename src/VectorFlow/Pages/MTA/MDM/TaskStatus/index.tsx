import React, { useMemo } from "react"

import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"

import {  mapTaskStatusToColDefs } from "../../../../../helpers/utils"
import TaskStatusMasterDetail from "./TaskStatusMasterDetail"
import {IDetailCellRendererParams} from 'ag-grid-enterprise'



const data = {
    "recordCount": null,
    "data": [
      {
        "TaskID": "1_11/27/2023 11:52:49 AM",
        "PendingSince": "2023-11-27T11:52:57.520",
        "TaskName": "M_SKULOCMaster",
        "Approver": "Approver1",
        "Requester": "1",
        "TaskStatus": "Pending",
        "Actiontype": 1
      },
      {
        "TaskID": "1_11/27/2023 1:10:16 PM",
        "PendingSince": "2023-11-27T13:10:19.813",
        "TaskName": "M_SKULOCMaster",
        "Approver": "Approver1,Approver2,Approver3",
        "Requester": "1",
        "TaskStatus": "Pending",
        "Actiontype": 1,
        "Approvers": [
          {
            "TaskID": "1_11/27/2023 1:10:16 PM",
            "PendingSince": "2023-11-27T13:10:19.813",
            "TaskName": "M_SKULOCMaster",
            "Approver": "Approver1",
            "Requester": "1",
            "TaskStatus": "Pending",
            "Actiontype": 1
          },
          {
            "TaskID": "1_11/27/2023 1:10:16 PM",
            "PendingSince": "2023-11-27T13:10:19.813",
            "TaskName": "M_SKULOCMaster",
            "Approver": "Approver2",
            "Requester": "1",
            "TaskStatus": "Pending",
            "Actiontype": 1
          },
          {
            "TaskID": "1_11/27/2023 1:10:16 PM",
            "PendingSince": "2023-11-27T13:10:19.813",
            "TaskName": "M_SKULOCMaster",
            "Approver": "Approver3",
            "Requester": "1",
            "TaskStatus": "Pending",
            "Actiontype": 1
          }
        ]
      },
      {
        "TaskID": "1_20233605123615",
        "PendingSince": "2023-11-27T13:10:19.813",
        "TaskName": "M_SKU",
        "Approver": "Approver1",
        "Requester": "1",
        "TaskStatus": "Partially approved - DB Update Pending",
        "Actiontype": 1,
        "Approvers": [
          {
            "TaskID": "1_20233605123615",
            "PendingSince": "2023-11-27T13:10:19.813",
            "TaskName": "M_SKU",
            "Approver": "Approver1",
            "Requester": "1",
            "TaskStatus": "Partially approved - DB Update Pending",
            "Actiontype": 1
          }
        ]
      }
    ],
    "status": 200,
    "msg": null
  }

const TaskStatus = ()=>{

    const getDataPath = (data:any) => {
        return data.TaskID;
      };

    return(
        <React.Fragment>
            <VFTable
                masterDetail
                // isRowMaster={(params)=>{
                //     return params.Approvers?true:false
                // }}
                detailCellRenderer={TaskStatusMasterDetail}
                detailRowAutoHeight
                gridOptions={{
                    getRowStyle: (params: any) => {
                            if (params.node.rowIndex % 2 === 0) {
                                return { background: "#EBEBEB" };
                            }
                            return { background: "#F7F7F7" };
                    }
                }}
                rowData={[
                    {
                        "TaskID": "0_11/27/2023 11:52:49 AM",
                        "PendingSince": "2023-11-27T11:52:57.520",
                        "TaskName": "M_SKULOCMaster",
                        "Approver": "Approver1",
                        "Requester": "1",
                        "TaskStatus": "Approved",
                        "Actiontype": 1
                    },
                    {
                        "TaskID": "2_11/23/2023 1:10:16 PM",
                        "PendingSince": "2023-11-27T13:10:19.813",
                        "TaskName": "M_SKULOCMaster",
                        "Approver": "Approver1,Approver2,Approver3",
                        "Requester": "1",
                        "TaskStatus": "Pending",
                        "Actiontype": 1,
                        "Approvers": [
                        {
                            "TaskID": "7_12/27/2023 1:10:16 PM",
                            "PendingSince": "2023-11-27T13:10:19.813",
                            "TaskName": "M_SKULOCMaster",
                            "Approver": "Approver1",
                            "Requester": "1",
                            "TaskStatus": "Pending",
                            "Actiontype": 1
                        },
                        {
                            "TaskID": "61_09/27/2023 1:10:16 PM",
                            "PendingSince": "2023-11-27T13:10:19.813",
                            "TaskName": "M_SKULOCMaster",
                            "Approver": "Approver2",
                            "Requester": "1",
                            "TaskStatus": "Rejected",
                            "Actiontype": 1
                        },
                        {
                            "TaskID": "891_14/27/2023 1:10:16 PM",
                            "PendingSince": "2023-11-27T13:10:19.813",
                            "TaskName": "M_SKULOCMaster",
                            "Approver": "Approver3",
                            "Requester": "1",
                            "TaskStatus": "Partially approved - DB Update Pending",
                            "Actiontype": 1
                        }
                        ]
                    },
                    {
                        "TaskID": "32_20233605123615",
                        "PendingSince": "2023-11-27T13:10:19.813",
                        "TaskName": "M_SKU",
                        "Approver": "Approver1",
                        "Requester": "1",
                        "TaskStatus": "Partially approved - DB Update Pending",
                        "Actiontype": 1,
                        "Approvers": [
                        {
                            "TaskID": "21341_20233605323615",
                            "PendingSince": "2023-11-27T13:10:19.813",
                            "TaskName": "M_SKU",
                            "Approver": "Approver1",
                            "Requester": "1",
                            "TaskStatus": "Partially approved - DB Update Pending",
                            "Actiontype": 1
                        }
                        ]
                    }
                    ]}
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
        </React.Fragment>
    )
}

export default TaskStatus