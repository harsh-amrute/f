import { useState, useMemo, useEffect, useRef } from "react";
import { AgGridReactProps } from "ag-grid-react";

import { useUserData } from "../../../../../context";
import {
  RRREcoColorCellRenderer,
  RRRDispatchColorCellRenderer,
} from "../RationedRequirementReport/RRRCellRenderers";
import {
  convertUiConfigToOptions,
  mapRRRColorBandWiseFieldsToColDefs,
} from "../../../../../helpers/utils";
import { notifyError } from "../../../../../helpers/notify";
// import { toast } from "react-toastify";

import useBPRFilter from "../../../../../hooks/useBPRFilter";
import { defaultAgGridSideBarForBPR } from "../../../../../helpers/BPRConstants";
import {
  useGetDailyData,
  useGetState,
  useGetUiConfig,
} from "../../../../Services/MTA/SupplyChainIntelligenceHub/BPR";
import { GridRef } from "../../../../types/MDM";
import { ColDef } from "ag-grid-enterprise";

import { TextToTextColorMapper } from "../BPR/BPRCellRenderers";
import { type DailyDataGraph } from "../../../../types/MTA";
import { useDispatch } from "react-redux";
import {
  TOGGLE_GRAPH_MODAL,
  UPDATE_DAILY_DATA,
} from "../../../../../redux/actions/MTA";
import BPRGraphCellRenderer from "../BPR/BPRGraphCellRenderer";
import {
  useGetRRRColorBandWiseData,
  useGetRRRColorBandWiseRecordCount,
} from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/RRRColorBandWise";

const useRRRColorBandwise = () => {
  const [internalRef, setInternalRef] = useState<any>();

  const { isSideBarOpen } = useUserData();

  const [RRRColorBandWiseColumns, setRRRColorBandWiseColumns] = useState<
    Array<ColDef>
  >([]);

  const {
    state: currFilter,
    setState: setCurrFilter,
    onDelete,
  } = useBPRFilter();

  const tempRef = useRef();

  const ref = useRef<GridRef>();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<any>(1);

  const [tempDownloadData, setTempDownloadData] = useState<boolean>(false);

  const [exportExcelColumns, setExportExcelColumns] = useState<Array<any>>([]);

  const [exportExcelRowData, setExportExcelRowData] = useState<Array<any>>([]);

  const { mutateAsync: getUiConfig, isLoading: isRRRBandwiseConfigLoading } =
    useGetUiConfig();

  // const {mutateAsync:getRRRBandwiseData} =useGetRRRData();


  const { mutateAsync: getState, isLoading: isSavedDataLoading } =
    useGetState();

  const [gridState, setGridState] = useState<any>();

  const [recordsCount, setRecordsCount] = useState<number>(0);

  const [rowData, setRowData] = useState([]);

  const { mutateAsync: getDailyData } = useGetDailyData();

  const { mutateAsync: getData } = useGetRRRColorBandWiseData();

  const { mutateAsync: getDataCount } = useGetRRRColorBandWiseRecordCount();

  const rowsPerPage = parseInt(
    process.env.REACT_APP_BOR_ROWS_PER_PAGE || "100"
  );

  // const RRRColorBandWiseColumns = useMemo(()=>mapRRRColorBandWiseFieldsToColDefs(data?.data.data),[data])

  useEffect(() => {
    const fetchData = async () => {
      await handleGetRecordsCount();
      await getRRRColorBandWiseUiConfig();
      await loadGridData(currentPage);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getTableState = async () => {
      try {
        const data = await getState("RRRColorBandWise");
        setGridState(JSON.parse(data.data.data));
      } catch (err: any) {
        setGridState({
          charts: [],
          columns: [],
          pivot: false,
        });
      }
    };
    getTableState();
  }, []);

  useEffect(()=>{
    if(internalRef && gridState && gridState.columns){
        internalRef.api.applyColumnState({state:gridState.columns,applyOrder:true})
    }
},[internalRef,gridState])

  const handleGetRecordsCount = async (filter?: any) => {
    const payload = {
      filters: filter || currFilter,
      paginationParameter: {
        pageNumber: currentPage,
        // recordPerPage:20
        recordsPerPage: parseInt(
          process.env.REACT_APP_RRR_COLORBANDWISE_ROWS_PER_PAGE || "100"
        ),
      },
    };
    const resultCount = await getDataCount(payload);
    setRecordsCount(resultCount?.data?.data[0]?.count || 0);
  };

  const loadGridData = async (pageNo: any, filter?: any) => {
    const payload = {
      filters: filter || currFilter,
      paginationParameter: { pageNumber: pageNo, recordsPerPage: rowsPerPage },
    };
    const result = await getData(payload);
    setRowData(result?.data.data);
  };

  const onOpenDailyDataGraph = async (params: any) => {
    const payload: any = {
      SKUCode: params.data["SKUCode"],
      WHCode: params.data["WHCode"],
    };
    const result = await getDailyData(payload);
    const data = result.data.data[0];
    const dailyData: DailyDataGraph = {
      rowData: params.data,
      chartData: data["StockData"],
      normChangeData: data["NormChangeHistoryData"],
      masterData: data["MasterData"][0],
      suggestionData: data["SuggestionHistoryData"]
        ? data["SuggestionHistoryData"]
        : [],
      monitoringData: data["MonitoringData"],
    };

    dispatch(UPDATE_DAILY_DATA(dailyData));
    dispatch(TOGGLE_GRAPH_MODAL(true));
  };

  console.log(RRRColorBandWiseColumns)

  const getRRRColorBandWiseUiConfig = async () => {
    try {
      const response = await getUiConfig("RRR_OA");
      setRRRColorBandWiseColumns(
        mapRRRColorBandWiseFieldsToColDefs(
          response.data.data,
          onOpenDailyDataGraph
        )
      );
    } catch (err: any) {
      notifyError("Something Went Wrong");
    }
  };

  const onApplyFilter = async (filter: any) => {
    await handleGetRecordsCount(filter);
    await loadGridData(1, filter);
    setCurrFilter(filter);
    setCurrentPage(1);
  };

  const onDeleteFilter = async (parentId: any, filterId: any, value: any) => {
    const updatedFilter = onDelete(parentId, filterId, value);
    onApplyFilter(updatedFilter);
  };

  const customCellRenderers = useMemo(
    () => ({
      grapCellRenderer: BPRGraphCellRenderer,
      colorCellRenderer: TextToTextColorMapper,
      colorEcoCellRenderer: RRREcoColorCellRenderer,
      colorDispatchRender: RRRDispatchColorCellRenderer,
    }),
    []
  );

  const agGridProps: AgGridReactProps = useMemo(() => {
    return {
      tooltipShowDelay: 0,
      tooltipTrigger: "focus",
      readOnlyEdit: true,
      gridOptions: {
        rowHeight: 50,
        getRowStyle: (params: any) => {
          if (params.node.rowIndex % 2 === 0) {
            return { background: "#EBEBEB" };
          }
          return { background: "#F7F7F7" };
        },
      },
      pagination: false,
      sideBar: defaultAgGridSideBarForBPR,
      // overlayLoadingTemplate:'<object style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%) scale(2)" type="image/svg+xml" data="/assets/img/VectorFLOW/loaderMedium.svg" aria-label="loading"></object>',
      // rowSelection:'multiple',
      paginationPageSize: parseInt(
        process.env.REACT_APP_RRR_ROWS_PER_PAGE || "200"
      ),
      suppressRowClickSelection: true,
      components: customCellRenderers,
      enableBrowserTooltips: true,
      defaultColDef: {
        floatingFilter: true,
        // filter: "agMultiColumnFilter",
        // tooltipComponent:'remarksToolTipComponent',
        cellStyle: {
          "text-align": "center",
          height: "50px",
          "font-style": "normal",
          " font-variant": "normal",
          " font-weight": "300",
          " font-size": "20px",
          " font-family": "Roboto",
          display: "block",
          "text-overflow": "ellipsis",
          "white-space": "nowrap",
        },
        // ,
        // onCellClicked:(params:any)=>{
        //     console.log(params)
        //     if(params.data.transit && params.data.transit.length>0){
        //         setActiveRow(params.data.transit)
        //         toggleSubGrid(true)
        //         return
        //     }
        //     return setActiveRow(null)
        // }
      },
      onGridReady: (params) => setInternalRef(params),
    };
  }, []);

  const tempAgGridProps: AgGridReactProps = {
    onRowDataUpdated: (event) => {
      if (tempDownloadData)
        event.api.exportDataAsExcel({
          fileName: "RationedRequirementReportColorBandwise",
          columnKeys: ref.current?.api
            .getAllDisplayedColumns()
            .map((c) => c.getColId()),
        });
    },
  };

  const onExportToExcelCallBack = async (pageNumber: number) => {
    const data = await getData({
      filters: currFilter,
      paginationParameter: {
        pageNumber: pageNumber,
        recordsPerPage: 5000,
      },
    });
    return data.data.data;
  };

  const generalFilterOptions = useMemo(() => {
    return convertUiConfigToOptions(RRRColorBandWiseColumns);
  }, [RRRColorBandWiseColumns]);

  return {
    isSideBarOpen,
    RRRColorBandWiseColumns,
    agGridProps,
    isLoading: isRRRBandwiseConfigLoading,
    rowData,
    recordsCount,
    currentPage,
    tempRef,
    tempDownloadData,
    setTempDownloadData,
    tempAgGridProps,
    exportExcelRowData,
    setExportExcelRowData,
    exportExcelColumns,
    setExportExcelColumns,
    onExportToExcelCallBack,
    // getRRRBandwiseRowData,
    onApplyFilter,
    currFilter,
    setCurrFilter,
    onDeleteFilter,
    isSavedDataLoading,
    ref,
    generalFilterOptions,
    setCurrentPage,
  };
};

export default useRRRColorBandwise;
