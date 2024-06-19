import {DBMLayout} from './styles'
import useDBM from './useDBM';
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination'
import ActionToolBar from '../../SupplyChainIntelligenceHub/Planning/ActionToolBar';
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import DailyDataGraphModal from '../../../../../components/VectorFLOW/commons/DailyDataGraphModal';
import NormChangeHistoryTable from '../../../../../components/VectorFLOW/commons/NormChangeHistoryTable';
import { GridStateContext } from '../../../../../context/GridStateContext';

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
  onDelete,
  onExportToExcelCallBack
} = useDBM();

 if(isLoading){
  return (
    <VFLoader/>
  )
}

  return (
    <GridStateContext.Provider value={{
      ref:gridRef,
      exportExcelColumns:exportExcelColumns,
      setExportExcelColumns:setExportExcelColumns,
      tempDownloadData:tempDownloadData,
      setTempDownloadData:setTempDownloadData,
      exportExcelRowData:exportExcelRowData,
      setExportExcelRowData:setExportExcelRowData

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
        onDelete={onDelete}
      />
      <DBMLayout>
        <div style={{height:'90vh'}}>
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
                  height={"98%"}
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
                rowsPerPage={50}
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
  )
}

export default DBM