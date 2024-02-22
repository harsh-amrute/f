import VFStepper,{StepItem} from "../../../../../components/VectorFLOW/commons/VFStepper"
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import { VFTaskStatusWrapper,VFTaskStatusContentWrapper, VFTaskStatusStepperWrapper, VFTastStatusDownloadWrapper, VFTaskStatusStepperLabel,VFTaskStatusNoData } from "./styles"
import { useUserData } from "../../../../../context"



export interface TaskStatusMasterDetailProps{
    data:any
    onDownload:(body:{taskId:string,approverId:number})=>void
}

const getStepperState = (data:any):StepItem[]=>{
    switch(data.TaskStatus){
        case "DB Update Pending":
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.PendingSince
                    //description: formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a'),
                 
                    
                },
                {
                    label:"DB Update Pending",
                    status:'pending',
                    description:''
                },
                {
                    label:"DB Updated",
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
                    //description: formatMDMDate(data.date, 'dd/MM/yy hh:mm:ss a'),
                   
                },
                {
                    label:"Rejected",
                    status:'rejected',
                    description:data.date
                    //description: formatMDMDate(data.date, 'dd/MM/yy hh:mm:ss a'),
                    
                }
            ]
        case "Approved":
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.PendingSince
                    //description:formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a'),
                },
                {
                    label:"Approved",
                    status:'completed',
                    description:data.ApprovedDate
                    //description:formatMDMDate(data.ApprovedDate, 'dd/MM/yy hh:mm:ss a')
                    
                },
                {
                    label:"DB Updated",
                    status:'completed',
                    description:data.DBUpdatedDate
                    //description:formatMDMDate(data.DBUpdatedDate,'dd/MM/yy hh:mm:ss a' )
                }
            ]
        case "Approved - DB Updated":
            console.log(data)
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.PendingSince
                    //description:formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a')
                },
                {
                    label:"Approved - DB Updated",
                    status:'completed',
                    description:data.ApprovedDate
                    //description:formatMDMDate(data.ApprovedDate, 'dd/MM/yy hh:mm:ss a')
                },
                {
                    label:"DB Updated",
                    status:'completed',
                    description:data.DBUpdatedDate
                    //description:formatMDMDate(data.DBUpdatedDate, 'dd/MM/yy hh:mm:ss a')
                }
            ]
        case "Partially Approved - DB update Pending":
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.PendingSince
                    //description:formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a')
                },
                {
                    label:"Partially Approved",
                    status:'completed',
                    description:data.ApprovedDate
                    //description:formatMDMDate(data.ApprovedDate, 'dd/MM/yy hh:mm:ss a')
                },
                {
                    label:"Partially Approved - DB Update Pending",
                    status:'pending',
                    description:''
                }
            ]
        case "Approved - DB update Pending":
            return [
                {
                    label:"Submission",
                    status:'completed',
                    description:data.PendingSince
                    //description:formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a')
                },
                {
                    label:"Approved - DB update Pending",
                    status:'completed',
                    description:data.ApprovedDate
                    //description:formatMDMDate(data.ApprovedDate, 'dd/MM/yy hh:mm:ss a')
                },
                {
                    label:"DB Updated",
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
                    //description:formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a')
                },
                {
                    label:"DB Update Pending",
                    status:'pending',
                    description:''
                },
                {
                    label:"DB Updated",
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
    const approvedStatuses = ["Approved","Partially Approved - DB update Pending","Approved - DB update Pending","Approved - DB Updated"]
    const {user} = useUserData()
    const {Approvers} = data

    const showDisplayDownloadButton = (status:string):boolean=>{
        return approvedStatuses.includes(status)
    }
    const gridFraction ="1fr 4fr 1fr"


    return (
        <VFTaskStatusWrapper data-testid="task-status-master-detail">
            {(Approvers && Approvers.length>0)?Approvers?.map((approver:any,index:number)=>{
                return(
                    <VFTaskStatusContentWrapper key={index}>
                        <VFTaskStatusStepperWrapper gridFraction={gridFraction}>
                        <VFTaskStatusStepperLabel>{approver.Approver}</VFTaskStatusStepperLabel>
                            <VFStepper
                                items={getStepperState(approver)}
                                dashWidth="200px"
                            />
                            {showDisplayDownloadButton(approver.TaskStatus) && (
                                <VFButton 
                                    onClick={()=>onDownload(approver)} 
                                    themeUi={user.user.theme_ui}
                                    width={167}
                                >
                                    <VFTastStatusDownloadWrapper>
                                        <img src="/assets/img/VectorFLOW/NMS/download-task-status.svg" height={25}/>
                                        <p style={{marginLeft:10,fontWeight:500}}> Download</p>
                                    </VFTastStatusDownloadWrapper>
                                </VFButton>
                            )}
                        </VFTaskStatusStepperWrapper>
                    </VFTaskStatusContentWrapper>
                )
            })
            :
            <VFTaskStatusNoData>
                No data to show
            </VFTaskStatusNoData>
        }
        </VFTaskStatusWrapper>
    )
}   

export default TaskStatusMasterDetail