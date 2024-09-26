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
import { SeasonalityQuickFilterType, type Filter } from '../../../../types/MDM';
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import WarningModal from './WarningModal'
import UploadModal from "./UploadModal";
import React, { useEffect, useState } from "react";
import VFTaskBar from "./VFTaskbar";
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";
import SeasonalityChartModal from "./SeasonalityChartModal";
import SubmitConflictModal from "./SubmitConflictModal";
import VFOverlay from "../../../../../components/VectorFLOW/commons/VFOverlay";
import _ from "lodash";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import { ColorsMTO } from "../../../../../VectorFlow/Pages/MTO/Common/Colors";
import { useGetBufferTypeMaster } from '../../../../Services/MTA/MDM'

type ColumnDef = {
  field: string;
  colId: string;
  headerName: string;
  hide?: boolean;
  floatingFilter?: boolean;
  filter?: string;
  cellDataType?: string;
  tooltipComponent?: string;
  suppressColumnsToolPanel?: boolean;
  minWidth?: number;
  cellStyle?: React.CSSProperties;
  flex?: number;
  editable?: boolean | ((params: any) => boolean);
};


const ViewModify = () => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const { mutateAsync: GetBufferTypeMaster } = useGetBufferTypeMaster();

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
    submittedDataCount,
    uploadProgress,
    totalProgress,
    tempRecordCount

  } = useViewModify('modify');

  //console.log('<><>>>>><>activeMaster>><>>>>><>', activeMaster.colDefs)
  const [MtoGridData, setData] = useState<any>();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [updatedColDef, setUpdatedColDef] = useState<any>();
  const [bufferTypeMaster, setBufferTypeMaster] = useState<any>();
  const [addedBufferMaster, setAddedBufferMaster] = useState<any>([]);
  //const [isEditable, setIsEditable] = useState(false);


  const addEditableToLastColumn = (colDefs: any): ColumnDef[] => {
    const modifiedColDefs = colDefs.map((colDef: any) => {
      const editable = (params: any) => params.node.rowIndex === 0;

      if (colDef.field === 'bt') {
        return {
          ...colDef,
          cellEditor: 'agSelectCellEditor',
          valueFormatter: myFormatter,
          cellEditorParams: {
            values: bufferTypeMaster.map((item: any) => item.dsc), // Dropdown values
          },
          editable,
        };
      }

      return {
        valueFormatter: myFormatter,

        ...colDef,
        editable,
      };
    });


    // Create actions column with button rendering
    const actionsCol: any = {
      field: 'actions',
      headerName: 'Actions',
      //flex: 1,
      width: 100, // Set the width for the actions column
      cellRenderer: (params: any) => {
        if ((params.node.rowIndex === 0)) {
          return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '4px' }}>

              <div
                onClick={() => addRow(params)}
                style={{ cursor: 'pointer' }}>
                <img
                  src="/assets/img/MTOapprovalBuffer.svg"
                  alt="ApproveMaster"
                />
              </div>

              <div
                onClick={() => handleCancel(params)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src="/assets/img/MTOcancelBuffer.svg"
                  alt="CancelMaster"
                />
              </div>

            </div>
          );
        }
        return null; // No buttons for other rows
      },
    };

    // Prepend the actions column
    return [actionsCol, ...modifiedColDefs];
  };

  function myFormatter(params: any) {
    const currBuff = params.value;

    let val = params.value;
    bufferTypeMaster.forEach((ele: any) => {
      console.log(ele.id, currBuff)
      if (ele.id.toString() === currBuff.toString()) {

        val = ele.dsc;
      }
    })
    return val;

  }

  const setBufferInColDef = (colDefs: any) => {
    const modifiedColDefs = colDefs.map((colDef: any) => {
      // const editable = (params: any) => params.node.rowIndex === params.api.getDisplayedRowCount() - 1;

      if (colDef.field === 'bt') {
        return {
          ...colDef,
          valueFormatter: myFormatter
        };
      }

      return {
        ...colDef
      }


    });

    setUpdatedColDef(modifiedColDefs);
  }

  useEffect(() => {
    if (bufferTypeMaster) {
      setBufferInColDef(activeMaster.colDefs)
    }

  }, [bufferTypeMaster])


  const addRow = (params: any) => {
    console.log('added row params', params)
    const newRows = [...addedBufferMaster];
    newRows.push(params.data);
    setAddedBufferMaster(newRows);
    setIsButtonDisabled(false);
    // setUpdatedColDef(activeMaster.colDefs);
    setBufferInColDef(activeMaster.colDefs)
    // TODO add to the local state
  }

  const handleCancel = (params: any) => {

    setIsButtonDisabled(false);
    setData((prevRowData: any) => {
      // TODO remove the last row instead
      const newData = [...prevRowData];

      newData.splice(0, 1); // Remove the last row
      return newData;
    });
    setUpdatedColDef(activeMaster.colDefs);
    // setBufferInColDef(activeMaster.colDefs)

    // Optionally remove the last row
    // setData(MtoGridData.slice(0, -1));
    //setRowData(rowData.slice(0, -1));
  };


  const getBufferMasterDataType = async () => {
    const BufferTypeMaster = await GetBufferTypeMaster();
    setBufferTypeMaster(BufferTypeMaster?.data?.data);
  }

  useEffect(() => {
    getBufferMasterDataType()
    setData(activeMaster.rowData);
  }, [activeMaster.rowData])

  useEffect(() => {
    setUpdatedColDef(activeMaster.colDefs)
  }, [activeMaster.colDefs])

  useEffect(() => {
    if (ref.current && ref.current.api) {
      if (isTableDataLoading) {
        ref.current?.api.showLoadingOverlay();
      }
      else {
        ref.current?.api.hideOverlay();
      }
    }
  }, [isTableDataLoading])

  //this will add new master only for MTO
  const addRowToMtoGrid = () => {
    const newRow: any = {
      bcd: `PROD-Buff`,
      bd: `BUFF-`,
      bsz: '', // Example value; modify as needed
      slt: '',
      mlt: '',
      ib: false,
      bt: '',
      editable: true,
    };
    setData((prevData: any) => [newRow, ...prevData]);
    //setIsButtonDisabled(false);
    const latestcoldef = addEditableToLastColumn(activeMaster.colDefs);
    setUpdatedColDef(latestcoldef)
  }

  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
  };



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
            handleSubmit={() => { handleSelectMasterSubmit() }}
          />
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
              newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
              newTabHandler={addNewMaster}
            >
              {(activeMaster.progress === 'default' || activeMaster.progress === 'view')
                &&
                <SCFilterContainer>
                  <SCFilterControls>
                    <SCLegend>Filter</SCLegend>
                    {
                      activeMaster.filters.map((f: Filter) => {
                        if (f.masterId == activeMaster?.id) {
                          return (
                            <VFFilter
                              onDelete={() => handleOnDeleteFilter(f.id)}
                              operators={operators}
                              filters={activeMaster.filters}
                              fields={generateOptions([activeMaster])}
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
                              onClick={handleOnAddFilter}
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
                      themeUi={themeUi}
                      onClick={() => { handleApplyFilter() }}
                      disabled={false}
                    >
                      Apply Filter
                    </VFButton>
                    <VFButtonOutline
                      onClick={() => { handleApplyFilter(true) }}
                      themeUi={themeUi}

                    >
                      Show All
                    </VFButtonOutline>
                  </SCFilterButtonGroup>
                </SCFilterContainer>
              }
              {activeMaster.isMTO ?
                <VFTable
                  {...agGridProps}
                  readOnlyEdit={false}
                  onCellEditingStopped={(params) => {
                    console.log('onCellEditingStopped', params)
                  }}
                  ref={ref}
                  columnDefs={updatedColDef}
                  rowData={MtoGridData}
                  suppressPaginationPanel={!isDataAvailableLocally}
                  statusBar={{
                    statusPanels: isDataAvailableLocally ? [
                      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                      { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                      { statusPanel: 'agAggregationComponent', align: 'left' },
                    ] :
                      [],
                  }}
                  height={activeMaster.rowData.length > 0 ? activeMaster.progress === 'view' ? "65%" : "95%" : "75%"}
                  editType="fullRow"
                  onGridReady={onGridReady}
                />
                :
                <VFTable
                  ref={ref}
                  columnDefs={activeMaster.colDefs}
                  rowData={activeMaster.rowData}
                  {...agGridProps}
                  suppressPaginationPanel={!isDataAvailableLocally}
                  statusBar={{
                    statusPanels: isDataAvailableLocally ? [
                      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                      { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                      { statusPanel: 'agAggregationComponent', align: 'left' },
                    ] :
                      [],
                  }}
                  height={activeMaster.rowData.length > 0 ? activeMaster.progress === 'view' ? "65%" : "95%" : "75%"}
                />
              }
              {
                (!['default'].includes(activeMaster.progress) && (!isDataAvailableLocally && !isSelectMasterOpen))
                &&
                <VFPagination
                  selectedRows={selectedRowsCount}
                  totalRows={recordCount}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={(e) => handleChangePage(e)}
                />
              }
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
              {activeMaster.isMTO &&
                <button
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '130px',
                    margin: '10px',
                    cursor: 'pointer',
                    background: '#fff'
                  }}
                  onClick={() => { (!isButtonDisabled) && (addRowToMtoGrid(), setIsButtonDisabled(true)) }}
                  disabled={isButtonDisabled ? true : false}
                >
                  {(!isButtonDisabled) ?
                    <>
                      <img
                        src="/assets/img/AddBufferMasterIcon.svg"
                        alt="Add Master Button"
                      />
                      <p style={{ fontSize: '18px', color: ColorsMTO.Pink.code }}>Add Buffer</p>
                    </>
                    :
                    <>
                      <img
                        src="/assets/img/AddBufferMasterIconGrey.svg"
                        alt="Add Master Button"
                      />
                      <p style={{ fontSize: '18px', color: ColorsMTO.LightGrey.code }}>Add Buffer</p>
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
      {isUploadModalOpen &&
        <UploadModal
          header={"Modification"}
          openModal={isUploadModalOpen}
          onCloseModal={() => toggleUploadModal(false)}
          onDownload={() => exportToExcel(true)}
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
          onCloseModal={() => { return }}

        />
      }
      {isSeasonalityChartModalOpen &&
        <SeasonalityChartModal
          isModalOpen={isSeasonalityChartModalOpen}
          closeModal={() => toggleSeasonalityChartModal(false)}
          chartData={chartData}
          rowData={seasonalityRowData}
          normChangeData={normChangeData}

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
          masterProgress={activeMaster.progress}
          disableSubmit={activeMaster.rowData.length === 0}
          enableEditOnlineReset={enableEditOnlineReset}
          disableDeleteSelected={activeMaster.rowData.length < 1}
          onReset={onReset}
          onSaveToDraft={onSaveToDraft}
          onEditOnlineSave={onEditOnlineSave}
          editOnline={editOnline}
          onEditOnline={() => onEditOnline('editOnline')}
          onBack={onBackButton}
          onClearAndExportErrors={onClearExportError}
          onModifyData={() => toggleUploadModal(true)}
          onExportData={exportToExcel}
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
        />
      }

    </>
  )
}

export default ViewModify