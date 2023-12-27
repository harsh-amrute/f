import React, { useEffect } from "react";

import SelectGroupedMasters from "../../../../../components/VectorFLOW/layouts/SelectGroupedMasters";


import useViewModify from "../ViewModify/useViewModify";
import useAdd from "./useAdd";


import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import VFTab from "../../../../../components/VectorFLOW/commons/VFTab";
import VFFilter from "../../../../../components/VectorFLOW/commons/VFFilter";
import { SCContainer,SCFilterContainer,SCLegend,SCFilterControls,SCFilterAddButton,SCFilterButtonGroup,SCFilterAddControls,SCFilterAddButtonWrapper,SCFilterSeperator } from "../ViewModify/styles";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import UploadModal from "../ViewModify/UploadModal";
import VFTaskBar from "../ViewModify/VFTaskbar";

import { useUserData } from "../../../../../context";
import {type Filter} from '../../../../types/MDM';
import { operators } from "../../../../../helpers/MDMConstants";
import { generateOptions, getUploadModalRadioButtons } from "../../../../../helpers/utils";



const AddRecord = () => {

    const {user} = useUserData()
    const themeUi = user?.user?.theme_ui;

    const {
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
        onBackButton,
        onClearExportError,
        agGridProps,
        ref,
        tempRef,
        tempAgGridProps,
        tempGridData,
        deleteSelected,
        onSubmit,
        isUploadButtonDisabled,
        editOnline,
        onEditOnline,
        // onSaveToDraft,
        selectedRowsCount,
        currentPage,
        rowsPerPage,
        handleChangePage,
        onReset,
        onSaveToDraft,
        onEditOnlineSave

    } = useViewModify('add');

    const {
      isSelectMasterOpen,
        isUploadModalOpen,
        handleSubmitSelectMaster,
        onCancel,
        allMasters,
        selectedMasters,
        handleOnClickMaster,
        handleRadioButton,
        setIsUploadModalOpen
        
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
                onTabClose={()=>{console.log("")}}
                newTabTitle={"Add Master"}
                newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
                newTabHandler={()=>{console.log("")}}
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
            onCloseModal={()=>setIsUploadModalOpen(false)} 
            onDownload={()=>ref.current?.api.exportDataAsExcel({
              fileName:downloadFileName.length>0?downloadFileName :activeMaster.name,
            })} 
            onUpload={()=>{
              onUploadMaster()
              setIsUploadModalOpen(false)
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
          />
        }
        </React.Fragment>
    )

    
}

export default AddRecord;