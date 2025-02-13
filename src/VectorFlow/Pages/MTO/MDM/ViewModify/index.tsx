import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import {
  SCContainer,
  SCFilterContainer,
  SCFilterControls,
  SCLegend,
  SCFilterAddControls,
  SCFilterAddButton,
  SCFilterAddButtonWrapper,
  SCFilterSeperator,
  SCFilterButtonGroup,
  SeasonalityQuickFilterWrapper,
  SeasonalityQuickFilter,
  SeasonalityQuickFilterHeader,
  SeasonalityQuickFilterText,
  MTOPoogiTableContainer,
  PoogiSection,
  PoogiAddButtonWrapper,
} from "./styles";
import { useUserData } from "../../../../../context";
import SelectMaster from "../../../../../components/VectorFLOW/layouts/SelectMasterMTO";
import {
  areMasterFiltersValid,
  generateMTOFilterOptions,
} from "../../../../../helpers/utils";
import VFTab from "../../../../../components/VectorFLOW/commons/MTO/VFTab";
import VFFilter from "../../../../../components/VectorFLOW/commons/VFFilterMDM";
import useViewModify from "./useViewModify";
import {
  operators,
  seasonalityQuickFilterData,
} from "../../../../../helpers/MDMConstants";
import { SeasonalityQuickFilterType, type Filter } from "../../../../types/MDM";
import VFTable from "../../Common/VFTable";
import WarningModal from "./WarningModal";
import React, { useCallback, useEffect, useMemo, useState} from "react";
import VFTaskBar from "./VFTaskbar";
import SubmitConflictModal from "./SubmitConflictModal";
import VFOverlay from "../../../../../components/VectorFLOW/commons/VFOverlay";
import _ from "lodash";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import { ColorsMTO } from "../../../../../VectorFlow/Pages/MTO/Common/Colors";
import {} from "../../../../Services/MTA/MDM";
import { useSelector } from "react-redux";
import { DayPicker } from "react-day-picker";
import { CalenderHeading } from "../../../../../VectorFlow/Pages/MTO/Poogi/InsightAndTrends/ResourceUtilization/styles";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import CustomCalenderCaption from "../../../MTA/InsightsAndTrends/ResearchInsights/CustomCalenderCaption";
import CustomCalenderDay from "../../../MTA/InsightsAndTrends/ResearchInsights/CustomCalenderDay";
import { CalenderWrapper } from "../../../MTA/InsightsAndTrends/ResearchInsights/styles";
import DatePickForm from "./DatePickForm";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";


const MTOViewModify = () => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  // const disabled=true;
  // const dummyFn =()=>{return}

  const {
    isSelectMasterOpen,
    options,
    selectedOptions,
    activeMaster,
    filterButtonStatus,
    setFilterButtonStatus,
    handleSelectMasterSubmit,
    handleTabChange,
    handleTabClose,
    addNewMaster,
    handleOnAddFilter,
    handleOnDeleteFilter,
    allMastersState,
    isLoading,
    handleApplyFilter,
    isWarningModalOpen,
    toggleUploadModal,
    onWarningModalClose,
    onWarningModalSuccess,
    isOverlayVisible,
    isTableDataLoading,
    onBackButton,
    onClearExportError,
    agGridProps,
    ref,
    tempRef,
    tempAgGridProps,
    tempGridData,
    deleteSelected,
    plantNames,
    ccrNames,
    onSubmit,
    // isUploadButtonDisabled,
    editOnline,
    seasonalityActiveQuickFilter,
    onEditOnline,
    onSaveToDraft,
    rowsPerPage,
    calendarFormData,
    onReset,
    onEditOnlineSave,
    onSeasonalityQuickFilter,
    conflictCount,
    errorCount,
    isConflictModalOpen,
    isShowAll,
    onIgnoreSubmitErrors,
    onReviewConflicts,
    onSeasonalityStatusUpdate,
    validResumeStatuses,
    validStopStatuses,
    onPIPOStatusUpdate,
    enableEditOnlineReset,
    submittedDataCount,
    uploadProgress,
    totalProgress,
    tempRecordCount,
    addRowToMtoGrid,
    onMTOSaveBufferData,
    onMTOSaveAsDraft,
    MTOPoogiMajorColdef,
    MTOPoogiMinorColdef,
    onMajReasonSelected,
    minReasonRowData,
    isModalOpen,
    setIsModalOpen,
    onMinReasonEditingStopped,
    addRowToMtoMinGrid,
    onSaveHandler,
    selectedData,
    setSelectedData,
    setCalendarFormData,
  } = useViewModify("modify");

  const bufferModifyData = useSelector(
    (state: any) => state.mto.bufferModifyData
  );
  const ccrModifyData = useSelector((state: any) => state.mto.ccrModifyData);
  const editStatus: string = useSelector((state: any) => state.mto.editStatus);

  // const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [highlightedDates, setHighlightedDates] = useState<string[]>([])

  // Mapping days to their respective index in JavaScript's Date object (0 for Sunday, 6 for Saturday)
  const dayMap: Record<string, number> = {
    Su: 0,
    Mo: 1,
    Tu: 2,
    We: 3,
    Th: 4,
    Fr: 5,
    Sa: 6,
  };

// Function to generate highlighted dates, memoized using useCallback
const generateHighlightedDates = useCallback(() => {
  if (!selectedData?.sd || !selectedData?.ed) return [];

  const startDate = moment(selectedData.sd, "YYYY-MM-DD");
  const endDate = moment(selectedData.ed, "YYYY-MM-DD");
  const selectedDays = selectedData.dow
    ? selectedData.dow.includes(",")
      ? selectedData.dow.split(",")
      : [selectedData.dow]
    : [];

  const result: string[] = [];

  // If the recurrence is "monthly"
  if (selectedData.rb === "Monthly" && selectedData.mn && selectedData.md) {
    const currentMonth = moment(startDate).startOf("month");

    while (currentMonth.isSameOrBefore(endDate, "month")) {
      const matchingDate = getNthOccurrenceOfDay(
        currentMonth.year(),
        currentMonth.month(),
        selectedData.mn,
        selectedData.md
      );

      // Ensure the date is within the valid range
      if (matchingDate && matchingDate.isBetween(startDate, endDate, "day", "[]")) {
        result.push(matchingDate.format("YYYY-MM-DD"));
      }

      currentMonth.add(1, "month"); // Move to next month
    }

    return result;
  }

  // Default behavior (daily or weekly recurrence)
  while (startDate.isSameOrBefore(endDate)) {
    const dayOfWeek = startDate.day();
    if (selectedDays.length === 0 || selectedDays.some((day: any) => dayMap[day] === dayOfWeek)) {
      result.push(startDate.format("YYYY-MM-DD"));
    }
    startDate.add(1, "day");
  }

  return result;
}, [selectedData]);

const getNthOccurrenceOfDay = (year: number, month: number, occurrence: string, dayType: string) => {
  const firstDayOfMonth = moment({ year, month, day: 1 });
  const lastDayOfMonth = moment({ year, month }).endOf("month");

  // If "md" is "day", return the exact nth day of the month
  if (dayType === "day") {
    let dayNumber = 1;
    if (occurrence === "second") dayNumber = 2;
    if (occurrence === "third") dayNumber = 3;
    if (occurrence === "fourth") dayNumber = 4;
    if (occurrence === "last") dayNumber = lastDayOfMonth.date();

    const specificDate = moment({ year, month, day: dayNumber });

    // Ensure the date falls within the valid range
    return specificDate.isValid() ? specificDate : null;
  }

  // Handle weekday/weekend/specific day logic as before
  const dates: moment.Moment[] = [];
  for (let d = moment(firstDayOfMonth); d.isSameOrBefore(lastDayOfMonth); d.add(1, "day")) {
    const weekday = d.isoWeekday();
    const dayOfWeek = d.day();

    if (
      (dayType === "weekday" && weekday <= 5) ||
      (dayType === "weekend day" && weekday >= 6) ||
      (dayType in dayMap && dayOfWeek === dayMap[dayType])
    ) {
      dates.push(moment(d));
    }
  }

  // Get required occurrence for weekdays/weekends
  if (occurrence === "first") return dates[0];
  if (occurrence === "second") return dates[1];
  if (occurrence === "third") return dates[2];
  if (occurrence === "fourth") return dates[3];
  if (occurrence === "last") return dates[dates.length - 1];

  return null;
};



// Memoize the result so it's only recomputed when necessary
const getHighlightedDates = useMemo(() => generateHighlightedDates(), [generateHighlightedDates]);


// Update the state when highlightedDates changes
useEffect(() => {
  setHighlightedDates(getHighlightedDates);
}, [getHighlightedDates]);

  const calendarOnClickHandler = () => {
      setCalendarFormData({
        dsc: "",
        iwd: true,
        sd: "",
        dow: "",
        ccr: "",
        rb: "",
        mn: "", // first , second, third , fourth, last
        md: "", // day, weekday, weekend day, su , mo , tu, we, th,fr, sa
        pl: "",
        ed: "",
        rd: "",
        hid: uuidv4(),
      });
      setIsModalOpen(true);
  };


  useEffect(() => {
    if (ref.current && ref.current.api) {
      if (isTableDataLoading) {
        ref.current?.api.showLoadingOverlay();
      } else {
        ref.current?.api.hideOverlay();
      }
    }
  }, [isTableDataLoading]);

  return (
    <>
      <SCContainer>
        {isSelectMasterOpen && (
          <div style={{ zoom: 0.8 }}>
            <SelectMaster
              data={allMastersState}
              options={options}
              selectedOptions={selectedOptions}
              filterButtonStatus={filterButtonStatus}
              setFilterButtonStatus={setFilterButtonStatus}
              themeUi={themeUi}
              isLoading={isLoading}
              handleSubmit={() => {
                handleSelectMasterSubmit();
              }}
            />
          </div>
        )}
        {!isSelectMasterOpen && (
          <React.Fragment>
            {activeMaster.id == 10 && (
              <SeasonalityQuickFilterWrapper>
                <SeasonalityQuickFilterHeader>
                  Quick Filters -
                </SeasonalityQuickFilterHeader>
                {seasonalityQuickFilterData.map(
                  (s: SeasonalityQuickFilterType) => {
                    return (
                      <SeasonalityQuickFilter
                        stateColor={s.color}
                        onClick={() => onSeasonalityQuickFilter(s.id)}
                        isActive={
                          seasonalityActiveQuickFilter.find(
                            (state) =>
                              JSON.stringify(state) === JSON.stringify(s.id)
                          )
                            ? true
                            : false
                        }
                        data-testid="seasonality-quick-filter"
                      >
                        <SeasonalityQuickFilterText>
                          {s.label}
                        </SeasonalityQuickFilterText>
                      </SeasonalityQuickFilter>
                    );
                  }
                )}
              </SeasonalityQuickFilterWrapper>
            )}

            <VFTab
              activeMaster={activeMaster}
              themeUi={themeUi}
              onTabChange={handleTabChange}
              onTabClose={handleTabClose}
              newTabTitle={"Add Master"}
              newTabIcon={"/assets/img/VectorFLOW/BPR/add-circle.svg"}
              newTabHandler={addNewMaster}
            >
              {(activeMaster.progress === "default" ||
                activeMaster.progress === "view") && (
                <SCFilterContainer style={{ zoom: 0.8 }}>
                  <SCFilterControls>
                    <SCLegend>Filter</SCLegend>
                    {activeMaster.filters.map((f: Filter) => {
                      if (f.masterId == activeMaster?.id) {
                        return (
                          <VFFilter
                            onDelete={() => {
                              handleOnDeleteFilter(f.id);
                            }}
                            operators={operators}
                            filters={activeMaster.filters}
                            fields={generateMTOFilterOptions(
                              [activeMaster],
                              activeMaster.filters
                            )}
                            currFilter={f}
                            key={f.id}
                            isDisabled={false}
                          />
                        );
                      }
                    })}
                  </SCFilterControls>
                  <SCFilterAddControls>
                    {activeMaster.filters.map((f: Filter, index: number) => {
                      if (f.masterId === activeMaster?.id && index === 0) {
                        return (
                          <SCFilterAddButtonWrapper>
                            <SCFilterAddButton
                              onClick={() => {
                                handleOnAddFilter();
                              }}
                              src={
                                themeUi === "REGALBLAZE"
                                  ? "/assets/img/VectorFLOW/NMS/add-filter-regal.svg"
                                  : "/assets/img/VectorFLOW/NMS/add-filter.svg"
                              }
                              key={f.id}
                              data-testid="add-filter"
                            />
                          </SCFilterAddButtonWrapper>
                        );
                      }
                    })}
                  </SCFilterAddControls>
                  <SCFilterSeperator />
                  <SCFilterButtonGroup>
                    <VFButton
                      disabled={!areMasterFiltersValid(activeMaster.filters)}
                      themeUi={themeUi}
                      onClick={() => {
                        handleApplyFilter();
                      }}
                    >
                      Apply Filter
                    </VFButton>
                    <VFButtonOutline
                      onClick={() => {
                        handleApplyFilter(true);
                      }}
                      themeUi={themeUi}
                    >
                      {areMasterFiltersValid(activeMaster.filters)
                        ? "Clear Filters"
                        : "Show All"}
                    </VFButtonOutline>
                  </SCFilterButtonGroup>
                </SCFilterContainer>
              )}
              {activeMaster?.isMTO && activeMaster?.id === 503 ? (
                <PoogiSection>
                  <MTOPoogiTableContainer
                    style={{ display: "flex", height: "50%", flex: "1" }}
                  >
                    <VFTable
                      ref={ref}
                      columnDefs={MTOPoogiMajorColdef}
                      rowData={activeMaster.rowData}
                      {...agGridProps}
                      statusBar={{
                        statusPanels: [
                          {
                            statusPanel: "agTotalAndFilteredRowCountComponent",
                            align: "left",
                          },
                          {
                            statusPanel: "agTotalRowCountComponent",
                            align: "left",
                          },
                          {
                            statusPanel: "agFilteredRowCountComponent",
                            align: "left",
                          },
                          {
                            statusPanel: "agSelectedRowCountComponent",
                            align: "left",
                          },
                          {
                            statusPanel: "agAggregationComponent",
                            align: "left",
                          },
                        ],
                      }}
                      defaultColDef={{ ...agGridProps.defaultColDef, flex: 1 }}
                      rowSelection={"single"}
                      suppressRowClickSelection={
                        activeMaster.colDefs.some(
                          (colDef) =>
                            colDef.field === "actions" ||
                            colDef.field === "pactions"
                        )
                          ? true
                          : false
                      }
                      onSelectionChanged={onMajReasonSelected}
                      height={
                        activeMaster.rowData?.length > 0
                          ? activeMaster.progress === "view"
                            ? "90%"
                            : "95%"
                          : "90%"
                      }
                    />
                    <VFTable
                      columnDefs={MTOPoogiMinorColdef}
                      rowData={minReasonRowData}
                      {...agGridProps}
                      statusBar={{
                        statusPanels: [
                          {
                            statusPanel: "agTotalAndFilteredRowCountComponent",
                            align: "left",
                          },
                          {
                            statusPanel: "agTotalRowCountComponent",
                            align: "left",
                          },
                          {
                            statusPanel: "agFilteredRowCountComponent",
                            align: "left",
                          },
                          {
                            statusPanel: "agSelectedRowCountComponent",
                            align: "left",
                          },
                          {
                            statusPanel: "agAggregationComponent",
                            align: "left",
                          },
                        ],
                      }}
                      defaultColDef={{ ...agGridProps.defaultColDef, flex: 1 }}
                      height={
                        activeMaster.rowData?.length > 0
                          ? activeMaster.progress === "view"
                            ? "90%"
                            : "95%"
                          : "90%"
                      }
                      overlayNoRowsTemplate={
                        "Select a major reason to see the corresponding minor reason"
                      }
                      onCellEditingStopped={onMinReasonEditingStopped}
                      suppressRowClickSelection={true}
                    />
                  </MTOPoogiTableContainer>
                  <PoogiAddButtonWrapper>
                    <button
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "90px",
                        margin: "8px",
                        cursor: "pointer",
                        background: "#fff",
                      }}
                      onClick={() => {
                        !activeMaster.colDefs.some(
                          (x) => x.field === "actions" || x.field === "pactions"
                        ) && addRowToMtoGrid();
                      }}
                    >
                      {!activeMaster.colDefs.some(
                        (x) => x.field === "actions" || x.field === "pactions"
                      ) ? (
                        <>
                          <img
                            src="/assets/img/AddBufferMasterIcon.svg"
                            alt="Add Master Button"
                          />
                          <p
                            style={{
                              fontSize: "14px",
                              color: ColorsMTO.Pink.code,
                            }}
                          >
                            Add Major Reason
                          </p>
                        </>
                      ) : (
                        <>
                          <img
                            src="/assets/img/AddBufferMasterIconGrey.svg"
                            alt="Add Master Button"
                          />
                          <p
                            style={{
                              fontSize: "14px",
                              color: ColorsMTO.LightGrey.code,
                            }}
                          >
                            Add Major Reason
                          </p>
                        </>
                      )}
                    </button>
                    <button
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "130px",
                        margin: "10px",
                        cursor: "pointer",
                        background: "#fff",
                      }}
                      onClick={() => {
                        !activeMaster.colDefs.some(
                          (x) => x.field === "actions" || x.field === "pactions"
                        ) &&
                          ref &&
                          ref.current &&
                          ref?.current?.api?.getSelectedRows()?.length > 0 &&
                          addRowToMtoMinGrid();
                      }}
                    >
                      {!activeMaster.colDefs.some(
                        (x) => x.field === "actions" || x.field === "pactions"
                      ) &&
                      ref &&
                      ref.current &&
                      ref?.current?.api?.getSelectedRows()?.length > 0 ? (
                        <>
                          <img
                            src="/assets/img/AddBufferMasterIcon.svg"
                            alt="Add Master Button"
                          />
                          <p
                            style={{
                              fontSize: "14px",
                              color: ColorsMTO.Pink.code,
                            }}
                          >
                            Add Minor Reason
                          </p>
                        </>
                      ) : (
                        <>
                          <img
                            src="/assets/img/AddBufferMasterIconGrey.svg"
                            alt="Add Master Button"
                          />
                          <p
                            style={{
                              fontSize: "14px",
                              color: ColorsMTO.LightGrey.code,
                            }}
                          >
                            Add Minor Reason
                          </p>
                        </>
                      )}
                    </button>
                  </PoogiAddButtonWrapper>
                </PoogiSection>
              ) : (
                <VFTable
                  ref={ref}
                  columnDefs={activeMaster.colDefs}
                  rowData={activeMaster.rowData}
                  {...agGridProps}
                  suppressPaginationPanel={false}
                  height={
                    activeMaster?.rowData?.length > 0
                      ? activeMaster.progress === "view"
                        ? "65%"
                        : "95%"
                      : "75%"
                  }
                  maintainColumnOrder
                />
              )}
              {/* {
                (!['default'].includes(activeMaster.progress) && (!isDataAvailableLocally && !isSelectMasterOpen) && !(activeMaster.id===503))
                &&
                <VFPagination
                  selectedRows={selectedRowsCount}
                  totalRows={recordCount}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={(e) => handleChangePage(e)}
                />
              } */}
              {/* <VFTable
                  ref={veryTempRef}
                  columnDefs={activeMaster.colDefs}
                  rowData={activeMaster.rowData}
                  enableBrowserTooltips={true}
                /> */}
              <div style={{ display: "none" }}>
                <VFTable
                  ref={tempRef}
                  rowData={tempGridData}
                  {...tempAgGridProps}
                />
              </div>
              {activeMaster.isMTO && activeMaster.id !== 503 && (
                <>
                  <button
                    style={{
                      display: "flex",
                      justifyContent: "left",
                      gap: "12px",
                      width: "110px",
                      margin: "8px",
                      cursor: "pointer",
                      background: "#fff",
                    }}
                    onClick={() => {
                      if (
                        !activeMaster.colDefs.some((x) => x.field === "actions")
                      ) {
                        if (activeMaster.id !== 504) {
                          addRowToMtoGrid();
                        }
                        else{
                          calendarOnClickHandler();
                        }
                      }
                    
                    }}
                  >
                    {!activeMaster.colDefs.some(
                      (x) => x.field === "actions"
                    ) ? (
                      <>
                        <img
                          src="/assets/img/AddBufferMasterIcon.svg"
                          alt="Add Master Button"
                          height={14}
                          width={14}
                        />
                        <p
                          style={{
                            fontSize: "12px",
                            color: ColorsMTO.Pink.code,
                          }}
                        >
                          Add {activeMaster.name}
                        </p>
                      </>
                    ) : (
                      <>
                        <img
                          height={14}
                          width={14}
                          src="/assets/img/AddBufferMasterIconGrey.svg"
                          alt="Add Master Button"
                        />
                        <p
                          style={{
                            fontSize: "12px",
                            color: ColorsMTO.LightGrey.code,
                          }}
                        >
                          Add {activeMaster.name}
                        </p>
                      </>
                    )}
                  </button>
                </>
              )}
            </VFTab>
          </React.Fragment>
        )}
      </SCContainer>
      {isModalOpen && (
        <VFModalCard
          openModal={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
          }}
          headerText={"Add Details"}
          headerIcon={""}
          closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
        >
          <div
            style={{
              height: "76vh",
              width: "65vw",
              overflow: "auto",
              background: "#f4f4f4",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    padding: "10px",
                    width: "100%",
                    margin: "50px 0 0 30px",
                  }}
                >
                  <CalenderWrapper
                    style={{
                      zoom: "1",
                      background: "white",
                      borderRadius: "12px",
                    }}
                  >
                    <CalenderHeading
                      style={{ width: "100%", fontWeight: "bold" }}
                      data-testid="utilization"
                    >
                      Calendar
                    </CalenderHeading>
                    <DayPicker
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      mode="single"
                      components={{
                        Caption: CustomCalenderCaption,
                        Day: (props) => {
                          const formattedDate = moment(props?.date).format(
                            "YYYY-MM-DD"
                          );
                          const color = highlightedDates.includes(formattedDate)
                            ? "Red"
                            : "";
                          return <CustomCalenderDay {...props} color={color} />;
                        },
                      }}
                      styles={{
                        cell: {
                          padding: "5px",
                        },
                      }}
                    />
                  </CalenderWrapper>
                </div>
              </div>
              <div
                style={{
                  height: "90%",
                  borderLeft: "2px solid #A0A0A0",
                  margin: "40px 0",
                }}
              ></div>
              <div>
                {
                  <DatePickForm
                    plantNames={plantNames}
                    calendarFormData={calendarFormData}
                    ccrNames={ccrNames}
                    formData={selectedData}
                    setFormData={setSelectedData}
                    onSaveHandler={onSaveHandler}
                    setIsModalOpen={setIsModalOpen}
                  />
                }
              </div>
            </div>
          </div>
        </VFModalCard>
      )}
      {isWarningModalOpen && (
        <WarningModal
          count={tempRecordCount}
          onCloseModal={onWarningModalClose}
          onFailure={onWarningModalClose}
          onSuccess={() => onWarningModalSuccess()}
          showAll={isShowAll}
          rowsPerPage={rowsPerPage}
        />
      )}
      {isConflictModalOpen && (
        <SubmitConflictModal
          totalCount={activeMaster.rowData?.length}
          modificationCount={conflictCount}
          errorCount={errorCount}
          recordCount={submittedDataCount}
          onSuccess={onReviewConflicts}
          onFailure={onIgnoreSubmitErrors}
          onCloseModal={() => {
            return;
          }}
        />
      )}
      {isOverlayVisible && (
        <VFOverlay>
          <div style={{ backgroundColor: "white", borderRadius: "6px" }}>
            <VFLoader />
            <h1
              style={{
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              Validating Data. Please Wait this might take some time....{" "}
              {uploadProgress === "" || parseInt(uploadProgress) === 0
                ? ""
                : "Progress: " + uploadProgress + " / " + totalProgress}
            </h1>
          </div>
        </VFOverlay>
      )}
      {!isSelectMasterOpen && (
        <div style={{ zoom: 0.8 }}>
          <VFTaskBar
            disableStopSeasonality={() => {
              const flatState = _.flatMap(seasonalityActiveQuickFilter);
              let error = false;
              flatState.map((state: number) => {
                if (!validStopStatuses.includes(state)) error = true;
              });
              if (error) return true;

              return false;
            }}
            disableResumeSeasonality={() => {
              const flatState = _.flatMap(seasonalityActiveQuickFilter);
              let error = false;
              flatState.map((state: number) => {
                if (!validResumeStatuses.includes(state)) error = true;
              });
              if (error) return true;

              return false;
            }}
            showSubmittedExportError={errorCount > 0}
            // masterProgress={(!bufferModifyData)?"initial":(bufferModifyData?"editOnline":"editOnlineSubmitted")}
            masterProgress={editStatus}
            disableSubmit={activeMaster.rowData?.length === 0}
            enableEditOnlineReset={enableEditOnlineReset}
            disableDeleteSelected={activeMaster.rowData?.length < 1}
            onReset={onReset}
            onSaveToDraft={
              activeMaster.isMTO ? onMTOSaveAsDraft : onSaveToDraft
            }
            onEditOnlineSave={onEditOnlineSave}
            editOnline={editOnline}
            onEditOnline={() => onEditOnline("editOnline")}
            onBack={onBackButton}
            onClearAndExportErrors={onClearExportError}
            onModifyData={() => toggleUploadModal(true)}
            onExportData={() => {
              ref?.current?.api &&
                ref?.current?.api.exportDataAsExcel({
                  fileName: `${activeMaster.name} (MTO)`,
                });
            }}
            onSubmit={onSubmit}
            onSubmitConflictData={() => onSubmit(true)}
            onDeleteSelected={deleteSelected}
            onSeasonalityResume={() => onSeasonalityStatusUpdate("resume")}
            onSeasonalityStop={() => onSeasonalityStatusUpdate("stop")}
            onPhaseInPhaseOutStop={() => onPIPOStatusUpdate()}
            onDeleteData={() => console.log("")}
            onDeleteOnlineReset={() => console.log("")}
            onDeleteOnlineSubmit={() => console.log("")}
            onDeleteOnline={() => console.log("")}
            masterId={activeMaster.id}
            mtoSaveData={true}
            onMTOSaveData={onMTOSaveBufferData}
            isMTOSaveDataDisabled={
              (activeMaster.id === 501 &&
                !(bufferModifyData && bufferModifyData?.length > 0)) ||
              (activeMaster.id === 502 &&
                !(ccrModifyData && ccrModifyData?.length > 0))
            }
            isMTODraftDisabled={
              (activeMaster.id === 501 &&
                !(bufferModifyData && bufferModifyData?.length > 0)) ||
              (activeMaster.id === 502 &&
                !(ccrModifyData && ccrModifyData?.length > 0))
            }
            onMTOSaveAsDraft={onMTOSaveAsDraft}
          />
        </div>
      )}
    </>
  );
};

export default MTOViewModify;
