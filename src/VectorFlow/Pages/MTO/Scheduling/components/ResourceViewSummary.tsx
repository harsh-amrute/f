import React from "react";
import VFTable from "../../Common/VFTable";
import { AgGridReactProps } from "ag-grid-react";
import "../gridStyles.css";
import {
  SectionWrapperViewSummary,
  Tab,
  GridWrapper,
  WorkStationDropDown,
} from "./styles.css";

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
    rowClass: "my-row-class",

    // all even rows assigned 'my-shaded-effect'
    getRowClass: (params) => {
      if (
        params &&
        params.node &&
        params.node.rowIndex &&
        params?.node?.rowIndex % 2 === 0
      ) {
        return "my-shaded-effect";
      }
    },
    rowData: [
      {
        id: 1,
        taskName: "Task A",
        startTime: "08:00",
        endTime: "10:00",
        duration: "2h",
        status: "Completed",
      },
      {
        id: 2,
        taskName: "Task B",
        startTime: "10:30",
        endTime: "12:00",
        duration: "1.5h",
        status: "In Progress",
      },
      {
        id: 3,
        taskName: "Task C",
        startTime: "13:00",
        endTime: "15:00",
        duration: "2h",
        status: "Pending",
      },
      {
        id: 4,
        taskName: "Task D",
        startTime: "15:30",
        endTime: "17:00",
        duration: "1.5h",
        status: "Completed",
      },
      {
        id: 5,
        taskName: "Task E",
        startTime: "17:30",
        endTime: "19:00",
        duration: "1.5h",
        status: "In Progress",
      },
    ],
    animateRows: true,
    rowSelection: "single",
    pagination: true,
    paginationPageSize: 10,
  };

  const ColDef = [
    { headerName: "ID", accessorKey: "id", width: 50 },
    { header: "Task Name", accessorKey: "taskName", width: 200 },
    { header: "Start Time", accessorKey: "startTime", width: 150 },
    { header: "End Time", accessorKey: "endTime", width: 150 },
    { header: "Duration", accessorKey: "duration", width: 100 },
    { header: "Status", accessorKey: "status", width: 100 },
  ];
  return (
    <div className={SectionWrapperViewSummary}>
      <div className={Tab}>Summary</div>
      <div className={GridWrapper}>
        <select
          className={WorkStationDropDown}
          value={workStation}
          onChange={(e) => setWorkStation(e.target.value)}
        >
          <option value="" disabled>
            Select Work Station
          </option>
          <option value="ws1">Work Station 1</option>
          <option value="ws2">Work Station 2</option>
          <option value="ws3">Work Station 3</option>
        </select>

        <VFTable {...agGridProps} columnDefs={ColDef} />
      </div>
    </div>
  );
};

export default ResourceViewSummary;
