

import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import ActionToolBar from "../Planning/ActionToolBar"
import BPRSubmiRemarkToolTip from "../BPR/BPRSubmitRemarkToolTip"

import useOpenExpeditingRequests from "./useOpenExpeditingRequests"
import { GridStateContext } from "../../../../../context/GridStateContext"
import RemarkModal from "./RemarkModal"

import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"

import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline"
import { ButtonWrapper } from "./styles"
import LastRunDateComponent from "../../../../../components/commons/lastRundate";


const OpenExpeditingRequests = () => {

  const {
    agGridProps,
    rowData,
    remark,
    isLoading,
    remarkHistory,
    isSubmitRemarkToolTipOpen,
    isRemarkHistoryToolTipOpen,
    submitRemarkToolTipPosition,
    ref,
    updateRemark,
    onSubmitRemark,
    onCloseSubmitRemark,
    onCloseRemarkHistory,
    tempDownloadData,
    setTempDownloadData,
    OERColumns,
    exportExcelRowData,
    setExportExcelRowData,
    exportExcelColumns,
    setExportExcelColumns,
    currentFilter,
    setCurrentFilter,
    onDelete,
    onApplyFilter,
    editedRows,
    onSubmitEditedRows,
    themeUi,
    onResetCallback,
    lastRunDate
  } = useOpenExpeditingRequests()

  return (
    <GridStateContext.Provider
      value={{
        ref: ref,
        exportExcelColumns: exportExcelColumns,
        setExportExcelColumns: setExportExcelColumns,
        tempDownloadData: tempDownloadData,
        setTempDownloadData: setTempDownloadData,
        exportExcelRowData: exportExcelRowData,
        setExportExcelRowData: setExportExcelRowData,
        onResetCallback:onResetCallback

      }}
    >
      <div style={{ marginLeft: '10px',marginBottom:'10px' }}>
        <ActionToolBar
          view={'grid'}
          setCurrentTab={''}
          currCategory={'OpenExpeditingRequests'}
          currentTab={''}
          tabsList={[]}
          onFloatingTabChange={() => console.log('')}
          onGoBack={() => console.log('')}
          onViewChange={() => console.log('')}
          genericRecordCount={12}
          onExportToExcelCallBack={() => { return }}
          multiFilter={currentFilter}
          lastRunDate={lastRunDate}
          setMultiFilter={setCurrentFilter}
          onDelete={onDelete}
          onApplyFilter={onApplyFilter}
          onSubmitEditedRows={onSubmitEditedRows}
          disableSubmitEditedRowsBtn={editedRows.length === 0}
        />
      </div>
      {lastRunDate && (
        <LastRunDateComponent lastRunDate={lastRunDate} />
      )}
      {(isLoading) ?
        (
          <VFLoader />
        )
        :
        (<div style={{ marginLeft: '15px', height: '80%' }}>
          <VFTable
            columnDefs={OERColumns}
            rowData={rowData}
            enableRangeSelection={true}
            rowSelection="multiple"
            statusBar={{
              statusPanels: [
                { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                { statusPanel: 'agAggregationComponent', align: 'left' },
              ],
            }}
            {...agGridProps}
            ref={ref}
            // onGridReady={(params)=>{
            //   if(columnState){
            //     params.columnApi.applyColumnState({state:columnState})
            //   }
            // }}
            height={"100%"}
            maintainColumnOrder
          />
    
          <ButtonWrapper>
            <VFButtonOutline disabled={editedRows.length === 0} themeUi={themeUi} width={169} style={{ fontSize: '20px', fontWeight: '500' }} onClick={onSubmitEditedRows}>Save  Remarks</VFButtonOutline>
          </ButtonWrapper>
        </div>
        )
      }
      
      {isSubmitRemarkToolTipOpen && (
        <BPRSubmiRemarkToolTip
          remark={remark}
          setRemark={updateRemark}
          style={submitRemarkToolTipPosition}
          onSuccess={onSubmitRemark}
          onClose={onCloseSubmitRemark}
          themeUi={themeUi}
        />
      )}

      {isSubmitRemarkToolTipOpen && (
        <BPRSubmiRemarkToolTip
          remark={remark}
          setRemark={updateRemark}
          style={submitRemarkToolTipPosition}
          onSuccess={onSubmitRemark}
          onClose={onCloseSubmitRemark}
          themeUi={themeUi}
        />
      )}

      <RemarkModal
        isOpen={isRemarkHistoryToolTipOpen}
        data={remarkHistory}
        onClose={onCloseRemarkHistory}
      />
    </GridStateContext.Provider>
  )
}

export default OpenExpeditingRequests