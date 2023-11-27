import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { SCContainer, SCFilterContainer, SCFilterControls, SCLegend, SCFilterAddControls, SCFilterAddButton, SCFilterAddButtonWrapper, SCFilterSeperator, SCFilterButtonGroup } from "./styles";
import { useUserData } from "../../../../../context";
import SelectMaster from "../../../../../components/VectorFLOW/layouts/SelectMaster";
import { generateOptions, mapMasterToColumnDefs } from "../../../../../helpers/utils";
import VFTab from "../../../../../components/VectorFLOW/commons/VFTab";
import VFFilter from "../../../../../components/VectorFLOW/commons/VFFilter";
import useViewModify from "./useViewModify";
import {type Filter} from '../../../../types/MDM';
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import WarningModal from './WarningModal'
import { notifyError } from "../../../../../helpers/notify";
import UploadModal from "./UploadModal";
import VFTaskBar from "./VFTaskbar";
import { useEffect, useState } from "react";
import { ColDef } from "ag-grid-enterprise";



  const ViewModify = () => {
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
   
    // const disabled=true;
    const dummyFn =()=>{return}

    const {
        selectedMasters,
        isSelectMasterOpen,
        setIsSelectMasterOpen,
        options,
        selectedOptions,
        tabs,
        activeMaster,
        filters,
        operators,
        filterButtonStatus,
        setFilterButtonStatus,
        handleSelectMasterSubmit,
        handleTabClose,
        handleOnAddFilter,
        handleOnDeleteFilter,
        allMasters,
        isLoading,
        handleApplyFilter,
        rowData,
        isWarningModalOpen,
        recordCount,
        isUploadModalOpen,
        toggleUploadModal,
        onWarningModalClose,
        onWarningModalSuccess,
        onColumnVisible,
        exportToExcel,
        columnDefs,
        ref,
    } = useViewModify();


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
              onClose={handleTabClose}
              newTabTitle={"Add Master"}
              newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
              newTabHandler={()=>{
                if(allMasters.length === selectedMasters.length) {
                  notifyError('All Masters have already been selected. Cannot add more masters');
                  return;
                }
                setIsSelectMasterOpen(true)
              }}
              >
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
                <VFTable
                  ref={ref}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  onColumnVisible={onColumnVisible}
                />
            </VFTab>
          }
        </SCContainer>
        {isWarningModalOpen && <WarningModal count={recordCount} onCloseModal={onWarningModalClose} onFailure={onWarningModalClose} onSuccess={onWarningModalSuccess}/>}
        {isUploadModalOpen && <UploadModal openModal={isUploadModalOpen} onCloseModal={()=>toggleUploadModal(false)} onDownload={()=>toggleUploadModal(false)} onUpload={()=>toggleUploadModal(false)}/>}
        {
          !isSelectMasterOpen && 
          <VFTaskBar
            masterProgress="view"
            editOnline={false}
            onEditOnline={dummyFn}
            onBack={()=>setIsSelectMasterOpen(true)}
            onClearAndExportErrors={dummyFn}
            onModifyData={()=>toggleUploadModal(true)}
            onExportData={exportToExcel}
            onSubmit={dummyFn}
            onDeleteSelected={dummyFn}
          />
        }
      </>
    )
  }
  
  export default ViewModify
  