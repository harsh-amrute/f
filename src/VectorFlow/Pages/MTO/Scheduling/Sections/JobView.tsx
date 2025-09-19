import React, { Suspense, lazy, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { TaskBar, TooltipRow, TooltipWrapper } from "../components/MyChartStyles";
import { format } from "date-fns";

const MyChart = lazy(() => import("../components/MyChart")); // still code-split

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 0 16px 16px;
`;

const ChartWrapper = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBlock = styled.div<{ width?: string; height?: string }>`
  background: #eee;
  background-image: linear-gradient(90deg, #eee 0px, #f5f5f5 40px, #eee 80px);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
  margin: 6px 0;
  width: ${(p) => p.width || "100%"};
  height: ${(p) => p.height || "20px"};
`;

const GanttSkeleton = () => {
  return (
    <div>
      <SkeletonBlock height="30px" width="40%" />
      <SkeletonBlock height="30px" width="60%" />

      {[...Array(6)].map((_, i) => (
        <SkeletonBlock
          key={i}
          height="20px"
          width={`${50 + Math.random() * 40}%`}
        />
      ))}
    </div>
  );
};

const JobView = ({ResourceData}: any) => {
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
  console.log("RowData", RowData);

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

  console.log("TaskData", TaskData);

  const colors:any = ResourceData.Workstation_master;

  const CustomTaskBar = ({ taskIdx, left, width, task }:any) => {

    return (
      <TaskBar
        key={taskIdx}
        left={left}
        width={width}
        backgroundColor={colors?.[task.stage] ?? "#cecece"}
      >
        {task.stage + " : "+ task.work_station}
      </TaskBar>
    );
  };

  const CustomTooltip = (
      task: any,
      taskStartOffset: any,
      taskEndOffset: any,
      startDate: any
    ) => {
      return (
        <TooltipWrapper>
          <TooltipRow>
            <div>
              <strong>{task.stage +" : "+ task.work_station}</strong>
            </div>
            <div style={{ color: "#cecece" }}>
              {task.jobId ? task.jobId : task.task_type}
            </div>
          </TooltipRow>
          <div style={{ width: "100%", borderTop: "1px dashed #666666" }}></div>
          <TooltipRow>
            <div>
              <strong>Start:</strong>
            </div>
            <div>
              {format(new Date(startDate.getTime() + taskStartOffset), "PPpp")}
            </div>
          </TooltipRow>
  
          <TooltipRow>
            <div>
              <strong>End:</strong>
            </div>
            <div>
              {format(new Date(startDate.getTime() + taskEndOffset), "PPpp")}
            </div>
          </TooltipRow>
        </TooltipWrapper>
      );
    };

  return (
    <SectionWrapper>
      <ChartWrapper>
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
            />
          </Suspense>
        ) : (
          <GanttSkeleton />
        )}
      </ChartWrapper>
    </SectionWrapper>
  );
};

export default JobView;
