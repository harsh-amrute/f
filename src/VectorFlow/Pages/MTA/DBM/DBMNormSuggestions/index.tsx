import {DBMLayout} from './styles'
import useDBM from './useDBM';
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination'
import ActionToolBar from '../../SupplyChainIntelligenceHub/Planning/ActionToolBar';
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import DailyDataGraphModal from '../../../../../components/VectorFLOW/commons/DailyDataGraphModal';
import NormChangeHistoryTable from '../../../../../components/VectorFLOW/commons/NormChangeHistoryTable';
import { GridStateContext } from '../../../../../context/GridStateContext';
import LastRunDateComponent from "../../../../../components/commons/lastRundate";

const DBM = () => {

 const { 
  isLoading,
  DBMColumns,
  agGridProps,
  DBMRowData,
  handleChangePage,
  DBMDataCount,
  currentPage,
  gridRef,
  showAllCheckbox,
  handleGoButton,
  showDailyDataGraphModal,
  showNormChangeHistoryTable,
  dailyData,
  tempRef,
  tempDownloadData,
  setTempDownloadData,
  tempAgGridProps,
  exportExcelRowData,
  setExportExcelRowData,
  exportExcelColumns,
  setExportExcelColumns,
  handleApplyFilter,
  currentFilter,
  setCurrentFilter,
  onDeleteFilter,
  onExportToExcelCallBack,
  recordsPerPage,
  generalFilterOptions,
  onResetCallback,
  lastRunDate
} = useDBM();

 if(isLoading){
  return (
    <VFLoader/>
  )
}

  return (
    <>
    <GridStateContext.Provider value={{
      ref:gridRef,
      exportExcelColumns:exportExcelColumns,
      setExportExcelColumns:setExportExcelColumns,
      tempDownloadData:tempDownloadData,
      setTempDownloadData:setTempDownloadData,
      exportExcelRowData:exportExcelRowData,
      setExportExcelRowData:setExportExcelRowData,
      onResetCallback:onResetCallback

  }}>
      <ActionToolBar 
        view={'grid'} 
        setCurrentTab={()=>{return}} 
        currCategory={'DBMNorm'} 
        currentTab={''} 
        tabsList={[]} 
        onFloatingTabChange={()=>console.log('')} 
        onGoBack={()=>console.log('')} 
        onViewChange={()=>console.log('')} 
        showAllTick={showAllCheckbox} 
        handleGoButton={handleGoButton} 
        genericRecordCount={DBMDataCount} 
        onExportToExcelCallBack={(e:number)=>onExportToExcelCallBack(e)}
        onApplyFilter={handleApplyFilter}
        multiFilter={currentFilter}
        setMultiFilter={setCurrentFilter}
        lastRunDate={lastRunDate}
        generalFilterOptions={generalFilterOptions}
        onDelete={onDeleteFilter}
      />
      {lastRunDate && (
        <LastRunDateComponent lastRunDate={lastRunDate} />
      )}
      <DBMLayout>
        <div style={{height:'70vh'}}>
            {
                showDailyDataGraphModal && <DailyDataGraphModal rowData={dailyData.rowData} chartData={dailyData.chartData} normChangeData={dailyData.normChangeData} masterData={dailyData.masterData} isModalOpen={showDailyDataGraphModal} suggestionData={dailyData.suggestionData} monitoringData={dailyData.monitoringData} skuKey={'SKUCode'} whKey={'WHCode'} />
            }
            {
                showNormChangeHistoryTable && <NormChangeHistoryTable data={dailyData.normChangeData} />
            }

          <VFTable
                  {...agGridProps}
                  columnDefs={DBMColumns}
                  rowData={DBMRowData}
                  ref={gridRef}
                  height={"100%"}
                  enableRangeSelection={true} 
                rowSelection="multiple"
                statusBar = {{
                    statusPanels: [
                      { statusPanel: 'agTotalAndFilteredRowCountComponent', align:'left' },
                      { statusPanel: 'agTotalRowCountComponent', align:'left' },
                      { statusPanel: 'agFilteredRowCountComponent', align:'left' },
                      { statusPanel: 'agSelectedRowCountComponent', align:'left' },
                      { statusPanel: 'agAggregationComponent', align:'left' },
                    ],
                  }}
              /> 
          <VFPagination 
                selectedRows={0} 
                totalRows={DBMDataCount} 
                currentPage={currentPage} 
                rowsPerPage={recordsPerPage}
                handleChangePage={(e)=>handleChangePage(e)} 
              />  
        </div>
        <div style={{display:'none'}}>                
          <VFTable
            ref={tempRef}
            columnDefs={DBMColumns}
            rowData={exportExcelRowData}
            {...tempAgGridProps}
          />
        </div>
      </DBMLayout>
      </GridStateContext.Provider>
      </>
  )
}

export default DBM