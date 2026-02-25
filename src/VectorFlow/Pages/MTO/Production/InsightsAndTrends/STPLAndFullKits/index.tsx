import { Allotment } from "allotment";
import { useCallback, useEffect, useState } from "react";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import STPLGraph from "./STPLGraph";
import FullKitGraph from "./FullKitGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
  Wrapper,
} from "./styles.css";
import {
  useGetSTPLAndFullKitData,
  useGetSTPLAndFullKitExcelData,
} from "../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/STPLAndFullKits";
import OverlayLoader from "../../../Common/Loader";
import { notifyError, notifySuccess } from "../../../../../../helpers/notify";
import { FilterPageName, UIGridCode } from "../../../Common/Enum";
import { useUserData } from "../../../../../../context/index";
import { useGetFilterData } from "../../../../../../VectorFlow/Services/MTO/Common/CommonFilter";
import useFilter from "../../../../../../hooks/useFilter";
import { format } from "date-fns";
import { useGetDate } from "../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/RMPMExpediting";
import CommonGridview from "../../../../../../helpers/CommonGridview";
import { formatFilterJSON } from "../../../../../../helpers/utils";

const APIFilterConfig = {
  filSecVisConfig: {
    Prod_STPL_And_FullKits: {
      mjr: false,
      or: false,
      res: true,
      cus: false,
    },
  },
};

const STPLAndFullKits = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [graphData, setGraphData] = useState<any>({});
  const [filterData, setFilterData] = useState({});

  const {
    mutateAsync: getSTPLandFullkitInDaysData,
    isLoading,
    isError,
    isSuccess,
  } = useGetSTPLAndFullKitData();

  const { mutateAsync: getSTPLandFullkitInDaysExcelData } =
    useGetSTPLAndFullKitExcelData();
  const { mutateAsync: getPageWiseFilterData } = useGetFilterData();
  const { data: apiResponseData } = useGetDate();

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  const {
    state: currFilter,
    setState: setCurrFilter,
    onFilterRemove,
    isFilterOpen,
    isMfgSelected,
    onAddFilter,
    onApplyFilter,
    toggleFilter,
    appliedFilters,
    setAppliedFilters,
  } = useFilter(
    filterData,
    APIFilterConfig.filSecVisConfig.Prod_STPL_And_FullKits
  );

  const reportName = "STPLAndFullKits";
  const lastRunDate =
    new Date(apiResponseData?.data?.data).toString() !== "Invalid Date"
      ? format(new Date(apiResponseData?.data?.data), "dd MMM yyyy")
      : "";

  const getGraphData = useCallback(async (filters: any) => {
    try {
      const formattedFilters = formatFilterJSON(filters);
      const response = await getSTPLandFullkitInDaysData({
        graphflag: 1,
        appliedFilters: formattedFilters,
      });
      setGraphData(response?.data?.data);
    } catch (e) {
      console.log(e);
      notifyError("Failed to fetch Graph data!");
    }
  }, [getSTPLandFullkitInDaysData]);

  const getFilterData = async () => {
    try {
      const response = await getPageWiseFilterData({
        page_name: FilterPageName.Prod_STPL_And_FullKits,
      });
      setFilterData(response?.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFilterData();
  }, []);

  useEffect(() => {
    if (!isGridView) {
      getGraphData(appliedFilters);
    }
  }, [appliedFilters, isGridView, getGraphData]);

  useEffect(() => {
    if (isSuccess) notifySuccess("Fetched Data successfully!");
    if (isError) notifyError("Failed to load data!");
  }, [isSuccess, isError]);

  const colDefCustomizations = {
    Plant: {
      cellRenderer: "agGroupCellRenderer",
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {isLoading && <OverlayLoader />}

      {!isGridView ? (
        // --- CHART VIEW ---
        <>
          <MTOActionToolBar
            comp={"stplAndFullKit"}
            isGridView={isGridView}
            setIsGridView={setIsGridView}
            isChartGridToggle
            isAddFilterButton
            themeUi={themeUi}
            isFilterOpen={isFilterOpen}
            onAddFilter={onAddFilter}
            toggleFilter={toggleFilter}
            onApplyFilter={onApplyFilter}
            multiFilter={currFilter}
            setMultiFilter={setCurrFilter}
            onFilterRemove={onFilterRemove}
            isMfgSelected={isMfgSelected}
          />
          <div className={HorizontalViewWrapper} style={{ flex: 1 }}>
            <div
              className={BTRTableWrapper}
              style={{
                height: "95%",
                paddingLeft: "20px",
                paddingBottom: "10px",
              }}
            >
              <Allotment vertical={false} separator={false}>
                <Allotment.Pane preferredSize="50%">
                  <div className={BTRAllomentSection}>
                    <STPLGraph
                      graphData={graphData?.stpl}
                      lastRunDate={lastRunDate}
                    />
                  </div>
                </Allotment.Pane>
                <Allotment.Pane preferredSize="50%">
                  <div className={BTRAllomentSection}>
                    <FullKitGraph
                      graphData={graphData?.fk}
                      lastRunDate={lastRunDate}
                    />
                  </div>
                </Allotment.Pane>
              </Allotment>
            </div>
          </div>
        </>
      ) : (
        // --- GRID VIEW ---
        <CommonGridview
          reportName={reportName}
          reportNameId={UIGridCode.ProdStplAndFullKit}
          gridDataLoading={isLoading}
          vfWrapperClassName={Wrapper}
          columnDefinationProps={{
            customColDef: colDefCustomizations,
          }}
          excelExportParams={{
            isExcelExportFromBackend: true,
            excelExportReportName: FilterPageName.Prod_STPL_And_FullKits,
            excelExportSheetName: FilterPageName.Prod_STPL_And_FullKits,
          }}
          setAppliedFilters={setAppliedFilters}
          setCurrentFilters={setCurrFilter}
          appliedFilters={appliedFilters}
          getRowData={(params) => {
            return getSTPLandFullkitInDaysData({
              graphflag: 0,
              page: params.page,
              page_size: params.page_size,
              appliedFilters: params.appliedFilters,
            });
          }}
          getExcelExportData={(params) => {
            return getSTPLandFullkitInDaysExcelData({
              body: params.body,
              isExcelExport: 1,
              graphflag: 0,
              report_name: FilterPageName.Prod_STPL_And_FullKits,
            });
          }}
          actionToolBarProps={{
            comp: "stplAndFullKit",
            isGridView: isGridView,
            setIsGridView: setIsGridView,
            isChartGridToggle: true,
            isAddFilterButton: true,
            isFilterOpen: isFilterOpen,
            onAddFilter: onAddFilter,
            toggleFilter: toggleFilter,
            onApplyFilter: onApplyFilter,
            multiFilter: currFilter,
            setMultiFilter: setCurrFilter,
            onFilterRemove: onFilterRemove,
            isMfgSelected: isMfgSelected,
          }}
        />
      )}
    </div>
  );
};
export default STPLAndFullKits;