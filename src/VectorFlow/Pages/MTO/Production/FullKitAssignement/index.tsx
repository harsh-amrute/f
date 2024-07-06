import { AgChartsReact } from 'ag-charts-react';
import { GridOptions } from 'ag-grid-enterprise';
import React, { useMemo, useState } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';

import { Marker } from 'ag-charts-community';
import { getColumnDefinations } from '../../../../../helpers/utils';
import { fullKitAssignmentData, fullKitAssignmentHeader } from './data';
import AvailabilityCellRenderer from '../../../../../VectorFlow/Pages/MTA/InsightsAndTrends/BTR/AvailabilityCellRenderer';
import ColorCellRenderer from '../../Common/ColorCellRenderer';
import { Button, Wrapper } from './FullKitAssignment.styled';
import { useUserData } from '../../../../../context';

export class Rectangle extends Marker {
  updatePath() {
    const { x, y, path, size } = this;
    const width = size;
    const height = size / 2;

    path.clear();
    path.rect(x - width / 2 * 5, y - height / 2, width * 5, height);
  }
}

const FullKitAssignment = () => {



  const colDefCustomizations = {
    OrderInFullKitToday: {
      cellRenderer: AvailabilityCellRenderer,
    },
    ColorPriority: {
      cellRenderer: ColorCellRenderer
    },
    Tags: {
      cellRenderer: ColorCellRenderer,
      minWidth: 150
    }
  }

  const extra = [
    {
      field: "",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      maxWidth: 50,
      filter: false,
      position: 0
    },
  ]

  const colDefs = useMemo(() => {
    return getColumnDefinations(fullKitAssignmentHeader.data, colDefCustomizations, extra)
  }, []);

  const options: GridOptions<any> = {
    getRowStyle: (params: any) => {
      return {
        background: params.node.rowIndex % 2 === 0 ? "#F4F4F4" : "#FFFFFF",
      };
    },
    columnDefs: colDefs,
    defaultColDef: {
      suppressMenu: true,
      flex: 1,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      filter: true,
      floatingFilter: true
    },
    sideBar: {
      toolPanels: ["columns"],
    },
  };

  const myData: any = [
    { category: 'A', value: 10, target: 30, value2: 20 },
    { category: 'B', value: 12, target: 10, value2: 20 },
    { category: 'C', value: 8, target: 12, value2: 20 },
    { category: 'D', value: 15, target: 14, value2: 20 },
    { category: 'E', value: 13, target: 10, value2: 20 }
  ]
  const chartoptions: any = {
    data: myData,
    animation: false,
    series: [
      {
        type: 'bar',
        xKey: 'category',
        yKey: "value",
        stacked: true,
        strokeWidth: 0,
        fill: "#191919"
      },
      {
        type: 'bar',
        xKey: 'category',
        yKey: "value2",
        stacked: true,
        strokeWidth: 0,
        fill: "#EBBF2C"
      },
      {
        type: 'scatter',
        xKey: 'category',
        yKey: 'target',
        marker: {
          size: 10,
          fill: '#E53F3F',
          shape: Rectangle,
          strokeWidth: 0
        },
      },
    ],
    legend: {
      position: "top",
      item: {
        showSeriesStroke: true,
        marker: {
          size: 15,
          strokeWidth: 0,
          shape: 'square', // 'circle', 'square', 'cross', 'plus', 'triangle'
        },
      },
    }
  }
  const [hide, setHide] = useState(false);

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  return (
    <Wrapper>
      <VFTable
        rowData={fullKitAssignmentData.data}
        gridOptions={options}
        columnDefs={options.columnDefs}
        rowSelection="multiple"
        pagination={true}
        rowMultiSelectWithClick={true}
      // onGridReady={(params: any) => {
      // params.columnApi.autoSizeAllColumns()
      // params.api.sizeColumnsToFit()
      // }} 
      />
      <Button arrowName={!hide ? "bg_arrow_down" : "bg_arrow_up"} themeUi={themeUi} onClick={() => { setHide(!hide) }}> {hide ? "Show" : "Hide"} Load Chart</Button>
      <div style={{ width: "100%", flex: !hide ? 1 : 0, minHeight: 0, marginBottom: hide ? "0" : "20px", boxShadow: "0px 6px 12px #81818129" }}>
        <AgChartsReact options={chartoptions} />
      </div>
    </Wrapper >


  )
}

export default FullKitAssignment


