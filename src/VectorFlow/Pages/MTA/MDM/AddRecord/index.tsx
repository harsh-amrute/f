import React, { useEffect } from "react";

import SelectGroupedMasters from "../../../../../components/VectorFLOW/layouts/SelectGroupedMasters";


import useViewModify from "../ViewModify/useViewModify";
import useAdd from "./useAdd";


import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import VFTab from "../../../../../components/VectorFLOW/commons/VFTab";
import { SCContainer } from "../ViewModify/styles";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import UploadModal from "../ViewModify/UploadModal";
import VFTaskBar from "../ViewModify/VFTaskbar";
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";

import { useUserData } from "../../../../../context";
import {getUploadModalRadioButtons } from "../../../../../helpers/utils";
import { useDispatch } from "react-redux";
import { TOGGLE_SELECT_MASTER_SCREEN } from "../../../../../redux/actions/MDM";

import SubmitErrorModal from "./SubmitErrorModal";
import { MDMMasterState } from "../../../../types/MDM";

const AddRecord = () => {

    const {user} = useUserData()
    const themeUi = user?.user?.theme_ui;

    const {
        activeMaster,
        handleTabClose,
        addNewMaster,
        isLoading,
        toggleUploadModal,
        downloadFileName,
        setDownloadFileName,
        onUploadMaster,
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
        selectedRowsCount,
        recordCount,
        currentPage,
        rowsPerPage,
        handleChangePage,
        editOnline,
        onEditOnline,
        isUploadModalOpen,
        onReset,
        onSaveToDraft,
        onEditOnlineSave

    } = useViewModify('add');

    const {
      isSelectMasterOpen,
        handleSubmitSelectMaster,
        onCancel,
        allMasters,
        selectedMasters,
        handleOnClickMaster,
        handleRadioButton,
        handleTabChange,
        onSubmit,
        isConflictModalOpen,
        onIgnoreSubmitErrors,
        conflictCount,
        errorCount
        
    } = useAdd()
    
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
              onSubmit={handleSubmitSelectMaster}  //console.log()
              onCancel={onCancel}
              handleOnClickMaster={handleOnClickMaster}
              allMasters={allMasters}
              selectedMasters={selectedMasters}
              text="add"
          />
      )
    }
    const dispatch = useDispatch();
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
          {isUploadModalOpen && 
          <UploadModal 
            header={"Addition"}
            openModal={isUploadModalOpen} 
            onCloseModal={()=>dispatch(TOGGLE_SELECT_MASTER_SCREEN(true))}
            // onDownload={()=>ref.current?.api.exportDataAsExcel({
            //   fileName:downloadFileName.length>0?downloadFileName :activeMaster.name,
            // })} 
            onDownload={()=>{
              const currentMaster = allMasters.find((master:MDMMasterState)=>master.id === activeMaster.id);
              if(currentMaster){
                ref.current?.api.exportDataAsExcel({fileName:downloadFileName ==='' ? currentMaster.name : downloadFileName});
              }
            }}
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
        {isConflictModalOpen && 
          <SubmitErrorModal 
            totalCount={activeMaster.rowData.length}
            errorCount={errorCount}
            recordCount={activeMaster.rowData.length - conflictCount - errorCount}
            onSuccess={onIgnoreSubmitErrors}
            onCloseModal={onIgnoreSubmitErrors}

          />
        }
        {
          !isSelectMasterOpen && 
          <VFTaskBar
            disableResumeSeasonality={()=>false}
            disableStopSeasonality={()=>false}
            masterProgress={activeMaster.progress}
            onReset={onReset}
            onSaveToDraft={onSaveToDraft}
            onEditOnlineSave={onEditOnlineSave}
            editOnline={editOnline}
            onEditOnline={onEditOnline}
            onBack={onBackButton}
            onClearAndExportErrors={onClearExportError}
            onModifyData={()=>toggleUploadModal(true)}
            onExportData={exportToExcel}
            onSubmit={onSubmit}
            onDeleteSelected={deleteSelected}
            onPhaseInPhaseOutStop={()=>console.log('')}
            onSeasonalityResume={()=>console.log('')}
            onSeasonalityStop={()=>console.log('')}
            onDeleteData={()=>console.log('')}
            onDeleteOnline={()=>console.log('')}
            onDeleteOnlineReset={()=>console.log('')}
            onDeleteOnlineSave={()=>console.log('')}
            onSubmitConflictData={()=>console.log('')}
            onDeleteOnlineSubmit={()=>console.log('')}
          />
        }
        </React.Fragment>
    )
}

export default AddRecord;