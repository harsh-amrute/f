import React from 'react'
import { VFTableWrapper } from '../../../../../components/VectorFLOW/commons/VFTable/styles'
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
`;

const GridViewResource = () => {

  const columns = [
    { headerName: "" },
    { headerName: "Resource Name" },
    { headerName: "Task Name", field: "taskName", width: 200 },
    { headerName: "Start Time", field: "startTime", width: 150 },
    { headerName: "End Time", field: "endTime", width: 150 },
    { headerName: "Duration", field: "duration", width: 100 },
    { headerName: "Status", field: "status", width: 100 },
  ]

  const rowData = [
    { id: 1, resourceName: 'Resource 1', taskName: 'Task A', startTime: '08:00', endTime: '10:00', duration: '2h', status: 'Completed' },
    { id: 2, resourceName: 'Resource 2', taskName: 'Task B', startTime: '10:30', endTime: '12:00', duration: '1.5h', status: 'In Progress' },
    { id: 3, resourceName: 'Resource 1', taskName: 'Task C', startTime: '13:00', endTime: '15:00', duration: '2h', status: 'Pending' },
    { id: 4, resourceName: 'Resource 3', taskName: 'Task D', startTime: '15:30', endTime: '17:00', duration: '1.5h', status: 'Completed' },
    { id: 5, resourceName: 'Resource 2', taskName: 'Task E', startTime: '17:30', endTime: '19:00', duration: '1.5h', status: 'In Progress' },
  ]
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
          flex: 1,
          
        }}
        
        rowClass='my-row-class'
        getRowClass={params => {
          if (params && params.node && params.node.rowIndex && params?.node?.rowIndex % 2 === 0) {
            return 'my-shaded-effect';
          }
        }}
        animateRows={true}
        rowSelection="single"
        pagination={true}
        paginationPageSize={10}
      
      />
    </GridWrapper>
  )
}

export default GridViewResource