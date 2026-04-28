import {
  ARLayoutTabsWrapper,
  ARLayoutWrapper,
  ToggleViewBtnWrapper,
} from "./styles.css";
import useAR from "./useAR";
import {
  SCViewBackground,
  SCViewContainer,
  SCViewImage,
  SCVerticalDivider,
} from "../../SupplyChainIntelligenceHub/Planning/ActionToolBar/styles.css";
import { GridStateContext } from "../../../../../context/GridStateContext";
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import ActionToolBar from "../../SupplyChainIntelligenceHub/Planning/ActionToolBar";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import LastRunDateComponent from "../../../../../components/commons/lastRundate";
import OverlayLoader from "../../../../../VectorFlow/Pages/MTO/Common/Loader";
import "./style.css";

const AvailabilityReport = () => {
  const {
    currentTab,
    isLoading,
    techColDefs,
    ecoRef,
    techRef,
    techTotalRows,
    verticalView,
    toggleVerticalView,
    toggleCurrentTab,
    renderView,
    tempRef,
    onExportToExcelCallBack,
    tempDownloadData,
    setTempDownloadData,
    tempAgGridProps,
    exportExcelRowData,
    setExportExcelRowData,
    exportExcelColumns,
    setExportExcelColumns,
    currFilter,
    setCurrFilter,
    onDeleteFilter,
    onApplyFilter,
    themeUi,
    horizon,
    ecoColDefs,
    setHorizon,
    lastRunDate,
    onResetCallback,
    onTabChange,
    activeTab,
    tabs
  } = useAR();

  return (
    <GridStateContext.Provider
      value={{
        ref:
          currentTab.id === "2" ? techRef : currentTab.id === "3" ? ecoRef : "",
        exportExcelColumns: exportExcelColumns,
        setExportExcelColumns: setExportExcelColumns,
        tempDownloadData: tempDownloadData,
        setTempDownloadData: setTempDownloadData,
        exportExcelRowData: exportExcelRowData,
        setExportExcelRowData: setExportExcelRowData,
        onResetCallback: onResetCallback,
      }}
    >
      <div style={{ zoom: 0.9, marginLeft: "10px" }}>
        <ActionToolBar
          view={"grid"}
          setCurrentTab={""}
          currCategory={"AvailabilityReport"}
          currentTab={currentTab.value}
          tabsList={[]}
          onFloatingTabChange={() => console.log("")}
          onGoBack={() => console.log("")}
          onViewChange={() => console.log("")}
          onExportToExcelCallBack={(pageNumber: number) => {
            return onExportToExcelCallBack(pageNumber, currentTab.value);
          }}
          genericRecordCount={parseInt(techTotalRows)}
          multiFilter={currFilter}
          lastRunDate={lastRunDate}
          setMultiFilter={setCurrFilter}
          onDelete={onDeleteFilter}
          onApplyFilter={onApplyFilter}
          horizon={horizon}
          onChangeHorizon={(value: number) => setHorizon(value)}
          onTabChange={(val: any) => onTabChange(val)}
          activeTab={activeTab}
        />
      </div>
      {lastRunDate && <LastRunDateComponent lastRunDate={lastRunDate} />}
      <div className={ARLayoutWrapper}>
        <div className={ARLayoutTabsWrapper}>
          <div style={{ zoom: 0.6 }}>
            <VFFloatingTab
              handleClick={(tab: any) => toggleCurrentTab(tab)}
              tabs={tabs}
              selectedTabId={currentTab.id}
            />
          </div>
          {currentTab?.id === "4" && (
            <div className={ToggleViewBtnWrapper}>
              <div className={SCViewBackground}>
                <div
                  className={SCViewContainer}
                  onClick={() => toggleVerticalView(true)}
                >
                  <img
                    className={SCViewImage}
                    src={
                      verticalView
                        ? themeUi === "REGALBLAZE"
                          ? "/assets/img/VectorFLOW/BPR/grid-view-regal.svg"
                          : "/assets/img/VectorFLOW/BPR/grid-view-pink.svg"
                        : "/assets/img/VectorFLOW/BPR/grid-view-grey.svg"
                    }
                    style={{ transform: "rotate(90deg)" }}
                    alt=""
                  />
                  <p
                    style={{
                      color: verticalView
                        ? themeUi !== "REGALBLAZE"
                          ? "#bc3d81"
                          : "#FCA311"
                        : "gray",
                    }}
                  >
                    Vertical View
                  </p>
                </div>
                <div>
                  <div className={SCVerticalDivider} />
                </div>
                <div
                  className={SCViewContainer}
                  onClick={() => toggleVerticalView(false)}
                >
                  <img
                    className={SCViewImage}
                    src={
                      !verticalView
                        ? themeUi === "REGALBLAZE"
                          ? "/assets/img/VectorFLOW/BPR/grid-view-regal.svg"
                          : "/assets/img/VectorFLOW/BPR/grid-view-pink.svg"
                        : "/assets/img/VectorFLOW/BPR/grid-view-grey.svg"
                    }
                    alt=""
                  />
                  <p
                    style={{
                      color: !verticalView
                        ? themeUi !== "REGALBLAZE"
                          ? "#bc3d81"
                          : "#FCA311"
                        : "gray",
                    }}
                  >
                    Horizontal View
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {isLoading && <OverlayLoader />}
        {!isLoading && renderView()}
        <div style={{ display: "none" }}>
          <VFTable
            ref={tempRef}
            columnDefs={currentTab.id === "2" ? techColDefs : ecoColDefs}
            rowData={exportExcelRowData}
            {...tempAgGridProps}
            maintainColumnOrder={true}
          />
        </div>
      </div>
    </GridStateContext.Provider>
  );
};

export default AvailabilityReport;
