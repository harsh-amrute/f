import React, { Suspense, lazy, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import response from "./data";

const MyChart = lazy(() => import("./MyChart")); // still code-split

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
  background-image: linear-gradient(
    90deg,
    #eee 0px,
  #f5f5f5 40px,
    #eee 80px
  );
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

const ResourceViewChart = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const data: any = response.Resource_Data;


  const allResources: { id: string; stage: string, work_station: string }[] = [];


  const allResourceIds= Object.keys(data);
  allResourceIds.forEach((key:string, index)=>{
    const val = {id: key, stage: data[key]?.stage, work_station: data[key]?.work_station};
    allResources.push(val);
  });

  const ColDef = [
    { title: "Stage", key: "stage", width: 150 },
    { title: "Work Station", key: "work_station", width: 150 },
  ];


  const RowData = allResources;

  const TaskData: {jobId: any, task_type: string, work_station: string, start: EpochTimeStamp, end:EpochTimeStamp }[] = [];

  allResourceIds.forEach((resId:string)=>{
    const tasks = data[resId]?.task_list || [];
    const work_st = data[resId]?.work_station || "";
    tasks.forEach((task:any)=>{
      const taskEntry = {
        jobId: task.Job_id || null,
        task_type: task.task_type,
        work_station: work_st,
        start: task.start_time,
        end: task.end_time,
      };
      TaskData.push(taskEntry);
    });
  });


  const colors = response.Task_master;
  



  return (
    <SectionWrapper>
      <ChartWrapper>
        {
        ready ? (
          <Suspense fallback={<GanttSkeleton />}>
            <MyChart RowData={RowData} ColDef={ColDef} TaskData={TaskData} primary_key={"work_station"} colors={colors}/>
          </Suspense>
        ) : (
        <GanttSkeleton />
        )}
      </ChartWrapper>
    </SectionWrapper>
  );
};

export default ResourceViewChart;
