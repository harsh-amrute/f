import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { SCContainer, SCFilterContainer, SCFilterControls, SCLegend, SCFilterAddControls, SCFilterAddButton, SCFilterAddButtonWrapper, SCFilterSeperator, SCFilterButtonGroup } from "./styles";
import { useUserData } from "../../../../../context";
import SelectMaster from "../../../../../components/VectorFLOW/layouts/SelectMaster";
import { generateOptions } from "../../../../../helpers/utils";
import VFTab from "../../../../../components/VectorFLOW/commons/VFTab";
import VFFilter from "../../../../../components/VectorFLOW/commons/VFFilter";
import useViewModify from "./useViewModify"; 
import { operators } from "../../../../../helpers/MDMConstants";
import {type Filter} from '../../../../types/MDM';
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import WarningModal from './WarningModal'
import UploadModal from "./UploadModal";
import { useEffect } from "react";
import VFTaskBar from "./VFTaskbar";
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";



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
        selectedRowsCount,
        currentPage,
        rowsPerPage,
        handlePageChange

    } = useViewModify();

    useEffect(()=>{
      if(ref.current){
        if(isTableDataLoading){
          ref.current?.api.showLoadingOverlay();
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
          }
          {
            !(['default'].includes(activeMaster.progress)) 
              && 
              <VFPagination 
                selectedRows={selectedRowsCount} 
                totalRows={recordCount} 
                currentPage={currentPage} 
                rowsPerPage={rowsPerPage} 
                handleChangePage={(e)=>handlePageChange(e)}  
                handleChangePerPage={()=>console.log('hello')}
              />
          }
          
        </SCContainer>
        {isWarningModalOpen && 
          <WarningModal 
            count={recordCount} 
            onCloseModal={onWarningModalClose} 
            onFailure={onWarningModalClose} 
            onSuccess={onWarningModalSuccess}
            />
        }
        {isUploadModalOpen && 
          <UploadModal 
            openModal={isUploadModalOpen} 
            onCloseModal={()=>toggleUploadModal(false)} 
            onDownload={()=>exportToExcel(true)} 
            onUpload={()=>onUploadMaster()}
            inputText={downloadFileName}
            setInputText={setDownloadFileName}
            file={file}
            setFile={setFile}
            uploadButtonStatus={isUploadButtonDisabled}
            />
        }
        {
          !isSelectMasterOpen && 
          <VFTaskBar
            masterProgress={activeMaster.progress}
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
      </>
    )
  }
  
  export default ViewModify
  