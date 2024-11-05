import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { SCContainer, SCFilterContainer, SCFilterControls, SCLegend, SCFilterAddControls, SCFilterAddButton, SCFilterAddButtonWrapper, SCFilterSeperator, SCFilterButtonGroup, SeasonalityQuickFilterWrapper, SeasonalityQuickFilter, SeasonalityQuickFilterHeader, SeasonalityQuickFilterText, MTOPoogiTableContainer, PoogiSection, PoogiAddButtonWrapper } from "./styles";
import { useUserData } from "../../../../../context";
import SelectMaster from "../../../../../components/VectorFLOW/layouts/SelectMaster";
import { generateOptions } from "../../../../../helpers/utils";
import VFTab from "../../../../../components/VectorFLOW/commons/VFTab";
import VFFilter from "../../../../../components/VectorFLOW/commons/VFFilter";
import useViewModify from "./useViewModify";
import { operators, seasonalityQuickFilterData } from "../../../../../helpers/MDMConstants";
import { SeasonalityQuickFilterType, type Filter } from '../../../../types/MDM';
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import WarningModal from './WarningModal'
import UploadModal from "./UploadModal";
import React, { useEffect} from "react";
import VFTaskBar from "./VFTaskbar";
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";
import SeasonalityChartModal from "./SeasonalityChartModal";
import SubmitConflictModal from "./SubmitConflictModal";
import VFOverlay from "../../../../../components/VectorFLOW/commons/VFOverlay";
import _ from "lodash";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import { ColorsMTO } from "../../../../../VectorFlow/Pages/MTO/Common/Colors";
import { } from '../../../../Services/MTA/MDM'



const ViewModify = () => {
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
    addRowToMtoGrid,
    onMTOSaveBufferData,
    onMTOSaveAsDraft,
    MTOPoogiMajorColdef,
    MTOPoogiMinorColdef,
    onMajReasonSelected,
    minReasonRowData

  } = useViewModify('modify');


  useEffect(() => {
    if (ref.current && ref.current.api) {
      if (isTableDataLoading) {
        ref.current?.api.showLoadingOverlay();
      }
      else {
        ref.current?.api.hideOverlay();
      }
    }
  }, [isTableDataLoading])

  return (
    <>
      <SCContainer>
        {isSelectMasterOpen &&
          <SelectMaster
            data={allMastersState}
            options={options}
            selectedOptions={selectedOptions}
            filterButtonStatus={filterButtonStatus}
            setFilterButtonStatus={setFilterButtonStatus}
            themeUi={themeUi}
            isLoading={isLoading}
            handleSubmit={() => { handleSelectMasterSubmit() }}
          />
        }
        {!isSelectMasterOpen &&
          <React.Fragment>
            {
              activeMaster.id == 10
              &&
              <SeasonalityQuickFilterWrapper>
                <SeasonalityQuickFilterHeader>
                  Quick Filters -
                </SeasonalityQuickFilterHeader>
                {seasonalityQuickFilterData.map((s: SeasonalityQuickFilterType) => {
                  return (
                    <SeasonalityQuickFilter stateColor={s.color} onClick={() => onSeasonalityQuickFilter(s.id)} isActive={seasonalityActiveQuickFilter.find((state) => JSON.stringify(state) === JSON.stringify(s.id)) ? true : false} data-testid="seasonality-quick-filter">
                      <SeasonalityQuickFilterText>
                        {s.label}
                      </SeasonalityQuickFilterText>
                    </SeasonalityQuickFilter>
                  )
                })}
              </SeasonalityQuickFilterWrapper>
            }
            <VFTab
              activeMaster={activeMaster}
              themeUi={themeUi}
              onTabChange={handleTabChange}
              onTabClose={handleTabClose}
              newTabTitle={"Add Master"}
              newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
              newTabHandler={addNewMaster}
            >
              {(activeMaster.progress === 'default' || activeMaster.progress === 'view')
                &&
                <SCFilterContainer>
                  <SCFilterControls>
                    <SCLegend>Filter</SCLegend>
                    {
                      activeMaster.filters.map((f: Filter) => {
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
                          )
                        }
                      })}

                  </SCFilterControls>
                  <SCFilterAddControls>
                    {activeMaster.filters.map((f: Filter, index: number) => {
                      if (f.masterId === activeMaster?.id && index === 0) {
                        return (
                          <SCFilterAddButtonWrapper>
                            <SCFilterAddButton
                              onClick={handleOnAddFilter}
                              src={themeUi === "REGALBLAZE" ? "/assets/img/VectorFLOW/NMS/add-filter-regal.svg" : "/assets/img/VectorFLOW/NMS/add-filter.svg"}
                              key={f.id}
                              data-testid="add-filter"
                            />
                          </SCFilterAddButtonWrapper>

                        )
                      }
                    })}
                  </SCFilterAddControls>
                  <SCFilterSeperator />
                  <SCFilterButtonGroup>
                    <VFButton
                      themeUi={themeUi}
                      onClick={() => { handleApplyFilter() }}
                      disabled={false}
                    >
                      Apply Filter
                    </VFButton>
                    <VFButtonOutline
                      onClick={() => { handleApplyFilter(true) }}
                      themeUi={themeUi}

                    >
                      Show All
                    </VFButtonOutline>
                  </SCFilterButtonGroup>
                </SCFilterContainer>
              }
              {
                (activeMaster?.isMTO && (activeMaster?.id===503)) ?
                <PoogiSection>

                <MTOPoogiTableContainer style={{display: 'flex', height: '50%', flex: '1'}}>
                 <VFTable
                ref={ref}
                columnDefs={MTOPoogiMajorColdef}
                rowData={activeMaster.rowData}
                {...agGridProps}
                suppressPaginationPanel={!isDataAvailableLocally}
                statusBar={{
                  statusPanels: isDataAvailableLocally ? [
                    { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                    { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                    { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                      { statusPanel: 'agAggregationComponent', align: 'left' },
                    ] :
                    [],
                  }}
                  rowSelection ={"single"}
                  suppressRowClickSelection={false}
                  onSelectionChanged={onMajReasonSelected}
                  height={activeMaster.rowData.length > 0 ? activeMaster.progress === 'view' ? "90%" : "95%" : "90%"}
                  />
                 <VFTable
              
                columnDefs={MTOPoogiMinorColdef}
                rowData={minReasonRowData}
                  {...agGridProps}
                  suppressPaginationPanel={!isDataAvailableLocally}
                  statusBar={{
                    statusPanels: isDataAvailableLocally ? [
                      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                      { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                      { statusPanel: 'agAggregationComponent', align: 'left' },
                    ] :
                      [],
                    }}
                  height={activeMaster.rowData.length > 0 ? activeMaster.progress === 'view' ? "90%" : "95%" : "90%"}
                  overlayNoRowsTemplate={"Select a major reason to see the corresponding minor reason"}
                  />
                </MTOPoogiTableContainer>
                    <PoogiAddButtonWrapper>
                    <button
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '130px',
                    margin: '10px',
                    cursor: 'pointer',
                    background: '#fff'
                  }}
                  onClick={() => { (!activeMaster.colDefs.some((x) => x.field === 'actions')) && (addRowToMtoGrid()) }}
                >
                  {(!(activeMaster.colDefs.some((x) => x.field === 'actions'))) ?
                    <>
                      <img
                        src="/assets/img/AddBufferMasterIcon.svg"
                        alt="Add Master Button"
                      />
                      <p style={{ fontSize: '14px', color: ColorsMTO.Pink.code }}>Add Major Reason</p>
                    </>
                    :
                    <>
                      <img
                        src="/assets/img/AddBufferMasterIconGrey.svg"
                        alt="Add Master Button"
                      />
                      <p style={{ fontSize: '14px', color: ColorsMTO.LightGrey.code }}>Add Major Reason</p>
                    </>
                  }
                </button>
                <button
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '130px',
                    margin: '10px',
                    cursor: 'pointer',
                    background: '#fff'
                  }}
                  onClick={() => { (!activeMaster.colDefs.some((x) => x.field === 'actions')) && (addRowToMtoGrid()) }}
                >
                  {(!(activeMaster.colDefs.some((x) => x.field === 'actions'))) ?
                    <>
                      <img
                        src="/assets/img/AddBufferMasterIcon.svg"
                        alt="Add Master Button"
                      />
                      <p style={{ fontSize: '14px', color: ColorsMTO.Pink.code }}>Add Minor Reason</p>
                    </>
                    :
                    <>
                      <img
                        src="/assets/img/AddBufferMasterIconGrey.svg"
                        alt="Add Master Button"
                      />
                      <p style={{ fontSize: '14px', color: ColorsMTO.LightGrey.code }}>Add Minor Reason</p>
                    </>
                  }
                </button>

                    </PoogiAddButtonWrapper>
                </PoogiSection>

                :

                <VFTable
                ref={ref}
                columnDefs={activeMaster.colDefs}
                  rowData={activeMaster.rowData}
                  {...agGridProps}
                  suppressPaginationPanel={!isDataAvailableLocally}
                  statusBar={{
                    statusPanels: isDataAvailableLocally ? [
                      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                      { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                      { statusPanel: 'agAggregationComponent', align: 'left' },
                    ] :
                      [],
                  }}
                  height={activeMaster.rowData.length > 0 ? activeMaster.progress === 'view' ? "65%" : "95%" : "75%"}
                  />
                }
              {
                (!['default'].includes(activeMaster.progress) && (!isDataAvailableLocally && !isSelectMasterOpen))
                &&
                <VFPagination
                  selectedRows={selectedRowsCount}
                  totalRows={recordCount}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={(e) => handleChangePage(e)}
                />
              }
              {/* <VFTable
                  ref={veryTempRef}
                  columnDefs={activeMaster.colDefs}
                  rowData={activeMaster.rowData}
                  enableBrowserTooltips={true}
                /> */}
              <div style={{ display: 'none' }}>
                <VFTable
                  ref={tempRef}
                  rowData={tempGridData}
                  {...tempAgGridProps}
                />
              </div>
              {activeMaster.isMTO && activeMaster.id!==503 &&
                <button
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '130px',
                    margin: '10px',
                    cursor: 'pointer',
                    background: '#fff'
                  }}
                  onClick={() => { (!activeMaster.colDefs.some((x) => x.field === 'actions')) && (addRowToMtoGrid()) }}
                >
                  {(!(activeMaster.colDefs.some((x) => x.field === 'actions'))) ?
                    <>
                      <img
                        src="/assets/img/AddBufferMasterIcon.svg"
                        alt="Add Master Button"
                      />
                      <p style={{ fontSize: '18px', color: ColorsMTO.Pink.code }}>Add {activeMaster.name}</p>
                    </>
                    :
                    <>
                      <img
                        src="/assets/img/AddBufferMasterIconGrey.svg"
                        alt="Add Master Button"
                      />
                      <p style={{ fontSize: '18px', color: ColorsMTO.LightGrey.code }}>Add {activeMaster.name}</p>
                    </>
                  }
                </button>
              }
            </VFTab>
          </React.Fragment>
        }


      </SCContainer>
      {isWarningModalOpen &&
        <WarningModal
          count={tempRecordCount}
          onCloseModal={onWarningModalClose}
          onFailure={onWarningModalClose}
          onSuccess={() => onWarningModalSuccess()}
          showAll={isShowAll}
          rowsPerPage={rowsPerPage}
        />
      }
      {isUploadModalOpen &&
        <UploadModal
          header={"Modification"}
          openModal={isUploadModalOpen}
          onCloseModal={() => toggleUploadModal(false)}
          onDownload={() => exportToExcel(true)}
          onUpload={onUploadMaster}
          inputText={downloadFileName}
          setInputText={setDownloadFileName}
          file={file}
          setFile={setFile}
          uploadButtonStatus={false}
        />
      }
      {isConflictModalOpen &&
        <SubmitConflictModal
          totalCount={activeMaster.rowData.length}
          modificationCount={conflictCount}
          errorCount={errorCount}
          recordCount={submittedDataCount}
          onSuccess={onReviewConflicts}
          onFailure={onIgnoreSubmitErrors}
          onCloseModal={() => { return }}

        />
      }
      {isSeasonalityChartModalOpen &&
        <SeasonalityChartModal
          isModalOpen={isSeasonalityChartModalOpen}
          closeModal={() => toggleSeasonalityChartModal(false)}
          chartData={chartData}
          rowData={seasonalityRowData}
          normChangeData={normChangeData}

        />
      }
      {
        isOverlayVisible && (
          <VFOverlay>
            <div style={{ backgroundColor: 'white', borderRadius: '6px' }}>
              <VFLoader />
              <h1 style={{ backgroundColor: "white", padding: '15px', borderRadius: '8px' }}>Validating Data. Please Wait this might take some time.... {((uploadProgress === '' || parseInt(uploadProgress) === 0)) ? '' : 'Progress: ' + uploadProgress + ' / ' + totalProgress}</h1>
            </div>
          </VFOverlay>
        )
      }
      {
        !isSelectMasterOpen &&
        <VFTaskBar
          disableStopSeasonality={() => {
            const flatState = _.flatMap(seasonalityActiveQuickFilter)
            let error = false;
            flatState.map((state: number) => {
              if (!validStopStatuses.includes(state)) error = true;
            })
            if (error) return true;

            return false;

          }}

          disableResumeSeasonality={() => {
            const flatState = _.flatMap(seasonalityActiveQuickFilter)
            let error = false;
            flatState.map((state: number) => {
              if (!validResumeStatuses.includes(state)) error = true;
            })
            if (error) return true;

            return false;
          }}
          showSubmittedExportError={errorCount > 0}
          masterProgress={activeMaster.progress}
          disableSubmit={activeMaster.rowData.length === 0}
          enableEditOnlineReset={enableEditOnlineReset}
          disableDeleteSelected={activeMaster.rowData.length < 1}
          onReset={onReset}
          onSaveToDraft={activeMaster.isMTO? onMTOSaveAsDraft :onSaveToDraft}
          onEditOnlineSave={onEditOnlineSave}
          editOnline={editOnline}
          onEditOnline={() => onEditOnline('editOnline')}
          onBack={onBackButton}
          onClearAndExportErrors={onClearExportError}
          onModifyData={() => toggleUploadModal(true)}
          onExportData={exportToExcel}
          onSubmit={onSubmit}
          onSubmitConflictData={() => onSubmit(true)}
          onDeleteSelected={deleteSelected}
          onSeasonalityResume={() => onSeasonalityStatusUpdate('resume')}
          onSeasonalityStop={() => onSeasonalityStatusUpdate('stop')}
          onPhaseInPhaseOutStop={() => onPIPOStatusUpdate()}
          onDeleteData={() => console.log('')}
          onDeleteOnlineReset={() => console.log('')}
          onDeleteOnlineSubmit={() => console.log('')}
          onDeleteOnline={() => console.log('')}
          masterId={activeMaster.id}
          mtoSaveData={true}
          onMTOSaveData={ onMTOSaveBufferData}
          isMTOSaveDataDisabled={(activeMaster.rowData.length === tempRecordCount) || (activeMaster.colDefs.some((x) => x.field === 'actions'))                                 }
          onMTOSaveAsDraft={onMTOSaveAsDraft}
        />
      }

    </>
  )
}

export default ViewModify