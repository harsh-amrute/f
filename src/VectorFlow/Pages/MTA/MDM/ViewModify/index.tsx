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
import { notifyError } from "../../../../../helpers/notify";
import UploadModal from "./UploadModal";
import { useEffect } from "react";
import VFTaskBar from "./VFTaskbar";



  const ViewModify = () => {
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
   
    // const disabled=true;
    const dummyFn =()=>{return}

    const {
        selectedMasters,
        isSelectMasterOpen,
        options,
        selectedOptions,
        tabs,
        activeMaster,
        filters,
        filterButtonStatus,
        setFilterButtonStatus,
        handleSelectMasterSubmit,
        handleTabChange,
        handleTabClose,
        addNewMaster,
        handleOnAddFilter,
        handleOnDeleteFilter,
        allMasters,
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
        ViewModifyProgressState,
        onBackButton,
        onClearExportError,
        agGridProps,
        ref,
        tempAgGridProps,
        deleteSelected,
        onSubmit
    } = useViewModify();

    useEffect(()=>{
      if(isTableDataLoading){
        ref.current?.api.showLoadingOverlay();
      }

    },[isTableDataLoading])


    return (
      <>
        <SCContainer>
          {isSelectMasterOpen && 
            <SelectMaster 
                data={allMasters} 
                options={options} 
                selectedOptions={selectedOptions} 
                selectedMasters={selectedMasters}
                filterButtonStatus={filterButtonStatus}
                setFilterButtonStatus={setFilterButtonStatus}
                themeUi={themeUi}
                isLoading={isLoading}
                handleSubmit={()=>{handleSelectMasterSubmit()}}
            />
          }
          {!isSelectMasterOpen && 
            <VFTab 
              allMasters={allMasters}
              activeMaster={activeMaster}
              tabs={tabs}
              themeUi={themeUi}
              onTabChange={handleTabChange}
              onTabClose={handleTabClose}
              newTabTitle={"Add Master"}
              newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
              newTabHandler={addNewMaster}
              >
                { (ViewModifyProgressState ==='default' || ViewModifyProgressState ==='view') 
                    &&
                  <SCFilterContainer>
                    <SCFilterControls>
                      <SCLegend>Filter</SCLegend>
                      {filters.map((f:Filter)=>{
                        if(f.masterId==activeMaster?.id){
                          return(
                            <VFFilter 
                              onDelete={()=>handleOnDeleteFilter(f.id,f.masterId)}
                              operators={operators}
                              filters={filters}
                              fields={generateOptions([activeMaster])}
                              currFilter={f}
                              key={f.id}
                            />
                          )
                        }
                      })}
                      
                    </SCFilterControls>
                    <SCFilterAddControls>
                      {filters.map((f:Filter)=>{
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
                  {...agGridProps}
                />
                <div style={{display:'none'}}>                
                  <VFTable
                    {...tempAgGridProps}
                  />
                </div>

            </VFTab>
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
            onDownload={()=>exportToExcel()} 
            onUpload={()=>onUploadMaster()}
            inputText={downloadFileName}
            setInputText={setDownloadFileName}
            file={file}
            setFile={setFile}
            />
        }
        {
          !isSelectMasterOpen && 
          <VFTaskBar
            masterProgress={ViewModifyProgressState}
            editOnline={false}
            onEditOnline={dummyFn}
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
  