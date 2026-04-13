import { useEffect } from "react";
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import useBufferTrends from "./useBufferTrends";
import ActionToolBar from "../../SupplyChainIntelligenceHub/Planning/ActionToolBar";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../../styles/global"; // to fetch theme color

import ChartView from "../../InsightsAndTrends/BufferTrends/ChartView";
import BPRViewTable, {
  BPRViewTableColDef,
} from "../../SupplyChainIntelligenceHub/BPR/BPRViewTable";
import {
  AvailabilityContainer,
  AvailabilityContent,
  AvailabilityHeader,
  SummaryTableColumn,
  availabilityColorVar,
  FormulaContent,
  FractionWrapper,
  FractionNumerator,
  FractionDenominator,
  FractionMultiplier
} from "./styles.css";
import LastRunDateComponent from "../../../../../components/commons/lastRundate";
import OverlayLoader from "../../../../../VectorFlow/Pages/MTO/Common/Loader";

const BufferTrends = () => {
  const {
    currentTab,
    onFloatingTabChange,
    currentView,
    currentGraphData,
    summaryData,
    availability,
    BufferTrendsDataLoad,
    isLoading,
    currentPageTab,
    onFloatingTabChangeOnPages,
    graphs,
    updateGraphState,
    setHorizondays,
    handleSubmitClick,
    horizonDays,
    onGoBack,
    handleApplyFilter,
    multiFilterState,
    setMultiFilterState,
    onDeleteFilter,
    themeUI,
    lastRunDate,
  } = useBufferTrends();

  const summaryColumnDefs: BPRViewTableColDef[] = [
    { headerName: "", colId: "category" },
    {
      headerName: (
        <p className={SummaryTableColumn} color="black">
          Black
        </p>
      ),
      colId: "sumB",
    },
    {
      headerName: (
        <p className={SummaryTableColumn} color="red">
          Red
        </p>
      ),
      colId: "sumR",
    },
    {
      headerName: (
        <p className={SummaryTableColumn} color="#ffbf00ff">
          Yellow
        </p>
      ),
      colId: "sumY",
    },
    {
      headerName: (
        <p className={SummaryTableColumn} color="green">
          Green
        </p>
      ),
      colId: "sumG",
    },
    {
      headerName: (
        <p className={SummaryTableColumn} color="blue">
          Blue
        </p>
      ),
      colId: "sumBU",
    },
    {
      headerName: (
        <p className={SummaryTableColumn} color="gray">
          White
        </p>
      ),
      colId: "sumW",
    },
    {
      headerName: (
        <p className={SummaryTableColumn} color="gray">
          Grey
        </p>
      ),
      colId: "sumGY",
    },
  ];
  const renderView = () => {
    switch (currentView) {
      case "chart":
        return (
          <>
            <ChartView
              currentTab={currentTab}
              currentGraphData={currentGraphData}
              currentPageTab={currentPageTab}
              onFloatingTabChangeOnPages={onFloatingTabChangeOnPages}
              isLoading={isLoading}
              graphs={graphs}
              updateGraphState={updateGraphState}
              setHorizondays={setHorizondays}
              handleSubmitClick={handleSubmitClick}
              horizonDays={horizonDays}
            />

            <div style={{ minHeight: "200px" }}>
              <div
                style={{
                  zoom: 0.8,
                  margin: "0px 10px 0px 25px",
                  display: "flex",
                }}
              >
                <BPRViewTable
                  tableHeader={`Summary (As of ${lastRunDate})`}
                  tablePrefixSrc=""
                  rowData={summaryData}
                  colDefs={summaryColumnDefs}
                />
                <div className={AvailabilityContainer}>
                  <div className={AvailabilityHeader}>{`Overall Availability (As of ${lastRunDate})`}</div>
                  <div className={FormulaContent}
                    style={assignInlineVars({
                      [availabilityColorVar]:
                        globalStyles.chooseThemeColor[themeUI].color5,
                    })}>
                    <div className={FractionWrapper}>
                      <span className={FractionNumerator}>
                        Red + Yellow + Green + Blue + White
                      </span>
                      <span className={FractionDenominator}>
                        Black + Red + Yellow + Green + Blue + White
                      </span>
                    </div>
                    <span className={FractionMultiplier}>× 100</span>
                  </div>
                  <div
                    className={AvailabilityContent}
                    style={assignInlineVars({
                      [availabilityColorVar]:
                        globalStyles.chooseThemeColor[themeUI].color5,
                    })}
                  >
                    {availability}%
                  </div>
                </div>
              </div>

              {/* <div style={{zoom:0.7,margin:'0px 0px 0px 40px'}}>
                <BPRViewTable
                  tableHeader="Availability"
                  tablePrefixSrc="/assets/img/VectorFLOW/BTG/Availability-icon.svg"
                  rowData={[{ avail: availability + "%" }]}
                  colDefs={availColumnDefs}
                />
                </div> */}
            </div>
          </>
        );
    }
  };

  useEffect(() => {
    if (currentGraphData?.length) BufferTrendsDataLoad();
  }, [currentTab]);

  return (
    <>
      <ActionToolBar
        view={"grid"}
        setCurrentTab={currentTab}
        currCategory={"BufferTrend"}
        currentTab={""}
        tabsList={[]}
        onFloatingTabChange={onFloatingTabChange}
        onGoBack={onGoBack}
        onViewChange={() => console.log("")}
        onApplyFilter={handleApplyFilter}
        onExportToExcelCallBack
        genericRecordCount={0}
        multiFilter={multiFilterState}
        lastRunDate={lastRunDate}
        setMultiFilter={setMultiFilterState}
        onDelete={onDeleteFilter}
      />
      {lastRunDate && <LastRunDateComponent lastRunDate={lastRunDate} />}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "8px",
        }}
      >
        <div style={{ zoom: 0.7 }}>
          <VFFloatingTab
            tabs={[
              {
                id: "technical View",
                label: "On-Hand Inv. Availability Trend",
                value: "tech",
              },
              {
                id: "economicalView",
                label: "Pipeline Inv. Availability Trend",
                value: "eco",
              },
            ]}
            handleClick={onFloatingTabChange}
          />
        </div>
      </div>

      {isLoading ? <OverlayLoader /> : currentGraphData?.length && renderView()}
    </>
  );
};

export default BufferTrends;
