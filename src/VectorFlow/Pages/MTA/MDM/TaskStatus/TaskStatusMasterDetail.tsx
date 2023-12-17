import { StepItem } from "../../../../../components/VectorFLOW/commons/VFStepper"
import VFStepper from "../../../../../components/VectorFLOW/commons/VFStepper"
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import { VFTaskStatusWrapper,VFTaskStatusContentWrapper, VFTaskStatusStepperWrapper, VFTastStatusDownloadWrapper, VFTaskStatusStepperLabel } from "./styles"
import { useUserData } from "../../../../../context"


export interface TaskStatusMasterDetailProps{
    data:any
    onDownload:()=>void
}

const getStepperState = (data:any):StepItem[]=>{
    switch(data.TaskStatus){
        case "Pending":
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.date
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
                    description:data.date
                },
                {
                    label:"Approved",
                    status:'completed',
                    description:data.date
                },
                {
                    label:"DB Updated",
                    status:'completed',
                    description:data.date
                }
            ]
        case "Partially approved - DB Update Pending":
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.date
                },
                {
                    label:"Partially Approved",
                    status:'completed',
                    description:data.date
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
                    description:data.date
                },
                {
                    label:"Approved",
                    status:'completed',
                    description:data.date
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
                    description:data.date
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
    const {user} = useUserData()
    const {Approvers} = data

    const showDisplayDownloadButton = (status:string):boolean=>{
        return status === "Approved" || status ===  "Partially approved - DB Update Pending" || status ==='Approved - DB Update Pending'
    }
    const getGridFraction =(status:string)=>{
        // if(showDisplayDownloadButton(status)) return "1fr 4fr 1fr"
        // if(status=='Rejected')return "1fr 3fr 2fr"
        return "1fr 3fr 1fr"
    }

    const getIndividualGridFraction = (status:string)=>{
        if(showDisplayDownloadButton(status)) return " 4fr 1fr"
        if(status=='Rejected')return "1fr 2fr"
        return "3fr 2fr"
    }

    if(!Approvers){
        return(
            <VFTaskStatusWrapper data-testid="task-status-master-detail">
                <VFTaskStatusContentWrapper>
                    <VFTaskStatusStepperWrapper gridFraction={getIndividualGridFraction(data.TaskStatus)}>
                        <VFStepper
                            items={getStepperState(data)}
                            zoom={0.8}
                            width={data.TaskStatus==="Rejected"?"50%":'100%'}
                        />
                        {showDisplayDownloadButton(data.TaskStatus) && (
                            <VFButton 
                                onClick={onDownload} 
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
            </VFTaskStatusWrapper>
        )
    }

    return (
        <VFTaskStatusWrapper data-testid="task-status-master-detail">
            {Approvers.map((approver:any)=>{
                return(
                    <VFTaskStatusContentWrapper>
                        <VFTaskStatusStepperWrapper gridFraction={getGridFraction(approver.TaskStatus)}>
                        <VFTaskStatusStepperLabel>{approver.Approver}</VFTaskStatusStepperLabel>
                            <VFStepper
                                items={getStepperState(approver)}
                                zoom={0.8}
                                width={approver.TaskStatus==="Rejected"?"calc(50% + 49px)":'100%'}
                            />
                            {showDisplayDownloadButton(approver.TaskStatus) && (
                                <VFButton 
                                    onClick={onDownload} 
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