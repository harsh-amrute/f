import React,{ useEffect } from "react";


import useDelete from "./useDelete";
import useViewModify from "../ViewModify/useViewModify";
import { useUserData } from "../../../../../context";


import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import SelectGroupedMasters from "../../../../../components/VectorFLOW/layouts/SelectGroupedMasters";
import { SCContainer, SCFilterContainer, SCFilterControls, SCLegend, SCFilterAddControls, SCFilterAddButton, SCFilterAddButtonWrapper, SCFilterSeperator, SCFilterButtonGroup} from "../ViewModify/styles";
import VFTab from "../../../../../components/VectorFLOW/commons/VFTab";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import UploadModal from "../ViewModify/UploadModal";
import WarningModal from "../ViewModify/WarningModal";
import VFTaskBar from "../ViewModify/VFTaskbar";
import VFFilter from "../../../../../components/VectorFLOW/commons/VFFilter";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";


import { getUploadModalRadioButtons,generateOptions } from "../../../../../helpers/utils";
import { Filter } from "../../../../../VectorFlow/types/MDM";
import { operators } from "../../../../../helpers/MDMConstants";



const DeleteRecord = () => {

  const {user} = useUserData()
  const themeUi = user?.user?.theme_ui;
 

    const {
        isSelectMasterOpen,
        activeMaster,
        handleTabChange,
        handleTabClose,
        addNewMaster,
        handleOnAddFilter,
        handleOnDeleteFilter,
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
        file,
        setFile,
        isTableDataLoading,
        exportToExcel,
        onClearExportError,
        agGridProps,
        ref,
        tempRef,
        tempAgGridProps,
        tempGridData,
        deleteSelected,
        editOnline,
        isShowAll,
        onSaveToDraft,
        selectedRowsCount,
        currentPage,
        rowsPerPage,
        handleChangePage,
        onReset,
        onEditOnlineSave,
        onDeleteOnlineSave,
        onBackButton,
    } = useViewModify('remove');
    

    const {
        onCancel,
        allMasters,
        selectedMasters,
        onDeleteData,
        onSubmit,
        onDeleteOnline,
        onDeleteOnlineSubmit,
        onDeleteOnlineReset,
        handleOnClickMaster,
        handleSubmitSelectMaster,
        handleRadioButton
    } = useDelete();

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


    if(isLoading){
        return <VFLoader/>
    }

    if(isSelectMasterOpen){
      return(
          <SelectGroupedMasters  
              onSubmit={handleSubmitSelectMaster}  
              onCancel={onCancel}
              handleOnClickMaster={handleOnClickMaster}
              allMasters={allMasters}
              selectedMasters={selectedMasters}
              text="delete"
          />
      )
    }

    return(
        <React.Fragment>
          <SCContainer>
              <VFTab 
                activeMaster={activeMaster}
                themeUi={themeUi}
                onTabChange={handleTabChange}
                onTabClose={(e)=>handleTabClose(e,activeMaster)}
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
                            />
                          )
                        }
                      })}
                      
                    </SCFilterControls>
                    <SCFilterAddControls>
                      {activeMaster.filters.map((f:Filter)=>{
                          if(f.masterId===activeMaster?.id){
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
                  />
                  <div style={{display:'none'}}>                
                    <VFTable
                      ref={tempRef}
                      rowData={tempGridData}
                      {...tempAgGridProps}
                    />
                  </div>

              </VFTab>
              {
                (!['default'].includes(activeMaster.progress) && !isSelectMasterOpen) 
                  && 
                  <VFPagination 
                    selectedRows={selectedRowsCount} 
                    totalRows={recordCount} 
                    currentPage={currentPage} 
                    rowsPerPage={rowsPerPage} 
                    handleChangePage={(e)=>handleChangePage(e)}  
                  />
              }
          </SCContainer>

          {isWarningModalOpen && 
          <WarningModal 
          showAll={isShowAll}
            count={recordCount} 
            onCloseModal={onWarningModalClose} 
            onFailure={onWarningModalClose} 
            onSuccess={onWarningModalSuccess}
            />
        }
          {isUploadModalOpen && 
          <UploadModal 
            header={"Deletion"}
            openModal={isUploadModalOpen} 
            onCloseModal={()=>{toggleUploadModal(false)}} 
            onDownload={() => exportToExcel(true)} 
            onUpload={()=>{
              onUploadMaster()
            }}
            inputText={downloadFileName}
            setInputText={setDownloadFileName}
            file={file}
            setFile={setFile}
            uploadButtonStatus={false}
            radioButtons={getUploadModalRadioButtons(activeMaster.id)}
            handleRadioButton={handleRadioButton}
            />
        }
        
        {
          !isSelectMasterOpen && 
          <VFTaskBar
            masterProgress={activeMaster.progress}
            onReset={onReset}
            onSaveToDraft={onSaveToDraft}
            onEditOnlineSave={onEditOnlineSave}
            editOnline={false}
            deleteOnline={editOnline}
            onBack={onBackButton}
            onClearAndExportErrors={onClearExportError}
            onModifyData={()=>toggleUploadModal(true)}
            onExportData={exportToExcel}
            onSubmit={onSubmit}
            onDeleteSelected={deleteSelected}
            onEditOnline={()=>console.log('')}
            onPhaseInPhaseOutStop={()=>console.log('')}
            onSeasonalityResume={()=>console.log('')}
            onSeasonalityStop={()=>console.log('')}
            onSubmitConflictData={()=>console.log('')}
            onDeleteData={onDeleteData}
            onDeleteOnline={onDeleteOnline}
            onDeleteOnlineReset={onDeleteOnlineReset}
            onDeleteOnlineSave={onDeleteOnlineSave}
            onDeleteOnlineSubmit={onDeleteOnlineSubmit}
          />
        }
        </React.Fragment>
    ) 
}

export default DeleteRecord;