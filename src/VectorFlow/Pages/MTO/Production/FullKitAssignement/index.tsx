import { AgChartsReact } from 'ag-charts-react';
import { GridOptions } from 'ag-grid-enterprise';
import React, { useMemo, useRef, useState } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';

import { AgChartOptions } from 'ag-charts-community';
import { getColumnDefinations } from '../../../../../helpers/utils';
import { fullKitAssignmentData, fullKitAssignmentHeader } from './data';
import AvailabilityCellRenderer from '../../../../../VectorFlow/Pages/MTA/InsightsAndTrends/BTR/AvailabilityCellRenderer';
import ColorCellRenderer from '../../Common/ColorCellRenderer';
import { Button, Wrapper } from './FullKitAssignment.styled';
import { useUserData } from '../../../../../context';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import EditRouteModal from './EditRouteModal';
import * as globalStyles from "../../../../../styles/global";
import { Rectangle } from './RectangleMarker';

const FullKitAssignment = () => {


  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;


  const colDefCustomizations = {
    Route: {
      // tooltipField: "r"
      cellRenderer: (params: any) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%" }}>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{params.value}</div>
            <img alt="edit icon" src={"/assets/img/mto/fullKitAssignment/edit_icon.svg"} style={{ color: globalStyles.chooseThemeColor[themeUi]?.color4, cursor: "pointer" }} onClick={() => {
              setShowModal(true)
            }} />
          </div>
        )
      }
    },
    // FullKitsAvail: {
    //   cellStyle: {
    //     background: "#bc3d814d"
    //   }
    // },
    // KitBeforeSm: {
    //   cellStyle: {
    //     background: "#bc3d814d"
    //   }
    // },
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

  const extra: any = []

  const colDefs = useMemo(() => {
    return getColumnDefinations(fullKitAssignmentHeader.data, colDefCustomizations, extra)
  }, []);

  const options: GridOptions<any> = {
    getRowStyle: (params: any) => {
      return {
        background: params.node.rowIndex % 2 === 0 ? "#F4F4F4" : "#FFFFFF",
      };
    },
    rowHeight: 50,
    columnDefs: colDefs,
    defaultColDef: {
      resizable: true,
      suppressMenu: true,
      initialFlex: 1,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      enableRowGroup: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
    },
    sideBar: {
      toolPanels: ["agColumnsToolPanel"],
    },
  };

  const [data] = useState([
    { category: 'M5', value: 13, target: 43, value2: 10, groupName: "Underloaded\n", selected: true },
    { category: '    ', value: "", target: "", value2: "", groupName: "", selected: true },
    { category: 'M6', value: 10, target: 35, value2: 5, groupName: "Underloaded\n", selected: true },
    { category: '      ', value: "", target: "", value2: "", groupName: "", selected: true },
    { category: 'M7', value: 12, target: 38, value2: 8, groupName: "Underloaded\n", selected: true },
    { category: '        ', value: "", target: "", value2: "", groupName: "", selected: true },
    { category: 'M8', value: 8, target: 12, value2: 20, groupName: "Underloaded\n", selected: true },
    { category: '          ', value: "", target: "", value2: "", groupName: "", selected: true },
    { category: 'M1', value: 10, target: 35, value2: 20, groupName: "Overloaded\n", selected: true },
    { category: '', value: "", target: "", value2: "", groupName: "", selected: true },
    { category: 'M2', value: 12, target: 10, value2: 20, groupName: "Overloaded\n", selected: true },
    { category: ' ', value: "", target: "", value2: "", groupName: "", selected: true },
    { category: 'M3', value: 8, target: 12, value2: 20, groupName: "Overloaded\n", selected: true },
    { category: '  ', value: "", target: "", value2: "", groupName: "", selected: true },
    { category: 'M4', value: 15, target: 14, value2: 20, groupName: "Overloaded\n", selected: true },
    { category: '   ', value: "", target: "", value2: "", groupName: "", selected: true },
    { category: 'M9', value: 15, target: 36, value2: 20, groupName: "Balanced\n", selected: true },
    { category: '            ', value: "", target: "", value2: "", groupName: "", selected: true },
    { category: 'M10', value: 13, target: 35, value2: 20, groupName: "Balanced\n", selected: true },
  ])
  const chartoptions: AgChartOptions = {
    data: data,
    series: [
      {
        type: 'bar',
        xKey: 'category',
        yKey: "value",
        stacked: true,
        strokeWidth: 0,
        fill: "#191919",
        formatter: (params) => {
          return {
            fillOpacity: params.datum.selected ? 1 : 0.5,
            fill: params.datum.selected ? params.fill : "#191919"
          }
        }
      },
      {
        type: 'bar',
        xKey: 'category',
        yKey: "value2",
        stacked: true,
        strokeWidth: 0,
        fill: "#EBBF2C",
        formatter: (params) => {
          return {
            fill: params.datum.selected ? params.fill : "#A8A8A8"
          }
        },
        // label: {
        //   enabled: true,
        //   formatter: (params: any) => {
        //     return params.datum.groupName
        //   },
        //   placement: "outside",
        //   color: "black",

        // }
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
    axes: [
      {
        type: 'category',
        position: 'bottom',
        gridLine: {
          enabled: false
        }
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: "Days"
        },
        gridLine: {
          enabled: false
        }
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
    },

  }
  const [hide, setHide] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const graph = useRef<any>();
  const grid = useRef<any>();


  return (
    <Wrapper>
      <MTOActionToolBar comp="FullKitAssignment" />
      {/* <button onClick={() => setShowModal(true)}>Click</button> */}
      <VFTable
        ref={grid}
        rowData={fullKitAssignmentData.data}
        gridOptions={options}
        columnDefs={options.columnDefs}
        // rowSelection="multiple"
        pagination={true}
      // onSelectionChanged={(params) => {
      //   const selectedRoutes = new Set();
      //   params.api.getSelectedRows().forEach((row: any) => row.r.split(",").forEach((route: any) => selectedRoutes.add(route.trim())));
      //   if (selectedRoutes.size == 0) {
      //     setData(data.map((row: any) => {
      //       return { ...row, selected: true }
      //     }))
      //   } else {
      //     setData(data.map((row: any) => {
      //       if (selectedRoutes.has(row.category)) {
      //         return { ...row, selected: true }
      //       }
      //       return { ...row, selected: false }
      //     }))
      //   }

      // }}
      />
      <Button arrowName={!hide ? "bg_arrow_down" : "bg_arrow_up"} themeUi={themeUi} onClick={() => { setHide(!hide) }}> {hide ? "Show" : "Hide"} Load Chart</Button>
      <div style={{ width: "100%", flex: !hide ? 1 : 0, minHeight: 0, marginBottom: hide ? "0" : "20px", boxShadow: "0px 6px 12px #81818129" }}>
        <AgChartsReact ref={graph} options={chartoptions} />
      </div>
      <EditRouteModal graphData={data} showModal={showModal} setShowModal={setShowModal} />
    </Wrapper >


  )
}

export default FullKitAssignment


