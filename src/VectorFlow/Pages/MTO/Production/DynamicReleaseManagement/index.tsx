import { AgChartsReact } from 'ag-charts-react';
import { GridOptions } from 'ag-grid-enterprise';
import { useEffect, useMemo, useRef, useState } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';

import { AgChartOptions } from 'ag-charts-community';
import { getColumnDefinations } from '../../../../../helpers/utils';
import { fullKitAssignmentHeader } from './data';
import AvailabilityCellRenderer from '../../../MTA/InsightsAndTrends/BTR/AvailabilityCellRenderer';
import ColorCellRenderer from '../../Common/ColorCellRenderer';
import { Button, Wrapper } from './DynamicReleaseManagement.styled';
import { useUserData } from '../../../../../context';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import EditRouteModal from './EditRouteModal';
import * as globalStyles from "../../../../../styles/global";
import { Rectangle } from './RectangleMarker';
// import { useGetUIConfigData } from '../../../../Services/MTO/Common/UIConfig';
import { BPRViewTableHeaderTab, SCTabHeader } from './styles';
import ReleaseModal from './ReleaseModal';
import './styles.css'
import { useGetDynamicReleaseData } from '../../../../../VectorFlow/Services/MTO/Production/DynamicReleaseManagement';
import { notifyError } from '../../../../../helpers/notify';
import { useGetCCRGroupMaster, useGetRouteDetails } from '../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation';
import OverlayLoader from '../../Common/Loader';


const DynamicReleaseManagement = () => {


  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  const [table1, setTable1] = useState(true);

  const [showReleaseModal, setShowReleaseModal] = useState(false)

  const { mutateAsync: getDynamicReleaseData, isLoading, isError, isSuccess } = useGetDynamicReleaseData();

  const [currData, setCurrData] = useState<any>([]);
  const [rowData, setRowData] = useState<any>([]);

  const [currGraphData, setCurrGraphData] = useState<any>([]);
  const [graphData, setGraphData] = useState<any>([]);

  const GetData = async (ao = 0) => {

    if (ao) {

      try {
        const APIData = await getDynamicReleaseData({ graph: 0, ao });
        setCurrData(APIData);
        setRowData(APIData.data.data.results);
      }
      catch (e) {
        notifyError("Failed to fetch Grid data!")
      }
    }
    else {
      try {
        const APIData = await getDynamicReleaseData({ graph: 0, ao });
        setCurrData(APIData);
        setRowData(APIData.data.data.results);
      }
      catch (e) {
        notifyError("Failed to fetch Grid data!")
      }

    }

    if (graph) {

      try {
        const GraphAPIData = await getDynamicReleaseData({ graph: 1, ao });
        setCurrGraphData(GraphAPIData);
        setGraphData(GraphAPIData.data.data);
      }
      catch (e) {
        console.log(e)
      }
    }


  };

  useEffect(() => {
    console.log(currGraphData);
  }, [currGraphData])

  useEffect(() => {
    GetData();
    getMastersData();

  }, [])



  const colDefCustomizations = {
    Action: {
      floatingFilter: false,
      suppressMenu: true,
      cellRenderer: () => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#BC3D81', fontWeight: 'bold', fontFamily: 'roboto' }} onClick={() => { setShowReleaseModal(true) }}>
            <div>Release &nbsp; </div>
            <img src='/assets/img/mto/dynamicReleaseManagement/arrow-icon.svg' alt='arrow-icon' />
          </div>
        )
      }
    },
    BufferType: {
      cellRenderer: ColorCellRenderer
    },
    Route: {
      // tooltipField: "r"
      cellRenderer: (params: any) => {
        console.log('paramssss', params)
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%" }}>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{params.value}</div>
            <img alt="edit icon" src={"/assets/img/mto/fullKitAssignment/edit_icon.svg"} style={{ color: globalStyles.chooseThemeColor[themeUi]?.color4, cursor: "pointer" }} onClick={() => {
              // getRoute(params.)
              getRoute(params.data.rid)
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

  const extras = [
    {
      field: "",
      position: 0,
      headerCheckboxSelection: false,
      checkboxSelection: true,
      maxWidth: 50,
      suppressMenu: true,
      floatingFilter: false,
    }
  ];

  const [HeaderData] = useState(fullKitAssignmentHeader);


  const refGrid = useRef<any>(null)

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    console.log("selected Rows", selectedRows);
    const newData = convertData(graphData);
    console.log("selected row length", selectedRows.length);

    if (selectedRows.length) {

      newData?.forEach((ele) => {
        ele['selected'] = false;
      })
    }
    selectedRows.forEach((element: any) => {
      // Use Object.entries to iterate over the key-value pairs of the wips object
      Object.entries(element['wips']).forEach(([ccrName, value]: [string, any]) => {
        newData?.forEach((ele) => {
          if (ele['category'] === ccrName) {
            // Assuming "incremental wip" is a number, initialize it if it's undefined
            ele['incremental wip'] = (ele['incremental wip'] || 0) + (value);
            ele['selected'] = true;
          }
        });
      });
    });

    console.log("called");
    setFinalGraphData(newData);
    console.log("graph api", graph.current);
  }, [selectedRows]);

  const updateGraphOnSelect = () => {
    const selectedData = refGrid.current?.api.getSelectedRows();
    setSelectedRows(selectedData);
  };

  const colDefs = useMemo(() => {
    return getColumnDefinations(HeaderData.data, colDefCustomizations, extras)
  }, [])

  const options: GridOptions<any> = {
    getRowStyle: (params: any) => {
      return {
        background: params.node.rowIndex % 2 === 0 ? "#F4F4F4" : "#FFFFFF",
      };
    },
    rowHeight: 40,
    suppressRowClickSelection: true,
    onSelectionChanged: updateGraphOnSelect,
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
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
          minWidth: 180,
          maxWidth: 400,
          width: 250
        }
      ],
    },
    columnDefs: colDefs,
    defaultColDef: {
      // resizable: true,
      // suppressMenu: true,
      initialFlex: 1,
      // wrapHeaderText: true,
      filter: "agMultiColumnFilter",

      autoHeaderHeight: true,
      floatingFilter: true,
      enableRowGroup: true,

      floatingFilterComponentParams: { suppressFilterButton: true },
      cellStyle: {
        "font-size": "16px",
      },
    },
  };


  interface InputData {
    [key: string]: {
      ccr_code: string;
      limit: number | null;
      wip: number | null;
    };
  }

  interface OutputData {
    category: string;
    "Released wip": number | string;
    limit: number | string;
    "incremental wip": number;
    selected: boolean;
  }

  function convertData(input: InputData): OutputData[] {
    const result: OutputData[] = [];

    // Convert the input object to an array of keys for iteration
    const keys = Object.keys(input);

    keys.forEach((key, index) => {
      const item = input[key];


      // Create the main data entry
      result.push({
        category: item.ccr_code,
        "Released wip": item.wip !== null ? item.wip : "",
        limit: item.limit !== null ? item.limit : "",
        // "incremental wip": index % 2 === 0 ? 20 : "", // Just as an example
        "incremental wip": 0, // Just as an example
        selected: true,
      });

      // Create the empty separator entry
      result.push({
        category: " ".repeat(index + 1),
        "Released wip": "",
        limit: "",
        "incremental wip": 0,
        selected: true,
      });
    });

    return result;
  }


  const [chartoptions, setChartOptions] = useState<any>({
    // data: graphData,
    series: [
      {
        type: 'bar',
        xKey: 'category',
        yKey: "Released wip",
        stacked: true,
        strokeWidth: 0,
        fill: "#191919",
        formatter: (params: any) => {
          console.log("params", params)
          return {
            fillOpacity: params.datum.selected ? 1 : 0.5,
            fill: params.datum.selected ? params.fill : "#191919"
          }
        }
      },

      {
        type: 'bar',
        xKey: 'category',
        yKey: "incremental wip",
        stacked: true,
        strokeWidth: 0,
        fill: "#4BAAF7",
        formatter: (params: any) => {
          return {
            fill: params.datum.selected ? params.fill : "#4BAA66"
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
        yKey: 'limit',
        marker: {
          size: 10,
          fill: '#E53F3F',
          shape: Rectangle,
          strokeWidth: 0
        }
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
          shape: 'square'
        }

      },
    },

  }
  )
  const [hide, setHide] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const graph = useRef<any>();


  const onOrderRelease = () => {
    setShowReleaseModal(true);
  }

  const [finalGraphData, setFinalGraphData] = useState<any>([]);

  useEffect(() => {
    setFinalGraphData(convertData(graphData));

  }, [graphData])


  useEffect(() => {
    setChartOptions({ ...chartoptions, data: finalGraphData })
    console.log("chartopsfs data", chartoptions.data);
    console.log(graph.current)
  }, [finalGraphData])


  const { mutateAsync: getRouteDetails, } = useGetRouteDetails();
  const { mutateAsync: getCCRGroupMaster, } = useGetCCRGroupMaster();



  const [masters, setMasters] = useState<any>(null);


  const [ccrGroupingData, setCCRGroupingData] = useState<any>();

  const getMastersData = async () => {
    if (!masters) {

      const ccrGroupMaster = await getCCRGroupMaster();
      const ccrGroupData = Object.values(ccrGroupMaster?.data?.data);
      const ccrGroups: any = []

      ccrGroupData.forEach((group: any) => {

        const obj: any = { label: group.ccr_group_code, value: group.ccr_group_id, ccrs: [] }
        group.ccrs.forEach((ccr: any) => {
          obj.ccrs.push({ label: ccr.ccr_name, value: ccr.ccr_id });
        })
        ccrGroups.push(obj);
      })

      console.log('ccrGroups', ccrGroups)
      setCCRGroupingData({ ccrGroups });

    }
  }

  useEffect(() => {
    setMasters(ccrGroupingData)
    console.log("masters....", masters)
  }, [ccrGroupingData]);

  const [route, setRoute] = useState<any>();

  // TODO:
  const getRoute = async (route: any) => {
    if (typeof route === "number") {

      const data = await getRouteDetails(route);
      const routeDetails = data.data.data;
      routeDetails.sort((a: any, b: any) => a.ps - b.ps)
      console.log(routeDetails)
      const newRoute: any = []
      routeDetails.forEach((routeDetail: any) => {
        const obj = []
        const ccrGroup = masters.ccrGroups.find((ccr: any) => ccr.value === routeDetail.ccrGrpId);
        obj[0] = ccrGroup;
        obj[1] = ccrGroup.ccrs.find((ccr: any) => ccr.value === routeDetail.ccrId)
        newRoute[routeDetail.ps - 1] = obj
      })
      // routeCache.current[route] = newRoute;
      console.log('newRoute', newRoute)
      setRoute(newRoute);
      setShowModal(true);
      // return _.cloneDeep(newRoute)
    }
    return JSON.parse(route)
  }




  return (
    <>
      <Wrapper>
        {
          isLoading &&

          <OverlayLoader />
        }
        <MTOActionToolBar comp="FullKitAssignment" isExcelExport isAddFilterButton isReleaseButton onOrderRelease={onOrderRelease} />

        <SCTabHeader style={{ marginTop: '5px' }}>

          <BPRViewTableHeaderTab onClick={() => { setTable1(true), GetData() }} status={table1} marLeft={true} themeUi={themeUi} zIndex={2} style={{ width: '250px', fontSize: '12px' }} >
            Orders with simulated full kit
          </BPRViewTableHeaderTab>
          <BPRViewTableHeaderTab onClick={() => { setTable1(false), GetData(1) }} status={!table1} marLeft={true} themeUi={themeUi} zIndex={1} style={{ width: '250px', fontSize: '12px' }} >
            All Orders
          </BPRViewTableHeaderTab>
        </SCTabHeader>


        <VFTable
          ref={refGrid}
          rowData={rowData}
          gridOptions={options}
          columnDefs={options.columnDefs}
          statusBar={{
            statusPanels: [
              { statusPanel: 'agTotalRowCountComponent', align: 'left' },
            ]
          }}
          rowSelection="multiple"
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
        <EditRouteModal route={route} master={masters} setRoute={setRoute} graphData={finalGraphData} showModal={showModal} setShowModal={setShowModal} themeUI={themeUi} />
        <ReleaseModal themeUi={themeUi} totalOrders={120} selectedOrders={4} showModal={showReleaseModal} setShowModal={setShowReleaseModal} />
      </Wrapper >
    </>


  )
}

export default DynamicReleaseManagement


