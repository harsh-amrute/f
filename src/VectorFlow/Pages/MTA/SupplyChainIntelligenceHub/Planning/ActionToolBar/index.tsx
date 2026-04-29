import VFButton from "../../../../../../components/VectorFLOW/commons/VFButton";
import VFFloatingTab from "../../../../../../components/VectorFLOW/commons/VFFloatingTab";
import VFSelectedFilters from "../../../../../../components/VectorFLOW/commons/VFSelectedFilters";
import { useState, useMemo, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import useSaveAllState from "../../../../../../hooks/useSaveAllState";
import Tooltip from "../../../../../../../src/VectorFlow/Pages/MTO/Common/Tooltip";
import {
  SCTaskBarContainer,
  SCGoBackContainer,
  SCGoBackText,
  SCViewContainer,
  SCViewBackground,
  SCVerticalDivider,
  SCViewImage,
  SCCustomActionsContainer,
  SCViewContainerWithBg,
  SCTaskFilterContainer,
  LastRunDateHeader,
} from "./styles.css";
import { useUserData } from "../../../../../../context/UserDataContext";
// import { DBMApplyNormChange } from "../../../DBM/DBMNormSuggestions/applyNormButton";
import { PlanningCounts } from "../../../../../../VectorFlow/types/MTA";
import VFButtonOutline from "../../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { GridStateContext } from "../../../../../../context/GridStateContext";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PLANNING_DATA } from "../../../../../../redux/actions/MTA";
import { RootState } from "../../../../../../redux/store/store";
import useGetLocation from "../../../../../../hooks/useGetLocation";
import { skeleton } from "../../../../../../components/commons/styled/index.css";
import ConfirmationDataModal from "../../../DBM/DBMNormSuggestions/ConfirmationModal";
import MTAVFMultiFilter from "../../../Common/MTAVFMultiFilter";
import { UIColumnConfigName } from "../../../../../../helpers/Enum";
import { notifyError } from "../../../../../../../src/helpers/notify";

interface ActionToolBarProps {
  view: string;
  currentTab: string;
  setCurrentTab: any;
  currCategory?: any;
  tabsList: Array<{ id: string; label: string; value: string }>;
  onFloatingTabChange: (tab: any) => void;
  onGoBack: () => void;
  onViewChange: (view: string) => void;
  disableChartAndGridViewToggle?: boolean;
  showAllTick?: any;
  handleGoButton?: any;
  handleGoButtonForSleep?: any;
  onChangeHorizon?: (value: number) => void;
  onApplyFilter?: (params: any) => void;
  planningCount?: PlanningCounts;
  genericRecordCount: number;
  onExportToExcelCallBack: any;
  multiFilter: any;
  setMultiFilter: any;
  onDelete: any;
  horizon?: number;
  onUpdateInsight?: () => void;
  hideUpdateInsightsBtn?: boolean;
  onSubmitEditedRows?: () => void;
  disableSubmitEditedRowsBtn?: boolean;
  lastRunDate?: string;
  isPlanning?: boolean;
  generalFilterOptions?: any;
  onTabChange?: (val: 'norm' | 'virtualnorm') => void;
  generalFilterOptions?: any;
  onTabChange?: (val: 'norm' | 'virtualnorm') => void;
  activeTab?: 'norm' | 'virtualnorm';
}

const ActionToolBar = ({
  view,
  currentTab,
  tabsList,
  onFloatingTabChange,
  onGoBack,
  onViewChange,
  currCategory,
  disableChartAndGridViewToggle,
  planningCount,
  showAllTick,
  handleGoButton,
  handleGoButtonForSleep,
  genericRecordCount,
  onExportToExcelCallBack,
  onApplyFilter,
  multiFilter,
  setMultiFilter,
  onDelete,
  horizon = 0,
  onUpdateInsight,
  hideUpdateInsightsBtn,
  onSubmitEditedRows,
  disableSubmitEditedRowsBtn,
  lastRunDate,
  isPlanning,
  onChangeHorizon,
  generalFilterOptions,
  onTabChange,
  activeTab,
}: ActionToolBarProps) => {
  const { user } = useUserData();
  const { ref } = useContext(GridStateContext);

  const { locations } = useGetLocation();
  // const {state:multiFilter,setState:setMultiFilter,onDelete} = useBPRFilter()
  const { onSaveState, onResetAllState, onExportToExcelOld } =
    useSaveAllState(isPlanning);
  const { currentCategory } = useSelector(
    (state: RootState) => state.mta.planning
  );
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const themeUi = user?.user?.theme_ui;
  const [isFilterOpen, toggleFilter] = useState<boolean>(false);
  const [isFilterButtonVisible, setIsFilterButtonVisible] =
    useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<
    null | "norm" | "sleep"
  >(null);
  const closeModal = () => setIsConfirmationModalOpen(null);
  const handleFailure = () => {
    closeModal();
  };
  const handleApplyFilter = (params: any) => {
    if (onApplyFilter) onApplyFilter(params);
    toggleFilter(false);
  };

  const getTotalFilterCount = (multiFilter: any) => {
    let total = 0;
    for (const key in multiFilter) {
      if (multiFilter[key]?.filters) {
        total += multiFilter[key].filters.length;
      }
    }
    return total;
  };
  const handleResetAllState = () => {
    onResetAllState(`${currCategory}${currentTab}`);
  };

  const [isNewFilterOpen, setIsFilterOpen] = useState(false);

  const handleApplyFilters = (filters: any) => {
    console.log("Applied filters:", filters);
    setIsFilterOpen(false);
    // You can pass these filters to your parent component or context
  };

  const handleResetFilters = () => {
    console.log("Filters reset");
    // Handle reset logic if needed beyond the modal
  };
  const [tabKey, setTabKey] = useState(0);

  useEffect(() => {
    setTabKey(prev => prev + 1);
  }, [activeTab, pathname]);

  const currentPageRecordCount = useMemo(() => {
    switch (currCategory) {
      case "GITFromParent":
        return planningCount?.parentMonitorCount;
      case "GITToChild":
        return planningCount?.childMonitorCount;
      case "ExpediteFromParent":
        return planningCount?.parentExpediteCount;
      case "ExpediteToChild":
        return planningCount?.childExpediteCount;
      case "ExcessInventory":
        return planningCount?.reviewExcessInventoryCount;
      case "OrderFulfillment":
        return planningCount?.reviewOrderFulfillmentCount;
      default:
        return genericRecordCount;
    }
  }, [currCategory, currentTab, genericRecordCount]);

  const handleExportToExcel = () => {
    if (
      pathname === "/mta/supply-chain-intelligence-hub/open-expediting-requests"
    ) {
      if (ref.current?.api?.getDisplayedRowCount() === 0) {
        notifyError("No Data to Export");
        return;
      }
      ref.current.api.exportDataAsExcel({
        fileName: "OpenExpeditingRequests",
      });
    }

    // else if(pathname  === '/supply-chain-intelligence-hub/bpr'){
    //   onExportToExcel({
    //     // pagination: { recordCount: currentPageRecordCount || 0, chunkSize: 5000 },
    //     // callBack: onExportToExcelCallBack,
    //     name:currCategory + currentTab,
    //     filters:multiFilter
    //   });
    // }
    else if (
      pathname === "/mta/insights-and-trends/buffer-trend-report" ||
      pathname === "/mta/supply-chain-intelligence-hub/bpr" ||
      pathname === "/mta/supply-chain-intelligence-hub/availability-report" ||
      pathname === "/mta/supply-chain-intelligence-hub/rrr" ||
      pathname === "/mta/supply-chain-intelligence-hub/bor" ||
      pathname === "/mta/supply-chain-intelligence-hub/bor-color-bandwise" ||
      pathname === "/mta/supply-chain-intelligence-hub/rrr-color-bandwise"
    ) {
      onExportToExcelCallBack();
    } else {
      onExportToExcelOld({
        pagination: {
          recordCount: currentPageRecordCount || 0,
          chunkSize: 5000,
        },
        callBack: onExportToExcelCallBack,
      });
    }
  };

  useEffect(() => {
    if (
      pathname !==
        "/mta/supply-chain-intelligence-hub/SupplierWiseAllocation" &&
      pathname !== "/mta/supply-chain-intelligence-hub/sdr" &&
      pathname !== "/mta/supply-chain-intelligence-hub/eo" &&
      pathname !== "/mta/supply-chain-intelligence-hub/total-requirement-report"
    ) {
      setIsFilterButtonVisible(true);
    }
    if (
      pathname === "/mta/insights-and-trends/buffer-trend-report" ||
      pathname === "/mta/insights-and-trends/buffer-trends" ||
      pathname === "/mta/supply-chain-intelligence-hub/bpr" ||
      pathname === "/mta/supply-chain-intelligence-hub/availability-report" ||
      pathname === "/mta/supply-chain-intelligence-hub/rrr" ||
      pathname === "/mta/supply-chain-intelligence-hub/rrr-color-bandwise" ||
      pathname === "/mta/supply-chain-intelligence-hub/bor" ||
      pathname === "/mta/supply-chain-intelligence-hub/bor-color-bandwise"
    ) {
      toggleFilter(true);
    }
  }, [pathname]);

  const renderFilter = () => {
    switch (currCategory) {
      case "GITFromParent":
        return (
          <MTAVFMultiFilter
            isOpen={isFilterOpen}
            onApply={handleApplyFilter}
            multiFilter={multiFilter}
            onClose={() => toggleFilter(false)}
            onReset={handleResetFilters}
          />
        );
      case "GITToChild":
        return (
          <MTAVFMultiFilter
            isOpen={isFilterOpen}
            onApply={handleApplyFilter}
            multiFilter={multiFilter}
            onClose={() => toggleFilter(false)}
            onReset={handleResetFilters}
          />
        );
      case "ExpediteFromParent":
        return (
          <MTAVFMultiFilter
            isOpen={isFilterOpen}
            onApply={handleApplyFilter}
            multiFilter={multiFilter}
            onClose={() => toggleFilter(false)}
            onReset={handleResetFilters}
          />
        );
      case "ExpediteToChild":
        return (
          <MTAVFMultiFilter
            isOpen={isFilterOpen}
            onApply={handleApplyFilter}
            multiFilter={multiFilter}
            onClose={() => toggleFilter(false)}
            onReset={handleResetFilters}
          />
        );
      case "ExcessInventory":
        return (
          <MTAVFMultiFilter
            isOpen={isFilterOpen}
            onApply={handleApplyFilter}
            multiFilter={multiFilter}
            onClose={() => toggleFilter(false)}
            onReset={handleResetFilters}
          />
        );
      case "OrderFulfillment":
        return (
          <MTAVFMultiFilter
            isOpen={isFilterOpen}
            onApply={handleApplyFilter}
            multiFilter={multiFilter}
            onClose={() => toggleFilter(false)}
            onReset={handleResetFilters}
            reportType="OrderFulfillment"
          />
        );
      case "BPR":
        if (pathname === "/mta/supply-chain-intelligence-hub/bpr") {
          return (
            <MTAVFMultiFilter
              key={activeTab}
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
              currCategory={currCategory}
              reportName={UIColumnConfigName.BPR}
              activeTab={activeTab}
            />
          );
        }
        break;
      case "RRR":
        if (pathname === "/mta/supply-chain-intelligence-hub/rrr") {
          return (
            <MTAVFMultiFilter
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
              currCategory={currCategory}
              reportName={UIColumnConfigName.RRR}
            />
          );
        }
        break;
      case "RRRColorBandwise":
        if (
          pathname === "/mta/supply-chain-intelligence-hub/rrr-color-bandwise"
        ) {
          return (
            <MTAVFMultiFilter
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
              reportName={UIColumnConfigName.RRR_OA}
            />
          );
        }
        break;
      // case "SDR":
      //   if (pathname === "/supply-chain-intelligence-hub/sdr") {
      //     return (
      //       <VFMultiFilter
      //       isFilterOpen={isFilterOpen}
      //         onApplyFilter={handleApplyFilter}
      //         onGoBack={() => toggleFilter(false)}
      //         multiFilter={multiFilter}
      //         setMultiFilter={setMultiFilter}
      //         productFilterActive={true}
      //         locationFilterActive={true}
      //         generalFilterActive={false}
      //         generalFilterOptions={generalFilterOptions}
      //         availabilityFilterActive={true}
      //         supplyChainNodeFilterActive={true}
      //         supplyChainForLocationCheckBoxList={
      //           locations
      //         }
      //         supplyChainForChildrenOfCheckBoxList={locations.filter(
      //           (m:any) => ['plant', 'CWH', 'RWH'].includes(m.id)
      //         )}
      //       />
      //     );
      //   }
      //   break;
      case "BOR":
        if (pathname === "/mta/supply-chain-intelligence-hub/bor") {
          return (
            <MTAVFMultiFilter
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
              currCategory={currCategory}
              reportName={UIColumnConfigName.BOR}
            />
          );
        }
        break;
      case "BORColorBandwise":
        if (
          pathname === "/mta/supply-chain-intelligence-hub/bor-color-bandwise"
        ) {
          return (
            <MTAVFMultiFilter
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
              reportName={UIColumnConfigName.BOR_OA}
            />
          );
        }
        break;

      case "OrderAllocationReport":
        if (
          pathname ===
          "/mta/supply-chain-intelligence-hub/order-allocation-report"
        ) {
          return (
            <MTAVFMultiFilter
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
              reportName={UIColumnConfigName.OAR}
            />
          );
        }
        break;
      case "BTR":
        if (
          pathname === "/mta/insights-and-trends/buffer-trend-report" &&
          onChangeHorizon
        ) {
          return (
            <MTAVFMultiFilter
              key={activeTab}
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
              currentTab={currentTab}
              reportName={UIColumnConfigName.BuffertrendReport}
              activeTab={activeTab}
            />
          );
        }
        break;
      case "BufferTrend":
        if (pathname === "/mta/insights-and-trends/buffer-trends") {
          return (
            <MTAVFMultiFilter
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
            />
          );
        }
        break;
      case "ResearchInsight":
        if (pathname === "/mta/insights-and-trends/research-insights") {
          return (
            <MTAVFMultiFilter
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
            />
          );
        }
        break;
      case "GuidedInsight":
        if (pathname === "/mta/insights-and-trends/guided-insights") {
          return (
            <MTAVFMultiFilter
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
            />
          );
        }
        break;
      case "DBMNorm":
        if (pathname === "/mta/dbm/dbm-norm-suggestions") {
          return (
            <MTAVFMultiFilter
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
              reportName={UIColumnConfigName.DBM}
            />
          );
        }
        break;
      case "OpenExpeditingRequests":
        if (
          pathname ===
          "/mta/supply-chain-intelligence-hub/open-expediting-requests"
        ) {
          return (
            <MTAVFMultiFilter
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
              reportName={UIColumnConfigName.OER}
            />
          );
        }
        break;
      case "InTransitWhereabouts":
        if (pathname === "/mta/logistics/intransit-whereabouts") {
          return (
            <MTAVFMultiFilter
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
            />
          );
        }
        break;
      case "chronicunavailability":
        return (
          <MTAVFMultiFilter
            isOpen={isFilterOpen}
            onApply={handleApplyFilter}
            multiFilter={multiFilter}
            onClose={() => toggleFilter(false)}
            onReset={handleResetFilters}
          />
        );
        case "AvailabilityReport":
          if (
            pathname === "/mta/supply-chain-intelligence-hub/availability-report" &&
            onChangeHorizon
          ) {
            return (
              <MTAVFMultiFilter
                isOpen={isFilterOpen}
                onApply={handleApplyFilter}
                multiFilter={multiFilter}
                onClose={() => toggleFilter(false)}
                onReset={handleResetFilters}
                currentTab={currentTab}
                reportName={UIColumnConfigName.AvailabilityReport}
              />
            );
          }
        break;
      default:
        <></>;
    }
  };

  const handleGIExportExcel = () => {
    if (ref.current?.api?.getDisplayedRowCount() === 0) {
      notifyError("No Data to Export");
      return;
    }
    ref?.current?.api?.exportDataAsExcel({
      fileName: "ChronicUnavailabilityexport.xlsx",
    });
  };

  const renderFloatingTab = () => {
    return (
        <div
        style={{
          flex: '0 0 auto',
        }}
      >
        <VFFloatingTab
          tabs={tabsList}
          defaultTab={
            tabsList.findIndex((object) => {
              return object.value === currentTab;
            }) == -1
              ? 0
              : tabsList.findIndex((object) => {
                  return object.value === currentTab;
                })
          }
          handleClick={onFloatingTabChange}
        />
      </div>
    );
  };
  return (
    <>
      {view === "chart" && (
        <div className={SCTaskBarContainer}>
          {currCategory === "GuidedInsight" ? null : (
            <div className={SCGoBackContainer} onClick={onGoBack}>
              <img src="/assets/img/VectorFLOW/BPR/goback.svg" alt="" />
              <div className={SCGoBackText}>
                <b>Go Back</b>
              </div>
            </div>
          )}

          <div
            className={SCTaskFilterContainer}
            style={{
              maxWidth: currCategory === "GuidedInsight" ? '100%' : '80%',
              width: currCategory === "GuidedInsight" ? '100%' : 'unset',
              justifyContent: currCategory === "GuidedInsight" ? 'flex-start' : 'unset',
              marginLeft: '10px',
              flexWrap: 'wrap',
              display: 'flex',
              alignItems: 'flex-start',
              columnGap: '16px',
              rowGap: '8px',
            }}
          >
            {tabsList.length > 0 && renderFloatingTab()}

            {currCategory === "GuidedInsight" && (
              <div 
                style={{
                  marginLeft: '12px',
                  flex: '1 1 320px',
                  minWidth: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <VFSelectedFilters
                  filters={multiFilter}
                  onRemoveFilter={onDelete}
                />
              </div>
            )}
          </div>

          <div className={SCCustomActionsContainer}>
            {/* currentTab === "chronicunavailability" || || currentTab==="dbmnormsuggestions" || currentTab === "excessinventorytrend" */}
            {(currentTab === "availabilitytrend" ||
              currentTab === "availabilityageingtrend") && (
              <>
                <VFButton
                  onClick={() => toggleFilter(true)}
                  themeUi={themeUi}
                  disabled={false}
                >
                  {getTotalFilterCount(multiFilter) > 0
                    ? "Edit Filter"
                    : "Add Filter"}
                </VFButton>
                {isFilterOpen && renderFilter()}
              </>
            )}
            {currentTab === "dbmnormsuggestions" && (
              <>
                <Link
                  to="/mta/dbm/dbm-norm-suggestions"
                  style={{ textDecoration: "none" }}
                >
                  <VFButtonOutline
                    onClick={() => toggleFilter(true)}
                    themeUi={themeUi}
                    width={140}
                    disabled={false}
                    color={themeUi === "REGALBLAZE" ? "#FCA311" : "#bc3d81"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "5px",
                      paddingLeft: "12px",
                      paddingRight: "13px",
                    }}
                  >
                    <img
                      src={
                        themeUi === "REGALBLAZE"
                          ? "/assets/img/VectorFLOW/BPR/NormAction-regal.svg"
                          : "/assets/img/VectorFLOW/BPR/NormAction.svg"
                      }
                    ></img>
                    Norm Action
                  </VFButtonOutline>
                </Link>
                {/* <SCVerticalDivider/> */}
              </>
            )}

            {currentTab === "custom" && (
              <>
                <div
                  className={SCViewContainerWithBg}
                  onClick={() =>
                    ref.current.api.exportDataAsExcel({
                      fileName: `${currentCategory}${currentTab}`,
                    })
                  }
                >
                  <img
                    className={SCViewImage}
                    src={
                      themeUi === "REGALBLAZE"
                        ? "/assets/img/VectorFLOW/BPR/excel-regal.svg"
                        : "/assets/img/VectorFLOW/BPR/excel.svg"
                    }
                    alt=""
                  />
                  <p>Excel Export</p>
                </div>
                <div className={SCVerticalDivider} />
              </>
            )}
            {
              // ( currentTab==="availabilitytrend" || currentTab==="availabilityageingtrend" || currentTab==="dbmnormsuggestions"  || currentTab==='custom' ) &&
              currentTab === "custom" && (
                <>
                  <div
                    className={SCViewContainerWithBg}
                    onClick={() => onSaveState(`${currCategory}${currentTab}`)}
                  >
                    <img
                      className={SCViewImage}
                      src={
                        themeUi === "REGALBLAZE"
                          ? "/assets/img/VectorFLOW/BPR/diskette-regal.svg"
                          : "/assets/img/VectorFLOW/BPR/diskette.svg"
                      }
                      alt=""
                    />
                    <p>Save Layout</p>
                  </div>
                  <div
                    className={SCViewContainerWithBg}
                    onClick={() => handleResetAllState()}
                  >
                    <img
                      className={SCViewImage}
                      src={
                        themeUi === "REGALBLAZE"
                          ? "/assets/img/VectorFLOW/BPR/refresh-regal.svg"
                          : "/assets/img/VectorFLOW/BPR/refresh.svg"
                      }
                      alt=""
                    />
                    <p>Reset Layout</p>
                  </div>
                  {!disableChartAndGridViewToggle && (
                    <div className={SCVerticalDivider} />
                  )}
                </>
              )
            }

            {!disableChartAndGridViewToggle && (
              <>
                {/* <SCVerticalDivider/> */}
                <div className={SCViewBackground}>
                  <div className={SCViewContainer}>
                    <img
                      className={SCViewImage}
                      src={
                        themeUi === "REGALBLAZE"
                          ? "/assets/img/VectorFLOW/BPR/chart-view-regal.svg"
                          : "/assets/img/VectorFLOW/BPR/chart-view-pink.svg"
                      }
                      alt=""
                    />
                    <p
                      style={{
                        color: themeUi === "REGALBLAZE" ? "#FCA311" : "#bc3d81",
                      }}
                    >
                      Chart View
                    </p>
                  </div>
                  <div>
                    <div className={SCVerticalDivider} />
                  </div>
                  <div
                    className={SCViewContainer}
                    onClick={() => {
                      onViewChange("grid");
                      dispatch(
                        UPDATE_PLANNING_DATA({
                          currentTab,
                          currentCategory,
                          currentView: "grid",
                        })
                      );
                    }}
                  >
                    <img
                      className={SCViewImage}
                      src="/assets/img/VectorFLOW/BPR/grid-view-grey.svg"
                      alt=""
                    />

                    <p style={{ color: "#b0acac" }}>Grid View</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {view === "grid" && (
        <div className={SCTaskBarContainer}>
          <div
            className={SCTaskFilterContainer}
            style={{
              maxWidth: currCategory === "GuidedInsight" ? "100%" : "50%",
              width: currCategory === "GuidedInsight" ? "100%" : "unset",
              justifyContent:
                currCategory === "GuidedInsight" ? "flex-start" : "unset",
            }}
          >
            {currCategory === "GITFromParent" ||
            currCategory === "GITToChild" ||
            currCategory === "ExpediteFromParent" ||
            currCategory === "ExpediteToChild" ||
            currCategory === "ExcessInventory" ||
            currCategory === "OrderFulfillment" ? (
              <div className={SCGoBackContainer} onClick={onGoBack}>
                <img
                  src="/assets/img/VectorFLOW/BPR/goback.svg"
                  alt=""
                  onClick={onGoBack}
                />
                <div className={SCGoBackText}>
                  <b>Go Back</b>
                </div>
              </div>
            ) : null}

            {currCategory === "DBMNorm" && (
              <VFButton
                onClick={() => setIsConfirmationModalOpen("norm")}
                themeUi={themeUi}
              >
                Norm Changes
              </VFButton>
            )}

            {currCategory === "DBMNorm" && (
              <VFButton
                onClick={() => setIsConfirmationModalOpen("sleep")}
                themeUi={themeUi}
              >
                Sleep
              </VFButton>
            )}

            {isConfirmationModalOpen === "norm" && (
              <ConfirmationDataModal
                mode={isConfirmationModalOpen}
                onSuccess={handleGoButton}
                onFailure={handleFailure}
                onCloseModal={closeModal}
              />
            )}

            {isConfirmationModalOpen === "sleep" && (
              <ConfirmationDataModal
                mode={isConfirmationModalOpen}
                onSuccess={handleGoButtonForSleep}
                onFailure={handleFailure}
                onCloseModal={closeModal}
              />
            )}

            {/* (currCategory === 'GuidedInsight' && view!=='grid') :null ?
            <VFSelectedFilters filters={multiFilter} onRemoveFilter={onDelete}></VFSelectedFilters> */}
            {/* }
            {/* {tabsList.length > 0 && renderFloatingTab()} */}

            {tabsList.length > 0 && renderFloatingTab()}
            {/* {onSubmitEditedRows && (
                                 <VFButtonOutline disabled={disableSubmitEditedRowsBtn} themeUi={themeUi} width={169} style={{fontSize:'20px', fontWeight:'500'}} onClick={onSubmitEditedRows}>Save  Changes</VFButtonOutline> 
                            )} */}

            {currCategory === "GuidedInsight" && view === "grid" ? (
              <div style={{ marginRight: "60px", maxWidth: "400px" }}>
                <VFSelectedFilters
                  filters={multiFilter}
                  onRemoveFilter={onDelete}
                ></VFSelectedFilters>
              </div>
            ) : (currCategory === "GuidedInsight" && view !== "grid") ||
              currCategory === "ResearchInsight" ? null : (
              <VFSelectedFilters
                filters={multiFilter}
                onRemoveFilter={onDelete}
              ></VFSelectedFilters>
            )}

            {/* {currCategory === "BPR" && onSubmitEditedRows && (
              <VFButtonOutline
                onClick={onSubmitEditedRows}
                themeUi={themeUi}
                disabled={disableSubmitEditedRowsBtn}
              >
                Save Remarks
              </VFButtonOutline>
            )} */}

            {/* {(currCategory === "BPR" || currCategory === "BOR" || currCategory === "BORColorBandwise") && onSubmitEditedRows && (
              <VFButtonOutline
                onClick={onSubmitEditedRows}
                themeUi={themeUi}
                disabled={disableSubmitEditedRowsBtn}
              >
                Save Remarks
              </VFButtonOutline>
            )} */}

            {currCategory === "ResearchInsight" && (
              <>
                {!hideUpdateInsightsBtn && (
                  <VFButtonOutline
                    themeUi={themeUi}
                    width={169}
                    style={{ fontSize: "20px", fontWeight: "500" }}
                    onClick={() => (onUpdateInsight ? onUpdateInsight() : {})}
                  >
                    Update Insight
                  </VFButtonOutline>
                )}
                <VFSelectedFilters
                  filters={multiFilter}
                  onRemoveFilter={onDelete}
                  style={{ maxWidth: "700px" }}
                ></VFSelectedFilters>
              </>
            )}
          </div>
          {/* {(currCategory==='BPR' && lastRunDate) && (
            lastRunDate === "Loading"?(
              <div className={skeleton}  style={{height:30,width:150}}/>
            ):(
              <LastRunDateHeader>{lastRunDate}</LastRunDateHeader>
            )
          )} */}
          <div className={SCCustomActionsContainer}>
            {(pathname === "/mta/supply-chain-intelligence-hub/bpr" || pathname === "/mta/supply-chain-intelligence-hub/availability-report") && (
            {(pathname === "/mta/supply-chain-intelligence-hub/bpr" || pathname === "/mta/insights-and-trends/buffer-trend-report") && (
              <div style={{ zoom: 0.9, marginRight: "20px" }}>
                <VFFloatingTab
                  key={tabKey}
                  handleClick={(e: any) => {
                    if (onTabChange) onTabChange(e.value ?? e);
                  }}
                  defaultTab={[
                    { value: "virtualnorm" },
                    { value: "norm" },
                  ].findIndex((t) => t.value === (activeTab ?? "virtualnorm"))}
                  tabs={[
                    { id: "main-tab-1", value: "virtualnorm", label: "Virtual Norm" },
                    { id: "main-tab-2", value: "norm", label: "Norm" },
                  ]}
                />
              </div>
            )}
            {pathname !=
              "/mta/supply-chain-intelligence-hub/SupplierWiseAllocation" &&
              pathname != "/mta/supply-chain-intelligence-hub/sdr" &&
              pathname !==
                "/mta/supply-chain-intelligence-hub/total-requirement-report" &&
              pathname != "/mta/supply-chain-intelligence-hub/eo" &&
              currentTab !== "custom" && (
                <>
                  <VFButton
                    onClick={() => toggleFilter(true)}
                    themeUi={themeUi}
                    disabled={false}
                  >
                    {getTotalFilterCount(multiFilter) > 0
                      ? "Edit Filter"
                      : "Add Filter"}
                  </VFButton>
                  {isFilterOpen && renderFilter()}
                </>
              )}

            {/* <VFButton themeUi={themeUi} onClick={()=>console.log("test")}>   Edit Filter</VFButton> */}

            {currCategory === "BufferTrend" ? null : (
              <>
                {currCategory === "GuidedInsightchronicunavailability" ||
                ((currCategory === "BTR" || currCategory === "AvailabilityReport") && (currentTab === "both" || currentTab === "summary")) ? null : (
                  <>
                    {isFilterButtonVisible && (
                      <div className={SCVerticalDivider} />
                    )}
                    {/* <SCViewContainerWithBg onClick={handleExportToExcel}> */}
                    <div
                      className={SCViewContainerWithBg}
                      onClick={() => {
                        currCategory === "GuidedInsight"
                          ? handleGIExportExcel()
                          : handleExportToExcel();
                      }}
                    >
                      <>
                        <img
                          className={SCViewImage}
                          src={
                            themeUi === "REGALBLAZE"
                              ? "/assets/img/VectorFLOW/BPR/excel-regal.svg"
                              : "/assets/img/VectorFLOW/BPR/excel.svg"
                          }
                          alt=""
                        />
                        <p>
                          {currCategory === "BTR" ||
                          currCategory === "AvailabilityReport" ||
                          currCategory === "BPR" ||
                          currCategory === "RRR" ||
                          currCategory === "BOR" ||
                          currCategory === "BORColorBandwise" ||
                          currCategory === "RRRColorBandwise"
                            ? "CSV Export"
                            : "Excel Export"}
                        </p>
                      </>
                      {/* <SCViewImage src={"/assets/img/VectorFLOW/BPR/excel.svg"} alt="" onClick={onGoBack} />
                                    <p>Excel Export</p> */}
                    </div>
                  </>
                )}
                {(currCategory === "GuidedInsight" &&
                  currentTab === "chronicunavailability") ||
                ((currCategory === "BTR" || currCategory === "AvailabilityReport") && (currentTab === "both" || currentTab === "summary")) ? null : (
                  <>
                    <div className={SCVerticalDivider} />
                    <div
                      className={SCViewContainerWithBg}
                      onClick={() =>
                        onSaveState(`${currCategory}${currentTab}`)
                      }
                    >
                      <img
                        className={SCViewImage}
                        src={
                          themeUi === "REGALBLAZE"
                            ? "/assets/img/VectorFLOW/BPR/diskette-regal.svg"
                            : "/assets/img/VectorFLOW/BPR/diskette.svg"
                        }
                        alt=""
                      />
                      <p>Save Layout</p>
                    </div>
                    <div
                      className={SCViewContainerWithBg}
                      onClick={() => handleResetAllState()}
                    >
                      <img
                        className={SCViewImage}
                        src={
                          themeUi === "REGALBLAZE"
                            ? "/assets/img/VectorFLOW/BPR/refresh-regal.svg"
                            : "/assets/img/VectorFLOW/BPR/refresh.svg"
                        }
                        alt=""
                      />
                      <p>Reset Layout</p>
                    </div>
                    {/* {!disableChartAndGridViewToggle && <SCVerticalDivider/> } */}
                    {!disableChartAndGridViewToggle &&
                      (currCategory === "ExcessInventory" ||
                      currCategory === "GITToChild" ||
                      currCategory === "OrderFulfillment" ||
                      currCategory === "ExpediteToChild" ||
                      currCategory === "ExpediteFromParent" ? (
                        <div className={SCVerticalDivider} />
                      ) : null)}
                  </>
                )}
              </>
            )}

            {currCategory === "CustomScreens" ||
            currCategory === "BufferTrend" ||
            currCategory === "BPR" ||
            currCategory === "SDR" ||
            currCategory === "EO" ||
            currCategory === "RRR" ||
            currCategory === "BOR" ||
            currCategory === "BTR" ||
            currCategory === "AvailabilityReport" ||
            currCategory === "ResearchInsight" ||
            currCategory === "DBMNorm" ||
            (currCategory === "GuidedInsight" &&
              currentTab !== "chronicunavailability") ||
            currCategory === "OpenExpeditingRequests" ||
            currCategory === "InTransitWhereabouts"
              ? null
              : !disableChartAndGridViewToggle && (
                  <>
                    <div className={SCViewBackground}>
                      <div
                        className={SCViewContainer}
                        onClick={() => {
                          onViewChange("chart");
                          dispatch(
                            UPDATE_PLANNING_DATA({
                              currentTab: currentTab,
                              currentCategory: currentCategory,
                              currentView: "chart",
                            })
                          );
                        }}
                      >
                        <img
                          className={SCViewImage}
                          src={"/assets/img/VectorFLOW/BPR/chart-view-grey.svg"}
                          alt=""
                        />
                        <p style={{ color: "#b0acac" }}>Chart View</p>
                      </div>
                      <div>
                        <div className={SCVerticalDivider} />
                      </div>

                      <div className={SCViewContainer}>
                        <img
                          className={SCViewImage}
                          src={
                            themeUi === "REGALBLAZE"
                              ? "/assets/img/VectorFLOW/BPR/grid-view-regal.svg"
                              : "/assets/img/VectorFLOW/BPR/grid-view-pink.svg"
                          }
                          alt=""
                          onClick={onGoBack}
                        />
                        <p
                          style={{
                            color:
                              themeUi === "REGALBLAZE" ? "#FCA311" : "#bc3d81",
                          }}
                        >
                          Grid View
                        </p>
                      </div>
                    </div>
                  </>
                )}
          </div>
        </div>
      )}
    </>
  );
};

export default ActionToolBar;
