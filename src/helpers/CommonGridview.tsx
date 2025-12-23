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
  isExcelExport?: boolean;
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
 * CommonGridview is a reusable component that renders a grid view with customizable columns,
 * pagination, and Excel export functionality. It supports user-specific configurations for
 * column states and page size, and allows saving and resetting these configurations.
 *
 * @component
 * @param {CommonGridviewProps} props - The properties passed to the component.
 * @param {string} props.reportName - The name of the report to be displayed in the grid.
 * @param {columnDefinationPropsType} props.columnDefinationProps - Custom column definitions and additional options for the grid.
 * @param {ExcelExportParams} [props.excelExportParams] - Parameters for Excel export functionality.
 * @param {any} [props.customGridOptions] - Additional options for customizing the grid.
 * @param {() => void} props.setAppliedFilters - Function to set applied filters.
 * @param {any[]} props.appliedFilters - object of applied filters.
 * @param {number} [props.reportNameId] - Optional ID for the report name.
 * @param {boolean} [props.isGridView] - Flag to toggle between grid and chart views.
 * @param {(val: boolean) => void} [props.setIsGridView] - Function to set the grid view state.
 * @param {(args: { body: any; isExcelExport: number; report_name: string }) => Promise<any>} [props.getExcelExportData] -
 *        Function to fetch Excel export data.
 * @param {(args: getRowDataArgs) => Promise<any>} props.getRowData -
 *        Function to fetch row data for the grid.
 *
 * @returns {JSX.Element} A grid view component with customizable columns, pagination, and Excel export functionality.
 *
 * @example
 * <CommonGridview
 *   reportName="Sample Report"
 *   columnDefinationProps={{
 *     customColDef: customDefinitions,
 *     extras: additionalOptions,
 *   }}
 *   excelExportParams={{ isExcelExportFromBackend: true, excelExportReportName: "SampleReport" }}
 *   customGridOptions={gridOptions}
 *   setAppliedFilters={handleSetFilters}
 *   appliedFilters={filters}
 *   reportNameId={1}
 *   isGridView={true}
 *   setIsGridView={setGridView}
 *   getExcelExportData={fetchExcelData}
 *   getRowData={fetchRowData}
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
    isExcelExport = false,
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
        isExcelExport={isExcelExport}
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
