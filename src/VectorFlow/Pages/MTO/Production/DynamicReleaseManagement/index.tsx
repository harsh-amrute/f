import { AgChartsReact } from 'ag-charts-react';
import { GridOptions, IRowNode } from 'ag-grid-enterprise';
import { useEffect, useMemo, useRef, useState } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
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
import { BPRViewTableHeaderTab, SCTabHeader } from './styles';
import ReleaseModal from './ReleaseModal';
import './styles.css'
import { useGetDynamicReleaseData } from '../../../../../VectorFlow/Services/MTO/Production/DynamicReleaseManagement';
import { notifyError, notifySuccess } from '../../../../../helpers/notify';
import { useGetCCRGroupMaster, useGetLineCCRDetails, useGetRouteDetails } from '../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation';
import OverlayLoader from '../../Common/Loader';
import VFPagination from '../../Common/VFPagination';
import { GridRef } from '../../../../../VectorFlow/types/MDM';

const DynamicReleaseManagement = () => {
  interface InputData {
    [key: string]: {
      ccr_code: string;
      limit: number | null;
      wip: number | null;
    };
  }
  interface OutputData {
    category: string;
    "Released WIP": number | string;
    Limit: number | string;
    "Incremental WIP": number;
    selected: boolean;
  }
  const [HeaderData] = useState(fullKitAssignmentHeader);
  const refGrid = useRef<GridRef | any>(null)
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [rowRelease, setRowRelease] = useState(false);
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const [order_key, setOrder_Key] = useState('');
  const [table1, setTable1] = useState(true);
  const [showReleaseModal, setShowReleaseModal] = useState(false)
  const { mutateAsync: getDynamicReleaseData, isLoading, isError, isSuccess } = useGetDynamicReleaseData();
  const [currData, setCurrData] = useState<any>([]);
  const [rowData, setRowData] = useState<any>([]);
  const [graphData, setGraphData] = useState<any>([]);
  const [masters, setMasters] = useState<any>({});
  const [routeNum, setRouteNum] = useState("");
  const [hide, setHide] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const graph = useRef<any>();
  const [message, setMessage] = useState('');
  const GetData = async (allOrders = 0, page = 1, graph = 1) => {
    if (allOrders) {
      try {
        const APIData = await getDynamicReleaseData({ graph: 0, ao: allOrders, page });
        setCurrData(APIData);
        setRowData(APIData.data.data.results);
      }
      catch (e) {
        notifyError("Failed to fetch Grid data!")
      }
    }
    else {
      try {
        const APIData = await getDynamicReleaseData({ graph: 0, ao: allOrders, page });
        setCurrData(APIData);
        setRowData(APIData.data.data.results);
      }
      catch (e) {
        notifyError("Failed to fetch Grid data!")
      }

    }
    if (graph) {
      try {
        const GraphAPIData = await getDynamicReleaseData({ graph: 1, ao: allOrders, page });
        setGraphData(GraphAPIData.data.data);
      }
      catch (e) {
        console.log(e)
      }
    }
  };

  useEffect(() => {
    getMastersData();
    GetData();
  }, [])


  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Fetched Data successfully!")
    }
    if (isError) {
      notifyError("Failed to load data!")
    }
  }, [isSuccess, isError])

  const [routeTrigger, setRouteTrigger] = useState(false);

  const colDefCustomizations = {
    Action: {
      floatingFilter: false,
      suppressMenu: true,
      cellRenderer: (params: any) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#BC3D81', fontWeight: 'bold', fontFamily: 'roboto' }} onClick={() => { setRowRelease(true), setOrder_Key(params.data.ok), setMessage(`Release Order with id: ${params.data.oid} `), setShowReleaseModal(true) }}>
            <div>Release &nbsp; </div>
            <img height={14} width={14} src='/assets/img/mto/dynamicReleaseManagement/arrow-icon.svg' alt='arrow-icon' />
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
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%" }}>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{params.value}</div>
            <img height={12} width={12} alt="edit icon" src={"/assets/img/mto/fullKitAssignment/edit_icon.svg"} style={{ color: globalStyles.chooseThemeColor[themeUi]?.color4, cursor: "pointer" }} onClick={() => {
              setRouteNum(params.data.rid)
              setOrderKey(params.data.ok)
              setRouteTrigger(!routeTrigger);
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



  useEffect(() => {
    const newData = convertData(graphData);

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
            // Assuming "Incremental WIP" is a number, initialize it if it's undefined
            ele['Incremental WIP'] = (ele['Incremental WIP'] || 0) + (value);
            ele['selected'] = true;
          }
        });
      });
    });

    if (selectedRows.length) {
      setIsReleaseButtonDisabled(false);
    }
    else {
      setIsReleaseButtonDisabled(true);

    }

    setFinalGraphData(newData);
  }, [selectedRows]);

  const updateGraphOnSelect = () => {

    const selectedData = refGrid.current?.api.getSelectedRows();
    if (selectedData) {
      let mergedData: any = [...selectedRows]; // Start with the existing selected data

      selectedData.forEach((newItem: any) => {
        const index = mergedData.findIndex((item: any) => item.ok === newItem.ok);

        if (index !== -1) {
          // If the item exists, replace it
          mergedData[index] = newItem;
        } else {
          // Otherwise, add the new item
          mergedData.push(newItem);
        }
      });

      rowData.forEach((item: any) => {
        let isThere = 0;
        selectedData.forEach((selectedD: any) => {
          if (selectedD.ok === item.ok) {
            isThere = 1;
          }
        })

        if (isThere == 0) {
          mergedData = mergedData.filter((e: any) => e.ok !== item.ok)
        }
      })

      setSelectedRows(mergedData);
    }
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
    rowHeight: 28,
    suppressRowClickSelection: true,
    suppressPaginationPanel: true,
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
      resizable: true,
      // suppressMenu: true,
      initialFlex: 1,
      // wrapHeaderText: true,
      filter: "agMultiColumnFilter",

      autoHeaderHeight: true,
      floatingFilter: true,
      enableRowGroup: true,

      floatingFilterComponentParams: { suppressFilterButton: true },
      cellStyle: {
        "font-size": "12px",
        'display': 'flex',
        'align-items': 'center',

      },
    },
  };

  const [dataUpdated, setDataUpdated] = useState(0);



  function convertData(input: InputData): OutputData[] {
    const result: OutputData[] = [];

    // Convert the input object to an array of keys for iteration
    const keys = Object.keys(input);

    keys.forEach((key, index) => {
      const item = input[key];


      // Create the main data entry
      result.push({
        category: item.ccr_code,
        "Released WIP": item.wip !== null ? item.wip : "",
        Limit: item.limit !== null ? item.limit : "",
        // "Incremental WIP": index % 2 === 0 ? 20 : "", // Just as an example
        "Incremental WIP": 0, // Just as an example
        selected: true,
      });

      // Create the empty separator entry
      result.push({
        category: " ".repeat(index + 1),
        "Released WIP": "",
        Limit: "",
        "Incremental WIP": 0,
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
        yKey: "Released WIP",
        stacked: true,
        strokeWidth: 0,
        fill: "#191919",
        formatter: (params: any) => {
          return {
            fillOpacity: params.datum.selected ? 1 : 0.5,
            fill: params.datum.selected ? params.fill : "#191919"
          }
        }
      },

      {
        type: 'bar',
        xKey: 'category',
        yKey: "Incremental WIP",
        stacked: true,
        strokeWidth: 0,
        fill: "#4BAAF7",
        formatter: (params: any) => {
          return {
            fill: params.datum.selected ? params.fill : "#4BAA66"
          }
        }
      },
      {
        type: 'scatter',
        xKey: 'category',
        yKey: 'Limit',
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


  const onOrderRelease = () => {
    setRowRelease(false);
    setOrder_Key('');
    setMessage(`Release ${selectedRows.length} selected orders out of ${currData?.data?.data.count}`)
    setShowReleaseModal(true);
  }

  const [finalGraphData, setFinalGraphData] = useState<any>([]);

  useEffect(() => {
    setFinalGraphData(convertData(graphData));

  }, [graphData])


  useEffect(() => {
    setChartOptions({ ...chartoptions, data: finalGraphData })
  }, [finalGraphData])


  const { mutateAsync: getRouteDetails, } = useGetRouteDetails();
  const { mutateAsync: getCCRGroupMaster, } = useGetCCRGroupMaster();
  const { mutateAsync: getLineCCRDetails } = useGetLineCCRDetails();

  const getMastersData = async () => {
    try {
      const ccrGroupMaster = await getCCRGroupMaster();
      const ccrGroupData = Object.values(ccrGroupMaster?.data?.data);
      const ccrGroups: any = [];

      ccrGroupData.forEach((group: any) => {
        const obj: any = { label: group.ccr_group_code, value: group.ccr_group_id, ccrs: [] };
        group.ccrs.forEach((ccr: any) => {
          obj.ccrs.push({ label: ccr.ccr_name, value: ccr.ccr_id });
        });
        ccrGroups.push(obj);
      });

      setMasters({ ccrGroups });
    } catch (error) {
      console.log(error)
    }
  };

  const [route, setRoute] = useState<any>();
  const [orderKey, setOrderKey] = useState<any>();

  useEffect(() => {

    if (routeNum !== '') {
      getRoute(routeNum, orderKey);
    }

  }, [routeTrigger, orderKey, routeNum])

  const [lineCCR, setLineCCR] = useState();

  const getRoute = async (route: any, orderKey: any) => {
    await getMastersData();

    if (typeof route === "number") {
      try {
        const data = await getRouteDetails(route);
        const routeDetails = data.data.data;

        routeDetails.sort((a: any, b: any) => a.ps - b.ps);

        const newRoute: any = [];
        routeDetails.forEach((routeDetail: any) => {
          const obj = [];

          const ccrGroup = masters?.ccrGroups?.find((ccr: any) => ccr?.value === routeDetail?.ccrGrpId);
          obj[0] = ccrGroup;
          obj[1] = ccrGroup?.ccrs.find((ccr: any) => ccr?.value === routeDetail?.ccrId);
          newRoute[routeDetail.ps - 1] = obj;
        });

        setRoute(newRoute);
        // setShowModal(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Handle cases where route is not a number
      setRoute(route);
    }
    if (orderKey) {
      try {
        const data = await getLineCCRDetails([orderKey]);

        setLineCCR(data.data.data)
        // setRoute(newRoute);
        setShowModal(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Handle cases where route is not a number
      setRoute(route);
    }
  };


  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChangeCumulative = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (table1) {
      GetData(0, pageNumber, 0);
    }
    else {
      GetData(1, pageNumber, 0);
    }
  };

  const setAllRows = (e: any) => {
    if (e.target.checked) {

      const nodesToSelect: any = [];

      refGrid.current.api.forEachNode((node: any) => {

        nodesToSelect.push(node);

      })
      refGrid.current.api.selectAll();
      // refGrid.current.api.setNodesSelected({ nodes: nodesToSelect, newValue: true })
    }
    else {
      const nodesToSelect: any = [];

      refGrid.current.api.forEachNode((node: any, index: any) => {

        if (index === 0) {

          nodesToSelect.push(node);
        }


      })
      refGrid.current.api.deselectAll();

    }
  }

  useEffect(() => {
    if (!showModal) {

      GetData(table1 ? 1 : 0, currentPage, 0);
    }
  }, [dataUpdated])

  const [isReleaseButtonDisabled, setIsReleaseButtonDisabled] = useState(true);


  const existsInSelected = (ok: string): boolean => {
    for (let index = 0; index < selectedRows.length; index++) {
      const element: any = selectedRows[index];
      if (element.ok === ok) {
        return true;
      }

    }
    return false;
  }

  const onFirstDataRendered =
    (params: any) => {
      const nodesToSelect: IRowNode[] = [];

      params.api.forEachNode((node: any) => {
        if (node.data && node.data.oid && existsInSelected(node.data.ok)) {
          node.data.ok = selectedRows[0].ok;

          nodesToSelect.push(node);
        }

      });
      params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });

    }

  return (
    <>
      <Wrapper>
        {
          isLoading && <OverlayLoader />
        }
        <MTOActionToolBar comp="FullKitAssignment" isExcelExport isAddFilterButton isReleaseButton isReleaseButtonDisabled={isReleaseButtonDisabled} onOrderRelease={onOrderRelease} onCheckBoxToggle={setAllRows} />

        <SCTabHeader style={{ marginTop: '5px' }}>

          <BPRViewTableHeaderTab onClick={() => { setTable1(true), GetData(0, currentPage, 0) }} status={table1} marLeft={true} themeUi={themeUi} zIndex={2} style={{ width: '250px', fontSize: '12px' }} >
            Orders with simulated full kit
          </BPRViewTableHeaderTab>
          <BPRViewTableHeaderTab onClick={() => { setTable1(false), GetData(1, currentPage, 0) }} status={!table1} marLeft={true} themeUi={themeUi} zIndex={1} style={{ width: '250px', fontSize: '12px' }} >
            All Orders
          </BPRViewTableHeaderTab>
        </SCTabHeader>
        <VFTable
          ref={refGrid}
          rowData={rowData}
          disableZoomScaling
          gridOptions={options}
          columnDefs={options.columnDefs}
          statusBar={{
            statusPanels: [
              { statusPanel: 'agTotalRowCountComponent', align: 'left' },
            ]
          }}
          rowSelection="multiple"
          onFirstDataRendered={onFirstDataRendered}
          onGridReady={onFirstDataRendered}
          onRowDataUpdated={onFirstDataRendered}

        />
        <div style={{ width: '100%' }}>

          <VFPagination
            selectedRows={0}
            rowsPerPage={10}
            totalRows={currData ? currData?.data?.data?.count : 0}
            currentPage={currentPage}
            handleChangePage={handlePageChangeCumulative}
            showPagination
          />
        </div>
        <Button arrowName={!hide ? "bg_arrow_down" : "bg_arrow_up"} themeUi={themeUi} onClick={() => { setHide(!hide) }}> {hide ? "Show" : "Hide"} Load Chart</Button>
        <div style={{ width: "100%", flex: !hide ? 1 : 0, minHeight: 0, marginBottom: hide ? "0" : "20px", boxShadow: "0px 6px 12px #81818129" }}>
          <AgChartsReact ref={graph} options={chartoptions} />
        </div>
        <EditRouteModal dataUpdated={dataUpdated} setDataUpdated={setDataUpdated} setRouteNum={setRouteNum} lineCCRDetails={lineCCR} route={route} master={masters} setRoute={setRoute} graphData={finalGraphData} showModal={showModal} setShowModal={setShowModal} themeUI={themeUi} />
        <ReleaseModal dataUpdated={dataUpdated} setDataUpdated={setDataUpdated} rowRelase={rowRelease} message={message} themeUi={themeUi} totalOrders={120} order_key={order_key} selectedOrders={selectedRows} showModal={showReleaseModal} setShowModal={setShowReleaseModal} />
      </Wrapper >
    </>
  )
}

export default DynamicReleaseManagement