import VFStepper, {
  StepItem,
} from "../../../../../components/VectorFLOW/commons/VFStepper";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import {
  VFTaskStatusWrapper,
  VFTaskStatusContentWrapper,
  VFTaskStatusStepperWrapper,
  VFTastStatusDownloadWrapper,
  VFTaskStatusNoData,
  vGridCols,
} from "./styles.css";
import { useUserData } from "../../../../../context";
import StepperPrefix from "./StepperPrefix";
import { assignInlineVars } from "@vanilla-extract/dynamic";

export interface TaskStatusMasterDetailProps {
  data: any;
  onDownload: (body: { taskId: string; approverId: number }) => void;
}

const getStepperState = (data: any): StepItem[] => {
  switch (data.TaskStatus) {
    // case "DB Update Pending":
    //     return [
    //         {
    //             label:"Submission",
    //             status:'completed',
    //             description:data.PendingSince,
    //             prefix:<StepperPrefix label={data.Requester} subLabel={"Requester"} />
    //             //description: formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a'),

    //         },
    //         {
    //             label:"DB Update Pending",
    //             status:'pending',
    //             description:'',
    //             prefix:<StepperPrefix label={data.Approver} subLabel={"Approver"} />
    //         },
    //         {
    //             label:"DB Updated",
    //             status:'pending',
    //             description:'',
    //             prefix:<div style={{height:'15px'}}/>
    //         }
    //     ]
    case "Rejected":
      return [
        {
          label: "Submitted",
          status: "completed",
          description: data.PendingSince,
          prefix: (
            <StepperPrefix label={data.Requester} subLabel={"Requester"} />
          ),
          //description: formatMDMDate(data.date, 'dd/MM/yy hh:mm:ss a'),
        },
        {
          label: "Rejected",
          status: "rejected",
          description: data.ApprovedDate,
          prefix: <StepperPrefix label={data.Approver} subLabel={"Approver"} />,
          //description: formatMDMDate(data.date, 'dd/MM/yy hh:mm:ss a'),
        },
      ];
    // case "Approved":
    //     return [
    //         {
    //             label:"Submission",
    //             status:'completed',
    //             description:data.PendingSince,
    //             prefix:<StepperPrefix label={data.Requester} subLabel={"Requester"} />
    //             //description:formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a'),
    //         },
    //         {
    //             label:"Approved",
    //             status:'completed',
    //             description:data.ApprovedDate,
    //             prefix:<StepperPrefix label={data.Approver} subLabel={"Approver"} />
    //             //description:formatMDMDate(data.ApprovedDate, 'dd/MM/yy hh:mm:ss a')

    //         },
    //         {
    //             label:"DB Updated",
    //             status:'completed',
    //             description:data.DBUpdatedDate,
    //             prefix:<div style={{height:'15px'}}/>
    //             //description:formatMDMDate(data.DBUpdatedDate,'dd/MM/yy hh:mm:ss a' )
    //         }
    //     ]
    case "Approved - DB Updated":
      return [
        {
          label: "Submitted",
          status: "completed",
          description: data.PendingSince,
          prefix: (
            <StepperPrefix label={data.Requester} subLabel={"Requester"} />
          ),
          //description:formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a')
        },
        {
          label: "Approved",
          status: "completed",
          description: data.ApprovedDate,
          prefix: <StepperPrefix label={data.Approver} subLabel={"Approver"} />,
          //description:formatMDMDate(data.ApprovedDate, 'dd/MM/yy hh:mm:ss a')
        },
        {
          label: "DB Updated",
          status: "completed",
          description: data.DBUpdatedDate,
          prefix: <div style={{ height: "15px" }} />,
          //description:formatMDMDate(data.DBUpdatedDate, 'dd/MM/yy hh:mm:ss a')
        },
      ];
    case "Partially Approved - DB update Pending":
      return [
        {
          label: "Submitted",
          status: "completed",
          description: data.PendingSince,
          prefix: (
            <StepperPrefix label={data.Requester} subLabel={"Requester"} />
          ),
          //description:formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a')
        },
        {
          label: "Partial Action Taken",
          status: "completed",
          description: data.ApprovedDate,
          prefix: <StepperPrefix label={data.Approver} subLabel={"Approver"} />,
          //description:formatMDMDate(data.ApprovedDate, 'dd/MM/yy hh:mm:ss a')
        },
        {
          label: "DB Update Pending",
          status: "pending",
          description: "",
          prefix: <div style={{ height: "15px" }} />,
        },
      ];
    case "Approved - DB update Pending":
      return [
        {
          label: "Submitted",
          status: "completed",
          description: data.PendingSince,
          prefix: (
            <StepperPrefix label={data.Requester} subLabel={"Requester"} />
          ),
          //description:formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a')
        },
        {
          label: "Approved",
          status: "completed",
          description: data.ApprovedDate,
          prefix: <StepperPrefix label={data.Approver} subLabel={"Approver"} />,
          //description:formatMDMDate(data.ApprovedDate, 'dd/MM/yy hh:mm:ss a')
        },
        {
          label: "DB Update Pending",
          status: "pending",
          description: "",
          prefix: <div style={{ height: "15px" }} />,
        },
      ];
    case "Partially Approved - DB Updated":
      return [
        {
          label: "Submitted",
          status: "completed",
          description: data.PendingSince,
          prefix: (
            <StepperPrefix label={data.Requester} subLabel={"Requester"} />
          ),
          //description:formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a')
        },
        {
          label: "Partial Action Taken",
          status: "completed",
          description: data.ApprovedDate,
          prefix: <StepperPrefix label={data.Approver} subLabel={"Approver"} />,
          //description:formatMDMDate(data.ApprovedDate, 'dd/MM/yy hh:mm:ss a')
        },
        {
          label: "DB Updated",
          status: "completed",
          description: data.DBUpdatedDate,
          prefix: <div style={{ height: "15px" }} />,
        },
      ];
    case "Pending":
      return [
        {
          label: "Submitted",
          status: "completed",
          description: data.PendingSince,
          prefix: (
            <StepperPrefix label={data.Requester} subLabel={"Requester"} />
          ),
          //description:formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a')
        },
        {
          label: "Approval Pending",
          status: "pending",
          description: "",
          prefix: <StepperPrefix label={data.Approver} subLabel={"Approver"} />,
        },
        {
          label: "DB Update Pending",
          status: "pending",
          description: "",
          prefix: <div style={{ height: "15px" }} />,
        },
      ];
    default:
      return [
        {
          label: "Submitted",
          status: "completed",
          description: data.PendingSince,
          prefix: (
            <StepperPrefix label={data.Requester} subLabel={"Requester"} />
          ),
          //description:formatMDMDate(data.PendingSince, 'dd/MM/yy hh:mm:ss a')
        },
        {
          label: "Approval Pending",
          status: "pending",
          description: "",
          prefix: <StepperPrefix label={data.Approver} subLabel={"Approver"} />,
        },
        {
          label: "DB Update Pending",
          status: "pending",
          description: "",
          prefix: <div style={{ height: "15px" }} />,
        },
      ];
  }
};

const TaskStatusMasterDetail = (props: TaskStatusMasterDetailProps) => {
  const { data, onDownload } = props;
  // const approvedStatuses = ["Approved","Partially Approved - DB update Pending","Approved - DB update Pending","Approved - DB Updated"]
  const approvedStatuses = ["Pending"];
  const { user } = useUserData();
  const { Approvers } = data;

  const showDisplayDownloadButton = (status: string): boolean => {
    return !approvedStatuses.includes(status);
  };
  const gridFraction = "5fr 1fr";

  return (
    <div
      className={VFTaskStatusWrapper}
      data-testid="task-status-master-detail"
      style={{ paddingBottom: 0 }}
    >
      {Approvers && Approvers.length > 0 ? (
        Approvers.map((approver: any, index: number) => (
          <div className={VFTaskStatusContentWrapper} key={index}>
            <div
              className={VFTaskStatusStepperWrapper}
              style={assignInlineVars({
                [vGridCols]: gridFraction, // e.g. "1fr 200px 1fr"
              })}
            >
              {/* <VFTaskStatusStepperLabel /> */}
              <VFStepper
                items={getStepperState(approver)}
                dashWidth="500px"
                zoom={0.9}
              />

              {showDisplayDownloadButton(approver.TaskStatus) && (
                <VFButton
                  onClick={() => onDownload(approver)}
                  themeUi={user.user.theme_ui}
                  width={116}
                  style={{ height: "43px", fontSize: "13px" }}
                >
                  <div className={VFTastStatusDownloadWrapper}>
                    <img
                      src="/assets/img/VectorFLOW/NMS/download-task-status.svg"
                      height={25}
                      alt=""
                    />
                    <p style={{ marginLeft: 10, fontWeight: 500 }}>Download</p>
                  </div>
                </VFButton>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={VFTaskStatusNoData}>No data to show</div>
      )}
    </div>
  );
};

export default TaskStatusMasterDetail;
