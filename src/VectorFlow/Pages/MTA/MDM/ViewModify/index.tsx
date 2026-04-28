import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { assignInlineVars } from "@vanilla-extract/dynamic";
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
  quickFilterStateColorVar,
} from "./styles.css";
import { useUserData } from "../../../../../context";
import SelectMaster from "../../../../../components/VectorFLOW/layouts/SelectMaster";
import {
  generateOptions,
  getMDMTableHeight,
} from "../../../../../helpers/utils";
import VFTab from "../../../../../components/VectorFLOW/commons/VFTab";
import VFFilter from "../../../../../components/VectorFLOW/commons/VFFilter";
import useViewModify from "./useViewModify";
import {
  operators,
  seasonalityQuickFilterData,
} from "../../../../../helpers/MDMConstants";
import { SeasonalityQuickFilterType, type Filter } from "../../../../types/MDM";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import WarningModal from "./WarningModal";
import UploadModal from "./UploadModal";
import React, { useEffect, useMemo, useState } from "react";
import VFTaskBar from "./VFTaskbar";
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";
import SeasonalityChartModal from "./SeasonalityChartModal";
import SubmitConflictModal from "./SubmitConflictModal";
import VFOverlay from "../../../../../components/VectorFLOW/commons/VFOverlay";
import _ from "lodash";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import { useLocation } from "react-router";
import {
  gridFilterWrapper,
  textBtn,
} from "../../../MTO/Common/VFPagination/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";

const ViewModify = () => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const suppressMovable = true;

  const location = useLocation();

  const {
    isSelectMasterOpen,
    isSavingToDraft,
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
    recordCount,
    isUploadModalOpen,
    toggleUploadModal,
    onWarningModalClose,
    onWarningModalSuccess,
    downloadFileName,
    setDownloadFileName,
    onUploadMaster,
    isOverlayVisible,
    file,
    setFile,
    isTableDataLoading,
    exportToExcel,
    onBackButton,
    onBackButton1,
    onClearExportError,
    agGridProps,
    ref,
    tempRef,
    tempAgGridProps,
    tempGridData,
    deleteSelected,
    onSubmit,
    // isUploadButtonDisabled,
    editOnline,
    seasonalityActiveQuickFilter,
    onEditOnline,
    onSaveToDraft,
    selectedRowsCount,
    currentPage,
    rowsPerPage,
    handleChangePage,
    onReset,
    onEditOnlineSave,
    isSeasonalityChartModalOpen,
    chartData,
    normChangeData,
    toggleSeasonalityChartModal,
    onSeasonalityQuickFilter,
    seasonalityRowData,
    conflictCount,
    errorCount,
    isConflictModalOpen,
    isShowAll,
    onIgnoreSubmitErrors,
    onReviewConflicts,
    isDataAvailableLocally,
    onSeasonalityStatusUpdate,
    validResumeStatuses,
    validStopStatuses,
    onPIPOStatusUpdate,
    enableEditOnlineReset,
    submittedDataCount,
    uploadProgress,
    totalProgress,
    tempRecordCount,
    isSubmitDisabled,
    onDiscardDraftCallback,
    canToggleMaster,
    setCanToggleMaster,
    getAllVisibleColums,
    handleFileNameChange
  } = useViewModify("modify");

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);
  const RECORD_UPLOAD_LIMIT = EnvConfig["RECORD_UPLOAD_LIMIT"];

  useEffect(() => {
    if (ref.current && ref.current.api) {
      if (isTableDataLoading) {
        ref.current?.api.showLoadingOverlay();
      } else {
        ref.current?.api.hideOverlay();
      }
    }
  }, [isTableDataLoading]);

  const clearGridFilter = () => {
    ref?.current?.api.setFilterModel(null);
    setIsDisabled(true);
  };

  const CustomStatusPanel = useMemo(() => {
    const brand = themeUi === "REGALBLAZE" ? "REGALBLAZE" : "DEFAULT";

    return () => (
      <div className={gridFilterWrapper} style={{ marginTop: "25px" }}>
        <button
          className={textBtn[brand]}
          onClick={clearGridFilter}
          disabled={isDisabled}
        >
          Clear All Grid Filters
        </button>
      </div>
    );
  }, [isDisabled, themeUi]);

  return (
    <>
      <div className={SCContainer}>
        {isSelectMasterOpen && (
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
            canToggleMaster={canToggleMaster}
          />
        )}

        {!isSelectMasterOpen && (
          <React.Fragment>
            {activeMaster.id == 10 && (
              <div className={SeasonalityQuickFilterWrapper}>
                <p className={SeasonalityQuickFilterHeader}>Quick Filters - </p>

                {seasonalityQuickFilterData.map(
                  (s: SeasonalityQuickFilterType) => {
                    const active = !!seasonalityActiveQuickFilter.find(
                      (state) => JSON.stringify(state) === JSON.stringify(s.id)
                    );
                    const key = Array.isArray(s.id)
                      ? s.id.join("-")
                      : String(s.id); // or JSON.stringify(s.id)

                    return (
                      <button
                        key={key}
                        className={SeasonalityQuickFilter}
                        data-active={active}
                        onClick={() => onSeasonalityQuickFilter(s.id)}
                        style={assignInlineVars({
                          [quickFilterStateColorVar]: s.color,
                        })}
                        data-testid="seasonality-quick-filter"
                      >
                        <span className={SeasonalityQuickFilterText}>
                          {s.label}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            )}

            <VFTab
              activeMaster={activeMaster}
              themeUi={themeUi}
              onTabChange={handleTabChange}
              onTabClose={handleTabClose}
              newTabTitle="Add Master"
              newTabIcon="/assets/img/VectorFLOW/NMS/add-circle.svg"
              newTabHandler={addNewMaster}
            >
              {(activeMaster.progress === "default" ||
                activeMaster.progress === "view" ||
                activeMaster.progress === "phaseInPhaseOut" ||
                activeMaster.progress === "seasonality") && (
                <div
                  className={SCFilterContainer}
                  style={{ zoom: "var(--nms-filter-zoom)" }}
                >
                  <div className={SCFilterControls} style={{ zIndex: 3 }}>
                    <legend className={SCLegend}>Filter</legend>
                    {activeMaster.filters.map((f: Filter) => {
                      if (f.masterId == activeMaster?.id) {
                        return (
                          <VFFilter
                            onDelete={() => handleOnDeleteFilter(f.id)}
                            operators={operators}
                            filters={activeMaster.filters}
                            fields={generateOptions([activeMaster])}
                            currFilter={f}
                            key={f.id}
                            isDisabled={false}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className={SCFilterAddControls}>
                    {activeMaster.filters.map((f: Filter, index: number) => {
                      if (f.masterId === activeMaster?.id && index === 0) {
                        return (
                          <div
                            key={`add-${f.id}`}
                            className={SCFilterAddButtonWrapper}
                          >
                            <img
                              className={SCFilterAddButton}
                              onClick={handleOnAddFilter}
                              src={
                                themeUi === "REGALBLAZE"
                                  ? "/assets/img/VectorFLOW/NMS/add-filter-regal.svg"
                                  : "/assets/img/VectorFLOW/NMS/add-filter.svg"
                              }
                              data-testid="add-filter"
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div className={SCFilterSeperator} />
                  <div className={SCFilterButtonGroup}>
                    <VFButton
                      themeUi={themeUi}
                      onClick={() => handleApplyFilter()}
                      disabled={false}
                    >
                      Apply Filter
                    </VFButton>
                    <VFButtonOutline
                      onClick={() => handleApplyFilter(true)}
                      themeUi={themeUi}
                    >
                      Show All
                    </VFButtonOutline>
                  </div>
                </div>
              )}

              <VFTable
                ref={ref}
                columnDefs={activeMaster.colDefs}
                suppressMovableColumns={suppressMovable}
                rowData={activeMaster.rowData}
                {...agGridProps}
                suppressPaginationPanel={!isDataAvailableLocally}
                statusBar={{
                  statusPanels: isDataAvailableLocally
                    ? [
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
                        { statusPanel: CustomStatusPanel, align: "right" },
                      ]
                    : [],
                }}
                height={getMDMTableHeight(activeMaster)}
                onFilterChanged={() => {
                  const filterModel = ref?.current?.api?.getFilterModel();
                  if (filterModel && Object.keys(filterModel).length > 0) {
                    setIsDisabled(false);
                  } else {
                    setIsDisabled(true);
                  }
                }}
              />
              {!["default"].includes(activeMaster.progress) &&
                !isDataAvailableLocally &&
                !isSelectMasterOpen && (
                  <VFPagination
                    resetGridRef={ref}
                    selectedRows={selectedRowsCount}
                    totalRows={recordCount}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={(e) => handleChangePage(e)}
                    isDisabled={isDisabled}
                  />
                )}
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
            </VFTab>
          </React.Fragment>
        )}
      </div>
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
      {isUploadModalOpen && (
        <UploadModal
          header={"Modification"}
          openModal={isUploadModalOpen}
          onCloseModal={() => {
            setFile(undefined);
            toggleUploadModal(false);
          }}
          onDownload={()=>exportToExcel("VIEW_MODIFY",true,)} 
          onUpload={async () => {
            await onUploadMaster(RECORD_UPLOAD_LIMIT);
          }}
          inputText={downloadFileName}
          setInputText={handleFileNameChange}
          file={file}
          setFile={setFile}
          uploadButtonStatus={false}
        />
      )}
      {isConflictModalOpen && (
        <SubmitConflictModal
          totalCount={activeMaster.rowData.length}
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
      {isSeasonalityChartModalOpen && (
        <SeasonalityChartModal
          isModalOpen={isSeasonalityChartModalOpen}
          closeModal={() => toggleSeasonalityChartModal(false)}
          chartData={chartData}
          rowData={seasonalityRowData}
          normChangeData={normChangeData}
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
        <div style={{ zoom: "var(--nms-filter-zoom)" }}>
          <VFTaskBar
            disableStopSeasonality={() => {
              const selectedRows = ref.current?.api.getSelectedRows() || [];
              if (selectedRows.length === 0) return true;

              let error = false;
              selectedRows.forEach((row: any) => {
                if (!validStopStatuses.includes(row.sts)) error = true;
              });

              return error;
            }}
            disableResumeSeasonality={() => {
              const selectedRows = ref.current?.api.getSelectedRows() || [];
              if (selectedRows.length === 0) return true;

              let error = false;
              selectedRows.forEach((row: any) => {
                if (!validResumeStatuses.includes(row.sts)) error = true;
              });

              return error;
            }}
            showSubmittedExportError={
              activeMaster?.rowData.length > 0 && errorCount > 0
            }
            masterProgress={activeMaster.progress}
            disableSubmit={
              activeMaster.rowData?.length === 0 || isSubmitDisabled
            }
            enableEditOnlineReset={enableEditOnlineReset}
            disableDeleteSelected={activeMaster.rowData?.length < 1}
            onReset={onReset}
            onSaveToDraft={onSaveToDraft}
            isSavingToDraft={isSavingToDraft ?? false}
            onEditOnlineSave={onEditOnlineSave}
            editOnline={editOnline}
            onEditOnline={() => onEditOnline("editOnline")}
            onBack={() => onBackButton(location?.state?.backUrl)}
            onBack1={() => onBackButton1(location?.state?.backUrl)}
            onClearAndExportErrors={onClearExportError}
            onModifyData={() => toggleUploadModal(true)}
            onExportData={() => exportToExcel("EXPORT",true)}
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
            DataCount={activeMaster.rowData?.length}
            onDiscardDraftCallback={onDiscardDraftCallback}
            showExportErrors={
              activeMaster.rowData?.find(
                (rowdata) => rowdata.error && rowdata.error !== ""
              )
                ? true
                : false
            }
          />
        </div>
      )}
    </>
  );
};

export default ViewModify;
