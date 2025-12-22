import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  taskBar,
  taskBarBgVar,
  taskBarLeftVar,
  taskBarWidthVar,
  tooltipRow,
  tooltipWrapper,
} from "../components/MyChartStyles.css";
import { format } from "date-fns";
import {
  chartWrapper,
  sectionWrapper,
  skeletonBlock,
  skeletonHeightVar,
  skeletonWidthVar,
} from "../SchedulingStyles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const MyChart = lazy(() => import("../components/MyChart")); // still code-split

const GanttSkeleton = () => {
  return (
    <div>
      <div
        className={skeletonBlock}
        style={assignInlineVars({
          [skeletonHeightVar]: "30px",
          [skeletonWidthVar]: "40%",
        })}
      />
      <div
        className={skeletonBlock}
        style={assignInlineVars({
          [skeletonHeightVar]: "30px",
          [skeletonWidthVar]: "60%",
        })}
      />

      {[...Array(6)].map((_, i) => (
        <div
          className={skeletonBlock}
          key={i}
          style={assignInlineVars({
            [skeletonHeightVar]: "20px",
            [skeletonWidthVar]: `${50 + Math.random() * 40}%`,
          })}
        />
      ))}
    </div>
  );
};

const JobView = ({ ResourceData }: any) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const data: any = ResourceData.Resource_Data;

  const allResources: { id: string; stage: string; work_station: string }[] =
    [];

  const allResourceIds = Object.keys(data);
  allResourceIds.forEach((key: string, index) => {
    const val = {
      id: key,
      stage: data[key]?.stage,
      work_station: data[key]?.work_station,
    };
    allResources.push(val);
  });

  const ColDef = [{ title: "Job List", key: "jobId", width: 150 }];

  const JobData: any = [];
  allResourceIds.forEach((re) => {
    const currentTask_list = data[re]?.task_list || [];
    const tempJobList: string[] = [];
    currentTask_list.forEach((t: any) => {
      if (t.Job_id && !tempJobList.includes(t.Job_id)) {
        JobData.push(t.Job_id);
      }
    });
  });

  const RowData = Array.from(new Set(JobData)).map((j: any) => ({ jobId: j }));

  const TaskData: {
    jobId: any;
    task_type: string;
    work_station: string;
    start: EpochTimeStamp;
    end: EpochTimeStamp;
  }[] = [];

  allResourceIds.forEach((resId: string) => {
    const tasks = data[resId]?.task_list || [];
    const work_st = data[resId]?.work_station || "";
    const stage = data[resId]?.stage || "";
    tasks.forEach((task: any) => {
      if (!task.Job_id) return; // Skip tasks without Job_id
      const taskEntry = {
        jobId: task.Job_id || null,
        task_type: task.task_type,
        work_station: work_st,
        stage: stage,
        start: task.start_time,
        end: task.end_time,
      };
      TaskData.push(taskEntry);
    });
  });

  const colors: any = ResourceData.Workstation_master;

  const CustomTaskBar = ({ taskIdx, left, width, task }: any) => {
    return (
      <div
        className={taskBar}
        key={taskIdx}
        style={assignInlineVars({
          [taskBarLeftVar]: `${left}px`,
          [taskBarWidthVar]: `${width}px`,
          [taskBarBgVar]: colors?.[task.stage] ?? "#cecece",
        })}
      >
        {task.stage + " : " + task.work_station}
      </div>
    );
  };

  const CustomTooltip = (
    task: any,
    taskStartOffset: any,
    taskEndOffset: any,
    startDate: any,
    Attributes: any
  ) => {
    return (
      <div className={tooltipWrapper}>
        <div className={tooltipRow}>
          <div>
            <strong>{task.stage + " : " + task.work_station}</strong>
          </div>
          <div style={{ color: "#cecece" }}>
            {task.jobId ? task.jobId : task.task_type}
          </div>
        </div>
        {task.jobId &&
          Attributes &&
          Attributes[task.jobId] &&
          Object.keys(Attributes[task.jobId]).map((attrKey, idx) => (
            <div className={tooltipRow} key={idx}>
              <div style={{ color: "#cecece" }}>{attrKey}:</div>
              <div style={{ color: "#cecece" }}>
                {Attributes[task.jobId][attrKey]}
              </div>
            </div>
          ))}
        <div style={{ width: "100%", borderTop: "1px dashed #666666" }}></div>
        <div className={tooltipRow}>
          <div>
            <strong>Start:</strong>
          </div>
          <div>
            {format(new Date(startDate.getTime() + taskStartOffset), "PPpp")}
          </div>
        </div>

        <div className={tooltipRow}>
          <div>
            <strong>End:</strong>
          </div>
          <div>
            {format(new Date(startDate.getTime() + taskEndOffset), "PPpp")}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={sectionWrapper}>
      <div className={chartWrapper}>
        {ready ? (
          <Suspense fallback={<GanttSkeleton />}>
            <MyChart
              RowData={RowData}
              ColDef={ColDef}
              TaskData={TaskData}
              primary_key="jobId"
              colors={colors}
              CustomTaskBar={CustomTaskBar}
              CustomTooltip={CustomTooltip}
              Slot={ResourceData?.Slot}
              Attributes={ResourceData?.Attribute_Master || {}}
            />
          </Suspense>
        ) : (
          <GanttSkeleton />
        )}
      </div>
    </div>
  );
};

export default JobView;
