import React, { useCallback, useEffect, useState } from "react";

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
import VFOverlay from "../../../../../components/VectorFLOW/commons/VFOverlay";


import { useUserData } from "../../../../../context";
import {getUploadModalRadioButtons } from "../../../../../helpers/utils";
import { useDispatch } from "react-redux";
import { TOGGLE_SELECT_MASTER_SCREEN } from "../../../../../redux/actions/MDM";

import { MDMMasterState,Field } from "../../../../types/MDM";
import { useGetBufferMasterData, useSaveBufferMasterTask } from "../../../../../VectorFlow/Services/MTA/MDM";
import _ from "lodash";




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
        handleChangePage,
        editOnline,
        onEditOnline,
        isUploadModalOpen,
        onReset,
        onSaveToDraft,
        onEditOnlineSave,
        isDataAvailableLocally,
        isOverlayVisible,
        errorCount

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
        showMasterGroup,
        showMaster,
        options,
        selectedOptions
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

    const [rowDataCustom, setRowDataCustom] =useState<any>(_.cloneDeep(activeMaster.rowData))
    const {mutateAsync: getBufferMasterData} = useGetBufferMasterData();
    const {mutateAsync: saveBufferMasterTask} = useSaveBufferMasterTask();


    const [addedData, setAddedData] = useState<any>([]);

    const getBufferData= async ()=>{
      try{
        const response = await getBufferMasterData();
        setAddedData(response.data.data.results);
      }
      catch(error){
        console.log(error)
      }
    }

    useEffect(()=>{
      getBufferData();
    },[])

    useEffect(()=>{
      console.log("rwo  Data custom", rowDataCustom)
    },[rowDataCustom]);
    const onMTORowDataUpdated=(params: any)=>{
      if(activeMaster.isMTO){
        console.log("this worked")
      
        const nodesToSelect:any = [];
        params.api.deselectAll();
      if(addedData){
        params?.api?.forEachNode(
          (node: any, index: any)=>{
            console.log("node.....", node.data);
            addedData.forEach((addData: any)=>{
              if(node.data.bcd=== addData.bcd){
                node.data.err = "The buffer code already exists in the added buffers!";
                // changeRowData({node: {rowIndex: index}, column: {colId: 'err'}, newValue: "The buffer code already exists in the added buffers!"})
              }
              else if((node.data.bt=== addData.bt) && (node.data.bsz=== addData.bsz)){
                node.data.err = "The buffer with the buffer size already exists!";
              }
            })
            
            params?.api?.forEachNode((node2: any, index2: any)=>{
              if(index > index2){

                if(node.data.bcd === node2.data.bcd){
                  node.data.err = "Enter a unique buffer code!"
                // changeRowData({node: {rowIndex: index}, column: {colId: 'err'}, newValue: "Enter a unique buffer code!"})

                }
                else if(node.data.bt === node2.data.bt && node.data.bsz === node2.data.bsz){
                  node.data.err = "Enter a unique buffer size for the given buffer type!"
                }
                else{
                  node.data.err="";
                  nodesToSelect.push(node);
                }
              }
            })
          }
          );

          console.log("nodes to select....",nodesToSelect);
          params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
        }
      }
    }

    useEffect(()=>{
      // ref?.current?.api?.selectAll();
      setRowDataCustom(_.cloneDeep(activeMaster.rowData))
      // console.log("yeh hua re yeh hua yeh console run hua!!")
    },[activeMaster.rowData])


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
              shouldShowMasterGroup={showMasterGroup}
              shouldShowMaster={showMaster}
              options={options}
              selectedOptions={selectedOptions}
          />
      )
    }
    const dispatch = useDispatch();


    // const onGridReady = useCallback((params: GridReadyEvent) => {
    //   if(activeMaster.rowData){
    //     setRowDataCustom(activeMaster.rowData);
    //   }
    // },[activeMaster.rowData]);


    const changeRowData =(params: any)=>{
      const newData = [...rowDataCustom];
      newData[params.node.rowIndex][params.column.colId] = params.newValue;
      console.log("new dAtaa", newData);
      setRowDataCustom(newData);
    }



     // Saves Buffer Data for MTO
  const onMTOSaveBufferData= async()=>{

    const BufferPostObj: any = {
      mid: activeMaster.id,
      uid: user.user.id.toString(),
      unm: user.user.name,
      buffData: []
    }


    const selectedRows:any = ref?.current?.api?.getSelectedRows();
    const finalData:any = [...selectedRows];
    finalData.forEach((e:any)=>{
      // bufferTypeMaster.forEach((e:any)=>{
      //   if(e.dsc===e.bt){
      //     e.bt=e.id;
      //   }
      // })

      // TODO: call the buffer type and add the id and use drop down instead;
      e.bt = 1;
      e.ib= (e.ib==="false"?0: 1);
      e.mlt = parseInt(e.mlt);
      e.slt = parseInt(e.slt);


      BufferPostObj.buffData.push(_.omit(e,'editable'));
      BufferPostObj.buffData.push(_.omit(e,'err'));
    })

    try{
      console.log("finalData......", BufferPostObj);
      const response = await saveBufferMasterTask(BufferPostObj);
      // console.log("save api response...",response)
    }
    catch(error){
      console.log(error)
    }
    
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
                {activeMaster.isMTO?

                  <VFTable
                  height={"95%"}
                  ref={ref}
                  columnDefs={activeMaster.colDefs}
                  rowData={rowDataCustom}
                  {...agGridProps}
                  onCellEditingStopped={(params: any)=>{ changeRowData(params)}}
                  onRowDataUpdated={onMTORowDataUpdated}
                  // onGridReady={onGridReady}
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
                  />
                  :
                  <VFTable
                  height={"95%"}
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
                  />
                }
                  <div style={{display:'none'}}>                
                    <VFTable
                      ref={tempRef}
                      rowData={tempGridData}
                      {...tempAgGridProps}
                      />
                  </div>

              </VFTab>
              {
                (!['default'].includes(activeMaster.progress) && (!isDataAvailableLocally && !isSelectMasterOpen)) 
                  && 
                  <VFPagination 
                    selectedRows={selectedRowsCount} 
                    totalRows={recordCount} 
                    currentPage={currentPage} 
                    rowsPerPage={parseInt(process.env.REACT_APP_ADDRECORD_PAGE  || '100')} 
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
              const downloadableColumnKeys:string[] = [];
              activeMaster.fields.forEach((field:Field)=>{
                if(field.isAdd){
                  downloadableColumnKeys.push(field.key)
                }
              });
              if(currentMaster){
                ref.current?.api.exportDataAsExcel({fileName:downloadFileName ==='' ? currentMaster.name : downloadFileName,columnKeys:downloadableColumnKeys});
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
            downloadFileText={'Download sample template'}
            />
        }
        {/* {isConflictModalOpen && 
          <SubmitErrorModal 
            totalCount={activeMaster.rowData.length}
            errorCount={errorCount}
            recordCount={activeMaster.rowData.length - conflictCount - errorCount}
            onSuccess={onIgnoreSubmitErrors}
            onCloseModal={onIgnoreSubmitErrors}

          />
        } */}
        {
          isOverlayVisible && (
            <VFOverlay>
             <h1 style={{backgroundColor:"white",padding:'15px',borderRadius:'8px'}}>Loading....</h1>
            </VFOverlay>
          )
        }
        {
          !isSelectMasterOpen && 
          <VFTaskBar
          showSubmittedExportError={errorCount>0}
            enableEditOnlineReset={false}
            disableResumeSeasonality={()=>false}
            disableStopSeasonality={()=>false}
            masterProgress={activeMaster.progress}
            onReset={onReset}
            onSaveToDraft={onSaveToDraft}
            onEditOnlineSave={onEditOnlineSave}
            editOnline={editOnline}
            onEditOnline={()=>onEditOnline('editOnline')}
            onBack={onBackButton}
            onClearAndExportErrors={()=>onClearExportError()}
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
            onSubmitConflictData={()=>console.log('')}
            onDeleteOnlineSubmit={()=>console.log('')}
            masterId={activeMaster.id}
            mtoSaveData={true}
            onMTOSaveData={ onMTOSaveBufferData}
            isMTOSaveDataDisabled={activeMaster.rowData.length === 0}
          />
        }
        </React.Fragment>
    )
}

export default AddRecord;