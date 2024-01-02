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

import { useUserData } from "../../../../../context";
import {getUploadModalRadioButtons } from "../../../../../helpers/utils";



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
        onSubmit,
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
              
          </SCContainer>
          {isUploadModalOpen && 
          <UploadModal 
            openModal={isUploadModalOpen} 
            onCloseModal={()=>{return}} 
            onDownload={()=>ref.current?.api.exportDataAsExcel({
              fileName:downloadFileName.length>0?downloadFileName :activeMaster.name,
            })} 
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
          />
        }
        </React.Fragment>
    )
}

export default AddRecord;