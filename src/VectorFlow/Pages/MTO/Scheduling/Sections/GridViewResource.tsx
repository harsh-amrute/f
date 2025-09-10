import React, { useState, useEffect } from 'react'
import VFTable from '../../Common/VFTable'
import styled from 'styled-components';

const GridWrapper = styled.div`
  position: relative; /* important for absolute positioning of the tab */
  overflow: hidden;
  display: flex;
  padding-left: 20px;
  padding-top: 15px;
  flex-direction: column;
  gap: 16px;
  height: 78vh;

  & > .ag-theme-alpine {
    flex: 1;
    }

   & .ag-theme-alpine .ag-header-row:nth-child(2){
    background-color: black;
    color: white;
  }
  & .ag-theme-alpine .ag-header-row:nth-child(1):hover{
    background-color: black;
    color: white;
  }
  & .ag-theme-alpine .ag-header-row:nth-child(3), & .ag-theme-alpine .ag-header-row-column-filter{
    background-color: #f7f7f7 !important;
    color: black !important;
  }
`;


const GridViewResource = ({ResourceData}: any) => {
  const [columns, setColumns] = useState<any>([]);
  const [rowData, setRowData] = useState<any>([]);

  useEffect(() => {
    // Define column structure
    const columnDefs = [
      {
        headerName: "Stage",
        field: "stage",
        width: 120,
        pinned: 'left'
      },
      {
        headerName: "Machine Name", 
        field: "machineName",
        width: 200,
        pinned: 'left'
      },
      {
        headerName: "Min",
        children: [
          {
            headerName: "Start",
            field: "minStart",
            width: 150
          },
          {
            headerName: "End", 
            field: "minEnd",
            width: 150
          }
        ]
      },
      {
        headerName: "Max",
        children: [
          {
            headerName: "Start",
            field: "maxStart", 
            width: 150
          },
          {
            headerName: "End",
            field: "maxEnd",
            width: 150
          }
        ]
      },
      {
        headerName: "Elapsed Time",
        field: "elapsedTime",
        width: 120
      }
    ];

    const Task_types = Object.keys(ResourceData?.Task_master || {});
    Task_types.forEach((taskType) => {
      columnDefs.push(
        {
          headerName: taskType,
          children: [
            {
              headerName: "Count",
              field: taskType + "_count",
              width: 120
            },
            {
              headerName: "Hrs", 
              field: taskType + "_hrs",
              width: 120
            }
          ]
        },
      )
    });
    
    
    setColumns(columnDefs);
  }, []);

  useEffect(() => {
    if (!ResourceData?.Resource_Data) return;

    // Process resource data to generate row data
    const resourceRows: any[] = [];
    
    // Extract unique task types for consistent field naming
    const taskTypes = new Set<string>();
    Object.values(ResourceData.Resource_Data).forEach((resource: any) => {
      resource.task_list?.forEach((task: any) => {
        if (task.task_type) {
          taskTypes.add(task.task_type);
        }
      });
    });
    
    Object.entries(ResourceData.Resource_Data).forEach(([resourceId, resource]: [string, any]) => {
      const stage = resource.stage;
      const machineName = resource.work_station;
      const taskList = resource.task_list || [];
      
      if (taskList.length === 0) return;

      // Find min and max times for this resource
      let minStartTime = Infinity;
      let minEndTime = Infinity;
      let maxStartTime = -Infinity;
      let maxEndTime = -Infinity;
      let totalTaskDuration = 0;
      
      // Initialize task type counters
      const taskTypeData: { [key: string]: { count: number; hours: number } } = {};
      Array.from(taskTypes).forEach(type => {
        taskTypeData[type] = { count: 0, hours: 0 };
      });

      taskList.forEach((task: any) => {
        const startTime = task.start_time;
        const endTime = task.end_time;
        const taskType = task.task_type;
        
        // Update min times (earliest task)
        if (startTime < minStartTime) {
          minStartTime = startTime;
          minEndTime = endTime;
        }
        
        // Update max times (latest task)  
        if (endTime > maxEndTime) {
          maxEndTime = endTime;
          maxStartTime = startTime;
        }
        
        // Calculate task duration and add to total
        const taskDuration = (endTime - startTime) / 3600; // Convert seconds to hours
        totalTaskDuration += taskDuration;
        
        // Update task type counters
        if (taskType && taskTypeData[taskType]) {
          taskTypeData[taskType].count += 1;
          taskTypeData[taskType].hours += taskDuration;
        }
      });

      // Format time function
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

      // Create base row data
      const rowData: any = {
        stage,
        machineName,
        minStart: minStartTime !== Infinity ? formatTime(minStartTime) : '-',
        minEnd: minEndTime !== Infinity ? formatTime(minEndTime) : '-',
        maxStart: maxStartTime !== -Infinity ? formatTime(maxStartTime) : '-', 
        maxEnd: maxEndTime !== -Infinity ? formatTime(maxEndTime) : '-',
        elapsedTime: Math.round(totalTaskDuration) // Round to nearest hour
      };
      
      // Add task type data to row
      Array.from(taskTypes).forEach(taskType => {
        rowData[`${taskType}_count`] = taskTypeData[taskType].count;
        rowData[`${taskType}_hrs`] = Math.round(taskTypeData[taskType].hours * 10) / 10; // Round to 1 decimal place
      });

      resourceRows.push(rowData);
    });

    // Sort by stage and then by machine name
    resourceRows.sort((a, b) => {
      if (a.stage !== b.stage) {
        return a.stage.localeCompare(b.stage);
      }
      return a.machineName.localeCompare(b.machineName);
    });

    setRowData(resourceRows);
  }, [ResourceData]);

  return (
    <GridWrapper>
      <VFTable
        columnDefs={columns}
        rowData={rowData}
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
        suppressRowClickSelection={true}
        animateRows={true}
        rowSelection="single"
      />
    </GridWrapper>
  )
}

export default GridViewResource