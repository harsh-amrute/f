import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { SCContainer, SCFilterContainer, SCFilterControls, SCLegend, SCFilterAddControls, SCFilterAddButton, SCFilterAddButtonWrapper, SCFilterSeperator, SCFilterButtonGroup, SeasonalityQuickFilterWrapper, SeasonalityQuickFilter, SeasonalityQuickFilterHeader, SeasonalityQuickFilterText, MTOPoogiTableContainer, PoogiSection, PoogiAddButtonWrapper } from "./styles";
import { useUserData } from "../../../../../context";
import SelectMaster from "../../../../../components/VectorFLOW/layouts/SelectMasterMTO";
import { areMasterFiltersValid, generateMTOFilterOptions} from "../../../../../helpers/utils";
import VFTab from "../../../../../components/VectorFLOW/commons/MTO/VFTab";
import VFFilter from "../../../../../components/VectorFLOW/commons/VFFilterMDM";
import useViewModify from "./useViewModify";
import { operators, seasonalityQuickFilterData } from "../../../../../helpers/MDMConstants";
import { SeasonalityQuickFilterType, type Filter } from '../../../../types/MDM';
import VFTable from "../../Common/VFTable";
import WarningModal from './WarningModal'
import React, {useEffect} from "react";
import VFTaskBar from "./VFTaskbar";
import SubmitConflictModal from "./SubmitConflictModal";
import VFOverlay from "../../../../../components/VectorFLOW/commons/VFOverlay";
import _ from "lodash";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import { ColorsMTO } from "../../../../../VectorFlow/Pages/MTO/Common/Colors";
import { } from '../../../../Services/MTA/MDM'
import { useSelector } from "react-redux";



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
    rowsPerPage,
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
    onMinReasonEditingStopped,
    addRowToMtoMinGrid

  } = useViewModify('modify');

  const bufferModifyData = useSelector((state: any)=> state.mto.bufferModifyData);
  const ccrModifyData = useSelector((state: any)=> state.mto.ccrModifyData);
  const editStatus:string = useSelector((state:any)=> state.mto.editStatus);




    
    useEffect(()=>{
      if(ref.current && ref.current.api){
        if(isTableDataLoading){
          ref.current?.api.showLoadingOverlay();
        }
        else{
          ref.current?.api.hideOverlay();
        }
      }
  }, [isTableDataLoading])

  return (
    <>
      <SCContainer>
        {isSelectMasterOpen &&
        <div  style={{zoom: 0.8}}>

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
        </div>
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
              newTabIcon={"/assets/img/VectorFLOW/BPR/add-circle.svg"}
              newTabHandler={addNewMaster}
              >
              {(activeMaster.progress === 'default' || activeMaster.progress === 'view')
                &&
                <SCFilterContainer style={{zoom: 0.8}}>
                  <SCFilterControls>
                    <SCLegend>Filter</SCLegend>
                    {
                      activeMaster.filters.map((f: Filter) => {
                        if (f.masterId == activeMaster?.id) {
                          return (
                            <VFFilter
                              onDelete={() => {handleOnDeleteFilter(f.id)}}
                              operators={operators}
                              filters={activeMaster.filters}
                              fields={generateMTOFilterOptions([activeMaster],activeMaster.filters)}
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
                              onClick={()=>{handleOnAddFilter()}}
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
                      disabled={!areMasterFiltersValid(activeMaster.filters)}
                      themeUi={themeUi}
                      onClick={() => { handleApplyFilter() }}
                    >
                      Apply Filter
                    </VFButton>
                    <VFButtonOutline
                      onClick={() => { handleApplyFilter(true) }}
                      themeUi={themeUi}

                    >
                      {areMasterFiltersValid(activeMaster.filters)?"Clear Filters":"Show All"}
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
                statusBar={{
                  statusPanels:  [
                    { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                    { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                    { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                      { statusPanel: 'agAggregationComponent', align: 'left' },
                    ] 
                  }}
                  rowSelection ={"single"}
                  suppressRowClickSelection={activeMaster.colDefs.some((colDef) => (colDef.field === 'actions'|| colDef.field==='pactions'))? true: false}
                  onSelectionChanged={onMajReasonSelected}
                  height={activeMaster.rowData.length > 0 ? activeMaster.progress === 'view' ? "90%" : "95%" : "90%"}
                  />
                 <VFTable
              
                columnDefs={MTOPoogiMinorColdef}
                rowData={minReasonRowData}
                  {...agGridProps}
                  statusBar={{
                    statusPanels: [
                      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                      { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                      { statusPanel: 'agAggregationComponent', align: 'left' },
                    ] 
                    }}
                  height={activeMaster.rowData.length > 0 ? activeMaster.progress === 'view' ? "90%" : "95%" : "90%"}
                  overlayNoRowsTemplate={"Select a major reason to see the corresponding minor reason"}
                  onCellEditingStopped={onMinReasonEditingStopped}
                  suppressRowClickSelection={true}
                  />
                </MTOPoogiTableContainer>
                    <PoogiAddButtonWrapper>
                    <button
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '90px',
                    margin: '8px',
                    cursor: 'pointer',
                    background: '#fff'
                  }}
                  onClick={() => { (!activeMaster.colDefs.some((x) => x.field === 'actions' || x.field==='pactions'))  && (addRowToMtoGrid()) }}
                >
                  {((!activeMaster.colDefs.some((x) => x.field === 'actions' || x.field==='pactions'))) ?
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
                  onClick={() => { (!activeMaster.colDefs.some((x) => x.field === 'actions' || x.field==='pactions')) && (ref && ref.current && ref?.current?.api?.getSelectedRows()?.length>0) && (addRowToMtoMinGrid()) }}
                >
                  {((!activeMaster.colDefs.some((x) => x.field === 'actions' || x.field==='pactions')) && (ref && ref.current && ref?.current?.api?.getSelectedRows()?.length>0)) ?
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
                  suppressPaginationPanel={false}
                  height={activeMaster.rowData.length > 0 ? activeMaster.progress === 'view' ? "65%" : "95%" : "75%"}
                  maintainColumnOrder
                  />
                }
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
                    justifyContent: 'left',
                    gap: '12px',
                    width: '110px',
                    margin: '8px',
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
                        height={14}
                        width={14}
                      />
                      <p style={{ fontSize: '12px', color: ColorsMTO.Pink.code }}>Add {activeMaster.name}</p>
                    </>
                    :
                    <>
                      <img
                       height={14}
                       width={14}
                        src="/assets/img/AddBufferMasterIconGrey.svg"
                        alt="Add Master Button"
                      />
                      <p style={{ fontSize: '12px', color: ColorsMTO.LightGrey.code }}>Add {activeMaster.name}</p>
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
        <div style={{zoom: 0.8}}>

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
          // masterProgress={(!bufferModifyData)?"initial":(bufferModifyData?"editOnline":"editOnlineSubmitted")}
          masterProgress={editStatus}
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
          onExportData={()=>{ref?.current?.api && ref?.current?.api.exportDataAsExcel({fileName: `${activeMaster.name} (MTO)`})}}
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
          isMTOSaveDataDisabled={(activeMaster.id===501 &&!(bufferModifyData && bufferModifyData.length>0)) || (activeMaster.id===502 && !(ccrModifyData && ccrModifyData.length>0))} 
          isMTODraftDisabled={(activeMaster.id===501 &&!(bufferModifyData && bufferModifyData.length>0)) || (activeMaster.id===502 && !(ccrModifyData && ccrModifyData.length>0))} 
          onMTOSaveAsDraft={onMTOSaveAsDraft}
          />
          </div>
      }

    </>
  )
}

export default MTOViewModify