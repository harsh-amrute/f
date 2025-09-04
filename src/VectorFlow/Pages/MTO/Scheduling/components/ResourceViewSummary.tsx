import React from "react";
import styled from "styled-components";
import VFTable from "../../Common/VFTable";
import { AgGridReactProps } from "ag-grid-react";
import "../gridStyles.css";
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

const ResourceViewSummary = () => {

    const [workStation, setWorkStation] = React.useState("");

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
        rowData: [
            { id: 1, taskName: 'Task A', startTime: '08:00', endTime: '10:00', duration: '2h', status: 'Completed' },
            { id: 2, taskName: 'Task B', startTime: '10:30', endTime: '12:00', duration: '1.5h', status: 'In Progress' },
            { id: 3, taskName: 'Task C', startTime: '13:00', endTime: '15:00', duration: '2h', status: 'Pending' },
            { id: 4, taskName: 'Task D', startTime: '15:30', endTime: '17:00', duration: '1.5h', status: 'Completed' },
            { id: 5, taskName: 'Task E', startTime: '17:30', endTime: '19:00', duration: '1.5h', status: 'In Progress' },
        ],
        animateRows: true,
        rowSelection: "single",
        pagination: true,
        paginationPageSize: 10,

    }

    const ColDef = [
        { headerName: 'ID', accessorKey: 'id', width: 50 },
        { header: 'Task Name', accessorKey: 'taskName', width: 200 },
        { header: 'Start Time', accessorKey: 'startTime', width: 150 },
        { header: 'End Time', accessorKey: 'endTime', width: 150 },
        { header: 'Duration', accessorKey: 'duration', width: 100 },
        { header: 'Status', accessorKey: 'status', width: 100 },
    ]
  return (
    <SectionWrapper>
        <Tab>Summary</Tab>
      <GridWrapper>
        {/* Content inside the grid */}
        <WorkStationDropDown placeholder="Select Work Station" value={workStation} onChange={(e) => {setWorkStation(e.target.value)}}>
          <option value="ws1">Work Station 1</option>
          <option value="ws2">Work Station 2</option>
          <option value="ws3">Work Station 3</option>
        </WorkStationDropDown>

        <VFTable {...agGridProps} columnDefs={ColDef} />

      </GridWrapper>
    </SectionWrapper>
  );
};

export default ResourceViewSummary;
