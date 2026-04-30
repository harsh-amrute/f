import React, { useCallback, useState } from "react";

import { DayPicker } from "react-day-picker";

import VFCapsule from "../../../../../components/VectorFLOW/commons/VFCapsule";
import VFRangeSlider from "../../../../../components/VectorFLOW/commons/VFRangeSlider";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../../styles/global";
import SwipePointerRegal from "../../../../../lottie/swipe pointer regal.json"
import SwipePointer from "../../../../../lottie/swipe pointer.json"

import {
  AvailabilityTrendHeader,
  ChartHeaderRadioGroup,
  ResearchInsightsTableWrapper,
  AvailabilityTrendWrapper,
  ResearchInsightsLayout,
  AvailabilityTrendSection,
  HistoricalAvailabiltyHeader,
  HistoricalAvailabiltyContent,
  HistoricalAvailabiltyContentSection,
  HistoricalAvailabiltyContentSectionHeader,
  HistoricalAvailabiltyContentSectionData,
  HorizonHeader,
  ChartHeader,
  ChartHeaderText,
  CapsuleWrapper,
  CalenderWrapper,
  CalenderHeader,
  ChartWrapper,
  CalenderSummaryWrapper,
  CalenderSummaryCell,
  CalenderSummaryCellText,
  CalenderSummaryCellContentWrapper,
  CalenderSummaryCellContent,
  CalenderSummaryCellContentStick,
  ExpandChartIcon,
  RadioGroup,
  DefaultViewRendererWrapper,
  DefaultViewRendererHeader,
  DefaultViewRendererText,
  trendHeaderBgVar,
  alignCenter,
  mb5,
  flexRow,
  mtNeg5,
  ml30,
  borderBottomDashed3,
  pb0,
  gap2,
  summaryStickBgVar,
  radioAccentVar,
  ml10,
} from "./styles.css";

import CustomCalenderCaption from "./CustomCalenderCaption";
import CustomCalenderDay from "./CustomCalenderDay";
import useResearchInsights from "./useResearchInsights";

import "react-day-picker/dist/style.css";

import { AgCharts } from "ag-charts-react";
import ActionToolBar from "../../SupplyChainIntelligenceHub/Planning/ActionToolBar";
import ExpandedGraph from "./ReseachInsightsExpandedGraph";
import VFPagination from "../../../../../VectorFlow/Pages/MTO/Common/VFPagination";
import { GridStateContext } from "../../../../../context/GridStateContext";
import DailyDataGraphModal from "../../../../../components/VectorFLOW/commons/DailyDataGraphModal";
import NormChangeHistoryTable from "../../../../../components/VectorFLOW/commons/NormChangeHistoryTable";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../../context";
import { skeleton } from "../../../../../components/commons/styled/index.css";
import LastRunDateComponent from "../../../../../components/commons/lastRundate";
import OverlayLoader from "../../../../../VectorFlow/Pages/MTO/Common/Loader";
import SafeLottie from "../../../../../components/commons/SafeLottie";

const ResearchInsights = () => {
  const {
    ref,
    agGridProps,
    ResearchInsightsColumns,
    ResearchInsightsData,
    isLoading,
    isUpdatedGraphDataLoading,
    horizon,
    graphState,
    setHorizon,
    getColor,
    setCalenderType,
    handleOnUpdateGraph,
    redCount,
    blackCount,
    whiteCount,
    expandedGraphId,
    isGraphOneOpen,
    selfGraphData,
    locationGraphData,
    graphs,
    setGraphs,
    calenderType,
    expandedGraphAllFilterValues,
    toggleGraphModal,
    setIsGraphOneOpen,
    updateGraphState,
    recordCount,
    rowsPerPage,
    currGridPage,
    isSavedDataLoading,
    tempRef,
    tempDownloadData,
    setTempDownloadData,
    tempAgGridProps,
    exportExcelRowData,
    setExportExcelRowData,
    exportExcelColumns,
    setExportExcelColumns,
    onExportToExcelCallBack,
    showDailyDataGraphModal,
    showNormChangeHistoryTable,
    dailyData,
    handlePageChange,
    onApplyFilter,
    onDeleteFilter,
    currentFilter,
    setCurrentFilter,
    historicalAvailabilityData,
    isHistoricalAvailabilityLoading,
    continuousBlack,
    continuousBlackAndRed,
    continuousWhite,
    generalFilterOptions,
    onResetCallback,
    lastRunDate,
    savePageSize,
    userPageSize,
  } = useResearchInsights();

  const { user } = useUserData();
  const themeUi = user.user.theme_ui;
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const getFormattedPercentage = useCallback((number: number) => {
    if (number === 0) return "0";
    if (number == null || isNaN(number)) return "-";
    return number.toFixed(2);
  }, []);
  console.log(
    "Resolved path:",
    require.resolve("./ReseachInsightsExpandedGraph")
  );

  return (
    <GridStateContext.Provider
      value={{
        ref: ref,
        exportExcelColumns: exportExcelColumns,
        setExportExcelColumns: setExportExcelColumns,
        tempDownloadData: tempDownloadData,
        setTempDownloadData: setTempDownloadData,
        exportExcelRowData: exportExcelRowData,
        setExportExcelRowData: setExportExcelRowData,
        onResetCallback: onResetCallback,
      }}
    >
      <div style={{ zoom: 0.9, paddingLeft: "20px" }}>
        <ActionToolBar
          view={"grid"}
          setCurrentTab={""}
          currCategory={"ResearchInsight"}
          currentTab={""}
          tabsList={[]}
          onFloatingTabChange={() => console.log("")}
          onGoBack={() => console.log("")}
          onViewChange={() => console.log("")}
          genericRecordCount={recordCount || 0}
          onExportToExcelCallBack={onExportToExcelCallBack}
          onApplyFilter={onApplyFilter}
          multiFilter={currentFilter}
          setMultiFilter={setCurrentFilter}
          onDelete={onDeleteFilter}
          lastRunDate={lastRunDate}
          generalFilterOptions={generalFilterOptions}
          onUpdateInsight={handleOnUpdateGraph}
          hideUpdateInsightsBtn={graphState === "default"}
        />
      </div>
      {lastRunDate && <LastRunDateComponent lastRunDate={lastRunDate} />}

      <div className={ResearchInsightsLayout}>
        {showDailyDataGraphModal && (
          <DailyDataGraphModal
            rowData={dailyData.rowData}
            chartData={dailyData.chartData}
            normChangeData={dailyData.normChangeData}
            masterData={dailyData.masterData}
            isModalOpen={showDailyDataGraphModal}
            suggestionData={dailyData.suggestionData}
            monitoringData={dailyData.monitoringData}
            virtualNormData={dailyData.virtualNormData}
            skuKey={"SKUCode"}
            whKey={"WHName"}
          />
        )}
        {showNormChangeHistoryTable && (
          <NormChangeHistoryTable data={dailyData.normChangeData} />
        )}
        <div
          className={ResearchInsightsTableWrapper}
          style={{ marginRight: "15px" }}
        >
          {(isLoading || isSavedDataLoading) && <OverlayLoader />}
          <React.Fragment>
            <VFTable
              height={"100%"}
              {...agGridProps}
              ref={ref}
              columnDefs={ResearchInsightsColumns}
              rowData={ResearchInsightsData}
              enableRangeSelection={true} // Added property
              rowSelection="multiple"
              statusBar={{
                statusPanels: [
                  {
                    statusPanel: "agTotalAndFilteredRowCountComponent",
                    align: "left",
                  },
                  { statusPanel: "agTotalRowCountComponent", align: "left" },
                  { statusPanel: "agFilteredRowCountComponent", align: "left" },
                  { statusPanel: "agSelectedRowCountComponent", align: "left" },
                  { statusPanel: "agAggregationComponent", align: "left" },
                ],
              }}
              maintainColumnOrder
              onFilterChanged={() => {
                const filterModel = ref?.current?.api?.getFilterModel();
                if (filterModel && Object.keys(filterModel).length > 0) {
                  setIsDisabled(false);
                } else {
                  setIsDisabled(true);
                }
              }}
              tooltipShowDelay={500}
            />
            {ResearchInsightsData?.length > 0 && (
              <VFPagination
                selectedRows={0}
                totalRows={recordCount || 0}
                currentPage={currGridPage}
                rowsPerPage={userPageSize}
                handleChangePage={handlePageChange}
                resetGridRef={ref}
                isDisabled={isDisabled}
                customPageSizeEnabled={true}
                userPageSize={userPageSize}
                savePageSize={savePageSize}
              />
            )}
          </React.Fragment>

          {/* <ResearchInsightsTableTaskBar>
                    <VFButton
                        themeUi={themeUi}
                        onClick={handleOnUpdateGraph}
                        // disabled={graphState==='default'}
                    >
                        Update Graph
                    </VFButton>

                </ResearchInsightsTableTaskBar> */}
        </div>
        {isUpdatedGraphDataLoading ? (
          <div className={AvailabilityTrendWrapper}>
            <OverlayLoader />
          </div>
        ) : (
          <div className={AvailabilityTrendWrapper}>
            <div
              className={AvailabilityTrendHeader}
              style={assignInlineVars({
                [trendHeaderBgVar]:
                  themeUi === "PUREELEGANCE"
                    ? "black"
                    : globalStyles.chooseThemeColor[themeUi].color1,
              })}
            >
              On Hand Availability Trend
            </div>
            <div
              className={AvailabilityTrendSection}
              style={{ borderBottom: "dashed 2px #B2B2B2" }}
            >
              <p className={HistoricalAvailabiltyHeader}>
                Historical Availability
              </p>
              {isHistoricalAvailabilityLoading ? (
                <div
                  className={skeleton}
                  style={{ height: 35, width: "100%" }}
                />
              ) : (
                <div className={HistoricalAvailabiltyContent}>
                  <span className={HistoricalAvailabiltyContentSection}>
                    <p className={HistoricalAvailabiltyContentSectionHeader}>
                      90-60 Days
                    </p>
                    <p className={HistoricalAvailabiltyContentSectionData}>
                      {getFormattedPercentage(
                        historicalAvailabilityData.availability_01_30
                      )}
                      %
                    </p>
                  </span>
                  <span className={HistoricalAvailabiltyContentSection}>
                    <p className={HistoricalAvailabiltyContentSectionHeader}>
                      60-30 Days
                    </p>
                    <p className={HistoricalAvailabiltyContentSectionData}>
                      {getFormattedPercentage(
                        historicalAvailabilityData.availability_31_60
                      )}
                      %
                    </p>
                  </span>
                  <span
                    className={HistoricalAvailabiltyContentSection}
                    style={{ border: "none" }}
                  >
                    <p className={HistoricalAvailabiltyContentSectionHeader}>
                      30-0 Days
                    </p>
                    <p className={HistoricalAvailabiltyContentSectionData}>
                      {getFormattedPercentage(
                        historicalAvailabilityData.availability_61_90
                      )}
                      %
                    </p>
                  </span>
                </div>
              )}
            </div>
            {graphState === "default" ? (
              <div
                className={`${AvailabilityTrendSection} ${flexRow} ${alignCenter} ${mb5}`}
                style={{ zoom: 0.7, padding: 0 }}
              >
                <div className={DefaultViewRendererWrapper}>
                  {/* <Lottie
                    animationData={
                      themeUi === "REGALBLAZE"
                        ? "/assets/img/VectorFLOW/BPR/swipe pointer regal.json"
                        : "/assets/img/VectorFLOW/BPR/swipe pointer.json"
                    }
                    loop
                    autoplay
                    style={{
                      transform: "rotate(-90deg)",
                      height: 70,
                      width: 70,
                    }}
                  /> */}

                  <SafeLottie
                    src={
                      themeUi === "REGALBLAZE"
                        ? SwipePointerRegal
                        : SwipePointer
                    }
                    loop
                    autoplay
                    style={{
                      transform: "rotate(-90deg)",
                      height: 70,
                      width: 70,
                    }}
                  />

                  <p className={DefaultViewRendererHeader}>No Data To Show</p>
                  <p className={DefaultViewRendererText}>
                    Please select data from the grid on left to view more
                    insights
                  </p>
                  <VFButton themeUi={themeUi} onClick={handleOnUpdateGraph}>
                    Load Insights
                  </VFButton>
                </div>
              </div>
            ) : (
              <div
                className={`${AvailabilityTrendSection} ${flexRow} ${alignCenter} ${mb5} ${mtNeg5} ${borderBottomDashed3}`}
                style={{ zoom: 0.7, padding: 0 }}
              >
                <p className={`${HorizonHeader} ${ml30}`}>Horizon</p>
                <VFRangeSlider
                  showTriangle={false}
                  min={1}
                  max={90}
                  milestones={[0, 1, 90]}
                  strictMode={false}
                  width={250}
                  defaultValue={horizon}
                  handleChange={(e) => setHorizon(e)}
                  style={{ marginTop: 0 }}
                  labelValueFormatter={(v: number) =>
                    v > 1 ? `${v} Days` : `${v} Day`
                  }
                />
              </div>
            )}
            {graphState === "calender" && (
              <>
                <div className={AvailabilityTrendSection}>
                  <div className={ChartHeader}>
                    <p className={ChartHeaderText}>Summary</p>
                    <div className={CapsuleWrapper}>
                      <VFCapsule
                        activeBtn={{ label: calenderType, value: calenderType }}
                        capsules={[
                          { label: "On-Hand Inventory", value: "Tech" },
                          { label: "Pipeline Inventory", value: "Eco" },
                        ]}
                        handleClick={(e: any) => setCalenderType(e.value)}
                      />
                    </div>
                  </div>

                  <div className={CalenderWrapper}>
                    <p className={CalenderHeader}>
                      {calenderType === "Tech" ? "On-Hand" : "Pipeline"}
                    </p>
                    <DayPicker
                      style={{ zoom: 0.7 }}
                      mode="single"
                      components={{
                        Caption: CustomCalenderCaption,
                        Day: (props) => (
                          <CustomCalenderDay
                            {...props}
                            color={getColor(props.date)}
                          />
                        ),
                      }}
                      styles={{ cell: { padding: "5px" } }}
                    />
                  </div>
                </div>

                <div className={AvailabilityTrendSection}>
                  <div className={CalenderSummaryWrapper}>
                    <div className={CalenderSummaryCell}>
                      <p className={CalenderSummaryCellText}>Black Count</p>
                      <div className={CalenderSummaryCellContentWrapper}>
                        <p className={CalenderSummaryCellContent}>
                          {blackCount}%
                        </p>
                        <div
                          className={CalenderSummaryCellContentStick}
                          style={assignInlineVars({
                            [summaryStickBgVar]: "black",
                          })}
                        />
                      </div>
                    </div>

                    <div className={CalenderSummaryCell}>
                      <p className={CalenderSummaryCellText}>Red Count</p>
                      <div className={CalenderSummaryCellContentWrapper}>
                        <p className={CalenderSummaryCellContent}>
                          {redCount}%
                        </p>
                        <div
                          className={CalenderSummaryCellContentStick}
                          style={assignInlineVars({
                            [summaryStickBgVar]: "#F04D4D",
                          })}
                        />
                      </div>
                    </div>

                    <div className={CalenderSummaryCell}>
                      <p className={CalenderSummaryCellText}>White Count</p>
                      <div className={CalenderSummaryCellContentWrapper}>
                        <p className={CalenderSummaryCellContent}>
                          {whiteCount}%
                        </p>
                        <div
                          className={CalenderSummaryCellContentStick}
                          style={assignInlineVars({
                            [summaryStickBgVar]: "gray",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={AvailabilityTrendSection}
                  style={{ borderBottom: "none" }}
                >
                  <div className={CalenderSummaryWrapper}>
                    <div className={CalenderSummaryCell}>
                      <p
                        className={CalenderSummaryCellText}
                        style={{ height: 27 }}
                      >
                        Contd. Black Ageing
                      </p>
                      <div className={CalenderSummaryCellContentWrapper}>
                        <p className={CalenderSummaryCellContent}>
                          {continuousBlack}
                        </p>
                      </div>
                    </div>
                    <div className={CalenderSummaryCell}>
                      <p
                        className={CalenderSummaryCellText}
                        style={{ height: 27 }}
                      >
                        Contd. Black + Red Ageing
                      </p>
                      <div className={CalenderSummaryCellContentWrapper}>
                        <p className={CalenderSummaryCellContent}>
                          {continuousBlackAndRed}
                        </p>
                      </div>
                    </div>
                    <div className={CalenderSummaryCell}>
                      <p
                        className={CalenderSummaryCellText}
                        style={{ height: 27 }}
                      >
                        Contd. White Ageing
                      </p>
                      <div className={CalenderSummaryCellContentWrapper}>
                        <p className={CalenderSummaryCellContent}>
                          {continuousWhite}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {graphState === "graph" && (
              <>
                <div className={`${AvailabilityTrendSection} ${pb0}`}>
                  <div className={ChartHeader}>
                    <p className={ChartHeaderText}>Current Location</p>
                    <div className={CapsuleWrapper}>
                      <VFCapsule
                        activeBtn={graphs[0].pen}
                        capsules={[
                          { label: "On-Hand Inv.", value: "Tech" },
                          { label: "Pipeline Inv.", value: "Eco" },
                        ]}
                        handleClick={(val: any) =>
                          updateGraphState(1, "pen", val)
                        }
                      />
                    </div>
                  </div>

                  <div className={ChartWrapper}>
                    <img
                      className={ExpandChartIcon}
                      src="/assets/img/VectorFLOW/BPR/expand-graph.svg"
                      onClick={() => toggleGraphModal(true, 1)}
                    />
                    <AgCharts
                      options={{
                        height: 200,
                        width: 300,
                        data: selfGraphData,
                        axes: [
                          {
                            type: "category",
                            position: "bottom",
                            label: {
                              fontSize: 8,
                            },
                          },
                          {
                            type: "number",
                            position: "left",
                            label: {
                              fontSize: 8,
                            },
                          },
                          {
                            type: "number",
                            position: "left",
                            label: {
                              fontSize: 8,
                            },
                            title: {
                              text: "Count of Item",
                              enabled: true,
                              fontSize: 10,
                              fontFamily: "Roboto",
                            },
                          },
                        ],
                        series: [
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "Red",
                            yName: "Red",

                            marker: {
                              fill: "red",
                              size: 2,
                              shape: "square",
                              stroke: "red",
                            },
                            stroke: "red",
                          },
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "Green",
                            yName: "Green",
                            marker: {
                              fill: "green",
                              size: 2,
                              shape: "square",
                              stroke: "green",
                            },
                            stroke: "green",
                          },
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "Yellow",
                            yName: "Yellow",
                            marker: {
                              fill: "#FFBF00",
                              size: 2,
                              shape: "square",
                              stroke: "#FFBF00",
                            },
                            stroke: "#FFBF00",
                          },
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "Black",
                            yName: "Black",
                            marker: {
                              fill: "black",
                              size: 2,
                              shape: "square",
                              stroke: "black",
                            },
                            stroke: "black",
                          },
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "Blue",
                            yName: "Blue",
                            marker: {
                              fill: "blue",
                              size: 2,
                              shape: "square",
                              stroke: "blue",
                            },
                            stroke: "blue",
                          },
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "White",
                            yName: "White",
                            marker: {
                              fill: "gray",
                              size: 2,
                              shape: "square",
                              stroke: "gray",
                            },
                            stroke: "gray",
                          },
                        ],
                        legend: {
                          position: "top",
                          item: {
                            label: {
                              fontSize: 8,
                            },
                            marker: {
                              size: 10,
                            },
                            line: {
                              strokeWidth: 1,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div
                  className={AvailabilityTrendSection}
                  style={{ border: "none" }}
                >
                  <div className={ChartHeader}>
                    <span className={RadioGroup}>
                      <div
                        className={`${ChartHeaderRadioGroup} ${gap2}`}
                        style={assignInlineVars({
                          [radioAccentVar]:
                            globalStyles.chooseThemeColor[themeUi].color5,
                        })}
                      >
                        <input
                          type="radio"
                          value="parent"
                          name="location"
                          id="parent"
                          defaultChecked
                          onChange={() =>
                            updateGraphState(2, "type", {
                              label: "Parent",
                              value: "Parent",
                            })
                          }
                          style={{ margin: 0 }}
                        />
                        <label htmlFor="parent" style={{ fontSize: 10 }}>
                          Parent
                        </label>
                      </div>

                      <div
                        className={`${ChartHeaderRadioGroup} ${ml10} ${gap2}`}
                        style={assignInlineVars({
                          [radioAccentVar]:
                            globalStyles.chooseThemeColor[themeUi].color5,
                        })}
                      >
                        <input
                          type="radio"
                          value="child"
                          name="location"
                          id="child"
                          onChange={() =>
                            updateGraphState(2, "type", {
                              label: "Child",
                              value: "Child",
                            })
                          }
                          style={{ margin: 0 }}
                        />
                        <label htmlFor="child" style={{ fontSize: 10 }}>
                          Child
                        </label>
                      </div>
                    </span>

                    <div className={CapsuleWrapper}>
                      <VFCapsule
                        activeBtn={graphs[1].pen}
                        capsules={[
                          { label: "On-Hand Inv.", value: "Tech" },
                          { label: "Pipeline Inv.", value: "Eco" },
                        ]}
                        handleClick={(val: any) =>
                          updateGraphState(2, "pen", val)
                        }
                      />
                    </div>
                  </div>

                  <div className={ChartWrapper}>
                    <img
                      className={ExpandChartIcon}
                      src="/assets/img/VectorFLOW/BPR/expand-graph.svg"
                      onClick={() => toggleGraphModal(true, 2)}
                    />
                    <AgCharts
                      options={{
                        height: 150,
                        width: 300,
                        data: locationGraphData,
                        axes: [
                          {
                            type: "category",
                            position: "bottom",
                            label: {
                              fontSize: 8,
                            },
                          },
                          {
                            type: "number",
                            position: "left",
                            label: {
                              fontSize: 8,
                            },
                          },
                          {
                            type: "number",
                            position: "left",
                            label: {
                              fontSize: 8,
                            },
                            title: {
                              text: "Count of Item",
                              enabled: true,
                              fontSize: 10,
                              fontFamily: "Roboto",
                            },
                          },
                        ],
                        series: [
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "Red",
                            yName: "Red",

                            marker: {
                              fill: "red",
                              size: 2,
                              shape: "square",
                              stroke: "red",
                            },
                            stroke: "red",
                          },
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "Green",
                            yName: "Green",
                            marker: {
                              fill: "green",
                              size: 2,
                              shape: "square",
                              stroke: "green",
                            },
                            stroke: "green",
                          },
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "Yellow",
                            yName: "Yellow",
                            marker: {
                              fill: "#FFBF00",
                              size: 2,
                              shape: "square",
                              stroke: "#FFBF00",
                            },
                            stroke: "#FFBF00",
                          },
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "Black",
                            yName: "Black",
                            marker: {
                              fill: "black",
                              size: 2,
                              shape: "square",
                              stroke: "black",
                            },
                            stroke: "black",
                          },
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "Blue",
                            yName: "Blue",
                            marker: {
                              fill: "blue",
                              size: 2,
                              shape: "square",
                              stroke: "blue",
                            },
                            stroke: "blue",
                          },
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "White",
                            yName: "White",
                            marker: {
                              fill: "gray",
                              size: 2,
                              shape: "square",
                              stroke: "gray",
                            },
                            stroke: "gray",
                          },
                        ],
                        legend: {
                          position: "top",
                          item: {
                            label: {
                              fontSize: 8,
                            },
                            marker: {
                              size: 10,
                            },
                            line: {
                              strokeWidth: 1,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <ExpandedGraph
          onUpdateGraphs={updateGraphState}
          options={expandedGraphAllFilterValues}
          graphs={graphs}
          setGraphs={setGraphs}
          id={expandedGraphId}
          onTogglePen={(e) => updateGraphState(expandedGraphId, "pen", e)}
          data={expandedGraphId === 1 ? selfGraphData : locationGraphData}
          isOpen={isGraphOneOpen}
          onClose={() => setIsGraphOneOpen(false)}
          horizon={horizon}
        />
        <div style={{ display: "none" }}>
          <VFTable
            ref={tempRef}
            columnDefs={ResearchInsightsColumns}
            rowData={exportExcelRowData}
            {...tempAgGridProps}
            maintainColumnOrder
          />
        </div>
      </div>
    </GridStateContext.Provider>
  );
};

export default ResearchInsights;
