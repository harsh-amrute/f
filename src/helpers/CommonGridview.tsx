import React, { useEffect, useRef, useState } from "react";
import {
  useGetUserUIConfigData,
  useUpdateUserUIConfigData,
} from "../VectorFlow/Services/MTO/Common/UserUIConfig";
import useColDef from "../hooks/useColDef";
import { notifyError, notifySuccess } from "./notify";
import { useUserData } from "../context";
import {
  DownloadExcel,
  formatFilterJSON,
  getBodyForExcelExport,
  getColumnDefinations,
} from "./utils";
import MTOActionToolBar from "../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import OverlayLoader from "../VectorFlow/Pages/MTO/Common/Loader";
import VFPagination from "../VectorFlow/Pages/MTO/Common/VFPagination";
import VFTable from "../VectorFlow/Pages/MTO/Common/VFTable";
import { pagination } from "../VectorFlow/Pages/MTO/Common/Enum";
import {
  useGetUIAndUserConfigData,
  useGetUIConfigData,
} from "../VectorFlow/Services/MTO/Common/UIConfig";
import { SCDynamicContainer } from "../VectorFlow/Pages/MTO/Common/GridView/styles";

type ExcelExportParams = {
  isExcelExportFromBackend?: boolean;
  excelExportReportName?: string;
  showBomExcelModal?: boolean;
};

type columnDefinationPropsType = {
  customColDef?: any;
  extras?: any;
};

export type getExcelExportDataArgs = {
  body: any;
  isExcelExport: number;
  report_name: string;
  isChildren?: number;
};

export type getRowDataArgs = {
  page: number;
  graphflag: number;
  appliedFilters: any;
  page_size?: number;
  isChildren?: number;
};

export type GetGridDataArgs = {
  isExcelExport?: boolean;
  page?: number;
  pageSize?: number;
  isChildren?: number;
}

type actionToolBarPropsType = {
  comp: string;
  isAddFilterButton?: boolean;
  isChartGridToggle?: boolean;
  isExcelExportIcon?: boolean;
  isGridView?: boolean;
  setIsGridView?: (val: boolean) => void;
  isGoBackButton?: boolean;
  handleGoBack?: () => void;
  isFilterOpen?: boolean;
  onAddFilter?: () => void;
  toggleFilter?: (state:boolean) => void;
  onApplyFilter?: (filter: any,selectedHeader?:any,selectedOperator?:any,selectedValue?:any) => void;
  isMfgSelected?: boolean;
  multiFilter?: any[];
  setMultiFilter?: (val: any) => void;
  onFilterRemove?: (parentId: string, filterId: any, value: any) => any;
};

type CommonGridviewProps = {
  reportName: string;
  columnDefinationProps: columnDefinationPropsType;
  excelExportParams?: ExcelExportParams;
  customGridOptions?: any;
  setAppliedFilters?: (state:any) => void;
  setCurrentFilters?: (state:any) => void;
  appliedFilters?: any;
  reportNameId?: number;
  getExcelExportData?: (args: getExcelExportDataArgs) => Promise<any>;
  getRowData: (args: getRowDataArgs) => Promise<any>;
  actionToolBarProps: actionToolBarPropsType;
  gridDataLoading: boolean;
  BomExcelExport?: React.FC<{
    onConfirm: () => void;
    onCancel: () => void;
    onClose: () => void;
    showExcelModal: boolean;
  }>;
};

/**
 * CommonGridview
 *
 * A reusable AG Grid wrapper component used to display report data with
 * pagination, filtering, column customization, and Excel export support.
 *
 * Responsibilities:
 * - Renders an AG Grid table with configurable column definitions
 * - Fetches and displays paginated row data using `getRowData`
 * - Applies and persists user-specific grid settings such as:
 *   column width, column order, column visibility, page size, and filters
 * - Allows users to save and reset grid configuration
 * - Supports both frontend and backend driven Excel export
 * - Optionally shows a confirmation modal before Excel export (BOM export)
 *
 * Usage:
 * - Provide column definitions via `columnDefinationProps`
 * - Provide a `getRowData` function to fetch grid data
 * - Optionally provide `getExcelExportData` for backend Excel export
 * - Configure toolbar behavior using `actionToolBarProps`
 *
 * @component
 *
 * @param {CommonGridviewProps} props
 *
 * @param {string} props.reportName
 * Name of the report. Used to fetch UI configuration and for Excel export naming.
 *
 * @param {columnDefinationPropsType} props.columnDefinationProps
 * Contains custom column definitions and additional column options.
 *
 * @param {ExcelExportParams} [props.excelExportParams]
 * Configuration for Excel export behavior, including backend export
 * and optional BOM confirmation modal.
 *
 * @param {any} [props.customGridOptions]
 * Additional AG Grid options passed directly to the grid.
 *
 * @param {(state: any) => void} [props.setAppliedFilters]
 * Callback used to update applied filter state.
 *
 * @param {any} [props.appliedFilters]
 * Object containing currently applied filters used while fetching grid data.
 *
 * @param {number} [props.reportNameId]
 * Unique report identifier used for saving and retrieving user UI configuration.
 *
 * @param {(args: getExcelExportDataArgs) => Promise<any>} [props.getExcelExportData]
 * Function used to fetch Excel data from backend when backend export is enabled.
 *
 * @param {(args: getRowDataArgs) => Promise<any>} props.getRowData
 * Function used to fetch paginated row data for the grid.
 *
 * @param {actionToolBarPropsType} props.actionToolBarProps
 * Configuration object controlling the grid toolbar behavior and actions.
 *
 * @param {boolean} props.gridDataLoading
 * Flag to display loader while grid data is being fetched.
 *
 * @param {React.FC} [props.BomExcelExport]
 * Optional modal component displayed before Excel export
 * when BOM export confirmation is required.
 *
 * @returns {JSX.Element}
 * A fully configured grid view with pagination, filtering,
 * column customization, and Excel export support.
 *
 *
 * ------------------------------------------------------------------
 * actionToolBarProps
 * ------------------------------------------------------------------
 *
 * Configuration object used to control the behavior and UI of the grid toolbar
 * rendered by `MTOActionToolBar`.
 *
 * Controls:
 * - Visibility of toolbar buttons (Excel, Save, Reset, Filters, Go Back, Chart toggle)
 * - Filter related actions
 * - Grid view and chart view toggling
 * - Navigation actions like Go Back
 *
 * @param {string} comp
 * Unique identifier for the grid/report.
 *
 * @param {boolean} [isAddFilterButton]
 * Shows or hides the "Add Filter" button.
 *
 * @param {boolean} [isChartGridToggle]
 * Enables toggle between Grid view and Chart view.
 *
 * @param {boolean} [isExcelExportIcon]
 * Shows or hides the Excel export icon in the toolbar.
 *
 * @param {boolean} [isGridView]
 * Indicates current view mode.
 * true  → Grid view
 * false → Chart view
 *
 * @param {(val: boolean) => void} [setIsGridView]
 * Callback to toggle between Grid and Chart views.
 *
 * @param {boolean} [isGoBackButton]
 * Shows or hides the Go Back button.
 *
 * @param {() => void} [handleGoBack]
 * Callback executed when Go Back button is clicked.
 *
 * @param {boolean} [isFilterOpen]
 * Indicates whether the filter panel is currently open.
 *
 * @param {() => void} [onAddFilter]
 * Triggered when the Add Filter button is clicked.
 *
 * @param {(state: boolean) => void} [toggleFilter]
 * Opens or closes the filter panel.
 *
 * @param {(filter: any, selectedHeader?: any, selectedOperator?: any, selectedValue?: any) => void} [onApplyFilter]
 * Called when a filter is applied from the toolbar.
 *
 * @param {boolean} [isMfgSelected]
 * Domain-specific flag used to control toolbar behavior
 * based on Manufacturing or similar selections.
 *
 * @param {any[]} [multiFilter]
 * List of currently applied filters.
 *
 * @param {(val: any) => void} [setMultiFilter]
 * Updates the multi-filter state.
 *
 * @param {(parentId: string, filterId: any, value: any) => any} [onFilterRemove]
 * Called when a filter is removed from the toolbar.
 *
 * @example
 * <CommonGridview
 *   reportName="Sample Report"
 *   columnDefinationProps={{
 *     customColDef: customDefinitions,
 *     extras: additionalOptions,
 *   }}
 *   excelExportParams={{
 *     isExcelExportFromBackend: true,
 *     excelExportReportName: "SampleReport",
 *     showBomExcelModal: true,
 *   }}
 *   getRowData={fetchRowData}
 *   getExcelExportData={fetchExcelData}
 *   actionToolBarProps={toolbarConfig}
 *   gridDataLoading={isLoading}
 * />
 */


function CommonGridview(props: CommonGridviewProps) {
  const {
    appliedFilters,
    reportName,
    columnDefinationProps,
    excelExportParams,
    customGridOptions,
    setAppliedFilters,
    getRowData,
    reportNameId,
    getExcelExportData,
    actionToolBarProps,
    gridDataLoading,
    BomExcelExport,
    setCurrentFilters
  } = props;

  const {
    mutateAsync: updateUserUIReportConfigData,
    isLoading: isUpdateUserConfig,
  } = useUpdateUserUIConfigData();

  const {
    comp,
    isAddFilterButton = false,
    isExcelExportIcon = true,
    isGoBackButton = false,
    isMfgSelected = false,
    isFilterOpen = false,
    isChartGridToggle = false,
    isGridView,
    multiFilter = [],
    handleGoBack,
    onAddFilter,
    onApplyFilter,
    onFilterRemove,
    setMultiFilter,
    toggleFilter,
    setIsGridView,
  } = actionToolBarProps;

  const { mutateAsync: getUIAndUserConfigData, isLoading: isGetUserConfig } =
    useGetUIAndUserConfigData();

  const { user } = useUserData();
  const [userPageSize, setUserPageSize] = useState<any>();
  const [rowData, setRowData] = useState([]);
  const [totalRow, setTotalRow] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [columnState, setColumnState] = useState<any>([]);
  const [isReset, setIsReset] = useState<any>(undefined);
  const [colDef, setColDef] = useState([{}]);
  const { getNewColDef, colDefMap } = useColDef();
  const [masterUIConfig, setMasterUIConfig] = useState([]);
  const [userConfigFetched, setUserConfigFetched] = useState<any>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [showExcelModal, setShowExcelModal] = useState<boolean>(false);

  const [defaultFilterState ] = useState<any>(appliedFilters || {});

  const gridRef = useRef<any>(null);

  const setColumnDef = async () => {
    try {
      const response = await getUIAndUserConfigData({
        reportName,
        userName: user.user.name,
        reportNameId,
      });
      const defaultColDef = response?.data?.data?.default_coldef;
      const userWiseConfig =
        JSON.parse(response?.data?.data?.columns_settings) || [];

      getNewColDef(response);
        setColDef(
          getColumnDefinations(
            defaultColDef,
            columnDefinationProps?.customColDef,
            columnDefinationProps?.extras
          )
        );
        if (userWiseConfig?.cs && userWiseConfig?.cs?.length > 0) {
          getUserColumnConfig(userWiseConfig);
        }
        

    } catch (e) {
      console.log(e);
    }
  };

  const getGridData = async ({
    isExcelExport = false,
    page = 1,
    pageSize,
    isChildren = 0,
  }: GetGridDataArgs) => {
    const formatedFilters = formatFilterJSON(appliedFilters);
    if (isExcelExport && getExcelExportData) {
      try {
        const headersdata = gridRef?.current?.api.getColumnState();
        const body = getBodyForExcelExport({
          headersdata,
          filterData: formatedFilters,
          colDefMap,
        });
        const response = await getExcelExportData({
          body,
          isExcelExport: 1,
          report_name: reportName,
          isChildren,
        });
        if (response.status === 200) {
          DownloadExcel(response, reportName);
          notifySuccess("Data Exported to Excel Successfully!");
        } else {
          notifyError("Failed to Export to Excel");
        }
      } catch (err) {
        console.log(err);
        notifyError("Failed to Export to Excel");
      }
    } else {
      try {
        const data = await getRowData({
          page: page || currentPage,
          graphflag: 0,
          appliedFilters: formatedFilters,
          page_size: pageSize || userPageSize,
        });
        setRowData(data?.data?.data?.results);
        setTotalRow(data?.data?.data?.count);
        notifySuccess("Data Fetched Successfully!");
      } catch (err: any) {
        console.log(err);
        notifyError("Something Went Wrong");
      }
    }
  };

  const getUserColumnConfig = (data: any) => {
    if (!data) {
      console.error("Failed to apply column state");
      return;
    }
    setUserConfigFetched(true);
    const newConfig = data;
    setUserPageSize(
      newConfig.pageSize ? Number(newConfig.pageSize) : undefined
    );
    setColumnState(newConfig.cs);
    if(setAppliedFilters && setCurrentFilters && newConfig?.fs?.filters?.length > 0) {
      
      setAppliedFilters(newConfig.fs );
      setCurrentFilters(newConfig.fs);
    }
  };

  const handleSaveClick = async (coldefs?: any, page_size?: any) => {
    try {
      let payload:any;
      const currentColumnState = gridRef?.current?.api?.getColumnState();

      if (coldefs) {
        const fullConfig = { cs: coldefs, pageSize: userPageSize, fs: [] };
        payload = {
          un: user.user.name,
          rn_id: reportNameId,
          cs: JSON.stringify(fullConfig),
        };
        setColumnState([...coldefs]);
      } else if (page_size) {
        const fullConfig = { cs: currentColumnState, pageSize: page_size, fs : appliedFilters || {} };
        payload = {
          un: user.user.name,
          rn_id: reportNameId,
          cs: JSON.stringify(fullConfig),
        };
      } else if (gridRef?.current?.api) {
        const fullConfig = { cs: currentColumnState, pageSize: userPageSize, fs: appliedFilters || {} };
        payload = {
          un: user.user.name,
          rn_id: reportNameId,
          cs: JSON.stringify(fullConfig),
        };
        
      }
      await updateUserUIReportConfigData([payload]);
      if(!coldefs){
        setColumnState(currentColumnState)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetClick = () => {
    setIsReset(true);
  };

  const handlePageChange = async (currPage: number) => {
    setCurrentPage(currPage);
    getGridData({page: currPage});
  };

  const savePageSize = (pageSize: any) => {
    if (pageSize) {
      setUserPageSize(pageSize);
      setCurrentPage(1);
      handleSaveClick(undefined, pageSize);
      getGridData({pageSize});
    } else {
      notifyError("Invalide page size");
    }
  };

  const onCancelBomExcelExportModal = ()=>{
    getGridData({isExcelExport:true});
    setShowExcelModal(false);
  }

  const onConfirmBomExcelExportModal = ()=>{
    getGridData({isExcelExport:true, isChildren: 1});
    setShowExcelModal(false);
  }

  useEffect(() => {
    if (userConfigFetched ) {
      setCurrentPage(1);
      getGridData({});
    }
  }, [userConfigFetched, appliedFilters]);

  useEffect(() => {
    if (isReset) {
      handleSaveClick(masterUIConfig);
      setIsReset(false);
      if(setAppliedFilters && setCurrentFilters){
        setAppliedFilters(defaultFilterState);
        setCurrentFilters(defaultFilterState);
       
      }
    }
  }, [isReset]);

  useEffect(() => {
    if (gridRef?.current?.api?.getColumnState) {
      setMasterUIConfig(gridRef?.current?.api.getColumnState());
    }
  }, [colDef, gridRef.current]);

  useEffect(() => {
    if (gridRef?.current && columnState?.length ) {
      try {
        const result = gridRef.current.api.applyColumnState({
          state: columnState,
          applyOrder: true,

        });

        if (!result) {
          throw new Error("Failed to apply column state");
        }

      } catch (error) {
        console.error(error);
      }
    }
  }, [gridRef.current, columnState, rowData]);

  useEffect(() => {
    setColumnDef();
  }, []);

  const excelExportFromGrid = () => {
    if (gridRef?.current?.api?.exportDataAsExcel) {
      gridRef.current.api.exportDataAsExcel();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {(isUpdateUserConfig || isGetUserConfig || gridDataLoading) && (
        <OverlayLoader />
      )}
      <MTOActionToolBar
        comp={comp}
        themeUi={user?.user?.theme_ui}
        isAddFilterButton={isAddFilterButton}
        isChartGridToggle={isChartGridToggle}
        isExcelExport={isExcelExportIcon}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        handleSaveClick={handleSaveClick}
        handleResetClick={handleResetClick}
        onExcelExportClick={
          excelExportParams?.isExcelExportFromBackend
            ? () =>{
              if(excelExportParams?.showBomExcelModal){
                setShowExcelModal(true);
              }else{
                getGridData({isExcelExport:true, isChildren: 1});
              }
            }
               
            : excelExportFromGrid
        }
        isFilterOpen={isFilterOpen}
        isGoBackButton={isGoBackButton}
        multiFilter={multiFilter}
        onAddFilter={onAddFilter}
        onApplyFilter={onApplyFilter}
        handleGoBack={handleGoBack}
        onFilterRemove={onFilterRemove}
        setMultiFilter={setMultiFilter}
        isMfgSelected={isMfgSelected}
        toggleFilter={toggleFilter}
      />

      <SCDynamicContainer className=" .ag-theme-alpine">
        <VFTable
          {...customGridOptions}
          sideBar={{
            toolPanels: ["columns"],
          }}
          key={comp}
          columnDefs={colDef}
          disableZoomScaling
          rowData={rowData || []}
          tooltipHideDelay={100000}
          tooltipShowDelay={0}
          pagination={false}
          tooltipMouseTrack={true}
          ref={gridRef}
          maintainColumnOrder={true}
          maintain
          onFilterChanged={() => {
            Object.keys(gridRef?.current?.api?.getFilterModel())?.length > 0
              ? setIsDisabled(false)
              : setIsDisabled(true);
          }}
        />
        {excelExportParams?.showBomExcelModal && BomExcelExport && (
          <BomExcelExport
            onClose={() => setShowExcelModal(false)}
            onCancel={onCancelBomExcelExportModal}
            onConfirm={onConfirmBomExcelExportModal}
            showExcelModal={showExcelModal}
          />
        )}
        <VFPagination
          selectedRows={0}
          rowsPerPage={userPageSize || pagination.mtoPageSize}
          totalRows={totalRow}
          currentPage={currentPage}
          handleChangePage={handlePageChange}
          resetGridRef={gridRef}
          isDisabled={isDisabled}
          customPageSizeEnabled={true}
          savePageSize={savePageSize}
          userPageSize={userPageSize}
        />
      </SCDynamicContainer>
    </div>
  );
}

export default CommonGridview;
