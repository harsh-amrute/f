import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VFTable from "../../Common/VFTable";
import { AgGridReactProps } from "ag-grid-react";
import "../gridStyles.css";
import response from "./data";
const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 0 16px 16px;
  position: relative;
  margin-top: 24px;
`;

const GridWrapper = styled.div`
  position: relative; /* important for absolute positioning of the tab */
  border: 1px solid #ccc;
  border-radius: 0 8px 8px 8px;
  padding: 16px 16px 25px 16px; /* top padding increased so content doesn't overlap with the tab */
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 400px;

  & > .ag-theme-alpine {
    flex: 1;
    }
`;

const WorkStationDropDown = styled.select`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: fit-content;
    font-size: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    &:focus {
        outline: none;
        border-color: #9c0d64;
        box-shadow: 0 0 5px rgba(156, 13, 100, 0.5);
    }
`;

const Tab = styled.div`
  position: absolute;
  top: -25px;
  left: 16px;
  height: 40px;
  padding: 10px 80px 10px 20px;
  display: flex;
  align-items: center;
  color: white;
  font-weight: 500;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #9c0d64, #c71585);
  border-top-left-radius: 8px;
  clip-path: polygon(0 0, 75% 0, 100% 100%, 0% 100%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
`;

const FilterSection = styled.div`

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ToggleWrapper = styled.div`
  display: flex;
  background: #fff;
  border-radius: 50px;
  padding: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: fit-content;
  gap: 6px;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: 8px 16px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background: ${({ active }) => (active ? "#b23a7d" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#555")};
  font-size: 0.85rem;
  font-weight: 500;
  min-width: fit-content;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active }) => (active ? "#b23a7d" : "#f0f0f0")};
  }
`;





const ResourceViewSummary = ({ ResourceData}: any) => {    

    const [active, setActive] = useState("Percentage Wise");
    const allWorkStations:any = new Set(Object.values(ResourceData.Resource_Data || {}).map((r: any) => r.work_station));

    const [activeWorkStation, setActiveWorkStation] = useState<any>(Array.from(allWorkStations)[0]);

  const options = ["Percentage Wise", "Day Wise", "Hrs Wise", "Count Wise"];

    const agGridProps: AgGridReactProps = {

        defaultColDef: {
            sortable: true,
            filter: true,
            resizable: true,
            floatingFilter: true,
            flex: 1,
        },
        rowClass: 'my-row-class',
      
        // all even rows assigned 'my-shaded-effect'
        getRowClass: params => {
            if (params && params.node && params.node.rowIndex &&  params?.node?.rowIndex % 2 === 0) {
                return 'my-shaded-effect';
            }
        },
        suppressRowClickSelection: true,
        animateRows: true,
        rowSelection: "single",
        pagination: false,
        paginationPageSize: 10,

    }

    const [colDef, setColDef] = useState<any>([]);
    const [rowData, setRowData] = useState<any>([]);


    useEffect(()=>{
        const ColDef = [
            { headerName: 'Workstation', colId: 'work_station', field: 'work_station', width: 120, flex: 1, position: 1 },
        ];
    
        const TaskTypes = Object.keys(ResourceData.Task_master || {});
    
        TaskTypes.forEach((type: any, index: number) => {
            ColDef.push({ headerName: type, colId: type, field: type, width: 120, flex: 1, position: index + 2 });
        });

        if(active !== "Percentage Wise"){
          ColDef.push({headerName: "Total", colId: "total", field: "total", width: 120, flex: 1, position: TaskTypes.length + 2})
        }

        setColDef(ColDef);


    },[response.Task_master,active])


    const setCountWiseData = () => {
      const data: any = ResourceData.Resource_Data || {};
    
      const allResources: { id: string; stage: string; work_station: string }[] = [];
    
      const allResourceIds = Object.keys(data);
      allResourceIds.forEach((key: string) => {
        const val = {
          id: key,
          stage: data[key]?.stage,
          work_station: data[key]?.work_station,
        };
        allResources.push(val);
      });
    
      const workStationSet = new Set(allResources.map((r) => r.work_station));
      const filteredWorkStations =
        activeWorkStation === "All Work Stations" || !activeWorkStation
          ? Array.from(workStationSet) // Include all workstations
          : Array.from(workStationSet).filter((ws) => ws === activeWorkStation);


      const summaryData: any[] = [];
    
      filteredWorkStations.forEach((ws) => {
        const resourcesInWS = allResources.filter((r) => r.work_station === ws);
        const taskTypeCount: { [key: string]: number } = {};
        const taskTypeDuration: { [key: string]: number } = {};
        let totalDuration = 0; // Total duration of the machine active time
        let totalCount = 0;
    
        let minStartDate = Infinity;
        let maxEndDate = -Infinity;
    
        resourcesInWS.forEach((res) => {
          const tasks = data[res.id]?.task_list || [];
          tasks.forEach((task: any) => {
            const type = task.task_type || "unknown";
            const startDate = new Date(task.start).getTime();
            const endDate = new Date(task.end).getTime();
    
            // Update min and max dates
            minStartDate = Math.min(minStartDate, startDate);
            maxEndDate = Math.max(maxEndDate, endDate);
    
            // Calculate task duration in hours
            const taskDuration = (endDate - startDate) / (1000 * 60 * 60); // Convert milliseconds to hours
            taskTypeDuration[type] = (taskTypeDuration[type] || 0) + taskDuration;
    
            taskTypeCount[type] = (taskTypeCount[type] || 0) + 1;
            totalCount += 1;
          });
        });
    
        // Calculate total duration of the machine active time in hours
        totalDuration = (maxEndDate - minStartDate) / (1000 * 60 * 60); // Convert milliseconds to hours
    
        const entry: any = { work_station: ws };
        Object.keys(ResourceData.Task_master || {}).forEach((type) => {
          if (active === "Percentage Wise") {
            entry[type] =
              totalDuration > 0
                ? ((taskTypeDuration[type] || 0) / totalDuration * 100).toFixed(2) +
                  "%"
                : "0%";
          } else if (active === "Day Wise") {
            // Total hours divided by 24 to get days
            entry[type] = ((taskTypeDuration[type] || 0) / 24).toFixed(2) + " days";
          } else if (active === "Hrs Wise") {
            // Total hours for each task type
            entry[type] = (taskTypeDuration[type] || 0).toFixed(2) + " hrs";
          } else if (active === "Count Wise") {
            // Total occurrences of each task type
            entry[type] = taskTypeCount[type] || 0;
          }
        });
    
        if (active !== "Percentage Wise") {
          entry["total"] = totalCount;
        }
    
        summaryData.push(entry);
      });
    
      return summaryData;
    };



    useEffect(() => {
       
      if(active === "Count Wise"){
        
        console.log("active", active);
        setRowData(setCountWiseData());
      }
      else{
        setRowData([])
      }
      }, [active, activeWorkStation]);


    

   


  return (
    <SectionWrapper>
        <Tab>Summary</Tab>
      <GridWrapper>
        {/* Content inside the grid */}

      <FilterSection>

        <WorkStationDropDown placeholder="Select Work Station" value={activeWorkStation ||"" } onChange={(e) => {setActiveWorkStation(e.target.value)}}>
          <option key={"All Work Stations"} value={"All Work Stations"}>
            {"All Work Stations"}
          </option>
         {
           Array.from(allWorkStations).map((ws:any) => (
            <option key={ws} value={ws}>
              {ws}
            </option>
          ))
         }
        </WorkStationDropDown>

        <ToggleWrapper>
      {options.map((opt) => (
        <ToggleButton
          key={opt}
          active={active === opt}
          onClick={() => setActive(opt)}
        >
          {opt}
        </ToggleButton>
      ))}
    </ToggleWrapper>
      </FilterSection>

        <VFTable {...agGridProps}  columnDefs={colDef} rowData={rowData} />

      </GridWrapper>
    </SectionWrapper>
  );
};

export default ResourceViewSummary;
