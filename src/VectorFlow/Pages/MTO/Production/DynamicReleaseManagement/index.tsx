import { AgCharts } from 'ag-charts-react'
import { GridOptions, IRowNode } from 'ag-grid-enterprise';
import { useEffect, useRef, useState } from 'react'
import VFTable from '../../Common/VFTable';
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../helpers/utils';
import AvailabilityCellRenderer from '../../../MTA/InsightsAndTrends/BTR/AvailabilityCellRenderer';
import ColorCellRenderer from '../../Common/ColorCellRenderer';
import { Button, Wrapper } from './DynamicReleaseManagement.styled';
import { useUserData } from '../../../../../context';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import EditRouteModal from './EditRouteModal';
import * as globalStyles from "../../../../../styles/global";
import { Rectangle } from './RectangleMarker';
import { BPRViewTableHeaderTab, InputCheckBox, SCTabHeader } from './styles';
import ReleaseModal from './ReleaseModal';
import './styles.css'
import { useGetDynamicReleaseData, useGetDynamicReleaseExcelData } from '../../../../../VectorFlow/Services/MTO/Production/DynamicReleaseManagement';
import { notifyError, notifySuccess } from '../../../../../helpers/notify';
import { useGetCCRGroupMaster, useGetLineCCRDetails, useGetRouteDetails } from '../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation';
import OverlayLoader from '../../Common/Loader';
import VFPagination from '../../Common/VFPagination';
import { GridRef } from '../../../../../VectorFlow/types/MDM';
import { useGetUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UIConfig';
import { FilterPageName, pagination, UIGridCode } from '../../Common/Enum';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import useFilter from "../../../../../hooks/useFilter";
import { useGetFilterData } from "../../../../../VectorFlow/Services/MTO/Common/CommonFilter";
import useColDef from '../../../../../hooks/useColDef';
import { ColorsMTO } from '../../Common/Colors';


const APIFilterConfig = {
  filSecVisConfig: {
    "Prod_Dynamic_Release_Management" : {
      mjr : false,
      or: true,
      res: true,
      cus: true
    },
  }
};

const DynamicReleaseManagement = () => {
  interface InputData {
    [key: string]: {
      ccr_code: string;
      limit: number | null;
      wip: number | null;
      ccr_n: string;
    };
  }
  interface OutputData {
    category: string;
    "Released WIP": number | string;
    Limit: number | string;
    "Incremental WIP": number;
    selected: boolean;
    ccr_name: string;
  }
  const reportName = "DynamicReleaseManagement";
  const [currentGridRef, setCurrentGridRef] = useState<any>(null);
  const [columnState, setColumnState] = useState<any>([]);
  const [isReset, setIsReset] = useState<any>(undefined);
  const [colDef, setColDef] = useState([{}]);
  const refGrid = useRef<GridRef | any>(null)
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [rowRelease, setRowRelease] = useState(false);
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const [order_key, setOrder_Key] = useState('');
  const [table1, setTable1] = useState(true);
  const [showReleaseModal, setShowReleaseModal] = useState(false)
  const { mutateAsync: getDynamicReleaseData, isLoading, isError, isSuccess } = useGetDynamicReleaseData();
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const [currData, setCurrData] = useState<any>([]);
  const [rowData, setRowData] = useState<any>([]);
  const [graphData, setGraphData] = useState<any>([]);
  const [masters, setMasters] = useState<any>({});
  const [routeNum, setRouteNum] = useState("");
  const [hide, setHide] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const graph = useRef<any>();
  const [message, setMessage] = useState('');
  const [HeaderData, setHeaderData] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [isDisabled, setIsDisabled]= useState<boolean>(true)
  
  const { mutateAsync : getDynamicReleaseExcelData} = useGetDynamicReleaseExcelData();
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
  } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_Dynamic_Release_Management);
  const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const { colDefMap, getColDef } = useColDef();
  const [dataUpdated, setDataUpdated] = useState(false);
  const [masterUIConfig, setMasterUIConfig] = useState([]);
  const userTheme = themeUi === 'REGALBLAZE';
  const backgroundColor = userTheme ? ColorsMTO.Orange.code : ColorsMTO.darkPink.code;
  const [routeTrigger, setRouteTrigger] = useState(false);
  const [finalGraphData, setFinalGraphData] = useState<any>([]);
  const { mutateAsync: getRouteDetails, isLoading: isGetRouteDetails} = useGetRouteDetails();
  const { mutateAsync: getCCRGroupMaster, } = useGetCCRGroupMaster();
  const { mutateAsync: getLineCCRDetails } = useGetLineCCRDetails();
  const [route, setRoute] = useState<any>();
  const [orderKey, setOrderKey] = useState<any>();
  const [lineCCR, setLineCCR] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isReleaseButtonDisabled, setIsReleaseButtonDisabled] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
      getColDef(response);
      setHeaderData(response.data.data);
    }
    catch (e) {
      console.log(e);
    }
  }

  const GetData = async (allOrders = 0, page = 1, graph = 1, isExcelExport = false) => {
    const formatedFilters = formatFilterJSON(appliedFilters);
    if (isExcelExport) {
      try {
        const headersdata = currentGridRef?.current?.api.getColumnState();
        const formatedFilters = formatFilterJSON(appliedFilters)
        const body = getBodyForExcelExport({ headersdata, filterData: formatedFilters, colDefMap })
        const response = await getDynamicReleaseExcelData({ isExcelExport: 1, body, graph: 0, ao: allOrders, report_name: FilterPageName.Prod_Dynamic_Release_Management })
        if (response.status === 200) {
          DownloadExcel(response, FilterPageName.Prod_Dynamic_Release_Management);
        } else {
          notifyError("Failed to export to Excel");
          console.log(response)
        }
      } catch (error) {
        notifyError("An error has occurred")
        console.log(error)
      }
    }
    else if (allOrders) {
      try {
        const APIData = await getDynamicReleaseData({ graph: 0, ao: allOrders, page, appliedFilters: formatedFilters });
        setCurrData(APIData);
        setRowData(APIData?.data?.data?.results ? APIData?.data?.data?.results : []);
      }
      catch (e) {
        notifyError("Failed to fetch Grid data!")
      }
    }
    else {
      try {
        const APIData = await getDynamicReleaseData({ graph: 0, ao: allOrders, page, appliedFilters: formatedFilters });
        setCurrData(APIData);
        setRowData(APIData?.data?.data?.results ? APIData?.data?.data?.results : []);
      }
      catch (e) {
        notifyError("Failed to fetch Grid data!")
      }

    }
    if (graph) {
      try {
        const GraphAPIData = await getDynamicReleaseData({ graph: 1, ao: allOrders, page, appliedFilters: formatedFilters });
        setGraphData(GraphAPIData.data.data);
      }
      catch (e) {
        console.log(e)
      }
    }
  };

  const getFilterData = async () => {
    try {
        const response = await getPageWiseFilterData({
          page_name: FilterPageName.Prod_Dynamic_Release_Management,
          ao: table1 ? 0 : 1
        });
        setFilterData(response?.data.data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    getMastersData();
    // GetData();
    setColumnDef();
    // getUserColumnConfig();
    // getFilterData()
  }, [])

  useEffect(() => {
    if (Object.entries(appliedFilters).length) {
      setCurrentPage(1);
      GetData();
    }
  }, [appliedFilters])
  
  useEffect(() => {
    if (dataUpdated && !showModal) {
      setCurrentPage(1);
      setSelectedRows([]);
      setDataUpdated(false);
      setIsCheckboxChecked(false)
      GetData(table1 ? 0 : 1, 1, 0);
    }
  }, [dataUpdated])

  useEffect(()=>{
    getFilterData();
  },[table1])
  
  useEffect(()=>{
    if (HeaderData.length > 0) {
      setColDef(getColumnDefinations(HeaderData, colDefCustomizations, extras))
      getUserColumnConfig();
    }

  },[HeaderData])


  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Fetched Data successfully!")
    }
    if (isError) {
      notifyError("Failed to load data!")
    }
  }, [isSuccess, isError])

  const colDefCustomizations = {
    Action: {
      floatingFilter: false,
      resizable: false,
      suppressMenu: true,
      cellRenderer: (params: any) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: backgroundColor, fontWeight: 'bold', fontFamily: 'roboto' }} onClick={() => { setRowRelease(true), setOrder_Key(params.data.ok), setMessage(`Release Order with id: ${params.data.oid} `), setShowReleaseModal(true) }}>
            <div >Release &nbsp; </div>
            <img height={14} width={14} src= {userTheme ? '/assets/img/mto/dynamicReleaseManagement/arrow-icon-yellow.svg' : '/assets/img/mto/dynamicReleaseManagement/arrow-icon.svg'} alt='arrow-icon' />
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
            <img height={12} width={12} alt="edit icon" src={userTheme ? "/assets/img/mto/fullKitAssignment/edit_icon_yellow.svg":"/assets/img/mto/fullKitAssignment/edit_icon.svg"} style={{ color: globalStyles.chooseThemeColor[themeUi]?.color4, cursor: "pointer" }} onClick={() => {
              console.log("route....", params.data.rid)
              if(params.data.rid === null){
                notifyError("No Route assigned to this order!");
                return;
              }
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
    },
    DropDown: {
      field: "",
      headerName: '',
      position: 0,
      resizable: false,
      headerCheckboxSelection: false,
      checkboxSelection: true,
      maxWidth: 50,
      suppressMenu: true,
      floatingFilter: false,
    }
  }

  const extras: any = [

  ];

  useEffect(() => {
    const newData = convertData(graphData);
    if (selectedRows.length) {
      setIsReleaseButtonDisabled(false);
    }
    else {
      setIsReleaseButtonDisabled(true);

    }

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

    setFinalGraphData(newData);
  }, [selectedRows]);

  const updateGraphOnSelect = () => {
    
    const selectedData = refGrid.current?.api.getSelectedRows();
    if (selectedData) {
      let mergedData: any = [...selectedRows]; // Start with the existing selected data

      //add newly selected rows in all selectedData
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

      //remove unselected rows from all selectedData
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
    toggleCheckBox();
    refGrid.current.api.refreshCells();
  };

  const onFirstDataRendered =
    (params: any) => {
      const nodesToSelect: IRowNode[] = [];
      console.log(selectedRows, "updateUserData selectedRows");
      params.api.forEachNode((node: any) => {
        if (node.data && node.data.oid && existsInSelected(node.data.ok)) {
          console.log(node.data, "exist");
          console.log(selectedRows, "selectedRows exist");
          node.data.ok = selectedRows[0].ok;
          nodesToSelect.push(node);
        }

      });
      params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
      params.api.refreshCells();
      setCurrentGridRef(refGrid);
      toggleCheckBox();
      updateGraphOnSelect();

    }

  const options: GridOptions<any> = {
    getRowStyle: (params: any) => {
      return {
        background: params.node.rowIndex % 2 === 0 ? "#F4F4F4" : "#FFFFFF",
      };
    },
    rowHeight: 28,
    suppressRowClickSelection: true,
    suppressPaginationPanel: true,
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

    columnDefs: colDef,
    defaultColDef: {
      resizable: true,
      suppressMenu: true,
      initialFlex: 1,
      autoHeaderHeight: true,
      floatingFilter: true,
      enableRowGroup: true,
      cellStyle: {
        "fontSize": "12px",
        'display': 'flex',
        'alignItems': 'center',

      },
    },
  };

  function convertData(input: InputData): OutputData[] {
    const result: OutputData[] = [];

    // Convert the input object to an array of keys for iteration
    const keys = Object.keys(input);
    let uniqueKey = "";

    keys.forEach((key, index) => {
      uniqueKey += ' ';
      const item = input[key];


      // Create the main data entry
      result.push({
        category: item.ccr_code,
        "Released WIP": item.wip !== null ? item.wip : "",
        Limit: item.limit !== null ? item.limit : "",
        // "Incremental WIP": index % 2 === 0 ? 20 : "", // Just as an example
        "Incremental WIP": 0, // Just as an example
        selected: true,
        ccr_name: item.ccr_n
      });

      // Create the empty separator entry
      result.push({
        category: " ".repeat(index + 1),
        "Released WIP": "",
        Limit: "",
        "Incremental WIP": 0,
        selected: true,
        ccr_name: uniqueKey
      });
    });

    return result;
  }


  const [chartoptions, setChartOptions] = useState<any>({
    // data: graphData,
    series: [
      {
        type: 'bar',
        xKey: 'ccr_name',
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
        xKey: 'ccr_name',
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
        xKey: 'ccr_name',
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
        },
        label: {
          avoidCollisions: false,
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

  useEffect(() => {
    setFinalGraphData(convertData(graphData));

  }, [graphData])

  useEffect(() => {
    setChartOptions({ ...chartoptions, data: finalGraphData })
  }, [finalGraphData])

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

  useEffect(() => {

    if (routeNum !== '') {
      getRoute(routeNum, orderKey);
    }

  }, [routeTrigger, orderKey, routeNum])

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

  const handlePageChangeCumulative = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (table1) {
      GetData(0, pageNumber, 0);
    }
    else {
      GetData(1, pageNumber, 0);
    }
  };

  const onCheckBoxToggle = (e: any) => {
    const isChecked = e.target.checked;
    setIsCheckboxChecked(isChecked); 

    if (isChecked) {
      refGrid.current.api.selectAll();
    } else {
      refGrid.current.api.deselectAll();
    }
    updateGraphOnSelect();
  }

  const toggleCheckBox = () => {
    
    const selectedNodes = refGrid?.current?.api?.getSelectedRows();
    const totalRows = refGrid?.current?.api?.getDisplayedRowCount() 

    setIsCheckboxChecked(selectedNodes?.length > 0 && selectedNodes?.length === totalRows); 
  };


  const existsInSelected = (ok: string): boolean => {
    for (let index = 0; index < selectedRows.length; index++) {
      const element: any = selectedRows[index];
      if (element.ok === ok) {
        return true;
      }

    }
    return false;
  }
  
    
  const getUserColumnConfig = async () => {
    try {
      const data = await getUserUIReportConfigData({
        un: user.user.name,
        rn_id: UIGridCode.ProdDynamicReleaseManagement
      });
  
      const newConfig = JSON.parse(data?.data?.data[0]?.columns_settings) || [];
      setColumnState(newConfig);
  
      if (!data) {
        console.error('Failed to apply column state');
      }
    } catch (error) {
      console.error(error);
    }
  }
      
  
  const handleSaveClick = async (coldefs?: any) => {
    try {
      if (coldefs) {
        const payload = {
          un: user.user.name,
          rn_id: UIGridCode.ProdDynamicReleaseManagement,
          cs: JSON.stringify(coldefs),
        };
        await updateUserUIReportConfigData([payload]);
        setColumnState([...coldefs]);
        
      } else {
        if (currentGridRef?.current?.api) {
          const config = currentGridRef.current.api.getColumnState();

          const payload = {
            un: user.user.name,
            rn_id: UIGridCode.ProdDynamicReleaseManagement,
            cs: JSON.stringify(config)
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

  useEffect(()=>{ 
    if (currentGridRef?.current && columnState?.length) {
      const result = currentGridRef.current.api.applyColumnState({
        state: columnState,
        applyOrder: true
      });
      if (!result) {
        console.error('Failed to apply column state 1');
      }
    }
  },[columnState]);

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

  
  const ExcelData = () =>{
    GetData(table1 ? 0 : 1 , 0 , 0, true)
  }

  const ReleaseOrderHeader: any = (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', fontWeight: 'bold', gap: '15px' }}>

        <div style={{ borderRadius: '5px', background: 'white', padding: '10px 30px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'rgba(133, 132, 132, 0.247) -5px 4px 10px', gap: '10px' }}>
          <InputCheckBox checked={isCheckboxChecked} onChange={onCheckBoxToggle} type="checkbox" theme={themeUi} />
          <p>Release</p>
        </div>
        {
          isReleaseButtonDisabled ?
            <div
              style={{
                cursor: "not-allowed",
                background: `linear-gradient(to right, ${backgroundColor})`,
                backgroundColor: backgroundColor,
                height: "43px",
                width: "59px",
                borderRadius: "4px",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                display: "flex",
                opacity: 0.5, // Visual cue for disabled
                pointerEvents: "none", // Prevent click when disabled
              }}
              data-testid={'isReleaseBtn'}
            >
              <img
                style={{}}
                src="/assets/img/rightArrowHorizontal.svg"
                height={13}
                width={7}
              />
            </div>
            :
            <div
              style={{
                cursor: 'pointer',
                background: `linear-gradient(to right, ${backgroundColor})`,
                backgroundColor: backgroundColor,
                height: '43px',
                width: '59px',
                borderRadius: '4px',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                display: 'flex'
              }}
              data-testid={'isReleaseBtn'}
              onClick={onOrderRelease}>
              <img
                style={{}}
                src="/assets/img/rightArrowHorizontal.svg"
                height={13}
                width={7}
              />
            </div>
        }

      </div>
    </>
  );

  return (
    <>
      <Wrapper>
        {
          (isLoading || isUpdateUserConfig || isGetUserConfig || isGetRouteDetails) && <OverlayLoader />
        }
        <MTOActionToolBar 
          comp="FullKitAssignment" 
          isExcelExport 
          onExcelExportClick={ExcelData}
          isAddFilterButton 
          themeUi={themeUi}
          handleSaveClick={handleSaveClick}
          handleResetClick={handleResetClick}
          isFilterOpen={isFilterOpen}
          onAddFilter={onAddFilter}
          toggleFilter={toggleFilter}
          onApplyFilter={onApplyFilter}
          multiFilter={currFilter}
          setMultiFilter={setCurrFilter}
          onFilterRemove={onFilterRemove}
          isMfgSelected={isMfgSelected}
          ReleaseOrderHeader={ReleaseOrderHeader}
        />

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
          onFilterChanged={()=>{Object.keys((currentGridRef?.current?.api?.getFilterModel()))?.length>0 ? setIsDisabled(false) : setIsDisabled(true)}}
          rowSelection="multiple"
          onSelectionChanged={updateGraphOnSelect}
          onRowDataUpdated={onFirstDataRendered}
          maintainColumnOrder={true}
        />
        <div style={{ width: '100%' }}>

          <VFPagination
            selectedRows={0}
            rowsPerPage={pagination.mtoPageSize}
            totalRows = {currData?.data?.data?.count || currData?.data?.data?.length || 0}
            currentPage={currentPage}
            handleChangePage={handlePageChangeCumulative}
            showPagination
            resetGridRef={currentGridRef}
            isDisabled={isDisabled}
          />
        </div>
        <Button arrowName={!hide ? "bg_arrow_down" : "bg_arrow_up"} themeUi={themeUi} onClick={() => { setHide(!hide) }}> {hide ? "Show" : "Hide"} Load Chart</Button>
         <div className='chart-wrapper' style={{ width: "100%", maxHeight: '40vh', flex: !hide ? 1:0, overflow: hide ? "hidden":"unset", minHeight: 0, marginBottom: hide ? "0" : "10px", boxShadow: "0px 6px 12px #81818129"}}>
          <AgCharts ref={graph} options={chartoptions}/>
        </div>
        {showModal && <EditRouteModal chartoptions={chartoptions} dataUpdated={dataUpdated} setDataUpdated={setDataUpdated} setRouteNum={setRouteNum} lineCCRDetails={lineCCR} route={route} master={masters} setRoute={setRoute} showModal={showModal} setShowModal={setShowModal} themeUI={themeUi} orderKey={orderKey} />}
        
        {showReleaseModal && <ReleaseModal dataUpdated={dataUpdated} setDataUpdated={setDataUpdated} setResetReleaseCheckbox={setIsCheckboxChecked} rowRelase={rowRelease} message={message} themeUi={themeUi} totalOrders={120} order_key={order_key} selectedOrders={selectedRows} showModal={showReleaseModal} setShowModal={setShowReleaseModal} />}
      </Wrapper>
    </>
  )
}

export default DynamicReleaseManagement