import VFStepper,{StepItem} from "../../../../../components/VectorFLOW/commons/VFStepper"
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import { VFTaskStatusWrapper,VFTaskStatusContentWrapper, VFTaskStatusStepperWrapper, VFTastStatusDownloadWrapper, VFTaskStatusStepperLabel } from "./styles"
import { useUserData } from "../../../../../context"


export interface TaskStatusMasterDetailProps{
    data:any
    onDownload:(body:{taskId:string,approverId:number})=>void
}

const getStepperState = (data:any):StepItem[]=>{
    console.log(data)
    switch(data.TaskStatus){
        case "Pending":
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.PendingSince
                },
                {
                    label:"Pending",
                    status:'pending',
                    description:''
                },
                {
                    label:"DB Update Pending",
                    status:'pending',
                    description:''
                }
            ]
        case "Rejected":
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.date
                },
                {
                    label:"Rejected",
                    status:'rejected',
                    description:data.date
                }
            ]
        case "Approved":
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.PendingSince
                },
                {
                    label:"Approved",
                    status:'completed',
                    description:data.ApprovedDate
                },
                {
                    label:"DB Updated",
                    status:'completed',
                    description:data.DBUpdatedDate
                }
            ]
        case "Approved - DB Updated":
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.PendingSince
                },
                {
                    label:"Approved",
                    status:'completed',
                    description:data.ApprovedDate
                },
                {
                    label:"DB Updated",
                    status:'completed',
                    description:data.DBUpdatedDate
                }
            ]
        case "Partially approved - DB Update Pending":
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.PendingSince
                },
                {
                    label:"Partially Approved",
                    status:'completed',
                    description:data.ApprovedDate
                },
                {
                    label:"Partially Approved - DB Update Pending",
                    status:'pending',
                    description:''
                }
            ]
        case "Approved - DB Update Pending":
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.PendingSince
                },
                {
                    label:"Approved",
                    status:'completed',
                    description:data.ApprovedDate
                },
                {
                    label:"DB Update Pending",
                    status:'pending',
                    description:''
                }
            ]
        default:
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.PendingSince
                },
                {
                    label:"Pending",
                    status:'pending',
                    description:''
                },
                {
                    label:"DB Update Pending",
                    status:'pending',
                    description:''
                }
            ]
    }
}

const TaskStatusMasterDetail = (props:TaskStatusMasterDetailProps)=>{

    const{
        data,
        onDownload
    } = props
    const approvedStatuses = ["Approved","Partially approved - DB Update Pending","Approved - DB Update Pending","Approved - DB Updated"]
    const {user} = useUserData()
    const {Approvers} = data

    const showDisplayDownloadButton = (status:string):boolean=>{
        return approvedStatuses.includes(status)
    }
    const gridFraction ="1fr 4fr 1fr"
    

    // const individualGridFraction ="5fr 1fr"

    // if(!Approvers){
    //     return(
    //         <VFTaskStatusWrapper data-testid="task-status-master-detail">
    //             <VFTaskStatusContentWrapper>
    //                 <VFTaskStatusStepperWrapper gridFraction={individualGridFraction}>
    //                     <VFStepper
    //                         items={getStepperState(data)}
    //                         zoom={0.8}
    //                         dashWidth="200px"
    //                     />
    //                     {showDisplayDownloadButton(data.TaskStatus) && (
    //                         <VFButton 
    //                             onClick={()=>{return}} 
    //                             themeUi={user.user.theme_ui}
    //                             width={167}
    //                         >
    //                             <VFTastStatusDownloadWrapper>
    //                                 <img src="/assets/img/VectorFLOW/NMS/download-task-status.svg" height={25}/>
    //                                 <p style={{marginLeft:10}}> Download</p>
    //                             </VFTastStatusDownloadWrapper>
    //                         </VFButton>
    //                     )}
    //                 </VFTaskStatusStepperWrapper>
    //             </VFTaskStatusContentWrapper>
    //         </VFTaskStatusWrapper>
    //     )
    // }

    return (
        <VFTaskStatusWrapper data-testid="task-status-master-detail">
            {Approvers.map((approver:any)=>{
                return(
                    <VFTaskStatusContentWrapper>
                        <VFTaskStatusStepperWrapper gridFraction={gridFraction}>
                        <VFTaskStatusStepperLabel>{approver.Approver}</VFTaskStatusStepperLabel>
                            <VFStepper
                                items={getStepperState(approver)}
                                zoom={0.8}
                                dashWidth="200px"
                            />
                            {showDisplayDownloadButton(approver.TaskStatus) && (
                                <VFButton 
                                    onClick={()=>onDownload({taskId:approver.TaskID,approverId:approver.ApproverId})} 
                                    themeUi={user.user.theme_ui}
                                    width={167}
                                >
                                    <VFTastStatusDownloadWrapper>
                                        <img src="/assets/img/VectorFLOW/NMS/download-task-status.svg" height={25}/>
                                        <p style={{marginLeft:10}}> Download</p>
                                    </VFTastStatusDownloadWrapper>
                                </VFButton>
                            )}
                        </VFTaskStatusStepperWrapper>
                    </VFTaskStatusContentWrapper>
                )
            })}
        </VFTaskStatusWrapper>
    )
}   

export default TaskStatusMasterDetail