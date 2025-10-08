import React, { useState, useEffect, useRef } from 'react'
import VFTable from '../../Common/VFTable'
import { GridWrapper } from '../SchedulingStyles';


const GridViewJob = ({ResourceData, setExcelGridRef}: any) => {
  const [columnDefs, setColumnDefs] = useState<any>([]);
  const [rowData, setRowData] = useState<any>([]);

  const gridRef = useRef<any>(null)

  useEffect(() => {
    if (!ResourceData?.Resource_Data) return;

    // Extract unique stages and their associated work stations
    const stageWorkStationMap = new Map<string, Set<string>>();
    
    Object.values(ResourceData.Resource_Data).forEach((resource: any) => {
      const stage = resource.stage;
      const workStation = resource.work_station;
      
      if (!stageWorkStationMap.has(stage)) {
        stageWorkStationMap.set(stage, new Set());
      }
      stageWorkStationMap.get(stage)?.add(workStation);
    });

    // Build dynamic column definitions
    const dynamicColumns: any[] = [
      {
        headerName: "Job List",
        field: "jobId",
        width: 120,
        pinned: 'left'
      }
    ];

    // Create grouped columns for each stage
    Array.from(stageWorkStationMap.entries()).forEach(([stage, workStations]) => {
      const stageChildren: any[] = [];
      
      // Array.from(workStations).forEach((workStation) => {
        // Machine Name column
        stageChildren.push({
          headerName: "Machine Name",
          field: `machine_name_${stage}`,
          width: 200
        });
        
        // Start Time column
        stageChildren.push({
          headerName: "Start Time", 
          field: `start_${stage}`,
          width: 200
        });
        
        // End Time column
        stageChildren.push({
          headerName: "End Time",
          field: `end_${stage}`, 
          width: 200
        });
      // });

      // Add the parent column with children
      dynamicColumns.push({
        headerName: stage,
        children: stageChildren
      });
    });

    setColumnDefs(dynamicColumns);
  }, [ResourceData]);

  useEffect(() => {
    if (!ResourceData?.Resource_Data) return;

    // Generate row data based on jobs
    const jobMap = new Map<string, any>();
    
    // Collect all job information
    Object.entries(ResourceData.Resource_Data).forEach(([resourceId, resource]: [string, any]) => {
      const stage = resource.stage;
      const workStation = resource.work_station;
      
      resource.task_list?.forEach((task: any) => {
        if (task.Job_id) {
          const jobId = task.Job_id;
          
          if (!jobMap.has(jobId)) {
            jobMap.set(jobId, { jobId });
          }
          
          const jobData = jobMap.get(jobId);
          
          // Convert Unix timestamp to readable format
          const formatTime = (timestamp: number) => {
            return new Date(timestamp * 1000).toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }).replace(/\//g, "-");
          };
          
          // Set machine name, start time, and end time for this stage/workstation
          jobData[`machine_name_${stage}`] = workStation;
          jobData[`start_${stage}`] = formatTime(task.start_time);
          jobData[`end_${stage}`] = formatTime(task.end_time);
        }
      });
    });

    setRowData(Array.from(jobMap.values()));
  }, [ResourceData]);

  return (
    <GridWrapper>
      <VFTable
        key={"job-grid"}
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        suppressRowClickSelection={true}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
          floatingFilter: true,
        }}
        
        rowClass='my-row-class'
        getRowClass={params => {
          if (params && params.node && params.node.rowIndex && params?.node?.rowIndex % 2 === 0) {
            return 'my-shaded-effect';
          }
        }}
        onGridReady={()=>{
          setExcelGridRef(gridRef)
        }}
        animateRows={true}
        rowSelection="single"
        pagination={false}
        paginationPageSize={10}
      />
    </GridWrapper>
  )
}

export default GridViewJob