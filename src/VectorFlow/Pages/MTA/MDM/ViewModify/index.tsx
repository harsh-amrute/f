import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { SCContainer, SCFilterContainer, SCFilterControls, SCLegend, SCFilterAddControls, SCFilterAddButton, SCFilterAddButtonWrapper, SCFilterSeperator, SCFilterButtonGroup, SeasonalityQuickFilterWrapper, SeasonalityQuickFilter, SeasonalityQuickFilterHeader, SeasonalityQuickFilterText } from "./styles";
import { useUserData } from "../../../../../context";
import SelectMaster from "../../../../../components/VectorFLOW/layouts/SelectMaster";
import { generateOptions } from "../../../../../helpers/utils";
import VFTab from "../../../../../components/VectorFLOW/commons/VFTab";
import VFFilter from "../../../../../components/VectorFLOW/commons/VFFilter";
import useViewModify from "./useViewModify"; 
import { operators, seasonalityQuickFilterData } from "../../../../../helpers/MDMConstants";
import {SeasonalityQuickFilterType, type Filter} from '../../../../types/MDM';
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import WarningModal from './WarningModal'
import UploadModal from "./UploadModal";
import React, { useEffect } from "react";
import VFTaskBar from "./VFTaskbar";
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";
import SeasonalityChartModal from "./SeasonalityChartModal";
import SubmitConflictModal from "./SubmitConflictModal";
import VFOverlay from "../../../../../components/VectorFLOW/commons/VFOverlay";
import _ from "lodash";



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
        submittedDataCount

    } = useViewModify('modify');


    
    useEffect(()=>{
      if(ref.current && ref.current.api){
        if(isTableDataLoading){
          ref.current?.api.showLoadingOverlay();
        }
        else{
          ref.current?.api.hideOverlay();
        }
      }
    },[isTableDataLoading])

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
                handleSubmit={()=>{handleSelectMasterSubmit()}}
            />
          }
          {!isSelectMasterOpen && 
          <React.Fragment>
            {
              activeMaster.id==10
              &&
              <SeasonalityQuickFilterWrapper>
                <SeasonalityQuickFilterHeader>
                  Quick Filters - 
                </SeasonalityQuickFilterHeader>
                {seasonalityQuickFilterData.map((s:SeasonalityQuickFilterType)=>{
                  return(
                    <SeasonalityQuickFilter stateColor={s.color} onClick={()=>onSeasonalityQuickFilter(s.id)} isActive={seasonalityActiveQuickFilter.find((state)=>JSON.stringify(state)===JSON.stringify(s.id))?true:false} data-testid="seasonality-quick-filter">
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
                { (activeMaster.progress ==='default' || activeMaster.progress ==='view') 
                    &&
                  <SCFilterContainer>
                    <SCFilterControls>
                      <SCLegend>Filter</SCLegend>
                      {activeMaster.filters.map((f:Filter)=>{
                        if(f.masterId==activeMaster?.id){
                          return(
                            <VFFilter 
                              onDelete={()=>handleOnDeleteFilter(f.id)}
                              operators={operators}
                              filters={activeMaster.filters}
                              fields={generateOptions([activeMaster])}
                              currFilter={f}
                              key={f.id}
                              isDisabled={activeMaster.id > 14}
                            />
                          )
                        }
                      })}
                      
                    </SCFilterControls>
                    <SCFilterAddControls>
                      {activeMaster.filters.map((f:Filter,index:number)=>{
                          if(f.masterId===activeMaster?.id && index===0){
                            return (
                              <SCFilterAddButtonWrapper>
                                <SCFilterAddButton
                                  onClick={handleOnAddFilter}
                                  src="/assets/img/VectorFLOw/NMS/add-filter.svg"
                                  key={f.id}
                                  data-testid="add-filter"
                                />
                              </SCFilterAddButtonWrapper>
                              
                            )
                          }
                        })}
                    </SCFilterAddControls>
                    <SCFilterSeperator/>
                    <SCFilterButtonGroup>
                      <VFButton
                      themeUi={themeUi}
                      onClick={()=>{handleApplyFilter()}}
                      disabled={activeMaster.id > 14}
                      >
                        Apply Filter
                      </VFButton>
                      <VFButtonOutline
                        onClick={()=>{handleApplyFilter(true)}}
                        themeUi={themeUi}
                        
                      >
                        Show All
                      </VFButtonOutline>
                    </SCFilterButtonGroup>
                  </SCFilterContainer>
                }
                <VFTable
                  ref={ref}
                  columnDefs={activeMaster.colDefs}
                  rowData={activeMaster.rowData}
                  {...agGridProps}
                  suppressPaginationPanel={!isDataAvailableLocally}
                  statusBar={{
                    statusPanels: isDataAvailableLocally?[
                      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                      { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                      { statusPanel: 'agAggregationComponent', align: 'left' },
                    ]:
                    [],
                  }}
                  height={activeMaster.rowData.length > 0 ? activeMaster.progress==='view' ? "65%" : "95%" : "75%"}
                />
                {
            (!['default'].includes(activeMaster.progress) && (!isDataAvailableLocally && !isSelectMasterOpen))
              && 
              <VFPagination 
                selectedRows={selectedRowsCount} 
                totalRows={recordCount} 
                currentPage={currentPage} 
                rowsPerPage={rowsPerPage} 
                handleChangePage={(e)=>handleChangePage(e)}  
              />
          }
                {/* <VFTable
                  ref={veryTempRef}
                  columnDefs={activeMaster.colDefs}
                  rowData={activeMaster.rowData}
                  enableBrowserTooltips={true}
                /> */}
                <div style={{display:'none'}}>                
                  <VFTable
                    ref={tempRef}
                    rowData={tempGridData}
                    {...tempAgGridProps}
                  />
                </div>

            </VFTab>
          </React.Fragment>
          }
          
          
        </SCContainer>
        {isWarningModalOpen && 
          <WarningModal 
            count={recordCount} 
            onCloseModal={onWarningModalClose} 
            onFailure={onWarningModalClose} 
            onSuccess={()=>onWarningModalSuccess()}
            showAll={isShowAll}
            rowsPerPage={rowsPerPage}
            />
        }
        {isUploadModalOpen && 
          <UploadModal 
            header={"Modification"}
            openModal={isUploadModalOpen} 
            onCloseModal={()=>toggleUploadModal(false)} 
            onDownload={()=>exportToExcel(true)} 
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
            onCloseModal={()=>{return}}

          />
        }
        {isSeasonalityChartModalOpen && 
          <SeasonalityChartModal 
            isModalOpen={isSeasonalityChartModalOpen}
            closeModal={()=>toggleSeasonalityChartModal(false)}
            chartData={chartData}
            rowData={seasonalityRowData}
            normChangeData={normChangeData}

          />
        }
        {
          isOverlayVisible && (
            <VFOverlay>
             <h1 style={{backgroundColor:"white",padding:'15px',borderRadius:'8px'}}>Validating Data. Please Wait this might take some time....</h1>
            </VFOverlay>
          )
        }
        {
          !isSelectMasterOpen && 
          <VFTaskBar
            disableStopSeasonality={()=>{
              const flatState=_.flatMap(seasonalityActiveQuickFilter)
              let error = false;
              flatState.map((state:number)=>{
                if(!validStopStatuses.includes(state)) error = true;
              })
              if(error) return true;
              
              return false;
             
             }}

            disableResumeSeasonality={()=>{
              const flatState=_.flatMap(seasonalityActiveQuickFilter)
              let error = false;
              flatState.map((state:number)=>{
                if(!validResumeStatuses.includes(state)) error = true;
              })
              if(error) return true;
              
              return false;
            }}
            showSubmittedExportError={errorCount>0}
            masterProgress={activeMaster.progress}
            disableSubmit={activeMaster.rowData.length===0}
            enableEditOnlineReset = {enableEditOnlineReset}
            disableDeleteSelected={activeMaster.rowData.length < 1}
            onReset={onReset}
            onSaveToDraft={onSaveToDraft}
            onEditOnlineSave={onEditOnlineSave}
            editOnline={editOnline}
            onEditOnline={()=>onEditOnline('editOnline')}
            onBack={onBackButton}
            onClearAndExportErrors={onClearExportError}
            onModifyData={()=>toggleUploadModal(true)}
            onExportData={exportToExcel}
            onSubmit={onSubmit}
            onSubmitConflictData={()=>onSubmit(true)}
            onDeleteSelected={deleteSelected}
            onSeasonalityResume={()=>onSeasonalityStatusUpdate('resume')}
            onSeasonalityStop={()=>onSeasonalityStatusUpdate('stop')}
            onPhaseInPhaseOutStop={() => onPIPOStatusUpdate()}
            onDeleteData={()=>console.log('')}
            onDeleteOnlineReset={()=>console.log('')}
            onDeleteOnlineSubmit={()=>console.log('')}
            onDeleteOnline={()=>console.log('')}
            masterId={activeMaster.id}
          />
        }
        
      </>
    )
  }
  
  export default ViewModify
  