import { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useMemo, useState } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import CustomGroupCellRenderer from '../../Procurement/InsightsAndTrends/DayWiseCoverage/CustomGroupCellRenderer';

const BomExplosionPOC = () => {
  // const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  // const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  // const [rowData, setRowData] = useState<any[]>([
  //   { path: "Erica", jobTitle: "CEO", employmentType: "Permanent" },
  //   { path: "Erica/Malcolm", jobTitle: "VP", employmentType: "Permanent" }
  // ]);
  // const [columnDefs, setColumnDefs] = useState<ColDef[]>([
  //   { field: "l1", rowGroup: true, hide: true },
  //   { field: "l2", rowGroup: true, hide: true },
  //   { field: "l3", rowGroup: true, hide: true },
  //   { field: "l4", rowGroup: true, hide: true },
  //   { field: "country" },
  // ]);
  // const defaultColDef = useMemo<ColDef>(() => {
  //   return {
  //     flex: 1,
  //     minWidth: 100,
  //   };
  // }, []);
  // const autoGroupColumnDef = useMemo<ColDef>(() => {
  //   return {
  //     minWidth: 200,
  //     cellRenderer: "agGroupCellRenderer"
  //   };
  // }, []);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<any[]>([
    {
        orgHierarchy: ['Erica Rogers'],
        jobTitle: 'CEO',
        employmentType: 'Permanent',
    },
    {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett'],
        jobTitle: 'Exec. Vice President',
        employmentType: 'Permanent',
    },

    {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker'],
        jobTitle: 'Director of Operations',
        employmentType: 'Permanent',
    },
    {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker', 'Brittany Hanson'],
        jobTitle: 'Fleet Coordinator',
        employmentType: 'Permanent',
    },
    {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker', 'Brittany Hanson', 'Leah Flowers'],
        jobTitle: 'Parts Technician',
        employmentType: 'Contract',
    },
    {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker', 'Brittany Hanson', 'Tammy Sutton'],
        jobTitle: 'Service Technician',
        employmentType: 'Contract',
    },
    {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker', 'Derek Paul'],
        jobTitle: 'Inventory Control',
        employmentType: 'Permanent',
    },

    {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland'],
        jobTitle: 'VP Sales',
        employmentType: 'Permanent',
    },
    {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Morris Hanson'],
        jobTitle: 'Sales Manager',
        employmentType: 'Permanent',
    },
    {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'],
        jobTitle: 'Sales Executive',
        employmentType: 'Contract',
    },
    {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'],
        jobTitle: 'Sales Executive',
        employmentType: 'Contract',
    },
    {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'],
        jobTitle: 'Sales Executive',
        employmentType: 'Permanent',
    },
]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // we're using the auto group column by default!
    { field: "jobTitle" },
    { field: "employmentType" },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      headerName: "Group",
      minWidth: 300,
      cellRendererParams: {
        suppressCount: true,
      },
    };
  }, []);

  const getDataPath = useCallback((data: any) => {
    return data.orgHierarchy;
  }, []);


  return (
    <div style={containerStyle}>
      <div
        style={gridStyle}
        className={
          "ag-theme-quartz"
        }
      >
        <VFTable
          height='500px'
          // getDataPath={(data: any)=>{
          //   return data.path.split('/');
          // }}
          getDataPath={getDataPath}
          rowData={rowData}
          autoGroupColumnDef={autoGroupColumnDef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          treeData
        />
      </div>
    </div>
  )
}

export default BomExplosionPOC