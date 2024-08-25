import { AgChartsReact } from 'ag-charts-react';
import { GridOptions } from 'ag-grid-enterprise';
import { useEffect, useMemo, useRef, useState } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';

import { AgChartOptions } from 'ag-charts-community';
import { getColumnDefinations } from '../../../../../helpers/utils';
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
import { useGetFullKitAssignmentDataWithGraphData, useUpdateExcludedOrdersForFullkitAssignment, useUpdateFullkitOnSimulation, useUpdateOrSimulateStockAllocation } from '../../../../../VectorFlow/Services/MTO/Production/FullKitAssignment';
import OverlayLoader from '../../Common/Loader';
import VFButtonOutline from '../../../../../components/VectorFLOW/commons/VFButtonOutline';
import VFPagination from '../../Common/VFPagination';
import _ from 'lodash';
import { notifyError, notifySuccess } from '../../../../../helpers/notify';

const FullKitAssignment = () => {


  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  const [HeaderData, setHeaderData] = useState([{}]);
  const [hide, setHide] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState("View")

  const graph = useRef<any>();
  const grid = useRef<any>();

  // const [showOrdersWithFullKitReady, setShowOrdersWithFullKitReady] = useState(true);
  // const [loadGraph, setLoadGraph] = useState(false);
  // const [loadDataAfterSimulation, setLoadDataAfterSimulation] = useState(false)
  const [orders, setOrders] = useState([]);
  const [totalRows, setTotalRows]: any = useState(0)
  const [currentPage, setCurrentPage]: any = useState(1)
  const [loadDataParams, setLoadDataParams] = useState<any>({
    is_fullkit: true,
    load_graph_data: true,
    load_data_after_simulation: false,
    page: 1 
  });
  const [selectedRows, setSelectedRows] = useState<any>(new Map());
  const [graphData, setGraphData] = useState([]);

  const currentPageSelectedRows = useRef([]);

  const { mutateAsync: getFullKitAssignmentDataWithGraphData, isLoading: isDataLoading } = useGetFullKitAssignmentDataWithGraphData();
  const { mutateAsync: updateExcludedOrdersForFullkitAssignment,isLoading: excludeOrdersLoading } = useUpdateExcludedOrdersForFullkitAssignment();
  const { mutateAsync: updateOrSimulateStockAllocation, isLoading: simulationLoading} = useUpdateOrSimulateStockAllocation();
  const { mutateAsync: updateFullkitOnSimulation, isLoading: isSimulationResultsUpdating} = useUpdateFullkitOnSimulation();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()

  const reportName = "FullKitAssignment";

  const defaultColDefCustomisation = useRef({
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
  })

  const [colDefCustomizations, setColDefCustomizations] = useState<any>(defaultColDefCustomisation.current)

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
    const data = await getFullKitAssignmentDataWithGraphData(loadDataParams);
      if(loadDataParams.load_graph_data){
        const graph: any = [];
        //underload
        data?.data?.data?.results?.graphdata["underloaded"].forEach((row: any)=>{
          graph.push({...row})
          graph.push(_.cloneDeep({ccr_name:" ".repeat(graph.length - 1), allowed_full_kits:0, stpl_in_days:0,}))
        })
        //overload
        data?.data?.data?.results?.graphdata["overloaded"].forEach((row: any)=>{
          graph.push(row)
          graph.push(_.cloneDeep({ccr_name:" ".repeat(graph.length - 1), allowed_full_kits:0, stpl_in_days:0,}))
        })
        //balanced
        data?.data?.data?.results?.graphdata["balanced"].forEach((row: any)=>{
          graph.push(row)
          graph.push(_.cloneDeep({ccr_name:" ".repeat(graph.length - 1), allowed_full_kits:0, stpl_in_days:0,}))
        })
        setGraphData(graph)
      }
      setOrders(data?.data?.data?.results?.griddata);
      setTotalRows(data?.data?.data?.count)
  }


  const handlePageChange = async (currPage: number) => {
    setCurrentPage(currPage)
  }

  const excludeAndSimulate = async () => {
    const username = user.user.name
    const orders = Array.from(selectedRows.values()).map((order: any) =>{ return {on: order.data.on, lid: order.data.li }})
    const excluded = await updateExcludedOrdersForFullkitAssignment({orders, username}) 
    if(excluded.status == 200){
      const simulateOrders = await updateOrSimulateStockAllocation({username, is_simulated: true})
      if(simulateOrders.status == 200){
        return true
      }else{
        return false
      }
    }
  }

  const saveOrCancelSimulaton = async (is_type: "Save" | "Delete") =>{
    try{
      const username = user.user.name
      await updateFullkitOnSimulation({username, is_type})
      notifySuccess("Simulation Saved")
      return true
    }
    catch(err){
      notifyError("Failed to Save the Simulation")
      return false
    }
    
  }

  const renderUtilityBtns = useMemo(() => {

    switch(editMode){
      case "View":{
        return <VFButtonOutline themeUi={themeUi}
        onClick={() => {
          setEditMode("Deselect")
        }}>Deselect</VFButtonOutline>
      }
      case "Deselect":{
        return <>
        <strong style={{marginRight: "1rem", cursor:"pointer"}} onClick={()=>{
          setEditMode("View")
        }}>Cancel</strong>
        <VFButtonOutline 
          style={{width:"unset"}}
          themeUi={themeUi}
          onClick={() => {
            //once the rows are excluded and simulated,
            setEditMode("ExcludeSimulate"); // also set the new column definition
          }}>Exclude & Simulate</VFButtonOutline></>
      }
      case "ExcludeSimulate": {
        return <>
          <strong style={{marginRight: "1rem", cursor:"pointer"}} onClick={()=>{
            saveOrCancelSimulaton("Delete").then((data)=>{
              if(data){
                setColDefCustomizations({
                  ...defaultColDefCustomisation.current
                })
                setEditMode("Deselect")
              }
            })
        }}>Cancel</strong>
        <VFButtonOutline 
          style={{width:"unset"}}
          themeUi={themeUi}
          onClick={() => {
            setEditMode("SimulationSaved") 
          }}>Save Simulation</VFButtonOutline>
        </>
      }
    }
  }, [editMode])

  const colDefs = useMemo(() => {
    return getColumnDefinations(HeaderData, colDefCustomizations, extra)
  }, [HeaderData, extra])



  useEffect(() => {
    setColumnDef();
  }, [])

  useEffect(()=>{
    if(loadDataParams){
      fetchOrders();
    }
  },[loadDataParams])

  useEffect(()=>{
    setLoadDataParams({...loadDataParams, load_graph_data: false, page: currentPage})
  }, [currentPage])

  // useEffect(()=>{
  //   setLoadDataParams({
  //     is_fullkit: showOrdersWithFullKitReady,
  //     load_graph_data: loadGraph,
  //     load_data_after_simulation: loadDataAfterSimulation,
  //     page:1
  //   });
  // }, [showOrdersWithFullKitReady, loadGraph, loadDataAfterSimulation])

  

  useEffect(()=>{
    switch(editMode){
      case "View":{
        // setShowOrdersWithFullKitReady(true);
        setLoadDataParams({is_fullkit: true, load_graph_data: true, load_data_after_simulation: false, page: 1})
        setSelectedRows(new Map());
        setExtra([]);
        break
      }
      case "Deselect":{
        // setShowOrdersWithFullKitReady(false)
        setLoadDataParams({is_fullkit: false, load_graph_data: true, load_data_after_simulation:false, page: 1})
        setColDefCustomizations({
          ...defaultColDefCustomisation.current
        })
        setExtra([{
          field: "",
          headerCheckboxSelection: true,
          checkboxSelection: true,
          suppressMenu: true,
          maxWidth: 50,
          position: 0,
          filter: false
        }])
        break
      }
      case "ExcludeSimulate":{
        // setShowOrdersWithFullKitReady(True)
        excludeAndSimulate().then((data)=>{
          if(data){
            setLoadDataParams({is_fullkit: true, load_data_after_simulation: true, load_graph_data: true, page: 1})
            setExtra([])
            setSelectedRows(new Map());
            setColDefCustomizations({
              ...defaultColDefCustomisation.current,
              KitsBeforeSM:{
                cellStyle: {
                  // background: "#BC3D814F",
                  // color: "#BC3D81",
                  background:  globalStyles.chooseThemeColor[themeUi]?.color4 + "60",
                  color: globalStyles.chooseThemeColor[themeUi]?.color4,
                  fontWeight: "bold"
              }
              },
              FullKitsAvailable:{
                cellStyle: {
                  // background: "#BC3D814F",
                  // color: "#BC3D81",
                  background:  globalStyles.chooseThemeColor[themeUi]?.color4 + "60",
                  color: globalStyles.chooseThemeColor[themeUi]?.color4,
                  fontWeight: "bold"
              }
              }
            })
          }
        })
        break
      }
      case "SimulationSaved": {
        saveOrCancelSimulaton("Save").then(()=>{
          if(data){
            // setLoadDataParams({is_fullkit: true, load_data_after_simulation: false, load_graph_data: true, page: 1})
            setExtra([])
            setEditMode("View")
            setColDefCustomizations({
              ...defaultColDefCustomisation.current
            })
          }
        })
      }
    }
  }, [editMode])


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
    // { category: 'M5', value: 13, target: 43, value2: 10, groupName: "Underloaded\n", selected: true },
    // { category: '    ', value: "", target: "", value2: "", groupName: "", selected: true },
    // { category: 'M6', value: 10, target: 35, value2: 5, groupName: "Underloaded\n", selected: true },
    // { category: '      ', value: "", target: "", value2: "", groupName: "", selected: true },
    // { category: 'M7', value: 12, target: 38, value2: 8, groupName: "Underloaded\n", selected: true },
    // { category: '        ', value: "", target: "", value2: "", groupName: "", selected: true },
    // { category: 'M8', value: 8, target: 12, value2: 20, groupName: "Underloaded\n", selected: true },
    // { category: '          ', value: "", target: "", value2: "", groupName: "", selected: true },
    // { category: 'M1', value: 10, target: 35, value2: 20, groupName: "Overloaded\n", selected: true },
    // { category: '', value: "", target: "", value2: "", groupName: "", selected: true },
    // { category: 'M2', value: 12, target: 10, value2: 20, groupName: "Overloaded\n", selected: true },
    // { category: ' ', value: "", target: "", value2: "", groupName: "", selected: true },
    // { category: 'M3', value: 8, target: 12, value2: 20, groupName: "Overloaded\n", selected: true },
    // { category: '  ', value: "", target: "", value2: "", groupName: "", selected: true },
    // { category: 'M4', value: 15, target: 14, value2: 20, groupName: "Overloaded\n", selected: true },
    // { category: '   ', value: "", target: "", value2: "", groupName: "", selected: true },
    // { category: 'M9', value: 15, target: 36, value2: 20, groupName: "Balanced\n", selected: true },
    // { category: '            ', value: "", target: "", value2: "", groupName: "", selected: true },
    // { category: 'M10', value: 13, target: 35, value2: 20, groupName: "Balanced\n", selected: true },
    
  ])
  const chartoptions: AgChartOptions = {
    data: graphData,
    series: [
      {
        type: 'bar',
        xKey: 'ccr_name',
        yKey: "stpl_in_days",
        stacked: true,
        strokeWidth: 0,
        fill: "#191919",
        // formatter: (params) => {
        //   return {
        //     fillOpacity: params.datum.selected ? 1 : 0.5,
        //     fill: params.datum.selected ? params.fill : "#191919"
        //   }
        // }
      },
      {
        type: 'bar',
        xKey: 'ccr_name',
        yKey: "allowed_full_kits",
        stacked: true,
        strokeWidth: 0,
        fill: "#EBBF2C",
        // formatter: (params) => {
        //   return {
        //     fill: params.datum.selected ? params.fill : "#A8A8A8"
        //   }
        // },
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
        xKey: 'ccr_name',
        yKey: 'cumulative_wip_limit',
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

  return (
    <Wrapper>
      <MTOActionToolBar
        utilityBtns={renderUtilityBtns}
        quickFilter={<div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}><Checkbox style={{cursor: editMode != "View" ? "not-allowed" : "pointer"}} disabled={editMode != "View"} checked={loadDataParams.is_fullkit} onChange={(e: any) => setLoadDataParams({...loadDataParams, load_graph_data: true, is_fullkit: e.target.checked})} theme={themeUi} /> &nbsp;&nbsp; <strong>Show Orders with Full Kit Ready</strong></div>}
        isExcelExport isAddFilterButton
      />
      {(isDataLoading || excludeOrdersLoading || simulationLoading) && <OverlayLoader/>}
      <VFTable
        ref={grid}
        rowData={orders}
        gridOptions={options}
        columnDefs={options.columnDefs}
        onRowDataUpdated={(params)=>{
          const selectedRowIds = Array.from(selectedRows.keys());
          const newCurrentPageSeleceted: any = []
          params.api.forEachNode(node => {
              if (selectedRowIds.includes(node.data.on)) {
                  newCurrentPageSeleceted.push(node)
              }
          });
          currentPageSelectedRows.current = newCurrentPageSeleceted;
          params.api.setNodesSelected({ nodes: newCurrentPageSeleceted, newValue: true });
        }}
        onSelectionChanged={(params: any) => {
          const newMap = new Map(selectedRows);
          _.differenceWith(currentPageSelectedRows.current, params.api.getSelectedNodes(), _.isEqual).forEach((node: any) => {
            newMap.delete(node.data.on);
          }) 
          params.api.getSelectedNodes().forEach((node: any) => {
            newMap.set(node.data.on, node);
          })
          setSelectedRows(newMap)
          currentPageSelectedRows.current = params.api.getSelectedNodes();
        }}
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
      <VFPagination currentPage={currentPage} rowsPerPage={10} selectedRows={1} totalRows={totalRows} handleChangePage={handlePageChange}/>
      <Button arrowName={!hide ? "bg_arrow_down" : "bg_arrow_up"} themeUi={themeUi} onClick={() => { setHide(!hide) }}> {hide ? "Show" : "Hide"} Load Chart</Button>
      <div style={{ width: "100%", flex: !hide ? 1 : 0, minHeight: 0, marginBottom: hide ? "0" : "20px", boxShadow: "0px 6px 12px #81818129" }}>
        <AgChartsReact ref={graph} options={chartoptions} />
      </div>
      <EditRouteModal graphData={data} showModal={showModal} setShowModal={setShowModal} theme={themeUi} />
    </Wrapper >


  )
}

export default FullKitAssignment


