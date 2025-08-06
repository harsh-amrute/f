import { AgCharts } from 'ag-charts-react'
import { GridOptions } from 'ag-grid-enterprise';
import { useEffect, useMemo, useRef, useState } from 'react'
import VFTable from '../../Common/VFTable';

// import { AgChartOptions } from 'ag-charts-community';
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../helpers/utils';

import ColorCellRenderer from '../../Common/ColorCellRenderer/ColorCellRenderer';
import { Button, Wrapper } from './FullKitAssignment.styled';
import { useUserData } from '../../../../../context';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import EditRouteModal from './EditRouteModal';
import * as globalStyles from "../../../../../styles/global";
import { Rectangle } from './RectangleMarker';
import { useGetUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UIConfig';
import Checkbox from '../../../../../components/VectorFLOW/commons/MTO/Checkbox';
import { useGetFullKitAssignmentDataWithGraphData, useGetFullkitAssignmentExcelData, useUpdateExcludedOrdersForFullkitAssignment, useUpdateFullkitOnSimulation, useUpdateOrSimulateStockAllocation } from '../../../../../VectorFlow/Services/MTO/Production/FullKitAssignment';
import OverlayLoader from '../../Common/Loader';
import VFButtonOutline from '../../../../../components/VectorFLOW/commons/VFButtonOutline';
import VFPagination from '../../Common/VFPagination';
import _ from 'lodash';
import { notifyError, notifySuccess } from '../../../../../helpers/notify';
import { useGetCCRGroupMaster, useGetCCRItemTypeMappingMaster, useGetFOLData } from '../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation';
import AvailabilityCellRenderer from './AvailabilityCellRenderer';
import useFilter from "../../../../../hooks/useFilter";
import { useGetFilterData } from '../../../../../VectorFlow/Services/MTO/Common/CommonFilter';
import { AvailabilityToolTipWrapper } from '../../../../../VectorFlow/Pages/MTA/InsightsAndTrends/BTR/styles';
import { FilterPageName, pagination, UIGridCode } from '../../Common/Enum';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import useColDef from '../../../../../hooks/useColDef';

const APIFilterConfig = {
  filSecVisConfig: {
    "Prod_FullKit_Assignment": {
      mjr: false,
      or: true,
      res: true,
      cus: true
    },
  }
}

const FullKitAssignment = () => {

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
  const [filterData, setFilterData] = useState({});

  const [HeaderData, setHeaderData] = useState([]);
  const [hide, setHide] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState("View")

  const graph = useRef<any>();
  const grid = useRef<any>();

  // const [showOrdersWithFullKitReady, setShowOrdersWithFullKitReady] = useState(true);
  // const [loadGraph, setLoadGraph] = useState(false);
  // const [loadDataAfterSimulation, setLoadDataAfterSimulation] = useState(false)

  const [selectedPlantId, setSelectedPlantId] = useState(null);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [orderKey, setOrderKey] = useState(null);
  const [itemTypeId, setItemTypeId] = useState<any>();


  const [orders, setOrders] = useState([]);
  const [masters, setMasters] = useState<any>();
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
  const [currentGridRef, setCurrentGridRef] = useState<any>(null);
  const [columnState, setColumnState] = useState<any>([]);
  const [isReset, setIsReset] = useState<any>(undefined);
  const [isDisabled, setIsDisabled]= useState<boolean>(true)
  const [colDef, setColDef] = useState([{}]);
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const graphDataOgFormat = useRef();
  const [userPageSize, setUserPageSize] = useState<any>();


  const currentPageSelectedRows = useRef([]);

  const { mutateAsync: getFullKitAssignmentDataWithGraphData, isLoading: isDataLoading } = useGetFullKitAssignmentDataWithGraphData();
  const { mutateAsync: updateExcludedOrdersForFullkitAssignment, isLoading: excludeOrdersLoading } = useUpdateExcludedOrdersForFullkitAssignment();
  const { mutateAsync: updateOrSimulateStockAllocation, isLoading: simulationLoading } = useUpdateOrSimulateStockAllocation();
  const { mutateAsync: updateFullkitOnSimulation, isLoading: isSimulationResultsUpdating } = useUpdateFullkitOnSimulation();
  const { mutateAsync: getCCRGroupMaster, } = useGetCCRGroupMaster();
  const { mutateAsync: getFOLData, } = useGetFOLData();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData();
  const {mutateAsync: getCCRItemTypeMappingMaster} = useGetCCRItemTypeMappingMaster();
  const { 
    state: currFilter, 
    setState: setCurrFilter, 
    onFilterRemove, 
    isFilterOpen, 
    isMfgSelected,
    onAddFilter, 
    onApplyFilter, 
    toggleFilter,
    appliedFilters
  } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_FullKit_Assignment);
  const {colDefMap , getColDef} =  useColDef();
  const { mutateAsync : getFullKitAssignmentDataWithGraphExcelData } = useGetFullkitAssignmentExcelData();
  const reportName = "FullKitAssignment";
  const [masterUIConfig, setMasterUIConfig] = useState([]);


  const defaultColDefCustomisation = useRef({
    Route: {
      // tooltipField: "r"
      cellRenderer: (params: any) => {
        return (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "end", gap: "1rem", width: "100%", height: "100%" }}>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{params.value}</div>
            <img height={12} width={12} alt="edit icon" src={"/assets/img/mto/fullKitAssignment/edit_icon.svg"} style={{ color: globalStyles.chooseThemeColor[themeUi]?.color4, cursor: "pointer" }}
              onClick={() => {
                setShowModal(true);
                setItemTypeId(params.data?.itid);
                setSelectedPlantId(params.data?.plid);
                setSelectedRouteId(params.data?.r);
                setOrderKey(params.data?.ok);
              }}
            />
          </div>
        )
      }
    },
    OrderInFullKitToday: {
      tooltipComponent: (params: any) => {
        return (
          <AvailabilityToolTipWrapper style={{ padding: "1rem", fontSize: "12px" }}>
            {params.value}
          </AvailabilityToolTipWrapper>

        )
      },

      tooltipValueGetter: (params: any) => {

        const oq = params.data.oq;
        const fka = params.data.fka;
        return `${fka}/${oq} kits can be manufactured`;
      },
      cellRenderer: AvailabilityCellRenderer,
    },
    ColorPriority: {
      cellRenderer: ColorCellRenderer
    },
    Tags: {
      cellRenderer: ColorCellRenderer,
      minWidth: 120,
      maxWidth: 120,
    }
  })

  const [colDefCustomizations, setColDefCustomizations] = useState<any>(defaultColDefCustomisation.current)

  const [extra, setExtra]: any = useState([])


  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
      getColDef(response)
      setHeaderData(response.data.data);
    }
    catch (e) {
      console.log(e);
    }
  }

  const findTag = (loadData: any, ccrId: any) => {
    return loadData.ccr_id == ccrId
  }

  const calculateTagsAndOrderinFullkitToday = (rows: any, graphdata: any) => {
    // --------------Logic-----------------------
    //- if anyone ccr is overloaded, show overloaded
    //- if anyone ccr is underloaded and no ccr is overloaded, show underloaded
    //- else show balanced
    //-------------------------------------------
    const newRows = rows.map((row: any) => {
      const ccrs = row.ccr_ids;
      const tags = { overloaded: 0, underloaded: 0, balanced: 0 }
      const oifkt = ((row.fka ?? 0) / (row.oq ?? 1)) * 100;
      ccrs?.forEach((ccrId: any) => {
        const isOverloaded = graphdata["overloaded"].find((loadData: any) => findTag(loadData, ccrId));

        if (isOverloaded) {
          tags.overloaded = tags.overloaded + 1
          return
        }
        const isUnderloaded = graphdata["underloaded"].find((loadData: any) => findTag(loadData, ccrId))
        if (isUnderloaded) {
          tags.underloaded = tags.underloaded + 1
          return
        }
        tags.balanced = tags.balanced + 1
      })
      if (tags.overloaded > 0) {
        return { ...row, t: "Overloaded", sortKey: 1, oifkt }
      }
      else if (tags.overloaded == 0 && tags.underloaded > 0) {
        return { ...row, t: "Underloaded", sortKey: 2, oifkt }
      }
      else if (tags.overloaded == 0 && tags.underloaded == 0 && tags.balanced > 0) {
        return { ...row, t: "Balanced", sortKey: 3, oifkt }
      }
      return { ...row, sortKey: 4, oifkt }
    })
    return newRows.sort((a: any, b: any) => {
      return a.sortKey - b.sortKey
    })
  }

  // const noOfCalls = useRef(0);

  

const fetchOrders = async (isExcelExport = false, page?:number, pageSize?:number) => {
    // if(noOfCalls.current == 0){
    //   await saveOrCancelSimulaton("Delete");
    //   noOfCalls.current += 1;
    // }
    const formatedFilters = formatFilterJSON(appliedFilters);
    const data = await getFullKitAssignmentDataWithGraphData({
      ...loadDataParams, 
      appliedFilters: formatedFilters,
      pageSize: pageSize || userPageSize,

    });

    const griddata: any = data?.data?.data?.results?.griddata;
    if(isExcelExport){
      try {
        const headersdata = currentGridRef?.current?.api?.getColumnState();
        const formattedFilters = formatFilterJSON(appliedFilters);
        const body = getBodyForExcelExport({headersdata,filterData : formattedFilters,colDefMap})
        const response = await getFullKitAssignmentDataWithGraphExcelData({
          ...loadDataParams,
          pageSize: userPageSize,  
          body, 
          isExcelExport : 1,
          report_name : FilterPageName.Prod_FullKit_Assignment
        })       
         if(response.status == 200){
          DownloadExcel(response, FilterPageName.Prod_FullKit_Assignment);
          notifySuccess('Report downloaded successfully')
        }else{
          notifyError('Failed to download the report')
          console.log('error downloading')
        }
        
      } catch (error) {
        notifyError('An error has occurred while downloading the report')
        console.log(error)
      }
    }
    else if (loadDataParams.load_graph_data) {
      const graph: any = [];
      const newGraphdata = data?.data?.data?.results?.graphdata;
      if (newGraphdata) {
        //underload
        newGraphdata["underloaded"].forEach((row: any) => {
          graph.push({ ...row })
          graph.push(_.cloneDeep({ ccr_name: " ".repeat(graph.length - 1), allowed_full_kits: 0, stpl_in_days: 0, }))
        })
        //overload
        newGraphdata["overloaded"].forEach((row: any) => {
          graph.push(row)
          graph.push(_.cloneDeep({ ccr_name: " ".repeat(graph.length - 1), allowed_full_kits: 0, stpl_in_days: 0, }))
        })
        //balanced
        newGraphdata["balanced"].forEach((row: any) => {
          graph.push(row)
          graph.push(_.cloneDeep({ ccr_name: " ".repeat(graph.length - 1), allowed_full_kits: 0, stpl_in_days: 0, }))
        })
        //modify griddata for adding tags
        const newRows = calculateTagsAndOrderinFullkitToday(griddata, newGraphdata)
        setOrders(newRows);
        setGraphData(graph)
        graphDataOgFormat.current = newGraphdata;
      }
     
    }
    else {
      const newRows = calculateTagsAndOrderinFullkitToday(griddata, graphDataOgFormat.current) // already fetched graph data
      setOrders(newRows);
    }
    setTotalRows(data?.data?.data?.count)
  }

  const savePageSize = (pageSize: any) => {
    if (pageSize) {
        setCurrentPage(1)
        setUserPageSize(pageSize);
        handleSaveClick(undefined, pageSize);
        fetchOrders(false,1, pageSize);
    } else {
        notifyError("Invalide page size");
    }
    
}


  const handlePageChange = async (currPage: number) => {
    setCurrentPage(currPage)
  }

  const excludeAndSimulate = async () => {
    const username = user.user.name
    const orders = Array.from(selectedRows.values()).map((order: any) => { return { on: order.data.on, lid: order.data.li } })
    const excluded = await updateExcludedOrdersForFullkitAssignment({ orders, username })
    if (excluded.status == 200) {
      const simulateOrders = await updateOrSimulateStockAllocation({ username, is_simulated: true })
      if (simulateOrders.status == 200) {
        return true
      } else {
        return false
      }
    }
  }

  const saveOrCancelSimulaton = async (is_type: "Save" | "Delete") => {
    try {
      const username = user.user.name
      await updateFullkitOnSimulation({ username, is_type })
      return true
    }
    catch (err) {
      notifyError("Failed to Save the Simulation")
      return false
    }

  }

  const getMasterData = async () => {
    const ccrGroupMaster = await getCCRGroupMaster();
    const ccrGroupData = Object.values(ccrGroupMaster?.data?.data);
    const ccrGroups: any = [];

    const FOLData = await getFOLData();
    const FOL = FOLData?.data?.data;
    
    const CCRItemTypeMappingMaster = await getCCRItemTypeMappingMaster();

    ccrGroupData.forEach((group: any) => {
      const obj: any = { label: group.ccr_group_code, value: group.ccr_group_id, ccrs: [] }
      // let minFOL = Infinity
      let minFol = Infinity;
      let maxFol = -Infinity;
      group.ccrs.forEach((ccr: any) => {
        minFol = Math.min(minFol, FOL[ccr.ccr_id]?.fol || 0);
        maxFol = Math.max(maxFol, FOL[ccr.ccr_id]?.fol || 0)
      })
      group.ccrs.forEach((ccr: any) => {
        obj.ccrs.push({ label: ccr.ccr_name, value: ccr.ccr_id, minFol, maxFol, fol: FOL[ccr.ccr_id]?.fol || 0, plant_id: ccr.plant });
      })
      ccrGroups.push(obj);
    })

    const CCRItemTypeMappingMasterData = Object.values(CCRItemTypeMappingMaster?.data?.data);

    setMasters({ ccrGroups, CCRItemTypeMappingMaster: CCRItemTypeMappingMasterData })
  }

  const renderUtilityBtns = useMemo(() => {

    switch (editMode) {
      case "View": {
        return <VFButtonOutline themeUi={themeUi}
          onClick={() => {
            setEditMode("Deselect")
          }}>Deselect Order</VFButtonOutline>
      }
      case "Deselect": {
        return <>
          <strong style={{ marginRight: "1rem", cursor: "pointer", color: globalStyles.chooseThemeColor[themeUi].color4 }} onClick={() => {
            setEditMode("View")
          }}>Cancel</strong>
          <VFButtonOutline
            style={{ width: "unset" }}
            disabled={selectedRows.size == 0}
            themeUi={themeUi}
            onClick={() => {
              //once the rows are excluded and simulated,
              setEditMode("ExcludeSimulate"); // also set the new column definition
            }}>Exclude & Simulate</VFButtonOutline></>
      }
      case "ExcludeSimulate": {
        return <>
          <strong style={{ marginRight: "1rem", cursor: "pointer", color: globalStyles.chooseThemeColor[themeUi].color4 }} onClick={() => {
            saveOrCancelSimulaton("Delete").then((data) => {
              if (data) {
                setColDefCustomizations({
                  ...defaultColDefCustomisation.current
                })
                setEditMode("Deselect")
              }
            })
          }}>Cancel</strong>
          <VFButtonOutline
            style={{ width: "unset" }}
            themeUi={themeUi}
            onClick={() => {
              setEditMode("SimulationSaved")
            }}>Save Simulation</VFButtonOutline>
        </>
      }
    }
  }, [editMode, selectedRows])

  useEffect(() => {
    if (HeaderData?.length > 0) {
      setColDef(getColumnDefinations(HeaderData, colDefCustomizations, extra))
      getUserColumnConfig();
      getFilterData();
    }
  }, [HeaderData, extra])

  const getUserColumnConfig = async () => {
    try {
      const data = await getUserUIReportConfigData({
        un: user.user.name,
        rn_id: UIGridCode.ProdFullkitAssignment
      });

      const newConfig = data?.data?.data?.length ? JSON.parse(data?.data?.data?.[0]?.columns_settings) || [] : [];
      setUserPageSize(newConfig.pageSize ? Number(newConfig.pageSize) : undefined);
      setColumnState(newConfig.cs);

      if (!data) {
        console.error('Failed to apply column state');
      }
    } catch (error) {
      console.error(error);
    }
  }

  
  const handleSaveClick = async (coldefs?: any,page_size?:any) => {
    try {
      if (coldefs) {
        const fullConfig = {cs: coldefs, pageSize:userPageSize };
        const payload = {
          un: user.user.name,
          rn_id: UIGridCode.ProdFullkitAssignment,
          cs: JSON.stringify(fullConfig),
        };
        await updateUserUIReportConfigData([payload]);
        setColumnState([...coldefs]);

      }else if(page_size){

        const config = columnState
        const fullConfig = {cs: config, pageSize:page_size };
        const payload = {
          un: user.user.name,
          rn_id: UIGridCode.ProdFullkitAssignment,
          cs: JSON.stringify(fullConfig),
        };
        await updateUserUIReportConfigData([payload]);
      }

       else {

        if (currentGridRef?.current?.api) {
          const config = currentGridRef.current.api.getColumnState();
          const fullConfig = {cs: config, pageSize:userPageSize };
  
          const payload = {
            un: user.user.name,
            rn_id: UIGridCode.ProdFullkitAssignment,
            cs: JSON.stringify(fullConfig)
          }
          await updateUserUIReportConfigData([payload]);
          await getUserColumnConfig();
        }
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleResetClick = () => {
    setIsReset(true);
  }

  const getFilterData = async () => {
    try {
        const response = await getPageWiseFilterData({page_name: FilterPageName.Prod_FullKit_Assignment });
        setFilterData(response?.data.data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    getMasterData();
    setColumnDef();
  }, [])

  useEffect(() => {
    if (loadDataParams && Object.entries(appliedFilters).length) {
      fetchOrders();
    }
  }, [loadDataParams])
  useEffect(() => {
    if (Object.entries(appliedFilters).length) {
      if (currentPage === 1) {
        fetchOrders();
      }
      else {
        setCurrentPage(1);
      }
    }
  },[appliedFilters])
  useEffect(() => {
    setLoadDataParams({ ...loadDataParams, load_graph_data: false, page: currentPage })
  }, [currentPage])

  useEffect(() => {
    switch (editMode) {
      case "View": {
        // setShowOrdersWithFullKitReady(true);
        setLoadDataParams({ is_fullkit: true, load_graph_data: true, load_data_after_simulation: false, page: 1 })
        setSelectedRows(new Map());
        setExtra([]);
        break
      }
      case "Deselect": {
        // setShowOrdersWithFullKitReady(false)
        setLoadDataParams({ is_fullkit: false, load_graph_data: false, load_data_after_simulation: false, page: 1 })
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
      case "ExcludeSimulate": {
        // setShowOrdersWithFullKitReady(True)
        excludeAndSimulate().then((data) => {
          if (data) {
            setLoadDataParams({ is_fullkit: true, load_data_after_simulation: true, load_graph_data: true, page: 1 })
            setExtra([])
            setSelectedRows(new Map());
            setColDefCustomizations({
              ...defaultColDefCustomisation.current,
              KitsBeforeSM: {
                cellStyle: {
                  // background: "#BC3D814F",
                  // color: "#BC3D81",
                  background: globalStyles.chooseThemeColor[themeUi]?.color4 + "60",
                  color: globalStyles.chooseThemeColor[themeUi]?.color4,
                  fontWeight: "bold"
                }
              },
              FullKitsAvailable: {
                cellStyle: {
                  // background: "#BC3D814F",
                  // color: "#BC3D81",
                  background: globalStyles.chooseThemeColor[themeUi]?.color4 + "60",
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
        saveOrCancelSimulaton("Save").then((data) => {
          if (data) {
            // setLoadDataParams({is_fullkit: true, load_data_after_simulation: false, load_graph_data: true, page: 1})
            saveOrCancelSimulaton("Delete").then(() => {
              setExtra([])
              setEditMode("View")
              setColDefCustomizations({
                ...defaultColDefCustomisation.current
              });
            })
          }
        })
      }
    }
  }, [editMode])


  const gridOptions: GridOptions<any> = {
    getRowStyle: (params: any) => {
      return {
        background: params.node.rowIndex % 2 === 0 ? "#F4F4F4" : "#FFFFFF",
      };
    },
    sideBar: {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          minWidth: 225,
          maxWidth: 225,
          width: 225
        },
      ],
    },
    rowHeight: 50,
    columnDefs: colDef,
    defaultColDef: {
      resizable: true,
      suppressMenu: true,
      initialFlex: 1,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      filter: "agTextColumnFilter",
      floatingFilterComponentParams: { suppressFilterButton: true },
      floatingFilter: true,
      enableRowGroup: true,
    },
    rowSelection: "multiple",
    suppressRowClickSelection: true,
    // sideBar: {
    //   toolPanels: ["agColumnsToolPanel"],
    // },
  };

  const chartoptions: any = {
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
        xName:'CCR name',
        yKey: 'cumulative_wip_limit',
        yName: 'Cumulative wip limit',
        marker: {
          size: 10,
          fill: '#E53F3F',
          shape: Rectangle,
          strokeWidth: 0
        }, 
        tooltip: {
          renderer: (params:any) => {
            const xVal = params.datum[params.xKey];
            const yVal = params.datum[params.yKey];
            return {
              title: '',
              content: `${params.xName}: ${xVal} <br>
                        ${params.yName}: ${yVal}`,
            };
          },
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
        label: {
          formatter: (props: any) => {
            if (props.value === "stpl_in_days") {
              return "Released WIP in Days"

            }
            else if (props.value === 'allowed_full_kits') {
              return 'Allocated Full Kits'
            }
            else if (props.value === 'Cumulative wip limit') { 
              return 'cumulative wip limit' 
          }
          }
        },
        showSeriesStroke: true,
        marker: {
          size: 15,
          strokeWidth: 0,
          shape: 'square', // 'circle', 'square', 'cross', 'plus', 'triangle'
        },
      },
    },

  }

  useEffect(() => {
    if (isReset) {
      handleSaveClick(masterUIConfig);
      setIsReset(false);
    }
  }, [isReset]);

  useEffect(() => {
    if (currentGridRef?.current) {
      setMasterUIConfig(currentGridRef?.current.api.getColumnState());
    }
  }, [colDef]);


  useEffect(() => {
    if (currentGridRef?.current && columnState?.length && colDef.length > 0) {
      const result = currentGridRef?.current?.api.applyColumnState({
        state: columnState,
        applyOrder: true
      });
      if (!result) {
        console.error('Failed to apply column state');
      }
    }
  }, [columnState]);

  const ExcelData = ()=>{
    fetchOrders(true);
  }
  return (
    <Wrapper>
      <MTOActionToolBar
        comp="FullKitAssignment"
        isExcelExport
        onExcelExportClick={ExcelData}
        isAddFilterButton
        themeUi={themeUi}
        isFilterOpen={isFilterOpen}
        isMfgSelected={isMfgSelected}
        onAddFilter={onAddFilter}
        toggleFilter={toggleFilter}
        onApplyFilter={onApplyFilter}
        multiFilter={currFilter}
        setMultiFilter={setCurrFilter}
        onFilterRemove={onFilterRemove}
        utilityBtns={renderUtilityBtns}
        handleSaveClick={handleSaveClick}
        handleResetClick={handleResetClick}
        quickFilter={<div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}><Checkbox style={{ cursor: editMode != "View" ? "not-allowed" : "pointer" }} disabled={editMode != "View"} checked={loadDataParams.is_fullkit} onChange={(e: any) => setLoadDataParams({ ...loadDataParams, load_graph_data: true, is_fullkit: e.target.checked })} theme={themeUi} /> &nbsp;&nbsp; <strong>Show Orders with Full Kit Ready</strong></div>}
      />
      {/* <button onClick={() => setShowModal(true)}>Click</button> */}
      {(isDataLoading || isUpdateUserConfig || isGetUserConfig || excludeOrdersLoading || simulationLoading || isSimulationResultsUpdating) && <OverlayLoader />}
      <VFTable
        ref={grid}
        rowData={orders}
        gridOptions={gridOptions}
        columnDefs={gridOptions.columnDefs}
        tooltipHideDelay={100000}
        tooltipShowDelay={0}
        tooltipMouseTrack={true}
        onGridReady={(params: any) => {
          params.api.autoSizeAllColumns();

          setCurrentGridRef(grid);
        }}
        onRowDataUpdated={(params: any) => {
          const selectedRowIds = Array.from(selectedRows.keys());
          const newCurrentPageSeleceted: any = []
          params.api.forEachNode((node: any) => {
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
        onFilterChanged={()=>{Object.keys((currentGridRef?.current?.api?.getFilterModel()))?.length>0 ? setIsDisabled(false) : setIsDisabled(true)}}

        maintainColumnOrder
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
      <VFPagination currentPage={currentPage} rowsPerPage={userPageSize || pagination.mtoPageSize}
 selectedRows={1} totalRows={totalRows || 0} handleChangePage={handlePageChange} resetGridRef={currentGridRef} isDisabled={isDisabled} customPageSizeEnabled={true}  savePageSize={savePageSize}
            userPageSize = {userPageSize}/>
      <Button arrowName={!hide ? "bg_arrow_down" : "bg_arrow_up"} themeUi={themeUi} onClick={() => { setHide(!hide) }}> {hide ? "Show" : "Hide"} Load Chart</Button>
      <div className='chart-wrapper' style={{ width: "100%", flex: !hide ? 1 : 0, overflow: hide ? "hidden":"unset", minHeight: 0, marginBottom: hide ? "0" : "10px", boxShadow: "0px 6px 12px #81818129" }}>
        <AgCharts ref={graph} options={chartoptions} />
      </div>
      <EditRouteModal
        orderKey={orderKey}
        plantId={selectedPlantId}
        routeId={selectedRouteId}
        graphData={graphData}
        showModal={showModal}
        master={masters}
        setShowModal={setShowModal}
        theme={themeUi}
        setOrderKey={setOrderKey}
        loadDataParams={loadDataParams}
        setLoadDataParams={setLoadDataParams}
        itemTypeId={itemTypeId}
      />
      
    </Wrapper >
  )
}

export default FullKitAssignment


