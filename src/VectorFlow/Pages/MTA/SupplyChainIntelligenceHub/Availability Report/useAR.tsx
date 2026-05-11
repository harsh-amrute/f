import { useEffect, useMemo, useRef, useState } from "react";
import { VFFloatingTabItemProps } from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import HorizontalSplitView from "./HorizontalSplitView";
import VerticalSplitView from "./VerticalSplitView";
import {
  getColumnsForExcelExport,
  mapARRowData,
  MainMenuItemsCustomization,
  getColumnDefinationsMTA,
  CsvExportMTA,
} from "../../../../../helpers/utils";
import {
  useGetARDataCount,
  useGetARData,
  useGetARSummaryData,
} from "../../../../Services/MTA/SupplyChainIntelligenceHub/AvailabilityReport";
import { ColDef } from "ag-grid-enterprise";
import { ARTableHeader } from "./styles.css";
import CategoryCellRenderer from "./CategoryCellRenderer";
import AvailabilityCellRenderer from "./AvailabilityCellRenderer";
import { AgGridReactProps } from "ag-grid-react";
import { BPRTagsCellRenderer } from "../../SupplyChainIntelligenceHub/BPR/BPRCellRenderers";
import AvailabilityToolTip from "./AvailabilityToolTip";
import CategoryToolTip from "./CategoryToolTip";
import { VFPaginationProps } from "../../../../../components/VectorFLOW/commons/VFPagination";
import VFPagination from "../../../MTO/Common/VFPagination";
import CustomVFTable from "./CustomVFTable";
import {
  notifyError,
  notifyLoader,
  notifySuccess,
} from "../../../../../helpers/notify";
import { toast } from "react-toastify/unstyled";
import useBPRFilter from "../../../../../hooks/useBPRFilter";
import { useUserData } from "../../../../../context";
import { BPRFilterState } from "../../../../types/BPR";
import { BTRCategoryTextToNumberMapper } from "../../../../../helpers/BPRConstants";
import useGetLastRunData from "../../../../../hooks/useGetLastRunData";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../redux/store/store";
import { useGetUIConfigData } from "../../../../Services/MTA/Common/UIConfig";
import { UIColumnConfigName, UserUIColumnConfigName } from "../../../../../helpers/Enum";
import { useGetState } from "../../../../Services/MTA/Common/UserUIConfig";
import { GridRef } from "../../../../types/MDM";
import Summary from "./Summary";
import TodaysColorCellRenderer from "./TodaysColorCellRenderer";
import _ from "lodash";
import IconHeader from "../../Common/HeaderIcon/IconHeader";
const useAR = () => {
  const ecoRef = useRef<GridRef>();
  const techRef = useRef<GridRef>();
  const tempRef = useRef();
  const [techInternalRef, setTechInternalRef] = useState<any>();
  const [ecoInternalRef, setEcoInternalRef] = useState<any>();
  const [activeTab, setActiveTab] = useState<"norm" | "virtualnorm">(
    "virtualnorm"
  );

  const onTabChange = (tabValue: "norm" | "virtualnorm") => {
    setActiveTab(tabValue);
    const tempFilter = getPreparedFilter(currFilter);

    if (currentTab.id === "1") {
      getSummaryData(tempFilter, 1, undefined, tabValue);
    } else if (currentTab.id === "2") {
      getDataTech(tempFilter, currentPageTech, userPageSizeTech, tabValue);
    } else if (currentTab.id === "3") {
      getDataEco(tempFilter, currentPageEco, userPageSizeEco, tabValue);
    } else if (currentTab.id === "4") {
      getData(tempFilter, 1, tabValue);
    }
  };
  const tabs: Array<VFFloatingTabItemProps> = [
    {
      id: "1",
      value: "summary",
      label: "Summary",
    },
    {
      id: "2",
      value: "on-hand",
      label: activeTab === "norm" ? "Tech Inv. View" : "On-Hand Inv. View",
    },
    {
      id: "3",
      value: "pipeline",
      label: activeTab === "norm" ? "Eco Inv. View" : "Pipeline Inv. View",
    },
    {
      id: "4",
      value: "both",
      label:
        activeTab === "norm"
          ? "Both Tech & Eco View"
          : "Both On-Hand & Pipeline View",
    },
  ];

  const { user } = useUserData();
  const themeUi = user.user.theme_ui;

  const [currentPageTech, setCurrentPageTech] = useState<number>(1);
  const [currentPageEco, setCurrentPageEco] = useState<number>(1);
  const [currentPageTechForBoth, setCurrentPageTechForBoth] =
    useState<number>(1);
  const [currentPageEcoForBoth, setCurrentPageEcoForBoth] = useState<number>(1);

  const [isLockMode, toggleLockMode] = useState<boolean>(false);

  const [horizon, setHorizon] = useState<number>(90);

  const {
    state: currFilter,
    setState: setCurrFilter,
    onDelete,
  } = useBPRFilter();

  const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);
  const AR_ROWS_PER_PAGE = EnvConfig["AR_ROWS_PER_PAGE"];
  const rowsPerPage = parseInt(AR_ROWS_PER_PAGE || "50");

  const [userPageSizeTech, setUserPageSizeTech] = useState<number>(
    AR_ROWS_PER_PAGE ? parseInt(AR_ROWS_PER_PAGE) : 50
  );
  const [userPageSizeEco, setUserPageSizeEco] = useState<number>(
    AR_ROWS_PER_PAGE ? parseInt(AR_ROWS_PER_PAGE) : 50
  );
  const [userPageSizeTechForBoth, setuserPageSizeTechForBoth] =
    useState<number>(AR_ROWS_PER_PAGE ? parseInt(AR_ROWS_PER_PAGE) : 50);
  const [userPageSizeEcoForBoth, setUserPageSizeEcoBoth] = useState<number>(
    AR_ROWS_PER_PAGE ? parseInt(AR_ROWS_PER_PAGE) : 50
  );

  const { mutateAsync: getARData, isLoading } = useGetARData();

  const { mutateAsync: getARSummaryData, isLoading: isARSummaryLoading } =
    useGetARSummaryData();
  const [techSummaryData, setTechSummaryData] = useState<any[]>([]);
  const [ecoSummaryData, setEcoSummaryData] = useState<any[]>([]);
  const {
    data: countData,
    mutateAsync: getARDataCount,
    isLoading: isARCountLoading,
  } = useGetARDataCount();

  const {
    mutateAsync: getUiConfig,
    isLoading: isUIConfigLoading,
    isError,
  } = useGetUIConfigData();

  const { mutateAsync: getState, isLoading: isSavedDataLoading } =
    useGetState();

  const ecoTotalRows = useMemo(() => {
    return countData?.data.data.EcoCount;
  }, [isARCountLoading]);

  const techTotalRows = useMemo(() => {
    return countData?.data.data.TechCount;
  }, [isARCountLoading]);

  const [tempDownloadData, setTempDownloadData] = useState<boolean>(false);

  const [exportExcelColumns, setExportExcelColumns] = useState<Array<any>>([]);

  const [exportExcelRowData, setExportExcelRowData] = useState<Array<any>>([]);

  const [currentTab, setCurrentTab] = useState<VFFloatingTabItemProps>(tabs[0]);
  const [verticalView, setVerticalView] = useState<boolean>(true);
  const [techRowData, setTechRowData] = useState<Array<any>>([]);
  const [ecoRowData, setEcoRowData] = useState<Array<any>>([]);
  const { date: lastRunDate } = useGetLastRunData();
  const [initialColumnState, setInitialColumnState] = useState<any>(undefined);
  const [techGridState, setTechGridState] = useState<any>();
  const [ecoGridState, setEcoGridState] = useState<any>();
  const [techMasterUIConfig, setTechMasterUIConfig] = useState<any>([]);
  const [ecoMasterUIConfig, setEcoMasterUIConfig] = useState<any>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const RowsPerPageCurrTab =
    currentTab?.value === "on-hand"
      ? userPageSizeTech
      : currentTab?.value === "pipeline"
      ? userPageSizeEco
      : rowsPerPage;
  const savePageSizeTech = async (pageSize: number) => {
    setUserPageSizeTech(pageSize);
    await getDataTech(currFilter, currentPageTech, pageSize);
  };

  const savePageSizeEco = async (pageSize: number) => {
    setUserPageSizeEco(pageSize);
    await getDataEco(currFilter, currentPageEco, pageSize);
  };

  const techPaginationProps: VFPaginationProps = {
    selectedRows: 0,
    totalRows: techTotalRows,
    rowsPerPage: userPageSizeTech,
    currentPage: currentPageTech,
    handleChangePage: (currPage: number) => {
      getDataTech(getPreparedFilter(currFilter), currPage);
      setCurrentPageTech(currPage);
    },
    customPageSizeEnabled: true,
    userPageSize: userPageSizeTech,
    savePageSize: savePageSizeTech,
  };

  const ecoPaginationProps: VFPaginationProps = {
    selectedRows: 0,
    totalRows: ecoTotalRows,
    rowsPerPage: userPageSizeEco,
    currentPage: currentPageEco,
    handleChangePage: (currPage: number) => {
      getDataEco(getPreparedFilter(currFilter), currPage);
      setCurrentPageEco(currPage);
    },
    customPageSizeEnabled: true,
    userPageSize: userPageSizeEco,
    savePageSize: savePageSizeEco,
  };
  const techPaginationPropsForBoth: VFPaginationProps = {
    selectedRows: 0,
    totalRows: techTotalRows,
    rowsPerPage: userPageSizeTechForBoth,
    currentPage: currentPageTechForBoth,
    handleChangePage: (currPage: number) => {
      getDataTech(
        getPreparedFilter(currFilter),
        currPage,
        userPageSizeTechForBoth
      );
      setCurrentPageTechForBoth(currPage);
    },
  };
  const ecoPaginationPropsForBoth: VFPaginationProps = {
    selectedRows: 0,
    totalRows: ecoTotalRows,
    rowsPerPage: userPageSizeEcoForBoth,
    currentPage: currentPageEcoForBoth,
    handleChangePage: (currPage: number) => {
      getDataEco(
        getPreparedFilter(currFilter),
        currPage,
        userPageSizeEcoForBoth
      );
      setCurrentPageEcoForBoth(currPage);
    },
    customPageSizeEnabled: true,
    userPageSize: userPageSizeEco,
    savePageSize: savePageSizeEco,
  };

  const defaultColDef = {
    floatingFilter: true,
    filter: "agMultiColumnFilter",
    sortable: true,
    cellStyle: {
      textAlign: "center",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    flex: 1,
    width: 50,
    minWidth: 80,
    cellClass: "btr_cell_style",
  };

  const gridProps = useMemo((): AgGridReactProps => {
    return {
      getMainMenuItems: MainMenuItemsCustomization,
      gridOptions: {
        components: {
          categoryCellRenderer: CategoryCellRenderer,
          categoryToolTip: CategoryToolTip,
          availabilityCellRenderer: AvailabilityCellRenderer,
          tagsCellRenderer: BPRTagsCellRenderer,
          availabilityToolTip: AvailabilityToolTip,
          todaysColorCellRenderer: TodaysColorCellRenderer,
          iconHeader: IconHeader,
        },
        suppressDragLeaveHidesColumns: true,
        getRowStyle: (params: any) => {
          if (params.node.rowIndex % 2 === 0) {
            return { background: "#EBEBEB" };
          }
          return { background: "#F7F7F7" };
        },
      },
      rowHeight: 25,
      defaultColDef: defaultColDef,
    };
  }, []);

  const tempAgGridProps: AgGridReactProps = {
    onRowDataUpdated: (event) => {
      if (tempDownloadData)
        event.api.exportDataAsExcel({
          fileName:
            currentTab.value === "on-hand" ? "OnHandInv" : "PipelineInv",
          columnKeys: getColumnsForExcelExport(
            currentTab.value === "on-hand" ? techColDefs : ecoColDefs
          ),
        });
    },
  };

  const getBPRUiConfig = async () => {
    try {
      const response = await getUiConfig(UIColumnConfigName.AvailabilityReport);
      setInitialColumnState(response.data.data);
    } catch (err: any) {
      notifyError("Something Went Wrong");
    }
  };

  const getUserColumnConfig = async () => {
    if (currentTab.id === "2") {
      const stateData = await getState({
        reportname: UserUIColumnConfigName.AvailabilityReportonHand,
      });

      if (stateData.data.data.length !== 0) {
        const parsedContent = JSON.parse(stateData.data.data);
        setTechGridState(parsedContent);
      } else {
        console.log("State Data not available for AvailabilityReportonHand");
      }
    }

    if (currentTab.id === "3") {
      const stateData = await getState({
        reportname: UserUIColumnConfigName.AvailabilityReportpipeline,
      });
      if (stateData.data.data.length !== 0) {
        const parsedContent = JSON.parse(stateData.data.data);

        setEcoGridState(parsedContent);
      } else {
        console.log("State Data not available AvailabilityReportpipeline");
      }
    }
  };

  const onResetCallback = async () => {
    if (currentTab.id === "2") {
      setTechGridState({
        charts: [],
        columns: techMasterUIConfig,
        pivot: false,
      });
    } else if (currentTab.id === "3") {
      setEcoGridState({
        charts: [],
        columns: ecoMasterUIConfig,
        pivot: false,
      });
    }
  };

  const getDataTech = async (
    filter: any,
    pageNumber: number,
    pageSize?: number,
    toggleOverride?: "norm" | "virtualnorm"
  ) => {
    const payload = {
      id: 0,
      name: "tech",
      fields: [],
      filters: filter,
      paginationParameter: {
        pageNumber: pageNumber,
        recordsPerPage: pageSize || userPageSizeTech,
      },
      ISExport: "0",
      activeTab: toggleOverride ?? activeTab,
    };
    const loaderId = notifyLoader("Loading data");
    try {
      const data = await getARData(payload);
      setTechRowData(mapARRowData(data.data.data.tech));
    } catch (err: any) {
      notifyError(err);
      setTechRowData([]);
      setEcoRowData([]);
    } finally {
      toast.dismiss(loaderId);
    }
  };

  const getSummaryData = async (
    filter: any,
    pageNumber: number,
    pageSize?: number,
    toggleOverride?: "norm" | "virtualnorm"
  ) => {
    const payload = {
      id: 0,
      name: "both",
      fields: [],
      filters: filter,
      paginationParameter: {
        pageNumber: pageNumber,
        recordsPerPage: pageSize || userPageSizeTech,
      },
      ISExport: "0",
      activeTab: toggleOverride ?? activeTab,
    };

    const loaderId = notifyLoader("Loading summary data");

    try {
      const response = await getARSummaryData(payload);

      const raw = response.data.data;
      const data = typeof raw === "string" ? JSON.parse(raw) : raw;

      const techStats = data.TechColorStats || [];
      const ecoStats = data.EcoColorStats || [];

      const formattedTech = techStats.map((item: any) => ({
        Category: item.TechColor,
        AbsoluteNo: item.color_count,
        Percentage:
          item.TechColor.toLowerCase() === "grey"
            ? "Not Applicable"
            : `${item.percentage.toFixed(2)}%`,
      }));

      if (techStats.length > 0) {
        const techBlack = techStats.find(
          (i: any) => i.TechColor.toLowerCase() === "black"
        );
        const grandTotal = techStats[0].grand_total;
        formattedTech.push({
          Category: "Total",
          AbsoluteNo: grandTotal,
          Percentage: "100%",
        });
        if (techBlack) {
          const techAvailability =
            ((grandTotal - techBlack.color_count) / grandTotal) * 100;

          formattedTech.push({
            Category: "Availability",
            AbsoluteNo: "-",
            Percentage: `${techAvailability.toFixed(2)}%`,
          });
        }
      }

      const formattedEco = ecoStats.map((item: any) => ({
        Category: item.EcoColor,
        AbsoluteNo: item.color_count,
        Percentage:
          item.EcoColor.toLowerCase() === "grey"
            ? "Not Applicable"
            : `${item.percentage.toFixed(2)}%`,
      }));

      if (ecoStats.length > 0) {
        const ecoBlack = ecoStats.find(
          (i: any) => i.EcoColor.toLowerCase() === "black"
        );
        const grandTotal = ecoStats[0].grand_total;
        formattedEco.push({
          Category: "Total",
          AbsoluteNo: grandTotal,
          Percentage: "100%",
        });

        if (ecoBlack) {
          const ecoAvailability =
            ((grandTotal - ecoBlack.color_count) / grandTotal) * 100;

          formattedEco.push({
            Category: "Availability",
            AbsoluteNo: "-",
            Percentage: `${ecoAvailability.toFixed(2)}%`,
          });
        }
      }

      setTechSummaryData(formattedTech);
      setEcoSummaryData(formattedEco);
    } catch (err: any) {
      notifyError("Error loading summary");
    } finally {
      toast.dismiss(loaderId);
    }
  };

  const getDataEco = async (
    filter: any,
    pageNumber: number,
    pageSize?: number,
    toggleOverride?: "norm" | "virtualnorm"
  ) => {
    const payload = {
      id: 0,
      name: "eco",
      fields: [],
      filters: filter,
      paginationParameter: {
        pageNumber: pageNumber,
        recordsPerPage: pageSize || userPageSizeEco,
      },
      ISExport: "0",
      activeTab: toggleOverride ?? activeTab,
    };
    const loaderId = notifyLoader("Loading data");
    try {
      const data = await getARData(payload);
      console.log("data Eco::", data);
      setEcoRowData(mapARRowData(data.data.data.eco));
    } catch (err: any) {
      notifyError(err);
      setTechRowData([]);
      setEcoRowData([]);
    } finally {
      toast.dismiss(loaderId);
    }
  };

  const getData = async (
    filter: any,
    pageNumber: number,
    toggleOverride?: "norm" | "virtualnorm"
  ) => {
    const payload = {
      id: 0,
      name: "both",
      fields: [],
      filters: filter,
      paginationParameter: {
        pageNumber: pageNumber,
        recordsPerPage: RowsPerPageCurrTab,
      },
      ISExport: "0",
      activeTab: toggleOverride ?? activeTab,
    };
    const loaderId = notifyLoader("Loading data");
    try {
      const data = await getARData(payload);
      console.log("data for Both Eco and Tech::", data);
      setEcoRowData(mapARRowData(data.data.data.eco));
      setTechRowData(mapARRowData(data.data.data.tech));
    } catch (err: any) {
      notifyError(err);
      setTechRowData([]);
      setEcoRowData([]);
    } finally {
      toast.dismiss(loaderId);
    }
  };

  const getPreparedFilter = (filter: BPRFilterState): BPRFilterState => {
    const doesCategoryExist =
      filter.availabilityFilter.filters.length > 0 &&
      filter.availabilityFilter.filters.some((f) => f.name === "AF8");
    const tempFilter = _.cloneDeep(filter);
    if (doesCategoryExist) {
      tempFilter.availabilityFilter.filters =
        tempFilter.availabilityFilter.filters.map((f) => {
          if (f.name === "AF8") {
            return {
              ...f,
              value: BTRCategoryTextToNumberMapper[f.value] ?? f.value,
            };
          }
          return f;
        });
    }
    return tempFilter;
  };

  const onApplyFilter = async (filter: BPRFilterState) => {
    setCurrFilter(filter);
    setCurrentPageTech(1);
    setCurrentPageEco(1);
    setCurrentPageTechForBoth(1);
    setCurrentPageEcoForBoth(1);
    const tempFilter = getPreparedFilter(filter);

    if (currentTab?.value === "summary") {
      getSummaryData(tempFilter, 1);
    } else {
      const payload = {
        id: 0,
        name: "",
        fields: [],
        filters: tempFilter,
        paginationParameter: {
          pageNumber: 1,
          recordsPerPage: RowsPerPageCurrTab,
        },
      };

      getARDataCount(payload);
      if (currentTab?.value === "on-hand") getDataTech(tempFilter, 1);
      else if (currentTab?.value === "pipeline") getDataEco(tempFilter, 1);
      else getData(tempFilter, 1);
    }

    getBPRUiConfig();
    getUserColumnConfig();
  };

  const onDeleteFilter = async (parentId: any, filterId: any, value: any) => {
    const updatedFilter = onDelete(parentId, filterId, value);
    onApplyFilter(updatedFilter);
  };

  const toggleVerticalView = (isVertical: boolean) =>
    setVerticalView(isVertical);

  const toggleCurrentTab = (tab: VFFloatingTabItemProps) => setCurrentTab(tab);

  const CustomHeader = {
    Category: {
      minWidth: 80,
      cellRenderer: "categoryCellRenderer",
      tooltipField: "Category",
      tooltipComponent: "categoryToolTip",
      headerComponent: 'iconHeader',
      headerComponentParams: {
          iconSrc: '/assets/img/category.svg', 
          tooltip: 'Category',
      },
    },
    Availability: {
      minWidth: 80,
      field: "Availability",
      cellRenderer: "availabilityCellRenderer",
      tooltipField: "Availability",
      tooltipComponent: "availabilityToolTip",
      headerComponent: 'iconHeader',
      headerComponentParams: {
          iconSrc: '/assets/img/availability.svg', 
          tooltip: 'Availability',
      },
    },
    aa: {
      field: "Availability",
      valueFormatter: (params: any) => {
        console.log("Availability value:", params.value);
        const val = parseFloat(params.value);
        return isNaN(val) ? "" : `${val.toFixed(2)}%`;
      },
    },
    tc: {
      headerName: "Today's Color",
      cellRenderer: "todaysColorCellRenderer",
    },
    Tags: {
      minWidth: 80,
      cellRenderer: "tagsCellRenderer",
      headerComponent: 'iconHeader',
      headerComponentParams: {
          iconSrc: '/assets/img/tag.svg', 
          tooltip: 'Tags',
      },
    },
  };

  useEffect(() => {
    if (techInternalRef && techGridState?.columns) {
      setTimeout(() => {
        const result = techInternalRef?.api.applyColumnState({
          state: techGridState.columns,
          applyOrder: true,
        });

        techInternalRef.api.sizeColumnsToFit();

        if (!result) {
          console.error("Failed to apply column state", result);
        }
      }, 2000);
    }
  }, [techInternalRef, techGridState]);

  useEffect(() => {
    if (ecoInternalRef && ecoGridState?.columns) {
      setTimeout(() => {
        const result = ecoInternalRef?.api.applyColumnState({
          state: ecoGridState.columns,
          applyOrder: true,
        });

        ecoInternalRef.api.sizeColumnsToFit();

        if (!result) {
          console.error("Failed to apply column state", result);
        }
      }, 2000);
    }
  }, [ecoInternalRef, ecoGridState]);

  const techColDefs = useMemo((): Array<ColDef> => {
    if (initialColumnState) {
      const colDefs = getColumnDefinationsMTA(initialColumnState, CustomHeader);
      colDefs.map((colDef: any) => {
        if (
          initialColumnState.find(
            (initialColumnState: any) =>
              initialColumnState.Col_Code === colDef.colId
          )
        ) {
          colDef.minWidth = 130;
        }
        return colDef;
      });

      return colDefs;
    } else return [];
  }, [techRowData, currentTab, verticalView]);

  const ecoColDefs = useMemo((): Array<ColDef> => {
    if (initialColumnState) {
      let colDefs;
      if (verticalView && currentTab.id === "2") {
        const removeCols = [
          "Category",
          "Tags",
          "SKUCode",
          "SKUDescription",
          "WHCode",
          "WHDescription",
          "Norm",
          "VirtualNorm",
        ];
        colDefs = getColumnDefinationsMTA(
          initialColumnState,
          CustomHeader,
          [],
          removeCols
        );
      } else {
        colDefs = getColumnDefinationsMTA(initialColumnState, CustomHeader);
      }
      colDefs.map((colDef: any) => {
        if (
          initialColumnState.find(
            (initialColumnState: any) =>
              initialColumnState.Col_Code === colDef.colId
          )
        ) {
          colDef.minWidth = 130;
        }
        return colDef;
      });
      return colDefs;
    } else return [];
  }, [ecoRowData, verticalView, currentTab]);

  useEffect(() => {
    if (initialColumnState) {
      getUserColumnConfig();  
      if (currentTab.id === "1") {
        getSummaryData(currFilter, 1);
      } else {
        const payload = {
          id: 0,
          name: "",
          fields: [],
          filters: currFilter,
          paginationParameter: {
            pageNumber: 1,
            recordsPerPage: RowsPerPageCurrTab,
          },
        };
        getARDataCount(payload);

        if (currentTab.id === "2" && techColDefs?.length) {
          getDataTech(currFilter, 1);
        } else if (currentTab.id === "3") {
          getDataEco(currFilter, 1);
        } else if (currentTab.id === "4") {
          getData(currFilter, 1);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (initialColumnState) {
      getUserColumnConfig();  
      if (currentTab.id === "1") {
        getSummaryData(currFilter, 1);
      } else {
        const payload = {
          id: 0,
          name: "",
          fields: [],
          filters: currFilter,
          paginationParameter: {
            pageNumber: 1,
            recordsPerPage: RowsPerPageCurrTab,
          },
        };
        getARDataCount(payload);

        if (currentTab.id === "2" && techColDefs?.length) {
          getDataTech(currFilter, 1);
        } else if (currentTab.id === "3") {
          getDataEco(currFilter, 1);
        } else if (currentTab.id === "4") {
          getData(currFilter, 1);
        }
      }
    }
  }, [currentTab]);
  useEffect(() => {
    if (initialColumnState) {
      if (currentTab.id === "2" && techColDefs.length && techInternalRef?.api) {
        setTechMasterUIConfig(techInternalRef?.api.getColumnState());
      }
    }
  }, [techInternalRef, techColDefs, currentTab]);

  useEffect(() => {
    if (currentTab.id === "4" && ecoColDefs.length && ecoInternalRef?.api) {
      setEcoMasterUIConfig(ecoInternalRef?.api.getColumnState());
    }
  }, [ecoInternalRef, ecoColDefs, currentTab]);

  const renderView = () => {
    switch (currentTab.id) {
      case "1":
        return (
          <Summary
            themeUi={themeUi}
            activeTab={activeTab}
            techTable={{
              rowData: techSummaryData,
              header: activeTab === "norm" ? "Tech Inv. Report" : "On-Hand",
              ...gridProps,
            }}
            ecoTable={{
              rowData: ecoSummaryData,
              header: activeTab === "norm" ? "Eco Inv. Report" : "In-Pipeline",

              ...gridProps,
            }}
          />
        );

      case "2":
        return (
          <>
            <p className={ARTableHeader}>
              {" "}
              {activeTab === "norm"
                ? "Tech Inv. Report"
                : "On-Hand Inventory View Trend Report"}{" "}
            </p>
            <div style={{ height: "100%" }}>
              <CustomVFTable
                height={"90%"}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                ref={techRef}
                disableZoomScaling
                columnDefs={techColDefs}
                rowData={techRowData}
                {...gridProps}
                pagination={false}
                paginationPageSize={parseInt(AR_ROWS_PER_PAGE || "100")}
                maintainColumnOrder
                onGridReady={(params) => setTechInternalRef(params)}
                onFilterChanged={() => {
                  const filterModel = techRef?.current?.api?.getFilterModel();
                  if (filterModel && Object.keys(filterModel).length > 0) {
                    setIsDisabled(false);
                  } else {
                    setIsDisabled(true);
                  }
                }}
              />
              {initialColumnState && (
                <VFPagination
                  {...techPaginationProps}
                  resetGridRef={techRef}
                  isDisabled={isDisabled}
                />
              )}
            </div>
          </>
        );
      case "3":
        return (
          <>
            <p className={ARTableHeader}>
              {" "}
              {activeTab === "norm"
                ? "Eco Inv. Report"
                : "Pipeline Inventory Trend Report"}
            </p>

            <div style={{ height: "100%" }}>
              <CustomVFTable
                height={"90%"}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                ref={ecoRef}
                disableZoomScaling
                columnDefs={ecoColDefs}
                rowData={ecoRowData}
                {...gridProps}
                pagination={false}
                paginationPageSize={parseInt(AR_ROWS_PER_PAGE || "100")}
                maintainColumnOrder
                onGridReady={(params) => setEcoInternalRef(params)}
                onFilterChanged={() => {
                  const filterModel = ecoRef?.current?.api?.getFilterModel();
                  if (filterModel && Object.keys(filterModel).length > 0) {
                    setIsDisabled(false);
                  } else {
                    setIsDisabled(true);
                  }
                }}
              />
              {initialColumnState && (
                <VFPagination
                  {...ecoPaginationProps}
                  resetGridRef={ecoRef}
                  isDisabled={isDisabled}
                />
              )}
            </div>
          </>
        );

      case "4":
        if (verticalView)
          return (
            <VerticalSplitView
              themeUi={themeUi}
              techTable={{
                columnDefs: techColDefs,
                rowData: techRowData,
                header:
                  activeTab === "norm"
                    ? "Tech Inv. Report"
                    : "On-Hand Inventory View Trend Report",
                paginationProps: techPaginationPropsForBoth,
                ...gridProps,
              }}
              ecoTable={{
                columnDefs: ecoColDefs,
                paginationProps: ecoPaginationPropsForBoth,
                rowData: ecoRowData,
                header:
                  activeTab === "norm"
                    ? "Eco Inv. Report"
                    : "Pipeline Inventory Trend Report",
                ...gridProps,
              }}
              isLocked={isLockMode}
              toggleLockMode={toggleLockMode}
              initialColumnState={initialColumnState}
            />
          );

        return (
          <HorizontalSplitView
            themeUi={themeUi}
            techTable={{
              columnDefs: techColDefs,
              rowData: techRowData,
              header: "On-Hand Inventory View Trend Report",
              paginationProps: techPaginationPropsForBoth,
              ...gridProps,
            }}
            ecoTable={{
              columnDefs: ecoColDefs,
              rowData: ecoRowData,
              header: "Pipeline Inventory Trend Report",
              paginationProps: ecoPaginationPropsForBoth,
              ...gridProps,
            }}
            isLocked={isLockMode}
            toggleLockMode={toggleLockMode}
            initialColumnState={initialColumnState}
          />
        );
      default:
        return <CustomVFTable columnDefs={[]} rowData={[]} {...gridProps} />;
    }
  };

  const onExportToExcelCallBack = async (
    pageNumber: number,
    page: string,
    toggleOverride?: "norm" | "virtualnorm"
  ) => {
    const tempFilter = getPreparedFilter(currFilter);
    const headersData =
      page === "on-hand"
        ? techRef?.current?.api?.getColumnState() || []
        : ecoRef?.current?.api?.getColumnState() || [];
    const colDefs = page === "on-hand" ? techColDefs : ecoColDefs;
    const colMap = new Map(
      colDefs.map((col: any) => [col.colId, col.headerName])
    );
    const resultArray = headersData
      .filter(
        (col: any) => colMap.has(col.colId) && col.colId !== "dailydatagraph"
      )
      .map((col: any) => ({
        Field: col.colId,
        HeaderName: colMap.get(col.colId),
      }));

    const payload = {
      Headers: resultArray,
      id: 0,
      name: page === "on-hand" ? "tech" : "eco",
      fields: [],
      filters: tempFilter,
      paginationParameter: {
        pageNumber: pageNumber,
      },
      ISExport: "1",
      reportName: "AR",
      stream: 1,
      responseType: `arraybuffer`,
      activeTab: toggleOverride ?? activeTab,
    };
    notifyLoader("Downloading Data...");
    try {
      let filename = "";
      if (page === "on-hand") {
        filename = "On_Hand_Inventory";
      } else {
        filename = "Pipeline_Inventory";
      }
      await CsvExportMTA(payload, filename);
      notifySuccess(`Data Exported Successfully`);
    } catch (error) {
      console.log(error);
      notifyError("Error Exporting Excel");
    }
  };

  return {
    ecoRef,
    techRef,
    tempRef,
    currentTab,
    verticalView,
    isLoading:
      isLoading ||
      isARCountLoading ||
      isUIConfigLoading ||
      isSavedDataLoading ||
      isARSummaryLoading,
    isError,
    techColDefs,
    techTotalRows,
    toggleVerticalView,
    toggleCurrentTab,
    renderView,
    onExportToExcelCallBack,
    tempDownloadData,
    isLockMode,
    toggleLockMode,
    setTempDownloadData,
    tempAgGridProps,
    exportExcelRowData,
    setExportExcelRowData,
    exportExcelColumns,
    setExportExcelColumns,
    currFilter,
    themeUi,
    setCurrFilter,
    onDeleteFilter,
    onApplyFilter,
    horizon,
    ecoColDefs,
    setHorizon,
    lastRunDate,
    onResetCallback,
    onTabChange,
    activeTab,
    tabs,
  };
};

export default useAR;
