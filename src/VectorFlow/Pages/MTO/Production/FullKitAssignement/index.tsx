import { AgChartsReact } from 'ag-charts-react';
import { GridOptions } from 'ag-grid-enterprise';
import { useEffect, useMemo, useRef, useState } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';

import { AgChartOptions } from 'ag-charts-community';
import { getColumnDefinations } from '../../../../../helpers/utils';
import { fullKitAssignmentData } from './data';
import AvailabilityCellRenderer from '../../../../../VectorFlow/Pages/MTA/InsightsAndTrends/BTR/AvailabilityCellRenderer';
import ColorCellRenderer from '../../Common/ColorCellRenderer';
import { Button, Wrapper } from './FullKitAssignment.styled';
import { useUserData } from '../../../../../context';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import EditRouteModal from './EditRouteModal';
import * as globalStyles from "../../../../../styles/global";
import { Rectangle } from './RectangleMarker';
import { useGetUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UIConfig';
import Checkbox from '../../../../../components/VectorFLOW/commons/MTO/Checkbox';
import { useGetFullKitAssignmentDataWithGraphData } from '../../../../../VectorFlow/Services/MTO/Production/FullKitAssignment';
import OverlayLoader from '../../Common/Loader';
import VFButtonOutline from '../../../../../components/VectorFLOW/commons/VFButtonOutline';

const FullKitAssignment = () => {


  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;



  const [HeaderData, setHeaderData] = useState([{}]);
  const [hide, setHide] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState("View")

  const graph = useRef<any>();
  const grid = useRef<any>();

  const [showOrdersWithFullKitReady, setShowOrdersWithFullKitReady] = useState(true);
  const [orders, setOrders] = useState([]);
  const { mutateAsync: getFullKitAssignmentDataWithGraphData, isLoading } = useGetFullKitAssignmentDataWithGraphData();


  const { mutateAsync: getUIConfigData } = useGetUIConfigData()

  const reportName = "FullKitAssignment";

  const colDefCustomizations = {
    Route: {
      // tooltipField: "r"
      cellRenderer: (params: any) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%", height: "100%" }}>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{params.value}</div>
            <img alt="edit icon" src={"/assets/img/mto/fullKitAssignment/edit_icon.svg"} style={{ color: globalStyles.chooseThemeColor[themeUi]?.color4, cursor: "pointer" }} onClick={() => {
              setShowModal(true)
            }} />
          </div>
        )
      }
    },
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

  const [extra, setExtra]: any = useState([])

  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
      setHeaderData(response.data.data);
    }
    catch (e) {
      console.log(e);
    }
  }


  const fetchOrders = async () => {
    const data = await getFullKitAssignmentDataWithGraphData();
    console.log(data.data.data.results);
    setOrders(data.data.data.results)
  }

  useEffect(() => {
    setColumnDef();
    fetchOrders();
  }, [])

  // useEffect(()=>{
  //   switch(editMode){
  //     case "View":{
  //       setExtra()
  //     }
  //   }
  // }, [editMode])

  const colDefs = useMemo(() => {
    return getColumnDefinations(HeaderData, colDefCustomizations, extra)
  }, [HeaderData, extra])

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
    rowSelection: "multiple",
    suppressRowClickSelection: true,
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

  const renderUtilityBtns = useMemo(() => {

    return <>
    {extra.length != 0 && <strong style={{marginRight: "1rem", cursor:"pointer"}} onClick={()=>{
      setExtra([])
    }}>Cancel</strong>}
    <VFButtonOutline themeUi={themeUi}
      onClick={() => {
        setExtra(
          [{
            field: "",
            headerCheckboxSelection: true,
            checkboxSelection: true,
            suppressMenu: true,
            maxWidth: 50,
            position: 0,
            filter: false
          },]
        )
      }}>{extra.length == 0 ? "Deselect" : "Exclude & Simulate"}</VFButtonOutline></>

  }, [extra])

  return (
    <Wrapper>
      <MTOActionToolBar
        utilityBtns={renderUtilityBtns}
        quickFilter={<div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}><Checkbox checked={showOrdersWithFullKitReady} onChange={(e: any) => setShowOrdersWithFullKitReady(e.target.checked)} theme={themeUi} /> &nbsp;&nbsp; <strong>Show Orders with Full Kit Ready</strong></div>}
        isExcelExport isAddFilterButton
      />
      {/* <button onClick={() => setShowModal(true)}>Click</button> */}
      {isLoading && <OverlayLoader />}
      <VFTable
        ref={grid}
        rowData={orders}
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
      <EditRouteModal graphData={data} showModal={showModal} setShowModal={setShowModal} theme={themeUi} />
    </Wrapper >


  )
}

export default FullKitAssignment


