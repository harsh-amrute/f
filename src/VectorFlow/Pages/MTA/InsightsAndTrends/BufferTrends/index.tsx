import { useEffect } from "react";
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import useBufferTrends from "./useBufferTrends";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import ActionToolBar from "../../SupplyChainIntelligenceHub/Planning/ActionToolBar";

import ChartView from "../../InsightsAndTrends/BufferTrends/ChartView";
import BPRViewTable, {
  BPRViewTableColDef,
} from "../../SupplyChainIntelligenceHub/BPR/BPRViewTable";
import { Allotment } from "allotment";
import { SummaryTableColumn } from "./styles";

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
  } = useBufferTrends();

  const summaryColumnDefs: BPRViewTableColDef[] = [
    { headerName: "", colId: "category" },
    { headerName: <SummaryTableColumn color="black">Black</SummaryTableColumn>, colId: "sumB" },
    { headerName: <SummaryTableColumn color="red">Red</SummaryTableColumn>, colId: "sumR" },
    { headerName: <SummaryTableColumn color="yellow">Yellow</SummaryTableColumn>, colId: "sumY" },
    { headerName: <SummaryTableColumn color="green">Green</SummaryTableColumn>, colId: "sumG" },
    { headerName: <SummaryTableColumn color="blue">Blue</SummaryTableColumn>, colId: "sumBU" },
    { headerName: <SummaryTableColumn color="gray">White</SummaryTableColumn>, colId: "sumW" },
  ];
  const availColumnDefs: BPRViewTableColDef[] = [
    { headerName: "", colId: "avail" },
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

            <div style={{height:'200px'}}>
            <Allotment sizes={[400,150]}>
              <Allotment.Pane minSize={200}>
                <div style={{zoom:0.8,margin:'0px 20px 0px 10px'}}>
                <BPRViewTable
                  tableHeader="Summary"
                  tablePrefixSrc=""
                  rowData={summaryData}
                  colDefs={summaryColumnDefs}
                />
                </div>
              </Allotment.Pane>
              <Allotment.Pane minSize={200}>
                <div style={{zoom:0.7,margin:'0px 0px 0px 40px'}}>
                <BPRViewTable
                  tableHeader="Availability"
                  tablePrefixSrc="/assets/img/VectorFLOW/BTG/Availability-icon.svg"
                  rowData={[{ avail: availability + "%" }]}
                  colDefs={availColumnDefs}
                />
                </div>
              </Allotment.Pane>
            </Allotment>
            </div>
          </>
        );
    }
  };

  useEffect(() => {
    BufferTrendsDataLoad();
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
        setMultiFilter={setMultiFilterState}
        onDelete={onDeleteFilter}
      />

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
      {isLoading ? <VFLoader /> : renderView()}
    </>
  );
};

export default BufferTrends;
