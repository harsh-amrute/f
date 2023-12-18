import { ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react"

import { UserDataContext } from "../../../../../context";
import TaskStatusMasterDetail from "./TaskStatusMasterDetail"

const dummyFn = jest.fn()

const contextWrapper = (children: ReactNode) => {
    return (

            <UserDataContext.Provider
              value={{
                user: { user: { theme_ui: "NOIRFUSION" } },
                changeColorTheme: (color) => {
                  return color;
                },
              }}
            >
              {children}
            </UserDataContext.Provider>
    );
  };

describe("TaskStatusMasterDetail Component",()=>{

    
    
    it("Renders the component",()=>{
        const dummyData = {
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
                    "TaskStatus": "Approved",
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
                },
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
                    "TaskStatus":  "Approved - DB Update Pending",
                    "Actiontype": 1
                },
                {
                    "TaskID": "891_14/27/2023 1:10:16 PM",
                    "PendingSince": "2023-11-27T13:10:19.813",
                    "TaskName": "M_SKULOCMaster",
                    "Approver": "Approver3",
                    "Requester": "1",
                    "TaskStatus": "",
                    "Actiontype": 1
                }
            ]
        }
        render(contextWrapper(<TaskStatusMasterDetail data={dummyData} onDownload={dummyFn}/>))
        const taskStatusMasterDetailComponent = screen.getByTestId('task-status-master-detail')
        const downloadBtn  = screen.getAllByText('Download')[0]
        fireEvent.click(downloadBtn)
        expect(taskStatusMasterDetailComponent).toBeInTheDocument()
    })
    it("Renders the component with individual approver",()=>{
        const dummyData = {
            "TaskID": "2_11/23/2023 1:10:16 PM",
            "PendingSince": "2023-11-27T13:10:19.813",
            "TaskName": "M_SKULOCMaster",
            "Approver": "Approver1,Approver2,Approver3",
            "Requester": "1",
            "TaskStatus": "Approved",
            "Actiontype": 1
        }
        render(contextWrapper(<TaskStatusMasterDetail data={dummyData} onDownload={dummyFn}/>))
        const downloadBtn  = screen.getAllByText('Download')[0]
        fireEvent.click(downloadBtn)
    })
    it("Renders the component with individual approver",()=>{
        const dummyData = {
            "TaskID": "2_11/23/2023 1:10:16 PM",
            "PendingSince": "2023-11-27T13:10:19.813",
            "TaskName": "M_SKULOCMaster",
            "Approver": "Approver1,Approver2,Approver3",
            "Requester": "1",
            "TaskStatus": "any",
            "Actiontype": 1
        }
        render(contextWrapper(<TaskStatusMasterDetail data={dummyData} onDownload={dummyFn}/>))

    })
    it("Renders the component with individual approver",()=>{
        const dummyData = {
            "TaskID": "2_11/23/2023 1:10:16 PM",
            "PendingSince": "2023-11-27T13:10:19.813",
            "TaskName": "M_SKULOCMaster",
            "Approver": "Approver1,Approver2,Approver3",
            "Requester": "1",
            "TaskStatus": "Rejected",
            "Actiontype": 1
        }
        render(contextWrapper(<TaskStatusMasterDetail data={dummyData} onDownload={dummyFn}/>))

    })
})